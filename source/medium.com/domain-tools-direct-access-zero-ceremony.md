# Domain Tools: Direct Access, Zero Ceremony | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/domain-tools-direct-access-zero-ceremony-9a3e8d4cf550](https://medium.com/@springrod/domain-tools-direct-access-zero-ceremony-9a3e8d4cf550)
**來源網站**: medium.com

---

# Domain Tools: Direct Access, Zero Ceremony

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--9a3e8d4cf550---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--9a3e8d4cf550---------------------------------------)

5 min read

·

Oct 9, 2025

--

2

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D9a3e8d4cf550&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fdomain-tools-direct-access-zero-ceremony-9a3e8d4cf550&source=---header_actions--9a3e8d4cf550---------------------post_audio_button------------------)

Share

[Tool calling](https://www.promptingguide.ai/applications/function_calling) has transformed how we use LLMs: it connects models to the real world and limits hallucination. But as teams race to turn everything into *MCP* tools, we risk over-engineering and introducing friction where none is needed.

Let’s consider the different types of tools and when they are appropriate.

## Two Types of Tools

* **Integration tools** typically call external systems. MCP is the leading approach here, and agents-as-tools (“handoffs”) fall in this bucket.
* **In-process tools** execute within your application’s runtime. These are regular methods in Python, TypeScript, Java or whatever language your system uses, registered as callable tools with your agent framework.

The first type of tools dominates blog posts and demos. But when we need to build business agents, the second is more important.

Press enter or click to view image in full size

![]()

## MCP: Powerful, But Not Always Needed

[MCP](https://modelcontextprotocol.io/docs/getting-started/intro)’s success is deserved. It’s become the standard for tool interoperability, enabling clients like Claude Desktop and agent frameworks to invoke capabilities across systems.

Exposing functionality via MCP makes sense in scenarios where you’d expose an Open API or GraphQL interface: when you want external clients to benefit from your technology while maintaining clear boundaries.

But if you yourself are the client, why add layers between your agent and service? You don’t call your own backend over HTTP — you call methods.

> MCP is an integration technology. Use it when you actually need integration. Don’t force it everywhere.

## In-Process Tools: Simpler and More Powerful

So when should we use in-process tools?

Sometimes we want to avoid the additional ceremony and indirection. For example, Embabel ships JVM-based file tools for searching for and editing files, because it’s easier, more performant, and simpler to debug than routing through MCP.

Avoiding unnecessary complexity is always good engineering. But there’s an even more compelling reason: **in-process tools let you leverage what’s native to your stack.**

When we add tools to existing services or entities we benefit from our existing domain model and business logic. [Domain integration is critical to context engineering](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8).

> Domain tools (one kind of in-process tool) are the most important tools for business agents.

With a good framework, exposing in-process tools is trivial. In Java you simply add the the [Spring AI](https://docs.spring.io/spring-ai/reference/api/tools.html) `Tool` [annotation](https://docs.spring.io/spring-ai/reference/api/tools.html) to the methods you want to expose. As long as your arguments and return types serialize to JSON and make sense to an LLM, you’re done. No new protocols, no ceremony, no friction, and negligible invocation overhead.

### Tools on Domain Entities

Let’s consider one particularly important pattern: **Adding tools to persistent entities from your domain model.**

This pattern usually works as follows:

* Receive a request identifying persistent entities, for example, by a customer id
* Load the relevant data from your repository
* Expose tools on those entities or DTOs to LLMs at the call point.

Here’s a concrete example — a DTO representing traveller activity that exposes tool methods:

```
public record TravellerActivity(  
        String name,  
        Instant from,  
        Instant to,  
        List<Trip> trips  
) {  
  
    @Tool(description = "Get the number of trips taken in the period")  
    public int tripCount() {  
        return trips.size();  
    }  
  
    @Tool(description = "Get the number of days in the period")  
    public long periodDays() {  
        return Duration.between(from, to).toDays();  
    }  
  
    @Tool(description = "Get the distinct destinations visited in the period")  
    public List<String> destinations() {  
        return trips.stream().map(Trip::to).distinct().toList();  
    }  
  
    @Tool(description = "Trips per year")  
    public float tripsPerYear() {  
        long days = periodDays();  
        return days == 0 ?  
                trips.size()  
                : (trips.size() * 365f) / days;  
    }  
}
```

We obtain this instance through a service, as per regular Spring/Java design practice:

```
interface TravelActivityReportingService {  
  
    /**  
     * Given a customer id, return their travel activity  
     */  
    @Nullable  
    TravellerActivity report(Long customerId);  
}
```

And here’s how we expose its tools to an LLM call with Embabel’s fluent API:

```
var activity = travelActivityReportingService.report(customerId);  
if (activity == null) {  
    return null;  
}  
  
var report = ai  
        .withDefaultLlm()  
        .withToolObject(activity) // Expose the tool from the instance  
        .generateText("""  
                Your job is to help staff of Antechinus Travel understand their customers.  
                You will be given a report of customer activity over a period of time.  
                Summarize the activity in a way that draws our staff member's  
                attention to important details and also includes the customer's name.  
                Use no more than %s words.  
                We consider customers that spend more than %f to be high spenders.  
                Customers that take more than %f trips per year are frequent travelers.  
                If the customer is a high spender, include a note about this in the summary.  
                  
                # CUSTOMER ACTIVITY  
                %s  
                """.formatted(config.maxWords, config.highSpenderThreshold, config.highTripsPerYearThreshold(),  
                activity));
```

### Why This Pattern Matters

* **Contextual precision.** The tools exposed are specific to the entities in scope. You can leverage polymorphism and other language features to expose exactly the right capabilities. Exposing only relevant tools reduces token usage and may let you use a less powerful (cheaper, faster, greener) LLM.
* **Encapsulation**. You enjoy the benefits of object orientation, such as packaging logic with hidden data. The arguments to your tool methods will be simple because any complex state is held within the entity.
* **Enhanced security.** You’re not just saving bandwidth — you can keep sensitive data away from the LLM entirely. Private information remains locked in your entities, never serialized in prompts, while tools can still leverage it.
* **Maximizing the ability to execute actions as code**. The more — and smarter — structure you bring to your agents, the easier it is to perform some individual actions cheaply and reliably using code, rather than an LLM call.
* **Leveraging existing code.** You may be able to put tools on existing domain objects. If you don’t control those objects or want separation of concerns, you can easily wrap them in a facade.

> Expose tools on domain objects selectively. If possible, update state in code actions rather than via LLM calls.

## The JVM Advantage

You can create in-process tools in Python or TypeScript. But there’s less to build on. Across the enterprise, **Java is everywhere**. The JVM already carries the weight of mission-critical business logic.

This is why the JVM is emerging as foundational for production-grade agent engineering.

Embabel’s goal is not just to build agents — it’s to safely **elevate your business domain into the agentic layer**. Check out the [travel activity example in embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) for the complete implementation of the code in this blog. Or create your own repository from our [java-agent-template](https://github.com/embabel/java-agent-template) to see how easy it is to add agents to existing JVM applications and expose their capabilities — without unnecessary ceremony.

> Don’t wrap your business logic in layers it doesn’t need. Your domain *is* the tool. Use it.
