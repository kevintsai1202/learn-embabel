# Build Better Agents in Java vs Python: Embabel vs LangGraph | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/build-better-agents-in-java-vs-python-embabel-vs-langgraph-f7951a0d855c](https://medium.com/@springrod/build-better-agents-in-java-vs-python-embabel-vs-langgraph-f7951a0d855c)
**來源網站**: medium.com

---

# Build Better Agents in Java vs Python: Embabel vs LangGraph

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--f7951a0d855c---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--f7951a0d855c---------------------------------------)

15 min read

·

Nov 4, 2025

--

3

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Df7951a0d855c&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fbuild-better-agents-in-java-vs-python-embabel-vs-langgraph-f7951a0d855c&source=---header_actions--f7951a0d855c---------------------post_audio_button------------------)

Share

Many people suffer from the misconception that Python is the natural language for building Gen AI *applications,* as opposed to doing data science.

In fact, if you’re already on the JVM, doing Gen AI on the JVM is a no brainer. And if you’re not in either camp, a fair comparison of the two might surprise you.

In previous blogs, I’ve taken [CrewAI](https://www.crewai.com/) and [Pydantic AI](https://ai.pydantic.dev/) examples and reimplemented them in Java with [Embabel](https://github.com/embabel/embabel-agent), mirroring the functionality in cleaner, more extensible code.

Today it’s the turn of [LangGraph](https://www.langchain.com/langgraph). LangGraph is an outgrowth of [LangChain](https://www.langchain.com/), the first and most popular Python Gen AI framework. LangChain’s popularity, and the promise of LangGraph, has made the company hot property, [recently raising a Series B at a $1.1bn valuation](https://sacra.com/c/langchain/). Can its frameworks do things Java cannot?

![Not such a clever snake?]()

## LangGraph Architecture

LangGraph offers a code-centric approach to multi-agent workflows. It uses a [finite state machine (**FSM**)](https://en.wikipedia.org/wiki/Finite-state_machine) to order actions. **Nodes** (states) are functions; **edges** (transitions) can be automatic or determined dynamically from function call results.

Nodes and edges break long flows into multiple steps, making execution more deterministic and workflows easier to reason about.

A state machine is one of the most obvious ways to define workflows, so it’s not surprising that LangChain, whose market position is largely due to being *first*, rather than best, would leap to adopt it. But is it the best model, or might a less obvious solution be superior? At Embabel we built several iterations of state machines before settling on a different approach, based on [Goal Oriented Action Planning (GOAP)](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6).

> Sometimes it’s best not to be the first mover, but to learn from the successes and mistakes of others.

## Pattern Showdown

I’ve been meaning to do a methodical comparison between Embabel and LangGraph for some time.

To make it fair, I’ve not chosen examples of my own, but reimplemented patterns from a recent blog on [Agentic Design Patterns with LangGraph](https://pub.towardsai.net/agentic-design-patterns-with-langgraph-5fe7289187e6) by Hamza Boulahia. As the author notes:

> If there’s one thing I’ve learned building AI systems over the last couple of years, it’s this: patterns matter. Whether we’re designing traditional software or experimenting with large language model (LLM) agents, the way we structure workflows determines how robust, flexible, and scalable they’ll be.
>
> …In this post, I’ll walk you through some of the most common agentic design patterns you can implement in LangGraph.

Boulahia demonstrates six agent design patterns:

* **Prompt chaining** — breaking complex tasks into manageable steps
* **Routing and parallelization** for control flow
* **Reflection**, where agents critique and improve outputs
* **Tool use** to integrate with external systems
* **Planning** — structuring goals into clear, executable sequences
* **Multi-agent collaboration**

Let’s go through each pattern in turn and show how it can be better expressed in Java using Embabel.

## Prompt Chaining

Prompt chaining is an essential pattern where one model’s output becomes another model’s input. It makes workflows more predictable. The example suggests topics based on user input, and generates several blog titles for each topic.

### LangGraph Implementation

The example uses the underlying LangChain API for LLM invocation, while LangGraph adds workflow management.

Like any workflow engine, LangGraph (unlike the lower level LangChain) needs to maintain process state. This is expressed in the `State` class.

The flow is defined via nodes and edges. Each node is a Python method that calls an LLM.

```
# Define LLM client  
llm = ChatGoogleGenerativeAI(  
    model="gemini-2.0-flash",  
    api_key=GOOGLE_API_KEY,  
    system_instruction="""You are an expert technical writer. Always give clear,  
     concise, and straight-to-the-point answers."""  
)  
  
# Define the graph state  
class State(dict):  
    text: str  
    topics: str  
    title: str  
  
# Define nodes  
def extract_topics(state: State) -> State:  
    prompt = f"Extract 1-3 key topics from the following text:\n\n{state['text']}"  
    resp = llm.invoke(prompt)  
    state["topics"] = resp.content.strip()  
    return state  
  
def generate_title(state: State) -> State:  
    prompt = f"Generate two catchy blog titles for each one these topics:\n\n{state['topics']}"  
    resp = llm.invoke(prompt)  
    state["title"] = resp.content.strip()  
    return state
```

The workflow is built in code, with nodes mapping to methods and edges linking them. In this case the edges are simple: Automatic transition to the next state. As the workflow is expressed in terms of magic strings, there is little checking of its validity at compile time.

```
# Build the graph  
workflow = StateGraph(State)  
workflow.add_node("extract_topics", extract_topics)  
workflow.add_node("generate_title", generate_title)  
  
# Define the node connections  
workflow.set_entry_point("extract_topics")  
workflow.add_edge("extract_topics", "generate_title")  
workflow.add_edge("generate_title", END)  
  
# Compile runnable graph  
graph = workflow.compile()
```

We run the workflow as follows:

```
input_text = (  
    "LangGraph introduces a graph-based paradigm for building LLM-powered agents. "  
    "It allows developers to create modular, debuggable, and reliable agent workflows "  
    "using nodes, edges, and state passing."  
)  
  
result = graph.invoke({"text": input_text})  
print("Topics:", result["topics"])  
print("\n"+"="*50+"\n")  
print("Suggested Blog Title:", result["title"])
```

This will produce output like this:

```
Topics: Here are 3 key topics extracted from the text:  
  
1.  **Graph-based LLM Agents:** The core concept of using a graph structure to build LLM agents.  
2.  **Modularity, Debuggability, and Reliability:** The benefits of using LangGraph for agent development.  
3.  **Nodes, Edges, and State Passing:** The fundamental components of the LangGraph framework.  
  
==================================================  
  
Suggested Blog Title: Okay, here are two catchy blog titles for each of the three topics, aiming for a mix of clarity and intrigue:  
  
**1. Graph-based LLM Agents:**  
  
*   **Title 1:** Unleashing the Power of Graph Minds: Building Smarter LLM Agents  
*   **Title 2:** Beyond Chains: How Graph-Based Agents are Revolutionizing LLMs  
  
**2. Modularity, Debuggability, and Reliability:**  
  
*   **Title 1:** LangGraph: The Secret to Building Reliable and Debuggable LLM Agents  
*   **Title 2:** Stop Chasing Bugs: LangGraph's Modular Approach to LLM Agent Development  
  
**3. Nodes, Edges, and State Passing:**  
  
*   **Title 1:** LangGraph Demystified: Nodes, Edges, and the Flow of Intelligent Conversations  
*   **Title 2:** Building Blocks of Brilliance: Mastering Nodes, Edges, and State in LangGraph
```

### Embabel Implementation

It’s hard to do a direct port of this because, albeit trivial, it’s poorly designed. The domain model is particularly lacking. Python approaches to Gen AI tend to underemphasize domain modeling, [which is a serious mistake](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8). All fields of the `State` class are modelled as strings, where there should be a structure. Expressing `topics` as a single string is particularly misleading.

I made the minimum changes to be able to live with the solution. Here’s the Embabel implementation, expressed in terms of a **domain model**, **actions** and a **goal**.

The domain objects are Java records, correctly representing the structure implied by the requirements.

The `@Agent` annotation causes the class to be instantiated and injected by Spring, and processed by Embabel. The `@Action` methods are steps, and the goal the desired output:

```
@Agent(description = "Blog Titler Agent")  
public class BlogTitler {  
  
    private final Actor<?> techWriter = new Actor<>(  
    """  
            You are an expert technical writer. Always give clear,  
            concise, and straight-to-the-point answers.  
            """,  
            LlmOptions.withAutoLlm());  
  
    public record Topics(  
            List<String> topics  
    ) {  
    }  
  
    public record TopicTitles(  
            String topic,  
            List<String> titles  
    ) {  
    }  
  
    public record BlogTitles(  
            List<TopicTitles> topicTitles  
    ) {  
    }  
  
    @Action  
    public Topics extractTopics(UserInput userInput, Ai ai) {  
        return techWriter.promptRunner(ai)  
                .creating(Topics.class)  
                .fromPrompt("""  
                        Extract 1-3 key topics from the following text:  
                        %s  
                        """.formatted(userInput.getContent()));  
    }  
  
    @Action  
    @AchievesGoal(description="Generate Titles for Topics")  
    public BlogTitles generateBlogTitles(Topics topics, OperationContext context) {  
        var titles = context.parallelMap(  
                topics.topics(),  
                10,  
                topic -> techWriter.promptRunner(context)  
                .creating(TopicTitles.class)  
                .fromPrompt("""  
                        Generate two catchy blog titles for this topic:  
                        %s  
                        """.formatted(topic)));  
        return new BlogTitles(titles);  
    }  
  
}
```

The `Actor` field combines LLM selection with hyperparameters and an instruction.

The `extractTopics` and `generateBlogTitles` methods are the equivalent of the LangGraph node methods. However, the workflow is put together quite differently.

> With Embabel we don’t need to specify the workflow in code. Embabel plans an execution path by analyzing our code.

The Embabel planner can infer the correct execution plan from the flow of types. For example, it can see that the goal can only be achieved if a `Topics` and `BlogTitles` object is available in workflow scope. Thus it can correctly determine the order of methods to call. This planning step is deterministic.

We model the `generateBlogTitles` step in terms of parallel operations, more naturally reflecting the requirements and resulting in cleaner, more focused interactions with the LLM.

The output will look like this. Unlike the LangGraph example’s output, the structure accurately reflects the requirements:

```
{  
  "topicTitles" : [ {  
    "topic" : "LangGraph graph-based paradigm for LLM agents",  
    "titles" : [ "Unlocking Smarter AI: How LangGraph’s Graph-Based Paradigm Revolutionizes LLM Agents", "Navigating the Future of LLM Agents with LangGraph’s Innovative Graph-Based Approach" ]  
  }, {  
    "topic" : "Modular and debuggable agent workflows",  
    "titles" : [ "Streamlining Success: Building Modular and Debuggable Agent Workflows", "Mastering Agent Workflows: The Power of Modularity and Debugging" ]  
  }, {  
    "topic" : "Comparison with Embabel's GOAP planning",  
    "titles" : [ "Mastering GOAP: How Embabel’s Planning Stacks Up Against the Rest", "Embabel's GOAP Planning Compared: What Makes It Stand Out?" ]  
  } ]  
}
```

### Comparison

Both implementations break the flow into small, focused steps, which makes it more predictable. There is slightly more code in the Embabel version, because it properly models cardinality.

The Embabel implementation is superior in several respects. It’s type safe. It has a true domain model versus misleading strings. It’s easier to test. And parallelization is only possible because of the additional structure.

Some enhancements that would be trivial with the Embabel, but not LangGraph, implementation:

* **Externalizing LLM choice and persona**: With Embabel and Spring, it’s trivial to externalize the `Actor` definition into an `application.yml` file, along with all the other sophisticated configuration options that are lacking in Python.
* **Persisting topics and blog titles**: Because we have correctly structured domain objects, we could easily persist them if we wished.

## Routing

Another fundamental pattern is routing within a workflow. Here’s a LangGraph implementation, first performing sentiment analysis and then choosing one or other function to generate a response:

```
llm = ChatGoogleGenerativeAI(  
    model="gemini-2.0-flash",  
    api_key=GOOGLE_API_KEY,  
    system_instruction="""You are a helpful assistant that can classify text   
    sentiment and respond accordingly."""  
)  
  
class State(dict):  
    text: str  
    sentiment: str  
    response: str  
  
# Nodes  
def calssification(state: State) -> str:  
    """Classify sentiment."""  
    prompt = f"Is the following text positive or negative? Answer with one word only: Positive or Negative.\n\n{state['text']}"  
    resp = llm.invoke(prompt)  
    sentiment = resp.content.strip().lower()  
    state["sentiment"] = sentiment  
    return state  
  
def positive_node(state: State) -> State:  
    prompt = f"Generate an encouraging reply to this positive text:\n\n{state['text']}"  
    resp = llm.invoke(prompt)  
    state["response"] = resp.content.strip()  
    return state  
  
def negative_node(state: State) -> State:  
    prompt = f"Generate a supportive reply to this negative text:\n\n{state['text']}"  
    resp = llm.invoke(prompt)  
    state["response"] = resp.content.strip()  
    return state  
  
def router_func(state: State) -> Literal["positive", "negative"]:  
    """Return next node name."""  
    return "positive" if "positive" in state["sentiment"] else "negative"  
  
# Build the graph  
workflow = StateGraph(State)  
  
workflow.add_node("calssification", calssification)  
workflow.add_node("positive", positive_node)  
workflow.add_node("negative", negative_node)  
  
# classify node decides the next step  
workflow.set_entry_point("calssification")  
workflow.add_conditional_edges("calssification", router_func, {  
    "positive": "positive",  
    "negative": "negative",  
})  
  
# Both branches lead to END  
workflow.add_edge("positive", END)  
workflow.add_edge("negative", END)  
  
graph = workflow.compile()
```

As usual with LangGraph, the workflow is built with unchecked strings. It’s fortunate that the author has consistently misspelt “classification” because typos matter a lot with something this fragile.

This example shows a more sophisticated LangGraph state transition, mapping the output of a function to the next state name, with still more error-prone magic strings as a bonus:

```
workflow.add_conditional_edges("calssification", router_func, {  
    "positive": "positive",  
    "negative": "negative",  
})
```

We run this as follows:

```
input_text = "I'm so happy with how my project turned out!"  
result = graph.invoke({"text": input_text})  
print("Sentiment:", result["sentiment"])  
print("Response:", result["response"])
```

### Embabel Implementation

Explicit wiring of nodes and edges seems overcomplicated for something so simple. Let’s express the steps in a more natural manner.

Because the steps are different, we can simply use a focused prompt each time, rather than a common system message associated with the LLM.

First we’ll create types for `Sentiment`. This will enable the flow to be expressed in terms of data types:

```
@Agent(description = "Perform sentiment analysis")  
public class ClassificationAgent {  
  
    @JsonTypeInfo(  
            use = JsonTypeInfo.Id.SIMPLE_NAME,  
            include = JsonTypeInfo.As.PROPERTY,  
            property = "type"  
    )  
    public sealed interface Sentiment {  
    }  
  
    public static final class Positive implements Sentiment {  
    }  
  
    public static final class Negative implements Sentiment {  
    }  
  
    public record Response(String message) {  
    }  
  
    private enum SentimentType {  
        POSITIVE,  
        NEGATIVE;  
  
        public Sentiment toSentiment() {  
            return switch (this) {  
                case POSITIVE -> new Positive();  
                case NEGATIVE -> new Negative();  
            };  
        }  
    }
```

Now we can implement the first step as a `classify` method that returns `Sentiment`. The Embabel planner is smart enough to know that `Sentiment`has subtypes and route appropriately.

The `encourage` and `help` methods each take a `Sentiment` subtype. Like the Python functions, they invoke an LLM to generate a response.

```
@Action  
  public Sentiment classify(UserInput userInput, Ai ai) {  
      var type = ai.withAutoLlm()  
              .createObject("""  
                              Determine if the sentiment of the following text is positive or negative.  
                              Text: "%s"  
                              """.formatted(userInput.getContent()),  
                      SentimentType.class);  
      return type.toSentiment();  
  }  
  
  @Action  
  public Response encourage(  
          UserInput userInput,  
          Positive sentiment,  
          Ai ai) {  
      return ai.withAutoLlm()  
              .createObject("""  
                      Generate an encouraging response to the following positive text:  
                      %s  
                      """.formatted(userInput.getContent()), Response.class);  
  }  
  
  @Action  
  public Response help(  
          UserInput userInput,  
          Negative sentiment,  
          Ai ai) {  
      return ai.withAutoLlm()  
              .createObject("""  
                      Generate a supportive response to the following negative text:  
                      %s  
                      """.formatted(userInput.getContent()), Response.class);  
  }  
  
  @AchievesGoal(  
          description = "Generate a response based on discerning sentiment in user input")  
  @Action  
  public Response done(Response response) {  
      return response;  
  }  
  
}
```

### Comparison

Defining this flow via data types with Embabel is more natural and less error-prone than the LangChain state machine. Again, with Embabel we don’t need to define the flow, as the planner will work it out.

## Parallelization

LLM interactions can be slow. Thus parallelization is important in Gen AI applications.

LangGraph lets us parallelize operations through “parallel edges.”

```
# Build the graph  
builder = StateGraph(State)  
builder.add_node("summarize", summarize)  
builder.add_node("critique", critique)  
builder.add_node("combine", combine)  
  
# Parallel edges: summarize and critique run side by side  
builder.add_edge(START, "summarize")  
builder.add_edge(START, "critique")  
  
# Both join into combine  
builder.add_edge("summarize", "combine")  
builder.add_edge("critique", "combine")  
  
builder.add_edge("combine", END)p
```

With Embabel, we have two choices for parallelization:

* **Programmatic**, using the `parallelMap` method that we saw in the blog title example.
* **Automatic**: If we set `embabel.agent.platform.process-type=CONCURRENT,` the planner will automatically run in parallel operations that are both necessary to achieve the current goal and which don’t depend on each other.

## Reflection

This is a common and important pattern that goes by various names. Anthropic’s [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) article calls this pattern **Evaluator-optimizer**.

The key idea is to use one LLM call to provide feedback on the output of another, iterating until the result is satisfactory.

Here’s the LangGraph implementation, drafting text in response to a user-specified task and critiquing it until it’s satisfactory.

```
# State  
class State(TypedDict):  
    task: str  
    draft: str  
    feedback: str  
    final: str  
  
# Nodes  
def generator(state: State):  
    """Generate an initial or refined draft."""  
    prompt = f"""  
You are an assistant helping to complete the following task:  
  
Task:  
{state['task']}  
  
Current Draft:  
{state.get('draft', 'None')}  
  
Feedback:  
{state.get('feedback', 'None')}  
  
Instructions:  
- If there is no draft and no feedback, generate a clear and complete response to the task.  
- If there is a draft but no feedback, improve the draft as needed for clarity and quality.  
- If there is both a draft and feedback, revise the draft by incorporating the feedback directly.  
- Always produce a single, improved draft as your output.  
"""  
    resp = llm.invoke(prompt)  
    return {"draft": resp.content.strip()}  
  
def evaluator(state: State):  
    """Evaluate the draft and give feedback or approval."""  
    prompt = f"""Evaluate the following draft, based on the given task.   
If it meets the requirements, reply exactly 'APPROVED'.   
Otherwise, provide constructive feedback for improvement.  
Task:  
{state['task']}  
Draft:  
{state['draft']}"""  
    resp = llm.invoke(prompt)  
    print(f"""  
================= DRAFT =================  
{state['draft']}  
  
================ FEEDBACK ===============  
{resp.content.strip()}  
========================================  
""")  
    return {"feedback": resp.content.strip()}  
  
def decide(state: State) -> str:  
    """Decide next step: either approve and finish, or refine again."""  
    if "APPROVED" in state["feedback"].upper():  
        return "approved"  
    return "refine"  
  
def finalize(state: State):  
    """Save the final approved draft."""  
    return {"final": state["draft"]}  
  
# Build the graph  
builder = StateGraph(State)  
  
builder.add_node("generator", generator)  
builder.add_node("evaluator", evaluator)  
builder.add_node("finalize", finalize)  
  
builder.add_edge(START, "generator")  
builder.add_edge("generator", "evaluator")  
builder.add_edge("evaluator", "finalize")  
  
# Conditional edges from decide  
builder.add_conditional_edges(  
    "evaluator",  
    decide,  
    {  
        "approved": "finalize",   # stop loop  
        "refine": "generator",    # go back for improvement  
    },  
)  
  
builder.add_edge("finalize", END)  
  
graph = builder.compile()
```

While the pattern is valuable, this implementation is far from ideal. For a start, it’s not guaranteed to terminate.

From the developer point of view, a state machine isn’t the ideal expression of this common workflow. To be fair, neither is Embabel’s GOAP planning.

> While an FSM or GOAP is well suited to coarse grained planning, well-known fine grained operations can be made easier by dedicated framework support.

Thus Embabel provides out of the box implementations of such common patterns. (You can also write your own.) The fluent API for such builders emits GOAP plans, so the platform can manage the steps in its normal way.

We create an `Agent` programmatically using `RepeatUntilAcceptableBuilder` and expose it as a Spring bean in an `@Configuration` class. Embabel will automatically deploy it:

```
@Bean  
public Agent draftAndRefineAgent() {  
  return RepeatUntilAcceptableBuilder  
      .returning(Draft.class)  
      .consuming(UserInput.class)  
      .withMaxIterations(7)  
      .withScoreThreshold(.9)  
      .repeating(tac -> {  
          return tac.ai()  
                  .withAutoLlm()  
                  .createObject(  
                          """  
                          You are an assistant helping to complete the following task:  
                            
                          Task:  
                          %s  
                            
                          Current Draft:  
                          %s  
                            
                          Feedback:  
                          %s  
                            
                          Instructions:  
                          - If there is no draft and no feedback, generate a clear and complete response to the task.  
                          - If there is a draft but no feedback, improve the draft as needed for clarity and quality.  
                          - If there is both a draft and feedback, revise the draft by incorporating the feedback directly.  
                          - Always produce a single, improved draft as your output.  
                          """.formatted(  
                          tac.getInput().getContent(),  
                          tac.lastAttemptOr("no draft yet"),  
                          tac.lastFeedbackOr("no feedback yet")),  
                          Draft.class);  
      })  
      .withEvaluator(tac -> {  
          return tac.ai()  
                   .withAutoLlm()  
                   .createObject(  
                    """  
                      Evaluating the following draft, based on the given task.  
                      Score it from 0.0 to 1.0 (best) and provide constructive feedback for improvement.  
                        
                      Task:  
                      %s  
                        
                      Draft:  
                      %s  
                      """.formatted(  
                      tac.getInput().getContent(),  
                      tac.getResultToEvaluate()),  
                         TextFeedback.class);  
      })  
      .buildAgent("draft_and_refine_agent",   
                      "An agent that drafts and refines content");  
}
```

The Embabel Java version has significantly less code than the Python LangGraph version. It’s type safe, toolable, and there’s no way to mess up the flow. If `maxIterations` is exceeded, the loop will terminate, returning the highest scoring result seen so far. Because `RepeatUntilAcceptableBuilder` is parameterized, you can use your own result type and feedback type, while preserving type safety. LangGraph compares very poorly in this scenario.

## Tool Use

Tool use is table stakes for any Gen AI framework and must be easy.

With LangGraph we can define tools in Python and bind them to an LLM:

```
def calculator(expression: str):  
    """Evaluate a math expression."""  
    try:  
        return str(eval(expression))  
    except Exception as e:  
        return f"Error: {e}"  
  
llm = ChatGoogleGenerativeAI(  
    model="gemini-2.0-flash",  
    api_key=GOOGLE_API_KEY,  
)  
  
model_with_tools = llm.bind_tools([calculator])  
tool_node = ToolNode([calculator])  
  
# Nodes  
def call_model(state: State):  
    """Call the model; it may request a tool."""  
    messages = state["messages"]  
    response = model_with_tools.invoke(messages)  
    return {"messages": [response]}
```

This is straightforward, although of course the example is dangerous because it evaluates generated Python without sandboxing.

Embabel allows us to add tools every time we use a `PromptRunner,` with less ceremony. We can define well known **tool groups** (which are often backed by MCP), or specify Java objects:

```
var response = ai.withAutoLlm()  
  .withToolGroup(CoreToolGroups.MATH)  
  .withToolObject(myDomainObject);
```

The [ability to use tool objects is particularly important](/@springrod/domain-tools-direct-access-zero-ceremony-9a3e8d4cf550). These could be domain objects we’ve retrieved from a database or services we injected into our agent with Spring. We can do that in Python also, but there’s an important difference in that it’s more likely that we have valuable business functionality implemented in Java.

Embabel also offers tool grouping with concepts like an `LlmReference,` which combines tools with prompt elements allowing sophisticated composition at runtime.

## Planning

The LangGraph blog example of planning involves a final step that depends on the execution of two previous steps. This is expressed in the workflow builder like this:

```
# Set the entry point  
workflow.set_entry_point("planner")  
  
# Define the parallel edges  
# After the planner, both research workers are called.  
workflow.add_edge("planner", "graphql_researcher")  
workflow.add_edge("planner", "rest_researcher")  
  
# Define the join point  
# The writer will only run after BOTH research workers are complete.  
workflow.add_edge("graphql_researcher", "writer")  
workflow.add_edge("rest_researcher", "writer")  
  
# The graph ends after the writer is done  
workflow.add_edge("writer", END)
```

In Embabel, you would simply define a method that takes both data types:

```
Writeup writeUp(GraphQLResearch gr, RestResearch rr, Ai ai) {
```

Clearer, type safe and easy to test.

The LangChain example also hardcodes the steps in the plan but notes that they could be generated by an LLM. We could implement this by having an LLM instantiate command objects in Embabel. However, relying on LLMs to perform planning makes flows less predictable, so should be done with care.

## Multi-Agent Collaboration

The final pattern is an example of **handoffs** from a **supervisor** node to other agents. This is a common pattern in frameworks such as Google ADK. It’s also less deterministic than expressing the steps via a state machine or GOAP actions, hence not a pattern we tend to encourage. To achieve this behaviour, Embabel allows you to use agents as tools.

## Complete Code

The complete code can be found in the [Embabel langgraph-patterns repository.](https://github.com/embabel/langgraph-patterns)

You could argue that [the original blog](https://pub.towardsai.net/agentic-design-patterns-with-langgraph-5fe7289187e6) isn’t the greatest LangGraph showcase. But it’s a recent, well-written piece based on a sound understanding of agents, with hundreds of claps on Medium. It’s not hard to find the same deficiencies in other LangGraph applications, suggesting that the problem lies with the framework, language and ecosystem, not the author.

## The Reality

It’s time the Java community stopped feeling it needs to play catch up, and demonstrates that it not only has a solution for building Gen AI agents, but has the *best,* on any platform.

> It’s time to stop settling for being downstream of mediocre ideas from Python frameworks, and do our own thinking. **The Python emperor has no clothes.** If you’re a JVM developer and your boss tells you to write agents in Python, stand ready to point out the inferiority of Python as a platform for business applications, Gen AI or other. And be ready to show how common patterns can look a whole lot better in Java than Python.

Python is an important language that every developer should be fluent in. It’s great for many things. However, it has never been a particularly popular language for building nontrivial business applications, and there’s good reason for that.

The robustness of the JVM is well known; the ecosystem — especially Spring, which has no analog in Python — puts it in a very strong position. [Embabel](https://github.com/embabel/embabel-agent) builds on top of this, bringing superior concepts to any Python framework. The rest is up to you. Create your first agent from our [Java agent template](https://github.com/embabel/java-agent-template) today.
