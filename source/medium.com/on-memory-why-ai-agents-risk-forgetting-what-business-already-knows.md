# On Memory: Why AI Agents Risk Forgetting What Business Already Knows | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/on-memory-why-ai-agents-risk-forgetting-what-business-already-knows-51b2c902e91c](https://medium.com/@springrod/on-memory-why-ai-agents-risk-forgetting-what-business-already-knows-51b2c902e91c)
**來源網站**: medium.com

---

# On Memory: Why AI Agents Risk Forgetting What Business Already Knows

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--51b2c902e91c---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--51b2c902e91c---------------------------------------)

4 min read

·

Aug 6, 2025

--

4

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D51b2c902e91c&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fon-memory-why-ai-agents-risk-forgetting-what-business-already-knows-51b2c902e91c&source=---header_actions--51b2c902e91c---------------------post_audio_button------------------)

Share

Memory is a hot topic in Gen AI. Every major AI company is racing to build agents that can remember, learn, and evolve. OpenAI has been iterating on conversational memory, Google Gemini has a [memory feature](https://9to5google.com/2024/11/19/gemini-remember-saved-info/), and specialized memory platforms like [Zep](https://www.getzep.com/) and [Mem0](https://github.com/mem0ai/mem0) are emerging.

Effective [Context Engineering](https://www.philschmid.de/context-engineering) depends on memory. The context for each LLM call does not exist in isolation, but in terms of what happened earlier in the same conversation, what happened yesterday, or what happened to the user’s account.

Memory solutions are often built on novel structures such as vector databases. Some types of memory are indeed new to Gen AI. But, as the last of these examples shows, when we think about memory, we can’t start afresh, but must consider existing knowledge.

> Business applications already exhibit memory we can manage and reason about. There's something crucial missing from the AI memory conversation: D**omain understanding.**

There’s a natural temptation to think that in the brave new world of Gen AI, everything is shiny and new. But we know from experience that all software exists in the context of what’s already there. Gen AI is no exception. We can’t just think of memory in terms of new, AI-centric features; we need to consider how to access and build on existing data and understanding. [Domain-Integrated Context Engineering](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8) (DICE) allows us to do this.

## The Current Memory Landscape

The AI community has converged on a taxonomy inspired by cognitive psychology. This framing is natural, given that AI has often drawn from biological models — neural networks mimick neurons and synapses, and evolutionary algorithms simulate natural selection. It also likely owes something to the fact that early Gen AI has over-indexed on chat as a primary use case, making human-like cognitive categories feel most relevant.

IBM's [overview](https://www.ibm.com/think/topics/ai-agent-memory) outlines familiar categories of memory:

* **Short-term memory**: Conversational context within token windows
* **Long-term memory**: Persistent knowledge across sessions, often using vector databases
* **Episodic memory**: Specific experiences and events for case-based reasoning
* **Semantic memory**: Structured factual knowledge and relationships
* **Procedural memory**: Learned behaviors and skills

Academic work like [Rethinking Memory in AI](https://arxiv.org/abs/2505.00675) provides comprehensive taxonomies and implementation strategies. Researchers at Princeton’s [Institute for Advanced Study](https://www.ias.edu/about/welcome) claim to have discovered a [universal law of memory](https://www.ias.edu/ideas/ias-scholars-discover-universal-law-memory), arguing that human memories organize in tree-like structures.

## The Missing Piece: Domain Integration

All this is valuable, but it shares a blind spot. The focus on generic memory mechanisms is divorced from existing business understanding. It is valuable for addressing some tasks, but a poor fit for business applications.

Vector embeddings capture semantic similarity, but don't understand that a `Customer` has different retention policies to a `Transaction`, or the rules around extending credit to business customers for purchases over $20,000. Newly designed knowledge graphs store relationships, but don't encode the bounded contexts defining how different parts of a business system should interact.

This is where **Domain-Integrated Context Engineering (DICE)** becomes a critical element of what the IBM article calls **semantic memory**.

## Why DICE Completes the Memory Picture

Domain models aren't just data structures—they're sophisticated memory systems that have been hiding in plain sight. Consider how traditional enterprise applications already implement memory-like capabilities:

**Event Sourcing** provides perfect episodic memory by storing the complete history of domain changes as immutable events. Every decision, every state transition, every business event is preserved with full context.

**Repository patterns** offer domain-focused memory interfaces that understand business concepts. A `CustomerRepository` knows how to retrieve customer information in ways that preserve business meaning, not just raw data.

**Bounded contexts** from [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) partition memory into semantic boundaries, preventing the concept pollution that plagues pure vector-based approaches.

**Aggregates** function as cohesive memory clusters with consistency boundaries—exactly what we need for reliable agent behavior.

Persistent domain objects allow for valuable, proven functionality such as querying and auditing. Reinventing that is risky, wasteful and costly.

## Domain Models as Structured Memory

> Domain models already implement sophisticated memory architectures.

A well-designed domain model captures:

* **Semantic memory** through entity relationships and business rules
* **Episodic memory** through event streams and audit trails
* **Procedural memory** through encapsulated business logic
* **Temporal memory** through versioning and historical state tracking

These memory systems are grounded in business understanding rather than abstract vector spaces or psychological concepts with limited applicability to business processes.

Press enter or click to view image in full size

![]()

## The Path Forward

AI agent memory isn't just about better embeddings or more sophisticated retrieval mechanisms. Effective memory must be integrated with domain understanding. DICE provides this integration by:

1. **Treating domain objects as memory units** with both data and behavior
2. **Using business events as episodic memory** with temporal context
3. **Leveraging proven patterns** from decades of enterprise software development
4. **Bridging AI capabilities** with existing business logic and systems

> When we combine the cognitive science insights from current memory research with the domain modeling wisdom of enterprise software, we get something more powerful than either approach alone.

The memory revolution in AI is real, but it's incomplete without domain integration. While the industry focuses on generic memory mechanisms, the most valuable applications will emerge from systems that understand business concepts as deeply as they understand vectors and embeddings.

> DICE isn't just another conceptual framework—it's the missing piece that transforms AI agents from impressive demos into reliable business tools. By grounding memory in domain understanding, we can build agents that don't just remember, but remember in ways that align with how our businesses work.

Building agents that can think and remember is cool. Building agents that can think and remember like domain experts may be less cool, but it’s essential to unlock the full potential of Gen AI.
