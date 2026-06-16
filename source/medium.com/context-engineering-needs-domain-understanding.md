# Context Engineering Needs Domain Understanding | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8](https://medium.com/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8)
**來源網站**: medium.com

---

# Context Engineering Needs Domain Understanding

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--b4387e8e4bf8---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--b4387e8e4bf8---------------------------------------)

4 min read

·

Jul 23, 2025

--

5

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Db4387e8e4bf8&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fcontext-engineering-needs-domain-understanding-b4387e8e4bf8&source=---header_actions--b4387e8e4bf8---------------------post_audio_button------------------)

Share

The term **context engineering** has recently emerged to describe a valuable approach to building effective LLM applications. Andrej Karpathy [defines it](https://x.com/karpathy/status/1937902205765607626) as “the delicate art and science of filling the context window with just the right information for the next step.” Commentary includes Phil Schmid’s [The New Skill in AI is Not Prompting, It’s Context Engineering](https://www.philschmid.de/context-engineering), and the LangChain [Context Engineering](https://blog.langchain.com/context-engineering-for-agents/) blog.

“Context engineering” is an advance on the previously fashionable term [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering), conveying greater precision. It sounds more like engineering, and less like [alchemy](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f).

However, whenever we encounter a “delicate” topic, we should strive for greater rigour. There’s something missing: something essential to unlock the full business value of Gen AI. Without elaboration, context engineering doesn’t address two crucial questions:

* **The bidirectional nature of LLM communication**. It’s not just what we send to the LLM; it’s what we get back.
* **Relationship to existing business applications and understanding**. How do our Gen AI applications relate to our understanding of relevant business concepts? How can they best integrate with existing systems?

## **Domain-Integrated Context Engineering: DICE**

I believe the answer to both questions is an extension to context engineering. I propose **Domain-Integrated Context Engineering (DICE).** DICEsupplements context engineering by emphasizing the importance of a [**domain model**](https://medium.com/r?url=https%3A%2F%2Fwww.thoughtworks.com%2Fen-au%2Finsights%2Fblog%2Fagile-project-management%2Fdomain-modeling-what-you-need-to-know-before-coding) to help structure context, and considering LLM *outputs* as well as inputs.

> Despite their seductive ability to work with natural language, LLMs become safer to use the more we add structure to inputs and outputs.
>
> DICE helps LLMs converse in the established language of our business and applications.

Domain objects are not mere [structs](https://en.wikipedia.org/wiki/Record_%28computer_science%29). They not only provide typing, but define focused behaviour. In an agentic system, behaviour can be exposed to manually authored code and selectively exposed to LLMs as tools. Defining context as domain objects adds power as well as increases reliability.

Domain integration isn’t just about what we send *to* our LLMs, but should be considered in what we seek back. The context we provide to LLMs in prompts is part of a dialog. The same language should be used in and out. Value is lost in translation if we consider inputs or outputs in isolation.

Press enter or click to view image in full size

![]()

> DICE bridges the gap between LLMs and existing systems.

The language of domain models captures business concepts in a way that fosters reuse. We can draw on a wealth of knowledge about techniques such as [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html), to bring structure that is intuitive to humans and helpful to interacting with machines:

Press enter or click to view image in full size

![]()

Image from Martin Fowler (<https://martinfowler.com/bliki/BoundedContext.html>)

## **Benefits of Domain Integration**

DICE brings compelling benefits. Notably:

* *Ability to use code to help structure context*. “The delicate art and science of filling the context window” becomes less delicate and more scientific. When we use code to help fill the context window, we can refine it, reason about it and test it. We can precisely filter content to improve results and save tokens.
* *Easier and safer integration with existing systems.* The reams of impressive demo-grade blogs on Gen AI exist in a glorious vacuum of existing functionality. The real world is very different. Agents are as valuable as the functionality they access. If we embrace working with domain objects, we can more easily and precisely integrate with existing systems, and reuse existing domain models that reflect hard-won business understanding. While semi-typed MCP tool interactions are a step in the right direction, they still lose fidelity.
* *Reuse to accelerate delivery and improve quality*. Domain models capture understanding of the business. This promotes reuse across applications and agents, making each agent easier to write.
* *Structured persistence options*. Domain objects are often persisted*.* Existing persistence technologies offer valuable query capabilities, such as SQL or Cypher, and more precise retrieval than vector search. (We can still introduce vector search as a supplemental technology.)
* *Testability*. The structure and encapsulation added by a domain model facilitates testing.
* *Improved debugging and tracing*. The added structure shows up in debuggers and observability tools, not just as unstructured text, but *in a way they understand.*
* *Greater ability to manipulate context during multi-step flows.* If your context is an ever-growing string, quality will degrade as it grows, and the excessive token usage will explode cost.

Domain integration is critical to unlocking the business value of Gen AI. A corollary is that the key adjacency to Gen AI applications is existing business applications, rather than data science functionality or LLMs themselves. [Embabel](https://github.com/embabel/embabel-agent) already [demonstrates the power](/@springrod/building-reliable-agentic-systems-part-i-b056d5b59392) of this approach on the JVM.

Our industry is at a fascinating moment. While the amazing advances in frontier models over the last few years are driving profound change, the path to unlocking their full business value lies in bridging the gap between what they make possible, and what is proven to work in existing systems. This is our key task as application developers, and it’s more exciting than any we’ve faced since the emergence of the Internet.
