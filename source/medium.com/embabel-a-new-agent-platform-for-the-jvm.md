# Embabel: A New Agent Platform For the JVM | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014](https://medium.com/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014)
**來源網站**: medium.com

---

# **Embabel: A New Agent Platform For the JVM**

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--1c83402e0014---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--1c83402e0014---------------------------------------)

3 min read

·

May 22, 2025

--

5

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D1c83402e0014&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fembabel-a-new-agent-platform-for-the-jvm-1c83402e0014&source=---header_actions--1c83402e0014---------------------post_audio_button------------------)

Share

I’m excited to share my new open source project, the [Embabel agent framework](https://github.com/embabel/embabel-agent).

Not since I founded the [Spring Framework](https://spring.io/projects/spring-framework) have I been so convinced that a new project is needed. Not since I pioneered Dependency Injection and the other core Spring concepts, have I been so convinced that a new programming model is needed, and so sure of what it should be.

## **Why Do We Need an Agent Framework?**

Aren’t LLMs smart enough to solve our problems directly? Aren’t MCP tools all we need to allow them to solve complex problems?

No. MCP is an important step forward, and of course Embabel embraces it, just as it makes it easy to work with multiple models. But there are many reasons that a higher level orchestration technology is needed, especially for business applications. Here are some of the most important:

* *Explainability*: Why were choices made in solving a problem?
* *Discoverability*: MCP skirts this important problem. How do we find the right tools at each point, and ensure that models aren’t confused in choosing between them?
* *Ability to mix models*, so that we are not reliant on God models but can use local, cheaper, private models for many tasks
* Ability to inject *guardrails* at any point in a flow
* Ability to manage flow *execution* and introduce greater resilience
* *Composability* of flows at scale. We’ll soon be seeing not just agents running on one system, but federations of agents.
* Safer *integration* with sensitive existing systems such as databases, where it is dangerous to allow even the best LLM write access.

### **Why the JVM?**

Ok, so agents are a thing. Why the JVM? Why not just write in Python?

Python has been the dominant language for AI for the last few years. At this point, every developer needs to be fluent in Python. I’m glad that I am. However, AI is much broader than *Gen AI*. Python offers a great ecosystem for broader AI, with [TensorFlow](https://www.tensorflow.org/), [PyTorch](https://pytorch.org/), and many other libraries.

With Gen AI we are not doing comparable low level work. We’re contacting multiple LLMs via simple HTTP calls.

> The critical adjacency for building business apps with LLMs is existing business logic and infrastructure. And the critical skill set is building sophisticated business applications. In both these areas, the JVM is far ahead of Python and likely to remain so.

Much of the critical business logic in the world is running on the JVM, and for good reason. Gen AI enabling it is of critical importance.

### **Why Embabel?**

[Embabel](https://github.com/embabel/embabel-agent) is an agent framework, initially for the JVM, that is intended not just to play catchup with Python agent frameworks, but to leapfrog them.

Some distinguishing features:

* *Embabel introduces a planning step*. The framework discovers actions and goals from your code, and can plan toward the most appropriate goal given user or other system input. This enables superior extensibility. You’ll not need to rewire a state machine, for example, to add capabilities. Planning is accomplished via a [non-LLM AI algorithm](https://www.reddit.com/r/godot/comments/xgrk0g/goap_goaloriented_action_planning_is_absolutely/), which provides a smart, yet deterministic and explainable approach to planning.
* *Embabel encourages building a rich domain model* in your application — typically, Kotlin data classes or Java records. This ensures that prompts are typesafe, toolable and survive refactoring. It also allows behavior to be added to domain objects, which can be exposed as LLM tools as well as used in code.

Read more on the [Embabel GitHub page](https://github.com/embabel/embabel-agent).

Embabel is written in Kotlin, which we believe to be the best language for building JVM applications today.

However, we understand that many developers and teams are happy with Java, and we’re committed to ensuring that Embabel is as idiomatic from Java as from Kotlin.

This is easy not only because of Kotlin’s excellent interoperability with Java, but because Embabel integrates closely with Spring.

> If you’re a Spring developer, you’ll find building agents with Embabel to be as natural as building a Spring MVC REST interface.

It’s early, but we have big plans. We want not just to build the best agent platform on the JVM, but to build the best agent platform, period.

In future blogs I’ll talk more about Embabel’s philosophy and show examples.

### **Where Next**

It’s an exciting time to be a developer, and an exciting time to be a JVM developer.

Please check out Embabel. AI-enable your existing applications and unlock their business value, using your existing skillset.

Join the [community](https://discord.gg/t6bjkyj93q). Contribute. Help us build the future of agent technology.
