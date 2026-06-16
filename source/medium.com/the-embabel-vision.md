# The Embabel Vision. In previous blogs I’ve introduced the… | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/the-embabel-vision-967654f13793](https://medium.com/@springrod/the-embabel-vision-967654f13793)
**來源網站**: medium.com

---

# The Embabel Vision

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--967654f13793---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--967654f13793---------------------------------------)

6 min read

·

Jun 24, 2025

--

5

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D967654f13793&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fthe-embabel-vision-967654f13793&source=---header_actions--967654f13793---------------------post_audio_button------------------)

Share

In previous blogs I’ve [introduced](/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014) the [Embabel](https://github.com/embabel/embabel-agent) agent framework, discussing how it innovates by introducing [deterministic planning](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6), ensures [type safety](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f), and [facilitates unit testing](/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45).

Today I’m going to talk about the overall vision: Where Embabel is going, and why it’s important.

The agent framework space is young. On the JVM it’s nascent. Embabel is an ambitious project, with the goal of being the best agent framework on any platform. Its concepts are innovative and, we believe, far in advance of the competition, on the JVM or elsewhere.

> Embabel aims to help unlock the full business value of Gen AI, by giving developers the framework to make it safe and dependable.

Key objectives:

* *To bring the disruptive power of deterministic planning:* The ability to extend system capabilities without modifying existing code underpins smart, safe, agentic systems that grow with requirements.
* *To leverage the power of domain modeling* to maximize reuse, explainability, auditability, and fidelity to business requirements.
* *To enable deep, frictionless integration with existing business applications*. Because Embabel grows out of enterprise experience and integrates seamlessly with the dominant Java framework, it is uniquely placed to achieve this.
* *To enable the use of software engineering best practices to build Gen AI applications.* While the technology landscape has changed, proven practices remain essential to navigate it. No one is going to vibe code their way to unlocking the potential of Gen AI in critical systems.
* *To embrace emerging standards* such as MCP and A2A to help build the agentic web, so developers can focus on business logic rather than tracking specifications.
* *To explore the potential to create agents in natural language.* While the skills of enterprise developers create the foundation, it’s now possible to empower business users in a way that has often been promised but never delivered in the past.
* *To offer inspirational examples that are useful in their own right and demonstrate the power of a good agent platform.* Watch this space!
* *To demonstrate the value of a consistent approach* that, as with Spring, is bigger than the sum of its parts.

## A Little Deeper

Let’s look at the most important of these objectives.

### The Power of Planning

While other agent frameworks either have no planning step, require developers to specify how actions are chained together (for example, in a state machine), or rely on LLMs for planning, Embabel [uses a non-LLM AI algorithm to work out a path of **actions** towards a **goal**](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6). This has benefits that will become increasingly important.

Any planning approach is superior to manual chaining of actions, because it grants the system autonomy to determine the best way to perform tasks. Embabel’s approach is unique in that it is deterministic, safe and explainable.

While predictable, it remains intelligent, as the system can chain existing actions together in ways that were not explicitly programmed, and grow in power as more actions and goals are added.

> Actions and goals enable an Embabel server to grow its capabilities the way that humans do: learning how to perform individual tasks that can be chained together to perform complex operations. Enjoy the best of both worlds: Embabel servers can solve problems in ways that weren’t explicitly programmed, while only using steps that were designed into the system.

### Domain Modeling

Embabel is also unique in its [emphasis on domain modeling](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f). Domain objects work hand in hand with actions and goals, as most pre and post conditions used in planning are expressed in terms of the data flow of domain objects. As per good OO practice, domain objects can have behavior as well as state, and Embabel even provides the ability to selectively expose safe functions to LLMs as tools.

There are obvious benefits here, such as [type safety](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f), [testability](/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45), toolability and refactoring support.

The emergent benefits may prove even more important. As with actions and goals, adding more domain objects can deliver non-linear value. The domain model becomes a data dictionary for the problem space.

> We envision a future where Embabel servers sit above existing applications, growing in power as more actions and domain objects are exposed, while safely exposing and consuming functionality from the agentic web.

### Integration

Integration with existing systems and infrastructure is essential to making Gen AI useful, yet has been underemphasized to date. This is not surprising given that so much of the first generation of Gen AI functionality has come out of the Python space, which is seldom intimately connected to existing business applications.

> A huge part of unlocking the value of Gen AI is integration with enterprise applications, which needs to be both deep and safe.

MCP has had a transformational impact in connecting LLMs to the outside world. Tying into existing systems is even more important. MCP is not especially compelling in this case, as it introduces unnecessary friction and loss of fidelity with respect to existing domain objects and infrastructure.

By first targeting the JVM, Embabel is already taking a big step in the right direction. By building on Spring, which runs a huge proportion of the world’s critical applications, and following Spring patterns, it offers frictionless integration into enormous business value.

### Embracing standards

The Gen AI space is moving at breakneck speed. This is exhilarating and at times bewildering.

This pace limits the role of standardization, as innovation is essential while the industry learns. However, there are already two promising standardization initiatives.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/introduction) has already proven useful. While the spec has significant gaps to fill, it’s progressing rapidly and making it far easier to build Gen AI applications, through providing a consistent interface to tools for LLMs to call.

More recently, [A2A (the Agent2Agent Protocol)](https://google-a2a.github.io/A2A/specification/) aims at a higher level of integration, seeking to standardize agent discovery and collaboration. A2A has yet to prove itself in practice, but it may well end up being as important.

Embabel embraces both these efforts and will react quickly to support any other worthy initiatives.

> Embabel embraces standards to ensure that code built on it is able to contribute to and consume assets from the emerging agentic web. For example, developers can write Embabel agents and expose them as MCP or A2A servers with minimal effort.

### Toward The PaaS for Natural Language

We’re seeing two major vectors in agent platforms: Code-centric approaches like Crew AI, Google ADK and LangGraph, and graphical approaches like HyperMode, Sema4.ai and many others.

The “let’s draw pretty pictures” brigade has historically underperformed their grand promises, at least in enterprise. However, this time things really might be different. It’s likely that the successful products will converge.

Embabel comes from the code-centric direction, but its strong concepts can underpin higher level functionality and greater use of natural language.

> A library of actions, goals and domain objects provides a strong foundation for business users to express behavior in natural language.

This approach will enable a new concept of “compilation” where the platform helps business users clarify their thoughts to eliminate ambiguity and create additional actions and goals that can be safely added to the system.

> Embabel is ideally placed to push the use of natural language to define agents, given its ability to balance autonomy and control and its emphasis on a domain model that can provide a lingua franca.

### Amazing examples

Any agent framework worth its salt should have impressive, non-trivial examples, and use its own capabilities can help advance its technology and community.

Our goals:

* To create agents that are realistic and useful in themselves. The world does not need more trivial “You are a helpful assistant” examples.
* To inspire the community to build amazing agents themselves — hopefully contributing to open source to create broader value.
* To demonstrate how many Gen AI verticals are indefensible based on technology alone, given a good agent framework. (Of course many businesses are defensible based on understanding of their domain and customers.)

We will [eat our own dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) as much as possible.

> We will strive to automate as many things as possible using agents built on Embabel. We will not use third party products such as commercial coding agents, and we will open source all agents used for the Embabel open source project and community.

Press enter or click to view image in full size

![]()

Dog food is tasty. Our Duke as a pup

Per the flight safety advice to put your own mask on before helping others, we will prioritize agents that accelerate Embabel development — most notably, our [coding agent.](https://github.com/embabel/coding-agent)

### Next Steps

We’re looking ahead, and Embabel doesn’t yet do everything I’ve described. But it will, and it’s already very powerful.

Check out [Embabel](https://github.com/embabel/embabel-agent). Join our growing [community](https://discord.gg/t6bjkyj93q). AI-enable your JVM applications and unlock their business value, using your existing skillset.

Hopefully this has whetted your appetite for joining — and contributing to — the journey. We think Embabel will become a core building block of the agentic web. Bring your skills to help solve the most important technical problems of our time, as we build the future of agent technology, on the JVM and beyond.
