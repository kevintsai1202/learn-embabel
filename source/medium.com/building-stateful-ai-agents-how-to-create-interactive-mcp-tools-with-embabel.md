# Building Stateful AI Agents: How to Create Interactive MCP Tools with Embabel | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/building-stateful-ai-agents-how-to-create-interactive-mcp-tools-with-embabel-0dfbd3037cf7](https://medium.com/@springrod/building-stateful-ai-agents-how-to-create-interactive-mcp-tools-with-embabel-0dfbd3037cf7)
**來源網站**: medium.com

---

# Building Stateful AI Agents: How to Create Interactive MCP Tools with Embabel

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--0dfbd3037cf7---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--0dfbd3037cf7---------------------------------------)

8 min read

·

Jul 31, 2025

--

2

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D0dfbd3037cf7&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fbuilding-stateful-ai-agents-how-to-create-interactive-mcp-tools-with-embabel-0dfbd3037cf7&source=---header_actions--0dfbd3037cf7---------------------post_audio_button------------------)

Share

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/overview) has quickly become central to Gen AI, and enabled a lot of amazing things.

The [Embabel](https://github.com/embabel/embabel-agent) agent framework makes it easy to consume and expose MCP tools. Any Embabel goal can be exposed as an MCP tool. As Embabel agent processes can be long-running, such a tool can request user input during its execution, creating a stateful interaction during one or more conversations.

Let’s look at how easy it is to implement an MCP tool with [HITL](https://en.wikipedia.org/wiki/Human-in-the-loop) capabilities and use it in [Claude Desktop](https://claude.ai/download).

## The Agent

I love quirky exploration with Wikipedia. It’s a great tool for serious research, but it’s also a lot of fun to navigate through unexpected and amusing links. What if we made an agent to help us to do that?

The `WikiAgent` starts with a person or topic we want to explore, then does some preliminary research to see what quirky areas we might want to explore further. It then asks the user to choose an area, before doing additional research and writing a report.

## The WikiAgent

This is easy to model in Embabel, using domain objects, actions and a goal. If you need a refresher on Embabel concepts, please read this [introduction](/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014), and [this explanation of Embabel planning](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6).

Let’s write our [agent](https://github.com/embabel/embabel-agent-examples/tree/main/examples-java/src/main/java/com/embabel/example/wikipedia) in Java. We’ll start with types to hold the flow of data through the agent flow. Records make this concise:

```
record ResearchSubject(String name) {  
}  
  
record FocusAreas(List<FocusArea> focusAreas) {}  
  
record FocusArea(String topic) {  
}  
  
record ResearchReport(String subject, String summary) {  
}
```

> In this simple agent, the types merely ensure [type safety](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f) (which is important in itself), but they could come from an existing [domain model](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8), define behaviour and even expose it selectively to the LLM with `@Tool` methods.

We’ll need three actions, and a goal.

The first action takes the `ResearchSubject` type and explores the subject to identifying interesting topics. The infrastructure infers that `ResearchSubject` is a precondition of this action. We provide the LLM with web tools, so it can use Wikipedia. The `OperationContext` parameter lets us make LLM calls, and does not create a precondition. We set a fairly high temperature for more creative response, and word the prompt to give us interesting output:

```
@Action  
FocusAreas focusAreas(ResearchSubject researchSubject, OperationContext context) {  
    return context.promptRunner()  
            .withLlm(llm.withTemperature(.6))  
            .withToolGroup(CoreToolGroups.WEB)  
            .createObject("""  
                What are some interesting topics to explore about %s?  
                Please provide a list of focus areas, each as a separate line.  
                Go beyond the obvious: emphasize quirky and lesser-known aspects.  
                Use Wikipedia as the source of information.  
                """.formatted(researchSubject.name()), FocusAreas.class);  
}
```

When this action has run, we will have both a `ResearchSubject` and `FocusAreas` in the agent process blackboard. This will allow Embabel to invoke the following method to choose a focus area. This action doesn’t use an LLM, but communicates with the user to get necessary clarification. The `WaitFor.formSubmission` method will put the agent process in a wait state, while telling the framework to try to communicate what’s needed to the user:

```
@Action  
FocusArea findFocusArea(ResearchSubject researchSubject, FocusAreas focusAreas) {  
    return WaitFor.formSubmission(  
            """  
                Great, there are lots of interesting things to explore about %s.  
                Choices:  
                    %s  
                Please select one of the topics above to focus on.  
                """.formatted(researchSubject.name(),  
                            focusAreas.focusAreas().stream().map(FocusArea::topic)  
                                    .collect(Collectors.joining("\n"))),  
            FocusArea.class);  
}
```

If we get a response from the user, Embabel can invoke the following method, which which make another LLM call to write the final research report.

```
@Action  
@AchievesGoal(description = "Find information from wikipedia according to the user's request.",  
        export = @Export(remote = true, name="wikiSearch",   
                        startingInputTypes = {ResearchSubject.class})  
)  
ResearchReport performResearch(ResearchSubject researchSubject,   
              FocusArea focusArea,   
              OperationContext context) {  
    return context.promptRunner()  
            .withLlm(llm.withTemperature(.8))  
            .withToolGroup(CoreToolGroups.WEB)  
            .createObject("""  
                Research the following subject on Wikipedia, with the given focus area, and summarize it  
                in %d words:  
                Subject: %s  
                Focus Area: %s  
                """.formatted(wordCount, researchSubject.name(), focusArea.topic()),  
                    ResearchReport.class);  
}
```

The `performResearch` method has the `AchievesGoal` annotation in addition to the `Action` annotation, indicating that once it’s completed, a goal will have been achieved. The `Export` annotation specifies that the goal should be exported over remoting protocols like MCP. `startingInputTypes` indicates arguments the tool parameter should have.

Embabel can publish one or more MCP tools for each goal: one for each starting input type. It also exports infrastructure tools to manage the lifecycle of goal tools.

> Embabel doesn’t export MCP tools by default. Think of tool publication like `public` in Java or `export` in TypeScript: you have to ask if you want something to be published outside its scope.

Embabel uses [Spring AI’s MCP server](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html) support under the covers to handle details of the MCP protocol.

## Setting Up Claude Desktop

We’ve done everything we need on the Embabel side to implement and expose our MCP tool. We need to tell Claude Desktop about the new server.

We do this in the `claude_desktop_config.json` file. See the [MCP Quickstart for Claude Desktop Users](https://modelcontextprotocol.io/quickstart/user) for how to configure Claude Desktop.

Embabel serves over SSE, so we need to use the `mcp-remote` adapter:

Press enter or click to view image in full size

![]()

> In this case, the embabel-examples server is running on the default port. It’s good practice to run multiple Embabel servers on different ports, each exporting their own MCP tools.

## Running the Tool

Clone the <https://github.com/embabel/embabel-agent-examples> repo.

You can run the Java examples, including `WikiAgent`, in an IDE by running the `AgentMcpServerApplication` main class in the `src/main/java` tree. In IntelliJ, click the green arrow against line 52:

Press enter or click to view image in full size

![]()

To run from the command line, independent of an IDE, open a terminal and type:

```
cd scripts/java  
./mcp_server.sh
```

Once the Embabel server is up, start Claude Desktop. Click on the middle icon of the three on the left to see a dropdown of MCP tools:

Press enter or click to view image in full size

![]()

If you've correctly edited your config file, `embabel-examples` tools should be exposed.

Now let’s try `WikiAgent`. Let’s prompt Claude with some text that will cause it to decide to invoke our tool.

> The description in the Goal annotation is important as it will tell an LLM when to invoke the tool.

Press enter or click to view image in full size

![]()

Claude responds with a question, rather than by running our tool directly. It’s planning to invoke our wiki tool, so it’s asking for information to build the `ResearchSubject` starting input type. Note the elegant division between chat LLM and agent, where the chatbot knows to gather the structured data needed by the agent.

Let’s ask Claude to research [King O’Malley](https://en.wikipedia.org/wiki/King_O%27Malley). Once we provide the requested data, the tool will be invoked. The first time this happens, a popup will ask for permission to run the tool.

Again, Claude comes back to us with a question, but this time *after* invoking an MCP tool:

Press enter or click to view image in full size

![]()

Wow. King O’Malley was a fascinating character. Immigrant, Federal Government minister, and founder of Australia’s biggest bank.

As per the agent flow, we’re being asked to choose the direction in which to explore. Given these choices, we clearly need to go for the stunts. After another tool invocation, we’ll see something like this:

Press enter or click to view image in full size

![]()

Here’s our report. Our agent flow is complete.

### Wait, how did that work?

Most flows will complete without further user input. In this case the flow captured additional information during the flow, demonstrating Embabel’s ability to continue long-running processes and support stateful interactions via MCP.

Let’s look at the server logs to understand what happened.

At the end of the first tool invocation, after Embabel executed the `findFocusArea` action, the agent process entered a wait state. It could not proceed without a `FocusArea` object, and needed the user to provide one. The server communicated this to the LLM using text, as follows:

```
17:50:34.369 [loomBoundedElastic-2] INFO  Embabel - [sleepy_solomon] waiting  
17:50:34.371 [loomBoundedElastic-2] INFO  PerGoalToolCallbackPublisher - Returning waiting response:  
                You must invoke the submitFormAndResumeProcess tool to proceed with the goal "com.embabel.example.wikipedia.WikiAgent.performResearch".  
                The arguments will be  
                - processId: sleepy_solomon,  
                - formData: English text describing the form data to submit. See below  
  
                Before invoking this, you must obtain information from the user  
                as described in this form structure.  
                com.embabel.agent.core.hitl.FormBindingRequest(id=16347074-37ae-48c7-92d6-2377cf27134b, payload=Form(title=Great, there are lots of interesting things to explore about King O'Malley.  
Choices:  
    King O'Malley's role in the development of Canberra and his influence on the design competition won by Walter Burley Griffin  
His advocacy for the creation of a national bank and his self-proclaimed title as its 'father'  
His colorful personality traits, including his knack for oratory and publicity stunts  
His controversial loyalty to the Labor Party during the 1916 party split and the impact on his political career  
The quirky and lesser-known fact that he was the last surviving member of the first Australian federal parliament at his death  
His stance as a temperance advocate, including his ban on alcohol sales in the Australian Capital Territory  
His background as an American immigrant and how it shaped his political views and career in Australia  
The influence of his career on Australian political culture and the public's ongoing fascination with his life  
Please select one of the topics above to focus on.
```

This response from the first tool invocation prompted Claude to gather more information and continue by invoking the `submitFormAndResumeProcess` tool, which is a generic tool that can awaken any `AgentProcess` from a wait state. If we open the invocation of this second tool we can see the payload:

Press enter or click to view image in full size

![]()

The framework addressed the problem of communicating with the user in the appropriate way, without it complicating our logic.

Embabel’s HITL support is independent of UX. This server is using a text-oriented approach that works will with LLMs such as Claude. But it’s also possible to support dynamic forms in a more structured UX.

> As agents become mainstream, we’ll see disruption of traditional UIs. As Gen AI goes beyond chat, users will interact with agents in the most convenient way available at the time. Agents should be isolated from the details of user interaction.

## Next Steps

The wiki [agent](https://github.com/embabel/embabel-agent-examples/tree/main/examples-java/src/main/java/com/embabel/example/wikipedia) is in the [embabel-examples](https://github.com/embabel/embabel-agent-examples/) repository, along with other Java and Kotlin examples.

Hopefully this has whetted your appetite for exploring [Embabel](https://github.com/embabel/embabel-agent), and building agents you can use from Claude Desktop and other MCP clients.

Clone the examples or use our [Java](https://github.com/embabel/java-agent-template) or [Kotlin](https://github.com/embabel/kotlin-agent-template) agent templates repository to have your own Embabel running in minutes.

Join the Embabel [community](https://discord.gg/t6bjkyj93q). Contribute to [development](https://github.com/embabel/embabel-agent). Help bring the power of the JVM to unlocking the power of Gen AI.
