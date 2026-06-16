# Agent Memory Is Not A Greenfield Problem: Ground it in your Existing Data | by Rod Johnson | Embabel | Medium

**來源網址**: [https://medium.com/embabel/agent-memory-is-not-a-greenfield-problem-ground-it-in-your-existing-data-9272cabe1561](https://medium.com/embabel/agent-memory-is-not-a-greenfield-problem-ground-it-in-your-existing-data-9272cabe1561)
**來源網站**: medium.com

---

# Agent Memory Is Not A Greenfield Problem: Ground it in your Existing Data

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--9272cabe1561---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--9272cabe1561---------------------------------------)

10 min read

·

Feb 20, 2026

--

3

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D9272cabe1561&operation=register&redirect=https%3A%2F%2Fmedium.com%2Fembabel%2Fagent-memory-is-not-a-greenfield-problem-ground-it-in-your-existing-data-9272cabe1561&source=---header_actions--9272cabe1561---------------------post_audio_button------------------)

Share

LLMs must be grounded to avoid hallucinations and access factual content and real time data. [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) tackles one part of the problem; agent memory another.

However, the dominant approach to agent memory is deeply flawed. Memory systems such as [Mem0](https://mem0.ai/), [Zep](https://www.getzep.com/), [AWS AgentCore Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html), and Google [Vertex Memory Bank](https://docs.cloud.google.com/agent-builder/agent-engine/memory-bank/overview) start from the assumption that agent memory should be built from scratch by extracting facts from conversations.

This rests on two dangerous fallacies. It overemphasizes chat ([a common mistake)](https://sublight.substack.com/p/chat-interfaces-are-bad), and neglects the critical importance of [how data is already stored and managed](/@springrod/on-memory-why-ai-agents-risk-forgetting-what-business-already-knows-51b2c902e91c), and the necessity of integrating with it.

Even [IBM’s article on agent memory](https://www.ibm.com/think/topics/ai-agent-memory) reflects these fallacies, talking about agent memory in a vacuum. If *IBM*, of all companies, can’t get their head around the relationship between agents and existing enterprise systems, the [disastrous results of enterprise AI rollouts](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) become more understandable. It is also less surprising when we consider that, to this point, Gen AI has largely been driven by people with little interest in or understanding of the enterprise systems that power our everyday life.

[Embabel](https://github.com/embabel/embabel-agent) introduces a different approach, reflecting the understanding that Gen AI can only succeed in enterprise through close integration with valuable existing assets.

In previous blogs I’ve introduced [Domain Integrated Context Engineering](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8) (**DICE**).

Today I’ll explain how we approach these concepts in the Embabel [Dice module](https://github.com/embabel/dice).

In my next blog I’ll show how Dice can be used in a chatbot. Head to the [urbot repository](https://github.com/embabel/urbot) right away if you’re impatient to see working code.

## Agent Memory Today

Agent memory approaches draw heavily on cognitive science. [Endel Tulving](https://en.wikipedia.org/wiki/Endel_Tulving)’s distinction between **episodic memory** (specific events and experiences) and **semantic memory** (general facts and knowledge) [dates from 1972](https://alicekim.ca/12.EpSem72.pdf) and remains a useful framework for what agents need to remember. Nearly every system in this space models these categories.

However, cognitive science helps with only part of the problem. Agent memory approaches are overwhelmingly text based, lacking the structure core to proven business systems.

Mem0 extracts memories into vector stores. AgentCore stores semantic facts and user preferences. Google Memory Bank uses Gemini to pull key details from session history. All treat memory as a greenfield concern: text in, embeddings out, similarity search to retrieve.

> Freeform text is opaque and costly to work with. LLMs and vector search are slow and unpredictable. Cheaper approaches like BMI25 or regex searching are imprecise and offer limited capability. The precision, performance and predictability of a database query is lacking.

A more sophisticated approach is to use a **knowledge graph**, as in the various takes on [Graph RAG](https://neo4j.com/blog/genai/what-is-graphrag/).

Zep builds a temporal knowledge graph, ingests structured JSON business data alongside conversations, and recently added custom entity types. But even Zep treats business data as something you *push into* its graph — a JSON snapshot of a customer record is ingested, extracted, and stored as a Zep entity node copy.

> None of these solutions link **to real domain objects.**

Existing businesses aren’t starting from scratch.

You already have a `Customer` entity. It probably lives in a relational database. It likely has a Spring Data repository, and a service layer above it. It has validation rules, business logic, and relationships to `Order` and `Product` entities, backed by years of careful domain modelling and rigorous testing.

Pure text solutions have no solid way of linking between a memory and a customer. Even with Zep, when it ingests a customer JSON document, it creates a *new* node in its graph, which doesn’t know about the JPA entity it came from. It can’t call existing business logic or enforce established validation rules. It doesn’t update when the real entity changes. It’s a text-and-embedding snapshot of something that was once a rich domain object, encapsulating behaviour.

> Even in genuine greenfield scenarios, data will build up over time and the more structure the better.

## Grounding Memory in Existing Data

How *should* we think about memory for business applications in an ideal world?

### A simple thought experiment

What memories does my bank have about me? They probably have some text notes about my patterns and preferences that staff can retrieve, but these are far from the most valuable things they know about me. *Those* are highly structured, such as my account types and balances, payment history, and address. They are updated in structured ways, rather than through loose text. And they are definitely *not* in a vector database — although it’s now likely that they’re in a database that has a vector capability. The most valuable information doesn’t relate closely to cognitive science thinking about memory.

> A mature memory solution must consider existing structured data along with free-form text, and must attempt to bring as much structure as possible to memory capture.

### **What if memories could reference your existing entities?**

What if, instead of copying data into a fresh graph, we link to existing data *in whatever store it is held.* What if this also enables us to benefit from the business logic around it?

An entity node in the knowledge graph that holds a typed link to the real `Customer` record in your RDBMS. A `PREFERS` relationship that the agent discovered in conversation — but pointing to a `Cuisine` entity your recommendation engine already knows about. Memory as a *projection over* knowledge the business already has, not a parallel store that duplicates it.

This profoundly improves how memory works in practice:

* **Agents don’t start from zero**. On day one, every agent has access to what your domain model already knows — purchase history, loyalty tier, dietary restrictions — through real entity references, not extracted text approximations. Visibility can be limited for safety.
* **Contradictions become visible**. If the agent extracts “user prefers Nike” but your transaction data shows they’ve bought Adidas exclusively for three years, the graph surfaces that tension because both the proposition and the domain entity are present and connected.
* **Business logic stays where it belongs**. Your validation rules, authorization checks and repository methods are accessible through the actual entity, not reimplemented in the memory layer.

Press enter or click to view image in full size

![Agent memory is not a greefield problem]()

Not a greenfield problem

## The problem with hosted services

AWS AgentCore Memory and Google Memory Bank are managed cloud services. Your agent’s memories live in *their* infrastructure. This is fine for many users, but problematic in enterprise, when domain entities are in databases behind firewalls, accessed by Java applications — and agent memory is in a separate hosted service that can’t access them.

If you don’t care too much about data sovereignty and security, it may be possible to serialize your business data, ship it across a network boundary to someone else’s memory store, and hope the LLM-powered extraction pipeline captures what matters. You now have two sources of truth: your actual domain model and a lossy, eventually-consistent text approximation of it sitting in a managed service. When your `Customer` record updates, the memory service doesn't know. When your business rules change, the memory service doesn't care. You're paying for the privilege of maintaining a stale copy of knowledge you already have.

This is architecturally backwards. **Memory needs to be co-located with the entities it references,** not across a network behind an API boundary. It should be in process, with direct access to your repositories, your domain logic, and your data.

**This is where the JVM has a huge advantage.**

An agent memory system running on the JVM doesn’t need to call an external API to learn about your customers. It can simply call its own services and repositories, benefiting from their business logic and tested behaviour. Nor does it need to go through MCP, when it can find answers faster in process. It can access the same `CustomerRepository` your application already uses. It can resolve a proposition like "the user prefers Italian food" against the actual `Customer` entity and the actual `Cuisine` entity your recommendation engine already depends on — in the same process, with the same transaction guarantees, through the same Spring context.

The memory system and the domain model are one, running together, sharing the same type system and the same runtime. While we notionally have a knowledge graph (for which Neo4j is a brilliant store), data tends to stick where it lands, and the approach supports multiple stores.

Python-based memory frameworks can’t do this — not because Python is a bad language, but because the enterprise domain model doesn’t live in Python, but in the JVM.

> A Python memory service will always be on the outside looking in, calling APIs to get approximations of what your Java code already knows directly.

Existing frameworks build memory as if the business starts knowing nothing — and as if memory should live somewhere other than where your business logic runs.

What’s needed is a memory system that treats what your business already knows as the foundation, conversation as something that extends it, and the JVM as exactly the right place for all of it to live.

That’s what Embabel Dice aims to provide.

## **Learning from Experience and Research**

The Dice project is based on internal knowledge graph work we’ve done at Embabel over the last two years, as well as thorough exploration of the state of the art in memory solutions.

Among the influences, [Neo Technology’s LLM Knowledge Graph Builder](https://neo4j.com/labs/genai-ecosystem/llm-graph-builder/) demonstrated that LLMs can extract entities and relationships from unstructured text into a knowledge graph — documents to chunks to entities to relationships, with schema-guided extraction. It doesn’t address what happens when those extracted entities correspond to things your business already knows about in existing databases, or how to apply this to memory versus RAG.

We owe a particular debt to the [General User Models (GUM)](https://arxiv.org/abs/2505.10831) research from Stanford and Microsoft. GUM showed that you can build rich user models from unstructured observations using confidence-weighted propositions — atomic statements about a user, each carrying a confidence score and a decay rate, maintained through a pipeline of proposal, retrieval, and revision. The insight that propositions are the right atomic unit for extracted knowledge, and that they should carry calibrated uncertainty, directly informs our approach.

But GUM’s propositions are unstructured. They’re natural language strings in a vector store. There’s no schema constraining them, no formal ontology connecting them, and no mechanism for linking a proposition like “the user loved the trip to Italy last year” to a `Trip` entity in an existing business system.

Our approach in Dice takes GUM’s proposition model and asks:

* What if propositions could be *promoted* to typed relationships in a knowledge graph when confidence is high enough and a matching schema exists?
* What if entity nodes in that graph could hold references to real domain objects in existing data stores?
* What if memory, knowledge graph, and domain model were three projections of the same underlying system of record?

The result combines Tulving’s memory taxonomy, GUM’s confidence-weighted proposition, and Neo4j’s knowledge graph extraction. Further, promotion is generalized so that propositions can be projected not just to a Neo knowledge graph, but to other representations, including an experimental Prolog fact base.

**The most important, novel piece: integration with existing, typed, production domain entities that the business already trusts**.

## Memory is an Outgrowth of Your application

The memory problem is a symptom of something larger. The AI agent ecosystem has been built on a premise that enterprise should reject: that AI is a separate stack, a new silo, something you bolt onto your business from the outside.

> AI should grow out of your application, not land on it from space.

This explains the many failures. Not because AI doesn’t work, but because the approach is wrong. Companies are standing up parallel infrastructure — Python services, vector databases, hosted memory layers, prompt chains — that have no organic connection to the systems that actually run their business. The AI doesn’t know your domain. It doesn’t understand your constraints. It doesn’t share your type system, transaction boundaries or security model. It’s an alien stack that you spend months trying to integrate, and mostly fail.

What if AI agents grew *out of* your existing application instead?

That’s the bet we’re making with Embabel. Not a Python framework that hopes to connect to your enterprise. A JVM-native agent platform that lives inside it. Your domain entities become the agent’s world model. Your Spring services and repositories furnish it with tools. Your type system becomes its contract for correctness. Memory isn’t a separate service — it’s a structured projection over what your application already knows, extended by what the agent learns from interaction.

This goes beyond memory. Embabel uses [Goal-Oriented Action Planning](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6) — deterministic, inspectable plans built from type-safe preconditions and effects, not probabilistic prompt chains that you can’t explain to an auditor. Actions operate on your domain types. The planner reasons about your domain state. Every step is traceable, testable, and grounded in the same business logic your organization already trusts.

Python agent frameworks make nice demo infrastructure for greenfield AI experiments. We’re building infrastructure for AI that works inside the enterprise systems that already exist. Those are not the same thing, and the 95% failure rate tells you which one the industry actually needs.

> Enterprise AI doesn’t fail because models aren’t smart enough. It fails because frameworks either hope that enterprise systems will magically go away, or treat the them as an integration problem instead of a valuable starting point. Your domain model, your business rules, your data — these aren’t obstacles to work around. They’re the most valuable assets an agent can have.

## Embabel DICE

**We call this approach DICE — Domain Integrated Context Engineering.** It’s still early. We’re building the proposition-to-entity promotion pipeline, confidence-weighted memory projections and schema-guided extraction linking to live domain objects in the open. There’s a way to go before it’s hardened. But the architecture is clear, the foundations are solid, and the direction is right.

We believe DICE will be the m emory solution that helps change enterprise Gen AI from its current failure mode to something that actually delivers. Not by making LLMs smarter, but by giving them something the industry has overlooked: the structured domain knowledge that enterprises have spent decades building.

> The future of enterprise AI isn’t a smarter hosted memory service. It’s agents that speak your domain language because they were born inside your application.

That’s the vision Embabel exists to make real. And if this resonates with how you think about enterprise AI — if you’ve felt the frustration of trying to bolt a Python demo onto a real business system — we’d love you to join us on this journey. Star the [repo](https://www.github.com/embabel/dice), try [the framework](https://www.github.com/embabel/embabel-agent), help us refine the ideas. The best enterprise AI infrastructure won’t be built in isolation. It’ll be built by the people who understand and are currently delivering what enterprise actually needs.
