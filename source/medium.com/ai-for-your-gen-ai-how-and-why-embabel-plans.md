# AI for your Gen AI: How and Why Embabel Plans | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6](https://medium.com/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6)
**來源網站**: medium.com

---

# AI for your Gen AI: How and Why Embabel Plans

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--3930244218f6---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--3930244218f6---------------------------------------)

4 min read

·

May 26, 2025

--

2

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D3930244218f6&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6&source=---header_actions--3930244218f6---------------------post_audio_button------------------)

Share

If you read my [last blog](/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014) about the new [Embabel agent framework](https://github.com/embabel/embabel-agent) for the JVM, you’ll recall that it innovates by introducing a planning step before executing any actions, using a non LLM AI algorithm. This approach has important benefits, and we believe it is a big step forward for agent systems.

## Why a Planning Step?

LLMs are smart but opaque. They can’t explain to us *why* they produced given output, or why they chose a particular approach to a problem. They can perform complex tasks, using many tools. But their performance in such cases is unpredictable, and some tasks are simply too complex or require deep integration with existing systems.

Hence, agent frameworks. Agent frameworks work by chaining *actions* together. The terminology varies by framework, but the concept is common. Each action runs a highly targeted prompt or executes code. Given the opacity of LLM “thinking,” action chaining is usually done in code: for example, by the explicit coding of a state machine, or through defining a sequence. This approach is explainable and produces more deterministic results. However, it goes too far in locking things down. It makes systems more deterministic, but limits their power and makes them hard to extend. Is there a way to allow *safe* autonomy where the system is smart enough to do things that weren’t directly coded?

> Embabel takes the novel idea that there is a safe middle ground. We **can** use AI to do planning, so long as it can present us with an explainable plan that we can validate before attempting to execute. Just because the risks of Gen AI necessitate some actions in code doesn’t mean that we have to code all combinations of actions.

We benefit greatly from AI in planning, so long as it’s explainable and deterministic. The planning algorithm we use is [Goal Oriented Action Planning](https://www.reddit.com/r/godot/comments/xgrk0g/goap_goaloriented_action_planning_is_absolutely/). A widely used algorithm in gaming, it reminds me of [General Problem Solver](https://en.wikipedia.org/wiki/General_Problem_Solver), a very early AI algorithm invented many years before I was born. Many of the core ideas in our industry *are* that old, and many old ideas are very relevant today.

### Steps and conditions

GOAP is essentially a path finding algorithm. It can find paths that were never programmed. However, it is deterministic, and it can only choose paths of individual actions (steps) that were explicitly added to the system. If GOAP finds a path, it can explain why that path is the cheapest valid path.

GOAP finds paths based on facts, which surface as **pre** and **post** **conditions**. **Goals** (which correspond to real-world goals for our agent flows) have preconditions. **Actions** have preconditions and expected postconditions. Thus zero or more chains of actions can be found between a given state and a goal.

Preconditions are absolute. Expected postconditions are just that: *expectations* that a side effect will be achieved. Trust, then verify. World state is re-evaluated after the execution of any action, allowing replanning.

## How Does Embabel Plan?

The first step is to choose a goal. The `Ranker` strategy interface abstracts this: the most obvious strategy (used in most of the examples) is to use an LLM to choose one of the system’s goals based on relevance to user input. This is a simple LLM interaction and results are usually predictable. The `GoalChoiceApprover` strategy interface allows application developers to add a guardrail and veto dubious goal choices. It’s also possible to write strongly typed code that works toward a particular goal on the receipt of a message.

Once it has chosen a goal, Embabel determines the current world state (the set of conditions we care about). It tries to find a plan to the goal from the world state, chaining actions by considering their pre and post conditions. Planning is deterministic. As with goals, application code can inspect the plan before execution. Once it has a plan, Embabel executes the first action. The action execution might run a prompt, call an external API or Spring `@Service`, or do anything at all. Trust, then verify. Embabel then redetermines world state and replans.

Once the goal’s preconditions have been satisfied, the agent process terminates. Process output is in the process [**blackboard**](https://en.wikipedia.org/wiki/Blackboard_system).

This diagram shows the process:

Press enter or click to view image in full size

![Embabel planning flow]()

In most cases, action and goal pre and post conditions are inferred from application code by Embabel, using the data flow between action methods implied by parameters and return types.

It’s also possible to define custom conditions, which can access anything in the state of the current **agent process** or the wider world — for example, consulting systems of record through Spring repositories.

## A Sweet Spot

The result of this novel approach is a middle ground with just enough AI. Magic, with reduced risk. We enjoy the benefit of a system that can make plans we never explicitly coded, but without paying the price of surrendering flow control to an opaque model.

> Embabel’s approach allows application developers to choose exactly how much autonomy to give to LLMs. The answer will vary based on the domain and requirements. The ability to get this tradeoff right in each scenario is crucial to safely reaping the business benefits of Gen AI.

There is no conflict with using MCP and other tools. Like any agent framework, Embabel makes tool calling *more* effective. We will still give our LLMs tools, enabling them to make calls as they please within action states. However, the planner, not any LLM, defines the overall agent flow that assumes ultimate control. The flow invokes LLMs — often a mixture of LLMs within the one flow — and provides them with only the relevant, safe tools for each action.

## Next Steps

Check out [Embabel](https://github.com/embabel/embabel-agent) on GitHub. AI-enable your existing JVM applications and unlock their business value, using your existing skillset.

Join the community. Contribute. Help us build the future of agent technology.
