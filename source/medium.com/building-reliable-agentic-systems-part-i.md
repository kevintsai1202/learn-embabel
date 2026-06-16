# Building Reliable Agentic Systems: Part I | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/building-reliable-agentic-systems-part-i-b056d5b59392](https://medium.com/@springrod/building-reliable-agentic-systems-part-i-b056d5b59392)
**來源網站**: medium.com

---

# Building Reliable Agentic Systems: Part I

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--b056d5b59392---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--b056d5b59392---------------------------------------)

5 min read

·

Jul 7, 2025

--

3

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Db056d5b59392&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fbuilding-reliable-agentic-systems-part-i-b056d5b59392&source=---header_actions--b056d5b59392---------------------post_audio_button------------------)

Share

There’s always been a gap between demo and realistic application. With Gen AI, it has widened to a gulf. It’s never been easier to build an amazing demo, or harder to make it realistic, safe and useful.

Agent demos accompanied by exaggerated claims are plentiful. Yet agentic success stories are [thin on the ground](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), at least in enterprise.

> We can bridge the gap between promise and reality by applying what we’ve learnt about software engineering over time. Some things don’t **change**.

In this series of blogs, I’ll talk about some of the approaches needed to build reliable agentic systems. They may seem mundane in a seemingly new world, but they work.

I’ll illustrate this using Tripper, the [Embabel travel planner demo](https://github.com/embabel/tripper/). As this is a sophisticated application, I’ll take several blogs to go through it.

## Travel Planner Functionality

Tripper is a journey planner, originally created to plan a road trip for myself and my girlfriend. Given start and destination and desired dates, information about the travelers and a travel brief, it builds a personalized day to day plan, based on web research and Google maps. It suggests activities, chooses places to stay and searches Airbnb for each location. It produces detailed reports including image links and reference URLs.

An example submission:

Press enter or click to view image in full size

![]()

Each run will produce different output, but it should always be factually accurate and supported by valid links. An example:

Press enter or click to view image in full size

![]()

Following the interactive map link:

Press enter or click to view image in full size

![]()

The Airbnb link for one of the stays:

Press enter or click to view image in full size

![]()

## Supporting Services

Generating this quality of output requires not just LLMs, but multiple integrations. The supporting cast:

* **Multiple LLMs**: We need a high quality LLM for generating itinerary ideas and writing up the final proposal, but can get by with a cheaper LLM for researching the points of interest.
* **Tools** for LLMs to use. MCP tools (backed by [Docker MCP gateway](https://www.docker.com/blog/docker-mcp-catalog-secure-way-to-discover-and-run-mcp-servers/)) for web search, Google maps and Airbnb; the Embabel platform built in math tool to allow distance and other calculations.
* **Simple web interface** using [htmx](https://htmx.org/) and Spring MVC

## The Hard Part: Making Tripper Reliable

You could throw all these tools at a large state of the art LLM and let it decide how to call them, in what [a skeptical NVIDIA paper](https://research.nvidia.com/labs/lpr/slm-agents/) calls *language model agency.*

Experience building Tripper showed that this would not produce acceptable results. And the cost would be unnecessarily high, as every interaction would involve a high priced model.

Gotchas included:

* *Invalid generated URLs*. I’d have expected that Claude Sonnet 3.7 could reliably create Google Maps URLs with multiple stops. It confidently tries, but a significant proportion of the links it generates are invalid.
* *Confusion around images*. Even when given lists of valid links, LLMs sometimes hallucinate image links.
* *Inconsistent tool usage*, such as performing 20 searches on one occasion versus 5 on another for no discernible reason.
* *Poor choice of tool arguments*, for example to the Airbnb tool, resulting in suggestions for the correct dates in the wrong country.

> These and other problems resulted in unacceptably inconsistent and unsatisfactory output with a naive solution. It was clear that a control layer was required above LLM usage.

Thus introducing an agent framework was critical. Embabel made it easy to mix LLMs in the same flow, and to swap out LLMs without changing code. Tripper externalizes LLM names using a Spring `ConfigurationProperties` class:

```
embabel.tripper.thinker-model=gpt-4.1  
embabel.tripper.researcher-model=gpt-4.1-nano
```

> Edit the application.properties file to experiment with different models to see the effect on output quality, reliability and cost.

Using an agent framework also ensures detailed progress tracking:

Press enter or click to view image in full size

![]()

Embabel made it easy to break the flow into steps, with full control over where and how LLMs were used. This enabled three major approaches to make Tripper more reliable:

* *Moving to fine grained steps*. The steps involving an LLM use focused prompts and tools, allowing the option of using cheaper models, and reducing the need for prompt engineering. Embabel made it easy to parallelize the location research step.
* *Pulling out a domain model* in which the flow could be expressed, getting away from a chain of text inputs and outputs. This brings many benefits: type safety (no mistyped template keys!), toolability, improved debugging and testability, and the ability to perform some steps in code rather than be wholly LLM dependent. It also maximizes ability to integrate with other systems — illustrated by how it makes it easier to structure the UI.
* *Migrating operations to code to increase predictability.* For example, generating Google Map URLs based on locations to eliminate errors, and checking image links proposed by LLMs to see that they can be retrieved. The following method may not be exciting, but it’s much more reliable than an LLM at generating complex map links:

Press enter or click to view image in full size

![]()

These approaches work naturally together. As in the code listing, a strong domain model provides a natural place to implement behavior in code.

> The result: an application that is not only more reliable than a naive approach, but easy to extend. For example, adding Booking.com support, visa checks and travel advisories would be natural, given the domain model.

## Next Steps

Take [Tripper](https://github.com/embabel/tripper) for a spin today. With your Open AI, Anthropic and Brave Search API keys, you’ll be planning your next road trip in minutes.

In my next blog I’ll drill into [code](https://github.com/embabel/tripper) to show how the [domain model](https://github.com/embabel/tripper/blob/main/src/main/kotlin/com/embabel/tripper/agent/domain.kt) made the [travel planner](https://github.com/embabel/tripper/blob/main/src/main/kotlin/com/embabel/tripper/agent/TripperAgent.kt) more reliable.

Check out [Embabel](https://github.com/embabel/embabel-agent). Join our growing [community](https://discord.gg/t6bjkyj93q). AI-enable your JVM applications and unlock their business value, using your existing skillset.
