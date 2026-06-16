# Don’t Talk English to Your LLM. Just because LLMs are eloquent in… | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/dont-talk-english-to-your-llm-ecbfe954bea1](https://medium.com/@springrod/dont-talk-english-to-your-llm-ecbfe954bea1)
**來源網站**: medium.com

---

# Don’t Talk English to Your LLM

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--ecbfe954bea1---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--ecbfe954bea1---------------------------------------)

4 min read

·

Oct 29, 2025

--

19

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Decbfe954bea1&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fdont-talk-english-to-your-llm-ecbfe954bea1&source=---header_actions--ecbfe954bea1---------------------post_audio_button------------------)

Share

Just because LLMs are eloquent in natural language doesn’t mean that we should always communicate with them in it.

Where important processes are concerned, humans themselves don’t communicate in natural language. Experience shows that processes don’t scale without structure. Forms long predate computers.

The fluency of LLMs in natural language is valuable in communicating, and smoothing over the fuzziness of many integration problems. However it can also be a distraction, and should not make us lazy in designing systems using LLMs.

Press enter or click to view image in full size

![]()

## Chat Considered Harmful

Blair Hudson of Commonwealth Bank [argues that](https://sublight.substack.com/p/chat-interfaces-are-bad) the first wave of Gen AI adoption failed in part because of its over-reliance on chat. While ChatGPT was the fasting-growing consumer application in history, it pointed in the wrong direction for most business use of the underlying technology.

> Teams everywhere built chat interfaces because they were generic and fast to prototype. A few made it into products.
>
> [Most didn’t.](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
>
> In my opinion, chat interfaces plateaued adoption because chat interfaces aren’t where the work actually happens. You can’t run a hospital out of a chat window. Or manage a retail store. Or a supply chain. For most jobs, chat was the wrong abstraction. It unlocked capability, but real productivity needs more.

The wrong interface is definitely a factor. But even more important is lack of structure.

Humans don’t run hospitals via text. They consume and update structured information from many sources, knowing that structure makes processes safer and more predictable. They don’t want the monitor to say “Kim’s blood pressure was stable most of the day except for a spike in the late morning” — they want to be able to see a chart and get alerted in the event of crises. Doctors include natural language when they write up charts, but use as much structure as possible. How many milligrams of each drug; temperature, oxygen saturation and other readings. Even subjective things like patient mood are often expressed in terms of structured questionnaires and scales that facilitate comparison.

## The Costs Of Natural Language

While seductive, over-reliance on natural language in Gen AI applications has high costs. It can produce impressive results quickly, at the cost of future problems.

Natural language is opaque. It’s hard to apply tools to. Search is imprecise, even with expensive vector embeddings. LLM comprehension isn’t fully trustworthy and adds even greater latency and cost. The difficulty of building accurate RAG systems demonstrates the problems. It’s also difficult to perform some steps in code when everything is natural language — something we certainly want to do, as executing code will always be far cheaper and more deterministic than LLM usage.

Natural language is also ambiguous — one of the reasons that programming languages exist.

Traditional software artifacts such as objects or database rows are far superior at tackling many problems important to business applications, such as:

* **Search**. If we know a relevant id, we’re certain to find the necessary information *or know we don’t have it*. (The latter is particular important.) If we have structured data, we can query for it efficiently considering relationships, using the rich capabilities of an appropriate database.
* **Change tracking**. The more structure we bring, the more cheaply and accurately we can observe changes. For example, we can detect changes in an object graph or use triggers to observe fine-grained changes in a database.
* **Safe, selective sharing**. We can be sure of safe parts of our model to share with less trusted parties.

> Falling back to natural language where structure is possible is a lazy option when building Gen AI applications. It saves time up front, but stores up problems for the future.

## OK, So What Structure?

If we need structure, where should we look?

LLMs don’t much care about which format we use. JSON, XML and other common formats are easily understood, based on extensive training exposure.

The more interesting question is not the representation, but how we populate the structure.

Where business applications is concerned, the answer is obvious, yet strangely neglected in much writing about Gen AI: **Where possible, we should use structure that already exists and reflects domain understanding**.

[Domain integration](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8) is essential. We should use LLMs to speak the language of our domain, rather than natural language, when we can.

> Much of the most valuable Gen AI usage will grow out of existing business applications, rather than be wholly new. These applications will draw on existing domain models and infrastructure, and be more robust and useful as a result.

## The JVM Advantage

This is where the enterprise Java ecosystem shines. For decades, Java developers have excelled at what Gen AI applications need: domain modeling, type safety, and structured data handling.

While Python frameworks are distant from existing enterprise systems and tend to treat everything as strings and dicts, forcing you to handle LLM outputs with fragile code, JVM-based approaches leverage:

* **Strong typing**: Your LLM outputs deserialize directly into domain objects
* **Existing domain models**: Spring Data entities, JPA models — decades of domain knowledge already captured in code
* **Bean Validation (JSR 380)**: Structured validation of LLM outputs, not guesswork
* **Battle-tested infrastructure**: Your existing Spring Boot configuration, persistence layers, and enterprise integrations

## Don’t Be Lazy

If you’re building anything mission critical with Gen AI, don’t be lazy. Model the domain as you would in any application. Better still, use an existing domain model. Bring the engineering discipline that makes enterprise systems reliable. Your applications will be safer, cheaper and more predictable as a result.

If you’re on the JVM, you’re already ahead of the game. You have the tools, the patterns, and the infrastructure, and a [rich agent framework in Embabel](https://github.com/embabel/embabel-agent). Don’t abandon your strengths just because LLMs are good at English.
