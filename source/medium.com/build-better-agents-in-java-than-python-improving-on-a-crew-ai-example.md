# Build Better Agents in Java than Python: Improving on a Crew AI Example | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/build-better-agents-in-java-than-python-improving-on-a-crew-ai-example-c935ba9b6296](https://medium.com/@springrod/build-better-agents-in-java-than-python-improving-on-a-crew-ai-example-c935ba9b6296)
**來源網站**: medium.com

---

# Build Better Agents in Java than Python: Improving on a Crew AI Example

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--c935ba9b6296---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--c935ba9b6296---------------------------------------)

8 min read

·

Oct 1, 2025

--

3

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Dc935ba9b6296&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fbuild-better-agents-in-java-than-python-improving-on-a-crew-ai-example-c935ba9b6296&source=---header_actions--c935ba9b6296---------------------post_audio_button------------------)

Share

[CrewAI](https://www.crewai.com/) has good examples. This is probably a major reason for its popularity.

These examples are also a convenient source of material to demonstrate the superiority of Embabel’s model over Crew’s, and that of the JVM over Python for real world Gen AI applications.

I previously tackled Crew’s [write a book flow](/@springrod/you-can-build-better-ai-agents-in-java-than-python-868eaf008493). Today I’ll take a second Crew sample and reimplement it in Java using Embabel.

Press enter or click to view image in full size

![]()

Java v Python for Gen AI

## The Example: Meeting Prep Agent

I chose the [prep for a meeting](https://github.com/crewAIInc/crewAI-examples/tree/main/crews/prep-for-a-meeting) example, as it’s a realistic, useful workflow. Given a meeting context and objective and a list of participant emails, it researches each participant, analyses the relevant industry and creates a briefing document to guide the meeting convenor in approaching the meeting.

The implementation uses multiple LLM calls, each given tools to use for research.

## Crew Implementation

Unlike the book writing example, this example is entirely implemented in Python, rather than externalizing crew and task definitions in YML. This makes no conceptual difference. (Embabel also supports both code and configuration.)

As usual with Crew, we set up **agents** and **tasks**.

Agents perform tasks. They define a role, goal and backstory which will be inserted into prompts to personalize behavior, and tools to help them do their work. Each agent will be responsible for one LLM call:

```
class MeetingPreparationAgents():  
 def research_agent(self):  
  return Agent(  
   role='Research Specialist',  
   goal='Conduct thorough research on people and companies involved in the meeting',  
   tools=ExaSearchTool.tools(),  
   backstory=dedent("""\  
     As a Research Specialist, your mission is to uncover detailed information  
     about the individuals and entities participating in the meeting. Your insights  
     will lay the groundwork for strategic meeting preparation."""),  
   verbose=True  
  )  
  
 def industry_analysis_agent(self):  
  return Agent(  
   role='Industry Analyst',  
   goal='Analyze the current industry trends, challenges, and opportunities',  
   tools=ExaSearchTool.tools(),  
   backstory=dedent("""\  
     As an Industry Analyst, your analysis will identify key trends,  
     challenges facing the industry, and potential opportunities that  
     could be leveraged during the meeting for strategic advantage."""),  
   verbose=True  
  )  
  
 def meeting_strategy_agent(self):  
  return Agent(  
   role='Meeting Strategy Advisor',  
   goal='Develop talking points, questions, and strategic angles for the meeting',  
   tools=ExaSearchTool.tools(),  
   backstory=dedent("""\  
     As a Strategy Advisor, your expertise will guide the development of  
     talking points, insightful questions, and strategic angles  
     to ensure the meeting's objectives are achieved."""),  
   verbose=True  
  )  
  
 def summary_and_briefing_agent(self):  
  return Agent(  
   role='Briefing Coordinator',  
   goal='Compile all gathered information into a concise, informative briefing document',  
   tools=ExaSearchTool.tools(),  
   backstory=dedent("""\  
     As the Briefing Coordinator, your role is to consolidate the research,  
     analysis, and strategic insights."""),  
   verbose=True  
  )
```

We now create tasks, which the agents can be given to perform. These essentially define prompts, expressed in terms of context objects:

```
class MeetingPreparationTasks():  
 def research_task(self, agent, participants, context):  
  return Task(  
   description=dedent(f"""\  
    Conduct comprehensive research on each of the individuals and companies  
    involved in the upcoming meeting. Gather information on recent  
    news, achievements, professional background, and any relevant  
    business activities.  
  
    Participants: {participants}  
    Meeting Context: {context}"""),  
   expected_output=dedent("""\  
    A detailed report summarizing key findings about each participant  
    and company, highlighting information that could be relevant for the meeting."""),  
   async_execution=True,  
   agent=agent  
  )  
  
 def industry_analysis_task(self, agent, participants, context):  
  return Task(  
   description=dedent(f"""\  
    Analyze the current industry trends, challenges, and opportunities  
    relevant to the meeting's context. Consider market reports, recent  
    developments, and expert opinions to provide a comprehensive  
    overview of the industry landscape.  
  
    Participants: {participants}  
    Meeting Context: {context}"""),  
   expected_output=dedent("""\  
    An insightful analysis that identifies major trends, potential  
    challenges, and strategic opportunities."""),  
   async_execution=True,  
   agent=agent  
  )  
  
 def meeting_strategy_task(self, agent, context, objective):  
  return Task(  
   description=dedent(f"""\  
    Develop strategic talking points, questions, and discussion angles  
    for the meeting based on the research and industry analysis conducted  
  
    Meeting Context: {context}  
    Meeting Objective: {objective}"""),  
   expected_output=dedent("""\  
    Complete report with a list of key talking points, strategic questions  
    to ask to help achieve the meetings objective during the meeting."""),  
   agent=agent  
  )  
  
 def summary_and_briefing_task(self, agent, context, objective):  
  return Task(  
   description=dedent(f"""\  
    Compile all the research findings, industry analysis, and strategic  
    talking points into a concise, comprehensive briefing document for  
    the meeting.  
    Ensure the briefing is easy to digest and equips the meeting  
    participants with all necessary information and strategies.  
  
    Meeting Context: {context}  
    Meeting Objective: {objective}"""),  
   expected_output=dedent("""\  
    A well-structured briefing document that includes sections for  
    participant bios, industry overview, talking points, and  
    strategic recommendations."""),  
   agent=agent  
  )
```

While the initial inputs (participants, context and objective) are referenced in a type safe way, the context added as the flow runs is not. So in the `summary_and_briefing_task` we need to take on trust that the industry overview has been added to the context.

Finally we wire these up together and kick off the crew:

```
# Create Agents  
researcher_agent = agents.research_agent()  
industry_analyst_agent = agents.industry_analysis_agent()  
meeting_strategy_agent = agents.meeting_strategy_agent()  
summary_and_briefing_agent = agents.summary_and_briefing_agent()  
  
# Create Tasks  
research = tasks.research_task(researcher_agent, participants, context)  
industry_analysis = tasks.industry_analysis_task(industry_analyst_agent, participants, context)  
meeting_strategy = tasks.meeting_strategy_task(meeting_strategy_agent, context, objective)  
summary_and_briefing = tasks.summary_and_briefing_task(summary_and_briefing_agent, context, objective)  
  
meeting_strategy.context = [research, industry_analysis]  
summary_and_briefing.context = [research, industry_analysis, meeting_strategy]  
  
# Create Crew responsible for Copy  
crew = Crew(  
 agents=[  
  researcher_agent,  
  industry_analyst_agent,  
  meeting_strategy_agent,  
  summary_and_briefing_agent  
 ],  
 tasks=[  
  research,  
  industry_analysis,  
  meeting_strategy,  
  summary_and_briefing  
 ]  
)  
  
result = crew.kickoff()
```

This is a sound approach. It breaks the task into manageable chunks, likely improving reliability and predictability versus relying on LLM agency and less focused tool calling.

Pretty good. But we can do better.

## Embabel Implementation

Embabel [emphasizes domain modeling](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8). Agents naturally fall out of a strong domain model. Thus I started by creating the domain types, not the agent. While Crew purely uses strings in this sample, the Embabel implementation centres around a domain model that should be intuitive:

```
public abstract class Domain {  
  
    public record Meeting(  
            String context,  
            String objective,  
            @JsonPropertyDescription("A list of participant email addresses or however else we identify them, e.g. 'Roger Daltrey The Who' or 'roger@who.com'")  
            List<String> participants  
    ) {  
  
        public String purpose() {  
            return "Meeting:\nContext: %s\nObjective: %s\n".formatted(context, objective);  
        }  
    }  
  
    public record ResearchedParticipant(  
            String email,  
            String writeup) implements PromptContributor {  
  
        public String contribution() {  
            return "- %s: %s".formatted(email, writeup);  
        }  
    }  
  
    public record Participants(  
            List<ResearchedParticipant> participants  
    ) implements PromptContributor {  
  
        public String contribution() {  
            return participants.stream()  
                    .map(ResearchedParticipant::contribution)  
                    .collect(java.util.stream.Collectors.joining("\n"));  
        }  
    }  
  
    public record IndustryAnalysis(  
            String analysis  
    ) {  
    }  
  
    public record MeetingStrategy(  
            @JsonPropertyDescription("Complete report with a list of key talking points and strategic questions" +  
                    " to ask, to help achieve the meeting's objective")  
            String strategy  
    ) {  
    }  
  
    public record Briefing(  
            Meeting meeting,  
            Participants participants,  
            IndustryAnalysis industryAnalysis,  
            MeetingStrategy meetingStrategy,  
            String briefing  
    ) {  
    }  
  
}
```

The agent is naturally expressed as a flow of these domain objects. The steps are similar to Crew’s. However, we don’t need to wire them up in order, as the [Embabel planner](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6) will infer the ordering from the input and output types.

All interactions with the LLM are typed, and all prompts are built with access to the relevant domain objects. We use the `withTools` method on the `PromptRunner` interface to add tools for each LLM interaction. (The tools themselves will come from MCP.) We use the `OperationContext.parallelMap` method to research participants in parallel — taking care to control maximum concurrency to avoid rate limiting or worse:

```
@Agent(description = "A meeting prepper agent that helps users prepare for meetings ")  
public record PrepperAgent(  
        PrepperConfig config  
) {  
  
    @Action  
    public Domain.Participants researchParticipants(Domain.Meeting meeting,   
                        OperationContext embabel) {  
        var researcher = config.researcher()  
                .promptRunner(embabel)  
                .withTools("linked-in")  
                .creating(Domain.ResearchedParticipant.class);  
        var participants = embabel.parallelMap(  
                meeting.participants(),  
                config.maxConcurrency(),  
                participant -> researcher.fromPrompt("""  
                        Conduct comprehensive research on this individual and company  
                        involved in the upcoming meeting. Gather information on recent  
                        news, achievements, professional background, and any relevant  
                        business activities.  
                          
                        Participant: %s  
                        %s  
                        """.formatted(participant, meeting.purpose())  
                ));  
        return new Domain.Participants(participants);  
    }  
  
    @Action  
    public Domain.IndustryAnalysis analyzeIndustry(Domain.Meeting meeting,   
                      Domain.Participants participants, Ai ai) {  
        return config.industryAnalyzer()  
                .promptRunner(ai)  
                .createObject("""  
                                Analyze the current industry trends, challenges, and opportunities  
                                relevant to the meeting's context. Consider market reports, recent  
                                developments, and expert opinions to provide a comprehensive  
                                overview of the industry landscape.  
                                  
                                Identify major trends, potential  
                                challenges, and strategic opportunities.  
                                  
                                Participants: %s  
                                %s  
                                """.formatted(participants.contribution(), meeting.purpose()),  
                        Domain.IndustryAnalysis.class);  
    }  
  
    @Action  
    public Domain.MeetingStrategy formulateMeetingStrategy(  
            Domain.Meeting meeting,  
            Domain.Participants participants,  
            Domain.IndustryAnalysis industryAnalysis,  
            Ai ai) {  
        return config.meetingStrategist()  
                .promptRunner(ai)  
                .createObject("""  
                                Develop strategic talking points, questions, and discussion angles  
                                for the meeting based on the research and industry analysis conducted  
                                  
                                Participants: %s  
                                  
                                %s),  
                                """.formatted(participants.contribution(), meeting.purpose()),  
                        Domain.MeetingStrategy.class);  
    }  
  
    @Action  
    @AchievesGoal(description = "Produce a briefing for the meeting",  
            export = @Export(remote = true, startingInputTypes = {Domain.Meeting.class}))  
    public Domain.Briefing produceBriefing(  
            Domain.Meeting meeting,  
            Domain.Participants participants,  
            Domain.IndustryAnalysis industryAnalysis,  
            Domain.MeetingStrategy meetingStrategy,  
            Ai ai) {  
        var briefing = config.briefingWriter()  
                .promptRunner(ai)  
                .generateText("""  
                        Compile all the information given into a briefing for the meeting  
                        Consolidate research, analysis, and strategic insights.  
                          
                        %s  
                        Participants: %s  
                        """.formatted(meeting.purpose(), participants.contribution()  
                ));  
        return new Domain.Briefing(  
                meeting,  
                participants,  
                industryAnalysis,  
                meetingStrategy,  
                briefing  
        );  
    }  
}
```

The `AchievesGoal` annotation indicates that successful execution of the`produceBriefing` method will complete the flow. The `Domain.Briefing` instance will be the result of the agent process.

We externalize configuration, injecting a `PrepperConfig`Spring `@ConfigurationProperties` instance:

```
@ConfigurationProperties(prefix = "prepper")  
@Validated  
public record PrepperConfig(  
        @NotNull Actor<RoleGoalBackstory> researcher,  
        @NotNull Actor<RoleGoalBackstory> industryAnalyzer,  
        @NotNull Actor<RoleGoalBackstory> meetingStrategist,  
        @NotNull Actor<RoleGoalBackstory> briefingWriter,  
        @DefaultValue("8") int maxConcurrency  
) {  
}
```

The `Actor` type encapsulates LLM choice, prompt contribution and tools. It is analogous to a Crew *agent,* although more flexible, as it isn’t restricted to role, goal and backstory, but can hold any kind of prompt contribution.

`PrepperConfig` is populated from`application.yml`:

```
  prepper:  
    researcher:  
      llm:  
        role: best  
      tool-groups:  
        - web  
      persona:  
        role: Research Specialist  
        goal: Conduct thorough research on people and companies involved in the meeting  
        backstory: >  
          As a Research Specialist, your mission is to uncover detailed information  
          about the individuals and entities participating in the meeting. Your insights  
          will lay the groundwork for strategic meeting preparation.  
    industry-analyzer:  
      llm:  
        role: balanced  
      tool-groups:  
        - web  
      persona:  
        role: Industry Analyst  
        goal: Analyze the current industry trends, challenges, and opportunities  
        backstory: >  
          As an Industry Analyst, your analysis will identify key trends,  
          challenges facing the industry, and potential opportunities that  
          could be leveraged during the meeting for strategic advantage  
    meeting-strategist:  
      llm:  
        role: best  
      tool-groups:  
        - web  
      persona:  
        role: Meeting Strategy Advisor  
        goal: Develop talking points, questions, and strategic angles for the meeting  
        backstory: >  
          As a Strategy Advisor, your expertise will guide the development of  
          talking points, insightful questions, and strategic angles  
          to ensure the meeting's objectives are achieved  
    briefing-writer:  
      llm:  
        role: best  
      tool-groups:  
        - web  
      persona:  
        role: Briefing Coordinator  
        goal: Compile all gathered information into a concise, informative briefing document  
        backstory: >  
          As the Briefing Coordinator, your role is to consolidate the research,  
          analysis, and strategic insights
```

Also in `application.yml,` we configure tools and LLM roles using common Embabel properties, making it easy to switch LLMs without code changes:

```
embabel  
  agent:  
      platform:  
        tools:  
          includes:  
            linked-in:  
              tools:  
                - get_person_profile  
                - get_company_profile  
    models:  
      llms:  
        best: gpt-4.1  
        balanced: gpt-4.1-mini  
        cheapest: gpt-4.1-nano
```

> We recommend requesting LLMs by **role** rather than by name. This indirection is good engineering practice and makes it easier to adapt applications for different environments.

## Comparison

This is a simple example and the solutions are conceptually similar.

The Embabel version is superior in several ways that would likely become more important as the project grows:

* **It’s wholly type safe**. All prompts are built with strong typing. This will survive refactoring and avoid the risk of typos.
* **Externalizing the domain model delivers greater extensibility**. A real meeting prep agent would maintain a database of contacts it has already researched. Having a domain object for a contact facilitates this.

> If you were on Python, it would be hard to justify jumping to another stack because of these differences. If you were already on the JVM, however, Embabel would be a no brainer. Bringing in a new (Python) stack for an inferior solution would make no sense at all.

## Next Steps

The source code is available in the <https://github.com/embabel/prepper> repo. The head of the main branch adds JPA support via Spring Data repositories and an `@Entity`mapped domain object, showing how the Embabel approach is ready to grow with real requirements.

If you haven’t yet built your own Embabel agent, try our [Java agent template repository](https://github.com/embabel/java-agent-template) and get started in minutes. Join our [active community on Discord](https://discord.gg/t6bjkyj93q), contribute to [Embabel agent](https://github.com/embabel/embabel-agent/) and our other projects, and help build the future of agent frameworks.
