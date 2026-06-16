# Ground Your AI Transformation on What Works Today | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/ground-your-ai-transformation-on-what-works-today-bfc525418118](https://medium.com/@springrod/ground-your-ai-transformation-on-what-works-today-bfc525418118)
**來源網站**: medium.com

---

# Ground Your AI Transformation on What Works Today

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--bfc525418118---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--bfc525418118---------------------------------------)

6 min read

·

Aug 27, 2025

--

3

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Dbfc525418118&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fground-your-ai-transformation-on-what-works-today-bfc525418118&source=---header_actions--bfc525418118---------------------post_audio_button------------------)

Share

Sophisticated agentic flows are exciting. [Embabel](https://github.com/embabel/embabel-agent)’s [planning capability](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6) is great for building them in a safe, extensible way, as shown by our [travel planner sample application](https://github.com/embabel/tripper). (Check it out to see how the JVM [can outmatch Python for Gen AI](/@springrod/you-can-build-better-ai-agents-in-java-than-python-868eaf008493).)

However, we don’t always need a complex flow. Often we need to add some AI to an existing application. For example:

* **A user filling in a particular text field in a form might force their submission to be processed by a human**, when in most cases that input could safely be handled by an LLM.
* **Many integration problems can be solved safely by an LLM call** with just the right context.
* **A staff member might benefit from a natural language summary of customer activity** when bringing up their account.

Embabel excels in these simpler cases, too, not only because of its own merits but because it builds on the JVM, which runs much of the world’s valuable software.

> It’s best to add Gen AI functionality within an existing software stack, with easy access to existing business logic and infrastructure.

## Adding AI to a Spring Application

Let’s take the third example scenario: summarizing customer activity. Imagine we’re a travel business and we want to help our staff quickly understand a customer’s activity when accessing their account. We need only a single LLM call for this; there’s no need for a workflow or planning.

Assume we have an existing application that has a reporting service returning a data structure like this:

```
interface TravelActivityReportingService {  
  
    /**  
     * Given a customer id, return their travel activity  
     */  
    @Nullable  
    TravellerActivity report(Long customerId);  
}  
  
record TravellerActivity(  
        String name,  
        Instant from,  
        Instant to,  
        List<Trip> trips  
) { ...  
  
record Trip(  
        String from,  
        String to,  
        Instant departure,  
        Instant arrival,  
        float amount  
) {  
}
```

The implementation would probably use JDBC, JPA or another data access API for the actual reporting. This won’t matter to our AI code as we’ll follow best practice of coding to interfaces rather than implementations.

> We can and should continue to follow programming best practice as we embrace Gen AI.

### Adding LLM Summarization

Let’s write an `ActivitySummarizer` component that adds the summary to the `TravelActivity` data. We simply inject the Embabel `Ai` interface along with our `TravelActivityReportingService`, allowing us to access the power and elegance of its connectivity to LLMs through a single interface:

```
@Service  
public record ActivitySummarizer(  
        TravelActivityReportingService travelActivityReportingService,  
        Ai ai,  
        Config config) {  
  
    @ConfigurationProperties(prefix = "example.activity-summarizer")  
    public record Config(  
            @DefaultValue("80") int maxWords,  
            @DefaultValue("2000.0") float highSpenderThreshold,  
            @DefaultValue("10") float highTripsPerYearThreshold  
    ) {  
    }  
  
    @Nullable  
    public TravelerActivityReport summarizeActivity(Long customerId) {       
        var activity = travelActivityReportingService.report(customerId);  
        if (activity == null) {  
            return null;  
        }  
          
        var report = ai  
          .withDefaultLlm()  
          .withToolObject(activity)  
          .generateText("""  
                  Your job is to help staff of Antechinus Travel understand   
                  their customers.  
                  You will be given a report of customer activity over a period of time.  
                  Summarize the activity in a way that draws our staff member's  
                  attention to important details and also includes the customer's name.  
                  Use no more than %s words.  
                  We consider customers that spend more than %f to be high spenders.  
                  Customers that take more than %f trips per year are frequent travelers.  
                  If the customer is a high spender, include a note about this in the summary.  
                    
                  # CUSTOMER ACTIVITY  
                  %s  
                  """.formatted(  
                    config.maxWords,   
                    config.highSpenderThreshold,   
                    config.highTripsPerYearThreshold(),  
                    activity));  
        return new TravelerActivityReport(report, activity);  
    }  
}
```

Gen AI usage integrates seamlessly with calls to existing code. Obtaining the activity report would probably occur within a transaction and may take time; we don’t hold the transaction open during the LLM call.

### Domain Objects FTW

Wait, aren’t LLMs known to be unreliable at calculations? Good question. We aren’t relying on the LLM’s reasoning capabilities to calculate whether the traveller is a frequent traveler or big spender. The `TravelActivityReport` domain object exposes methods marked with the Spring AI `Tool` annotation to give the LLM accurate numbers.

Here’s the full implementation of `TravelActivityReport`:

```
record TravellerActivity(  
        String name,  
        Instant from,  
        Instant to,  
        List<Trip> trips  
) {  
  
    @Tool  
    public float totalSpend() {  
        return trips.stream().map(Trip::amount).reduce(0f, Float::sum);  
    }  
  
    @Tool  
    public float averageSpend() {  
        return trips.isEmpty() ?  
                0f :  
                totalSpent() / trips.size();  
    }  
  
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
  
    /**  
     * At this rate, how many trips would be taken in a year?  
     */  
    @Tool(description = "Trips per year")  
    public float tripsPerYear() {  
        long days = periodDays();  
        return days == 0 ?  
                trips.size()  
                : (trips.size() * 365f) / days;  
    }  
}
```

The tools are exposed to the LLM in the `withToolObject(activity)` call in the `ActivitySummarizer`.

> [Domain understanding is critical to success with Gen AI](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8). Once we have the right domain objects, it becomes much easier to build anything from simple components like this to sophisticated agent workflows. Even better: you already have these domain objects in your JVM applications.

### Configuring Embabel

Enabling injection of the `Ai` interface is simple, especially in a Spring Boot application. We simply add the Embabel Spring Boot starter to our dependencies, and add the `EnableAgents` annotation to the main class:

```
@SpringBootApplication  
@EnableConfigurationProperties  
@EnableAgents  
public class AgentApplication {  
  
      
    public static void main(String[] args) {  
        SpringApplication.run(AgentShellApplication.class, args);  
    }  
}
```

The `Ai` and `PromptRunner` types are easy to use. However, they are an entry to a wide range of Gen AI functionality. They allow us to perform a range of tasks such as choosing LLMs based on varied criteria, setting hyperparameters, leveraging Jinja templates for long prompts, and performing RAG operations.

The code shown here is from the [embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) repository.

## Testing

Since we’re considering realistic enterprise scenarios, we must consider testing. One of the reasons for Spring’s success is that it recognized the importance of unit and integration testing from the beginning. So does Embabel.

Its API design ensures that we can unit test our component easily, as in this test using [Mockito](https://site.mockito.org/) mock objects:

```
@Test  
void testSummarizeActivityValidReturn() {  
    var mockReportingService = Mockito.mock(TravelActivityReportingService.class);  
    var mockAi = Mockito.mock(Ai.class);  
    var mockPromptRunner = Mockito.mock(PromptRunner.class);  
    var config = new ActivitySummarizer.Config(80, 2000.0f, 10f);  
  
    var travellerActivity = createSampleTravellerActivity();  
    var expectedSummary = "John Doe is a frequent traveler who has taken 2 trips to Paris and Tokyo, spending $3000 total. As a high spender, he enjoys premium destinations.";  
  
    when(mockReportingService.report(1L)).thenReturn(travellerActivity);  
    when(mockAi.withDefaultLlm()).thenReturn(mockPromptRunner);  
    when(mockPromptRunner.withToolObject(travellerActivity))  
      .thenReturn(mockPromptRunner);  
    when(mockPromptRunner.generateText(anyString()))  
      .thenReturn(expectedSummary);  
  
    var activitySummarizer = new ActivitySummarizer(  
            mockReportingService, mockAi, config);  
    var result = activitySummarizer.summarizeActivity(1L);  
  
    assertEquals(expectedSummary, result.summary());  
    assertEquals(travellerActivity, result.activity());  
  
    Mockito.verify(mockReportingService).report(1L);  
    Mockito.verify(mockAi).withDefaultLlm();  
    Mockito.verify(mockPromptRunner).withToolObject(travellerActivity);  
    Mockito.verify(mockPromptRunner).generateText(anyString());  
}
```

Embabel also provides excellent integration testing support, to verify that agentic flows work as expected, but that’s not required here.

> You could implement this simple functionality directly with Spring AI. But its programming model is lower level and harder to test. Embabel provides an elegant API that scales from simple LLM interaction to sophisticated workflows.

## Gen AI-enable Your JVM Applications Today

Press enter or click to view image in full size

![]()

You’ve probably heard of the recent [MIT report into AI adoption](https://finance.yahoo.com/news/mit-report-95-generative-ai-105412686.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAANZy3VQ5IRP9-4RFXyCHoaKBivXB78NumpzIxfjdRF7ijQkrJPIPVbBsES129FlLO7vraGFhxAO0AxFsJtT2QO8KbuQPgW7qI7pYPQcZni8IFWxomao2AJxZUd4ueMrv3uEhT8qeLpZ-BM74dvqbTdR5qnltgrFje1lMAgE5rmtU) in large organizations. (More on that in future posts.)

> Despite $30–40 billion in enterprise investment into GenAI, this report uncovers a surprising result in that 95% of organizations are getting zero return.

One reason for AI failures is that organizations often try to run before they can walk: attempting grandiose agentic transformations powered by PowerPoint and hope and ignoring existing functionality, domain understanding, infrastructure and skills. We’ve seen that movie before. The ending isn’t pretty.

> Agentic transformation will happen, but not overnight. The path toward it begins by Gen AI-enabling existing applications and building on existing assets, runtimes and domain models.
>
> Every organization needs an overall Gen AI strategy. But it’s sure to fail unless it’s accompanied and informed by practical, achievable steps.

Embabel provides a natural path from incremental results today to sophisticated agentic workflows tomorrow, leveraging the critical infrastructure organizations already have, and taking full advantage of proven software practices.

The [Embabel Java agent template repository](https://github.com/embabel/java-agent-template) contains an example of the simple programming model shown here. Create your own repository from it today and see how easy it is to begin your own journey.
