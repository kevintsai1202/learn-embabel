# Yes, You Can Unit Test Gen AI Applications | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45](https://medium.com/@springrod/yes-you-can-unit-test-gen-ai-applications-9b2838bb0f45)
**來源網站**: medium.com

---

# Yes, You Can Unit Test Gen AI Applications

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--9b2838bb0f45---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--9b2838bb0f45---------------------------------------)

4 min read

·

Jun 4, 2025

--

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D9b2838bb0f45&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fyes-you-can-unit-test-gen-ai-applications-9b2838bb0f45&source=---header_actions--9b2838bb0f45---------------------post_audio_button------------------)

Share

A sign of maturity in software development is testing being a core part of the workflow. As Gen AI is moving so fast and has largely been driven by people without extensive experience as application developers, the testing story around Gen AI applications has been poor. It’s time to change that, and the [Embabel agent framework](https://github.com/embabel/embabel-agent) does.

> Today’s Generative AI models are amazing. The next phase of Gen AI is about making them useful to business, beyond familiar, proven use cases such as personal assistant. Here, traditional application development skills matter more than AI research or data science skills. Just as the developers of the JVM — while brilliant engineers — had little idea how to build Java business applications, AI researchers are very different from the developers who will unlock much of the business value of their achievements.

One of my primary [motivations in creating Spring](https://www.wiley.com/en-us/Expert+One-on-One+J2EE+Design+and+Development-p-9780764543852) was the near impossibility of unit testing J2EE applications. Spring was designed from the ground up with ease of unit testing applications in mind.

[Embabel](https://github.com/embabel/embabel-agent) does the same thing for Gen AI, making testability a core value.

Like legacy application servers, LLMs make testing hard. They are slow, nondeterministic and expensive.

In addition to facilitating tool support through type safety, Embabel’s design makes application code inherently testable:

* Behavior is expressed in **actions** and **domain objects**. An action is simply a method on a POJO (often, but not necessarily, a Spring bean); a domain object is simply a POJO.
* All application-initiated LLM interactions go through the `PromptRunner` interface, meaning we have a small number of methods to fake or mock.

Embabel also provides testing utilities for help with more advanced cases.

## Unit Testing Recipes

Embabel factors applications into chains of actions.

There are two types of action: Those that are purely expressed in code, and those that call an LLM. The former often contact external services.

Testing actions expressed in code is the same as testing any Spring service. Create the object, providing dependencies, often as mock objects.

Testing actions that interact with LLMs via executing prompts is only slightly harder. We can’t unit test what an LLM will make of a prompt. However, we can test whether all the prompt contains all the required data. (I for one have wasted time cursing an LLM that had no idea what I wanted, because I’d forgotten to include the value of a critical variable. No more, with Embabel.) We can also test hyperparameters such as temperature, and the provision of tools and tool groups.

Depending on how an action is coded, there are two ways to unit test it. Plan A is to use framework support and test the return of a method that runs a prompt. Plan B is to mock the `PromptRunner` on an `OperationContext`.

Embabel provides testing library support for the former, whereas the latter is easy with mock objects.

Let’s see. I’ll use Kotlin examples, but it’s similar in Java, although lacking the elegance of `mockk`.

### Action method testing

Consider the following action method from the `StarNewsFinder` example. It takes three domain object arguments and builds a prompt that is executed via the `PromptRunner.createObject` method. Of course the code is type safe, so we don’t need tests to verify template keys. But we certainly *do* want to test the final prompt we’ll send to the LLM:

Press enter or click to view image in full size

![]()

To test this method, we construct a `StarNewsFinder` instance. Let’s use a mock `HoroscopeService`, which won’t even be called in this method. We also create domain object instances whose fields we can look for in the prompt string:

Press enter or click to view image in full size

![]()

Now we invoke the `starNewsWriteup` action method with our test instances, using the `captureLlmCall` test utility method provided by Embabel. This captures the generated LLM interaction, including the prompt:

Press enter or click to view image in full size

![]()

We can add as many assertions about prompt content and hyperparameters as we wish.

### OperationContext testing

In that example, we tested a method that executed a single prompt, obtaining a `PromptRunner` via the `using` convenience method. This is the most common case, but sometimes we need to execute more than one prompt in the same action, or execute a prompt and then transform the result in code. To do that we need to pass in an `OperationContext` infrastructure parameter to our action method. We can use that to obtain a `PromptRunner:`

Press enter or click to view image in full size

![]()

This is only slightly harder to test. We can mock `OperationContext.promptRunner` and verify that our prompt was constructed correctly:

Press enter or click to view image in full size

![]()

> Unit testing agents built with Embabel is easy. We can continue to follow engineering best practices as we operationalize the new world of Gen AI.

We’re also exploring support for integration testing, using a fake LLM that’s automatically configured at test time.

## Start Building Testable Gen AI Applications Today

Check out [Embabel](https://github.com/embabel/embabel-agent). AI-enable your JVM applications and unlock their business value, using your existing skillset. Continue to use TDD and other familiar best practices as you explore this new world.

Join our growing [community](https://discord.gg/eGPV8V7W). Help us build the future of agent technology, on the JVM and beyond.
