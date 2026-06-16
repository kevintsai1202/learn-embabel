# Build Better Agents in Java Than Python: Embabel vs Pydantic AI | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/build-better-agents-in-java-than-python-embabel-vs-pydantic-ai-ab373c149108](https://medium.com/@springrod/build-better-agents-in-java-than-python-embabel-vs-pydantic-ai-ab373c149108)
**來源網站**: medium.com

---

# Build Better Agents in Java Than Python: Embabel vs Pydantic AI

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--ab373c149108---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--ab373c149108---------------------------------------)

6 min read

·

Aug 21, 2025

--

3

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Dab373c149108&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fbuild-better-agents-in-java-than-python-embabel-vs-pydantic-ai-ab373c149108&source=---header_actions--ab373c149108---------------------post_audio_button------------------)

Share

In my [last post](/@springrod/you-can-build-better-ai-agents-in-java-than-python-868eaf008493), I showed how a CrewAI example could be rewritten in Java using [Embabel](https://github.com/embabel/embabel-agent) to be more robust, concise, elegant and extensible.

Today it’s the turn of [Pydantic AI](https://ai.pydantic.dev/), “a Python agent framework designed to make it less painful to build production grade applications with Generative AI.”

![]()

## The Task: A Bank Support Interaction

The second example on the the Pydantic AI home page is “a concise example using Pydantic AI to build a support agent for a bank,” demonstrating “a dynamic system prompt, structured outputs and tools.” The full listing is [here](https://ai.pydantic.dev/examples/bank-support/).

This is a simpler example than the CrewAI book writing flow, involving only a single LLM call. However, it has immediate real-world relevance. It demonstrates interaction with real data, which the Pydantic team rightly consider to be important to put in a prominent example.

> Real world agents don’t exist in a vacuum: they need to work with existing data and business logic. How easy a framework makes that is a key test of its business value.

The bank support agent takes a customer ID and query as input. It looks up the customer in a database and returns an object with three fields:

* A text response, addressing the customer by name and returning their balance if requested. Depending on the customer’s request, the amount may or may not reflect pending transactions.
* An assessment of how risky the interaction is.
* A flag for whether the customer’s account should be blocked — for example, because they’d mentioned losing their card.

## The Pydantic AI Implementation

### Concepts

A Pydantic AI **agent** specifies an LLM, the static part of the system prompt, and the return type. LLM call return types are specified using Pydantic models.

The dynamic part of the ultimate prompt — relating to data only available during an agent run, such as the current `Customer` and their query — comes from two sources: user input, which is added automatically, and [Python decorators](https://realpython.com/primer-on-python-decorators/). Decorators are also used to make tools available to the LLM.

### Code

The Pydantic AI implementation starts with fake database connectivity, which is included in a `SupportDependencies` object that includes the customer ID:

```
class DatabaseConn:  
    """This is a fake database for example purposes.  
  
    In reality, you'd be connecting to an external database  
    (e.g. PostgreSQL) to get information about customers.  
    """  
  
    @classmethod  
    async def customer_name(cls, *, id: int) -> str | None:  
        if id == 123:  
            return 'John'  
  
    @classmethod  
    async def customer_balance(cls, *, id: int, include_pending: bool) -> float:  
        if id == 123:  
            if include_pending:  
                return 123.45  
            else:  
                return 100.00  
        else:  
            raise ValueError('Customer not found')
```

The `DatabaseConn` is used in the `SupportDependencies` object, which will be injected into decorators to expose run-specific information:

```
@dataclass  
class SupportDependencies:  
    customer_id: int  
    db: DatabaseConn
```

A Pydantic model for the output includes information useful to the LLM:

```
class SupportOutput(BaseModel):  
    support_advice: str = Field(description='Advice returned to the customer')  
    block_card: bool = Field(description='Whether to block their card or not')  
    risk: int = Field(description='Risk level of query', ge=0, le=10)
```

Finally, we create an agent specifying the LLM and bind the dynamic part of the system prompt to it, along with tools, also backed by the current `SupportDependencies:`

```
support_agent = Agent(  
    'openai:gpt-4o',  
    deps_type=SupportDependencies,  
    output_type=SupportOutput,  
    system_prompt=(  
        'You are a support agent in our bank, give the '  
        'customer support and judge the risk level of their query. '  
        "Reply using the customer's name."  
    ),  
)  
  
  
@support_agent.system_prompt  
async def add_customer_name(ctx: RunContext[SupportDependencies]) -> str:  
    customer_name = await ctx.deps.db.customer_name(id=ctx.deps.customer_id)  
    return f"The customer's name is {customer_name!r}"  
  
  
@support_agent.tool  
async def customer_balance(  
    ctx: RunContext[SupportDependencies], include_pending: bool  
) -> str:  
    """Returns the customer's current account balance."""  
    balance = await ctx.deps.db.customer_balance(  
        id=ctx.deps.customer_id,  
        include_pending=include_pending,  
    )  
    return f'${balance:.2f}'
```

## The Embabel Version

The data integration requirement plays into the superiority of Embabel because of its integration into the Java ecosystem.

We define a similar `SupportOutput`output structure. Clear, focused, types are good, so we also define a `SupportInput` object to capture everything that should be passed into a specific agent process run:

```
record SupportInput(  
    @JsonPropertyDescription("Customer ID") Long customerId,  
    @JsonPropertyDescription("Query from the customer") String query) {  
}  
  
record SupportOutput(  
    @JsonPropertyDescription("Advice returned to the customer") String advice,  
    @JsonPropertyDescription("Whether to block their card or not") boolean blockCard,  
    @JsonPropertyDescription("Risk level of query") int risk) {  
}
```

We create a `Customer` domain object and a Spring Data repository to retrieve it:

```
record Customer(Long id, String name, float balance, float pendingAmount) {  
  
    @Tool(description = "Find the balance of a customer by id")  
    float balance(boolean includePending) {  
        return includePending ? balance + pendingAmount : balance;  
    }  
}  
  
interface CustomerRepository extends Repository<Customer, Long> {  
  
    @Nullable  
    Customer findById(Long id);  
}
```

Note a key difference here to the Python version: we have a domain object to represent the customer, as we would in any real world system. This domain object includes not just richer state, but behavior. We expose a tool that will be available to the LLM to perform safe balance calculations. We could also expose any behavior we wanted to be accessible only through code, without a `Tool` annotation.

> Domain modeling is core to building effective agents. This is a simple example of [Domain-Integrated Context Engineering](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8) (DICE).

The agent itself is straightforward. Like any Spring-managed object, it can be injected with whatever services it needs: in this case, the `CustomerRepository`.

There’s a single action method, which takes a `SupportInput` instance as a starting point. It’s annotated with `@AchievesGoal`, indicating that successful execution will achieve the agent’s goal.

The action implementation uses the repository to look up the customer, then makes an LLM call. The prompt is built in a single string, with access to the `Customer` instance. The `Customer` instance is added as a tool object, enabling the LLM to call the `balance` tool with the appropriate argument, depending on the query:

```
@Agent(description = "Customer support agent")  
record SupportAgent(CustomerRepository customerRepository) {  
  
    @AchievesGoal(description = "Help bank customer with their query")  
    @Action  
    SupportOutput supportCustomer(SupportInput supportInput, OperationContext context) {  
        var customer = customerRepository.findById(supportInput.customerId());  
        if (customer == null) {  
            return new SupportOutput("Customer not found with this id", false, 0);  
        }  
        return context.ai()  
                .withLlm(OpenAiModels.GPT_41_MINI)  
                .withToolObject(customer)  
                .createObject(  
                  """  
                  You are a support agent in our bank, give the  
                  customer support and judge the risk level of their query.  
                  In some cases, you may need to block their card. In this case, explain why.  
                  Reply using the customer's name, "%s".  
                  Currencies are in $.  
                    
                  Their query: [%s]  
                  """.formatted(customer.name(), supportInput.query()),  
                  SupportOutput.class);  
    }  
  
}
```

## Comparison

At the expense of the conceptual complexity of the decorator linkage, the Pydantic AI version is more type safe than the CrewAI approach — an important benefit. There are no magic keys in building prompts, and less potential for runtime errors.

Both Pydantic and Embabel implementations are concise. However, the Embabel version is superior in several ways:

* **It has a clearer structure**: input and output types, customer domain object, repository and agent all have clear responsibilities. The Pydantic AI “injected” `SupportDependencies` mixes infrastructure concerns (data access) with user input (customer ID).
* **Prompt construction is simpler.** Such a simple example requires only a single string, constructed in a type safe way. We can unit test prompt construction easily using a fake or mock `Customer`.
* **It uses familiar, proven data access patterns**. While we wouldn’t expect a simple example to perform real data access, the Pydantic example’s data access doesn’t tie into established patterns or infrastructure. The Embabel `InMemoryCustomerRepository` is also fake, but because it builds on [Spring Data](https://spring.io/projects/spring-data), *our agent requires no code changes to use a real database*. We could implement a real `CustomerRepository` using JDBC or JPA or any persistence mechanism of our choice, and our agent would happily use it without knowing where the data came from. The agent could also benefit from Spring transaction management.
* **It would benefit from existing functionality**. A real bank would be far more likely to have customer domain objects in Java than Python. Thus this agent could benefit from adjacency with existing Java code and services, and reuse existing code.
* **It aligns with the existing architecture of enterprise applications**. Any Spring developer will find these patterns familiar.

> As in our comparison with CrewAI, the Embabel version is readier than the Python original to grow into a real application.

## Next Steps

This example is in the [embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) repository, along with other examples in Java and Kotlin.

Embabel is not aiming to play catchup to Python frameworks, but to provide the best programming model for Gen AI on any platform. Even better, a model that seamlessly integrates with much of the world’s valuable business logic. In future blogs, I’ll take on other Python frameworks.

Start building agents on the JVM today. Use our [GitHub Java agent template](https://github.com/embabel/java-agent-template) and have your first agent running in minutes. Join our [growing community](https://discord.com/invite/t6bjkyj93q) and help us build the future of agent frameworks.
