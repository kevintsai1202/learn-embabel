# Why You Should Use Local Models. When building Gen AI applications, it’s… | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/why-you-should-use-local-models-a3fce1124c94](https://medium.com/@springrod/why-you-should-use-local-models-a3fce1124c94)
**來源網站**: medium.com

---

# Why You Should Use Local Models

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--a3fce1124c94---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--a3fce1124c94---------------------------------------)

3 min read

·

May 30, 2025

--

1

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Da3fce1124c94&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fwhy-you-should-use-local-models-a3fce1124c94&source=---header_actions--a3fce1124c94---------------------post_audio_button------------------)

Share

When building Gen AI applications, it’s natural to default to familiar models in the cloud, from familiar providers.

This is a mistake. It’s important to understand available model choices and their strengths and weaknesses. Mature Gen AI applications should use a mix of models for different things. Local LLMs are now very useful for many tasks, and their capabilities are growing faster than those of large closed models. Many local LLMs now offer dependable support for tool calling, which was not the case only a few months ago. Local embedding models are often the best choice, period.

These facts have important implications for building applications.

## Why Use Local Models?

There are many reasons to prefer local models:

* *Cost*: You might have hardware available that you can load up with LLM operations, versus paying a third party.
* *Privacy*: Often the most important reason. Sensitive data can stay behind your firewall. This is a particularly compelling reason to use local embedding models, to build [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) systems that don’t send data outside your organization.
* *Regulatory compliance*, when you need to maintain data in a certain geography.
* *Latency*: For simple interactions, the network round trip to a cloud provider may noticeably degrade performance.
* *Environmental reasons*: Using the smallest model you can is the greenest option. LLMs use [enormous amounts of electricity and water](https://spectrum.ieee.org/ai-energy-consumption): don’t use an [airliner LLM](https://en.wikipedia.org/wiki/Hughes_H-4_Hercules) for a job a Cessna could do.
* To enable cheaper [*fine tuning*](https://neo4j.com/blog/developer/fine-tuning-vs-rag/?utm_source=GSearch&utm_medium=PaidSearch&utm_campaign=Evergreen&utm_content=EMEA-Search-SEMCE-DSA-None-SEM-SEM-NonABM&utm_term=&utm_adgroup=DSA&gad_source=1&gad_campaignid=20769286955&gbraid=0AAAAADk9OYq_WLbAwoN2t7PaZgMlHPyOX&gclid=CjwKCAjwruXBBhArEiwACBRtHbk_ZzieOjTd7xuN4Uv1rqNEBzWrmFgZ4TLrPZExzmzPTg9TtkzoYRoCC94QAvD_BwE). Fine tuning shouldn’t be your first port of call in Gen AI — first try whether you can get the necessary information to an existing model — but when you do need to do it, local models are cheapest, especially with [LoRA](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora).

Press enter or click to view image in full size

![]()

Cosy behind the firewall

## Why Not Use Local Models?

For some tasks, local models just aren’t an option. Unless you have very special hardware, the best models you can run locally at present may not match even a smallish cloud model like [GPT-4.1 nano](https://platform.openai.com/docs/models/gpt-4.1-nano) for handling complex prompts.

But different models are good at different things. Some local models are much closer to parity to the big closed models at certain tasks.

You should never stay away from local models because of perceived difficulty in mixing them into your applications.

> It should be easy to change your code or configuration to use local models. And there are a variety of choices for running them. So if it’s too hard for you to try local models in your architecture, reconsider that architecture.

## How to Get The Most From Local Models

Adopting good architectural practices in Gen AI applications helps with many things, including the ability to leverage local models to the maximum extent possible.

> If a task is too complex for a local model, it’s likely that it should be refactored into smaller tasks to make the application more predictable.

If we refactor our applications into actions using [Embabel](https://github.com/embabel/embabel-agent) or another agent framework, each prompt is smaller and more focused, using a smaller set of tools. This often means that a local model can suffice.

> With careful application design, we can use an agent framework to help us minimize cost, maximize privacy and, incidentally, help the environment.

Finally, you’ll need to stay up to date, as the state of the art is moving quickly. Monitor new models and new releases of existing models.

## Try Local Models Today!

Check out the [Embabel agent framework](https://github.com/embabel/embabel-agent) and enable the [Ollama](https://ollama.com/) or/and [Docker](https://dev.to/docker/from-zero-to-local-llm-a-developers-guide-to-docker-model-runner-4oi2) integrations. Embabel will automatically connect to each provider, making all their models immediately available for use in applications. In the Embabel shell, type `models` and you should see local and cloud models, with the names you can specify in code.

Now, try to change some of the examples to use local models. For example, take the `StarNewsFinder` and change the constructor default annotation to use one of your local models. You’ll probably encounter more errors — look in the logs for errors the LLM makes in creating structured output, or incorrect tool calls — but you should find that a local model of 4b parameters or above will be able to do at least some steps, with Embabel’s retry recovering from errors.

> Wherever an Embabel `PromptRunner` is used, you can specify the LLM to use, without any other code changes.

Join the [Embabel community](https://discord.gg/eGPV8V7W) and discuss your experience. Even better, contribute. Help us build the future of agent technology.
