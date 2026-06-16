# Production-Ready Gen AI: Beyond the Python Prototype | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/production-ready-gen-ai-beyond-the-python-prototype-439bf213a8c0](https://medium.com/@springrod/production-ready-gen-ai-beyond-the-python-prototype-439bf213a8c0)
**來源網站**: medium.com

---

# **Production-Ready Gen AI: Beyond the Python Prototype**

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--439bf213a8c0---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--439bf213a8c0---------------------------------------)

4 min read

·

Jun 17, 2025

--

1

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D439bf213a8c0&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fproduction-ready-gen-ai-beyond-the-python-prototype-439bf213a8c0&source=---header_actions--439bf213a8c0---------------------post_audio_button------------------)

Share

If you’re working in enterprise, it’s unlikely that any of your core systems are written in Python.

There are good reasons for this. Depending on the domain, Python performance might be an issue. Python libraries and frameworks relevant to your core business may be immature. Structuring complex applications quickly becomes messy. For example, there is no component model of equivalent sophistication to Java [Spring](https://spring.io/projects/spring-framework), and data access libraries are less powerful than on the JVM. Python has improved a lot in recent years, but its type system still lags, even if type hints are used. Nor is tooling ideal, from development to observability.

Python’s strengths — such as ease of learning, minimal overhead in taking a first step, and strong data science ecosystem — aren’t relevant to core enterprise system requirements such as predictability, observability, maintainability at scale and ability to use established software engineering patterns.

> Python was probably never even considered as the language for your core business applications. Gen AI requirements should not change that. If you have zero Python enterprise applications in production, that remains the right number.

Many people have the misconception that they need to do Gen AI in Python. As I’ve said in every talk I’ve given over the last year, every software developer should be fluent in Python. It’s a great language for scripting and smaller applications. But it’s usually *not* the right language for critical business applications. Gen AI-enabling them is no different.

At a time when every enterprise is considering its Gen AI strategy, they have an important choice:

* Write Gen AI functionality in Python, introducing and deploying a new stack and encountering friction in accessing existing business logic and infrastructure
* Build Gen AI solutions on their existing stack, using the appropriate frameworks

The second option is the better answer. LLMs are a simple HTTP call away, so Python has no magical advantage in calling them. Nor is Python’s superiority in data science libraries such as such as [TensorFlow](https://www.tensorflow.org/), [PyTorch](https://pytorch.org/) and Hugging Face [Transformers](https://huggingface.co/docs/transformers/index) relevant. In the unlikely event that fine tuning models is necessary, it will be done outside business applications, and using a different, purely internal, stack is entirely reasonable.

> What if you could extend your existing applications to add Gen AI, with no need to stand up a new stack, hire or force existing developers to learn a new skill set, and no unnecessary friction between the new functionality and your core applications? You can, and you should.

I’m not the first to point this out. Raghvender Arni has an excellent [LinkedIn post](https://www.linkedin.com/feed/update/urn:li:activity:7334801332077273092/) on the topic. Darryl Taft has a [piece on The New Stack](https://thenewstack.io/2025-is-the-last-year-of-python-dominance-in-ai-java-comin/) suggesting that 2025 is the “last year of Python dominance in AI.”

This is not merely a question of avoiding friction, but an opportunity to do better. There’s a reason that Python isn’t a great language for large scale engineering. I’ve mentioned some of the issues; Python Gen AI frameworks themselves illustrate problems such as unsophisticated configuration approaches, [lack of type safety](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f) and lack of thought to [testability](/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45).

> The key skills needed to use Gen AI to unlock enterprise business value aren’t in the Python ecosystem. They’re in your team, and in the open source communities around enterprise languages.

## The Role of the JVM

Hence the JVM has a huge role to play. It runs much of the world and has proven its dependability over decades. With industry-leading open source [frameworks](https://spring.io/projects/spring-framework), the recent accelerated evolution of Java and the emergence of [Kotlin](https://kotlinlang.org/), it’s thriving.

> What if we could Gen AI enable our Java applications as easily as putting a REST interface on them with Spring MVC?

[Embabel](/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014) enables this. [Spring AI](https://spring.io/projects/spring-ai) and LangChain4j have paved the way with low level infrastructure that now matches what’s available in Python. The new battleground is the next level of abstraction: **agent framework**s. Fortunately, the JVM is well placed.

Embabel is a JVM framework with the mission to be the best agent framework anywhere. It introduces [novel ideas](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6) and enables developers to use [established best practices](/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45). It’s idiomatic in both Java and Kotlin, making use of their rich capabilities and the amazing JVM ecosystem. It is not the Java tail of a Python dog.

Embabel’s goals:

* **Today** *Show that JVM developers can agent-enable their JVM applications using their existing skills and best practices*. Get your first agent running today in minutes, starting from our [Java](https://github.com/embabel/java-agent-template) or [Kotlin](https://github.com/embabel/kotlin-agent-template) template repo.
* **Tomorrow** *Demonstrate that, far from playing catchup, it is the best agent platform anywhere*. Make it hard to justify choosing Python for production-grade agent initiatives not already committed to the Python ecosystem.

## Where Next

It’s an exciting time to be a JVM developer. If you are one, you can and should play a critical role in your organization’s Gen AI strategy, bringing it closer to reality.

Check out [Embabel](https://github.com/embabel/embabel-agent). AI-enable your existing applications and unlock their business value, using your existing skillset.

Join our [community](https://discord.gg/t6bjkyj93q). Contribute. Help us build the future of agent technology, on the JVM and beyond.
