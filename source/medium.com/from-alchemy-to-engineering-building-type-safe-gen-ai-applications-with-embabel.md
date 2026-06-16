# From Alchemy to Engineering: Building Type-Safe Gen AI Applications With Embabel | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f](https://medium.com/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f)
**來源網站**: medium.com

---

# From Alchemy to Engineering: Building Type-Safe Gen AI Applications With Embabel

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--c3d89b7c989f---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--c3d89b7c989f---------------------------------------)

4 min read

·

May 28, 2025

--

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Dc3d89b7c989f&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Ffrom-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f&source=---header_actions--c3d89b7c989f---------------------post_audio_button------------------)

Share

In my last blog I described the novel [planning](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6) element of the [Embabel agent framework](https://github.com/embabel/embabel-agent) for the JVM.

Today I’ll describe another key differentiator: how Embabel emphasizes type safety and a rich [domain model](https://en.wikipedia.org/wiki/Domain_model).

## Magic Map Keys Are Bad

If you’ve written or studied Gen AI applications you’ll have seen many prompts like this:

Press enter or click to view image in full size

![Magic maps are bad]()

This is from a [crewai example](https://www.crewai.com/open-source), but it’s typical. Where does `topic` come from? From a map passed in as input. Hope you typed it right; you’re on your own. While Python frameworks often use [Pydantic models](https://docs.pydantic.dev/2.3/usage/models/) for types returned by an LLM, ensuring validation and type safety, inputs are typically map keys.

> Embabel takes a different approach, with strong typing for **everything**: both prompts and return types.

In this simple Embabel example, the prompt is built with access to the`userInput` parameter:

Press enter or click to view image in full size

![Embabel allows typesafe prompting]()

More complex `Action` methods can access multiple domain object instances in the same type safe way, as well as the state of the enclosing **agent**, which is typically managed by Spring.

This approach has obvious benefits:

* *Type safety*. You are sure of both the names and types.
* *Optimal tooling support*. You won’t have to type names by hand. Your IDE will help with names and structure.
* *Full refactoring support*. Need to rename fields in your domain objects? No problem. Use your IDE and be sure it’s done correctly.
* *Consistency with how you write code*, because you probably don’t rely on magic map keys if you can avoid it.

## Domain Objects are Good

There are also other important advantages. Domain objects aren’t just dictionaries providing structure: they can have behavior and reflect understanding of the domain. This promotes encapsulation and makes them ideal for communication between code and LLMs.

We can even expose domain model behavior to LLMs as tools.

For example, in the [Embabel coding agent](https://github.com/embabel/embabel-coding-agent) the `SoftwareProject` domain object exposes `@Tool` methods that Embabel will expose to the LLM in any action with a `SoftwareProject`instance as a parameter.

This not only addresses discoverability — a big problem for tool use — but simplifies tool signatures, making the LLM’s job easier. The `build` method, for example, does not need a parameter for the project root directory, because that is part of `SoftwareProject` state:

Press enter or click to view image in full size

![]()

We choose which domain object methods we’re happy to let an LLM invoke by selectively adding the `Tool` annotation.

> As we build increasingly sophisticated Gen AI applications, the patterns and practices we’ve learnt over decades of software development prove more and more useful. Some problems are new; many recur. For example, [Domain Driven Design (DDD)](https://www.amazon.com.au/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) can offer valuable benefits.

In an Embabel application, tools exposed to LLMs are typically a mix of third party tools such as MCP tools for working with the wider world, and tools on our application’s domain objects.

## Why Write Prompts in Java or Kotlin?

But surely we want to externalize our prompts using a template language like Jinja or Mustache? Sometimes, yes. We enable prompt externalization in Embabel and will add eager error checking for templates to try to preserve some type safety. However, we should not automatically jump out of our programming language.

> In an agent system it’s often better to write prompts in the programming language in which the rest of the system is written. When a flow is broken up into distinct actions prompts are often not that long; modern languages have multiline strings; tooling for our primary language will be optimal; and prompts can be composed from parts that can be externalized.

Overall, in an agent system, the role of [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) is markedly reduced, which is A Very Good Thing.

> With Embabel or any agent framework, each prompt is focused, meaning that it requires less prayer to get working reliably. Prompts are also associated with a small number of relevant tools, making their execution less uncertain.

Without agentic systems, we are more like alchemists than engineers, our prompts more like incantations that seek the philosopher’s stone of reliability and determinism.

Press enter or click to view image in full size

![Prompt engineer stubbornly refusing to use an agentic system]()

Prompt engineer adamantly refusing to adopt an agentic approach

## Next Steps

Check out [Embabel](https://github.com/embabel/embabel-agent) for a new and superior take on building agentic applications. AI-enable your existing JVM applications and unlock their business value, using your existing skillset.

Join our growing [community](https://discord.gg/eGPV8V7W). Contribute. Help us build the future of agent technology.
