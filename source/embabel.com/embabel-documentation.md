# Embabel Agent Framework User Guide

**來源網址**: [https://docs.embabel.com](https://docs.embabel.com)
**來源網站**: embabel.com

---

Table of Contents

* [1. Overview](#overview__overview)
  + [1.1. Glossary](#glossary)
  + [1.2. Why do we need an Agent Framework?](#overview__agent-framework)
  + [1.3. Embabel Differentiators](#overview__why-embabel)
    - [1.3.1. Sophisticated Planning](#sophisticated-planning)
    - [1.3.2. Superior Extensibility and Reuse](#superior-extensibility-and-reuse)
    - [1.3.3. Strong Typing and Object Orientation](#strong-typing-and-object-orientation)
    - [1.3.4. Platform Abstraction](#platform-abstraction)
    - [1.3.5. LLM Mixing](#llm-mixing)
    - [1.3.6. Spring and JVM Integration](#spring-and-jvm-integration)
    - [1.3.7. Designed for Testability](#designed-for-testability)
  + [1.4. Core Concepts](#overview__concepts)
    - [1.4.1. Complete Example](#complete-example)
    - [1.4.2. The Inferred Execution Plan for the Example](#the-inferred-execution-plan-for-the-example)
    - [1.4.3. Key Benefits of Type-Driven Flow](#key-benefits-of-type-driven-flow)
* [2. Getting Started](#agent.guide)
  + [2.1. Quickstart](#getting-started.quickstart)
  + [2.2. Getting the Binaries](#getting-started.installing)
    - [2.2.1. Build Configuration](#build-configuration)
    - [2.2.2. Environment Setup](#reference.environment_setup)
  + [2.3. Getting Embabel Running](#getting-started.running)
    - [2.3.1. Running the Examples](#running-the-examples)
    - [2.3.2. Prerequisites](#prerequisites)
    - [2.3.3. Using the Shell](#using-the-shell)
    - [2.3.4. Example Commands](#example-commands)
    - [2.3.5. Implementing Your Own Shell Commands](#implementing-your-own-shell-commands)
  + [2.4. Adding a Little AI to Your Application](#getting-started.a-little-ai)
  + [2.5. Writing Your First Agent](#getting-started.first-agent)
    - [2.5.1. Example: WriteAndReviewAgent](#example-writeandreviewagent)
    - [2.5.2. Key Concepts Demonstrated](#key-concepts-demonstrated)
    - [2.5.3. Running Your Agent](#running-your-agent)
    - [2.5.4. Next Steps](#next-steps)
* [3. Embabel Shell](#shell.guide)
  + [3.1. How to Use the Shell](#shell.how-to)
    - [3.1.1. Starting the Shell](#starting-the-shell)
    - [3.1.2. Navigating the Shell](#navigating-the-shell)
    - [3.1.3. How User Input Reaches an Agent](#how-user-input-reaches-an-agent)
    - [3.1.4. Logging Verbosity](#logging-verbosity)
  + [3.2. Shell Commands](#shell.commands)
    - [3.2.1. Agent Execution Commands](#agent-execution-commands)
    - [3.2.2. Tool Call Context Commands](#tool-call-context-commands)
    - [3.2.3. Implementing Custom Shell Commands](#shell.commands.custom)
  + [3.3. Embabel Modules](#overview__modules)
    - [3.3.1. Module Directory](#module-directory)
    - [3.3.2. Experimental APIs](#experimental-apis)
* [4. Reference](#reference__reference)
  + [4.1. Invoking an Agent](#reference.flow)
  + [4.2. Agent Process Flow](#agent-process-flow)
    - [4.2.1. AgentProcess Lifecycle](#agentprocess-lifecycle)
    - [4.2.2. Planning](#planning)
    - [4.2.3. Blackboard](#blackboard)
    - [4.2.4. Binding](#reference.flow__binding)
    - [4.2.5. Context](#context)
  + [4.3. Goals, Actions and Conditions](#reference.steps)
  + [4.4. Domain Objects](#reference.domain)
    - [4.4.1. Objects with Behavior](#objects-with-behavior)
    - [4.4.2. Selective Tool Exposure](#selective-tool-exposure)
    - [4.4.3. Use of Domain Objects in Actions](#use-of-domain-objects-in-actions)
    - [4.4.4. Domain Understanding is Critical](#domain-understanding-is-critical)
    - [4.4.5. Benefits](#benefits)
  + [4.5. Configuration](#reference.configuration)
    - [4.5.1. Enabling Embabel](#enabling-embabel)
    - [4.5.2. Configuration Properties](#configuration-properties)
  + [4.6. Annotation model](#reference.annotations)
    - [4.6.1. The `@Agent` annotation](#the-agent-annotation)
    - [4.6.2. The `@EmbabelComponent` annotation](#the-embabelcomponent-annotation)
    - [4.6.3. The `@Action` annotation](#the-action-annotation)
    - [4.6.4. The `@Condition` annotation](#the-condition-annotation)
    - [4.6.5. Parameters](#parameters)
    - [4.6.6. Binding by name](#binding-by-name)
    - [4.6.7. Reactive triggers with `trigger`](#reference.annotations_trigger)
    - [4.6.8. Handling of return types](#handling-of-return-types)
    - [4.6.9. Action method implementation](#action-method-implementation)
    - [4.6.10. The `@AchievesGoal` annotation](#the-achievesgoal-annotation)
    - [4.6.11. The `@SecureAgentTool` annotation](#reference.annotations_secure_agent_tool)
    - [4.6.12. Implementing the `StuckHandler` interface](#implementing-the-stuckhandler-interface)
    - [4.6.13. Advanced Usage: Nested processes](#advanced-usage-nested-processes)
    - [4.6.14. Running Subagents with `RunSubagent`](#running-subagents-with-runsubagent)
    - [4.6.15. Action Exception Handling](#action-exception-handling)
  + [4.7. DSL](#reference.dsl)
    - [4.7.1. Standard Workflows](#standard-workflows)
    - [4.7.2. Registering `Agent` beans](#registering-agent-beans)
  + [4.8. Core Types](#reference.types)
    - [4.8.1. LlmOptions](#llmoptions)
    - [4.8.2. PromptRunner](#promptrunner)
    - [4.8.3. AgentImage](#agentimage)
  + [4.9. Tools](#reference.tools)
    - [4.9.1. In Process Tools: Implementing Tool Instances](#in-process-tools-implementing-tool-instances)
    - [4.9.2. Receiving Out-of-Band Context in Tools](#reference.tools__tool-call-context)
    - [4.9.3. Tool Groups](#reference.tools__tool-groups)
    - [4.9.4. Framework-Agnostic Tool Interface](#reference.tools__framework-agnostic)
    - [4.9.5. Tool Decoration: Extending Tool Behavior](#reference.tools__tool-decoration)
    - [4.9.6. Subagent: Agent Handoffs as Tools](#subagent-tool)
    - [4.9.7. Agentic Tools](#reference.tools__agentic-tools)
    - [4.9.8. Progressive Tools](#reference.tools__progressive)
    - [4.9.9. Process Introspection Tools](#reference.tools__process-introspection)
    - [4.9.10. Process Communication Tools](#reference.tools__process-communication)
    - [4.9.11. Just-in-Time Tool Group Initialization](#reference.tools__tool-groups-lazy-init)
    - [4.9.12. McpToolFactory: MCP Tool Integration](#reference.tools__mcp-tool-factory)
  + [4.10. Structured Prompt Elements](#reference.prompt-contributors)
    - [4.10.1. The `PromptContributor` Interface and `LlmReference` Subinterface](#the-promptcontributor-interface-and-llmreference-subinterface)
    - [4.10.2. Built-in Convenience Classes](#built-in-convenience-classes)
    - [4.10.3. Custom PromptContributor Implementations](#custom-promptcontributor-implementations)
    - [4.10.4. Examples from embabel-agent-examples](#examples-from-embabel-agent-examples)
    - [4.10.5. Best Practices](#best-practices)
  + [4.11. Templates](#templates)
    - [4.11.1. Custom Template Renderer](#custom-template-renderer)
  + [4.12. RAG (Retrieval-Augmented Generation)](#reference.rag)
    - [4.12.1. Agentic RAG Architecture](#agentic-rag-architecture)
    - [4.12.2. Facade Pattern for Safe Tool Exposure](#facade-pattern-for-safe-tool-exposure)
    - [4.12.3. Getting Started](#getting-started)
    - [4.12.4. Our Model](#our-model)
    - [4.12.5. SearchOperations](#searchoperations)
    - [4.12.6. ToolishRag](#toolishrag)
    - [4.12.7. Ingestion](#ingestion)
    - [4.12.8. Supported Stores](#supported-stores)
    - [4.12.9. Implementing Your Own RAG Store](#implementing-your-own-rag-store)
    - [4.12.10. Complete Example](#complete-example-2)
  + [4.13. Building Chatbots](#reference.chatbots)
    - [4.13.1. Core Concepts](#core-concepts)
    - [4.13.2. Key Interfaces](#key-interfaces)
    - [4.13.3. Asset Tracking](#asset-tracking)
    - [4.13.4. Building a Chatbot](#building-a-chatbot)
    - [4.13.5. Conversation Storage](#conversation-storage)
    - [4.13.6. How Message Triggering Works](#how-message-triggering-works)
    - [4.13.7. Dynamic Cost Methods](#dynamic-cost-methods)
    - [4.13.8. Prompt Templates](#prompt-templates)
    - [4.13.9. Advanced: State Management with @State](#advanced-state-management-with-state)
    - [4.13.10. Complete Example](#complete-example-3)
  + [4.14. The AgentProcess](#reference.agent-process)
  + [4.15. Execution Modes](#reference.agent-process__execution-modes)
    - [4.15.1. SimpleAgentProcess (Default)](#reference.agent-process__simple)
    - [4.15.2. ConcurrentAgentProcess](#reference.agent-process__concurrent)
  + [4.16. ProcessOptions](#processoptions)
  + [4.17. The AgentPlatform](#reference.agent-platform)
  + [4.18. Invoking Embabel Agents](#reference.invoking)
    - [4.18.1. Creating an AgentProcess Programmatically](#creating-an-agentprocess-programmatically)
    - [4.18.2. Using AgentInvocation](#using-agentinvocation)
    - [4.18.3. Dynamic Agent and Goal Selection with Autonomy](#reference.invoking__autonomy)
  + [4.19. Using States](#reference.states)
    - [4.19.1. How States Work with GOAP](#how-states-work-with-goap)
    - [4.19.2. When to Use States](#when-to-use-states)
    - [4.19.3. Staying in the Current State](#staying-in-the-current-state)
    - [4.19.4. Looping States](#looping-states-2)
    - [4.19.5. The @State Annotation](#the-state-annotation)
    - [4.19.6. Parent State Interface Pattern](#parent-state-interface-pattern)
    - [4.19.7. Example: WriteAndReviewAgent](#example-writeandreviewagent-2)
    - [4.19.8. Execution Flow](#execution-flow)
    - [4.19.9. Human-in-the-Loop with WaitFor](#human-in-the-loop-with-waitfor)
    - [4.19.10. Passing Data Through States](#passing-data-through-states)
    - [4.19.11. State Class Requirements](#state-class-requirements)
    - [4.19.12. Key Points](#key-points)
  + [4.20. Choosing a Planner](#reference.planners)
    - [4.20.1. Utility AI](#reference.planners__utility)
    - [4.20.2. Hybrid](#reference.planners__hybrid)
    - [4.20.3. Supervisor](#reference.planners__supervisor)
  + [4.21. API vs SPI](#reference.api-spi)
  + [4.22. Embabel and Spring](#reference.spring)
  + [4.23. Working with LLMs](#reference.llms)
    - [4.23.1. Choosing an LLM](#choosing-an-llm)
    - [4.23.2. Tuning for Smaller and Local Models](#reference.llms.smaller-models)
    - [4.23.3. Advanced: Custom LLM Integration](#reference.llms.custom-integration)
    - [4.23.4. Advanced: Custom Embedding Service](#advanced-custom-embedding-service)
    - [4.23.5. Advanced Caching with Anthropic](#reference.llms.anthropic-caching)
    - [4.23.6. Advanced Feature: Native Structured Output](#reference.llms.native-structured-output)
  + [4.24. AWS Bedrock Integration](#reference.bedrock)
    - [4.24.1. Add the Dependency](#add-the-dependency)
    - [4.24.2. AWS Configuration](#aws-configuration)
    - [4.24.3. Available Models](#available-models)
    - [4.24.4. Configuration](#configuration-2)
    - [4.24.5. Adding New Models](#adding-new-models)
    - [4.24.6. See Also](#see-also)
  + [4.25. MiniMax Integration](#reference.minimax)
    - [4.25.1. Add the Dependency](#add-the-dependency-2)
    - [4.25.2. API Key Configuration](#api-key-configuration)
    - [4.25.3. Available Models](#available-models-2)
    - [4.25.4. Using MiniMax Models](#using-minimax-models)
    - [4.25.5. Temperature Clamping](#temperature-clamping)
    - [4.25.6. Configuration Reference](#configuration-reference)
    - [4.25.7. See Also](#see-also-2)
  + [4.26. Working with Streams](#reference.streaming)
    - [4.26.1. Concepts](#concepts)
    - [4.26.2. Example - Simple Thinking and Object Streaming with Callbacks](#example-simple-thinking-and-object-streaming-with-callbacks)
    - [4.26.3. Example - Simple Raw Text Streaming with Callbacks](#example-simple-raw-text-streaming-with-callbacks)
  + [4.27. Working with LLM Reasoning / Thinking](#reference.thinking)
    - [4.27.1. Motivation](#motivation-3)
    - [4.27.2. Concepts](#concepts-2)
    - [4.27.3. Example: Handling Objects and Thinking Blocks](#example-handling-objects-and-thinking-blocks)
    - [4.27.4. Example: Handling Failures Gracefully](#example-handling-failures-gracefully)
    - [4.27.5. Provider Notes](#provider-notes)
  + [4.28. Working with Callbacks (Interceptors)](#reference.interceptors)
    - [4.28.1. Tool Loop Callbacks](#tool-loop-callbacks)
    - [4.28.2. Tool Call Interceptors](#tool-call-interceptors)
  + [4.29. Tracking LLM Cost and Usage](#reference.cost-tracking)
    - [4.29.1. The events](#the-events)
    - [4.29.2. Subscribing to cost events](#subscribing-to-cost-events)
    - [4.29.3. Blocking spending: the Budget Guardrail pattern](#blocking-spending-the-budget-guardrail-pattern)
  + [4.30. Working with Guardrails](#reference.guardrails)
    - [4.30.1. Motivation](#motivation-4)
    - [4.30.2. Concepts](#concepts-3)
    - [4.30.3. Customizing Message Combining](#customizing-message-combining)
    - [4.30.4. Example: Blocking LLM Execution with CRITICAL Validation Errors](#example-blocking-llm-execution-with-critical-validation-errors)
    - [4.30.5. Example: Using Guardrails for Response Analysis](#example-using-guardrails-for-response-analysis)
    - [4.30.6. Global Guardrails Configuration](#global-guardrails-configuration)
    - [4.30.7. Relationship with Other Validation Mechanisms](#relationship-with-other-validation-mechanisms)
  + [4.31. Agent and Action Termination](#reference.termination)
    - [4.31.1. Choosing Between Signal and Exception](#choosing-between-signal-and-exception)
    - [4.31.2. Agent Termination](#agent-termination)
    - [4.31.3. Action Termination](#action-termination)
    - [4.31.4. Catching Both Exception Types](#catching-both-exception-types)
    - [4.31.5. Summary](#summary)
  + [4.32. Customizing Embabel](#reference.customizing)
    - [4.32.1. Adding LLMs](#adding-llms)
    - [4.32.2. Adding embedding models](#adding-embedding-models)
    - [4.32.3. Bring Your Own Key (BYOK)](#reference.customizing.byok)
    - [4.32.4. Configuration via `application.properties` or `application.yml`](#configuration-via-application-properties-or-application-yml)
    - [4.32.5. Customizing logging](#customizing-logging)
  + [4.33. Integrations](#reference.integrations)
    - [4.33.1. Model Context Protocol (MCP)](#reference.integrations__mcp)
    - [4.33.2. A2A](#reference.integrations__a2a)
    - [4.33.3. Observability](#reference.integrations__observability)
  + [4.34. Developer Tooling](#reference.tooling)
  + [4.35. IntelliJ IDEA Plugin](#reference.tooling_intellij)
    - [4.35.1. What It Does](#reference.tooling_intellij__what)
    - [4.35.2. Installation](#reference.tooling_intellij__install)
    - [4.35.3. Compatibility](#reference.tooling_intellij__compatibility)
    - [4.35.4. Source & Contributing](#reference.tooling_intellij__source)
  + [4.36. Agent Skills](#reference.agent_skills)
    - [4.36.1. What are Agent Skills?](#what-are-agent-skills)
    - [4.36.2. Using Skills with PromptRunner](#using-skills-with-promptrunner)
    - [4.36.3. Loading Skills from GitHub](#loading-skills-from-github)
    - [4.36.4. Loading Skills from Local Directories](#loading-skills-from-local-directories)
    - [4.36.5. Skill Directory Structure](#skill-directory-structure)
    - [4.36.6. Skill Activation](#skill-activation)
    - [4.36.7. Combining Skills with Other References](#combining-skills-with-other-references)
    - [4.36.8. Validation](#validation)
    - [4.36.9. Current Limitations](#current-limitations)
  + [4.37. Testing](#reference.testing)
    - [4.37.1. Unit Testing](#unit-testing)
    - [4.37.2. Integration Testing](#integration-testing)
  + [4.38. Embabel Architecture](#reference.architecture)
  + [4.39. Troubleshooting](#reference.troubleshooting)
    - [4.39.1. Common Problems and Solutions](#common-problems-and-solutions)
    - [4.39.2. Debugging Strategies](#debugging-strategies)
    - [4.39.3. Getting Help](#getting-help)
  + [4.40. Migrating from other frameworks](#reference.migrating)
    - [4.40.1. Migrating from CrewAI](#migrating-from-crewai)
    - [4.40.2. Migrating from Pydantic AI](#migrating-from-pydantic-ai)
    - [4.40.3. Migrating from LangGraph](#migrating-from-langgraph)
    - [4.40.4. Migrating from Google ADK](#migrating-from-google-adk)
  + [4.41. API Evolution](#reference.api-evolution)
* [5. Asynchronous Mode and Java 25](#reference.asynch-mode)
  + [5.1. Java 25 Implications](#java-25-implications)
    - [5.1.1. Why Embabel is Safe](#why-embabel-is-safe)
    - [5.1.2. Workarounds (if needed)](#workarounds-if-needed)
* [6. Design Considerations](#agent-design)
  + [6.1. Domain objects](#domain-objects)
  + [6.2. Tool Call Choice](#tool-call-choice)
  + [6.3. Mixing LLMs](#mixing-llms)
* [7. Contributing](#contributing)
* [8. Resources](#resources)
  + [8.1. Rod Johnson’s Blog Posts](#rod-johnsons-blog-posts)
  + [8.2. Examples and Tutorials](#examples-and-tutorials)
    - [8.2.1. Embabel Agent Examples Repository](#embabel-agent-examples-repository)
    - [8.2.2. Java Agent Template](#java-agent-template)
    - [8.2.3. Kotlin Agent Template](#kotlin-agent-template)
  + [8.3. Sophisticated Example: Tripper Travel Planner](#sophisticated-example-tripper-travel-planner)
    - [8.3.1. Tripper - AI-Powered Travel Planning Agent](#tripper-ai-powered-travel-planning-agent)
  + [8.4. Goal-Oriented Action Planning (GOAP)](#goal-oriented-action-planning-goap)
    - [8.4.1. Small Language Model Agents - NVIDIA Research](#small-language-model-agents-nvidia-research)
    - [8.4.2. OODA Loop - Wikipedia](#ooda-loop-wikipedia)
  + [8.5. Domain-Driven Design](#domain-driven-design)
    - [8.5.1. Domain-Driven Design: Tackling Complexity in the Heart of Software](#domain-driven-design-tackling-complexity-in-the-heart-of-software)
    - [8.5.2. DDD and Contextual Validation](#ddd-and-contextual-validation)
* [9. APPENDIX](#appendix)
* [10. Planning Module](#appendix__astar-goap-planner)
  + [10.1. Abstract](#abstract)
  + [10.2. A\* GOAP Planner Algorithm Overview](#a-goap-planner-algorithm-overview)
    - [10.2.1. Core Algorithm Components](#core-algorithm-components)
    - [10.2.2. A\* Search Algorithm](#a-search-algorithm)
    - [10.2.3. Process Flow](#process-flow)
    - [10.2.4. Forward and Backward Planning Optimization](#forward-and-backward-planning-optimization)
    - [10.2.5. Pruning Planning Systems](#pruning-planning-systems)
    - [10.2.6. Complete Planning Process](#complete-planning-process)
  + [10.3. Agent Pruning Process](#agent-pruning-process)
    - [10.3.1. Progress Determination Logic in A\* GOAP Planning](#progress-determination-logic-in-a-goap-planning)

![315px Meister der Weltenchronik 001](images/common/315px-Meister_der_Weltenchronik_001.png)

Embabel Agent Release: 0.5.0-SNAPSHOT

© 2024-2026 Embabel Pty, Ltd

Rod Johnson, Alex Hein-Heifetz, Dr. Igor Dayen, Arjen Poutsma, Jasper Blues

## 1. Overview

Agentic AI is the use of large language (and other multi-modal) models not just to generate text, but to act as
reasoning, goal-driven agents that can plan, call tools, and adapt their actions to deliver outcomes.

The JVM is a compelling platform for this because its strong type safety provides guardrails for integrating LLM-driven
behaviors with real systems. Because so many production applications already run on the JVM it is the natural place to
embed AI.

While Agentic AI has been hyped, much of it has lived in academic demos with little practical value; by integrating
directly into legacy and enterprise JVM applications, we can unlock AI capabilities without rewriting core systems or
tearing down a factory to install new machinery.

### 1.1. Glossary

Before we begin, in this glossary we’ll explain some terms that may be new if you’re taking your first steps as
an applied AI software developer. It is assumed that you already know what a large language model (LLM) is from an
end-user’s point of view.

|  |  |
| --- | --- |
|  | You may skim or skip this section if you’re already a seasoned agentic AI engineer. |

Agent
:   An Agent in the Embabel framework is a self-contained component that bundles together domain logic, AI capabilities,
    and tool usage to achieve a specific goal on behalf of the user.

    Inside, it exposes multiple `@Action` methods, each representing discrete steps the agent can take. Actions depend on
    typically structured (sometimes natural language) input. The input is used to perform tasks on behalf of the user -
    executing domain code, calling AI models or even calling other agents as a sub-process.

    When an AI model is called it may be given access to tools that expand its capabilities in order to achieve a goal.
    The output is a new type, representing a transformation of the input, however during execution one or more side-effects
    can occur. An example of side effects might be new records stored in a database, orders placed on an e-commerce site
    and so on.

Tools
:   Tools extend the raw capabilities of an LLM by letting it interact with the outside world.
    On its own, a language model can only generate responses from its training data and context window, which risks
    producing inaccurate or âhallucinatedâ answers.

    While tool usage is inspired by an technique known as **ReAct** (Reason + Act), which itself builds on **Chain of Thought**
    reasoning, most recent LLMs allow specifying tools specifically instead of relying on prompt engineering techniques.

    When tools are present, the LLM interprets the user request, plans steps, and then delegates certain tasks to tools in a loop. This
    lets the model alternate between reasoning (âwhat needs to be done?â) and acting (âwhich tool can do it?â).

    **Benefits of tools include:**

    * The ability to answer questions or perform tasks beyond what the LLM was trained on, by delegating to domain-specific
      or external systems.
    * Producing useful **side effects**, such as creating database records, generating visualizations, booking flights, or
      invoking any process the system designer provides.

      In short, tools are one way to bridge the gap between **text prediction** and **real-world action**, turning an LLM into a
      practical agent capable of both reasoning and execution. In Embabel many tools are bound domain objects.

MCP
:   Model Context Protocol [(MCP)](#reference.integrations__mcp) is a standardized way of hosting and sharing tools.
    Unlike plain tools, which are usually wired directly into one agent or app, an MCP Server makes tools discoverable and
    reusable across models and runtimes they can be registered system-wide or at runtime, and invoked through a common
    protocol. Embabel can both consume and publish such tools for systems integration.

Domain Integrated Context Engineering (DICE)
:   Enhances context engineering by grounding both LLM inputs and outputs in typed domain objects.
    Instead of untyped prompts, context is structured with business-aware models that provide precision, testability,
    and seamless integration with existing systems. DICE transforms context into a re-usable, inspectable, and reliably
    manipulable artifact.

### 1.2. Why do we need an Agent Framework?

Arenât LLMs smart enough to solve our problems directly?
Arenât MCP tools all we need to allow them to solve complex problems?
LLMs seem to get more capable by the day and MCPs can
give LLMs access to a lot of empowering tools, making them even more capable.

But there are still many reasons that a higher level orchestration technology is needed, especially for business applications.
Here are some of the most important:

* **Explainability**: Why were choices made in solving a problem?
* **Discoverability**: How do we find the right tools at each point, and ensure that models arenât confused in choosing between them?
* **Ability to mix models**, so that we are not reliant only on the largest models but can use local, cheaper, private models for many tasks
* **Ability to inject guardrails** at any point in a flow
* **Ability to manage flow execution** and introduce greater resilience
* **Composability of flows at scale**.
  Weâll soon be seeing not just agents running on one system, but federations of agents.
* **Safer integration with sensitive existing systems** such as databases, where it is dangerous to allow even the best LLM write access.

Agent frameworks break complex tasks into smaller, manageable components, offering greater control and predictability.

Agent frameworks offer "code agency" as well as "LLM agency." This division is well described in this
[paper from NVIDIA Research](https://research.nvidia.com/labs/lpr/slm-agents/).

Further reading:

* [Embabel: A new Agent Platform For the JVM](https://medium.com/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014)
* [The Embabel Vision](https://medium.com/@springrod/the-embabel-vision-967654f13793)

### 1.3. Embabel Differentiators

So how does Embabel differ from other agent frameworks? We like to believe the Embabel agent framework is to be the best fit for developing agentic AI in the enterprise.

#### 1.3.1. Sophisticated Planning

Goes beyond a finite state machine or sequential execution with nesting by introducing a true planning step, using a non-LLM AI algorithm.
This enables the system to perform tasks it wasn’t programmed to do by combining known steps in a novel order, as well as make decisions about parallelization and other runtime behavior.

#### 1.3.2. Superior Extensibility and Reuse

Because of dynamic planning, adding more domain objects, actions, goals and conditions can extend the capability of the system, *without editing FSM definitions* or existing code.

#### 1.3.3. Strong Typing and Object Orientation

Actions, goals and conditions are informed by a domain model, which can include behavior.
Everything is strongly typed and prompts and manually authored code interact cleanly.
No more magic maps.
Enjoy full refactoring support.

#### 1.3.4. Platform Abstraction

Clean separation between programming model and platform internals allows running locally while potentially offering higher QoS in production without changing application code.

#### 1.3.5. LLM Mixing

It is easy to build applications that mix LLMs, ensuring the most cost-effective yet capable solution.
This enables the system to leverage the strengths of different models for different tasks.
In particular, it facilitates the use of local models for point tasks.
This can be important for cost and privacy.

#### 1.3.6. Spring and JVM Integration

Built on Spring and the JVM, making it easy to access existing enterprise functionality and capabilities.
For example:

* Spring can inject and manage agents, including using Spring AOP to decorate functions.
* Robust persistence and transaction management solutions are available.

#### 1.3.7. Designed for Testability

Both unit testing and agent end-to-end testing are easy from the ground up.

### 1.4. Core Concepts

Agent frameworks break up tasks into separate smaller interactions, making LLM use more predictable and focused.

Embabel models agentic flows in terms of:

* **Actions**: Steps an agent takes.
  These are the building blocks of agent behavior.
* **Goals**: What an agent is trying to achieve.
* **Conditions**: Conditions to do evaluations while planning.
  Conditions are reassessed after each action is executed.
* **Domain Model**: Objects underpinning the flow and informing Actions, Goals and Conditions.

This enables Embabel to create a **plan**: A sequence of actions to achieve a goal.
Plans are dynamically formulated by the system, not the programmer.
The system replans after the completion of each action, allowing it to adapt to new information as well as observe the effects of the previous action.
This is effectively an [OODA loop](https://en.wikipedia.org/wiki/OODA_loop).

|  |  |
| --- | --- |
|  | Application developers don’t usually have to deal with conditions and planning directly, as most conditions result from data flow defined in code, allowing the system to infer pre and post conditions to (re-)evaluate the plan. |

#### 1.4.1. Complete Example

Let’s look at a complete example that demonstrates how Embabel infers conditions from input/output types and manages data flow between actions.
This example comes from the [Embabel Agent Examples](https://github.com/embabel/embabel-agent-examples) repository:

Java
:   ```
    @Agent(description = "Find news based on a person's star sign")  (1)
    public class StarNewsFinder {

        private final HoroscopeService horoscopeService;  (2)
        private final int storyCount;

        public StarNewsFinder(
                HoroscopeService horoscopeService,  (3)
                @Value("${star-news-finder.story.count:5}") int storyCount) {
            this.horoscopeService = horoscopeService;
            this.storyCount = storyCount;
        }

        @Action  (4)
        public StarPerson extractStarPerson(UserInput userInput, OperationContext context) {  (5)
            return context.ai()
                .withLlm(OpenAiModels.GPT_41)
                .createObject("""
                    Create a person from this user input, extracting their name and star sign:
                    %s""".formatted(userInput.getContent()), StarPerson.class);  (6)
        }

        @Action  (7)
        public Horoscope retrieveHoroscope(StarPerson starPerson) {  (8)
            // Uses regular injected Spring service - not LLM
            return new Horoscope(horoscopeService.dailyHoroscope(starPerson.sign()));  (9)
        }

        @Action  (10)
        public RelevantNewsStories findNewsStories(
                StarPerson person, Horoscope horoscope, OperationContext context) {  (11)
            var prompt = """
                %s is an astrology believer with the sign %s.
                Their horoscope for today is: %s
                Given this, use web tools to find %d relevant news stories.
                """.formatted(person.name(), person.sign(), horoscope.summary(), storyCount);

            return context.ai().withDefaultLlm()
                .withToolGroup(CoreToolGroups.WEB)  (12)
                .createObject(prompt, RelevantNewsStories.class);
        }

        @AchievesGoal(description = "Write an amusing writeup based on horoscope and news")  (13)
        @Action
        public Writeup writeup(
                StarPerson person, RelevantNewsStories stories, Horoscope horoscope,
                OperationContext context) {  (14)
            var llm = LlmOptions.fromCriteria(ModelSelectionCriteria.getAuto())
                .withTemperature(0.9);  (15)

            var storiesFormatted = stories.items().stream()
                .map(s -> "- " + s.url() + ": " + s.summary())
                .collect(Collectors.joining("\n"));

            var prompt = """
                Write something amusing for %s based on their horoscope and news stories.
                Format as Markdown with links.
                <horoscope>%s</horoscope>
                <news_stories>
                %s
                </news_stories>
                """.formatted(person.name(), horoscope.summary(), storiesFormatted);  (16)

            return context.ai().withLlm(llm).createObject(prompt, Writeup.class);  (17)
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Find news based on a person's star sign")  (1)
    class StarNewsFinder(
        private val horoscopeService: HoroscopeService,   (2) (3)
        @Value("\${star-news-finder.story.count:5}") private val storyCount: Int
    ) {

        @Action  (4)
        fun extractStarPerson(userInput: UserInput, context: OperationContext): StarPerson {  (5)
            return context.ai()
                .withLlm(OpenAiModels.GPT_41)
                .createObject("""
                    Create a person from this user input, extracting their name and star sign:
                    ${userInput.content}""", StarPerson::class)  (6)
        }

        @Action  (7)
        fun retrieveHoroscope(starPerson: StarPerson): Horoscope {  (8)
            // Uses regular injected Spring service - not LLM
            return Horoscope(horoscopeService.dailyHoroscope(starPerson.sign))  (9)
        }

        @Action  (10)
        fun findNewsStories(
            person: StarPerson, horoscope: Horoscope, context: OperationContext
        ): RelevantNewsStories {  (11)
            val prompt = """
                ${person.name} is an astrology believer with the sign ${person.sign}.
                Their horoscope for today is: ${horoscope.summary}
                Given this, use web tools to find $storyCount relevant news stories.
                """

            return context.ai().withDefaultLlm()
                .withToolGroup(CoreToolGroups.WEB)  (12)
                .createObject(prompt, RelevantNewsStories::class)
        }

        @AchievesGoal(description = "Write an amusing writeup based on horoscope and news")  (13)
        @Action
        fun writeup(
            person: StarPerson, stories: RelevantNewsStories, horoscope: Horoscope,
            context: OperationContext
        ): Writeup {  (14)
            val llm = LlmOptions.fromCriteria(ModelSelectionCriteria.auto)
                .withTemperature(0.9)  (15)

            val storiesFormatted = stories.items
                .joinToString("\n") { "- ${it.url}: ${it.summary}" }

            val prompt = """
                Write something amusing for ${person.name} based on their horoscope and news stories.
                Format as Markdown with links.
                <horoscope>${horoscope.summary}</horoscope>
                <news_stories>
                $storiesFormatted
                </news_stories>
                """  (16)

            return context.ai().withLlm(llm).createObject(prompt, Writeup::class)  (17)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | **Agent Declaration**: The `@Agent` annotation defines this as an agent capable of a multi-step flow. |
| **2** | **Spring Integration**: Regular Spring dependency injection - the agent uses both LLM services and traditional business services. |
| **3** | **Service Injection**: `HoroscopeService` is injected like any Spring bean - agents can mix AI and non-AI operations seamlessly. |
| **4** | **Action Definition**: `@Action` marks methods as steps the agent can take. Each action represents a capability. |
| **5** | **Input Condition Inference**: The method signature `extractStarPerson(UserInput userInput, …​)` tells Embabel: * **Precondition**: "A UserInput object must be available" * **Required Data**: The agent needs user input to proceed * **Capability**: This action can extract structured data from unstructured input |
| **6** | **Output Condition Creation**: Returning `StarPerson` creates: * **Postcondition**: "A StarPerson object is now available in the world state" * **Data Availability**: This output becomes input for subsequent actions * **Type Safety**: The domain model enforces structure |
| **7** | **Non-LLM Action**: Not all actions use LLMs - this demonstrates hybrid AI/traditional programming. |
| **8** | **Data Flow Chain**: The method signature `retrieveHoroscope(StarPerson starPerson)` creates: * **Precondition**: "A StarPerson object must exist" (from previous action) * **Dependency**: This action can only execute after `extractStarPerson` completes * **Service Integration**: Uses the injected `horoscopeService` rather than an LLM |
| **9** | **Regular Service Call**: This action calls a traditional Spring service - demonstrating how agents blend AI and conventional operations. |
| **10** | **Another Action**: This action uses tools specified at the `PromptRunner` level. |
| **11** | **Multi-Input Dependencies**: This method requires both `StarPerson` and `Horoscope` - showing complex data flow orchestration. |
| **12** | **Tool-Enabled LLM**: `withToolGroup(CoreToolGroups.WEB)` adds web search tools to this LLM call, allowing it to search for current news stories. |
| **13** | **Goal Achievement**: `@AchievesGoal` marks this as a terminal action that completes the agent’s objective. |
| **14** | **Complex Input Requirements**: The final action requires three different data types, showing sophisticated orchestration. |
| **15** | **Creative Configuration**: High temperature (0.9) optimizes for creative, entertaining output - appropriate for amusing writeups. |
| **16** | **Structured Prompt with Data**: The prompt includes both the horoscope summary and formatted news stories using XML-style tags. This ensures the LLM has all the context it needs from earlier actions. |
| **17** | **Final Output**: Returns `Writeup`, completing the agent’s goal with personalized content. |

State is managed by the framework, through the process blackboard.

#### 1.4.2. The Inferred Execution Plan for the Example

Based on the type signatures alone, Embabel automatically infers this execution plan for the example agent above:

**Goal**: Produce a `Writeup` (final return type of `@AchievesGoal` action)

The initial plan:

* To emit `Writeup` â need `writeup()` action
* `writeup()` requires `StarPerson`, `RelevantNewsStories`, and `Horoscope`
* To get `StarPerson` â need `extractStarPerson()` action
* To get `Horoscope` â need `retrieveHoroscope()` action (requires `StarPerson`)
* To get `RelevantNewsStories` â need `findNewsStories()` action (requires `StarPerson` and `Horoscope`)
* `extractStarPerson()` requires `UserInput` â must be provided by user

Execution sequence:

`UserInput` â `extractStarPerson()` â `StarPerson` â `retrieveHoroscope()` â `Horoscope` â `findNewsStories()` â `RelevantNewsStories` â `writeup()` â `Writeup` and achieves goal.

#### 1.4.3. Key Benefits of Type-Driven Flow

**Automatic Orchestration**: No manual workflow definition needed - the agent figures out the sequence from type dependencies.
This is particularly beneficial if things go wrong, as the planner can re-evaluate the situation and may be able to find an alternative path to the goal.

**Dynamic Replanning**: After each action, the agent reassesses what’s possible based on available data objects.

**Type Safety**: Compile-time guarantees that data flows correctly between actions.
No magic string keys.

**Flexible Execution**: If multiple actions could produce the required input type, the agent chooses based on context and efficiency.
(Actions can have cost and value.)

This demonstrates how Embabel transforms simple method signatures into sophisticated multi-step agent behavior, with the complex orchestration handled automatically by the framework.

## 2. Getting Started

### 2.1. Quickstart

There are two GitHub template repos you can use to create your own project:

* Java template - [github.com/embabel/java-agent-template](https://github.com/embabel/java-agent-template)
* Kotlin template - [github.com/embabel/kotlin-agent-template](https://github.com/embabel/kotlin-agent-template)

Or you can use our [project creator](https://github.com/embabel/project-creator) to create a custom project:

```
uvx --from git+https://github.com/embabel/project-creator.git project-creator
```

|  |  |
| --- | --- |
|  | The `uvx` command can be installed from the [astral-uv](https://docs.astral.sh/uv/) package. It is a Python package and project manager used to run the Embabel [project creator](https://github.com/embabel/project-creator) scripts. |

Now you have the code you need to run Embabel with LLMs from Open AI or Anthropic by using the included Maven profiles. Skip ahead to [Environment Setup](#reference.environment_setup) for API-key configuration, or detailed instructions on how to use other LLM providers.

### 2.2. Getting the Binaries

The easiest way to get started with Embabel Agent is to add the Spring Boot starter dependency to your project.
Embabel release binaries are published to Maven Central.

#### 2.2.1. Build Configuration

Add the appropriate Embabel Agent Spring Boot starter to your build file depending on your choice of application type:

##### Shell Starter

Starts the application in console mode with an interactive shell powered by Embabel.

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-shell</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-shell:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-shell:${embabel-agent.version}'
    }
    ```

**Features:**

* â Interactive command-line interface
* â Agent discovery and registration
* â Human-in-the-loop capabilities
* â Progress tracking and logging
* â Development-friendly error handling

##### MCP Server Starter

Starts the application with HTTP listener where agents are autodiscovered and registered as MCP servers, available for integration via SSE, Streamable-HTTP or Stateless Streamable-HTTP protocols.

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-mcpserver</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-mcpserver:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-mcpserver:${embabel-agent.version}'
    }
    ```

**Features:**

* âï¸ MCP protocol server implementation
* âï¸ Tool registration and discovery
* âï¸ JSON-RPC communication via SSE (Server-Sent Events), Streamable-HTTP or Stateless Streamable-HTTP
* âï¸ Integration with MCP-compatible clients
* âï¸ Security and sandboxing

##### Basic Agent Platform Starter

Initializes Embabel Agent Platform in the Spring Container.
Platform beans are available via Spring Dependency Injection mechanism.
Application startup mode (web, console, microservice, etc.) is determined by the Application Designer.

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter:${embabel-agent.version}'
    }
    ```

**Features:**

* âï¸ Application decides on startup mode (console, web application, etc)
* âï¸ Agent discovery and registration
* âï¸ Agent Platform beans available via Dependency Injection mechanism
* âï¸ Progress tracking and logging
* âï¸ Development-friendly error handling

##### Embabel Snapshots

If you want to use Embabel snapshots, you’ll need to add the Embabel repository to your build.

Maven (pom.xml)
:   ```
    <repositories>
        <repository>
            <id>embabel-releases</id>
            <url>https://repo.embabel.com/artifactory/libs-release</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
        <repository>
            <id>embabel-snapshots</id>
            <url>https://repo.embabel.com/artifactory/libs-snapshot</url>
            <releases>
                <enabled>false</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
        <repository>
            <id>spring-milestones</id>
            <url>https://repo.spring.io/milestone</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    repositories {
        mavenCentral()
        maven {
            name = "embabel-releases"
            url = uri("https://repo.embabel.com/artifactory/libs-release")
            mavenContent {
                releasesOnly()
            }
        }
        maven {
            name = "embabel-snapshots"
            url = uri("https://repo.embabel.com/artifactory/libs-snapshot")
            mavenContent {
                snapshotsOnly()
            }
        }
        maven {
            name = "Spring Milestones"
            url = uri("https://repo.spring.io/milestone")
        }
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    repositories {
        mavenCentral()
        maven {
            name = 'embabel-releases'
            url = 'https://repo.embabel.com/artifactory/libs-release'
            mavenContent {
                releasesOnly()
            }
        }
        maven {
            name = 'embabel-snapshots'
            url = 'https://repo.embabel.com/artifactory/libs-snapshot'
            mavenContent {
                snapshotsOnly()
            }
        }
        maven {
            name = 'Spring Milestones'
            url = 'https://repo.spring.io/milestone'
        }
    }

    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-shell:${embabel-agent.version}'
    }
    ```

#### 2.2.2. Environment Setup

Before running your application, you’ll need to set up your environment with API keys for the LLM providers you plan to use.

Example `.env` file:

```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
```

If you added the binaries directly to your projecdt or want to use other LLM providers than Open AI and Anthropic you will also need to add some dependencies specific to those vendors. Just follow the instructions below for your vendor(s) of choice.

##### OpenAI Compatible (GPT-4, GPT-5, etc.)

* Required:

  + `OPENAI_API_KEY`: API key for OpenAI or compatible services (e.g., Azure OpenAI, etc.)
* Optional:

  + `OPENAI_BASE_URL`: base URL of the OpenAI deployment (for Azure AI use `{resource-name}.openai.azure.com/openai`)
  + `OPENAI_COMPLETIONS_PATH`: custom path for completions endpoint (default: `/v1/completions`)
  + `OPENAI_EMBEDDINGS_PATH`: custom path for embeddings endpoint (default: `/v1/embeddings`)

Alternatively, configure via `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        openai:
          api-key: ${OPENAI_API_KEY:sk-dev-key}  (1)
          base-url: ${OPENAI_BASE_URL:}  (2)
```

|  |  |
| --- | --- |
| **1** | API key with optional default for local development |
| **2** | Optional base URL override |

If you are not using the Embabel template projects you also need to add the `embabel-agent-starter-openai` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-openai</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-openai:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-openai:${embabel-agent.version}'
    }
    ```

##### OpenAi Custom

* Required:

  + `OPENAI_CUSTOM_API_KEY`: API key for the OpenAI-compatible service
* Optional:

  + `OPENAI_CUSTOM_BASE_URL`: base URL for the OpenAI-compatible API
  + `OPENAI_CUSTOM_MODELS`: comma-separated list of custom model names to register (useful for OpenAI-compatible providers like Groq, Together AI, etc.)
  + `OPENAI_CUSTOM_COMPLETIONS_PATH`: custom path for chat completions endpoint
  + `OPENAI_CUSTOM_EMBEDDINGS_PATH`: custom path for embeddings endpoint

When using `OPENAI_CUSTOM_MODELS`, set `EMBABEL_MODELS_DEFAULT_LLM` to specify which model to use as the default.

Example for using Groq:

```
export OPENAI_CUSTOM_BASE_URL="https://api.groq.com/openai"
export OPENAI_CUSTOM_API_KEY="your-groq-api-key"
export OPENAI_CUSTOM_MODELS="llama-3.3-70b-versatile,mixtral-8x7b-32768"
export EMBABEL_MODELS_DEFAULT_LLM="llama-3.3-70b-versatile"
```

Alternatively, configure via `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        openai:
          custom:
            api-key: ${OPENAI_CUSTOM_API_KEY:your-dev-key}
            base-url: https://api.groq.com/openai
            models: llama-3.3-70b-versatile,mixtral-8x7b-32768
```

For APIs with non-standard paths (e.g., Z.AI), use the completions path override:

```
export OPENAI_CUSTOM_BASE_URL="https://api.z.ai/api/coding/paas"
export OPENAI_CUSTOM_API_KEY="your-api-key"
export OPENAI_CUSTOM_COMPLETIONS_PATH="/v4/chat/completions"
export OPENAI_CUSTOM_MODELS="your-model-name"
```

You also need to add the `embabel-agent-starter-openai-custom` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-openai-custom</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-openai-custom:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-openai-custom:${embabel-agent.version}'
    }
    ```

##### Anthropic (Claude 3.x, etc.)

* Required:

  + `ANTHROPIC_API_KEY`: API key for Anthropic services
* Optional:

  + `ANTHROPIC_BASE_URL`: base URL for Anthropic API

Alternatively, configure via `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        anthropic:
          api-key: ${ANTHROPIC_API_KEY:sk-ant-dev-key}
          base-url: ${ANTHROPIC_BASE_URL:}
```

If you are not using the Embabel template projects you also need to add the `embabel-agent-starter-anthropic` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-anthropic</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-anthropic:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-anthropic:${embabel-agent.version}'
    }
    ```

##### DeepSeek

* Required:

  + `DEEPSEEK_API_KEY`: API key for DeepSeek services
* Optional:

  + `DEEPSEEK_BASE_URL`: base URL for DeepSeek API (default: `api.deepseek.com`)

Alternatively, configure via `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        deepseek:
          api-key: ${DEEPSEEK_API_KEY:sk-dev-key}
          base-url: ${DEEPSEEK_BASE_URL:}
```

You also need to add the `embabel-agent-starter-deepseek` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-deepseek</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-deepseek:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-deepseek:${embabel-agent.version}'
    }
    ```

##### Google Gemini (OpenAI Compatible)

Uses the OpenAI-compatible endpoint for Gemini models.

* Required:

  + `GEMINI_API_KEY`: API key for Google Gemini services
* Optional:

  + `GEMINI_BASE_URL`: base URL for Gemini API (default: `generativelanguage.googleapis.com/v1beta/openai`)

Alternatively, configure via `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        gemini:
          api-key: ${GEMINI_API_KEY:your-dev-key}
          base-url: ${GEMINI_BASE_URL:}
```

You also need to add the `embabel-agent-starter-gemini` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-gemini</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-gemini:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-gemini:${embabel-agent.version}'
    }
    ```

##### Google GenAI (Native)

Uses the native Google GenAI SDK for direct access to Gemini models with full feature support including thinking mode.

* Required (API Key authentication):

  + `GOOGLE_API_KEY`: API key for Google AI Studio
* Required (Vertex AI authentication - alternative to API key):

  + `GOOGLE_PROJECT_ID`: Google Cloud project ID
  + `GOOGLE_LOCATION`: Google Cloud region (e.g., `us-central1`)

|  |  |
| --- | --- |
|  | Use API key authentication for Google AI Studio, or Vertex AI authentication for Google Cloud deployments. Vertex AI authentication requires Application Default Credentials (ADC) to be configured. |

|  |  |
| --- | --- |
|  | Gemini 3 models are only available in the `global` location on Vertex AI. To use Gemini 3 with Vertex AI, you must set `GOOGLE_LOCATION=global`. |

To add Google GenAI support to your project add the `embabel-agent-starter-google-genai` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-google-genai</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-google-genai:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-google-genai:${embabel-agent.version}'
    }
    ```

Available LLM models include:

* `gemini-3.5-flash` - Frontier-level reasoning at Flash tier speed & cost
* `gemini-3.1-flash-lite` - Production lightweight and cost-effective model
* `gemini-3.1-pro-preview` - Latest Gemini 3.1 Pro preview with advanced reasoning
* `gemini-3.1-pro-preview-customtools` - Gemini 3.1 Pro optimized for custom tool usage
* `gemini-3.1-flash-lite-preview` - Lightweight and cost-effective latest generation model
* `gemini-2.5-pro` - High-performance model with thinking support
* `gemini-2.5-flash` - Best price-performance model
* `gemini-2.5-flash-lite` - Cost-effective high-throughput model
* `gemini-2.0-flash` - Fast and efficient
* `gemini-2.0-flash-lite` - Lightweight version

Available embedding models include:

* `gemini-embedding-001` - Recommended embedding model (3072 dimensions)

Example configuration in `application.yml`:

```
embabel:
  models:
    default-llm: gemini-2.5-flash  (1)
    default-embedding-model: gemini-embedding-001  (2)
    llms:
      fast: gemini-2.5-flash
      best: gemini-2.5-pro
      reasoning: gemini-3.1-pro-preview
    embedding-services:
      default: gemini-embedding-001

  agent:
    platform:
      models:
        googlegenai:  (3)
          api-key: ${GOOGLE_API_KEY}  (4)
          # Or use Vertex AI authentication:
          # project-id: ${GOOGLE_PROJECT_ID}
          # location: ${GOOGLE_LOCATION}
          max-attempts: 10
          backoff-millis: 5000
```

|  |  |
| --- | --- |
| **1** | Set a Google GenAI model as the default LLM |
| **2** | Set a Google GenAI embedding model as the default embedding model |
| **3** | Google GenAI specific configuration |
| **4** | API key can be set here or via environment variable `GOOGLE_API_KEY` |

##### OCI Generative AI

To use OCI Generative AI with your agent, add the `embabel-agent-starter-oci-genai` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-oci-genai</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-oci-genai:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-oci-genai:${embabel-agent.version}'
    }
    ```

The starter defaults to OCI config file authentication with `~/.oci/config` and profile `DEFAULT`.
At minimum, configure the compartment OCID and region.
When the standard OpenAI provider is not on the classpath, the OCI starter supplies OCI defaults for Embabel’s default LLM and embedding model, so an OCI-only application does not need to override `embabel.models.default-llm` just to start.

```
embabel:
  agent:
    platform:
      models:
        ocigenai:
          compartment-id: ocid1.compartment.oc1...
          region: us-chicago-1
          # authentication-type: FILE
  models:
    # Optional: choose a different OCI model id
    # default-llm: meta.llama-3.3-70b-instruct
    # default-embedding-model: cohere.embed-v4.0
```

Other supported authentication types are `INSTANCE_PRINCIPAL`, `RESOURCE_PRINCIPAL`, `WORKLOAD_IDENTITY`, `SESSION_TOKEN` and `SIMPLE`.
See the configuration reference for the full OCI property list.

##### Mistral AI

* Required:

  + `MISTRAL_API_KEY`: API key for Mistral AI services
* Optional:

  + `MISTRAL_BASE_URL`: base URL for Mistral AI API (default: `api.mistral.ai`)

Alternatively, configure via `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        mistralai:
          api-key: ${MISTRAL_API_KEY:your-dev-key}
          base-url: ${MISTRAL_BASE_URL:}
```

You also need to add the `embabel-agent-starter-mistral-ai` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-mistral-ai</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-mistral-ai:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-mistral-ai:${embabel-agent.version}'
    }
    ```

##### LM Studio

[LM Studio](https://lmstudio.ai/) is a desktop application that lets you easily discover, download, and run powerful LLMs on your own computer (Windows, Mac, Linux) for free, enabling offline use, local document Q&A, and even hosting an OpenAI-compatible API server for your projects, making advanced AI accessible without relying on cloud services.
It supports formats like GGUF and offers privacy and control over your models.

The LM Studio [Local Server](https://lmstudio.ai/docs/developer/core/server)
allows you to run an LLM API server on localhost.

To add LM Studio support, add the `embabel-agent-starter-lmstudio` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-lmstudio</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-lmstudio:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-lmstudio:${embabel-agent.version}'
    }
    ```

Configure an LLM API on LM Studio by following [these instructions](https://lmstudio.ai/docs/developer/core/server).

Specify the example configuration in `application.yml`.
Below I have an open-ai llm and embedding model downloaded on my LLM studio and exposed via the LLM Server.

```
embabel:
  agent:
    platform:
      autonomy:
        agent-confidence-cut-off: 0.8
        goal-confidence-cut-off: 0.8
      models:
        lmstudio:
          base-url: http://127.0.0.1:1234
  models:
    default-llm: openai/gpt-oss-20b
    default-embedding-model: text-embedding-nomic-embed-text-v1.5
```

##### Ollama

[Ollama](https://ollama.com/) is an open source application that lets you easily [discover](https://ollama.com/library), download, and run powerful LLMs on your own computer (Windows, Mac, Linux) for free, enabling offline use, local document Q&A, and even hosting an API server for your projects, making advanced AI accessible without relying on cloud services.

The Ollama application allows you to run an LLM API server on localhost. Exposing both its own Ollama API and an Open-AI-compatible API.

Get Ollama running locally by following [these instructions](https://docs.ollama.com/quickstart).

To use the Ollama API with your agent, add the `embabel-agent-starter-ollama` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-ollama</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-ollama:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-ollama:${embabel-agent.version}'
    }
    ```

Specify the example configuration in `application.yml`. Embabel uses Spring AI configuration to configure the Ollama integration.

```
spring:
  ai:
    ollama:
      # Not needed when using the default port
      base-url: http://localhost:11434

embabel:
  models:
    defaultLlm: ministral-3:8b
    default-embedding-model: qwen3-embedding
```

To instead use the Open-AI-compatible API with your agent, add the `embabel-agent-starter-openai-custom` starter.

Add this to your build system as follows:

Maven (pom.xml)
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-openai-custom</artifactId>
        <version>${embabel-agent.version}</version>
    </dependency>
    ```

Gradle Kotlin DSL (build.gradle.kts)
:   ```
    dependencies {
        implementation("com.embabel.agent:embabel-agent-starter-openai-custom:${embabel-agent.version}")
    }
    ```

Gradle Groovy DSL (build.gradle)
:   ```
    dependencies {
        implementation 'com.embabel.agent:embabel-agent-starter-openai-custom:${embabel-agent.version}'
    }
    ```

Specify the example configuration in `application.yml`. Embabel uses Spring AI configuration to configure the Ollama integration.

```
embabel:
  agent:
    platform:
      models:
        openai:
          custom:
            api-key: not-set  # Property needed but value not used by Ollama
            base-url: http://localhost:11434
            models: ministral-3:8b,qwen3-embedding
  models:
    defaultLlm: ministral-3:8b
    default-embedding-model: qwen3-embedding
```

### 2.3. Getting Embabel Running

#### 2.3.1. Running the Examples

The quickest way to get started with Embabel is to run the examples:

```
# Clone and run examples
git clone https://github.com/embabel/embabel-agent-examples
cd embabel-agent-examples/scripts/java
./shell.sh
```

|  |  |
| --- | --- |
|  | Choose the `java` or `kotlin` scripts directory depending on your preference. |

#### 2.3.2. Prerequisites

* Java 21+
* API Key from OpenAI, Anthropic, or Google
* Maven 3.9+ (optional)

Set your API keys:

```
export OPENAI_API_KEY="your_openai_key"
export ANTHROPIC_API_KEY="your_anthropic_key"
export GOOGLE_API_KEY="your_google_api_key"
```

|  |  |
| --- | --- |
|  | For Google GenAI, you can use either `GOOGLE_API_KEY` (Google AI Studio) or Vertex AI authentication with `GOOGLE_PROJECT_ID` and `GOOGLE_LOCATION`. |

#### 2.3.3. Using the Shell

Spring Shell is an easy way to interact with the Embabel agent framework, especially during development.

Type `help` to see available commands, or use `execute` / `x` to run an agent:

```
execute "Lynda is a Scorpio, find news for her" -p -r
```

The `-p` and `-r` flags log prompts and LLM responses respectively; omit them for quiet output.
Use `chat` for an interactive conversation, and `choose-goal` to inspect how Embabel ranks goals without running anything.

For a full description of every command, flags, tab completion, and history shortcuts, see [Embabel Shell](#shell.guide).

#### 2.3.4. Example Commands

Try these commands in the shell:

```
# Simple horoscope agent
execute "My name is Sarah and I'm a Leo"

# Research with web tools (requires Docker Desktop with MCP extension)
execute "research the recent australian federal election. what is the position of the Greens party?"

# Fact checking
x "fact check the following: holden cars are still made in australia"
```

#### 2.3.5. Implementing Your Own Shell Commands

You can add custom shell commands to invoke specific agents directly during development.
See [Implementing Custom Shell Commands](#shell.commands.custom) for a full example and explanation.

### 2.4. Adding a Little AI to Your Application

Before we get into the magic of full-blown Embabel agents, let’s see how easy it is to add a little AI to your application using the Embabel framework.
Sometimes this is all you need.

The simplest way to use Embabel is to inject an `OperationContext` and use its AI capabilities directly.
This approach is consistent with standard Spring dependency injection patterns.

Java
:   ```
    package com.embabel.example.injection;

    import com.embabel.agent.api.common.OperationContext;
    import com.embabel.common.ai.model.LlmOptions;
    import org.springframework.stereotype.Component;

    /**
     * Demonstrate the simplest use of Embabel's AI capabilities,
     * injecting an AI helper into a Spring component.
     * The jokes will be terrible, but don't blame Embabel, blame the LLM.
     */
    @Component
    public record InjectedComponent(Ai ai) {

        public record Joke(String leadup, String punchline) {
        }

        public String tellJokeAbout(String topic) {
            return ai
                    .withDefaultLlm()
                    .generateText("Tell me a joke about " + topic);
        }

        public Joke createJokeObjectAbout(String topic1, String topic2, String voice) {
            return ai
                    .withLlm(LlmOptions.withDefaultLlm().withTemperature(.8))
                    .createObject("""
                                    Tell me a joke about %s and %s.
                                    The voice of the joke should be %s.
                                    The joke should have a leadup and a punchline.
                                    """.formatted(topic1, topic2, voice),
                            Joke.class);
        }

    }
    ```

Kotlin
:   ```
    package com.embabel.example.injection

    import com.embabel.agent.api.common.OperationContext
    import com.embabel.common.ai.model.LlmOptions
    import org.springframework.stereotype.Component

    /**
     * Demonstrate the simplest use of Embabel's AI capabilities,
     * injecting an AI helper into a Spring component.
     * The jokes will be terrible, but don't blame Embabel, blame the LLM.
     */
    @Component
    class InjectedComponent(private val ai: Ai) {

        data class Joke(val leadup: String, val punchline: String)

        fun tellJokeAbout(topic: String): String {
            return ai
                .withDefaultLlm()
                .generateText("Tell me a joke about $topic")
        }

        fun createJokeObjectAbout(topic1: String, topic2: String, voice: String): Joke {
            return ai
                .withLlm(LlmOptions.withDefaultLlm().withTemperature(.8))
                .createObject("""
                    Tell me a joke about $topic1 and $topic2.
                    The voice of the joke should be $voice.
                    The joke should have a leadup and a punchline.
                    """,
                    Joke::class.java)
        }
    }
    ```

This example demonstrates several key aspects of Embabel’s design philosophy:

* **Standard Spring Integration**: The `Ai` object is injected like any other Spring dependency using constructor injection
* **Simple API**: Access AI capabilities through the `Ai` interface directly or `OperationContext.ai()`, which can also be injected in the same way
* **Flexible Configuration**: Configure LLM options like temperature on a per-call basis
* **Type Safety**: Generate structured objects directly with `createObject()` method
* **Consistent Patterns**: Works exactly like you’d expect any Spring component to work

The `Ai` type provides access to all of Embabel’s AI capabilities without requiring a full agent setup, making it perfect for adding AI features to existing applications incrementally.

|  |  |
| --- | --- |
|  | The `Ai` and OperationContext` APIs are used throughout Embabel applications, as a convenient gateway to key AI and other functionality. |

### 2.5. Writing Your First Agent

The easiest way to create your first agent is to use the [Java or Kotlin template repositories](#getting-started.quickstart).

#### 2.5.1. Example: WriteAndReviewAgent

The template includes a `WriteAndReviewAgent` that demonstrates key concepts:

Java
:   ```
    @Agent(description = "Agent that writes and reviews stories")
    public class WriteAndReviewAgent {

        @Action
        public Story writeStory(UserInput userInput, OperationContext context) {
            return context.ai()
                .withAutoLlm()
                .createObject("""
                    You are a creative writer who aims to delight and surprise.
                    Write a story about %s
                    """.formatted(userInput.getContent()),
                Story.class);
        }

        @AchievesGoal(description = "Review a story")
        @Action
        public ReviewedStory reviewStory(Story story, OperationContext context) {
            return context.ai()
                .withLlmByRole("reviewer")
                .createObject("""
                    You are a meticulous editor.
                    Carefully review this story:
                    %s
                """.formatted(story.text),
                ReviewedStory.class);
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Agent that writes and reviews stories")
    class WriteAndReviewAgent {

        @Action
        fun writeStory(userInput: UserInput, context: OperationContext): Story {
            return context.ai()
                .withAutoLlm()
                .createObject("""
                    You are a creative writer who aims to delight and surprise.
                    Write a story about ${userInput.content}
                    """,
                    Story::class.java)
        }

        @AchievesGoal(description = "Review a story")
        @Action
        fun reviewStory(story: Story, context: OperationContext): ReviewedStory {
            return context.ai()
                .withLlmByRole("reviewer")
                .createObject("""
                    You are a meticulous editor.
                    Carefully review this story:
                    ${story.text}
                """,
                ReviewedStory::class.java)
        }
    }
    ```

#### 2.5.2. Key Concepts Demonstrated

**Multiple LLMs with Different Configurations:**

* Writer LLM uses high temperature (0.8) for creativity
* Reviewer LLM uses low temperature (0.2) for analytical review
* Different personas guide the model behavior

**Actions and Goals:**

* `@Action` methods are the steps the agent can take
* `@AchievesGoal` marks the final action that completes the agent’s work

**Domain Objects:**

* `Story` and `ReviewedStory` are strongly-typed domain objects
* Help structure the interaction between actions

#### 2.5.3. Running Your Agent

Set your API keys and run the shell:

```
export OPENAI_API_KEY="your_key_here"
./scripts/shell.sh
```

In the shell, try:

```
x "Tell me a story about a robot learning to paint"
```

The agent will:

1. Generate a creative story using the writer LLM
2. Review and improve it using the reviewer LLM
3. Return the final reviewed story

#### 2.5.4. Next Steps

* Explore the [examples repository](https://github.com/embabel/embabel-agent-examples) for more complex agents
* Read the [Reference Documentation](#reference.reference) for detailed API information
* Try building your own domain-specific agents

## 3. Embabel Shell

The easiest way to get started with Embabel is via Spring Shell.

### 3.1. How to Use the Shell

The Embabel Shell is built on [Spring Shell](https://spring.io/projects/spring-shell) and provides an interactive command-line interface for running and developing agents.
It is the fastest way to try agents, iterate on prompts, and observe agent behaviour in detail.

#### 3.1.1. Starting the Shell

With the `embabel-agent-starter-shell` dependency and API keys configured, start your application normally.
The shell prompt appears automatically:

```
shell:>
```

If you are using the Embabel example or template projects, use the provided convenience script:

```
./scripts/shell.sh
```

#### 3.1.2. Navigating the Shell

Type `help` to list all available commands with a short description of each:

```
shell:> help
```

Tab completion is supported for command names and, where applicable, for option values.
Press `<Tab>` after typing a partial command or flag to see available completions.

The shell maintains a persistent command history across restarts.
Use the up/down arrow keys to navigate previous commands, or type `!!` to repeat the last command â especially handy when iterating on an agent prompt:

```
shell:> !!
```

#### 3.1.3. How User Input Reaches an Agent

When you run `execute "some text"`, the shell wraps the quoted string in a `UserInput` object and places it on the agent process blackboard.
Agents declare a dependency on `UserInput` by accepting it as a parameter in their first `@Action` method.
Embabel’s planner sees that `UserInput` is available and selects the appropriate action automatically.

This is the same mechanism used in web controllers and webhook handlers â only the source of `UserInput` changes (shell vs. HTTP request vs. event payload).
See [Invoking Embabel Agents](#reference.invoking) for programmatic invocation patterns.

#### 3.1.4. Logging Verbosity

The `-p` and `-r` flags on `execute` control what gets logged during a run:

| Flag | Effect |
| --- | --- |
| `-p` | Log LLM prompts sent by the agent |
| `-r` | Log raw LLM responses received by the agent |

Omit both flags for quiet output showing only the final result.
Use both together for maximum visibility when debugging a misbehaving agent.

### 3.2. Shell Commands

#### 3.2.1. Agent Execution Commands

##### execute (x)

Run the most appropriate agent for the given natural-language input.
Embabel uses [Autonomy](#reference.invoking__autonomy) to rank all registered agents and selects the best match.

```
execute "Lynda is a Scorpio, find news for her"

# Shorthand alias
x "Lynda is a Scorpio, find news for her"
```

| Option | Description |
| --- | --- |
| `-p` | Log LLM prompts during execution |
| `-r` | Log raw LLM responses during execution |
| `-o` / `--open` | Open mode: select the best *goal* across all agents, then assemble a dynamic agent from any available actions to achieve it. Without this flag, closed mode is used: a single agent is selected and runs in isolation. |
| `-c key=val,…​` | Per-execution tool call context entries, merged with any persistent context set via `set-context`. Per-execution entries win on conflict. |

Example combining flags:

```
# Verbose closed-mode run
x "fact check: the Eiffel Tower is in Berlin" -p -r

# Open mode with prompt logging
x "Research the latest Go release" -o -p

# Per-execution context override
x "Find news for Alice" -c "tenantId=beta,correlationId=req-456"
```

##### chat

Start an interactive back-and-forth conversation with the most appropriate agent.
The agent responds to each message in turn, maintaining state across the session.

```
shell:> chat
chat:> What does the document say about taxes?
chat:> Summarise that in three bullet points.
chat:> exit
```

Type `exit` to end the chat session and return to the main shell prompt.

##### choose-goal

Use the LLM to rank all available goals across all agents against the provided input, and display the rankings without executing anything.
Useful for understanding which goal Embabel would select for a given input, and for tuning agent descriptions.

```
choose-goal "Find a horoscope for Alice who is a Scorpio"
```

The output shows each candidate goal, its score, and the agent it belongs to.
If the top-ranked goal is not what you expected, revisit the `description` attribute on the relevant `@AchievesGoal` or `@Agent` annotation.

See [Dynamic Agent and Goal Selection with Autonomy](#reference.invoking__autonomy) for the confidence threshold configuration that controls when a goal is considered a strong enough match to execute.

#### 3.2.2. Tool Call Context Commands

The shell supports setting out-of-band metadata that is passed to all tools during agent execution.
This is the shell interface for [ToolCallContext](#reference.tools__tool-call-context).

##### set-context (sc)

Set persistent tool call context as comma-separated `key=value` pairs.
This context is passed to every subsequent `execute` / `x` invocation until cleared.

```
# Set persistent context
set-context tenantId=acme,authToken=bearer-xyz123

# Shorthand alias
sc tenantId=acme,authToken=bearer-xyz123

# Clear persistent context
set-context clear
```

##### show-context

Display the current persistent tool call context.

```
shell:> show-context
Tool call context: {tenantId=acme, authToken=bearer-xyz123}
```

##### Per-Execution Context Override

The `execute` command accepts a `-c` / `--context` flag for one-off context entries.
These are merged with the persistent context; per-execution entries win on conflict.

```
# Persistent context: tenantId=acme
# Per-execution override adds correlationId and could override tenantId
x "Find news for Alice" -c "correlationId=req-456,tenantId=beta"
```

In this example the effective context for that single execution is `{tenantId=beta, authToken=bearer-xyz123, correlationId=req-456}`.
The persistent context remains `{tenantId=acme, authToken=bearer-xyz123}` for future invocations.

#### 3.2.3. Implementing Custom Shell Commands

During development you may want to add your own shell commands to invoke specific agents or flows directly, bypassing the natural-language routing of `execute`.
Because the Embabel Shell is a standard Spring Shell application, any `@ShellComponent` bean is discovered and registered automatically by Spring.

Inject `AgentPlatform` and use `AgentInvocation` to call agents with strong typing:

Java
:   ```
    @ShellComponent
    public record SupportAgentShellCommands(
            AgentPlatform agentPlatform
    ) {

        @ShellMethod("Get bank support for a customer query")
        public String bankSupport(
                @ShellOption(value = "id", help = "customer id", defaultValue = "123") Long id,
                @ShellOption(value = "query", help = "customer query", defaultValue = "What's my balance, including pending amounts?") String query
        ) {
            var supportInput = new SupportInput(id, query);
            System.out.println("Support input: " + supportInput);
            var invocation = AgentInvocation
                    .builder(agentPlatform)
                    .options(ProcessOptions.builder().verbosity(v -> v.showPrompts(true)).build())
                    .build(SupportOutput.class);
            return invocation.invoke(supportInput).toString();
        }
    }
    ```

Kotlin
:   ```
    @ShellComponent
    class SupportAgentShellCommands(
        private val agentPlatform: AgentPlatform
    ) {

        @ShellMethod("Get bank support for a customer query")
        fun bankSupport(
            @ShellOption(value = ["id"], help = "customer id", defaultValue = "123") id: Long,
            @ShellOption(value = ["query"], help = "customer query", defaultValue = "What's my balance, including pending amounts?") query: String
        ): String {
            val supportInput = SupportInput(id, query)
            println("Support input: $supportInput")
            val invocation = AgentInvocation
                .builder(agentPlatform)
                .options(ProcessOptions.builder().verbosity { it.showPrompts(true) }.build())
                .build(SupportOutput::class.java)
            return invocation.invoke(supportInput).toString()
        }
    }
    ```

|  |  |
| --- | --- |
|  | Custom shell commands are particularly useful when you want to pre-populate inputs with test data or invoke a specific agent directly rather than relying on Autonomy’s natural-language selection. For full `AgentInvocation` API details see [Invoking Embabel Agents](#reference.invoking). |

### 3.3. Embabel Modules

Embabel spans multiple modules, in this and other repositories in the `embabel` organization.

The status of these modules varies.
There are three statuses:

* **Stable**: these modules are considered production ready.
  We strive to avoid breaking changes.
* **Incubating**: these modules are under active development and may have breaking changes in minor releases.
  However, they are considered generally usable and can be expected to graduate to stable.
  Use with caution.
* **Experimental**: these modules are early stage and may have breaking changes in any release.
  They are not recommended for production use.
  These modules may be removed without replacement and there is no guarantee of them graduating to a more stable status.

Of course, contributions are welcome to all modules!

#### 3.3.1. Module Directory

The following are modules intended for direct use (versus supporting infrastructure).

##### Core Modules

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-api` | This repo | Core API | Main programming interface for building agents | Stable |
| `embabel-agent-domain` | This repo | Domain types and entities | Shared domain model | Incubating |

##### Feature Modules

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-a2a` | This repo | Agent-to-Agent protocol support | Google A2A protocol implementation | Incubating |
| `embabel-agent-code` | This repo | Coding domain library | Code analysis and generation utilities | Stable |
| `embabel-agent-discord` | This repo | Discord bot integration | Build agents as Discord bots | Experimental |
| `embabel-agent-eval` | This repo | Agent evaluation framework | Assess agent performance on tasks | Experimental |
| `embabel-agent-mcpserver` | This repo | MCP server support | Export agents as MCP servers | Stable |
| `embabel-agent-openai` | This repo | OpenAI-specific utilities | Structured outputs, response format | Stable |
| `embabel-agent-onnx` | This repo | Local ONNX Runtime inference | Local embedding models via ONNX Runtime. Default: `all-MiniLM-L6-v2` | Incubating |
| `embabel-agent-remote` | This repo | Remote action support | Execute actions on remote systems, enabling dynamic registration to extend the capabilities of an Embabel server | Experimental |
| `embabel-agent-shell` | This repo | Command-line interface | Interactive shell for agent development | Stable |
| `embabel-agent-skills` | This repo | Support for emerging Agent Skills standard | Composable agent skills | Experimental |
| `embabel-agent-spec` | This repo | Serializable action and goal definitions | Enables agents to be defined in YML or otherwise persisted in a serialized format | Experimental |

##### RAG and Context Engineering Modules

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-rag-core` | This repo | Core RAG abstractions | Base interfaces for RAG, encompassing programming model (`ToolishRag`), storage abstractions (`SearchOperations`) and document model. | Stable |
| `embabel-agent-rag-lucene` | This repo | Lucene RAG store | Local storage with Apache Lucene supporting vector and text search | Stable |
| `embabel-agent-rag-tika` | This repo | Apache Tika integration | Document parsing (Markdown, PDF, Word, etc.) | Incubating |
| `embabel-agent-rag-neo-drivine` | `embabel/embabel-agent-rag-neo-drivine` | Neo4j graph RAG | RAG store for Neo4j graph database | Incubating |
| `embabel-rag-pgvector` | `embabel/embabel-rag-pgvector` | PostgreSQL pgvector RAG | RAG store for PostgreSQL with pgvector extension supporting hybrid search (vector, full-text, fuzzy) | Incubating |
| `dice` | `embabel/dice` | Support for [Domain Oriented Context Engineering](https://medium.com/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8:) | Sophisticated pipeline for context engineering and integration with enterprise data. Incorporates proposition extraction and projection into knowledge graphs, memory and experimental representations. | Incubating |

##### Spring Boot Starters

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-starter` | This repo | Base starter | Core dependencies only (no LLM provider) | Stable |
| `embabel-agent-starter-anthropic` | This repo | Anthropic starter | Quick start with Claude | Stable |
| `embabel-agent-starter-openai` | This repo | OpenAI starter | Quick start with GPT | Stable |
| `embabel-agent-starter-ollama` | This repo | Ollama starter | Quick start with local Ollama | Stable |
| `embabel-agent-starter-onnx` | This repo | ONNX starter | Add local ONNX embedding models | Incubating |
| `embabel-agent-starter-shell` | This repo | Shell starter | Add interactive shell for development | Stable |
| `embabel-agent-starter-a2a` | This repo | A2A starter | Add A2A server support | Incubating |
| `embabel-agent-starter-mcpserver` | This repo | MCP server starter | Add MCP server support | Stable |
| `embabel-agent-starter-bedrock` | This repo | Bedrock starter | Quick start with AWS Bedrock | Stable |
| `embabel-agent-starter-deepseek` | This repo | DeepSeek starter | Quick start with DeepSeek | Stable |
| `embabel-agent-starter-gemini` | This repo | Gemini starter | Quick start with Vertex AI | Stable |
| `embabel-agent-starter-google-genai` | This repo | Google GenAI starter | Quick start with AI Studio | Incubating |
| `embabel-agent-starter-oci-genai` | This repo | OCI Generative AI starter | Quick start with OCI GenAI | Incubating |
| `embabel-agent-starter-lmstudio` | This repo | LM Studio starter | Quick start with LM Studio | Incubating |
| `embabel-agent-starter-mistral-ai` | This repo | Mistral AI starter | Quick start with Mistral | Stable |
| `embabel-agent-starter-dockermodels` | This repo | Docker Models starter | Quick start with Docker Desktop AI | Stable |
| `embabel-agent-starter-openai-custom` | This repo | Custom OpenAI starter | Quick start with OpenRouter, etc. | Stable |

##### Test Support

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-test` | This repo | Test utilities | JUnit extensions, test DSL | Incubating |

##### Example Repositories

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-examples` | `embabel/embabel-agent-examples` | Example agents | Sample implementations and tutorials | Stable |
| `java-agent-template` | `embabel/java-agent-template` | Java project template | Starter template for Java agents | Stable |

##### Developer Tooling

| Name | Location | Purpose | Notes | Status |
| --- | --- | --- | --- | --- |
| `embabel-agent-intellij` | `embabel/embabel-agent-intellij` | IntelliJ IDEA plugin | IDE support for Embabel Agent development. See [IntelliJ Plugin](reference.tooling_intellij). | Stable |

#### 3.3.2. Experimental APIs

While the status of modules may change over time, any module may contain clearly identified experimental functionality.
This enables us to innovate in the open without excessive build complexity.

Please try and provide feedback on this functionality, but don’t rely on it and be aware that it may change without notice.

|  |  |
| --- | --- |
|  | Any type or method annotated with the `@ApiStatus.Experimental` annotation is not guaranteed to be stable. |

## 4. Reference

### 4.1. Invoking an Agent

Agents can be invoked programmatically or via user input.

See [Invoking Embabel Agents](#reference.invoking) for details on programmatic invocation.
Programmatic invocation typically involves structured types other than user input.

In the case of user input, an LLM will choose the appropriate agent via the `Autonomy` class.
Behavior varies depending on configuration:

* In closed mode, the LLM will select the agent based on the user input and the available agents in the system.
* In open mode, the LLM will select the goal based on the user input and then assemble an agent that can achieve that goal from the present world state.

### 4.2. Agent Process Flow

When an agent is invoked, Embabel creates an `AgentProcess` with a unique identifier that manages the complete execution lifecycle.

#### 4.2.1. AgentProcess Lifecycle

An `AgentProcess` maintains state throughout its execution and can transition between various states:

**Process States:**

* `NOT_STARTED`: The process has not started yet
* `RUNNING`: The process is executing without any known problems
* `COMPLETED`: The process has completed successfully
* `FAILED`: The process has failed and cannot continue
* `TERMINATED`: The process was killed by an early termination policy
* `KILLED`: The process was killed by the user or platform
* `STUCK`: The process cannot formulate a plan to progress (may be temporary)
* `WAITING`: The process is waiting for user input or external event
* `PAUSED`: The process has paused due to scheduling policy

**Process Execution Methods:**

* `tick()`: Perform the next single step and return when an action completes
* `run()`: Execute the process as far as possible until completion, failure, or a waiting state

These methods are not directly called by user code, but are managed by the framework to control execution flow.

Each `AgentProcess` maintains:

* **Unique ID**: Persistent identifier for tracking and reference
* **History**: Record of all executed actions with timing information
* **Goal**: The objective the process is trying to achieve
* **Failure Info**: Details about any failure that occurred
* **Parent ID**: Reference to parent process for nested executions

#### 4.2.2. Planning

Planning occurs after each action execution using Goal-Oriented Action Planning (GOAP).
The planning process:

1. **Analyze Current State**: Examine the current blackboard contents and world state
2. **Identify Available Actions**: Find all actions that can be executed based on their preconditions
3. **Search for Action Sequences**: Use A\* algorithm to find optimal paths to achieve the goal
4. **Select Optimal Plan**: Choose the best action sequence based on cost and success probability
5. **Execute Next Action**: Run the first action in the plan and replan

This creates a dynamic **OODA loop** (Observe-Orient-Decide-Act):
- **Observe**: Check current blackboard state and action results - **Orient**: Understand what has changed since the last planning cycle - **Decide**: Formulate or update the plan based on new information - **Act**: Execute the next planned action

The replanning approach allows agents to:

* Adapt to unexpected action results
* Handle dynamic environments where conditions change
* Recover from partial failures
* Take advantage of new opportunities that arise

#### 4.2.3. Blackboard

The Blackboard serves as the shared memory system that maintains state throughout the agent process execution.
It implements the [Blackboard architectural pattern](https://en.wikipedia.org/wiki/Blackboard_(design_pattern)), a knowledge-based system approach.

Most of the time, user code doesn’t need to interact with the blackboard directly, as it is managed by the framework.
For example, action inputs come from the blackboard, and action outputs are automatically added to the blackboard, and conditions are evaluated based on its contents.

**Key Characteristics:**

* **Central Repository**: Stores all domain objects, intermediate results, and process state
* **Type-Based Access**: Objects are indexed and retrieved by their types
* **Ordered Storage**: Objects maintain the order they were added, with latest being default
* **Immutable Objects**: Once added, objects cannot be modified (new versions can be added)
* **Condition Tracking**: Maintains boolean conditions used by the planning system

**Core Operations:**

Java
:   ```
    // Add objects to blackboard (1)
    blackboard.add(person);
    blackboard.set("result", analysis);

    // Retrieve objects by type
    Person person = blackboard.last(Person.class);
    List<Person> allPersons = blackboard.all(Person.class);

    // Check conditions
    blackboard.setCondition("userVerified", true);
    boolean verified = blackboard.getCondition("userVerified"); (2)

    // Hide an object
    blackboard.hide(somethingWeDontWantToPlanOnLater); (3)
    ```

Kotlin
:   ```
    // Add objects to blackboard (1)
    blackboard += person
    blackboard["result"] = analysis

    // Retrieve objects by type
    val person = blackboard.last<Person>()
    val allPersons = blackboard.all<Person>()

    // Check conditions
    blackboard.setCondition("userVerified", true)
    val verified = blackboard.getCondition("userVerified") (2)

    // Hide an object
    blackboard.hide(somethingWeDontWantToPlanOnLater) (3)
    ```

|  |  |
| --- | --- |
| **1** | **Adding Objects**: Objects are added to the blackboard automatically when returned from action methods, so you don’t typically need to call this API. They can also be added manually using the `+=` operator (Kotlin only) or `add`/`set` method with an optional key. |
| **2** | **Conditions**: Conditions are normally calculated in `@Condition` methods, so you don’t usually need to check or set them via the API. |
| **3** | **Hiding Objects**: Prevents an object from being considered in future planning cycles. For example, the object might be a command that we have handled. It will remain in the blackboard history but will not be available to planning or via the Blackboard API. |

**Data Flow:**

1. **Input Processing**: Initial user input is added to the blackboard
2. **Action Execution**: Each action reads inputs from blackboard and adds results
3. **State Evolution**: Blackboard accumulates objects representing the evolving state
4. **Planning Input**: Current blackboard state informs the next planning cycle
5. **Result Extraction**: Final results are retrieved from blackboard upon completion

The blackboard enables:

* **Loose Coupling**: Actions don’t need direct references to each other
* **Flexible Data Flow**: Actions can consume any available data of the right type
* **State Persistence**: Complete execution history is maintained
* **Debugging Support**: Full visibility into state evolution for troubleshooting

#### 4.2.4. Binding

By default, items in the blackboard are matched by type.
When there are multiple candidates of the same type, the most recently added one is provided.
It is also possible to assign a specific name to blackboard items.

An example of explicit binding in an action method:

Java
:   ```
    @Action
    public Person extractPerson(UserInput userInput, OperationContext context) {
        PersonImpl maybeAPerson = context.promptRunner().withLlm(LlmOptions.fromModel(OpenAiModels.GPT_41)).createObjectIfPossible(
                """
                Create a person from this user input, extracting their name:
                %s""".formatted(userInput.getContent()),
                PersonImpl.class
        );
        if (maybeAPerson != null) {
            context.bind("user", maybeAPerson); (1)
        }
        return maybeAPerson;
    }
    ```

Kotlin
:   ```
    @Action
    fun extractPerson(userInput: UserInput, context: OperationContext): Person? {
        val maybeAPerson = context.promptRunner().withLlm(LlmOptions.fromModel(OpenAiModels.GPT_41)).createObjectIfPossible(
            """
            Create a person from this user input, extracting their name:
            ${userInput.content}
            """.trimIndent(),
            PersonImpl::class.java
        )
        if (maybeAPerson != null) {
            context.bind("user", maybeAPerson) (1)
        }
        return maybeAPerson
    }
    ```

|  |  |
| --- | --- |
| **1** | Explicit binding to the blackboard. Not usually necessary as action method return values are automatically bound. |

The following example requires a `Thing` named `thingOne` to be present in the blackboard:

Java
:   ```
    @Action
    public Whatever doWithThing(
            @RequireNameMatch Thing thingOne) { (1)
    ```

Kotlin
:   ```
    @Action
    fun doWithThing(
            @RequireNameMatch thingOne: Thing): Whatever { (1)
    ```

|  |  |
| --- | --- |
| **1** | The `@RequireNameMatch` annotation on the parameter specifies that the parameter should be matched by both type and name. Multiple parameters can be so annotated. |

The following example uses `@Action.outputBinding` to cause a `thingOne` to be bound in the blackboard, satisfying the previous example:

Java
:   ```
    @Action(outputBinding = "thingOne")
    public Thing bindThing1() { ...
    ```

Kotlin
:   ```
    @Action(outputBinding = "thingOne")
    fun bindThing1(): Thing { ...
    ```

|  |  |
| --- | --- |
|  | When routing flows by type, the name is not important, but for reference the default name is 'it'. |

#### 4.2.5. Context

Embabel offers a way to store longer term state: the `com.embabel.agent.core.Context`.
While a blackboard is tied to a specific agent process, a context can persist across multiple processes.

Contexts are identified by a unique `contextId` string.
When starting an agent process, you can specify a `contextId` in the `ProcessOptions`.
This will populate that process’s blackboard with any data stored in the specified context.

|  |  |
| --- | --- |
|  | Context persistence is dependent on the implementation of `com.embabel.agent.spi.ContextRepository`. The default implementation works only in memory, so does not survive server restarts. |

### 4.3. Goals, Actions and Conditions

### 4.4. Domain Objects

Domain objects in Embabel are not just strongly-typed data structures - they are real objects with behavior that can be selectively exposed to LLMs and used in agent actions.

#### 4.4.1. Objects with Behavior

Unlike simple structs or DTOs, Embabel domain objects can encapsulate business logic and expose it to LLMs through the `@Tool` annotation.
For example:

Java
:   ```
    @Entity
    public class Customer {
        private String name;
        private LoyaltyLevel loyaltyLevel;
        private List<Order> orders;

        @Tool(description = "Calculate the customer's loyalty discount percentage") (1)
        public BigDecimal getLoyaltyDiscount() {
            return loyaltyLevel.calculateDiscount(orders.size());
        }

        @Tool(description = "Check if customer is eligible for premium service")
        public boolean isPremiumEligible() {
            return orders.stream()
                .mapToDouble(Order::getTotal)
                .sum() > 1000.0;
        }

        public void updateLoyaltyLevel() { (2)
            // Internal business logic
        }
    }
    ```

Kotlin
:   ```
    @Entity
    class Customer(
        private val name: String,
        private val loyaltyLevel: LoyaltyLevel,
        private val orders: List<Order>
    ) {
        @Tool(description = "Calculate the customer's loyalty discount percentage") (1)
        fun getLoyaltyDiscount(): BigDecimal {
            return loyaltyLevel.calculateDiscount(orders.size)
        }

        @Tool(description = "Check if customer is eligible for premium service")
        fun isPremiumEligible(): Boolean {
            return orders.sumOf { it.total } > 1000.0
        }

        fun updateLoyaltyLevel() { (2)
            // Internal business logic
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | The `@Tool` annotation exposes this method to LLMs when the object is added via `PrompRunner.withToolObject()`. |
| **2** | Unannotated methods such as `updateLoyaltyLevel` are never exposed to LLMs, regardless of their visibility level. This ensures that tool exposure is safe, explicit and controlled. |

#### 4.4.2. Selective Tool Exposure

The `@Tool` annotation allows you to selectively expose domain object methods to LLMs.
For example:

* **Business Logic**: Expose methods that provide *safely invocable* business value to the LLM
* **Calculated Properties**: Methods that compute derived values.
  This can help LLMs with calculations they might otherwise get wrong.
* **Business Rules**: Methods that implement domain-specific rules

|  |  |
| --- | --- |
|  | Always keep internal implementation details hidden, and think carefully before exposing methods that mutate state or have side effects. |

#### 4.4.3. Use of Domain Objects in Actions

Domain objects can be used naturally in action methods, combining LLM interactions with traditional object-oriented programming.
The availability of the domain object instances also drives Embabel planning.

Java
:   ```
    @Action
    public Recommendation generateRecommendation(Customer customer, OperationContext context) {
        var prompt = String.format(
            "Generate a personalized recommendation for %s based on their profile",
            customer.getName()
        );

        return context.ai()
            .withToolObject(customer) (1)
            .withDefaultLlm()
            .createObject(prompt, Recommendation.class);
    }
    ```

Kotlin
:   ```
    @Action
    fun generateRecommendation(customer: Customer, context: OperationContext): Recommendation {
        val prompt = "Generate a personalized recommendation for ${customer.name} based on their profile"

        return context.ai()
            .withToolObject(customer) (1)
            .withDefaultLlm()
            .createObject(prompt, Recommendation::class.java)
    }
    ```

|  |  |
| --- | --- |
| **1** | The `Customer` domain object is provided as a tool object, allowing the LLM to call its `@Tool` methods. The LLM has access to `customer.getLoyaltyDiscount()` and `customer.isPremiumEligible()`. |

|  |  |
| --- | --- |
|  | Domain object methods, even if annotated, will not be exposed to LLMs unless explicitly added via `withToolObject()`. |

#### 4.4.4. Domain Understanding is Critical

As outlined in [Context Engineering Needs Domain Understanding](https://medium.com/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8), Rod Johnson’s blog introducing DICE (Domain-Integrated Context Engineering), domain understanding is fundamental to effective context engineering.
Domain objects serve as the bridge between:

* **Business Domain**: Real-world entities and their relationships
* **Agent Behavior**: How LLMs understand and interact with the domain
* **Code Actions**: Traditional programming logic that operates on domain objects

#### 4.4.5. Benefits

* **Rich Context**: LLMs receive both data structure and behavioral context
* **Encapsulation**: Business logic stays within domain objects where it belongs
* **Reusability**: Domain objects can be used across multiple agents
* **Testability**: Domain logic can be unit tested independently
* **Evolution**: Adding new tools to domain objects extends agent capabilities

This approach ensures that agents work with meaningful business entities rather than generic data structures, leading to more natural and effective AI interactions.

### 4.5. Configuration

#### 4.5.1. Enabling Embabel

Annotate your Spring Boot application class to get agentic behavior.

Example:

Java
:   ```
    @SpringBootApplication
    public class MyAgentApplication {
        public static void main(String[] args) {
            SpringApplication.run(MyAgentApplication.class, args);
        }
    }
    ```

Kotlin
:   ```
    @SpringBootApplication
    class MyAgentApplication

    fun main(args: Array<String>) {
        runApplication<MyAgentApplication>(*args)
    }
    ```

This is a normal Spring Boot application class.
You can add other Spring Boot annotations as needed.

You also need to add the [dependency and configuration for your LLM provider(s) of choice](#reference.environment_setup).

#### 4.5.2. Configuration Properties

The following table lists all available configuration properties in Embabel Agent Platform.
Properties are organized by their configuration prefix and include default values where applicable.
They can be set via `application.properties`, `application.yml`, profile-specific configuration files or environment variables, as per standard Spring configuration practices.

##### Setting default LLM and roles

From `ConfigurableModelProviderProperties` - configuration for default LLMs and role-based model selection.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.models.default-llm` | String | `gpt-4.1-mini` | Default LLM name. It’s good practice to override this in configuration. |
| `embabel.models.default-embedding-model` | String | `null` | Default embedding model name. Need not be set, in which case it defaults to null. |
| `embabel.models.llms` | Map<String, String> | `{}` | Map of role to LLM name. Each entry will require an LLM to be registered with the same name. May not include the default LLM. |
| `embabel.models.embedding-services` | Map<String, String> | `{}` | Map of role to embedding service name. Does not need to include the default embedding service. You can create as many roles as you wish. |

Role-based model selection allows you to assign specific LLMs or embedding services to different roles within your application.
For example:

```
embabel:
  models:
    default-llm: gpt-4o-mini
    default-embedding-model: text-embedding-3-small
    llms:
      cheapest: gpt-4o-mini
      best: gpt-4o
      reasoning: o1-preview
    embedding-services:
      fast: text-embedding-3-small
      accurate: text-embedding-3-large
```

It’s good practice to decouple your code from specific models in this way.

##### Platform Configuration

From `AgentPlatformProperties` - unified configuration for all agent platform properties.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.name` | String | `embabel-default` | Core platform identity name |
| `embabel.agent.platform.description` | String | `Embabel Default Agent Platform` | Platform description |

##### Logging Personality

Configuration for agent logging output style and theming.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.logging.personality` | String | *(none)* | Themed logging messages to add personality to agent output |

Table 1. Available Personality Values




| Value | Description |
| --- | --- |
| `starwars` | Star Wars themed logging messages |
| `severance` | Severance themed logging messages. Praise Kier |
| `colossus` | Colossus: The Forbin Project themed messages |
| `hitchhiker` | Hitchhiker’s Guide to the Galaxy themed messages |
| `montypython` | Monty Python themed logging messages |

Example Configuration

```
embabel:
  agent:
    logging:
      personality: hitchhiker
```

##### Agent Scanning

From `AgentPlatformProperties.ScanningConfig` - configures scanning of the classpath for agents.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.scanning.annotation` | Boolean | `true` | Whether to auto register beans with @Agent and @Agentic annotation |
| `embabel.agent.platform.scanning.bean` | Boolean | `false` | Whether to auto register as agents Spring beans of type `Agent` |

##### Ranking Configuration

From `AgentPlatformProperties.RankingConfig` - configures ranking of agents and goals based on user input when the platform should choose the agent or goal.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.ranking.llm` | String | `null` | Name of the LLM to use for ranking, or null to use auto selection |
| `embabel.agent.platform.ranking.max-attempts` | Int | `5` | Maximum number of attempts to retry ranking |
| `embabel.agent.platform.ranking.backoff-millis` | Long | `100` | Initial backoff time in milliseconds |
| `embabel.agent.platform.ranking.backoff-multiplier` | Double | `5.0` | Multiplier for backoff time |
| `embabel.agent.platform.ranking.backoff-max-interval` | Long | `180000` | Maximum backoff time in milliseconds |

##### LLM Operations

From `AgentPlatformProperties.LlmOperationsConfig` - configuration for LLM operations including prompts and data binding.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.llm-operations.prompts.maybe-prompt-template` | String | `maybe_prompt_contribution` | Template for "maybe" prompt, enabling failure result when LLM lacks information |
| `embabel.agent.platform.llm-operations.prompts.generate-examples-by-default` | Boolean | `true` | Whether to generate examples by default |
| `embabel.agent.platform.llm-operations.data-binding.max-attempts` | Int | `10` | Maximum retry attempts for data binding |
| `embabel.agent.platform.llm-operations.data-binding.fixed-backoff-millis` | Long | `30` | Fixed backoff time in milliseconds between retries |

##### Tool Loop

From `ToolLoopConfiguration` - configuration for tool loop execution.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.toolloop.type` | String | `default` | Tool loop type: `default` (sequential) or `parallel` (experimental) |
| `embabel.agent.platform.toolloop.max-iterations` | Int | `20` | Maximum number of tool loop iterations |
| `embabel.agent.platform.toolloop.parallel.per-tool-timeout` | Duration | `30s` | Timeout for individual tool execution in parallel mode |
| `embabel.agent.platform.toolloop.parallel.batch-timeout` | Duration | `60s` | Timeout for entire batch of parallel tools |
| `embabel.agent.platform.toolloop.empty-response.max-retries` | Int | `0` | Maximum consecutive empty-response retries before throwing `EmptyLlmResponseException`. `0` (default) preserves existing behaviour â the loop exits with blank content. Any value `> 0` activates `RetryWithFeedbackPolicy`. |
| `embabel.agent.platform.toolloop.empty-response.nudge-message` | String | *(see below)* | Message appended to the conversation as a synthetic `UserMessage` when the LLM goes silent. Only used when `max-retries > 0`. Default nudges the model to take one concrete action. |

###### Empty-Response Handling

Weak open-weights chat models (such as `gpt-oss-20b` or some Qwen variants) occasionally return blank text with no further tool calls after a tool result, when the model has run out of ideas about what to do next.
Without intervention the tool loop exits with empty content, which the rendering layer surfaces as `EmptyLlmResponseException`.

The `empty-response` configuration controls whether the loop gives the model a second chance.
Setting `max-retries: 1` activates `RetryWithFeedbackPolicy`: when an empty response is detected the loop appends the configured nudge message as a synthetic `UserMessage` and re-invokes the LLM in the same loop iteration.
The retry counter is reset on any non-empty response, so retries are bounded per consecutive failure rather than cumulative across the whole loop.

Example for a deployment running a smaller chat model:

```
embabel:
  agent:
    platform:
      toolloop:
        max-iterations: 30        # raise to give retries headroom
        empty-response:
          max-retries: 1          # one nudge before throwing
```

For most deployments using strong frontier models the default (`max-retries: 0`) is correct â empty responses are rare, and the typed exception lets callers handle the case explicitly.
This setting is provided to make small / local model deployments more robust without forcing every caller to wrap LLM invocations in their own retry logic.

For programmatic configuration (custom retry counts or messages), inject your own `EmptyResponsePolicy` bean â the auto-configuration honours `@ConditionalOnMissingBean`.

##### Process ID Generation

From `AgentPlatformProperties.ProcessIdGenerationConfig` - configuration for process ID generation.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.process-id-generation.include-version` | Boolean | `false` | Whether to include version in process ID generation |
| `embabel.agent.platform.process-id-generation.include-agent-name` | Boolean | `false` | Whether to include agent name in process ID generation |

##### Autonomy Configuration

From `AgentPlatformProperties.AutonomyConfig` - configures thresholds for agent and goal selection.
Certainty below thresholds will result in failure to choose an agent or goal.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.autonomy.agent-confidence-cut-off` | Double | `0.6` | Confidence threshold for agent operations |
| `embabel.agent.platform.autonomy.goal-confidence-cut-off` | Double | `0.6` | Confidence threshold for goal achievement |

##### Model Provider Configuration

From `AgentPlatformProperties.ModelsConfig` - model provider integration configurations.

###### Anthropic

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.models.anthropic.max-attempts` | Int | `10` | Maximum retry attempts |
| `embabel.agent.platform.models.anthropic.backoff-millis` | Long | `5000` | Initial backoff time in milliseconds |
| `embabel.agent.platform.models.anthropic.backoff-multiplier` | Double | `5.0` | Backoff multiplier |
| `embabel.agent.platform.models.anthropic.backoff-max-interval` | Long | `180000` | Maximum backoff interval in milliseconds |

###### OpenAI

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.models.openai.max-attempts` | Int | `10` | Maximum retry attempts |
| `embabel.agent.platform.models.openai.backoff-millis` | Long | `5000` | Initial backoff time in milliseconds |
| `embabel.agent.platform.models.openai.backoff-multiplier` | Double | `5.0` | Backoff multiplier |
| `embabel.agent.platform.models.openai.backoff-max-interval` | Long | `180000` | Maximum backoff interval in milliseconds |

###### Google GenAI (Native)

Uses the native Google GenAI SDK (`spring-ai-google-genai`) for direct access to Gemini models with full feature support.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.models.googlegenai.max-attempts` | Int | `10` | Maximum retry attempts |
| `embabel.agent.platform.models.googlegenai.backoff-millis` | Long | `5000` | Initial backoff time in milliseconds |
| `embabel.agent.platform.models.googlegenai.backoff-multiplier` | Double | `5.0` | Backoff multiplier |
| `embabel.agent.platform.models.googlegenai.backoff-max-interval` | Long | `180000` | Maximum backoff interval in milliseconds |

Google GenAI models (both LLM and embedding) are configured via the `embabel-agent-starter-google-genai` starter dependency.

The following embedding models are available:

| Model Name | Model ID | Dimensions | Price (per 1M tokens) |
| --- | --- | --- | --- |
| `gemini_embedding_001` | `gemini-embedding-001` | 3072 | $0.15 |

The following environment variables control authentication:

| Environment Variable | Description |
| --- | --- |
| `GOOGLE_API_KEY` | API key for Google AI Studio authentication |
| `GOOGLE_PROJECT_ID` | Google Cloud project ID (for Vertex AI authentication) |
| `GOOGLE_LOCATION` | Google Cloud region, e.g., `us-central1` (for Vertex AI authentication) |

|  |  |
| --- | --- |
|  | Either `GOOGLE_API_KEY` or both `GOOGLE_PROJECT_ID` and `GOOGLE_LOCATION` must be set. |

|  |  |
| --- | --- |
|  | Gemini 3 models are only available in the `global` location on Vertex AI. To use Gemini 3 with Vertex AI, you must set `GOOGLE_LOCATION=global`. |

To add new Google GenAI embedding models, edit the configuration file:

```
embabel-agent-autoconfigure/models/embabel-agent-google-genai-autoconfigure/
  src/main/resources/models/google-genai-models.yml
```

```
embedding_models:
  - name: "gemini_embedding_001"
    model_id: "gemini-embedding-001"
    display_name: "Gemini Embedding 001"
    dimensions: 3072
    pricing_model:
      usd_per1m_tokens: 0.15
```

###### OCI Generative AI

OCI Generative AI models are configured through the `embabel-agent-starter-oci-genai` starter dependency.
The starter registers OCI chat and embedding models from bundled metadata and uses the OCI Java SDK authentication providers.

When the standard OpenAI provider is not on the classpath, the OCI starter supplies OCI defaults for Embabel’s default
LLM and embedding model:

```
embabel.models.default-llm=cohere.command-a-03-2025
embabel.models.default-embedding-model=cohere.embed-v4.0
```

Override those values in application configuration if you want another OCI model.
Use OCI model ids for Embabel model selection.
The starter’s Spring bean names are Java-friendly aliases, for example `cohere_command_a` for `cohere.command-a-03-2025`
and `llama_33_70b` for `meta.llama-3.3-70b-instruct`.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.models.ocigenai.authentication-type` | Enum | `FILE` | Authentication provider to use. Supported values are `FILE`, `INSTANCE_PRINCIPAL`, `RESOURCE_PRINCIPAL`, `WORKLOAD_IDENTITY`, `SESSION_TOKEN` and `SIMPLE`. |
| `embabel.agent.platform.models.ocigenai.config-file` | String | `~/.oci/config` | OCI config file path for `FILE` authentication, or optional config file path for `SESSION_TOKEN` authentication. |
| `embabel.agent.platform.models.ocigenai.profile` | String | `DEFAULT` | OCI config profile name. |
| `embabel.agent.platform.models.ocigenai.region` | String | *(none)* | OCI region id, such as `us-chicago-1`. Used when an explicit endpoint is not set. |
| `embabel.agent.platform.models.ocigenai.endpoint` | String | *(none)* | Explicit OCI Generative AI inference endpoint URL. Overrides region-based endpoint selection. |
| `embabel.agent.platform.models.ocigenai.compartment-id` | String | *(none)* | OCI compartment OCID used for chat and embedding requests. Required. |
| `embabel.agent.platform.models.ocigenai.serving-mode` | Enum | `ON_DEMAND` | OCI serving mode. Supported values are `ON_DEMAND` and `DEDICATED`. |
| `embabel.agent.platform.models.ocigenai.endpoint-id` | String | *(none)* | Dedicated serving endpoint OCID. Required when `serving-mode` is `DEDICATED`. |
| `embabel.agent.platform.models.ocigenai.tenant-id` | String | *(none)* | Tenancy OCID for `SIMPLE`, `SESSION_TOKEN`, or workload identity configuration as required by the selected OCI authentication provider. |
| `embabel.agent.platform.models.ocigenai.user-id` | String | *(none)* | User OCID for `SIMPLE` or builder-based `SESSION_TOKEN` authentication. |
| `embabel.agent.platform.models.ocigenai.fingerprint` | String | *(none)* | API key fingerprint for `SIMPLE` or builder-based `SESSION_TOKEN` authentication. |
| `embabel.agent.platform.models.ocigenai.private-key` | String | *(none)* | PEM private key content for `SIMPLE` authentication. Prefer `private-key-file` where possible. |
| `embabel.agent.platform.models.ocigenai.private-key-file` | String | *(none)* | Path to a PEM private key file for `SIMPLE` or builder-based `SESSION_TOKEN` authentication. |
| `embabel.agent.platform.models.ocigenai.pass-phrase` | String | *(none)* | Private key pass phrase, if the configured private key is encrypted. |
| `embabel.agent.platform.models.ocigenai.session-token` | String | *(none)* | Session token value for builder-based `SESSION_TOKEN` authentication. |
| `embabel.agent.platform.models.ocigenai.session-token-file` | String | *(none)* | Path to a session token file for builder-based `SESSION_TOKEN` authentication. |
| `embabel.agent.platform.models.ocigenai.workload-identity-token-path` | String | *(none)* | Workload identity token path for `WORKLOAD_IDENTITY` authentication. |
| `embabel.agent.platform.models.ocigenai.federation-endpoint` | String | *(none)* | Optional federation endpoint for principal-based authentication. |
| `embabel.agent.platform.models.ocigenai.max-attempts` | Int | `10` | Maximum retry attempts for OCI GenAI requests. |
| `embabel.agent.platform.models.ocigenai.backoff-millis` | Long | `5000` | Initial retry backoff in milliseconds. |
| `embabel.agent.platform.models.ocigenai.backoff-multiplier` | Double | `5.0` | Retry backoff multiplier. |
| `embabel.agent.platform.models.ocigenai.backoff-max-interval` | Long | `180000` | Maximum retry backoff interval in milliseconds. |

If your application exposes Spring Boot Actuator `env` or `configprops` values, secure those endpoints and sanitize OCI
credential property names such as `pass-phrase`, `session-token` and `private-key`.

##### HTTP Client Configuration

From `NettyClientFactoryProperties` - configuration for the HTTP client used by model providers (OpenAI, Anthropic, etc.) when making API calls.

Embabel uses Reactor Netty as the HTTP client for improved performance and non-blocking I/O.
This is particularly important for LLM API calls which can have long response times.

###### Dependency Requirement

To use the Netty client, you must manually add the following autoconfiguration dependency to your project:

```
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-netty-client-autoconfigure</artifactId>
</dependency>
```

For Gradle:

```
implementation 'com.embabel.agent:embabel-agent-netty-client-autoconfigure'
```

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.http-client.connect-timeout` | Duration | `25s` | Connection timeout for establishing HTTP connections to model providers |
| `embabel.agent.platform.http-client.read-timeout` | Duration | `1m` | Read timeout (response timeout) for receiving responses from model providers. Increase this value for models that generate long responses or when using extended thinking features. |

Example Configuration

```
embabel:
  agent:
    platform:
      http-client:
        connect-timeout: 10s
        read-timeout: 10m
```

|  |  |
| --- | --- |
|  | For models with extended thinking enabled (like Claude with thinking mode), consider increasing `read-timeout` to `10m` or higher to accommodate longer processing times. |

###### When to Adjust Timeouts

* **Long-running LLM calls**: If you experience timeout errors during complex reasoning tasks, increase `read-timeout`
* **Slow network environments**: Increase `connect-timeout` if connection establishment is failing
* **Streaming responses**: The `read-timeout` applies to the initial response; streaming content has its own handling

|  |  |
| --- | --- |
|  | The HTTP client configuration applies to all model providers that use Spring’s `RestClient` and `WebClient`, including OpenAI, Anthropic, and OpenAI-compatible endpoints. |

##### Server-Sent Events

From `AgentPlatformProperties.SseConfig` - server-sent events configuration.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.sse.max-buffer-size` | Int | `100` | Maximum buffer size for SSE |
| `embabel.agent.platform.sse.max-process-buffers` | Int | `1000` | Maximum number of process buffers |

##### REST Endpoints

From `AgentPlatformProperties.RestConfig` - toggles for the platform’s built-in REST endpoints.
Each flag controls whether the corresponding endpoint is exposed.
When disabled, the corresponding controller bean is not registered, so the endpoint is absent from
Swagger/OpenAPI documentation and routing rejects calls (HTTP 404, or HTTP 405 if another method
remains mapped at the same path).

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.rest.process-status-enabled` | Boolean | `true` | Whether `GET /api/v1/process/{id}` (process status) is exposed |
| `embabel.agent.platform.rest.process-kill-enabled` | Boolean | `true` | Whether `DELETE /api/v1/process/{id}` (terminate process) is exposed |
| `embabel.agent.platform.rest.process-events-enabled` | Boolean | `true` | Whether `GET /events/process/{id}` (SSE event stream) is exposed. When disabled, the SSE controller is not registered. |

##### Test Configuration

From `AgentPlatformProperties.TestConfig` - test configuration.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.test.mock-mode` | Boolean | `true` | Whether to enable mock mode for testing |

##### Process Repository Configuration

From `ProcessRepositoryProperties` - configuration for the agent process repository.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.process-repository.window-size` | Int | `1000` | Maximum number of agent processes to keep in memory when using default `InMemoryAgentProcessRepository`. When exceeded, oldest processes are evicted. |

##### Standalone LLM Configuration

###### LLM Operations Prompts

From `LlmOperationsPromptsProperties` - properties for ChatClientLlmOperations operations.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.llm-operations.prompts.maybe-prompt-template` | String | `maybe_prompt_contribution` | Template to use for the "maybe" prompt, which can enable a failure result if the LLM does not have enough information to create the desired output structure |
| `embabel.llm-operations.prompts.generate-examples-by-default` | Boolean | `true` | Whether to generate examples by default |
| `embabel.llm-operations.prompts.default-timeout` | Duration | `60s` | Default timeout for operations |

###### LLM Data Binding

From `LlmDataBindingProperties` - data binding properties with retry configuration for LLM operations.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.llm-operations.data-binding.max-attempts` | Int | `10` | Maximum retry attempts for data binding |
| `embabel.llm-operations.data-binding.fixed-backoff-millis` | Long | `30` | Fixed backoff time in milliseconds between retries |

##### Additional Model Providers

###### AWS Bedrock

From `BedrockProperties` - AWS Bedrock model configuration properties.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.models.bedrock.models` | List | `[]` | List of Bedrock models to configure |
| `embabel.models.bedrock.models[].name` | String | `""` | Model name |
| `embabel.models.bedrock.models[].knowledge-cutoff` | String | `""` | Knowledge cutoff date |
| `embabel.models.bedrock.models[].input-price` | Double | `0.0` | Input token price |
| `embabel.models.bedrock.models[].output-price` | Double | `0.0` | Output token price |

###### ONNX Embeddings

From `OnnxEmbeddingProperties` - configuration for local ONNX embedding models.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.agent.platform.models.onnx.embeddings.enabled` | Boolean | `true` | Whether to enable ONNX embedding service |
| `embabel.agent.platform.models.onnx.embeddings.model-uri` | String | *(HuggingFace all-MiniLM-L6-v2)* | URI to the ONNX model file (HuggingFace URL or `file://` path) |
| `embabel.agent.platform.models.onnx.embeddings.tokenizer-uri` | String | *(HuggingFace all-MiniLM-L6-v2)* | URI to the tokenizer JSON file |
| `embabel.agent.platform.models.onnx.embeddings.dimensions` | Int | `384` | Embedding dimensions |
| `embabel.agent.platform.models.onnx.embeddings.model-name` | String | `all-MiniLM-L6-v2` | Name for the embedding model |
| `embabel.agent.platform.models.onnx.embeddings.cache-dir` | String | `~/.embabel/models` | Local cache directory for downloaded model files |

###### Docker Local Models

From `DockerProperties` - configuration for Docker local models (OpenAI-compatible).

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `embabel.docker.models.base-url` | String | `localhost:12434/engines` | Base URL for Docker model endpoint |
| `embabel.docker.models.max-attempts` | Int | `10` | Maximum retry attempts |
| `embabel.docker.models.backoff-millis` | Long | `2000` | Initial backoff time in milliseconds |
| `embabel.docker.models.backoff-multiplier` | Double | `5.0` | Backoff multiplier |
| `embabel.docker.models.backoff-max-interval` | Long | `180000` | Maximum backoff interval in milliseconds |

### 4.6. Annotation model

Embabel provides a Spring-style annotation model to define agents, actions, goals, and conditions.
This is the recommended model to use in Java, and remains compelling in Kotlin.

#### 4.6.1. The `@Agent` annotation

This annotation is used on a class to define an agent.
It is a Spring stereotype annotation, so it triggers Spring component scanning.
Your agent class will automatically be registered as a Spring bean.
It will also be registered with the agent framework, so it can be used in agent processes.

You must provide the `description` parameter, which is a human-readable description of the agent.
This is particularly important as it may be used by the LLM in agent selection.

#### 4.6.2. The `@EmbabelComponent` annotation

This annotation is used on a class to indicate that this class exposes actions, goals and conditions that may be used by agents, but is not an agent in itself.
It is a Spring stereotype annotation, so it triggers Spring component scanning.
Your Embabel component class will automatically be registered as a Spring bean.
It will also be registered with the agent framework, so its actions, goals and conditions can be used in agent processes.

Embabel Components are most useful in combination with the [Utility AI planner](#reference.planners__utility) that selects the most valuable next action among all available actions.

#### 4.6.3. The `@Action` annotation

The `@Action` annotation is used to mark methods that perform actions within an agent.

Action metadata can be specified on the annotation, including:

* `description`: A human-readable description of the action.
* `pre`: A list of preconditions *additional to the input types* that must be satisfied before the action can be executed.
* `post`: A list of postconditions *additional to the output type(s)* that may be satisfied after the action is executed.
* `canRerun`: A boolean indicating whether the action can be rerun if it has already been executed.
  Defaults to false.
* `readOnly`: A boolean indicating whether the action has no external side effects.
  Read-only actions only analyze data and produce derived objects without modifying external systems (APIs, databases, files, etc.).
  This is useful for learning/catchup modes where you want to ingest and understand data without triggering mutations.
  Defaults to false.
* `clearBlackboard`: A boolean indicating whether to clear the blackboard after this action completes.
  When true, all objects on the blackboard are removed except the action’s output.
  This is useful for resetting context in multi-step workflows.
  It can also make persistence of flows more efficient by dispensing with objects that are no longer needed.
  Defaults to false.
* `cost`:Relative cost of the action from 0-1. Defaults to 0.0.
* `value`: Relative value of performing the action from 0-1. Defaults to 0.0.

##### Clearing the Blackboard

The `clearBlackboard` attribute is useful in two scenarios:

1. **Multi-step workflows** where you want to reset the processing context
2. **Looping states** where an action returns to a previously-visited state type

When an action with `clearBlackboard = true` completes, all objects on the blackboard are removed except the action’s output.
This prevents accumulated intermediate data from affecting subsequent processing and enables loops.

###### Looping States

The most common use case for `clearBlackboard` is enabling loops in state-based workflows:

Java
:   ```
    @State
    record ProcessingState(String data, int iteration) {
        @Action(clearBlackboard = true)  (1)
        LoopOutcome process() {
            if (iteration >= 3) {
                return new DoneState(data);
            }
            return new ProcessingState(data + "+", iteration + 1);  (2)
        }
    }
    ```

Kotlin
:   ```
    @State
    data class ProcessingState(val data: String, val iteration: Int) {
        @Action(clearBlackboard = true)  (1)
        fun process(): LoopOutcome {
            return if (iteration >= 3) {
                DoneState(data)
            } else {
                ProcessingState("$data+", iteration + 1)  (2)
            }
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `clearBlackboard = true` enables returning to the same state type |
| **2** | Without clearing, returning `ProcessingState` would be blocked since the type already exists |

See [Using States](reference.states) for more details on looping state patterns.

###### Resetting Context

You can also use `clearBlackboard` to reset context in multi-step workflows:

Java
:   ```
    @Agent(description = "Multi-step document processing")
    public class DocumentProcessor {

        @Action(clearBlackboard = true)  (1)
        public ProcessedDocument preprocess(RawDocument doc) {
            return new ProcessedDocument(doc.getContent().trim());
        }

        @AchievesGoal(description = "Produce final output")
        @Action
        public FinalOutput transform(ProcessedDocument doc) {  (2)
            return new FinalOutput(doc.getContent().toUpperCase());
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Multi-step document processing")
    class DocumentProcessor {

        @Action(clearBlackboard = true)  (1)
        fun preprocess(doc: RawDocument): ProcessedDocument {
            return ProcessedDocument(doc.content.trim())
        }

        @AchievesGoal(description = "Produce final output")
        @Action
        fun transform(doc: ProcessedDocument): FinalOutput {  (2)
            return FinalOutput(doc.content.uppercase())
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | After `preprocess` completes, the blackboard is cleared and only `ProcessedDocument` remains. The original `RawDocument` is removed. |
| **2** | The `transform` action receives only the `ProcessedDocument`, not any earlier inputs. |

|  |  |
| --- | --- |
|  | Avoid using `clearBlackboard` on goal-achieving actions (those with `@AchievesGoal`). Clearing the blackboard removes `hasRun` tracking conditions, which may interfere with goal satisfaction. Use `clearBlackboard` on intermediate actions instead. |

##### Dynamic Cost Computation with `@Cost`

While the `cost` and `value` fields on `@Action` allow specifying static values, you can compute these dynamically at planning time using the `@Cost` annotation.
This is useful when the cost of an action depends on the current state of the blackboard.

The `@Cost` annotation marks a method that returns a cost value (a `double` between 0.0 and 1.0).
You then reference this method from the `@Action` annotation using `costMethod` or `valueMethod`.

Java
:   ```
    @Agent(description = "Processor with dynamic cost")
    public class DataProcessor {

        @Cost(name = "processingCost")  (1)
        public double computeProcessingCost(@Nullable LargeDataSet data) {  (2)
            if (data != null && data.size() > 1000) {
                return 0.9;  // High cost for large datasets
            }
            return 0.1;  // Low cost for small or missing datasets
        }

        @Action(costMethod = "processingCost")  (3)
        public ProcessedData process(RawData input) {
            return new ProcessedData(input.transform());
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Processor with dynamic cost")
    class DataProcessor {

        @Cost(name = "processingCost")  (1)
        fun computeProcessingCost(data: LargeDataSet?): Double {  (2)
            return if (data != null && data.size() > 1000) {
                0.9  // High cost for large datasets
            } else {
                0.1  // Low cost for small or missing datasets
            }
        }

        @Action(costMethod = "processingCost")  (3)
        fun process(input: RawData): ProcessedData {
            return ProcessedData(input.transform())
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | The `@Cost` annotation marks a method for dynamic cost computation. The `name` parameter identifies this cost method. |
| **2** | Domain object parameters in `@Cost` methods must be nullable. If the object isn’t on the blackboard, `null` is passed. |
| **3** | The `costMethod` field references the `@Cost` method by name. |

Key differences from `@Condition` methods:

* All domain object parameters in `@Cost` methods must be nullable (use `@Nullable` in Java or `?` in Kotlin)
* When a domain object is not available on the blackboard, `null` is passed instead of causing the method to fail
* The method must return a `double` between 0.0 and 1.0
* The `Blackboard` can be passed as a parameter for direct access to all available objects

You can also compute dynamic value using `valueMethod`:

Java
:   ```
    @Agent(description = "Agent with dynamic value computation")
    public class PrioritizedAgent {

        @Cost(name = "urgencyValue")
        public double computeUrgency(@Nullable Task task) {
            if (task == null) {
                return 0.5;
            }
            if (task.getPriority() == Priority.HIGH) {
                return 1.0;
            }
            if (task.getPriority() == Priority.MEDIUM) {
                return 0.6;
            }
            return 0.2;
        }

        @AchievesGoal(description = "Process high-priority tasks")
        @Action(valueMethod = "urgencyValue")
        public Result processTask(Task task) {
            return new Result(String.format("Processed: %s", task.getName()));
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Agent with dynamic value computation")
    class PrioritizedAgent {

        @Cost(name = "urgencyValue")
        fun computeUrgency(task: Task?): Double {
            return when {
                task == null -> 0.5
                task.priority == Priority.HIGH -> 1.0
                task.priority == Priority.MEDIUM -> 0.6
                else -> 0.2
            }
        }

        @AchievesGoal(description = "Process high-priority tasks")
        @Action(valueMethod = "urgencyValue")
        fun processTask(task: Task): Result {
            return Result("Processed: ${task.name}")
        }
    }
    ```

|  |  |
| --- | --- |
|  | The `@Cost` method is called during planning, before the action executes. It allows the planner to make informed decisions about which actions to prefer based on runtime state. |

|  |  |
| --- | --- |
|  | Dynamic cost is especially useful with **Utility planning** (`PlannerType.UTILITY`), where cost/value tradeoffs are a core concept. The utility planner evaluates actions based on their net value (value minus cost), making dynamic cost computation essential for sophisticated decision-making. |

#### 4.6.4. The `@Condition` annotation

The `@Condition` annotation is used to mark methods that evaluate conditions.
They can take an `OperationContext` parameter to access the blackboard and other infrastructure.
If they take domain object parameters, the condition will automatically be false until suitable instances are available.

> Condition methods should not have side effects—​for example, on the blackboard.
> This is important because they may be called multiple times.

##### Dynamic Conditions with SpEL

In addition to using `@Condition` methods, you can specify dynamic preconditions directly on `@Action` annotations using Spring Expression Language (SpEL).
These expressions are evaluated against the blackboard, allowing you to create conditions based on runtime state without writing separate condition methods.

The expression language is pluggable, but currently SpEL is the only supported implementation.
See the [Spring Expression Language (SpEL) documentation](https://docs.spring.io/spring-framework/reference/core/expressions.html) for full syntax details.

SpEL conditions are specified in the `pre` array with a `spel:` prefix:

Java
:   ```
    @Action(
        pre = {"spel:assessment.urgency > 0.5"}  (1)
    )
    public void handleUrgentIssue(Issue issue, IssueAssessment assessment) {
        // This action only runs when urgency exceeds 0.5
    }
    ```

Kotlin
:   ```
    @Action(
        pre = ["spel:assessment.urgency > 0.5"]  (1)
    )
    fun handleUrgentIssue(issue: Issue, assessment: IssueAssessment) {
        // This action only runs when urgency exceeds 0.5
    }
    ```

|  |  |
| --- | --- |
| **1** | The `spel:` prefix indicates this is a SpEL expression evaluated against the blackboard. |

###### Expression Syntax

SpEL expressions reference blackboard objects by their binding names (typically the camelCase form of the class name).
The expression must evaluate to a boolean.

Java
:   ```
    @Agent(description = "Issue triage agent")
    public class IssueTriageAgent {

        @Action(
            pre = {"spel:issueAssessment.urgency > 0.0"}  (1)
        )
        public void escalateUrgentIssue(
                GHIssue issue,
                IssueAssessment issueAssessment
        ) {
            logger.info("Escalating urgent issue #{}", issue.getNumber());
        }

        @Action(
            pre = {"spel:ghIssue instanceof T(org.kohsuke.github.GHPullRequest) && ghIssue.changedFiles > 10"}  (2)
        )
        public void reviewLargePullRequest(
                GHPullRequest issue,
                PullRequestAssessment assessment
        ) {
            logger.info("Large PR detected: #{} with {} files changed",
                issue.getNumber(), issue.getChangedFiles());
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Issue triage agent")
    class IssueTriageAgent {

        @Action(
            pre = ["spel:issueAssessment.urgency > 0.0"]  (1)
        )
        fun escalateUrgentIssue(
            issue: GHIssue,
            issueAssessment: IssueAssessment
        ) {
            logger.info("Escalating urgent issue #{}", issue.number)
        }

        @Action(
            pre = ["spel:ghIssue instanceof T(org.kohsuke.github.GHPullRequest) && ghIssue.changedFiles > 10"]  (2)
        )
        fun reviewLargePullRequest(
            issue: GHPullRequest,
            assessment: PullRequestAssessment
        ) {
            logger.info("Large PR detected: #{} with {} files changed",
                issue.number, issue.changedFiles)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Simple property comparison: action fires only when `urgency` property exceeds 0.0. |
| **2** | Type check with property access: action fires only for pull requests with more than 10 changed files. The `T()` operator references a Java type for `instanceof` checks. |

###### Collection Filtering

SpEL’s collection selection syntax (`?[]`) is useful for checking conditions on collections stored in the blackboard:

Java
:   ```
    @Action(
        pre = {
            "spel:newEntity.newEntities.?[#this instanceof T(com.example.domain.Issue) " +
            "&& !(#this instanceof T(com.example.domain.PullRequest))].size() > 0"  (1)
        }
    )
    public IssueAssessment reactToNewIssue(
            GHIssue ghIssue,
            NewEntity<?> newEntity,
            Ai ai
    ) {
        // Fires only when newEntities contains Issues that aren't PullRequests
        return ai.withDefaultLlm()  // Example uses claude-sonnet-4
                 .creating(IssueAssessment.class)
                 .fromTemplate("issue_triage", Map.of("issue", ghIssue));
    }

    @Action(
        pre = {
            "spel:newEntity.newEntities.?[#this instanceof T(com.example.domain.PullRequest)].size() > 0"  (2)
        }
    )
    public PullRequestAssessment reactToNewPullRequest(
            GHPullRequest pr,
            NewEntity<?> newEntity,
            Ai ai
    ) {
        // Fires only when newEntities contains PullRequests
        return ai.withDefaultLlm()  // Example uses claude-sonnet-4
                 .creating(PullRequestAssessment.class)
                 .fromTemplate("pr_triage", Map.of("pr", pr));
    }
    ```

Kotlin
:   ```
    @Action(
        pre = [
            "spel:newEntity.newEntities.?[#this instanceof T(com.example.domain.Issue) " +
            "&& !(#this instanceof T(com.example.domain.PullRequest))].size() > 0"  (1)
        ]
    )
    fun reactToNewIssue(
        ghIssue: GHIssue,
        newEntity: NewEntity<*>,
        ai: Ai
    ): IssueAssessment {
        // Fires only when newEntities contains Issues that aren't PullRequests
        return ai.withDefaultLlm()  // Example uses claude-sonnet-4
            .creating(IssueAssessment::class.java)
            .fromTemplate("issue_triage", mapOf("issue" to ghIssue))
    }

    @Action(
        pre = [
            "spel:newEntity.newEntities.?[#this instanceof T(com.example.domain.PullRequest)].size() > 0"  (2)
        ]
    )
    fun reactToNewPullRequest(
        pr: GHPullRequest,
        newEntity: NewEntity<*>,
        ai: Ai
    ): PullRequestAssessment {
        // Fires only when newEntities contains PullRequests
        return ai.withDefaultLlm()  // Example uses claude-sonnet-4
            .creating(PullRequestAssessment::class.java)
            .fromTemplate("pr_triage", mapOf("pr" to pr))
    }
    ```

|  |  |
| --- | --- |
| **1** | The `?[]` operator filters the collection. `#this` refers to each element. This expression checks that at least one element is an `Issue` but not a `PullRequest`. |
| **2** | Simpler filter checking for `PullRequest` instances. |

###### Common SpEL Patterns

| Pattern | Description |
| --- | --- |
| `spel:obj.property > value` | Simple property comparison |
| `spel:obj instanceof T(com.example.Type)` | Type checking using fully qualified class name |
| `spel:collection.size() > 0` | Check collection is not empty |
| `spel:collection.?[condition].size() > 0` | Check that filtered collection has elements |
| `spel:obj.property != null` | Null checking |
| `spel:condition1 && condition2` | Combining conditions with AND |
| `spel:condition1 || condition2` | Combining conditions with OR |

|  |  |
| --- | --- |
|  | Use SpEL conditions for simple property checks and type discrimination. For complex logic or conditions that need to be reused across multiple actions, prefer `@Condition` methods. For reactive scenarios where you simply want an action to fire when a specific type is added to the blackboard, consider using the [`trigger` field](#reference.annotations_trigger) insteadâit’s simpler than writing a SpEL expression. |

|  |  |
| --- | --- |
|  | Blackboard binding names are derived from the class name in camelCase by default. You can specify explicit binding names using `outputBinding` on actions or by adding objects to the blackboard with specific names. |

> Both Action and Condition methods may be inherited from superclasses.
> That is, annotated methods on superclasses will be treated as actions on a subclass instance.

> Give your Action and Condition methods unique names, so the planner can distinguish between them.

#### 4.6.5. Parameters

`@Action` methods must have at least one parameter.
`@Condition` methods must have zero or more parameters, but otherwise follow the same rules as `@Action` methods regarding parameters.
Ordering of parameters is not important.

Parameters fall in two categories:

* *Domain objects*.
  These are the normal inputs for action methods.
  They are backed by the blackboard and will be used as inputs to the action method.
  A nullable domain object parameter will be populated if it is non-null on the blackboard.
  This enables nice-to-have parameters that are not required for the action to run.
  In Kotlin, use a nullable parameter with `?`: in Java, mark the parameter with the `org.springframework.lang.Nullable` or another `Nullable` annotation.
* *Infrastructure parameters*, such as the `OperationContext`, `ProcessContext`, and `Ai` may be used in action or condition methods.

|  |  |
| --- | --- |
|  | Domain objects drive planning, specifying the preconditions to an action. |

The `ActionContext` or `ExecutingOperationContext` subtype can be used in action methods.
It adds `asSubProcess` methods that can be used to run other agents in subprocesses.
This is an important element of composition.

> Use the least specific type possible for parameters.
> Use `OperationContext` unless you are creating a subprocess.

##### Custom Parameters

Besides two default parameter categories described above, you can provide your own parameters by implementing the `ActionMethodArgumentResolver` interface.
The two main methods of this interface are:

* `supportsParameter`, which indicates what kind of parameters are supported, and
* `resolveArgument`, which resolves the argument into an object used to invoke the action method.

|  |  |
| --- | --- |
|  | Note the similarity with Spring MVC, where you can provide custom parameters by implementing a `HandlerMethodArgumentResolver`. |

> All default parameters are provided by `ActionMethodArgumentResolver` implementations.

To register your custom argument resolver, provide it to the `DefaultActionMethodManager` component in your Spring configuration.
Typically, you will register (some of) the defaults as well your custom resolver, in order to support the default parameters.

|  |  |
| --- | --- |
|  | Make sure to register the `BlackboardArgumentResolver` as last resolver, to ensure that others take precedence. |

##### The `@Provided` Annotation

The `@Provided` annotation marks an action method parameter as being provided by the platform context (such as Spring’s `ApplicationContext`) rather than resolved from the blackboard.

This is particularly useful for:

* **Accessing the enclosing component** from within `@State` classes (which must be static or top-level)
* **Injecting services** that aren’t domain objects but are needed for processing
* **Accessing configuration** or other platform-managed beans

Java
:   ```
    @EmbabelComponent
    public class ReservationFlow {

        private final BookingService bookingService;
        private final NotificationService notificationService;

        public ReservationFlow(BookingService bookingService, NotificationService notificationService) {
            this.bookingService = bookingService;
            this.notificationService = notificationService;
        }

        @Action
        public CollectDetails start(UserRequest request) {
            return new CollectDetails(request.customerId());
        }

        @State
        public record CollectDetails(String customerId) {

            @Action
            public ConfirmReservation confirm(
                    ReservationDetails details,                    (1)
                    @Provided ReservationFlow flow                 (2)
            ) {
                var booking = flow.bookingService.reserve(details);
                flow.notificationService.sendConfirmation(booking);
                return new ConfirmReservation(booking);
            }
        }

        @State
        public record ConfirmReservation(Booking booking) {
            @AchievesGoal(description = "Reservation completed")
            @Action
            public BookingResult complete() {
                return new BookingResult(booking);
            }
        }
    }
    ```

Kotlin
:   ```
    @EmbabelComponent
    class ReservationFlow(
        private val bookingService: BookingService,
        private val notificationService: NotificationService
    ) {

        @Action
        fun start(request: UserRequest): CollectDetails {
            return CollectDetails(request.customerId)
        }

        @State
        data class CollectDetails(val customerId: String) {

            @Action
            fun confirm(
                details: ReservationDetails,                    (1)
                @Provided flow: ReservationFlow                 (2)
            ): ConfirmReservation {
                val booking = flow.bookingService.reserve(details)
                flow.notificationService.sendConfirmation(booking)
                return ConfirmReservation(booking)
            }
        }

        @State
        data class ConfirmReservation(val booking: Booking) {
            @AchievesGoal(description = "Reservation completed")
            @Action
            fun complete(): BookingResult {
                return BookingResult(booking)
            }
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `ReservationDetails` is a domain object resolved from the blackboard. |
| **2** | `ReservationFlow` is injected via `@Provided` from the Spring context - this gives access to the services in the enclosing component. |

###### How It Works

When Spring is available, the `SpringContextProvider` resolves `@Provided` parameters by looking up beans from the `ApplicationContext`.
The parameter type must match a bean in the context.

Java
:   ```
    @State
    public record ProcessingState(String data) {

        @Action
        public NextState process(
            @Provided MyService myService,     (1)
            @Provided AppConfig config         (2)
        ) {
            var result = myService.process(data, config.getSetting());
            return new NextState(result);
        }
    }
    ```

Kotlin
:   ```
    @State
    data class ProcessingState(val data: String) {

        @Action
        fun process(
            @Provided myService: MyService,     (1)
            @Provided config: AppConfig,        (2)
        ): NextState {
            val result = myService.process(data, config.setting)
            return NextState(result)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Any Spring bean can be injected using `@Provided`. |
| **2** | Multiple `@Provided` parameters can be used in a single method. |

###### When to Use `@Provided`

Use `@Provided` when you need access to:

* The enclosing `@EmbabelComponent` or `@Agent` class from a `@State` action
* Services that are infrastructure concerns, not domain objects
* Configuration or environment values

Do **not** use `@Provided` for:

* Domain objects that should drive planning (use regular parameters instead)
* Objects that need to be tracked on the blackboard

|  |  |
| --- | --- |
|  | Since `@State` classes must be static nested classes or top-level classes, `@Provided` is the recommended way to access the enclosing component’s services. This keeps state classes serializable while still providing access to dependencies. |

|  |  |
| --- | --- |
|  | `@Provided` parameters are resolved before blackboard parameters. If a type could come from either source, `@Provided` takes precedence. |

#### 4.6.6. Binding by name

The `@RequireNameMatch` annotation can be used to [bind parameters by name](#reference.flow__binding).

#### 4.6.7. Reactive triggers with `trigger`

The `trigger` field on the `@Action` annotation enables reactive behavior where an action only fires when a specific type is the *most recently added* value to the blackboard.
This is useful in event-driven scenarios where you want to react to a particular event even when multiple parameters of various types are available.

For example, in a chat system you might want an action to fire only when a new user message arrives, not when other context is updated:

Java
:   ```
    @Agent(description = "Chat message handler")
    public class ChatAgent {

        @AchievesGoal(description = "Respond to user message")
        @Action(trigger = UserMessage.class)  (1)
        public Response handleMessage(
                UserMessage message,
                Conversation conversation  (2)
        ) {
            return new Response("Received: " + message.content());
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Chat message handler")
    class ChatAgent {

        @AchievesGoal(description = "Respond to user message")
        @Action(trigger = UserMessage::class)  (1)
        fun handleMessage(
            message: UserMessage,
            conversation: Conversation  (2)
        ): Response {
            return Response("Received: ${message.content}")
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | The `trigger` field means this action only fires when `UserMessage` is the last result added to the blackboard. |
| **2** | `Conversation` must also be available, but doesn’t need to be the triggering event. |

Without `trigger`, an action fires as soon as all its parameters are available on the blackboard.
With `trigger`, the specified type must additionally be the most recent value added.

This is particularly useful when:

* You have multiple actions that could handle different event types
* You want to distinguish between "data available" and "event just occurred"
* You’re building event-driven or reactive workflows

Java
:   ```
    @Agent(description = "Multi-event processor")
    public class EventProcessor {

        @Action(trigger = EventA.class)  (1)
        public Result handleEventA(EventA eventA, EventB eventB) {
            return new Result("Triggered by A");
        }

        @AchievesGoal(description = "Handle event B")
        @Action(trigger = EventB.class)  (2)
        public Result handleEventB(EventA eventA, EventB eventB) {
            return new Result("Triggered by B");
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Multi-event processor")
    class EventProcessor {

        @Action(trigger = EventA::class)  (1)
        fun handleEventA(eventA: EventA, eventB: EventB): Result {
            return Result("Triggered by A")
        }

        @AchievesGoal(description = "Handle event B")
        @Action(trigger = EventB::class)  (2)
        fun handleEventB(eventA: EventA, eventB: EventB): Result {
            return Result("Triggered by B")
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `handleEventA` fires when `EventA` is added (and `EventB` is available). |
| **2** | `handleEventB` fires when `EventB` is added (and `EventA` is available). |

|  |  |
| --- | --- |
|  | The `trigger` field checks that the specified type matches the `lastResult()` on the blackboard. The last result is the most recent object added via any binding operation. |

#### 4.6.8. Handling of return types

Action methods normally return a single domain object.

Nullable return types are allowed.
Returning null will trigger replanning.
There may or not be an alternative path from that point, but it won’t be what the planner was previously trying to achieve.

There is a special case where the return type can essentially be a union type, where the action method can return one ore more of several types.
This is achieved by a return type implementing the `SomeOf` tag interface.
Implementations of this interface can have multiple nullable fields.
Any non-null values will be bound to the blackboard, and the postconditions of the action will include all possible fields of the return type.

For example:

Java
:   ```
    // Must implement the SomeOf interface
    public record FrogOrDog(
        @Nullable Frog frog,
        @Nullable Dog dog
    ) implements SomeOf {}

    @Agent(description = "Illustrates use of the SomeOf interface")
    public class ReturnsFrogOrDog {

        @Action
        public FrogOrDog frogOrDog() {
            return new FrogOrDog(new Frog("Kermit"), null);
        }

        // This works because the frog field of the return type was set
        @AchievesGoal(description = "Create a prince from a frog")
        @Action
        public PersonWithReverseTool toPerson(Frog frog) {
            return new PersonWithReverseTool(frog.name());
        }
    }
    ```

Kotlin
:   ```
    // Must implement the SomeOf interface
    data class FrogOrDog(
        val frog: Frog? = null,
        val dog: Dog? = null,
    ) : SomeOf

    @Agent(description = "Illustrates use of the SomeOf interface")
    class ReturnsFrogOrDog {

        @Action
        fun frogOrDog(): FrogOrDog {
            return FrogOrDog(frog = Frog("Kermit"))
        }

        // This works because the frog field of the return type was set
        @AchievesGoal(description = "Create a prince from a frog")
        @Action
        fun toPerson(frog: Frog): PersonWithReverseTool {
            return PersonWithReverseTool(frog.name)
        }
    }
    ```

This enables routing scenarios in an elegant manner.

|  |  |
| --- | --- |
|  | Multiple fields of the `SomeOf` instance may be non-null and this is not an error. It may enable the most appropriate routing. |

Routing can also be achieved via subtypes, as in the following example:

Java
:   ```
    @Action
    public Intent classifyIntent(UserInput userInput) {  (1)
        return switch (userInput.content()) {
            case "billing" -> new BillingIntent();
            case "sales" -> new SalesIntent();
            case "service" -> new ServiceIntent();
            default -> {
                logger.warn("Unknown intent: {}", userInput);
                yield null;
            }
        };
    }

    @Action
    public IntentClassificationSuccess billingAction(BillingIntent intent) {  (2)
        return new IntentClassificationSuccess("billing");
    }

    @Action
    public IntentClassificationSuccess salesAction(SalesIntent intent) {
        return new IntentClassificationSuccess("sales");
    }

    // ...
    ```

Kotlin
:   ```
    @Action
    fun classifyIntent(userInput: UserInput): Intent? = (1)
        when (userInput.content) {
            "billing" -> BillingIntent()
            "sales" -> SalesIntent()
            "service" -> ServiceIntent()
            else -> {
                loggerFor<IntentReceptionAgent>().warn("Unknown intent: $userInput")
                null
            }
        }

    @Action
    fun billingAction(intent: BillingIntent): IntentClassificationSuccess { (2)
        return IntentClassificationSuccess("billing")
    }

    @Action
    fun salesAction(intent: SalesIntent): IntentClassificationSuccess {
        return IntentClassificationSuccess("sales")
    }

    // ...
    ```

|  |  |
| --- | --- |
| **1** | Classification action returns supertype `Intent`. Real classification would likely use an LLM. |
| **2** | `billingAction` and other action methods takes a subtype of `Intent`, so will only be invoked if the classification action returned that subtype. |

#### 4.6.9. Action method implementation

Embabel makes it easy to seamlessly integrate LLM invocation and application code, using common types.
An `@Action` method is a normal method, and can use any libraries or frameworks you like.

The only special thing about it is its ability to use the `OperationContext` parameter to access the blackboard and invoke LLMs.

#### 4.6.10. The `@AchievesGoal` annotation

The `@AchievesGoal` annotation can be added to an `@Action` method to indicate that the completion of the action achieves a specific goal.

#### 4.6.11. The `@SecureAgentTool` annotation

`@SecureAgentTool` declares the security contract for an Embabel `@Action` method or `@Agent`
class exposed as a remote MCP tool.
It accepts a Spring Security SpEL expression evaluated against the current `Authentication`
at the point of tool invocation, before Embabel’s GOAP planner executes the action body.

##### Placement

`@SecureAgentTool` can be placed on the `@Agent` class to protect every `@Action` uniformly,
or on individual methods for finer-grained control.
Method-level annotation takes precedence over class-level when both are present.

**Class-level** â one annotation secures all actions in the agent, including intermediate steps
that run before the goal-achieving action:

Kotlin
:   ```
    @Agent(description = "Research a topic and return a news digest")
    @SecureAgentTool("hasAuthority('news:read')")  (1)
    class NewsDigestAgent {

        @Action
        fun extractTopic(userInput: UserInput, context: OperationContext): NewsTopic { ... } (2)

        @AchievesGoal(description = "Produce a curated news digest",
                      export = Export(remote = true, name = "newsDigest",
                                      startingInputTypes = [UserInput::class]))
        @Action
        fun produceDigest(topic: NewsTopic, context: OperationContext): NewsDigest { ... }  (2)
    }
    ```

Java
:   ```
    @Agent(description = "Research a topic and return a news digest")
    @SecureAgentTool("hasAuthority('news:read')")  (1)
    public class NewsDigestAgent {

        @Action
        public NewsTopic extractTopic(UserInput userInput, OperationContext context) { ... } (2)

        @AchievesGoal(description = "Produce a curated news digest",
                      export = @Export(remote = true, name = "newsDigest",
                                       startingInputTypes = {UserInput.class}))
        @Action
        public NewsDigest produceDigest(NewsTopic topic, OperationContext context) { ... }  (2)
    }
    ```

|  |  |
| --- | --- |
| **1** | One annotation on the class protects every `@Action` in the agent. |
| **2** | Both `extractTopic` and `produceDigest` require `news:read`. Without class-level protection, intermediate actions like `extractTopic` would run freely before the security check on the goal-achieving action fires. |

**Method-level override** â a method-level annotation takes precedence over the class-level
expression, allowing one action to require elevated authority:

Kotlin
:   ```
    @Agent(description = "Market intelligence agent")
    @SecureAgentTool("hasAuthority('market:read')")         (1)
    class MarketIntelligenceAgent {

        @Action
        fun gatherIntelligence(subject: AnalysisSubject, context: OperationContext): String { ... }

        @SecureAgentTool("hasAuthority('market:admin')")     (2)
        @AchievesGoal(description = "Produce market report")
        @Action
        fun synthesiseReport(
            subject: AnalysisSubject,
            rawIntelligence: String,
            context: OperationContext
        ): MarketIntelligenceReport { ... }
    }
    ```

Java
:   ```
    @Agent(description = "Market intelligence agent")
    @SecureAgentTool("hasAuthority('market:read')")         (1)
    public class MarketIntelligenceAgent {

        @Action
        public String gatherIntelligence(AnalysisSubject subject, OperationContext context) { ... }

        @SecureAgentTool("hasAuthority('market:admin')")     (2)
        @AchievesGoal(description = "Produce market report")
        @Action
        public MarketIntelligenceReport synthesiseReport(
                AnalysisSubject subject,
                String rawIntelligence,
                OperationContext context) { ... }
    }
    ```

|  |  |
| --- | --- |
| **1** | All actions default to requiring `market:read`. |
| **2** | `synthesiseReport` requires `market:admin` â the method-level annotation overrides the class. |

##### Supported expressions

Any Spring Security SpEL expression is valid:

| Expression | Meaning |
| --- | --- |
| `hasAuthority('finance:read')` | Principal must carry this exact authority |
| `hasAnyAuthority('finance:read', 'finance:admin')` | Principal must carry at least one of the listed authorities |
| `hasRole('ADMIN')` | Principal must carry `ROLE_ADMIN` (the `ROLE_` prefix is added automatically) |
| `isAuthenticated()` | Any authenticated principal, regardless of authorities |
| `hasAuthority('payments:write') and #request.amount < 10000` | Combines an authority check with a method parameter expression |

##### Setup

Add the MCP security starter to your `pom.xml`:

```
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter-mcpserver-security</artifactId>
    <version>${embabel-agent.version}</version>
</dependency>
```

The starter auto-configures `SecureAgentToolAspect` and the required Spring Security
`MethodSecurityExpressionHandler`.
No additional `@EnableMethodSecurity` annotation is required.

|  |  |
| --- | --- |
|  | `@SecureAgentTool` is a method-level security control, not an HTTP-level one. For production use, combine it with a `SecurityFilterChain` that validates JWT Bearer tokens so unauthenticated requests are rejected before reaching the GOAP planner. See the [Spring Security JWT Resource Server documentation](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html) for general setup, or [MCP Security](reference.integrations__mcp_security) for an MCP-specific example. |

#### 4.6.12. Implementing the `StuckHandler` interface

If an annotated agent class implements the `StuckHandler` interface, it can handle situations where an action is stuck itself.
For example, it can add data to the blackboard.

Example:

Java
:   ```
    @Agent(description = "self unsticking agent")
    public class SelfUnstickingAgent implements StuckHandler {

        private boolean called = false;

        // The agent will get stuck as there's no dog to convert to a frog
        @Action
        @AchievesGoal(description = "the big goal in the sky")
        public Frog toFrog(Dog dog) {
            return new Frog(dog.name());
        }

        // This method will be called when the agent is stuck
        @Override
        public StuckHandlerResult handleStuck(AgentProcess agentProcess) {
            called = true;
            agentProcess.addObject(new Dog("Duke"));
            return new StuckHandlerResult(
                "Unsticking myself",
                this,
                StuckHandlingResultCode.REPLAN,
                agentProcess
            );
        }
    }
    ```

Kotlin
:   ```
    @Agent(
        description = "self unsticking agent",
    )
    class SelfUnstickingAgent : StuckHandler {

        // The agent will get stuck as there's no dog to convert to a frog
        @Action
        @AchievesGoal(description = "the big goal in the sky")
        fun toFrog(dog: Dog): Frog {
            return Frog(dog.name)
        }

        // This method will be called when the agent is stuck
        override fun handleStuck(agentProcess: AgentProcess): StuckHandlerResult {
            called = true
            agentProcess.addObject(Dog("Duke"))
            return StuckHandlerResult(
                message = "Unsticking myself",
                handler = this,
                code = StuckHandlingResultCode.REPLAN,
                agentProcess = agentProcess,
            )
        }
    }
    ```

#### 4.6.13. Advanced Usage: Nested processes

An `@Action` method can invoke another agent process.
This is often done to use a stereotyped process that is composed using the DSL.

Use the `ActionContext.asSubProcess` method to create a sub-process from the action context.

For example:

Java
:   ```
    @Action
    public ScoredResult<Report, SimpleFeedback> report(
            ReportRequest reportRequest,
            ActionContext context
    ) {
        return context.asSubProcess(
            // Will create an agent sub process with strong typing
            EvaluatorOptimizer.generateUntilAcceptable(
                5,
                ctx -> ctx.promptRunner()
                    .withToolGroup(CoreToolGroups.WEB)
                    .create(String.format("""
                        Given the topic, generate a detailed report in %d words.

                        # Topic
                        %s

                        # Feedback
                        %s
                        """,
                        reportRequest.words(),
                        reportRequest.topic(),
                        ctx.getInput() != null ? ctx.getInput() : "No feedback provided")),
                ctx -> ctx.promptRunner()
                    .withToolGroup(CoreToolGroups.WEB)
                    .create(String.format("""
                        Given the topic and word count, evaluate the report and provide feedback
                        Feedback must be a score between 0 and 1, where 1 is perfect.

                        # Report
                        %s

                        # Report request:
                        %s
                        Word count: %d
                        """,
                        ctx.getInput().report(),
                        reportRequest.topic(),
                        reportRequest.words()))
            ));
    }
    ```

Kotlin
:   ```
    @Action
    fun report(
        reportRequest: ReportRequest,
        context: ActionContext,
    ): ScoredResult<Report, SimpleFeedback> = context.asSubProcess(
        // Will create an agent sub process with strong typing
        EvaluatorOptimizer.generateUntilAcceptable(
            maxIterations = 5,
            generator = {
                it.promptRunner().withToolGroup(CoreToolGroups.WEB).create(
                    """
            Given the topic, generate a detailed report in ${reportRequest.words} words.

            # Topic
            ${reportRequest.topic}

            # Feedback
            ${it.input ?: "No feedback provided"}
                    """.trimIndent()
                )
            },
            evaluator = {
                it.promptRunner().withToolGroup(CoreToolGroups.WEB).create(
                    """
            Given the topic and word count, evaluate the report and provide feedback
            Feedback must be a score between 0 and 1, where 1 is perfect.

            # Report
            ${it.input.report}

            # Report request:

            ${reportRequest.topic}
            Word count: ${reportRequest.words}
            """.trimIndent()
                )
            },
        ))
    ```

#### 4.6.14. Running Subagents with `RunSubagent`

The `RunSubagent` utility provides a convenient way to run a nested agent from within an `@Action` method without needing direct access to `ActionContext`.
This is particularly useful when you want to delegate work to another `@Agent`-annotated class or an `Agent` instance.

##### Running an `@Agent`-annotated Instance

Use `RunSubagent.fromAnnotatedInstance()` when you have an instance of a class annotated with `@Agent`:

|  |  |
| --- | --- |
|  | The annotated instance can be Spring-injected into your agent class. Since `@Agent` is a Spring stereotype annotation, you can inject one agent into another and run it as a subagent. This enables clean separation of concerns while maintaining testability. |

Java
:   ```
    @Agent(description = "Outer agent that delegates to an injected subagent")
    public class OuterAgent {

        private final InnerSubAgent innerSubAgent;

        public OuterAgent(InnerSubAgent innerSubAgent) {  (1)
            this.innerSubAgent = innerSubAgent;
        }

        @Action
        public TaskOutput start(UserInput input) {
            return RunSubagent.fromAnnotatedInstance(
                innerSubAgent,  (2)
                TaskOutput.class
            );
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        public TaskOutput done(TaskOutput output) {
            return output;
        }
    }

    @Agent(description = "Inner subagent that processes input")
    public class InnerSubAgent {

        @Action
        public Intermediate stepOne(UserInput input) {
            return new Intermediate(input.getContent());
        }

        @Action
        @AchievesGoal(description = "Subagent complete")
        public TaskOutput stepTwo(Intermediate data) {
            return new TaskOutput(data.value().toUpperCase());
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Outer agent that delegates to an injected subagent")
    class OuterAgent(
        private val innerSubAgent: InnerSubAgent  (1)
    ) {

        @Action
        fun start(input: UserInput): TaskOutput {
            return RunSubagent.fromAnnotatedInstance(
                innerSubAgent,  (2)
                TaskOutput::class.java
            )
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        fun done(output: TaskOutput): TaskOutput = output
    }

    @Agent(description = "Inner subagent that processes input")
    class InnerSubAgent {

        @Action
        fun stepOne(input: UserInput): Intermediate {
            return Intermediate(input.content)
        }

        @Action
        @AchievesGoal(description = "Subagent complete")
        fun stepTwo(data: Intermediate): TaskOutput {
            return TaskOutput(data.value.uppercase())
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Spring injects the `InnerSubAgent` bean via constructor injection. |
| **2** | The injected instance is passed to `RunSubagent.fromAnnotatedInstance()`. |

In Kotlin, you can use the reified version for a more concise syntax:

Java
:   ```
    @Agent(description = "Outer agent via explicit type parameter")
    public class OuterAgentExplicit {

        @Action
        public TaskOutput start(UserInput input) {
            return RunSubagent.fromAnnotatedInstance(
                new InnerSubAgent(),
                TaskOutput.class
            );
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        public TaskOutput done(TaskOutput output) {
            return output;
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Outer agent via reified subagent")
    class OuterAgentReified {

        @Action
        fun start(input: UserInput): TaskOutput =
            RunSubagent.fromAnnotatedInstance<TaskOutput>(InnerSubAgent())

        @Action
        @AchievesGoal(description = "Processing complete")
        fun done(output: TaskOutput): TaskOutput = output
    }
    ```

##### Running an `Agent` Instance

Use `RunSubagent.instance()` when you already have an `Agent` object (for example, one created programmatically or via `AgentMetadataReader`):

Java
:   ```
    @Agent(description = "Outer agent with Agent instance")
    public class OuterAgentWithAgentInstance {

        @Action
        public TaskOutput start(UserInput input) {
            Agent agent = (Agent) new AgentMetadataReader()
                .createAgentMetadata(new InnerSubAgent());
            return RunSubagent.instance(agent, TaskOutput.class);
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        public TaskOutput done(TaskOutput output) {
            return output;
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Outer agent with Agent instance")
    class OuterAgentWithAgentInstance {

        @Action
        fun start(input: UserInput): TaskOutput {
            val agent = AgentMetadataReader()
                .createAgentMetadata(InnerSubAgent()) as Agent
            return RunSubagent.instance(agent, TaskOutput::class.java)
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        fun done(output: TaskOutput): TaskOutput = output
    }
    ```

In Kotlin with reified types:

Java
:   ```
    @Agent(description = "Outer agent via explicit agent instance")
    public class OuterAgentExplicitInstance {

        @Action
        public TaskOutput start(UserInput input) {
            Agent agent = (Agent) new AgentMetadataReader()
                .createAgentMetadata(new InnerSubAgent());
            return RunSubagent.instance(agent, TaskOutput.class);
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        public TaskOutput done(TaskOutput output) {
            return output;
        }
    }
    ```

Kotlin
:   ```
    @Agent(description = "Outer agent via reified agent instance")
    class OuterAgentReifiedInstance {

        @Action
        fun start(input: UserInput): TaskOutput {
            val agent = AgentMetadataReader().createAgentMetadata(InnerSubAgent()) as Agent
            return RunSubagent.instance<TaskOutput>(agent)
        }

        @Action
        @AchievesGoal(description = "Processing complete")
        fun done(output: TaskOutput): TaskOutput = output
    }
    ```

##### How It Works

`RunSubagent` methods throw a `SubagentExecutionRequest` exception that is caught by the framework.
The framework then executes the subagent as a subprocess within the current agent process, sharing the same blackboard context.
The result of the subagent’s goal-achieving action is returned to the calling action.

This approach has several advantages:

* **Cleaner syntax**: No need to pass `ActionContext` to the action method
* **Type safety**: The return type is enforced at compile time
* **Composition**: Easily compose complex workflows from simpler agents
* **Reusability**: The same subagent can be used in multiple contexts

##### Comparison with `ActionContext.asSubProcess`

Both `RunSubagent` and `ActionContext.asSubProcess` achieve the same result, but differ in style:

| Approach | When to use | Example |
| --- | --- | --- |
| `RunSubagent.fromAnnotatedInstance()` | When you have an `@Agent`-annotated instance and don’t need `ActionContext` | `RunSubagent.fromAnnotatedInstance(new SubAgent(), Result.class)` |
| `RunSubagent.instance()` | When you have an `Agent` object | `RunSubagent.instance(agent, Result.class)` |
| `ActionContext.asSubProcess()` | When you need access to `ActionContext` for other operations | `context.asSubProcess(Result.class, agent)` |

|  |  |
| --- | --- |
|  | Use `RunSubagent` when your action method only needs to delegate to a subagent. Use `ActionContext.asSubProcess()` when you need additional context operations. |

#### 4.6.15. Action Exception Handling

Exception handling within Action is governed by Retry Policy.

All exceptions below, except `TransientAiException` are considered as non-retryable.
More specifically, policy categorises non-retryable exception in the order:

* ReplanRequestedException
* TerminateActionException
* TerminateAgentException
* ToolControlFlowSignal
* NonTransientAiException
* IllegalArgumentException
* IllegalStateException
* UnsupportedOperationException
* ClassCastException

If exception does not belong to any of the exceptions from the list above - it gets mapped to retryable exception.

Framework allows creating custom Retryable / NonRetryable exception in order for developers to exercise complete control over Action Retry.

Embabel provides with two approaches for defining custom retryable and non-retryable exceptions:

1. **Extend ActionException** - Convenient base classes with built-in retry classification
2. **Implement marker interfaces** - Maximum flexibility for existing exception hierarchies

##### Approach 1: Extending ActionException

The recommended approach is to extend `ActionException.Transient` for retryable failures or `ActionException.Permanent` for non-retryable failures:

Kotlin
:   ```
      import com.embabel.agent.core.ActionException

      // Transient failure - will be retried
      class ApiTimeoutException(message: String, cause: Throwable? = null)
          : ActionException.Transient(message, cause)

      // Permanent failure - will not be retried
      class ValidationException(message: String, cause: Throwable? = null)
          : ActionException.Permanent(message, cause)
    ```

Java
:   +

```
import com.embabel.agent.core.ActionException;

  // Transient failure - will be retried
  public class ApiTimeoutException extends ActionException.Transient {
      public ApiTimeoutException(String message) {
          super(message);
      }

      public ApiTimeoutException(String message, Throwable cause) {
          super(message, cause);
      }
  }

  // Permanent failure - will not be retried
  public class ValidationException extends ActionException.Permanent {
      public ValidationException(String message) {
          super(message);
      }

      public ValidationException(String message, Throwable cause) {
          super(message, cause);
      }
  }
```

##### Approach 2: Implementing Marker Interfaces

```
For existing exception hierarchies or when you need more control, implement the `Retryable` or `NonRetryable` marker interfaces directly:
```

Kotlin
:   ```
      import com.embabel.agent.core.Retryable
      import com.embabel.agent.core.NonRetryable

      // Transient failure - will be retried
      class NetworkException(message: String, cause: Throwable? = null)
          : RuntimeException(message, cause), Retryable

      // Permanent failure - will not be retried
      class InvalidOrderException(message: String)
          : RuntimeException(message), NonRetryable
    ```

Java
:   +

```
import com.embabel.agent.core.Retryable;
import com.embabel.agent.core.NonRetryable;

  // Transient failure - will be retried
  public class NetworkException extends RuntimeException implements Retryable {
      public NetworkException(String message) {
          super(message);
      }

      public NetworkException(String message, Throwable cause) {
          super(message, cause);
      }
  }

  // Permanent failure - will not be retried
  public class InvalidOrderException extends RuntimeException implements NonRetryable {
      public InvalidOrderException(String message) {
          super(message);
      }
  }
```

##### Common Use Cases

**Transient Failures** (use `ActionException.Transient` or `Retryable`):

* Network timeouts
* Rate limiting (429 errors)
* Temporary resource unavailability
* Connection failures
* Database deadlocks

**Permanent Failures** (use `ActionException.Permanent` or `NonRetryable`):

* Validation errors
* Business rule violations
* Invalid parameters
* Resource not found (404 errors)
* Authentication failures (401 errors)
* Authorization failures (403 errors)

### 4.7. DSL

You can also create agents using a DSL in Kotlin or Java.

This is useful for workflows where you want an atomic action that is complete in itself but may contain multiple steps or actions.

#### 4.7.1. Standard Workflows

There are a number of standard workflows, constructed by builders, that meet common requirements.
These can be used to create agents that will be exposed as Spring beans, or within `@Action` methods within other agents.
All are type safe.
As far as possible, they use consistent APIs.

* `SimpleAgentBuilder`: The simplest agent, with no preconditions or postconditions.
* `ScatterGatherBuilder`: Fork join pattern for parallel processing.
* `ConsensusBuilder`: A pattern for reaching consensus among multiple sources.
  Specialization of `ScatterGather`.
* `RepeatUntil`: Repeats a step until a condition is met.
* `RepeatUntilAcceptable`: Repeats a step while a condition is met, with a separate evaluator providing feedback.

Creating a simple agent:

Java
:   ```
    var agent = SimpleAgentBuilder
        .returning(Joke.class) (1)
        .running(tac -> tac.ai() (2)
            .withDefaultLlm()
            .createObject("Tell me a joke", Joke.class))
        .buildAgent("joker", "This is guaranteed to return a dreadful joke"); (3)
    ```

Kotlin
:   ```
    val agent = SimpleAgentBuilder
        .returning(Joke::class.java) (1)
        .running { tac -> tac.ai() (2)
            .withDefaultLlm()
            .createObject("Tell me a joke", Joke::class.java) }
        .buildAgent("joker", "This is guaranteed to return a dreadful joke") (3)
    ```

|  |  |
| --- | --- |
| **1** | Specify the return type. |
| **2** | specify the action to run. Takes a `SupplierActionContext<RESULT>` `OperationContext` parameter allowing access to the current `AgentProcess`. |
| **3** | Build an agent with the given name and description. |

A more complex example:

Java
:   ```
    @Action
    FactChecks runAndConsolidateFactChecks(
            DistinctFactualAssertions distinctFactualAssertions,
            ActionContext context) {
        var llmFactChecks = properties.models().stream()
                .flatMap(model -> factCheckWithSingleLlm(model, distinctFactualAssertions, context))
                .toList();
        return ScatterGatherBuilder (1)
                .returning(FactChecks.class) (2)
                .fromElements(FactCheck.class) (3)
                .generatedBy(llmFactChecks) (4)
                .consolidatedBy(this::reconcileFactChecks) (5)
                .asSubProcess(context); (6)
        }
    ```

Kotlin
:   ```
    @Action
    fun runAndConsolidateFactChecks(
        distinctFactualAssertions: DistinctFactualAssertions,
        context: ActionContext
    ): FactChecks {
        val llmFactChecks = properties.models
            .flatMap { model -> factCheckWithSingleLlm(model, distinctFactualAssertions, context) }
        return ScatterGatherBuilder (1)
            .returning(FactChecks::class.java) (2)
            .fromElements(FactCheck::class.java) (3)
            .generatedBy(llmFactChecks) (4)
            .consolidatedBy(this::reconcileFactChecks) (5)
            .asSubProcess(context) (6)
    }
    ```

|  |  |
| --- | --- |
| **1** | Start building a scatter gather agent. |
| **2** | Specify the return type of the overall agent. |
| **3** | Specify the type of elements to be gathered. |
| **4** | Specify the list of functions to run in parallel, each generating an element, here of type `FactCheck`. |
| **5** | Specify a function to consolidate the results. In this case it will take a list of `FactCheck` and return a `FactCheck` and return a `FactChecks` object. |
| **6** | Build and run the agent as a subprocess of the current process. This is an alternative to `buildAgent` shown in the `SimpleAgentBuilder` example. The API is consistent. |

|  |  |
| --- | --- |
|  | If you wish to experiment, the [embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) repository includes the [fact checker](https://github.com/embabel/embabel-agent-examples/blob/main/examples-java/src/main/java/com/embabel/example/factchecker/FactChecker.java) shown above. |

#### 4.7.2. Registering `Agent` beans

Whereas the `@Agent` annotation causes a class to be picked up immediately by Spring, with the DSL you’ll need an extra step to register an agent with Spring. As shown in the example below, any `@Bean` of `Agent` type results auto registration, just like declaring a class annotated with `@Agent` does.

Java
:   ```
    @Configuration
    public class FactCheckerAgentConfiguration {

        @Bean
        public Agent factChecker(FactCheckerProperties factCheckerProperties) {
            return factCheckerAgent(
                List.of(
                    LlmOptions.create(AnthropicModels.CLAUDE_35_HAIKU).withTemperature(0.3),
                    LlmOptions.create(AnthropicModels.CLAUDE_35_HAIKU).withTemperature(0.0)
                ),
                factCheckerProperties
            );
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class FactCheckerAgentConfiguration {

        @Bean
        fun factChecker(factCheckerProperties: FactCheckerProperties): Agent {
            return factCheckerAgent(
                llms = listOf(
                    LlmOptions(AnthropicModels.CLAUDE_35_HAIKU).withTemperature(.3),
                    LlmOptions(AnthropicModels.CLAUDE_35_HAIKU).withTemperature(.0),
                ),
                properties = factCheckerProperties,
            )
        }
    }
    ```

### 4.8. Core Types

#### 4.8.1. LlmOptions

The `LlmOptions` class specifies which LLM to use and its hyperparameters.
It’s defined in the [embabel-common](https://github.com/embabel/embabel-common) project and provides a fluent API for LLM configuration:

Java
:   ```
    // Create LlmOptions with model and temperature
    var options = LlmOptions
        .withModel(OpenAiModels.GPT_4O_MINI)
        .withTemperature(0.8);

    // Use different hyperparameters for different tasks
    var analyticalOptions = LlmOptions
        .withModel(OpenAiModels.GPT_4O_MINI)
        .withTemperature(0.2)
        .withTopP(0.9);
    ```

Kotlin
:   ```
    // Create LlmOptions with model and temperature
    val options = LlmOptions
        .withModel(OpenAiModels.GPT_4O_MINI)
        .withTemperature(0.8)

    // Use different hyperparameters for different tasks
    val analyticalOptions = LlmOptions
        .withModel(OpenAiModels.GPT_4O_MINI)
        .withTemperature(0.2)
        .withTopP(0.9)
    ```

**Important Methods:**

* `withModel(String)`: Specify the model name
* `withRole(String)`: Specify the model role. The role must be one defined in configuration via `embabel.models.llms.<role>=<model-name>`
* `withTemperature(Double)`: Set creativity/randomness (0.0-1.0)
* `withTopP(Double)`: Set nucleus sampling parameter
* `withTopK(Integer)`: Set top-K sampling parameter
* `withPersona(String)`: Add a system message persona

`LlmOptions` is deserializable, so you can set properties of type `LlmOptions` in `application.yml` and other application configuration files.
This is a powerful way of externalizing not only models, but hyperparameters.

#### 4.8.2. PromptRunner

All LLM calls in user applications should be made via the `PromptRunner` interface.
Once created, a `PromptRunner` can run multiple prompts with the same LLM, hyperparameters, tool groups and `PromptContributors`.

##### Getting a PromptRunner

You obtain a `PromptRunner` from an `OperationContext` using the fluent API:

Java
:   ```
    @Action
    public Story createStory(UserInput input, OperationContext context) {
        // Get PromptRunner with default LLM
        var runner = context.ai().withDefaultLlm();

        // Get PromptRunner with specific LLM options
        var customRunner = context.ai().withLlm(
            LlmOptions.withModel(OpenAiModels.GPT_4O_MINI)
                .withTemperature(0.8)
        );

        return customRunner.createObject("Write a story about: " + input.getContent(), Story.class);
    }
    ```

Kotlin
:   ```
    @Action
    fun createStory(input: UserInput, context: OperationContext): Story {
        // Get PromptRunner with default LLM
        val runner = context.ai().withDefaultLlm()

        // Get PromptRunner with specific LLM options
        val customRunner = context.ai().withLlm(
            LlmOptions.withModel(OpenAiModels.GPT_4O_MINI)
                .withTemperature(0.8)
        )

        return customRunner.createObject("Write a story about: ${input.content}", Story::class.java)
    }
    ```

##### PromptRunner Methods

**Core Object Creation:**

* `createObject(String, Class<T>)`: Create a typed object from a prompt, otherwise throw an exception. An exception triggers retry. If retry fails repeatedly, re-planning occurs.
* `createObjectIfPossible(String, Class<T>)`: Try to create an object, return null on failure.
  This can cause replanning.
* `generateText(String)`: Generate simple text response

|  |  |
| --- | --- |
|  | Normally you want to use one of the `createObject` methods to ensure the response is typed correctly. |

**Tool and Context Management:**

* `withToolGroup(String)`: Add [tool groups](#reference.tools__tool-groups) for LLM access
* `withToolObject(Object)`: Add domain objects with [@Tool](#reference.tools) methods
* `withPromptContributor(PromptContributor)`: Add [context](#reference.prompt-contributors) contributors
* `withImage(AgentImage)`: Add an image to the prompt for vision-capable LLMs
* `withImages(AgentImage…​)`: Add multiple images to the prompt

**LLM Configuration:**

* `withLlm(LlmOptions)`: Use specific LLM configuration
* `withGenerateExamples(Boolean)`: Control example generation

**Returning a Specific Type**

* `creating(Class<T>)`: Go into the `Creating` fluent API for returning a particular type.

For example:

Java
:   ```
    var story = context.ai()
        .withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)
        .creating(Story.class)
        .fromPrompt("Create a story about: " + input.getContent());
    ```

Kotlin
:   ```
    val story = context.ai()
        .withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)
        .creating(Story::class.java)
        .fromPrompt("Create a story about: ${input.content}")
    ```

The main reason to do this is to add strongly typed examples for [few-shot prompting](https://www.promptingguide.ai/techniques/fewshot).
For example:

Java
:   ```
    var story = context.ai()
        .withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)
        .creating(Story.class)
        .withExample("A children's story", new Story("Once upon a time...")) (1)
        .fromPrompt("Create a story about: " + input.getContent());
    ```

Kotlin
:   ```
    val story = context.ai()
        .withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)
        .creating(Story::class.java)
        .withExample("A children's story", Story("Once upon a time...")) (1)
        .fromPrompt("Create a story about: ${input.content}")
    ```

|  |  |
| --- | --- |
| **1** | **Example**: The example will be included in the prompt in JSON format to guide the LLM. |

**Working with Images:**

Java
:   ```
    var image = AgentImage.fromFile(imageFile);

    var answer = context.ai()
        .withLlm(AnthropicModels.CLAUDE_35_HAIKU)  (1)
        .withImage(image)  (2)
        .generateText("What is in this image?");
    ```

Kotlin
:   ```
    val image = AgentImage.fromFile(imageFile)

    val answer = context.ai()
        .withLlm(AnthropicModels.CLAUDE_35_HAIKU)  (1)
        .withImage(image)  (2)
        .generateText("What is in this image?")
    ```

|  |  |
| --- | --- |
| **1** | **Vision-capable model required**: Use Claude 3.x, GPT-4 Vision, or other multimodal LLMs |
| **2** | **Add image**: Images are sent with the text prompt to the LLM. Can be used multiple times for multiple images. |

**Advanced Features:**

* `rendering(String)`: Use [Jinja](#reference.templates) templates for prompts (returns `Rendering` interface)
* `withTool(Subagent.ofClass(MyAgent.class).consuming(MyInput.class))`: Enable handoffs to other agents (see [Subagent: Agent Handoffs as Tools](#subagent-tool))
* `evaluateCondition(String, String)`: Evaluate boolean condition

**Validation**

Embabel supports [JSR-380](https://beanvalidation.org/2.0-jsr380/) bean validation annotations on domain objects.
When creating objects via `PromptRunner.createObject` or `createObjectIfPossible`, validation is automatically performed after deserialization.
If validation fails, Embabel transparently retries the LLM call to obtain a valid object,
describing the validation errors to the LLM to help it correct its response.

If validation fails a second time, `InvalidLlmReturnTypeException` is thrown.
This will trigger replanning if not caught.
You can also choose to catch it within the action method making the LLM call,
and take appropriate action in your own code.

Simple example of annotation use:

Java
:   ```
    public class User {

        @NotNull(message = "Name cannot be null")
        private String name;

        @AssertTrue(message = "Working must be true")
        private boolean working;

        @Size(min = 10, max = 200, message
          = "About Me must be between 10 and 200 characters")
        private String aboutMe;

        @Min(value = 18, message = "Age should not be less than 18")
        @Max(value = 150, message = "Age should not be greater than 150")
        private int age;

        @Email(message = "Email should be valid")
        private String email;

        // standard setters and getters
    }
    ```

Kotlin
:   ```
    data class User(
        @field:NotNull(message = "Name cannot be null")
        val name: String?,

        @field:AssertTrue(message = "Working must be true")
        val working: Boolean,

        @field:Size(min = 10, max = 200, message = "About Me must be between 10 and 200 characters")
        val aboutMe: String?,

        @field:Min(value = 18, message = "Age should not be less than 18")
        @field:Max(value = 150, message = "Age should not be greater than 150")
        val age: Int,

        @field:Email(message = "Email should be valid")
        val email: String?
    )
    ```

You can also use custom annotations with validators that will be injected by Spring. For example:

Java
:   ```
    @Target({ElementType.FIELD, ElementType.PARAMETER}) (1)
    @Retention(RetentionPolicy.RUNTIME)
    @Constraint(validatedBy = PalindromeValidator.class)
    public @interface MustBePalindrome {
        String message() default "Must be a palindrome";
        Class<?>[] groups() default {};
        Class<? extends Payload>[] payload() default {};
    }

    public class Palindromic {
        @MustBePalindrome (2)
        private String eats;

        public Palindromic(String eats) {
            this.eats = eats;
        }

        public String getEats() {
            return eats;
        }
    }

    @Component (3)
    public class PalindromeValidator implements ConstraintValidator<MustBePalindrome, String> {

        private final Ai ai; (4)

        public PalindromeValidator(Ai ai) {
            this.ai = ai;
        }

        @Override
        public boolean isValid(String field, ConstraintValidatorContext context) {
            if (field == null) {
                return false;
            }
            return field.equals(new StringBuilder(field).reverse().toString());
        }
    }
    ```

Kotlin
:   ```
    @Target(AnnotationTarget.FIELD, AnnotationTarget.VALUE_PARAMETER) (1)
    @Retention(AnnotationRetention.RUNTIME)
    @Constraint(validatedBy = [PalindromeValidator::class])
    annotation class MustBePalindrome(
        val message: String = "Must be a palindrome",
        val groups: Array<KClass<*>> = [],
        val payload: Array<KClass<out Payload>> = []
    )

    data class Palindromic(
        @field:MustBePalindrome (2)
        val eats: String
    )

    @Component (3)
    class PalindromeValidator(
        private val ai: Ai (4)
    ) : ConstraintValidator<MustBePalindrome, String> {

        override fun isValid(field: String?, context: ConstraintValidatorContext): Boolean {
            if (field == null) {
                return false
            }
            return field == field.reversed()
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Define the custom annotation |
| **2** | Apply the annotation to a field |
| **3** | Implement the validator as a Spring component. Note the `@Component` annotation. |
| **4** | Spring will inject the validator with dependencies, such as the `Ai` instance in this case |

Thus we have standard JSR-280 validation with full Spring dependency injection support.

#### 4.8.3. AgentImage

Represents an image for use with vision-capable LLMs.

**Factory Methods:**

* `AgentImage.fromFile(File)`: Load from file (auto-detects MIME type from common extensions)
* `AgentImage.fromPath(Path)`: Load from path (auto-detects MIME type)
* `AgentImage.create(String, byte[])`: Create with explicit MIME type and byte array
* `AgentImage.fromBytes(String, byte[])`: Create from filename and bytes (auto-detects MIME type)

For uncommon image formats or if auto-detection fails, use `AgentImage.create()` with an explicit MIME type.

### 4.9. Tools

Tools can be passed to LLMs to allow them to perform actions.
Tools can either be outside the JVM process, as with MCP, or inside the JVM process, as with domain objects exposing `@LlmTool` methods.

Embabel allows you to provide tools to LLMs in two ways:

* Via the `PromptRunner` by providing one or more in process **tool instances**.
  A tool instance is an object with methods annotated with Embabel `@LlmTool` or Spring AI `@Tool`.
* At action or `PromptRunner` level, from a **tool group**.

`LlmReference` implementations also expose tools, but this is handled internally by the framework.

#### 4.9.1. In Process Tools: Implementing Tool Instances

Implement one or more methods annotated with `@LlmTool` on a class.
You do not need to annotate the class itself.
Each annotated method represents a distinct tool that will be exposed to the LLM.

A simple example of a tool method:

Java
:   ```
    public class MathTools {

        @LlmTool(description = "add two numbers")
        public double add(double a, double b) {
            return a + b;
        }

        // Other tools
    }
    ```

Kotlin
:   ```
    class MathTools {

        @LlmTool(description = "add two numbers")
        fun add(a: Double, b: Double) = a + b

        // Other tools
    }
    ```

Classes implementing tools can be stateful.
They are often domain objects.
Tools on mapped entities are especially useful, as they can encapsulate state that is never exposed to the LLM.
See [Domain Tools: Direct Access, Zero Ceremony](https://medium.com/@springrod/domain-tools-direct-access-zero-ceremony-9a3e8d4cf550) for a discussion of tool use patterns.

The `@Tool` annotation comes from [Spring AI](https://docs.spring.io/spring-ai/reference/api/tools.html).

Tool methods can have any visibility, and can be static or instance scope.
They are allowed on inner classes.

> You can define any number of arguments for the method (including no argument) with most types (primitives, POJOs, enums, lists, arrays, maps, and so on).
> Similarly, the method can return most types, including void.
> If the method returns a value, the return type must be a serializable type, as the result will be serialized and sent back to the model.
>
> The following types are not currently supported as parameters or return types for methods used as tools:
>
> * Optional
> * Asynchronous types (e.g. CompletableFuture, Future)
> * Reactive types (e.g. Flow, Mono, Flux)
> * Functional types (e.g. Function, Supplier, Consumer).

— Spring AI  
Tool Calling

You can obtain the current `AgentProcess` in a Tool method implementation via `AgentProcess.get()`.
This enables tools to bind to the `AgentProcess`, making objects available to other actions.
For example:

Java
:   ```
    @LlmTool(description = "My Tool")
    public String bindCustomer(Long id) {
        var customer = customerRepository.findById(id);
        var agentProcess = AgentProcess.get();
        if (agentProcess != null) {
            agentProcess.addObject(customer);
            return "Customer bound to blackboard";
        }
        return "No agent process: Unable to bind customer";
    }
    ```

Kotlin
:   ```
    @LlmTool(description = "My Tool")
    fun bindCustomer(id: Long): String {
        val customer = customerRepository.findById(id)
        val agentProcess = AgentProcess.get()
        return if (agentProcess != null) {
            agentProcess.addObject(customer)
            "Customer bound to blackboard"
        } else {
            "No agent process: Unable to bind customer"
        }
    }
    ```

#### 4.9.2. Receiving Out-of-Band Context in Tools

Tool methods often need access to infrastructure metadataâauth tokens, tenant IDs, correlation IDsâthat should not be part of the LLM-facing JSON schema.
`ToolCallContext` provides this: an immutable key-value bag that flows through the tool pipeline without the LLM ever seeing it.

Think of it like HTTP headers on a request.
The caller sets them at the boundary (a REST filter, an event handler), and every handler in the chain can read themâbut the request body (what the LLM provides) is unaffected.

##### Injecting ToolCallContext into @LlmTool Methods

Declare a `ToolCallContext` parameter on any `@LlmTool` method.
The framework will:

* **Inject** the current context at call time (or `ToolCallContext.EMPTY` if none was set)
* **Exclude** the parameter from the JSON schema the LLM sees

Java
:   ```
    public class CustomerTools {

        @LlmTool(description = "Look up customer by ID")
        public String lookupCustomer(
                @LlmTool.Param(description = "Customer ID") long customerId,
                ToolCallContext context) {
            String tenantId = context.get("tenantId");
            String authToken = context.get("authToken");
            return customerService.lookup(customerId, tenantId, authToken);
        }
    }
    ```

Kotlin
:   ```
    class CustomerTools {

        @LlmTool(description = "Look up customer by ID")
        fun lookupCustomer(
            @LlmTool.Param(description = "Customer ID") customerId: Long,
            context: ToolCallContext,
        ): String {
            val tenantId = context.get<String>("tenantId")
            val authToken = context.get<String>("authToken")
            return customerService.lookup(customerId, tenantId, authToken)
        }
    }
    ```

The LLM sees only the `customerId` parameter.
The `ToolCallContext` parameter is invisible in the tool’s schema.

This works for both `KotlinMethodTool` and `JavaMethodTool`âthe `ToolCallContext` parameter can appear at any position in the method signature.

##### Setting Context via ProcessOptions

Context is set at the process boundary using `ProcessOptions.withToolCallContext()`.
It then propagates to every tool invocation in the processâincluding MCP tools, where it bridges to Spring AI’s `ToolContext`.

Java
:   ```
    // In a REST controller or event handler
    var processOptions = new ProcessOptions()
        .withToolCallContext(Map.of(
            "authToken", request.getHeader("Authorization"),
            "tenantId", request.getHeader("X-Tenant-Id"),
            "correlationId", UUID.randomUUID().toString()
        ));

    var invocation = AgentInvocation.builder(agentPlatform)
        .options(processOptions)
        .build(CustomerReport.class);

    CustomerReport report = invocation.invoke(customerQuery);
    ```

Kotlin
:   ```
    // In a REST controller or event handler
    val processOptions = ProcessOptions()
        .withToolCallContext(ToolCallContext.of(
            "authToken" to request.getHeader("Authorization"),
            "tenantId" to request.getHeader("X-Tenant-Id"),
            "correlationId" to UUID.randomUUID().toString(),
        ))

    val invocation = AgentInvocation.builder(agentPlatform)
        .options(processOptions)
        .build<CustomerReport>()

    val report = invocation.invoke(customerQuery)
    ```

##### Context Propagation Through Decorators

`ToolCallContext` flows automatically through decorator chains.
Any tool implementing `DelegatingTool` forwards the context to its delegate by default.
Built-in decorators like `ArtifactSinkingTool` and `ReplanningTool` follow this pattern, so context reaches the underlying tool without any extra wiring.

##### Per-Loop One-Shot Tools (`OneShotPerLoopTool`)

Some tools are meant to fire **at most once per agentic loop iteration** â typically because the call returns content that, once delivered, lives in the LLM’s conversation history for the rest of the turn.
The canonical example is a **skill activator**: calling it returns the skill body so the LLM can use it; calling it again returns the same body and accomplishes nothing except wasting tokens and a round-trip.

Stronger models follow a system-prompt rule like "call each activator once" reliably.
Weaker models (qwen, gpt-oss, smaller open models) reflexively re-call the same tool turn after turn even when the body is already in conversation history.
The system-prompt rule isn’t enforceable purely with words â `OneShotPerLoopTool` makes the constraint mechanical.

Wrap the underlying tool with `OneShotPerLoopTool`, supplying an `advice` string that tells the LLM what to do **instead** of calling again:

Java
:   ```
    Tool gated = new OneShotPerLoopTool(
        githubWorkflowsActivator,
        "Write your script now using the skill body above."
    );
    ```

Kotlin
:   ```
    val gated = OneShotPerLoopTool(
        delegate = githubWorkflowsActivator,
        advice = "Write your script now using the skill body above.",
    )
    ```

The first call within a given loop delegates to the underlying tool as normal.
Every subsequent call within the same loop short-circuits with:

```
ALREADY LOADED. The body of '<tool name>' was returned earlier in this turn â
read it from your conversation history above. Do not call this tool again.
<advice>
```

Loop scoping is provided by `LoopMemo` reading `ToolCallContext.loopId()`, so the orchestrator must stamp a fresh loop id per turn:

```
val loopId = java.util.UUID.randomUUID().toString()
context.ai()
    .withLlm(myLlm)
    .withToolCallContext(mapOf(ToolCallContext.LOOP_ID_KEY to loopId))
    .withTools(gatedTools)
    .respond(messages)
```

If no loop id is stamped, `LoopMemo’s documented fallback is "always emit" â every call is treated as the first, so the wrapper degrades to a passthrough rather than silently locking.

Implements `DelegatingTool`, so the underlying tool is reachable via `delegate` and the canonical two-arg `call` overload is the only one a subclass would override.

For the underlying memoisation primitive in isolation (e.g. for "first describe per loop emits the rules block once" inside a tool’s own `call`), see `LoopMemo`.

##### Using Context in Framework-Agnostic Tools

For programmatically created tools, use `Tool.ContextAwareFunction` to receive context in the handler.
The `Tool.of()` factory method accepts a `ContextAwareFunction` as the last parameter:

Java
:   ```
    Tool tenantAwareTool = Tool.of(
        "search",
        "Search within tenant scope",
        Tool.InputSchema.of(Tool.Parameter.string("query", "Search query")),
        Tool.Metadata.DEFAULT,
        (Tool.ContextAwareFunction) (input, context) -> {
            String tenantId = context.get("tenantId");
            return Tool.Result.text(searchService.search(input, tenantId));
        }
    );
    ```

Kotlin
:   ```
    val tenantAwareTool = Tool.of(
        name = "search",
        description = "Search within tenant scope",
        inputSchema = Tool.InputSchema.of(Tool.Parameter.string("query", "Search query")),
    ) { input: String, context: ToolCallContext ->
        val tenantId = context.get<String>("tenantId")
        Tool.Result.text(searchService.search(input, tenantId))
    }
    ```

When no context is provided, the function receives `ToolCallContext.EMPTY`.

|  |  |
| --- | --- |
|  | Context is immutable and safe to read from any thread. If you need to pass context from a web request through to tool invocations, set it once on `ProcessOptions` and every tool in the process will receive it. |

##### Setting Context per Interaction via PromptRunner

For context that is specific to one LLM call rather than the whole agent run, use `withToolCallContext()` on the `PromptRunner` directly inside an `@Action` method.
This is the right place for domain-level metadata that belongs to a particular interaction â for example, which entity the action is working on.

Java
:   ```
    @Action
    public RelevantNewsStories findNewsStories(
            StarPerson person, Horoscope horoscope, Ai ai) {

        // Domain-specific context for this interaction only.
        // Flows to all tools invoked during this createObject call,
        // including remote MCP tools where it becomes MCP _meta.
        var interactionContext = ToolCallContext.of(Map.of(
                "personName", person.name(),
                "starSign",   person.sign(),
                "feature",    "star-news-finder"
        ));

        return ai
                .withDefaultLlm()
                .withToolGroup(CoreToolGroups.WEB)
                .withToolCallContext(interactionContext)   (1)
                .createObject(prompt, RelevantNewsStories.class);
    }
    ```

Kotlin
:   ```
    @Action
    fun findNewsStories(person: StarPerson, horoscope: Horoscope, ai: Ai): RelevantNewsStories {

        val interactionContext = ToolCallContext.of(
            "personName" to person.name,
            "starSign"   to person.sign,
            "feature"    to "star-news-finder",
        )

        return ai
            .withDefaultLlm()
            .withToolGroup(CoreToolGroups.WEB)
            .withToolCallContext(interactionContext)   (1)
            .createObject(prompt, RelevantNewsStories::class.java)
    }
    ```

|  |  |
| --- | --- |
| **1** | `withToolCallContext()` also accepts a plain `Map<String, Any>` for convenience. |

##### Context Merge Semantics

Context from both sources is merged automatically in `ToolLoopLlmOperations.resolveToolCallContext()`.
Interaction-level values win on conflict.

| `ProcessOptions` | `PromptRunner` | Effective context |
| --- | --- | --- |
| `tenantId=acme` | â | `{tenantId=acme}` |
| â | `authToken=xyz` | `{authToken=xyz}` |
| `tenantId=acme` | `authToken=xyz` | `{tenantId=acme, authToken=xyz}` |
| `tenantId=acme` | `tenantId=override` | `{tenantId=override}` â interaction wins |

This means `ProcessOptions` is the right place for cross-cutting infrastructure concerns (tenant routing, correlation IDs, credentials injected at the gateway), while `PromptRunner.withToolCallContext()` is the right place for domain-specific per-interaction concerns (which entity the action is working on).

##### Controlling What Crosses the MCP Boundary

When Embabel calls a remote MCP server, the `ToolCallContext` entries are forwarded as MCP `_meta` on the wire.
`_meta` is a first-class field in the MCP 2025-06-18 specification, and MCP server tools can receive it via `McpMeta` parameters (or Spring AI’s `ToolContext`).

By default **all** context entries are forwarded (`passThrough` behavior).
For production deployments calling untrusted third-party MCP servers, register a `ToolCallContextMcpMetaConverter` bean to control what crosses the process boundary.

Think of it like an HTTP header filter on a reverse proxy: the converter decides which entries are safe to propagate and which should stay local.

Java
:   ```
    // Allowlist â recommended for production: only named keys cross the boundary
    @Bean
    public ToolCallContextMcpMetaConverter toolCallContextMcpMetaConverter() {
        return ToolCallContextMcpMetaConverter.allowKeys("tenantId", "correlationId", "locale");
    }

    // Or denylist â forward everything except secrets
    @Bean
    public ToolCallContextMcpMetaConverter toolCallContextMcpMetaConverter() {
        return ToolCallContextMcpMetaConverter.denyKeys("apiKey", "authToken");
    }

    // Or custom lambda for arbitrary logic
    @Bean
    public ToolCallContextMcpMetaConverter toolCallContextMcpMetaConverter() {
        return context -> Map.of(
            "tenantId",    context.get("tenantId"),
            "requestedAt", Instant.now().toString()
        );
    }
    ```

Kotlin
:   ```
    // Allowlist â recommended for production
    @Bean
    fun toolCallContextMcpMetaConverter() =
        ToolCallContextMcpMetaConverter.allowKeys("tenantId", "correlationId", "locale")

    // Or denylist
    @Bean
    fun toolCallContextMcpMetaConverter() =
        ToolCallContextMcpMetaConverter.denyKeys("apiKey", "authToken")

    // Or custom lambda
    @Bean
    fun toolCallContextMcpMetaConverter() = ToolCallContextMcpMetaConverter { context ->
        mapOf(
            "tenantId"    to (context.get<String>("tenantId") ?: "unknown"),
            "requestedAt" to Instant.now().toString(),
        )
    }
    ```

If no bean is defined, the framework defaults to `passThrough()` for backward compatibility.
The available factory methods are:

| Method | Behavior | Use Case |
| --- | --- | --- |
| `passThrough()` | Forwards all entries | Fully trusted internal MCP servers (default) |
| `noOp()` | Forwards nothing | Zero-trust: block all metadata from crossing |
| `allowKeys(vararg keys)` | Forwards only named keys | Production (recommended): explicit allowlist |
| `denyKeys(vararg keys)` | Forwards all except named keys | When secrets are well-known and enumerable |

|  |  |
| --- | --- |
|  | The cleanest security approach is to put only safe values into `ToolCallContext` in the first place â secrets belong in `@Value` / Vault / environment variables, not in the context bag. `ToolCallContextMcpMetaConverter` is the secondary defence for cases where the context is populated at the infrastructure boundary and not all entries should reach third-party servers. |

#### 4.9.3. Tool Groups

Embabel introduces the concept of a **tool group**.
This is a level of indirection between user intent and tool selection.
For example, we don’t ask for Brave or Google web search: we ask for "web" tools, which may be resolved differently in different environments.

|  |  |
| --- | --- |
|  | Tools use should be focused. Thus tool groups are not specified at agent level, but on individual actions. |

Tool groups are often backed by [MCP](#reference.integrations__mcp).

##### Configuring Tool Groups in configuration files

If you have configured MCP servers in your application configuration, you can selectively expose tools from those servers to agents by configuring tool groups.
The easiest way to do this is in your `application.yml` or `application.properties` file.
Select tools by name.

For example:

```
embabel:

    agent:
    platform:
      tools:
        includes:
          weather:
            description: Get weather for location
            provider: Docker
            tools:
              - weather
```

##### Configuring Tool Groups in Spring @Configuration

You can also use Spring’s `@Configuration` and `@Bean` annotations to expose ToolGroups to the agent platform with greater control.
The framework provides a default `ToolGroupsConfiguration` that demonstrates how to inject MCP servers and selectively expose MCP tools:

Java
:   ```
    @Configuration
    public class ToolGroupsConfiguration {

        private final List<McpSyncClient> mcpSyncClients;

        public ToolGroupsConfiguration(List<McpSyncClient> mcpSyncClients) {
            this.mcpSyncClients = mcpSyncClients;
        }

        @Bean
        public MathTools mathToolGroup() {
            return new MathTools();
        }

        @Bean
        public ToolGroup mcpWebToolsGroup() { (1)
            return new McpToolGroup(
                CoreToolGroups.WEB_DESCRIPTION,
                "docker-web",
                "Docker",
                Set.of(ToolGroupPermission.INTERNET_ACCESS),
                mcpSyncClients,
                callback -> {
                    // Only expose specific web tools, exclude rate-limited ones
                    String name = callback.getToolDefinition().name();
                    return (name.contains("brave") || name.contains("fetch")) &&
                           !name.contains("brave_local_search");
                }
            );
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class ToolGroupsConfiguration(
        private val mcpSyncClients: List<McpSyncClient>
    ) {

        @Bean
        fun mathToolGroup() = MathTools()

        @Bean
        fun mcpWebToolsGroup(): ToolGroup { (1)
            return McpToolGroup(
                description = CoreToolGroups.WEB_DESCRIPTION,
                name = "docker-web",
                provider = "Docker",
                permissions = setOf(ToolGroupPermission.INTERNET_ACCESS),
                clients = mcpSyncClients,
                filter = {
                    // Only expose specific web tools, exclude rate-limited ones
                    (it.toolDefinition.name().contains("brave") ||
                     it.toolDefinition.name().contains("fetch")) &&
                    !it.toolDefinition.name().contains("brave_local_search")
                }
            )
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | This method creates a Spring bean of type `ToolGroup`. This will automatically be picked up by the agent platform, allowing the tool group to be requested by name (role). |

##### Key Configuration Patterns

**MCP Client Injection:**
The configuration class receives a `List<McpSyncClient>` via constructor injection.
Spring automatically provides all available MCP clients that have been configured in the application.

**Selective Tool Exposure:**
Each `McpToolGroup` uses a `filter` lambda to control which tools from the MCP servers are exposed to agents.
This allows fine-grained control over tool availability and prevents unwanted or problematic tools from being used.

**Tool Group Metadata:**
Tool groups include descriptive metadata like `name`, `provider`, and `description` to help agents understand their capabilities.
The `permissions` property declares what access the tool group requires (e.g., `INTERNET_ACCESS`).

##### Creating Custom Tool Group Configurations

Applications can implement their own `@Configuration` classes to expose custom tool groups, which can be backed by any service or resource, not just MCP.

Java
:   ```
    @Configuration
    public class MyToolGroupsConfiguration {

        @Bean
        public ToolGroup databaseToolsGroup(DataSource dataSource) {
            return new DatabaseToolGroup(dataSource);
        }

        @Bean
        public ToolGroup emailToolsGroup(EmailService emailService) {
            return new EmailToolGroup(emailService);
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class MyToolGroupsConfiguration {

        @Bean
        fun databaseToolsGroup(dataSource: DataSource): ToolGroup =
            DatabaseToolGroup(dataSource)

        @Bean
        fun emailToolsGroup(emailService: EmailService): ToolGroup =
            EmailToolGroup(emailService)
    }
    ```

This approach leverages Spring’s dependency injection to provide tool groups with the services and resources they need, while maintaining clean separation of concerns between tool configuration and agent logic.

##### Using Tools in Action Methods

Tools are specified on the `PromptRunner` when making LLM calls.
This gives you fine-grained control over which tools are available for each specific prompt.

Here’s an example from the `StarNewsFinder` agent that demonstrates web tool usage within an action:

Java
:   ```
    @Action
    public RelevantNewsStories findNewsStories(
            StarPerson person, Horoscope horoscope, OperationContext context) {
        var prompt = """
                %s is an astrology believer with the sign %s.
                Their horoscope for today is:
                    <horoscope>%s</horoscope>
                Given this, use web tools and generate search queries
                to find %d relevant news stories summarize them in a few sentences.
                Include the URL for each story.
                Do not look for another horoscope reading or return results directly about astrology;
                find stories relevant to the reading above.
                """.formatted(
                person.name(), person.sign(), horoscope.summary(), storyCount);

        // Tools are specified on the PromptRunner
        return context.ai().withDefaultLlm()
            .withToolGroup(CoreToolGroups.WEB)  // Add web search tools
            .createObject(prompt, RelevantNewsStories.class);
    }
    ```

Kotlin
:   ```
    @Action
    internal fun findNewsStories(
        person: StarPerson,
        horoscope: Horoscope,
        context: OperationContext,
    ): RelevantNewsStories =
        context.ai().withDefaultLlm()
            .withToolGroup(CoreToolGroups.WEB)  // Add web search tools
            .withToolGroup(CoreToolGroups.BROWSER_AUTOMATION)  // Add browser tools
            .createObject(
                """
                ${person.name} is an astrology believer with the sign ${person.sign}.
                Their horoscope for today is:
                    <horoscope>${horoscope.summary}</horoscope>
                Given this, use web tools and generate search queries
                to find $storyCount relevant news stories summarize them in a few sentences.
                Include the URL for each story.
                Do not look for another horoscope reading or return results directly about astrology;
                find stories relevant to the reading above.
                """.trimIndent()
            )
    ```

##### Key Tool Usage Patterns

**PromptRunner Tool Methods:**
Tools are added to the `PromptRunner` fluent API using methods like `withToolGroup()`, `withTools()`, and `withToolObject()`.

**Multiple Tool Groups:**
Actions can add multiple tool groups by chaining `withToolGroup()` calls when they need different types of capabilities.

**Tool-Aware Prompts:**
Prompts should explicitly instruct the LLM to use the available tools.
For example, "use web tools and generate search queries" clearly directs the LLM to utilize the web search capabilities.

##### Additional PromptRunner Examples

Java
:   ```
    // Add tool groups to a specific prompt
    context.ai().withAutoLlm().withToolGroup(CoreToolGroups.WEB).create(
        "Given the topic, generate a detailed report using web research.\n\n" +
        "# Topic\n" +
        reportRequest.getTopic()
    );

    // Add multiple tool groups
    context.ai().withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)
        .withToolGroup(CoreToolGroups.MATH)
        .createObject("Calculate stock performance with web data", StockReport.class);
    ```

Kotlin
:   ```
    // Add tool groups to a specific prompt
    context.ai().withAutoLlm().withToolGroup(CoreToolGroups.WEB).create(
        """
        Given the topic, generate a detailed report using web research.

        # Topic
        ${reportRequest.topic}
        """.trimIndent()
    )

    // Add multiple tool groups
    context.ai().withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)
        .withToolGroup(CoreToolGroups.MATH)
        .createObject("Calculate stock performance with web data", StockReport::class)
    ```

**Adding Tool Objects with @LlmTool Methods:**

You can also provide domain objects with `@LlmTool` methods directly to specific prompts:

Java
:   ```
    context.ai()
        .withDefaultLlm()
        .withToolObject(jokerTool)
        .createObject("Create a UserInput object for fun", UserInput.class);

    // Add tool object with filtering and custom naming strategy
    context.ai()
        .withDefaultLlm()
        .withToolObject(
            new ToolObject(calculatorService)
                .withNamingStrategy(name -> "calc_" + name)
                .withFilter(methodName -> methodName.startsWith("compute"))
        ).createObject("Perform calculations", Result.class);
    ```

Kotlin
:   ```
    context.ai()
        .withDefaultLlm()
        .withToolObject(jokerTool)
        .createObject("Create a UserInput object for fun", UserInput::class.java)

    // Add tool object with filtering and custom naming strategy
    context.ai()
        .withDefaultLlm()
        .withToolObject(
            ToolObject(calculatorService)
                .withNamingStrategy { "calc_$it" }
                .withFilter { methodName -> methodName.startsWith("compute") }
        ).createObject("Perform calculations", Result::class.java)
    ```

**Available PromptRunner Tool Methods:**

* `withToolGroup(String)`: Add a single tool group by name
* `withToolGroup(ToolGroup)`: Add a specific ToolGroup instance
* `withToolGroups(Set<String>)`: Add multiple tool groups
* `withTools(vararg String)`: Convenient method to add multiple tool groups
* `withToolObject(Any)`: Add domain object with `@LlmTool` or `@Tool` methods
* `withToolObject(ToolObject)`: Add ToolObject with custom configuration
* `withTool(Tool)`: Add a framework-agnostic Tool instance
* `withTools(List<Tool>)`: Add multiple framework-agnostic Tool instances

#### 4.9.4. Framework-Agnostic Tool Interface

In addition to Spring AI’s `@Tool` annotation, Embabel provides its own framework-agnostic `Tool` interface in the `com.embabel.agent.api.tool` package.
This allows you to create tools that are not tied to any specific LLM framework, making your code more portable and testable.

The `Tool` interface includes nested types to avoid naming conflicts with framework-specific types:

* `Tool.Definition` - Describes the tool (name, description, input schema)
* `Tool.InputSchema` - Defines the parameters the tool accepts
* `Tool.Parameter` - A single parameter with name, type, and description
* `Tool.Result` - The result returned by a tool (text, artifact, or error)
* `Tool.Handler` - Functional interface for implementing tool logic

##### Creating Tools Programmatically

You can create tools using the `Tool.create()` factory methods:

Java
:   ```
    // Simple tool with no parameters
    Tool greetTool = Tool.create(
        "greet",
        "Greets the user",
        (input) -> Tool.Result.text("Hello!")
    );

    // Tool with parameters (using factory methods)
    Tool addTool = Tool.create(
        "add",
        "Adds two numbers together",
        Tool.InputSchema.of(
            Tool.Parameter.integer("a", "First number"),
            Tool.Parameter.integer("b", "Second number")
        ),
        (input) -> {
            // Parse input JSON and compute result
            return Tool.Result.text("42");
        }
    );

    // Tool with metadata (e.g., return directly without LLM processing)
    Tool directTool = Tool.create(
        "lookup",
        "Looks up data directly",
        Tool.Metadata.create(true), // returnDirect = true
        (input) -> Tool.Result.text("Direct result")
    );
    ```

Kotlin
:   ```
    // Simple tool with no parameters
    val greetTool = Tool.of(
        name = "greet",
        description = "Greets the user"
    ) { _ ->
        Tool.Result.text("Hello!")
    }

    // Tool with parameters (using factory methods)
    val addTool = Tool.of(
        name = "add",
        description = "Adds two numbers together",
        inputSchema = Tool.InputSchema.of(
            Tool.Parameter.integer("a", "First number"),
            Tool.Parameter.integer("b", "Second number")
        )
    ) { input ->
        // Parse input JSON and compute result
        Tool.Result.text("42")
    }

    // Tool with metadata
    val directTool = Tool.of(
        name = "lookup",
        description = "Looks up data directly",
        metadata = Tool.Metadata(returnDirect = true)
    ) { _ ->
        Tool.Result.text("Direct result")
    }
    ```

The `Tool.Parameter` class provides factory methods for common parameter types:

* `Tool.Parameter.string(name, description)` - String parameter
* `Tool.Parameter.string(name, description, required)` - String with optional flag
* `Tool.Parameter.string(name, description, required, enumValues)` - String with allowed values
* `Tool.Parameter.integer(name, description)` - Integer parameter
* `Tool.Parameter.double(name, description)` - Floating-point parameter

All factory methods default to `required = true`.

##### Creating Strongly Typed Tools

For tools with complex input and output structures, use `Tool.fromFunction()` to work with domain objects directly.
The input schema is generated automatically from the input type, and JSON marshaling is handled for you.

Java
:   ```
    // Define input and output types
    record AddRequest(int a, int b) {}
    record AddResult(int sum) {}

    // Create typed tool - schema is generated from AddRequest
    Tool addTool = Tool.fromFunction(
        "add",
        "Adds two numbers together",
        AddRequest.class,
        AddResult.class,
        input -> new AddResult(input.a() + input.b())
    );

    // Call the tool - input is deserialized, output is serialized
    Tool.Result result = addTool.call("{\"a\": 5, \"b\": 3}");
    // Result contains: {"sum":8}

    // String output is returned directly (not double-serialized)
    Tool greetTool = Tool.fromFunction(
        "greet",
        "Greets someone",
        GreetRequest.class,
        String.class,
        input -> "Hello " + input.name() + "!"
    );

    // With custom metadata
    Tool directTool = Tool.fromFunction(
        "lookup",
        "Looks up data directly",
        LookupRequest.class,
        LookupResult.class,
        Tool.Metadata.create(true), // returnDirect = true
        input -> new LookupResult(findData(input))
    );
    ```

Kotlin
:   ```
    // Define input and output types
    data class AddRequest(val a: Int, val b: Int)
    data class AddResult(val sum: Int)

    // Create typed tool - uses reified types for cleaner syntax
    val addTool = Tool.fromFunction<AddRequest, AddResult>(
        name = "add",
        description = "Adds two numbers together",
    ) { input -> AddResult(input.a + input.b) }

    // Call the tool - input is deserialized, output is serialized
    val result = addTool.call("""{"a": 5, "b": 3}""")
    // Result contains: {"sum":8}

    // String output is returned directly (not double-serialized)
    val greetTool = Tool.fromFunction<GreetRequest, String>(
        name = "greet",
        description = "Greets someone",
    ) { input -> "Hello ${input.name}!" }

    // With custom metadata
    val directTool = Tool.fromFunction<LookupRequest, LookupResult>(
        name = "lookup",
        description = "Looks up data directly",
        metadata = Tool.Metadata(returnDirect = true),
    ) { input -> LookupResult(findData(input)) }
    ```

You can also instantiate `TypedTool` directly:

```
val tool = TypedTool(
    name = "add",
    description = "Add two numbers",
    inputType = AddRequest::class.java,
    outputType = AddResult::class.java,
) { input -> AddResult(input.a + input.b) }
```

Key features of typed tools:

* **Automatic schema generation**: The input schema is derived from the input type’s structure
* **JSON marshaling**: Input JSON is deserialized to the input type, and output is serialized from the output type
* **String pass-through**: If the output type is `String`, it’s returned directly without JSON serialization
* **Result pass-through**: If the function returns a `Tool.Result`, it’s used as-is
* **Exception handling**: Exceptions thrown by the function are converted to `Tool.Result.Error`
* **Control flow signals**: Exceptions implementing `ToolControlFlowSignal` (like `ReplanRequestedException`) propagate through

##### Creating Tools from Annotated Methods

Embabel provides `@LlmTool` and `@LlmTool.Param` annotations for creating tools from annotated methods.
This approach is similar to Spring AI’s `@Tool` but uses Embabel’s framework-agnostic abstractions.

Java
:   ```
    public class MathService {

        @LlmTool(description = "Adds two numbers together")
        public int add(
                @LlmTool.Param(description = "First number") int a,
                @LlmTool.Param(description = "Second number") int b) {
            return a + b;
        }

        @LlmTool(description = "Multiplies two numbers")
        public int multiply(
                @LlmTool.Param(description = "First number") int a,
                @LlmTool.Param(description = "Second number") int b) {
            return a * b;
        }
    }

    // Create tools from all annotated methods on an instance
    List<Tool> mathTools = Tool.fromInstance(new MathService());

    // Or safely create tools (returns empty list if no annotations found)
    List<Tool> tools = Tool.safelyFromInstance(someObject);
    ```

Kotlin
:   ```
    class MathService {

        @LlmTool(description = "Adds two numbers together")
        fun add(
            @LlmTool.Param(description = "First number") a: Int,
            @LlmTool.Param(description = "Second number") b: Int,
        ): Int = a + b

        @LlmTool(description = "Multiplies two numbers")
        fun multiply(
            @LlmTool.Param(description = "First number") a: Int,
            @LlmTool.Param(description = "Second number") b: Int,
        ): Int = a * b
    }

    // Create tools from all annotated methods on an instance
    val mathTools = Tool.fromInstance(MathService())

    // Or safely create tools (returns empty list if no annotations found)
    val tools = Tool.safelyFromInstance(someObject)
    ```

The `@LlmTool` annotation supports:

* `name`: Tool name (defaults to method name if empty)
* `description`: Description of what the tool does (required)
* `returnDirect`: Whether to return the result directly without further LLM processing

The `@LlmTool.Param` annotation supports:

* `description`: Description of the parameter (helps the LLM understand what to provide)
* `required`: Whether the parameter is required (defaults to true)

##### Adding Framework-Agnostic Tools via PromptRunner

Use `withTool()` or `withTools()` to add framework-agnostic tools to a `PromptRunner`:

Java
:   ```
    // Add a single tool
    Tool calculatorTool = Tool.create("calculate", "Performs calculations",
        (input) -> Tool.Result.text("Result: 42"));

    context.ai()
        .withDefaultLlm()
        .withTool(calculatorTool)
        .createObject("Calculate 6 * 7", MathResult.class);

    // Add tools from annotated methods
    List<Tool> mathTools = Tool.fromInstance(new MathService());

    context.ai()
        .withDefaultLlm()
        .withTools(mathTools)
        .createObject("Add 5 and 3", MathResult.class);

    // Combine with other tool sources
    context.ai()
        .withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)  // Tool group
        .withToolObject(domainObject)        // Spring AI @Tool methods
        .withTools(mathTools)                // Framework-agnostic tools
        .createObject("Research and calculate", Report.class);
    ```

Kotlin
:   ```
    // Add a single tool
    val calculatorTool = Tool.of("calculate", "Performs calculations") { _ ->
        Tool.Result.text("Result: 42")
    }

    context.ai()
        .withDefaultLlm()
        .withTool(calculatorTool)
        .createObject("Calculate 6 * 7", MathResult::class.java)

    // Add tools from annotated methods
    val mathTools = Tool.fromInstance(MathService())

    context.ai()
        .withDefaultLlm()
        .withTools(mathTools)
        .createObject("Add 5 and 3", MathResult::class.java)

    // Combine with other tool sources
    context.ai()
        .withDefaultLlm()
        .withToolGroup(CoreToolGroups.WEB)  // Tool group
        .withToolObject(domainObject)        // Spring AI @Tool methods
        .withTools(mathTools)                // Framework-agnostic tools
        .createObject("Research and calculate", Report::class.java)
    ```

##### Tool Results

Tools return `Tool.Result` which can be one of three types:

Java
:   ```
    // Text result (most common)
    Tool.Result.text("The answer is 42");

    // Result with an artifact (e.g., generated file, image)
    Tool.Result.withArtifact("Generated report", reportBytes);

    // Error result
    Tool.Result.error("Failed to process request", exception);
    ```

Kotlin
:   ```
    // Text result (most common)
    Tool.Result.text("The answer is 42")

    // Result with an artifact (e.g., generated file, image)
    Tool.Result.withArtifact("Generated report", reportBytes)

    // Error result
    Tool.Result.error("Failed to process request", exception)
    ```

##### Modifying Tool Descriptions

Tools provide `withDescription()` and `withNote()` methods to create copies with modified descriptions.
This is useful when you need to customize a tool’s description for a specific context without modifying the original tool.

**withDescription(newDescription)**

Creates a new tool with a completely replaced description:

Java
:   ```
    // Replace the entire description
    Tool customTool = originalTool.withDescription("Custom description for this context");

    // The original tool is unchanged
    System.out.println(originalTool.getDefinition().getDescription()); // original description
    System.out.println(customTool.getDefinition().getDescription());   // Custom description for this context
    ```

Kotlin
:   ```
    // Replace the entire description
    val customTool = originalTool.withDescription("Custom description for this context")

    // The original tool is unchanged
    println(originalTool.definition.description) // original description
    println(customTool.definition.description)   // Custom description for this context
    ```

**withNote(note)**

Creates a new tool with an appended note to the existing description:

Java
:   ```
    // Add a note to the existing description
    Tool annotatedTool = originalTool.withNote("Use this when querying large datasets");

    // Result: "Original description. Use this when querying large datasets"
    System.out.println(annotatedTool.getDefinition().getDescription());
    ```

Kotlin
:   ```
    // Add a note to the existing description
    val annotatedTool = originalTool.withNote("Use this when querying large datasets")

    // Result: "Original description. Use this when querying large datasets"
    println(annotatedTool.definition.description)
    ```

Both methods preserve all other tool properties (name, input schema, metadata, functionality):

Java
:   ```
    Tool original = Tool.create("calculator", "Performs calculations",
        Tool.InputSchema.of(Tool.Parameter.integer("x", "Number")),
        input -> Tool.Result.text("42"));

    // Create a customized version
    Tool customized = original
        .withDescription("Specialized math tool")
        .withNote("Optimized for financial calculations");

    // Name and functionality unchanged
    assert customized.getDefinition().getName().equals("calculator");
    assert customized.call("{}").text().equals("42");
    ```

Kotlin
:   ```
    val original = Tool.of(
        name = "calculator",
        description = "Performs calculations",
        inputSchema = Tool.InputSchema.of(Tool.Parameter.integer("x", "Number"))
    ) { Tool.Result.text("42") }

    // Create a customized version
    val customized = original
        .withDescription("Specialized math tool")
        .withNote("Optimized for financial calculations")

    // Name and functionality unchanged
    check(customized.definition.name == "calculator")
    check(customized.call("{}").text == "42")
    ```

##### When to Use Each Approach

| Approach | Use When |
| --- | --- |
| Spring AI `@Tool` | You’re comfortable with Spring AI and want IDE support for tool annotations on domain objects |
| `Tool.create()` / `Tool.of()` | You need programmatic tool creation with simple inputs, want framework independence, or are creating tools dynamically |
| `Tool.fromFunction()` | You need programmatic tool creation with complex typed inputs and outputs, automatic JSON marshaling, and schema generation |
| `@LlmTool` / `@LlmTool.Param` | You prefer annotation-based tools but want Embabel’s framework-agnostic abstractions |
| Tool Groups | You need to organize related tools, use MCP servers, or control tool availability at deployment time |

#### 4.9.5. Tool Decoration: Extending Tool Behavior

Embabel uses a powerful decoration pattern to extend tool behavior without modifying the underlying tool or complicating the `PromptRunner`.
A decorated tool wraps another tool, intercepting calls to add functionality like artifact capture, event publishing, or blackboard integration.

This pattern is fundamental to Embabel’s architecture:

* **Subagents** use decoration to wrap agent execution as a tool
* **Asset tracking** uses decoration to capture tool outputs for chatbot interfaces
* **Blackboard publishing** uses decoration to make tool results available to other actions
* **Event streaming** uses decoration to publish tool calls to external systems
* Internal platform features like observability and exception handling also use decoration

##### The DelegatingTool Interface

All tool decorators implement `DelegatingTool`:

Java
:   ```
    public interface DelegatingTool extends Tool {
        Tool getDelegate();
    }
    ```

Kotlin
:   ```
    interface DelegatingTool : Tool {
        val delegate: Tool
    }
    ```

This allows decorators to be unwrapped when needed, and enables chaining multiple decorators.

##### ArtifactSinkingTool: Capturing Tool Outputs

`ArtifactSinkingTool` captures artifacts from `Tool.Result.WithArtifact` results and sends them to a sink.
This is the foundation for making structured tool outputs available elsewhere.

Java
:   ```
    // Capture all artifacts and publish to blackboard
    Tool wrapped = Tool.publishToBlackboard(myTool);

    // Capture specific types
    Tool wrapped = Tool.publishToBlackboard(myTool, SearchResult.class);

    // With filtering and transformation
    Tool wrapped = Tool.publishToBlackboard(
        myTool,
        SearchResult.class,
        result -> result.getScore() > 0.5,  // filter
        result -> result.getDocument()       // transform
    );

    // Capture to a custom sink
    Tool wrapped = Tool.sinkArtifacts(myTool, SearchResult.class, mySink);
    ```

Kotlin
:   ```
    // Capture all artifacts and publish to blackboard
    val wrapped = Tool.publishToBlackboard(myTool)

    // Capture specific types
    val wrapped = Tool.publishToBlackboard(myTool, SearchResult::class.java)

    // With filtering and transformation
    val wrapped = Tool.publishToBlackboard(
        myTool,
        SearchResult::class.java,
        { it.score > 0.5 },    // filter
        { it.document }         // transform
    )

    // Capture to a custom sink
    val wrapped = Tool.sinkArtifacts(myTool, SearchResult::class.java, mySink)
    ```

##### Built-in Sinks

Embabel provides several `ArtifactSink` implementations:

| Sink | Purpose |
| --- | --- |
| `BlackboardSink` | Publishes to the current `AgentProcess` blackboard, making artifacts available to other actions |
| `ListSink` | Collects artifacts into a list, useful for aggregating results |
| `CompositeSink` | Delegates to multiple sinks, enabling multi-destination publishing |

##### Creating Custom Sinks

Implement `ArtifactSink` to create custom destinations:

Java
:   ```
    // Publish to an event stream
    ArtifactSink eventSink = artifact -> {
        eventPublisher.publish(new ToolArtifactEvent(artifact));
    };

    // Use with any tool
    Tool wrapped = Tool.sinkArtifacts(myTool, MyType.class, eventSink);
    ```

Kotlin
:   ```
    // Publish to an event stream
    val eventSink = ArtifactSink { artifact ->
        eventPublisher.publish(ToolArtifactEvent(artifact))
    }

    // Use with any tool
    val wrapped = Tool.sinkArtifacts(myTool, MyType::class.java, eventSink)
    ```

##### How Decoration Enables Extension

The decoration pattern lets Embabel add sophisticated behavior while keeping `PromptRunner` simple.
When you use `Subagent.ofClass(MyAgent.class)` (Java) or `Subagent.ofClass(MyAgent::class.java)` (Kotlin), Embabel creates a tool that:

1. Wraps agent execution in a `Tool.call()` method
2. Shares the parent blackboard with the child process
3. Captures the agent’s result as a tool artifact

Similarly, when you configure asset tracking in a chatbot, Embabel wraps tools with `AssetAddingTool` to capture outputs as viewable assets.

This approach has key advantages:

* **Composable**: Multiple decorators can be chained
* **Transparent**: The underlying tool doesn’t know it’s wrapped
* **Extensible**: New behaviors can be added without framework changes
* **Type-safe**: Generic decorators like `ArtifactSinkingTool<T>` preserve type information

#### 4.9.6. Subagent: Agent Handoffs as Tools

A `Subagent` is a specialized `Tool` that delegates to another Embabel agent.
When the LLM invokes this tool, it runs the specified agent as a subprocess, sharing the parent process’s blackboard context.
This enables composition of agents and "handoff" patterns where one agent delegates specialized tasks to another.

##### Creating Subagents

Subagent uses a fluent builder pattern.
First select how to reference the agent, then specify the input type using `consuming()`:

Java
:   ```
    // From an @Agent annotated class (most common)
    Subagent.ofClass(ConcertAssembler.class).consuming(ConcertPlan.class)

    // By agent name (resolved at runtime from platform)
    Subagent.byName("ConcertAssembler").consuming(ConcertPlan.class)

    // From an already-resolved Agent instance
    Subagent.ofInstance(resolvedAgent).consuming(ConcertPlan.class)

    // From an instance of an @Agent annotated class (e.g., a Spring bean)
    Subagent.ofAnnotatedInstance(myAgentBean).consuming(ConcertPlan.class)
    ```

Kotlin
:   ```
    // From an @Agent annotated class with reified types (cleanest)
    Subagent.ofClass<ConcertAssembler>().consuming<ConcertPlan>()

    // From a Java class
    Subagent.ofClass(ConcertAssembler::class.java).consuming(ConcertPlan::class.java)

    // From a KClass
    Subagent.ofClass(ConcertAssembler::class).consuming(ConcertPlan::class)

    // By agent name (resolved at runtime from platform)
    Subagent.byName("ConcertAssembler").consuming<ConcertPlan>()

    // From an already-resolved Agent instance
    Subagent.ofInstance(resolvedAgent).consuming<ConcertPlan>()

    // From an instance of an @Agent annotated class (e.g., a Spring bean)
    Subagent.ofAnnotatedInstance(myAgentBean).consuming<ConcertPlan>()
    ```

The `consuming()` method specifies the input type that the LLM will provide when invoking this tool.
This type is used to generate the JSON schema that guides the LLM’s tool invocation.

##### Using Subagents with PromptRunner

Use `withTool()` to add a Subagent to your prompt:

Java
:   ```
    @Action
    public Concert assembleConcert(ConcertPlan plan, OperationContext context) {
        return context.ai()
            .withDefaultLlm()
            .withTool(Subagent.ofClass(PerformanceFinder.class)
                    .consuming(WorksToFind.class))  (1)
            .creating(Concert.class)
            .fromPrompt("Assemble a concert based on: " + plan);
    }
    ```

Kotlin
:   ```
    @Action
    fun assembleConcert(plan: ConcertPlan, context: OperationContext): Concert {
        return context.ai()
            .withDefaultLlm()
            .withTool(Subagent.ofClass<PerformanceFinder>()
                    .consuming<WorksToFind>())  (1)
            .creating(Concert::class.java)
            .fromPrompt("Assemble a concert based on: $plan")
    }
    ```

|  |  |
| --- | --- |
| **1** | The LLM can now invoke `PerformanceFinder` as a tool, providing `WorksToFind` input to delegate the performance search task. |

##### Subagent with Asset Tracking

For chat applications that track assets, wrap the Subagent with `AssetAddingTool` to automatically track returned artifacts:

Java
:   ```
    @Action
    public Concert assembleConcert(ConcertPlan plan, OperationContext context) {
        var subagent = Subagent.ofClass(PerformanceFinder.class)
                .consuming(WorksToFind.class);
        var trackedSubagent = assetTracker.addReturnedAssets(subagent);  (1)

        return context.ai()
            .withDefaultLlm()
            .withTool(trackedSubagent)
            .creating(Concert.class)
            .fromPrompt("Assemble a concert based on: " + plan);
    }

    // With filtering - only track certain assets
    var trackedSubagent = assetTracker.addReturnedAssets(subagent, asset ->
        asset instanceof Performance  // Only track Performance assets
    );
    ```

Kotlin
:   ```
    @Action
    fun assembleConcert(plan: ConcertPlan, context: OperationContext): Concert {
        val subagent = Subagent.ofClass<PerformanceFinder>()
                .consuming<WorksToFind>()
        val trackedSubagent = assetTracker.addReturnedAssets(subagent)  (1)

        return context.ai()
            .withDefaultLlm()
            .withTool(trackedSubagent)
            .creating(Concert::class.java)
            .fromPrompt("Assemble a concert based on: $plan")
    }

    // With filtering - only track certain assets
    val trackedSubagent = assetTracker.addReturnedAssets(subagent) { asset ->
        asset is Performance  // Only track Performance assets
    }
    ```

|  |  |
| --- | --- |
| **1** | Wrap with `addReturnedAssets()` to track artifacts returned by the subagent. |

##### Input Type and JSON Schema

The input type you specify with `consuming()` determines the JSON schema that the LLM sees when invoking the tool.

For example:

Java
:   ```
    // The input type
    public record WorksToFind(List<String> composers, String era, int maxResults) {}

    // Create the subagent with explicit input type
    Subagent.ofClass(PerformanceFinder.class).consuming(WorksToFind.class)
    ```

Kotlin
:   ```
    // The input type
    data class WorksToFind(val composers: List<String>, val era: String, val maxResults: Int)

    // Create the subagent with explicit input type
    Subagent.ofClass<PerformanceFinder>().consuming<WorksToFind>()
    ```

The Subagent tool will:

* Use "PerformanceFinder" as the tool name (from `@Agent` annotation)
* Use "Finds performances" as the tool description (from `@Agent` annotation)
* Generate a JSON schema from `WorksToFind`

**From the LLM’s perspective, a Subagent is just another tool.**
The calling LLM sees the JSON schema for `WorksToFind` and can populate it directly:

```
{
  "composers": ["Mozart", "Beethoven"],
  "era": "Classical",
  "maxResults": 5
}
```

When the tool is invoked, Subagent deserializes this JSON into a `WorksToFind` object and passes it to the target agent.
The input type should match the first non-injected parameter of the agent’s entry-point action.

##### Blackboard Sharing

When a Subagent runs, it receives a **spawned blackboard** from the parent process.
This means:

* The subagent can read objects from the parent’s blackboard
* Objects added by the subagent are available to the parent after the subagent completes
* The subagent operates in its own process context but shares state appropriately

##### When to Use Subagent

| Scenario | Recommendation |
| --- | --- |
| Complex specialized task that has its own multi-action workflow | Use Subagent - the target agent can plan and execute multiple steps |
| Simple tool call with deterministic logic | Use a regular `@LlmTool` method instead |
| LLM-orchestrated mini-workflow with sub-tools | Consider [AgenticTool](#reference.tools__agentic-tools) which operates at the tool level |
| Need the full power of GOAP planning for the subtask | Subagent is ideal - the target agent uses its own planner |

#### 4.9.7. Agentic Tools

An **agentic tool** is a tool that uses an LLM to orchestrate other tools.
Unlike a regular tool which executes deterministic logic, an agentic tool delegates to an LLM that decides which sub-tools to call based on a prompt.

This pattern is useful for encapsulating a mini-orchestration as a single tool that can be used in larger workflows.

Embabel provides three agentic tool implementations, each offering different levels of control over tool availability:

##### Choosing an Agentic Tool

| Tool Type | Tool Availability | Best For | Example Use Case |
| --- | --- | --- | --- |
| `SimpleAgenticTool` | All tools available immediately | Simple orchestration, exploration tasks | Math calculator with add/multiply/divide tools |
| `PlaybookTool` | Progressive unlock via conditions (prerequisites, artifacts, blackboard) | Structured workflows, guided processes | Research workflow: search â analyze â summarize |
| `StateMachineTool` | State-based availability using enum states | Formal state machines, multi-phase processes | Order processing: DRAFT â CONFIRMED â SHIPPED â DELIVERED |

All three implement the `AgenticTool` interface and share a common fluent API with `with*` methods.

The `AgenticTool` interface defines:

Java
:   ```
    public interface AgenticTool<THIS extends AgenticTool<THIS>> extends Tool {
        LlmOptions getLlm();                              // LLM configuration
        int getMaxIterations();                           // Max tool loop iterations (default: 20)

        THIS withLlm(LlmOptions llm);
        THIS withSystemPrompt(String prompt);
        THIS withSystemPrompt(AgenticSystemPromptCreator creator);  // Dynamic prompt
        THIS withMaxIterations(int maxIterations);
        THIS withParameter(Tool.Parameter parameter);
        THIS withToolObject(Object toolObject);
    }
    ```

Kotlin
:   ```
    interface AgenticTool<THIS : AgenticTool<THIS>> : Tool {
        val llm: LlmOptions                              // LLM configuration
        val maxIterations: Int                           // Max tool loop iterations (default: 20)

        fun withLlm(llm: LlmOptions): THIS
        fun withSystemPrompt(prompt: String): THIS
        fun withSystemPrompt(creator: AgenticSystemPromptCreator): THIS  // Dynamic prompt
        fun withMaxIterations(maxIterations: Int): THIS
        fun withParameter(parameter: Tool.Parameter): THIS
        fun withToolObject(toolObject: Any): THIS
    }
    ```

The `AgenticSystemPromptCreator` functional interface receives both the `ExecutingOperationContext` (for access to blackboard, process options, etc.) and the input string passed to the tool:

Java
:   ```
    tool.withSystemPrompt((ctx, input) ->
        "Context: " + ctx.getProcessContext().getProcessOptions().getContextId() +
        ". Task: " + input
    );
    ```

Kotlin
:   ```
    tool.withSystemPrompt { ctx, input ->
        "Context: ${ctx.processContext.processOptions.contextId}" +
        ". Task: $input"
    }
    ```

|  |  |
| --- | --- |
|  | For complex workflows with defined outputs, branching logic, loops, or state management, use Embabel’s [GOAP planner](#reference.planners), [Utility AI](#reference.planners__utility), or [@State workflows](#reference.states) instead. These provide deterministic, typesafe planning that is far more powerful and predictable than LLM-driven orchestration. |

##### SimpleAgenticTool: Flat Tool Orchestration

`SimpleAgenticTool` makes all sub-tools available immediately.
The LLM decides freely which tools to use based on the prompt.

Java
:   ```
    import com.embabel.agent.api.tool.agentic.simple.SimpleAgenticTool;

    // Create the agentic tool
    SimpleAgenticTool mathOrchestrator = new SimpleAgenticTool("math-orchestrator", "Orchestrates math operations")
        .withTools(addTool, multiplyTool, divideTool)
        .withParameter(Tool.Parameter.string("expression", "Math expression to evaluate"))
        .withLlm(LlmOptions.withModel("gpt-4"));

    // Use it like any other tool
    context.ai()
        .withDefaultLlm()
        .withTool(mathOrchestrator)
        .generateText("What is 5 + 3 * 2?");
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.agentic.simple.SimpleAgenticTool

    val mathOrchestrator = SimpleAgenticTool("math-orchestrator", "Orchestrates math operations")
        .withTools(addTool, multiplyTool, divideTool)
        .withParameter(Tool.Parameter.string("expression", "Math expression to evaluate"))
        .withLlm(LlmOptions(model = "gpt-4"))

    context.ai()
        .withDefaultLlm()
        .withTool(mathOrchestrator)
        .generateText("What is 5 + 3 * 2?")
    ```

##### PlaybookTool: Conditional Tool Unlocking

`PlaybookTool` allows tools to be progressively unlocked based on conditions:

* **Prerequisites**: unlock after other tools have been called
* **Artifacts**: unlock when certain artifact types are produced
* **Blackboard**: unlock based on process state
* **Custom predicates**: unlock based on arbitrary conditions

Java
:   ```
    import com.embabel.agent.api.tool.agentic.playbook.PlaybookTool;

    // Tools unlock progressively
    PlaybookTool researcher = new PlaybookTool("researcher", "Research and analyze topics")
        .withTools(searchTool, fetchTool)                    // Always available
        .withTool(analyzeTool).unlockedBy(searchTool)        // Unlocks after search
        .withTool(summarizeTool).unlockedBy(analyzeTool)     // Unlocks after analyze
        .withParameter(Tool.Parameter.string("topic", "Research topic"));

    // Multiple prerequisites (AND)
    .withTool(reportTool).unlockedByAll(searchTool, analyzeTool)

    // Any prerequisite (OR)
    .withTool(processTool).unlockedByAny(searchTool, fetchTool)

    // Unlock when artifact type produced
    .withTool(formatTool).unlockedByArtifact(Document.class)

    // Unlock based on blackboard state
    .withTool(actionTool).unlockedByBlackboard(UserProfile.class)

    // Custom predicate
    .withTool(finalizeTool).unlockedWhen(ctx -> ctx.getIterationCount() >= 3)
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.agentic.playbook.PlaybookTool

    // Kotlin supports curried syntax
    val researcher = PlaybookTool("researcher", "Research and analyze topics")
        .withTools(searchTool, fetchTool)           // Always available
        .withTool(analyzeTool)(searchTool)          // Curried: unlocks after search
        .withTool(summarizeTool)(analyzeTool)       // Curried: unlocks after analyze
        .withParameter(Tool.Parameter.string("topic", "Research topic"))

    // Or use fluent syntax (same as Java)
        .withTool(reportTool).unlockedByAll(searchTool, analyzeTool)
        .withTool(formatTool).unlockedByArtifact(Document::class)
        .withTool(actionTool).unlockedByBlackboard(UserProfile::class)
        .withTool(finalizeTool).unlockedWhen { ctx -> ctx.iterationCount >= 3 }
    ```

When a locked tool is called before its conditions are met, the LLM receives an informative message guiding it to use prerequisite tools first.

##### StateMachineTool: State-Based Availability

`StateMachineTool` uses explicit states defined by an enum.
Tools are registered with specific states where they’re available, and can trigger transitions to other states.

Java
:   ```
    import com.embabel.agent.api.tool.agentic.state.StateMachineTool;

    enum OrderState { DRAFT, CONFIRMED, SHIPPED, DELIVERED }

    StateMachineTool<OrderState> orderProcessor = new StateMachineTool<>("orderProcessor", "Process orders", OrderState.class)
        .withInitialState(OrderState.DRAFT)
        .inState(OrderState.DRAFT)
            .withTool(addItemTool)
            .withTool(confirmTool).transitionsTo(OrderState.CONFIRMED)
        .inState(OrderState.CONFIRMED)
            .withTool(shipTool).transitionsTo(OrderState.SHIPPED)
        .inState(OrderState.SHIPPED)
            .withTool(deliverTool).transitionsTo(OrderState.DELIVERED)
        .inState(OrderState.DELIVERED)
            .withTool(reviewTool).build()
        .withGlobalTools(statusTool, helpTool)  // Available in all states
        .withParameter(Tool.Parameter.string("orderId", "Order to process"));
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.agentic.state.StateMachineTool

    enum class OrderState { DRAFT, CONFIRMED, SHIPPED, DELIVERED }

    val orderProcessor = StateMachineTool("orderProcessor", "Process orders", OrderState::class.java)
        .withInitialState(OrderState.DRAFT)
        .inState(OrderState.DRAFT)
            .withTool(addItemTool)
            .withTool(confirmTool).transitionsTo(OrderState.CONFIRMED)
        .inState(OrderState.CONFIRMED)
            .withTool(shipTool).transitionsTo(OrderState.SHIPPED)
        .inState(OrderState.SHIPPED)
            .withTool(deliverTool).transitionsTo(OrderState.DELIVERED)
        .inState(OrderState.DELIVERED)
            .withTool(reviewTool).build()
        .withGlobalTools(statusTool, helpTool)  // Available in all states
        .withParameter(Tool.Parameter.string("orderId", "Order to process"))
    ```

The `startingIn(state)` method allows starting in a different state at runtime:

Java
:   ```
    // Resume an order that's already confirmed
    Tool resumedProcessor = orderProcessor.startingIn(OrderState.CONFIRMED);
    ```

Kotlin
:   ```
    // Resume an order that's already confirmed
    val resumedProcessor = orderProcessor.startingIn(OrderState.CONFIRMED)
    ```

##### Domain Tools: Tools from Retrieved Objects

All three agentic tools support **domain tools** - `@LlmTool` methods on domain objects that become available when a single instance is retrieved.

Java
:   ```
    // Domain class with @LlmTool methods
    public class User {
        private final String id;
        private final String name;

        public User(String id, String name) {
            this.id = id;
            this.name = name;
        }

        @LlmTool(description = "Get user's profile information")
        public String getProfile() {
            return "Profile for " + name;
        }

        @LlmTool(description = "Update user's settings")
        public String updateSettings(String settings) {
            return "Settings updated for " + name;
        }
    }

    // Register domain tools - they become available when a single User is retrieved
    PlaybookTool userManager = new PlaybookTool("userManager", "Manage users")
        .withTools(searchUserTool, getUserTool)
        .withToolChainingFrom(User.class);  // User methods available after getUserTool returns a single User
    ```

Kotlin
:   ```
    // Domain class with @LlmTool methods
    class User(val id: String, val name: String) {
        @LlmTool(description = "Get user's profile information")
        fun getProfile(): String = "Profile for $name"

        @LlmTool(description = "Update user's settings")
        fun updateSettings(settings: String): String = "Settings updated for $name"
    }

    // Register domain tools - they become available when a single User is retrieved
    val userManager = PlaybookTool("userManager", "Manage users")
        .withTools(searchUserTool, getUserTool)
        .withToolChainingFrom<User>()  // User methods available after getUserTool returns a single User
    ```

Domain tools are "declared" to the LLM immediately but return an error until an instance is bound.
When a tool returns a **single** artifact (not a collection) of a registered type, that instance is bound and its `@LlmTool` methods become executable.

##### Creating Agentic Tools

Create agentic tools using the constructor and fluent `with*` methods:

Java
:   ```
    // Create sub-tools
    Tool addTool = Tool.create("add", "Adds two numbers", input -> {
        // Parse JSON input and compute result
        return Tool.Result.text("5");
    });

    Tool multiplyTool = Tool.create("multiply", "Multiplies two numbers", input -> {
        return Tool.Result.text("6");
    });

    // Create the agentic tool
    SimpleAgenticTool mathOrchestrator = new SimpleAgenticTool("math-orchestrator", "Orchestrates math operations")
        .withTools(addTool, multiplyTool)
        .withLlm(LlmOptions.withModel("gpt-4"))
        .withSystemPrompt("Use the available tools to solve the given math problem");

    // Use it like any other tool
    context.ai()
        .withDefaultLlm()
        .withTool(mathOrchestrator)
        .generateText("What is 5 + 3 * 2?");
    ```

Kotlin
:   ```
    // Create sub-tools
    val addTool = Tool.of("add", "Adds two numbers") { input ->
        // Parse JSON input and compute result
        Tool.Result.text("5")
    }

    val multiplyTool = Tool.of("multiply", "Multiplies two numbers") { input ->
        Tool.Result.text("6")
    }

    // Create the agentic tool
    val mathOrchestrator = SimpleAgenticTool("math-orchestrator", "Orchestrates math operations")
        .withTools(addTool, multiplyTool)
        .withLlm(LlmOptions(model = "gpt-4"))
        .withSystemPrompt("Use the available tools to solve the given math problem")

    // Use it like any other tool
    context.ai()
        .withDefaultLlm()
        .withTool(mathOrchestrator)
        .generateText("What is 5 + 3 * 2?")
    ```

|  |  |
| --- | --- |
|  | The `withSystemPrompt` call is optional. By default, agentic tools generate a system prompt from the tool’s description: *"You are an intelligent agent that can use tools to help you complete tasks. Use the provided tools to perform the following task: {description}"*. Only call `withSystemPrompt` if you need custom orchestration instructions. |

##### Defining Input Parameters

|  |  |
| --- | --- |
|  | You must define input parameters for your agentic tool so the LLM knows what arguments to pass when calling it. Without parameters, the LLM won’t know what input format to use. |

Use the `withParameter` method with `Tool.Parameter` factory methods for concise parameter definitions:

Java
:   ```
    // Research tool that requires a topic parameter
    SimpleAgenticTool researcher = new SimpleAgenticTool("researcher", "Research a topic thoroughly")
        .withParameter(Tool.Parameter.string("topic", "The topic to research"))
        .withToolObjects(new SearchTools(), new SummarizerTools());

    // Calculator with multiple parameters
    SimpleAgenticTool calculator = new SimpleAgenticTool("smart-calculator", "Perform complex calculations")
        .withParameter(Tool.Parameter.string("expression", "Mathematical expression to evaluate"))
        .withParameter(Tool.Parameter.integer("precision", "Decimal places for result", false))  // optional
        .withToolObject(new MathTools());
    ```

Kotlin
:   ```
    // Research tool that requires a topic parameter
    val researcher = SimpleAgenticTool("researcher", "Research a topic thoroughly")
        .withParameter(Tool.Parameter.string("topic", "The topic to research"))
        .withToolObjects(SearchTools(), SummarizerTools())

    // Calculator with multiple parameters
    val calculator = SimpleAgenticTool("smart-calculator", "Perform complex calculations")
        .withParameter(Tool.Parameter.string("expression", "Mathematical expression to evaluate"))
        .withParameter(Tool.Parameter.integer("precision", "Decimal places for result", required = false))  // optional
        .withToolObject(MathTools())
    ```

Available parameter factory methods:

* `Tool.Parameter.string(name, description, required?)` - String parameter
* `Tool.Parameter.integer(name, description, required?)` - Integer parameter
* `Tool.Parameter.double(name, description, required?)` - Floating-point parameter

All factory methods default to `required = true`.
Set `required = false` for optional parameters.

##### Creating Agentic Tools from Annotated Objects

Use `withToolObject` or `withToolObjects` to add tools from objects with `@LlmTool`-annotated methods:

Java
:   ```
    // Tool classes with @LlmTool methods
    public class SearchTools {
        @LlmTool(description = "Search the web")
        public String search(String query) { return "Results for: " + query; }
    }

    public class CalculatorTools {
        @LlmTool(description = "Add two numbers")
        public int add(int a, int b) { return a + b; }

        @LlmTool(description = "Multiply two numbers")
        public int multiply(int a, int b) { return a * b; }
    }

    // Create agentic tool with tools from multiple objects
    // Uses default system prompt based on description
    SimpleAgenticTool assistant = new SimpleAgenticTool("assistant", "Multi-capability assistant")
        .withToolObjects(new SearchTools(), new CalculatorTools());

    // With LLM options and custom system prompt
    SimpleAgenticTool smartAssistant = new SimpleAgenticTool("smart-assistant", "Smart assistant")
        .withToolObjects(new SearchTools(), new CalculatorTools())
        .withLlm(LlmOptions.withModel("gpt-4"))
        .withSystemPrompt("Use tools intelligently");
    ```

Kotlin
:   ```
    // Tool classes with @LlmTool methods
    class SearchTools {
        @LlmTool(description = "Search the web")
        fun search(query: String): String = "Results for: $query"
    }

    class CalculatorTools {
        @LlmTool(description = "Add two numbers")
        fun add(a: Int, b: Int): Int = a + b

        @LlmTool(description = "Multiply two numbers")
        fun multiply(a: Int, b: Int): Int = a * b
    }

    // Create agentic tool with tools from multiple objects
    // Uses default system prompt based on description
    val assistant = SimpleAgenticTool("assistant", "Multi-capability assistant")
        .withToolObjects(SearchTools(), CalculatorTools())

    // With LLM options and custom system prompt
    val smartAssistant = SimpleAgenticTool("smart-assistant", "Smart assistant")
        .withToolObjects(SearchTools(), CalculatorTools())
        .withLlm(LlmOptions(model = "gpt-4"))
        .withSystemPrompt("Use tools intelligently")
    ```

Objects without `@LlmTool` methods are silently ignored, allowing you to mix objects safely.

##### Agentic Tools with Spring Dependency Injection

Agentic tools can encapsulate stateful services via dependency injection:

Java
:   ```
    @Component
    public class ResearchOrchestrator {

        private final WebSearchService webSearchService;
        private final SummarizerService summarizerService;

        public ResearchOrchestrator(WebSearchService webSearchService, SummarizerService summarizerService) {
            this.webSearchService = webSearchService;
            this.summarizerService = summarizerService;
        }

        @LlmTool(description = "Search the web for information")
        public List<SearchResult> search(String query) {
            return webSearchService.search(query);
        }

        @LlmTool(description = "Summarize text content")
        public String summarize(String content) {
            return summarizerService.summarize(content);
        }
    }

    // In your configuration
    @Configuration
    public class ToolConfiguration {

        @Bean
        public SimpleAgenticTool researchTool(ResearchOrchestrator orchestrator) {
            return new SimpleAgenticTool("research-assistant", "Research topics using web search and summarization")
                .withToolObject(orchestrator)
                .withLlm(new LlmOptions().withRole("smart"));
                // Uses default system prompt based on description
        }
    }
    ```

Kotlin
:   ```
    @Component
    class ResearchOrchestrator(
        private val webSearchService: WebSearchService,
        private val summarizerService: SummarizerService,
    ) {
        @LlmTool(description = "Search the web for information")
        fun search(query: String): List<SearchResult> =
            webSearchService.search(query)

        @LlmTool(description = "Summarize text content")
        fun summarize(content: String): String =
            summarizerService.summarize(content)
    }

    // In your configuration
    @Configuration
    class ToolConfiguration {

        @Bean
        fun researchTool(orchestrator: ResearchOrchestrator): SimpleAgenticTool =
            SimpleAgenticTool("research-assistant", "Research topics using web search and summarization")
                .withToolObject(orchestrator)
                .withLlm(LlmOptions(role = "smart"))
                // Uses default system prompt based on description
    }
    ```

##### How Agentic Tools Execute

When an agentic tool’s `call()` method is invoked:

1. The tool retrieves the current `AgentProcess` context
2. It configures a `PromptRunner` with the specified `LlmOptions`
3. It adds all sub-tools to the prompt runner
4. It executes the prompt with the input, allowing the LLM to orchestrate the sub-tools
5. The final LLM response is returned as the tool result

This means agentic tools create a nested LLM interaction: the outer LLM decides to call the agentic tool, then the inner LLM orchestrates the sub-tools.

##### Modifying Agentic Tools

Use the `with*` methods to create modified copies:

Java
:   ```
    SimpleAgenticTool base = new SimpleAgenticTool("base", "Base orchestrator")
        .withTools(tool1)
        .withSystemPrompt("Original prompt");

    // Create copies with modifications
    SimpleAgenticTool withNewLlm = base.withLlm(new LlmOptions().withModel("gpt-4"));
    SimpleAgenticTool withMoreTools = base.withTools(tool2, tool3);
    SimpleAgenticTool withNewPrompt = base.withSystemPrompt("Updated prompt");

    // Add input parameters
    SimpleAgenticTool withParams = base.withParameter(Tool.Parameter.string("query", "Search query"));

    // Add tools from an object with @LlmTool methods
    SimpleAgenticTool withAnnotatedTools = base.withToolObject(calculatorService);

    // Add tools from multiple objects
    SimpleAgenticTool withMultipleObjects = base.withToolObjects(searchService, calculatorService);

    // Dynamic system prompt based on execution context and input
    SimpleAgenticTool withDynamicPrompt = base.withSystemPrompt((ctx, input) -> {
        String contextId = ctx.getProcessContext().getProcessOptions().getContextId().getId();
        return "Process requests for context " + contextId + ". Task: " + input;
    });
    ```

Kotlin
:   ```
    val base = SimpleAgenticTool("base", "Base orchestrator")
        .withTools(tool1)
        .withSystemPrompt("Original prompt")

    // Create copies with modifications
    val withNewLlm = base.withLlm(LlmOptions(model = "gpt-4"))
    val withMoreTools = base.withTools(tool2, tool3)
    val withNewPrompt = base.withSystemPrompt("Updated prompt")

    // Add input parameters
    val withParams = base.withParameter(Tool.Parameter.string("query", "Search query"))

    // Add tools from an object with @LlmTool methods
    val withAnnotatedTools = base.withToolObject(calculatorService)

    // Add tools from multiple objects
    val withMultipleObjects = base.withToolObjects(searchService, calculatorService)

    // Dynamic system prompt based on execution context and input
    val withDynamicPrompt = base.withSystemPrompt { ctx, input ->
        val contextId = ctx.processContext.processOptions.contextId?.id
        "Process requests for context $contextId. Task: $input"
    }
    ```

The available modification methods are:

* `withParameter(Tool.Parameter)`: Add an input parameter (use `Tool.Parameter.string()`, `.integer()`, `.double()`)
* `withLlm(LlmOptions)`: Set LLM configuration
* `withTools(vararg Tool)`: Add additional Tool instances
* `withToolObject(Any)`: Add tools from an object with `@LlmTool` methods
* `withToolObjects(vararg Any)`: Add tools from multiple annotated objects
* `withSystemPrompt(String)`: Set a fixed system prompt
* `withSystemPrompt((ExecutingOperationContext, String) → String)`: Set a dynamic prompt based on execution context and input
* `withCaptureNestedArtifacts(Boolean)`: Control whether artifacts from nested agentic tool calls are captured (default: `false`)
* `withToolChainingFrom(Class<T>)`: Register a class whose `@LlmTool` methods become available when an artifact of that type is returned
* `withToolChainingFrom(Class<T>, DomainToolPredicate<T>)`: Register with a predicate to filter which instances contribute tools
* `withToolChainingFromAny()`: Auto-discover tools from any returned artifact with `@LlmTool` methods

##### Controlling Artifact Capture in Nested Agentic Tools

When an agentic tool orchestrates other tools, those sub-tools may return artifacts (via `Tool.Result.WithArtifact`).
By default, artifacts from nested agentic tool calls are **not** capturedâonly the final result from the outermost agentic tool is returned.

This prevents intermediate artifacts from bubbling up when you only care about the final result.
For example, if an outer `assembleConcert` tool calls an inner `findPerformances` tool, you typically want only the final `Concert` artifact, not all the intermediate `Performance` artifacts.

Use `withCaptureNestedArtifacts(true)` if you need to capture artifacts from nested agentic tools:

Java
:   ```
    // Default: nested artifacts are NOT captured
    SimpleAgenticTool concertAssembler = new SimpleAgenticTool("assembleConcert", "Assemble a concert program")
        .withTools(findPerformancesTool, createConcertTool);
    // Only the Concert artifact from createConcert is returned

    // Opt-in: capture all nested artifacts
    SimpleAgenticTool fullCapture = concertAssembler.withCaptureNestedArtifacts(true);
    // Both Performance artifacts from findPerformances AND Concert from createConcert are captured
    ```

Kotlin
:   ```
    // Default: nested artifacts are NOT captured
    val concertAssembler = SimpleAgenticTool("assembleConcert", "Assemble a concert program")
        .withTools(findPerformancesTool, createConcertTool)
    // Only the Concert artifact from createConcert is returned

    // Opt-in: capture all nested artifacts
    val fullCapture = concertAssembler.withCaptureNestedArtifacts(true)
    // Both Performance artifacts from findPerformances AND Concert from createConcert are captured
    ```

|  |  |
| --- | --- |
|  | This setting only affects artifacts from nested agentic tool calls. Artifacts from regular (non-agentic) tools are always captured. |

##### Tool Chaining

When working with objects returned by tools, you often want to expose `@LlmTool` methods on those objects as additional toolsâbut only after the object has been retrieved.
The `withToolChainingFrom()` method enables this pattern.

|  |  |
| --- | --- |
|  | Tool chaining increases determinism. Once a tool returns a specific object, the LLM gains access to that object’s business methodsânavigating a data structure through well-defined operations rather than unstructured reasoning. This keeps the LLM on a guided path through your domain logic. |

Tool chaining is available on both `AgenticTool` and `PromptRunner`, via the shared `ToolChaining` interface.
This means you can use tool chaining not only in agentic tool loops, but also in simple `createObject` and `generateText` calls through `PromptRunner`.
This is significant because it enables any action to dynamically discover and use tools from returned artifacts without requiring a full agentic tool setup.

When you register a class, placeholder tools are created for each `@LlmTool` method on that class.
Initially, these tools return "not available yet" messages.
When a tool returns an artifact matching the registered type, the placeholder tools become active and delegate to the bound instance.

**Last Wins Semantics**: When multiple artifacts of the same type are returned, only the most recent one’s tools are active.
This ensures the LLM always works with the "current" instance.

Java
:   ```
    // Domain class with tool methods
    public class User {
        private final String id;
        private String email;

        @LlmTool("Update the user's email address")
        public String updateEmail(String newEmail) {
            this.email = newEmail;
            return "Email updated to " + newEmail;
        }
    }

    // Create agentic tool with tool chaining
    SimpleAgenticTool userManager = new SimpleAgenticTool("userManager", "Manage user accounts")
        .withTools(searchUserTool, getUserTool)           // Tools to find/retrieve users
        .withToolChainingFrom(User.class);                // User methods become tools when retrieved

    // Flow:
    // 1. LLM calls searchUserTool to find users
    // 2. LLM calls getUserTool which returns a User artifact
    // 3. updateEmail() becomes available as a tool bound to that User
    // 4. LLM calls updateEmail("new@example.com")
    ```

Kotlin
:   ```
    // Domain class with tool methods
    class User(val id: String, var email: String) {
        @LlmTool("Update the user's email address")
        fun updateEmail(newEmail: String): String {
            this.email = newEmail
            return "Email updated to $newEmail"
        }
    }

    // Create agentic tool with tool chaining
    val userManager = SimpleAgenticTool("userManager", "Manage user accounts")
        .withTools(searchUserTool, getUserTool)     // Tools to find/retrieve users
        .withToolChainingFrom<User>()               // User methods become tools when retrieved

    // Flow:
    // 1. LLM calls searchUserTool to find users
    // 2. LLM calls getUserTool which returns a User artifact
    // 3. updateEmail() becomes available as a tool bound to that User
    // 4. LLM calls updateEmail("new@example.com")
    ```

###### Predicate-Based Filtering

You can control which instances contribute tools using a predicate.
The predicate receives the artifact and the current `AgentProcess`, allowing filtering based on object state or process context.

Java
:   ```
    // Only expose tools for admin users
    SimpleAgenticTool adminManager = new SimpleAgenticTool("adminManager", "Manage admin users")
        .withTools(searchUserTool, getUserTool)
        .withToolChainingFrom(User.class, (user, agentProcess) ->
            user.getRole().equals("admin")
        );

    // Regular users won't have their tools exposed
    // Only when an admin User is retrieved will updateEmail() become available
    ```

Kotlin
:   ```
    // Only expose tools for admin users
    val adminManager = SimpleAgenticTool("adminManager", "Manage admin users")
        .withTools(searchUserTool, getUserTool)
        .withToolChainingFrom<User> { user, _ ->
            user.role == "admin"
        }

    // Regular users won't have their tools exposed
    // Only when an admin User is retrieved will updateEmail() become available
    ```

###### Auto-Discovery Mode

For maximum flexibility, use `withToolChainingFromAny()` to automatically discover and expose tools from any returned artifact that has `@LlmTool` methods.
Unlike registered sources, auto-discovery replaces ALL previous bindings when a new artifact is discoveredâensuring only one "current" object’s tools are active at a time.

Java
:   ```
    // Auto-discover tools from any returned object
    SimpleAgenticTool explorer = new SimpleAgenticTool("explorer", "Explore and manipulate objects")
        .withTools(searchTool, getTool)
        .withToolChainingFromAny();  // Tools from any returned object are exposed

    // Flow:
    // 1. LLM calls getTool which returns a User -> User tools are available
    // 2. LLM calls another getTool which returns an Order -> Order tools replace User tools
    // 3. Only the most recent object's tools are active
    ```

Kotlin
:   ```
    // Auto-discover tools from any returned object
    val explorer = SimpleAgenticTool("explorer", "Explore and manipulate objects")
        .withTools(searchTool, getTool)
        .withToolChainingFromAny()  // Tools from any returned object are exposed

    // Flow:
    // 1. LLM calls getTool which returns a User -> User tools are available
    // 2. LLM calls another getTool which returns an Order -> Order tools replace User tools
    // 3. Only the most recent object's tools are active
    ```

This pattern is useful when:

* **Objects have operations**: The object itself knows how to perform actions (e.g., `user.updateEmail()`, `order.cancel()`)
* **Context-dependent tools**: Operations only make sense after retrieving a specific instance
* **Clean API design**: Tools are defined on the class rather than as separate tool classes
* **Exploratory workflows**: The LLM dynamically works with whatever object is "current"

All agentic tool types support tool chaining:

* `SimpleAgenticTool`: Chained tools are available as soon as an artifact is returned
* `PlaybookTool`: Chained tools are available immediately (not subject to unlock conditions)
* `StateMachineTool`: Chained tools are available globally (not state-bound)

###### Tool Chaining on PromptRunner

Tool chaining is not limited to agentic tools.
Because both `AgenticTool` and `PromptRunner` implement the `ToolChaining` interface, you can use `withToolChainingFrom()` and `withToolChainingFromAny()` directly on a `PromptRunner` obtained from an action’s `OperationContext`.

This is important because it enables dynamic tool discovery within simple `createObject` and `generateText` callsâwithout requiring a full `SimpleAgenticTool` wrapper.

Java
:   ```
    // In an @Action method:
    PromptRunner ai = context.ai()
        .withToolChainingFrom(User.class)       // Chained tools from User
        .withTools(searchUserTool, getUserTool);

    // When getUserTool returns a User artifact, User's @LlmTool methods
    // automatically become available for the LLM to call
    String result = ai.generateText("Find user Alice and update her email to alice@new.com");
    ```

Kotlin
:   ```
    // In an @Action method:
    val ai = context.ai()
        .withToolChainingFrom<User>()           // Chained tools from User
        .withTools(searchUserTool, getUserTool)

    // When getUserTool returns a User artifact, User's @LlmTool methods
    // automatically become available for the LLM to call
    val result = ai.generateText("Find user Alice and update her email to alice@new.com")
    ```

##### Filtering Artifacts for Asset Tracking

When using tools with an `AssetTracker` (common in chat applications), you can filter which artifacts become tracked assets.
The `addReturnedAssets` and `addAnyReturnedAssets` methods accept a `Predicate<Asset>` filter that works with both Java and Kotlin:

Java
:   ```
    // Track only assets that pass the filter
    Tool wrapped = assetTracker.addReturnedAssets(concertTool, asset -> {
        // Only track concerts with at least 3 works
        return asset instanceof Concert concert && concert.getWorks().size() >= 3;
    });

    // Apply the same filter to multiple tools
    List<Tool> wrappedTools = assetTracker.addAnyReturnedAssets(
        List.of(tool1, tool2, tool3),
        asset -> asset.getId().startsWith("important-")
    );
    ```

Kotlin
:   ```
    // Track only assets that pass the filter
    val wrapped = assetTracker.addReturnedAssets(concertTool) { asset ->
        // Only track concerts with at least 3 works
        asset is Concert && asset.works.size >= 3
    }

    // Apply the same filter to multiple tools
    val wrappedTools = assetTracker.addAnyReturnedAssets(
        listOf(tool1, tool2, tool3)
    ) { asset -> asset.id.startsWith("important-") }
    ```

The filter is applied after type matching, so you can use type-specific criteria to decide which artifacts are worth tracking.

##### Migration from Other Frameworks

If you’re coming from frameworks like LangChain or Google ADK, Embabel’s agentic tools provide a familiar pattern similar to their "supervisor" architectures:

| Framework | Pattern | Embabel Equivalent |
| --- | --- | --- |
| LangChain/LangGraph | Supervisor agent with worker agents | `SimpleAgenticTool` with sub-tools |
| Google ADK | Coordinator with `sub_agents` / `AgentTool` | `SimpleAgenticTool` with sub-tools |

The key differences:

* **Tool-centric**: Embabel’s agentic tools operate at the tool level, not the agent level.
  They’re lightweight and can be mixed freely with regular tools.
* **Simpler model**: No graph-based workflows or explicit Sequential/Parallel/Loop patternsâjust LLM-driven orchestration.
* **Composable**: An agentic tool is still "just a tool" that can be used anywhere tools are accepted.

However, for anything beyond simple orchestration, Embabel offers far more powerful alternatives:

| Scenario | Use This Instead |
| --- | --- |
| Business processes with defined outputs | [GOAP planner](#reference.planners) - deterministic, goal-oriented planning with preconditions and effects |
| Exploration and event-driven systems | [Utility AI](#reference.planners__utility) - selects highest-value action at each step |
| Branching, looping, or stateful workflows | [@State workflows](#reference.states) - typesafe state machines with GOAP planning within each state |

These provide **deterministic, typesafe planning** that is far more predictable and powerful than supervisor-style LLM orchestration.
Use `SimpleAgenticTool` for simple cases, `PlaybookTool` for structured workflows, or `StateMachineTool` for formal state machines.
Graduate to GOAP, Utility, or @State for production workflows where predictability matters.

|  |  |
| --- | --- |
|  | For supervisor-style orchestration with typed outputs and full blackboard state management, see [SupervisorInvocation](#reference.planners__supervisor-invocation). It operates at a higher level than agentic tools, orchestrating `@Action` methods rather than `Tool` instances, and produces typed goal objects with currying support. |

#### 4.9.8. Progressive Tools

> Great fleas have little fleas upon their backs to bite 'em,  
> And little fleas have lesser fleas, and so ad infinitum.  
> And the great fleas themselves, in turn, have greater fleas to go on;  
> While these again have greater still, and greater still, and so on.

— Augustus De Morgan

**Progressive tools** enable dynamic tool disclosureâpresenting a simplified interface initially, then revealing more granular tools based on context or when the LLM expresses intent.

##### The Progressive Tool Hierarchy

Embabel provides a hierarchy of progressive tool interfaces:

* **`ProgressiveTool`**: The base interface for tools that can reveal inner tools based on context. Its `innerTools(process: AgentProcess)` method returns tools that may vary depending on the current agent process state.
* **`UnfoldingTool`**: A `ProgressiveTool` with a fixed set of inner tools. When invoked, it "unfolds" to reveal its contentsâlike opening a folded map to see the details inside. This is the most commonly used progressive tool type.

An `UnfoldingTool` presents a high-level description to the LLM and, when invoked, exposes its inner tools.
This pattern is useful for **progressive tool disclosure**âreducing initial complexity while allowing access to detailed functionality on demand.

##### When to Use UnfoldingTool

UnfoldingTool is useful when:

* You have many related tools that might overwhelm the LLM with choices
* You want to group tools by category (e.g., "database operations", "file operations")
* You want the LLM to express intent before revealing detailed options
* You need to reduce token usage for tool descriptions

##### Creating a Simple UnfoldingTool

The simplest form exposes all inner tools when invoked:

Java
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;
    import com.embabel.agent.api.tool.Tool;

    // Create inner tools
    Tool queryTool = Tool.create("query_table", "Execute a SQL query",
        Tool.InputSchema.of(Tool.Parameter.string("sql", "The SQL query to execute")),
        input -> Tool.Result.text("{\"rows\": 5}")
    );

    Tool insertTool = Tool.create("insert_record", "Insert a new record",
        Tool.InputSchema.of(Tool.Parameter.string("table", "Table name")),
        input -> Tool.Result.text("{\"id\": 123}")
    );

    Tool deleteTool = Tool.create("delete_record", "Delete a record",
        Tool.InputSchema.of(Tool.Parameter.integer("id", "Record ID to delete")),
        input -> Tool.Result.text("{\"deleted\": true}")
    );

    // Create the UnfoldingTool facade
    var databaseTool = UnfoldingTool.of(
        "database_operations",
        "Use this tool to work with the database. Invoke to see specific operations.",
        List.of(queryTool, insertTool, deleteTool)
    );
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool
    import com.embabel.agent.api.tool.Tool

    // Create inner tools
    val queryTool = Tool.of(
        name = "query_table",
        description = "Execute a SQL query",
        inputSchema = Tool.InputSchema.of(Tool.Parameter.string("sql", "The SQL query to execute"))
    ) { input -> Tool.Result.text("""{"rows": 5}""") }

    val insertTool = Tool.of(
        name = "insert_record",
        description = "Insert a new record",
        inputSchema = Tool.InputSchema.of(Tool.Parameter.string("table", "Table name"))
    ) { input -> Tool.Result.text("""{"id": 123}""") }

    val deleteTool = Tool.of(
        name = "delete_record",
        description = "Delete a record",
        inputSchema = Tool.InputSchema.of(Tool.Parameter.integer("id", "Record ID to delete"))
    ) { input -> Tool.Result.text("""{"deleted": true}""") }

    // Create the UnfoldingTool facade
    val databaseTool = UnfoldingTool.of(
        name = "database_operations",
        description = "Use this tool to work with the database. Invoke to see specific operations.",
        innerTools = listOf(queryTool, insertTool, deleteTool)
    )
    ```

##### Fluent Builder API

UnfoldingTool supports a fluent builder pattern for combining tools from multiple sources.
Use `withTools()` to add individual tools or `withToolObject()` to add tools from `@LlmTool` annotated objects:

Java
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;

    // Start with base tools and add more
    var combinedTools = UnfoldingTool.of(
            "workspace",
            "Workspace operations. Invoke to see available tools.",
            List.of(baseTool))
        .withTools(searchTool, filterTool)           // Add individual tools
        .withToolObject(new DatabaseOperations())    // Add from @LlmTool class
        .withToolObject(new FileOperations());       // Chain multiple sources
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool

    // Start with base tools and add more
    val combinedTools = UnfoldingTool.of(
        name = "workspace",
        description = "Workspace operations. Invoke to see available tools.",
        innerTools = listOf(baseTool)
    )
        .withTools(searchTool, filterTool)           // Add individual tools
        .withToolObject(DatabaseOperations())        // Add from @LlmTool class
        .withToolObject(FileOperations())            // Chain multiple sources
    ```

This is useful when:

* **Combining existing tools**: Merge tools from different sources into one progressive facade
* **Adding ad-hoc tools**: Start with annotated tool classes and add programmatic tools
* **Context-specific grouping**: Build different tool combinations for different invocation contexts

The builder preserves all properties (`childToolUsageNotes`, etc.) from the original UnfoldingTool.

##### Category-Based Tool Selection

Use `byCategory` to expose different tools based on the category the LLM selects:

Java
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;
    import java.util.Map;

    // Define tools by category
    Map<String, List<Tool>> toolsByCategory = Map.of(
        "read", List.of(readFileTool, listDirectoryTool, searchFilesTool),
        "write", List.of(writeFileTool, deleteFileTool, moveFileTool)
    );

    // Create category-based UnfoldingTool
    var fileTool = UnfoldingTool.byCategory(
        "file_operations",
        "File operations. Pass category: 'read' for reading files, 'write' for modifying files.",
        toolsByCategory
    );

    // The tool's schema automatically includes the category as an enum parameter
    // When invoked with {"category": "read"}, only read tools are exposed
    // When invoked with {"category": "write"}, only write tools are exposed
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool

    // Define tools by category
    val toolsByCategory = mapOf(
        "read" to listOf(readFileTool, listDirectoryTool, searchFilesTool),
        "write" to listOf(writeFileTool, deleteFileTool, moveFileTool)
    )

    // Create category-based UnfoldingTool
    val fileTool = UnfoldingTool.byCategory(
        name = "file_operations",
        description = "File operations. Pass category: 'read' for reading files, 'write' for modifying files.",
        toolsByCategory = toolsByCategory
    )

    // The tool's schema automatically includes the category as an enum parameter
    // When invoked with {"category": "read"}, only read tools are exposed
    // When invoked with {"category": "write"}, only write tools are exposed
    ```

##### Custom Selection Logic

For more complex selection logic, use `selectable`:

Java
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;
    import com.fasterxml.jackson.databind.ObjectMapper;

    List<Tool> allTools = List.of(basicTool, advancedTool, adminTool);

    var permissionBasedTool = UnfoldingTool.selectable(
        "api_operations",
        "API operations. Pass 'accessLevel': 'basic', 'advanced', or 'admin'.",
        allTools,
        Tool.InputSchema.of(
            Tool.Parameter.string("accessLevel", "Access level for operations",
                true, List.of("basic", "advanced", "admin"))
        ),
        true,  // removeOnInvoke
        input -> {
            // Custom selection logic
            try {
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> params = mapper.readValue(input, Map.class);
                String level = (String) params.get("accessLevel");
                return switch (level) {
                    case "basic" -> List.of(basicTool);
                    case "advanced" -> List.of(basicTool, advancedTool);
                    case "admin" -> allTools;
                    default -> List.of(basicTool);
                };
            } catch (Exception e) {
                return List.of(basicTool);
            }
        }
    );
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool
    import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

    val allTools = listOf(basicTool, advancedTool, adminTool)

    val permissionBasedTool = UnfoldingTool.selectable(
        name = "api_operations",
        description = "API operations. Pass 'accessLevel': 'basic', 'advanced', or 'admin'.",
        innerTools = allTools,
        inputSchema = Tool.InputSchema.of(
            Tool.Parameter.string("accessLevel", "Access level for operations",
                required = true, enumValues = listOf("basic", "advanced", "admin"))
        ),
    ) { input ->
        // Custom selection logic
        val mapper = jacksonObjectMapper()
        val params = mapper.readValue(input, Map::class.java)
        when (params["accessLevel"]) {
            "basic" -> listOf(basicTool)
            "advanced" -> listOf(basicTool, advancedTool)
            "admin" -> allTools
            else -> listOf(basicTool)
        }
    }
    ```

##### Guide Tool Behavior

When an UnfoldingTool is invoked, it is replaced by its inner tools plus a **guide tool** with the same name as the original facade.
If the LLM calls the parent tool name again on a subsequent turn (a common tool-calling mistake), the guide tool returns a listing of the available sub-tools instead of failing with a `ToolNotFoundException`.

This behavior is automatic â no configuration needed. The `removeOnInvoke` property is deprecated and ignored; the guide tool replacement always applies.

##### Enabling UnfoldingTool in the Tool Loop

UnfoldingTool is **enabled by default** when using Embabel’s tool loop.
The `ToolInjectionStrategy.DEFAULT` includes `UnfoldingToolInjectionStrategy`, so no additional configuration is needed.

If you need to combine with custom strategies, use `ChainedToolInjectionStrategy`:

Java
:   ```
    import com.embabel.agent.spi.loop.ChainedToolInjectionStrategy;

    // Combine UnfoldingTool support with custom strategies
    ChainedToolInjectionStrategy combined =
        ChainedToolInjectionStrategy.withUnfolding(customStrategy1, customStrategy2);
    ```

Kotlin
:   ```
    import com.embabel.agent.spi.loop.ChainedToolInjectionStrategy

    // Combine UnfoldingTool support with custom strategies
    val combined = ChainedToolInjectionStrategy.withUnfolding(customStrategy1, customStrategy2)
    ```

##### How UnfoldingToolWorks

1. **Initial state**: The LLM sees only the facade tool (e.g., "database\_operations")
2. **LLM invokes**: The LLM calls the facade with optional arguments
3. **Strategy evaluates**: `UnfoldingToolInjectionStrategy` detects the invocation
4. **Tools replaced**: The facade is replaced by a guide tool and inner tools are added
5. **Continue**: The LLM now sees and can use the specific inner tools

This flow reduces the initial tool set complexity while allowing the LLM to access detailed tools when it needs them.

##### Context Preservation and Usage Notes

When a UnfoldingTool is expanded, its child tools replace the facade.
Without context preservation, the LLM would lose important information about *why* these tools are grouped together.

For example, a "spotify\_search" tool containing `vector_search`, `text_search`, and `regex_search` would expand to just three generic search tools - the LLM wouldn’t know these are specifically for searching Spotify music data.

Embabel solves this by automatically injecting a **context tool** alongside the child tools.
This context tool:

* Preserves the parent’s description ("Search Spotify for music data")
* Lists the available child tools
* Includes optional usage notes (via `childToolUsageNotes`)

The `childToolUsageNotes` parameter provides guidance on when and how to use the child tools.
This guidance appears **once** in the context tool rather than being duplicated in each child tool’s description:

Java
:   ```
    var spotifySearch = UnfoldingTool.of(
        "spotify_search",
        "Search Spotify for music data including artists, albums, and tracks.",
        List.of(vectorSearchTool, textSearchTool, regexSearchTool),
        true,  // removeOnInvoke
        "Try vector search first for semantic queries like 'upbeat jazz'. " +
        "Use text search for exact artist or album names. " +
        "Use regex search for pattern matching on metadata."
    );
    ```

Kotlin
:   ```
    val spotifySearch = UnfoldingTool.of(
        name = "spotify_search",
        description = "Search Spotify for music data including artists, albums, and tracks.",
        innerTools = listOf(vectorSearchTool, textSearchTool, regexSearchTool),
        childToolUsageNotes = """
            Try vector search first for semantic queries like 'upbeat jazz'.
            Use text search for exact artist or album names.
            Use regex search for pattern matching on metadata.
        """.trimIndent()
    )
    ```

After the LLM invokes `spotify_search`, it will see:

* `vector_search` - the actual search tool
* `text_search` - the actual search tool
* `regex_search` - the actual search tool
* `spotify_search_context` - context tool with description and usage notes

The context tool’s description includes the original purpose and available tools.
When called, it returns full details about each child tool plus the usage notes - providing a single reference point without polluting individual tool descriptions.

##### Exclusive Mode

By default, when an UnfoldingTool is expanded, its inner tools are added alongside any sibling tools already in the tool set.
In some cases the LLM may ignore the inner tools and instead pick a sibling tool, defeating the purpose of the unfolding.

Setting `exclusive = true` removes **all** other tools when the UnfoldingTool is expanded, so the LLM sees only the inner tools until the interaction ends.
Use this when the LLM consistently picks the wrong sibling tool instead of using the revealed inner tools.

Java
:   ```
    var personalityTool = UnfoldingTool.of(
        "change_personality",
        "Change the assistant's personality. Invoke to see personality options.",
        List.of(formalTool, casualTool, technicalTool),
        true,   // removeOnInvoke
        null,   // childToolUsageNotes
        true    // exclusive â hide all other tools after expansion
    );
    ```

Kotlin
:   ```
    val personalityTool = UnfoldingTool.of(
        name = "change_personality",
        description = "Change the assistant's personality. Invoke to see personality options.",
        innerTools = listOf(formalTool, casualTool, technicalTool),
        exclusive = true, // hide all other tools after expansion
    )
    ```

When `exclusive` is false (the default), the parent tool is replaced by its inner tools and all sibling tools remain available.
When `exclusive` is true, every tool in the current tool set is removed and only the inner tools are injected.

##### Annotation-Based UnfoldingTool

For a more declarative approach, use the `@UnfoldingTools` class annotation combined with `@LlmTool` method annotations:

Java
:   ```
    import com.embabel.agent.api.annotation.UnfoldingTools;
    import com.embabel.agent.api.annotation.LlmTool;

    @UnfoldingTools(
        name = "database_operations",
        description = "Database operations. Invoke to see specific tools."
    )
    public class DatabaseTools {

        @LlmTool(description = "Execute a SQL query")
        public QueryResult query(String sql) {
            // implementation
        }

        @LlmTool(description = "Insert a record")
        public InsertResult insert(String table, Map<String, Object> data) {
            // implementation
        }

        @LlmTool(description = "Delete a record")
        public void delete(long id) {
            // implementation
        }
    }

    // Create the UnfoldingTool from the annotated class
    var tool = UnfoldingTool.fromInstance(new DatabaseTools());
    ```

Kotlin
:   ```
    import com.embabel.agent.api.annotation.UnfoldingTools
    import com.embabel.agent.api.annotation.LlmTool

    @UnfoldingTools(
        name = "database_operations",
        description = "Database operations. Invoke to see specific tools."
    )
    class DatabaseTools {

        @LlmTool(description = "Execute a SQL query")
        fun query(sql: String): QueryResult {
            // implementation
        }

        @LlmTool(description = "Insert a record")
        fun insert(table: String, data: Map<String, Any>): InsertResult {
            // implementation
        }

        @LlmTool(description = "Delete a record")
        fun delete(id: Long) {
            // implementation
        }
    }

    // Create the UnfoldingTool from the annotated class
    val tool = UnfoldingTool.fromInstance(DatabaseTools())
    ```

You can also specify `childToolUsageNotes` in the annotation to provide guidance on using the child tools:

Java
:   ```
    @UnfoldingTools(
        name = "music_search",
        description = "Search music database for artists, albums, and tracks",
        childToolUsageNotes = "Try vector search first for semantic queries. " +
            "Use text search for exact artist names."
    )
    public class MusicSearchTools {

        @LlmTool(description = "Semantic search using embeddings")
        public List<Track> vectorSearch(String query) {
            // implementation
        }

        @LlmTool(description = "Exact match text search")
        public List<Track> textSearch(String query) {
            // implementation
        }
    }
    ```

Kotlin
:   ```
    @UnfoldingTools(
        name = "music_search",
        description = "Search music database for artists, albums, and tracks",
        childToolUsageNotes = "Try vector search first for semantic queries. " +
            "Use text search for exact artist names."
    )
    class MusicSearchTools {

        @LlmTool(description = "Semantic search using embeddings")
        fun vectorSearch(query: String): List<Track> {
            // implementation
        }

        @LlmTool(description = "Exact match text search")
        fun textSearch(query: String): List<Track> {
            // implementation
        }
    }
    ```

##### Category-Based Selection with Annotations

Add `category` to `@LlmTool` annotations to automatically create a category-based UnfoldingTool:

Java
:   ```
    @UnfoldingTools(
        name = "file_operations",
        description = "File operations. Pass category: 'read' or 'write'."
    )
    public class FileTools {

        @LlmTool(description = "Read file contents", category = "read")
        public String readFile(String path) {
            return Files.readString(Path.of(path));
        }

        @LlmTool(description = "List directory contents", category = "read")
        public List<String> listDir(String path) {
            return Files.list(Path.of(path)).map(Path::toString).toList();
        }

        @LlmTool(description = "Write file contents", category = "write")
        public void writeFile(String path, String content) {
            Files.writeString(Path.of(path), content);
        }

        @LlmTool(description = "Delete a file", category = "write")
        public void deleteFile(String path) {
            Files.delete(Path.of(path));
        }
    }

    // Automatically creates category-based selection
    var tool = UnfoldingTool.fromInstance(new FileTools());
    // When invoked with {"category": "read"}, only read tools are exposed
    // When invoked with {"category": "write"}, only write tools are exposed
    ```

Kotlin
:   ```
    @UnfoldingTools(
        name = "file_operations",
        description = "File operations. Pass category: 'read' or 'write'."
    )
    class FileTools {

        @LlmTool(description = "Read file contents", category = "read")
        fun readFile(path: String): String = File(path).readText()

        @LlmTool(description = "List directory contents", category = "read")
        fun listDir(path: String): List<String> = File(path).list()?.toList() ?: emptyList()

        @LlmTool(description = "Write file contents", category = "write")
        fun writeFile(path: String, content: String) {
            File(path).writeText(content)
        }

        @LlmTool(description = "Delete a file", category = "write")
        fun deleteFile(path: String) {
            File(path).delete()
        }
    }

    // Automatically creates category-based selection
    val tool = UnfoldingTool.fromInstance(FileTools())
    // When invoked with {"category": "read"}, only read tools are exposed
    // When invoked with {"category": "write"}, only write tools are exposed
    ```

##### @UnfoldingTools Annotation Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | String | Required | Name of the facade tool the LLM will see |
| `description` | String | Required | Description explaining the tool category |
| `removeOnInvoke` *(deprecated)* | boolean | `true` (ignored â always replaced by guide tool) | Whether to remove the facade after invocation |
| `categoryParameter` | String | `"category"` | Name of the parameter for category selection |

##### @LlmTool Category Attribute

The `category` attribute on `@LlmTool` is used when the containing class has `@UnfoldingTools`:

* Tools with the same category are grouped together
* Tools without a category are added to all category groups plus an "all" category
* If no tools have categories, a simple (non-category-based) UnfoldingTool is created

##### Real-World Example: Spotify Integration

Here’s a real-world example from the Impromptu chatbot that uses `@UnfoldingTools` to progressively disclose Spotify functionality:

Java
:   ```
    @UnfoldingTools(
        name = "spotify",
        description = "Access Spotify music features. Invoke this tool to enable Spotify " +
                "operations like playing music, searching tracks, managing playlists, " +
                "and controlling playback."
    )
    public record SpotifyTools(ImpromptuUser user, SpotifyService spotifyService) {

        @LlmTool(description = "Check if user has linked their Spotify account")
        public String checkSpotifyStatus() { /* ... */ }

        @LlmTool(description = "Get the user's Spotify playlists")
        public String getPlaylists() { /* ... */ }

        @LlmTool(description = "Search for tracks on Spotify by song name, artist, or both")
        public String searchTracks(String query) { /* ... */ }

        @LlmTool(description = "Play a track on Spotify by searching for it")
        public String playTrack(String query) { /* ... */ }

        @LlmTool(description = "Pause the current Spotify playback")
        public String pausePlayback() { /* ... */ }

        // ... more tools
    }
    ```

Kotlin
:   ```
    @UnfoldingTools(
        name = "spotify",
        description = "Access Spotify music features. Invoke this tool to enable Spotify " +
                "operations like playing music, searching tracks, managing playlists, " +
                "and controlling playback."
    )
    data class SpotifyTools(val user: ImpromptuUser, val spotifyService: SpotifyService) {

        @LlmTool(description = "Check if user has linked their Spotify account")
        fun checkSpotifyStatus(): String { /* ... */ }

        @LlmTool(description = "Get the user's Spotify playlists")
        fun getPlaylists(): String { /* ... */ }

        @LlmTool(description = "Search for tracks on Spotify by song name, artist, or both")
        fun searchTracks(query: String): String { /* ... */ }

        @LlmTool(description = "Play a track on Spotify by searching for it")
        fun playTrack(query: String): String { /* ... */ }

        @LlmTool(description = "Pause the current Spotify playback")
        fun pausePlayback(): String { /* ... */ }

        // ... more tools
    }
    ```

With this setup:

1. The LLM initially sees a single `spotify` tool
2. When the user says "play some jazz", the LLM invokes `spotify`
3. The `spotify` facade is replaced with all the inner tools (`getPlaylists`, `searchTracks`, `playTrack`, etc.)
4. The LLM can then call `searchTracks` or `playTrack` to fulfill the request

##### Auto-Detection with Tool.fromInstance()

When you use `Tool.fromInstance()` on a class annotated with `@UnfoldingTools`, it automatically creates an `UnfoldingTool`:

Java
:   ```
    // Auto-detects @UnfoldingTools and creates an UnfoldingTool
    List<Tool> tools = Tool.fromInstance(new SpotifyTools(user, service));
    // Returns a single UnfoldingTool, not individual tools
    ```

Kotlin
:   ```
    // Auto-detects @UnfoldingTools and creates an UnfoldingTool
    val tools = Tool.fromInstance(SpotifyTools(user, service))
    // Returns a single UnfoldingTool, not individual tools
    ```

This works seamlessly with `withToolObject()` on PromptRunner:

Java
:   ```
    context.ai()
        .withToolObject(new SpotifyTools(user, spotifyService))
        .respond("Play some classical music");
    // The SpotifyTools are automatically exposed as a single UnfoldingTool facade
    ```

Kotlin
:   ```
    context.ai()
        .withToolObject(SpotifyTools(user, spotifyService))
        .respond("Play some classical music")
    // The SpotifyTools are automatically exposed as a single UnfoldingTool facade
    ```

##### Wrapping Tool Objects with fromToolObject()

`UnfoldingTool.fromInstance()` requires the class to be annotated with `@UnfoldingTools`.
This doesn’t work for objects like interface implementations with `@LlmTool` default methods that you cannot or should not annotate with `@UnfoldingTools`.

Use `fromToolObject()` to wrap **any** object with `@LlmTool` methods into an `UnfoldingTool`, providing name and description explicitly:

Java
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;

    // FileWriteTools is an interface with @LlmTool default methodsâ
    // it cannot be annotated with @UnfoldingTools
    FileWriteTools fileTools = new FileWriteToolsImpl(workspace);

    var tool = UnfoldingTool.fromToolObject(
        fileTools,
        "file_write_tools",
        "Tools for writing and managing files. Invoke to see specific operations."
    );
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.progressive.UnfoldingTool

    // FileWriteTools is an interface with @LlmTool default methodsâ
    // it cannot be annotated with @UnfoldingTools
    val fileTools: FileWriteTools = FileWriteToolsImpl(workspace)

    val tool = UnfoldingTool.fromToolObject(
        instance = fileTools,
        name = "file_write_tools",
        description = "Tools for writing and managing files. Invoke to see specific operations.",
    )
    ```

All standard options are available:

Java
:   ```
    var tool = UnfoldingTool.fromToolObject(
        fileTools,
        "file_write_tools",
        "Tools for writing and managing files.",
        false,                                          // removeOnInvoke
        "Use writeFile for new files, appendFile for existing ones."  // childToolUsageNotes
    );
    ```

Kotlin
:   ```
    val tool = UnfoldingTool.fromToolObject(
        instance = fileTools,
        name = "file_write_tools",
        description = "Tools for writing and managing files.",
        removeOnInvoke = false,
        childToolUsageNotes = "Use writeFile for new files, appendFile for existing ones.",
    )
    ```

|  |  |
| --- | --- |
|  | Use `fromToolObject()` when the tool class is an interface, a third-party class, or any class where adding `@UnfoldingTools` is impractical. Use `fromInstance()` when you control the class and can add the `@UnfoldingTools` annotation. |

##### Nested UnfoldingTools

UnfoldingTools can be nested for multi-level progressive disclosure.
This enables organizing large tool collections into logical hierarchies where the LLM navigates by invoking facade tools.

###### Programmatic Nesting

Use `UnfoldingTool.of()` to create nested hierarchies programmatically:

Java
:   ```
    // Inner UnfoldingTool for user management
    var userManagement = UnfoldingTool.of(
        "user_management",
        "User management operations",
        List.of(createUserTool, deleteUserTool, updateUserTool)
    );

    // Inner UnfoldingTool for system config
    var systemConfig = UnfoldingTool.of(
        "system_config",
        "System configuration operations",
        List.of(updateConfigTool, backupTool, restoreTool)
    );

    // Outer UnfoldingTool containing both
    var adminTool = UnfoldingTool.of(
        "admin_operations",
        "Administrative operations. Invoke to see categories.",
        List.of(userManagement, systemConfig)
    );

    // Flow:
    // 1. LLM sees: admin_operations
    // 2. LLM invokes: admin_operations -> sees: user_management, system_config
    // 3. LLM invokes: user_management -> sees: createUser, deleteUser, updateUser
    ```

Kotlin
:   ```
    // Inner UnfoldingTool for user management
    val userManagement = UnfoldingTool.of(
        name = "user_management",
        description = "User management operations",
        innerTools = listOf(createUserTool, deleteUserTool, updateUserTool)
    )

    // Inner UnfoldingTool for system config
    val systemConfig = UnfoldingTool.of(
        name = "system_config",
        description = "System configuration operations",
        innerTools = listOf(updateConfigTool, backupTool, restoreTool)
    )

    // Outer UnfoldingTool containing both
    val adminTool = UnfoldingTool.of(
        name = "admin_operations",
        description = "Administrative operations. Invoke to see categories.",
        innerTools = listOf(userManagement, systemConfig)
    )

    // Flow:
    // 1. LLM sees: admin_operations
    // 2. LLM invokes: admin_operations -> sees: user_management, system_config
    // 3. LLM invokes: user_management -> sees: createUser, deleteUser, updateUser
    ```

###### Annotation-Based Nesting with Inner Classes

You can also create nested hierarchies using `@UnfoldingTools` annotations on inner classes.
When `UnfoldingTool.fromInstance()` is called, it automatically discovers and includes any nested inner classes that are also annotated with `@UnfoldingTools`:

Java
:   ```
    @UnfoldingTools(
        name = "admin_operations",
        description = "Administrative operations. Invoke to access specific areas."
    )
    public class AdminTools {

        @LlmTool(description = "Get system status")
        public String getStatus() {
            return "System is healthy";
        }

        // Nested inner class - automatically discovered and included as a nested UnfoldingTool
        @UnfoldingTools(
            name = "user_management",
            description = "User management operations. Invoke to see specific tools."
        )
        public static class UserManagement {

            @LlmTool(description = "Create a new user")
            public String createUser(String username) { return "Created user: " + username; }

            @LlmTool(description = "Delete a user")
            public String deleteUser(String username) { return "Deleted user: " + username; }

            // Can nest even deeper
            @UnfoldingTools(
                name = "user_permissions",
                description = "User permission operations"
            )
            public static class Permissions {

                @LlmTool(description = "Grant permission to user")
                public String grant(String user, String permission) { return "Granted"; }

                @LlmTool(description = "Revoke permission from user")
                public String revoke(String user, String permission) { return "Revoked"; }
            }
        }

        @UnfoldingTools(
            name = "system_config",
            description = "System configuration. Invoke to see config tools."
        )
        public static class SystemConfig {

            @LlmTool(description = "Update configuration")
            public String updateConfig(String key, String value) { return "Updated"; }

            @LlmTool(description = "Backup configuration")
            public String backup() { return "Backed up"; }
        }
    }

    // Create the full nested hierarchy automatically
    var adminTool = UnfoldingTool.fromInstance(new AdminTools());

    // Flow:
    // 1. LLM sees: admin_operations
    // 2. LLM invokes: admin_operations -> sees: getStatus, user_management, system_config
    // 3. LLM invokes: user_management -> sees: createUser, deleteUser, user_permissions
    // 4. LLM invokes: user_permissions -> sees: grant, revoke
    ```

Kotlin
:   ```
    @UnfoldingTools(
        name = "admin_operations",
        description = "Administrative operations. Invoke to access specific areas."
    )
    class AdminTools {

        @LlmTool(description = "Get system status")
        fun getStatus(): String = "System is healthy"

        // Nested inner class - automatically discovered and included as a nested UnfoldingTool
        @UnfoldingTools(
            name = "user_management",
            description = "User management operations. Invoke to see specific tools."
        )
        class UserManagement {

            @LlmTool(description = "Create a new user")
            fun createUser(username: String): String = "Created user: $username"

            @LlmTool(description = "Delete a user")
            fun deleteUser(username: String): String = "Deleted user: $username"

            // Can nest even deeper
            @UnfoldingTools(
                name = "user_permissions",
                description = "User permission operations"
            )
            class Permissions {

                @LlmTool(description = "Grant permission to user")
                fun grant(user: String, permission: String): String = "Granted"

                @LlmTool(description = "Revoke permission from user")
                fun revoke(user: String, permission: String): String = "Revoked"
            }
        }

        @UnfoldingTools(
            name = "system_config",
            description = "System configuration. Invoke to see config tools."
        )
        class SystemConfig {

            @LlmTool(description = "Update configuration")
            fun updateConfig(key: String, value: String): String = "Updated"

            @LlmTool(description = "Backup configuration")
            fun backup(): String = "Backed up"
        }
    }

    // Create the full nested hierarchy automatically
    val adminTool = UnfoldingTool.fromInstance(AdminTools())

    // Flow:
    // 1. LLM sees: admin_operations
    // 2. LLM invokes: admin_operations -> sees: getStatus, user_management, system_config
    // 3. LLM invokes: user_management -> sees: createUser, deleteUser, user_permissions
    // 4. LLM invokes: user_permissions -> sees: grant, revoke
    ```

This approach provides several benefits:

* **Encapsulation**: All related tools are organized in a single class hierarchy
* **Automatic discovery**: No manual wiring - inner classes with `@UnfoldingTools` are automatically included
* **Arbitrary depth**: Nest as many levels as needed to organize your tools logically
* **Mixed content**: Each level can have both direct `@LlmTool` methods and nested `@UnfoldingTools` classes

##### Dynamically Configured Inner Tools

A powerful pattern with `UnfoldingTool.selectable()` is creating inner tools that are **configured** based on the parameters passed when invoking the facade.
The selector function can create new tool instances with captured state, connection strings, or other configuration:

Java
:   ```
    // UnfoldingTool that configures database tools based on connection parameter
    var databaseTool = UnfoldingTool.selectable(
        "database",
        "Database operations. Pass 'connection' to configure tools.",
        Collections.emptyList(),  // Tools created dynamically
        Tool.InputSchema.of(
            Tool.Parameter.string("connection", "Database connection string")
        ),
        true,  // removeOnInvoke
        input -> {
            // Parse connection from input
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> params = mapper.readValue(input, Map.class);
            String connection = (String) params.getOrDefault("connection", "localhost");

            // Create tools configured with the connection string
            return List.of(
                Tool.create("query", "Query database at " + connection, queryInput -> {
                    // Tool has captured the connection string
                    return Tool.Result.text("Queried " + connection + ": " + queryInput);
                }),
                Tool.create("insert", "Insert into database at " + connection, insertInput -> {
                    return Tool.Result.text("Inserted into " + connection);
                })
            );
        }
    );

    // When LLM invokes with {"connection": "prod-db.example.com"}
    // The injected tools are configured to use that specific connection
    ```

Kotlin
:   ```
    // UnfoldingTool that configures database tools based on connection parameter
    val databaseTool = UnfoldingTool.selectable(
        name = "database",
        description = "Database operations. Pass 'connection' to configure tools.",
        innerTools = emptyList(),  // Tools created dynamically
        inputSchema = Tool.InputSchema.of(
            Tool.Parameter.string("connection", "Database connection string")
        ),
    ) { input ->
        // Parse connection from input
        val mapper = jacksonObjectMapper()
        val params = mapper.readValue(input, Map::class.java)
        val connection = params["connection"] as? String ?: "localhost"

        // Create tools configured with the connection string
        listOf(
            Tool.of("query", "Query database at $connection") { queryInput ->
                // Tool has captured the connection string
                Tool.Result.text("Queried $connection: $queryInput")
            },
            Tool.of("insert", "Insert into database at $connection") { insertInput ->
                Tool.Result.text("Inserted into $connection")
            }
        )
    }

    // When LLM invokes with {"connection": "prod-db.example.com"}
    // The injected tools are configured to use that specific connection
    ```

This pattern is useful for:

* **Multi-tenant systems**: Configure tools with tenant-specific credentials or endpoints
* **Environment selection**: Let the LLM choose between dev/staging/prod environments
* **Stateful operations**: Create tools that share state (like a shopping cart’s item list)
* **Dynamic service discovery**: Configure tools based on runtime service locations

###### Example: Stateful Shopping Cart Tools

Java
:   ```
    var cartTool = UnfoldingTool.selectable(
        "shopping_cart",
        "Shopping cart. Pass 'cart_id' to select which cart to operate on.",
        Collections.emptyList(),
        Tool.InputSchema.of(
            Tool.Parameter.string("cart_id", "Shopping cart ID")
        ),
        true,
        input -> {
            // Each invocation creates a fresh set of tools with shared state
            String cartId = parseCartId(input);
            List<String> cartItems = new ArrayList<>();  // Shared state

            return List.of(
                Tool.create("add_item", "Add item to cart " + cartId,
                    Tool.InputSchema.of(Tool.Parameter.string("item", "Item name")),
                    itemInput -> {
                        String item = parseItem(itemInput);
                        cartItems.add(item);  // Captured state
                        return Tool.Result.text("Added " + item + ". Total: " + cartItems.size());
                    }
                ),
                Tool.create("view_cart", "View cart " + cartId + " contents", viewInput -> {
                    return Tool.Result.text("Cart " + cartId + ": " + String.join(", ", cartItems));
                }),
                Tool.create("checkout", "Checkout cart " + cartId, checkoutInput -> {
                    String total = calculateTotal(cartItems);
                    cartItems.clear();
                    return Tool.Result.text("Checked out " + cartId + " for " + total);
                })
            );
        }
    );
    ```

Kotlin
:   ```
    val cartTool = UnfoldingTool.selectable(
        name = "shopping_cart",
        description = "Shopping cart. Pass 'cart_id' to select which cart to operate on.",
        innerTools = emptyList(),
        inputSchema = Tool.InputSchema.of(
            Tool.Parameter.string("cart_id", "Shopping cart ID")
        ),
    ) { input ->
        // Each invocation creates a fresh set of tools with shared state
        val cartId = parseCartId(input)
        val cartItems = mutableListOf<String>()  // Shared state

        listOf(
            Tool.of(
                name = "add_item",
                description = "Add item to cart $cartId",
                inputSchema = Tool.InputSchema.of(Tool.Parameter.string("item", "Item name"))
            ) { itemInput ->
                val item = parseItem(itemInput)
                cartItems.add(item)  // Captured state
                Tool.Result.text("Added $item. Total: ${cartItems.size}")
            },
            Tool.of("view_cart", "View cart $cartId contents") { _ ->
                Tool.Result.text("Cart $cartId: ${cartItems.joinToString(", ")}")
            },
            Tool.of("checkout", "Checkout cart $cartId") { _ ->
                val total = calculateTotal(cartItems)
                cartItems.clear()
                Tool.Result.text("Checked out $cartId for $total")
            }
        )
    }
    ```

##### Comparison with Other Approaches

Other agent frameworks address large tool collections with different approaches, each with trade-offs:

* **Anthropic’s Tool Search Tool**: Uses a `defer_loading: true` flag to prevent tools from being loaded upfront.
  Tools are discovered via a separate "Tool Search Tool" that searches tool metadata.
  This requires maintaining searchable tool descriptions and adds latency for each discovery step.
* **LangGraph Dynamic Tool Calling**: Uses vector stores and semantic search to select relevant tools based on the user’s query.
  This requires embedding infrastructure, vector database setup, and careful tuning of similarity thresholds.
* **Google ADK AgentTool**: Uses sub-agents that recursively delegate to other agents, each potentially having their own tool sets.
  Tool discovery is implicit through the agent hierarchy.
* **LangChain4j ToolProvider**: Provides a `ToolProvider` interface for dynamic tool selection, but it works *before* the LLM call by analyzing the incoming user message.
  For example, "if the message contains 'booking', include booking tools." This is pre-filtering based on message content, not progressive disclosure through tool invocation.
  LangChain4j’s documentation also suggests embedding-based classification, RAG over tool descriptions, or two-pass LLM selectionâall requiring additional infrastructure or extra LLM calls.

UnfoldingTool takes a fundamentally different approach: **invoke to reveal**.
Instead of searching through tool metadata, the LLM simply invokes a facade tool to unlock the tools it contains.

**Beyond Search: Dynamic Tool Configuration**

Crucially, UnfoldingTool goes far beyond what any search-based approach can offer.
Search can only **find** pre-existing toolsâit cannot create new ones or modify their behavior.
With `UnfoldingTool.selectable()`, the selector function can:

* **Create entirely new tool instances** with different implementations based on runtime parameters
* **Capture configuration** (connection strings, credentials, endpoints) into the tool’s behavior
* **Share mutable state** between the tools created in a single invocation
* **Customize tool descriptions** to reflect the specific context of use

For example, when an LLM invokes a "database" UnfoldingTool with `{"connection": "prod-db.example.com"}`, the returned tools don’t just have different descriptionsâthey have **different behavior** that operates on that specific database.
This is fundamentally impossible with search-based discovery, which can only return references to pre-defined tools.

This provides several advantages:

| Aspect | Other Approaches | UnfoldingTool |
| --- | --- | --- |
| **Infrastructure** | Requires vector stores, embeddings, search indices, or pre-filtering logic | No additional infrastructure required |
| **Selection Timing** | Before LLM call (pre-filtering based on message analysis) | After LLM decides to invoke a facade (LLM-driven discovery) |
| **Latency** | Search/embedding adds latency; two-pass selection doubles LLM calls | Instant unlock on invocation |
| **Scalability** | Search quality degrades with very large tool sets; requires careful tuning | Scales to any number of tools via nesting without degradation |
| **Determinism** | Search results can vary based on embedding similarity | Deterministic: invoking a facade always reveals the same tools |
| **Cost** | Embedding generation, vector search, or extra LLM calls incur compute costs | No additional compute beyond the tool call itself |
| **Dynamic Behavior** | Can only return references to pre-existing tools | Can create new tool instances with runtime-configured behavior |

The hierarchical nesting capability of UnfoldingTool means you can organize thousands of tools into a logical tree structure.
The LLM navigates this tree by making simple invocations, with no search overhead at any level.
For example, a top-level "admin\_operations" facade might reveal 5 category facades, each revealing 20 specific toolsâgiving access to 100 tools with at most 2 invocations.

|  |  |
| --- | --- |
|  | UnfoldingTool vs LlmReference  Both `UnfoldingTool` and `LlmReference` expose tools to the LLM, but they serve different purposes:  **Use UnfoldingTool when:**  * You have a single top-level capability that the LLM can invoke as one tool * The prompt contribution is short and can fit in the tool description * Example: A "database" tool that reveals query/insert/delete tools on invocation  **Use LlmReference when:**  * The prompt contribution is long or of general significance (appears in system prompt) * You have a bunch of related tools, not just one top-level tool * You need `notes()` for detailed usage instructions separate from the tool descriptions * The reference contributes context beyond just tool availability  **Implementing both:**  Classes like `Memory` and `ToolishRag` implement both `Tool` and `LlmReference`, giving maximum flexibility: |

Java
:   ```
    // Use as LlmReference (adds to system prompt + tools)
    ai.withReference(memory).respond(...);

    // Use as Tool directly (just the tool)
    ai.withTool(memory).respond(...);
    ```

Kotlin
:   ```
    // Use as LlmReference (adds to system prompt + tools)
    ai.withReference(memory).respond(...)

    // Use as Tool directly (just the tool)
    ai.withTool(memory).respond(...)
    ```

When used as an `LlmReference`, the `tools()` method exposes the inner tools directly.
When used as a `Tool`, the implementation wraps them in an `UnfoldingTool` facade.

#### 4.9.9. Process Introspection Tools

Embabel provides built-in `UnfoldingTool` implementations for introspecting the current agent process and its blackboard.
These tools enable agentic workflows where the LLM can monitor its own progress, check resource usage, and access data from previous steps.

##### AgentProcessTools: Runtime Awareness

`AgentProcessTools` provides tools for the LLM to understand its current execution context.
This is useful when you want an agent to be aware of its own operational status - for example, to check how much budget remains before undertaking an expensive operation, or to review what actions have been taken so far.

When to use `AgentProcessTools`:

* **Budget-aware agents**: Check remaining cost or token budget before expensive operations
* **Long-running workflows**: Monitor elapsed time and action history
* **Debugging and logging**: Understand what models and tools have been used
* **Self-reflection**: Agents that need to reason about their own behavior

**Sub-tools exposed:**

| Tool Name | Purpose |
| --- | --- |
| `process_status` | Current process ID, status, running time, and goal information |
| `process_budget` | Budget limits (cost, tokens, actions) and remaining capacity |
| `process_cost` | Total cost (LLM and embedding invocations), invocation counts, and detailed token usage |
| `process_history` | List of actions taken so far with execution times |
| `process_tools_stats` | Tool usage statistics (call counts per tool) |
| `process_models` | All models (LLM and embedding) that have been invoked |

Java
:   ```
    import com.embabel.agent.tools.process.AgentProcessTools;
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;

    // Create the tool - typically added to an agentic tool
    var processTools = new AgentProcessTools().create();

    // Add to SimpleAgenticTool
    var assistant = new SimpleAgenticTool("assistant", "...")
        .withTools(processTools);
    ```

Kotlin
:   ```
    import com.embabel.agent.tools.process.AgentProcessTools
    import com.embabel.agent.api.tool.progressive.UnfoldingTool

    // Create the tool - typically added to an agentic tool
    val processTools = AgentProcessTools().create()

    // Add to SimpleAgenticTool
    val assistant = SimpleAgenticTool("assistant", "...")
        .withTools(processTools)
    ```

|  |  |
| --- | --- |
|  | These tools require an active `AgentProcess` context. If called outside of an agent execution, they return an error message indicating no process is available. |

##### BlackboardTools: Accessing Workflow Data

`BlackboardTools` provides tools for the LLM to access objects in the current process’s blackboard.
The blackboard is Embabel’s shared context mechanism - it holds artifacts from previous actions, tool outputs (when using `ArtifactSink`), and any other objects bound to the process.

When to use `BlackboardTools`:

* **Multi-step workflows**: Access results from earlier actions without re-execution
* **Tool output access**: When tools use `ArtifactSink` to publish structured data, BlackboardTools lets the LLM retrieve it
* **Context awareness**: Let the LLM explore what data is available in the current context
* **Debugging**: Inspect blackboard contents during development

**Sub-tools exposed:**

| Tool Name | Purpose |
| --- | --- |
| `blackboard_list` | List all objects in the blackboard with their types and indices |
| `blackboard_get` | Get an object by its binding name (e.g., "user", "searchResults") |
| `blackboard_last` | Get the most recent object of a given type (matches simple name or FQN) |
| `blackboard_describe` | Get a detailed description/formatting of an object by binding name |
| `blackboard_count` | Count the number of objects of a given type in the blackboard |

Java
:   ```
    import com.embabel.agent.tools.blackboard.BlackboardTools;
    import com.embabel.agent.api.tool.progressive.UnfoldingTool;

    // Create with default formatting
    var blackboardTools = new BlackboardTools().create();

    // Or with custom formatting for blackboard entries
    var blackboardTools = new BlackboardTools().create(myCustomFormatter);

    // Add to SimpleAgenticTool
    var assistant = new SimpleAgenticTool("assistant", "...")
        .withTools(blackboardTools);
    ```

Kotlin
:   ```
    import com.embabel.agent.tools.blackboard.BlackboardTools
    import com.embabel.agent.api.tool.progressive.UnfoldingTool

    // Create with default formatting
    val blackboardTools: UnfoldingTool= BlackboardTools().create()

    // Or with custom formatting for blackboard entries
    val blackboardTools = BlackboardTools().create(myCustomFormatter)

    // Add to SimpleAgenticTool
    val assistant = SimpleAgenticTool("assistant", "...")
        .withTools(blackboardTools)
    ```

**Formatting blackboard entries:**

By default, `BlackboardTools` uses `DefaultBlackboardEntryFormatter` which:

* Uses `infoString()` for objects implementing `HasInfoString`
* Uses `content` property for objects implementing `HasContent`
* Falls back to `toString()` for other objects

You can provide a custom `BlackboardEntryFormatter` to control how objects are presented to the LLM.

**Type matching:**

The `blackboard_last` and `blackboard_count` tools match types by:

* **Simple name**: `"Person"` matches any class named `Person`
* **Fully qualified name**: `"com.example.Person"` matches that specific class

This flexibility lets the LLM query by whatever name is most convenient.

##### Combining Process Introspection Tools

For agents that need full situational awareness, combine both tools:

Java
:   ```
    SimpleAgenticTool awarenessAgent = new SimpleAgenticTool(
            "aware_assistant",
            "An assistant that can check its own status and access previous results")
        .withTools(
            new AgentProcessTools().create(),
            new BlackboardTools().create()
        );
    ```

Kotlin
:   ```
    val awarenessAgent = SimpleAgenticTool(
        name = "aware_assistant",
        systemPrompt = "An assistant that can check its own status and access previous results"
    ).withTools(
        AgentProcessTools().create(),
        BlackboardTools().create()
    )
    ```

#### 4.9.10. Process Communication Tools

Embabel provides two built-in tools that allow the LLM to communicate with the user during agent execution.
Both route messages through the current `AgentProcess` output channel, but differ in their intent and presentation.

| Tool | Purpose | Presentation |
| --- | --- | --- |
| `progress` | Report transient status updates during long-running work | Shown as a progress banner (ephemeral) |
| `communicate` | Send a permanent message to the user | Shown as an assistant chat bubble (persistent) |

##### ProgressTool

`ProgressTool` allows the LLM to report what it is currently doing during long-running actions.
Progress messages are transientâthey indicate activity but are not part of the final conversation output.

Java
:   ```
    import com.embabel.agent.api.tool.ProgressTool;
    import com.embabel.agent.api.tool.Tool;

    Tool progressTool = ProgressTool.create();

    // Add to a SimpleAgenticTool
    var assistant = new SimpleAgenticTool("assistant", "...")
        .withTools(progressTool);
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.ProgressTool
    import com.embabel.agent.api.tool.Tool

    val progressTool: Tool = ProgressTool.create()

    // Add to a SimpleAgenticTool
    val assistant = SimpleAgenticTool("assistant", "...")
        .withTools(progressTool)
    ```

When the LLM calls the `progress` tool, it sends a `ProgressOutputChannelEvent` to the output channel with a short status message.
If no `AgentProcess` is active on the current thread, the tool logs a warning and returns gracefullyâagent execution is not interrupted.

##### CommunicateTool

`CommunicateTool` allows the LLM to send a permanent message to the user.
Unlike progress updates, communicate messages appear as assistant chat bubbles and remain part of the conversation.
Use this for reporting results, sharing links (e.g., PR URLs), or informing the user of important outcomes.

Java
:   ```
    import com.embabel.agent.api.tool.CommunicateTool;
    import com.embabel.agent.api.tool.Tool;

    Tool communicateTool = CommunicateTool.create();

    // Add to a SimpleAgenticTool
    var assistant = new SimpleAgenticTool("assistant", "...")
        .withTools(communicateTool);
    ```

Kotlin
:   ```
    import com.embabel.agent.api.tool.CommunicateTool
    import com.embabel.agent.api.tool.Tool

    val communicateTool: Tool = CommunicateTool.create()

    // Add to a SimpleAgenticTool
    val assistant = SimpleAgenticTool("assistant", "...")
        .withTools(communicateTool)
    ```

When the LLM calls the `communicate` tool, it sends a `MessageOutputChannelEvent` containing an `AssistantMessage` to the output channel.
Like `ProgressTool`, it handles the absence of an active `AgentProcess` gracefully.

##### Combining Communication Tools

For agents that need both transient progress reporting and persistent messaging, provide both tools:

Java
:   ```
    var assistant = new SimpleAgenticTool(
            "assistant",
            "An assistant that reports progress and communicates results")
        .withTools(
            ProgressTool.create(),
            CommunicateTool.create()
        );
    ```

Kotlin
:   ```
    val assistant = SimpleAgenticTool(
        name = "assistant",
        systemPrompt = "An assistant that reports progress and communicates results"
    ).withTools(
        ProgressTool.create(),
        CommunicateTool.create()
    )
    ```

|  |  |
| --- | --- |
|  | Both tools require an active `AgentProcess` context to deliver messages to the user. If called outside of an agent execution, they return a soft acknowledgment and log a warningâthey do not throw exceptions or interrupt agent execution. |

|  |  |
| --- | --- |
|  | The `OutputChannelHighlightingEventListener` automatically suppresses raw tool-call progress banners for `progress` and `communicate` tools, since these tools produce their own user-visible output. |

#### 4.9.11. Just-in-Time Tool Group Initialization

By default, Embabel initializes MCP tool groups at application startup.
This breaks deployments where MCP servers authenticate requests using the
caller’s OAuth token forwarded via the `Authorization` header, because no
user token exists at startup time.

To defer the MCP handshake until the first agent request, set these three
properties together:

```
spring:
  ai:
    mcp:
      client:
        initialized: false
        toolcallback:
          enabled: false

embabel:
  agent:
    platform:
      tools:
        lazy-init: true
```

With lazy init enabled, the startup log confirms no MCP traffic occurred at startup:

```
INFO ToolGroupsConfiguration - MCP is available (lazy-init mode). Found 1 client(s).
     Tool groups will be initialized on first use.
```

The MCP handshake fires only when the first agent action that requires
an MCP-backed tool group executes â at which point the user’s OAuth token
is already present in the security context.

#### 4.9.12. McpToolFactory: MCP Tool Integration

`McpToolFactory` is an interface that provides a convenient way to integrate [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) tools into your application.
It creates Embabel `Tool` instances from MCP servers, with support for filtering tools and wrapping them in `UnfoldingTool` facades.

`SpringAiMcpToolFactory` is the Spring AI-based implementation.

##### Creating McpToolFactory

`SpringAiMcpToolFactory` requires a list of `McpSyncClient` instances, which are typically provided by Spring’s MCP auto-configuration:

Java
:   ```
    import com.embabel.agent.tools.mcp.McpToolFactory;
    import com.embabel.agent.spi.support.springai.SpringAiMcpToolFactory;
    import io.modelcontextprotocol.client.McpSyncClient;

    @Configuration
    public class ToolConfiguration {

        @Bean
        public McpToolFactory mcpToolFactory(List<McpSyncClient> clients) {
            return new SpringAiMcpToolFactory(clients);
        }
    }
    ```

Kotlin
:   ```
    import com.embabel.agent.tools.mcp.McpToolFactory
    import com.embabel.agent.spi.support.springai.SpringAiMcpToolFactory
    import io.modelcontextprotocol.client.McpSyncClient

    @Configuration
    class ToolConfiguration {

        @Bean
        fun mcpToolFactory(clients: List<McpSyncClient>): McpToolFactory =
            SpringAiMcpToolFactory(clients)
    }
    ```

|  |  |
| --- | --- |
|  | MCP clients are configured in `application.yml`. See [MCP Integration](#reference.integrations__mcp) for configuration details. |

##### Getting Individual MCP Tools

Use `toolByName` to retrieve a single MCP tool by its exact name:

Java
:   ```
    // Returns null if not found
    Tool braveSearch = mcpToolFactory.toolByName("brave_web_search");
    if (braveSearch != null) {
        ai.withTool(braveSearch).generateText("Search for recent news about AI");
    }

    // Throws IllegalArgumentException if not found (with helpful error message)
    Tool requiredTool = mcpToolFactory.requiredToolByName("brave_web_search");
    ```

Kotlin
:   ```
    // Returns null if not found
    val braveSearch = mcpToolFactory.toolByName("brave_web_search")
    braveSearch?.let { tool ->
        ai.withTool(tool).generateText("Search for recent news about AI")
    }

    // Throws IllegalArgumentException if not found (with helpful error message)
    val requiredTool = mcpToolFactory.requiredToolByName("brave_web_search")
    ```

##### Creating UnfoldingToolFacades from MCP

`McpToolFactory` can wrap groups of MCP tools in an `UnfoldingTool` facade for progressive disclosure.
This is useful when you have many MCP tools but want to present them as logical categories.

**By Exact Tool Names:**

Java
:   ```
    // Create a UnfoldingTool with specific tool names
    var wikipediaTool = mcpToolFactory.unfoldingByName(
        "wikipedia",
        "Search and find content from Wikipedia",
        Set.of("search_wikipedia", "get_article", "get_related_topics", "get_summary")
    );
    ```

Kotlin
:   ```
    // Create a UnfoldingTool with specific tool names
    val wikipediaTool = mcpToolFactory.unfoldingByName(
        name = "wikipedia",
        description = "Search and find content from Wikipedia",
        toolNames = setOf("search_wikipedia", "get_article", "get_related_topics", "get_summary")
    )
    ```

**By Regex Patterns:**

Java
:   ```
    import java.util.regex.Pattern;

    // Match tools by regex patterns
    var dbTool = mcpToolFactory.unfoldingMatching(
        "database_operations",
        "Database operations. Invoke to access database tools.",
        List.of(Pattern.compile("^db_.*"), Pattern.compile(".*query.*"))
    );
    ```

Kotlin
:   ```
    // Match tools by regex patterns
    val dbTool = mcpToolFactory.unfoldingMatching(
        name = "database_operations",
        description = "Database operations. Invoke to access database tools.",
        patterns = listOf("^db_".toRegex(), "query.*".toRegex())
    )
    ```

**With Custom Filter:**

Java
:   ```
    // Custom filter predicate
    var webTool = mcpToolFactory.unfolding(
        "web_operations",
        "Web operations. Invoke to access web tools.",
        callback -> callback.getToolDefinition().name().startsWith("web_")
    );
    ```

Kotlin
:   ```
    // Custom filter predicate
    val webTool = mcpToolFactory.unfolding(
        name = "web_operations",
        description = "Web operations. Invoke to access web tools.",
        filter = { it.toolDefinition.name().startsWith("web_") }
    )
    ```

##### Controlling Facade Removal

After invocation, `UnfoldingTool` facades created by `McpToolFactory` are replaced by a guide tool and their inner tools.
The `removeOnInvoke` parameter is deprecated and ignored:

Java
:   ```
    // Keep facade even after invocation
    var persistentTool = mcpToolFactory.unfoldingByName(
        "wikipedia",
        "Search Wikipedia",
        Set.of("search_wikipedia", "get_article"),
        false  // removeOnInvoke = false
    );
    ```

Kotlin
:   ```
    // Keep facade even after invocation
    val persistentTool = mcpToolFactory.unfoldingByName(
        name = "wikipedia",
        description = "Search Wikipedia",
        toolNames = setOf("search_wikipedia", "get_article"),
        removeOnInvoke = false
    )
    ```

##### Real-World Example: Chatbot with MCP Tools

Here’s a real-world example from a production chatbot that uses `McpToolFactory` to integrate MCP tools with graceful degradation:

Java
:   ```
    @Configuration
    public class ChatConfiguration {

        @Bean
        public McpToolFactory mcpToolFactory(List<McpSyncClient> clients) {
            return new SpringAiMcpToolFactory(clients);
        }

        @Bean
        public CommonTools commonTools(McpToolFactory mcpToolFactory) {
            var deferMessage = "Use this tool only after trying local sources";
            var tools = new LinkedList<>();

            // Single MCP tool - gracefully handle missing tools
            var braveSearch = mcpToolFactory.toolByName("brave_web_search");
            if (braveSearch != null) {
                tools.add(braveSearch.withNote(deferMessage));
            }

            // UnfoldingTool grouping related Wikipedia MCP tools
            var wikipediaTool = mcpToolFactory.unfoldingByName(
                "wikipedia",
                "Search and find content from Wikipedia: " + deferMessage,
                Set.of("search_wikipedia", "get_article", "get_related_topics", "get_summary")
            );
            if (!wikipediaTool.getInnerTools().isEmpty()) {
                tools.add(wikipediaTool);
            }

            return new CommonTools(tools);
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class ChatConfiguration {

        @Bean
        fun mcpToolFactory(clients: List<McpSyncClient>): McpToolFactory =
            SpringAiMcpToolFactory(clients)

        @Bean
        fun commonTools(mcpToolFactory: McpToolFactory): CommonTools {
            val deferMessage = "Use this tool only after trying local sources"
            val tools = mutableListOf<Any>()

            // Single MCP tool - gracefully handle missing tools
            mcpToolFactory.toolByName("brave_web_search")?.let { braveSearch ->
                tools.add(braveSearch.withNote(deferMessage))
            }

            // UnfoldingTool grouping related Wikipedia MCP tools
            val wikipediaTool = mcpToolFactory.unfoldingByName(
                name = "wikipedia",
                description = "Search and find content from Wikipedia: $deferMessage",
                toolNames = setOf("search_wikipedia", "get_article", "get_related_topics", "get_summary")
            )
            if (wikipediaTool.innerTools.isNotEmpty()) {
                tools.add(wikipediaTool)
            }

            return CommonTools(tools)
        }
    }
    ```

This pattern:

* **Gracefully degrades** when MCP tools aren’t available (e.g., in test environments)
* **Groups related tools** behind a descriptive facade using `UnfoldingTool`
* **Adds usage hints** with `withNote()` to guide the LLM on when to use external tools
* **Checks for empty results** before adding tools to avoid empty facades

##### McpToolFactory Method Summary

| Method | Description |
| --- | --- |
| `toolByName(String)` | Get a single MCP tool by exact name. Returns `null` if not found. |
| `requiredToolByName(String)` | Get a single MCP tool by exact name. Throws `IllegalArgumentException` if not found, with a helpful error message listing available tools. |
| `unfoldingByName(name, description, toolNames)` | Create an `UnfoldingTool` containing tools with exact matching names. |
| `unfoldingMatching(name, description, patterns)` | Create an `UnfoldingTool` containing tools matching any of the regex patterns. |
| `unfolding(name, description, filter)` | Create an `UnfoldingTool` with a custom filter predicate. |

### 4.10. Structured Prompt Elements

Embabel provides a number of ways to structure and manage prompt content.

**Prompt contributors** are a fundamental way to structure and inject content into LLM prompts.
You don’t need to use them—​you can simply build your prompts as strings—​but they can be useful to achieve consistency and reuse across multiple actions or even across multiple agents using the same domain objects.

Prompt contributors implement the `PromptContributor` interface and provide text that gets included in the final prompt sent to the LLM.
By default the text will be included in the system prompt message.

#### 4.10.1. The `PromptContributor` Interface and `LlmReference` Subinterface

All prompt contributors implement the `PromptContributor` interface with a `contribution()` method that returns a string to be included in the prompt.

Add `PromptContributor` instances to a `PromptRunner` using the `withPromptContributor()` method.

A subinterface of `PromptContributor` is `LlmReference`.

An `LlmReference` is a prompt contributor that can also provide tools via annotated `@Tool` methods.
So that tool naming can be disambiguated, an `LlmReference` must also include name and description metadata.

Add `LlmReference` instances to a `PromptRunner` using the `withReference()` method.

Use `LlmReference` if:

* You want to provide both prompt content and tools from the same object
* You want to provide specific instructions on how to use these tools, beyond the individual tool descriptions
* Your data may be best exposed as either prompt content or tools, depending on the context.
  For example, if you have a list of 10 items you might just put in the prompt and say "Here are all the items: …​".
  If you have a list of 10,000 objects, you would include advice to use the tools to query them.

|  |  |
| --- | --- |
|  | An `LlmReference` is somewhat similar to a Claude Skill. |

`LlmReference` instances can be created programmatically or defined in YML using `LlmReferenceProvider` implementations.
For example, you could define a `references.yml` file in this format:

```
- fqn: com.embabel.coding.tools.git.GitHubRepository
  url: https://github.com/embabel/embabel-agent-examples.git
  description: Embabel examples Repository

- fqn: com.embabel.coding.tools.git.GitHubRepository
  url: https://github.com/embabel/java-agent-template.git
  description: >
    Java agent template Repository: Simplest Java example with Maven
    Can be used as a GitHub template

- fqn: com.embabel.coding.tools.git.GitHubRepository
  url: https://github.com/embabel/embabel-agent.git
  description: >
    Embabel agent framework implementation repo: Look to check code under embabel-agent-api

- fqn: com.embabel.coding.tools.api.ApiReferenceProvider
  name: embabel-agent
  description: Embabel Agent API
  acceptedPackages:
    - com.embabel.agent
    - com.embabel.common
```

The `fqn` property specifies the fully qualified class name of the `LlmReferenceProvider` implementation.
This enables you to define your own `LlmReferenceProvider` implementations.
Out of the box, Embabel provides:

* `com.embabel.agent.api.reference.LiteralText`: Text in `notes`
* `com.embabel.agent.api.reference.SpringResource`: Contents of the given Spring resource path
* `com.embabel.agent.api.reference.WebPage`: Content of the given web page, if it can be fetched
* `com.embabel.coding.tools.git.GitHubRepository`: GitHub repositories (`embabel-agent-code` module)
* `com.embabel.coding.tools.api.ApiReferenceProvider`: API from classpath (`embabel-agent-code` module)

You can parse your YML files into `List<LlmReference>` using the `LlmReferenceProviders.fromYml` method.

The `resource` argument is a Spring resource specification.

Thus `LlmReferenceProviders.fromYml("references.yml")` will load `references.yml` under `src/main/resources/`

#### 4.10.2. Built-in Convenience Classes

Embabel provides several convenience classes that implement `PromptContributor` for common use cases.
These are optional utilities - you can always implement the interface directly for custom needs.

##### Persona

The `Persona` class provides a structured way to define an AI agent’s personality and behavior:

Java
:   ```
    var persona = Persona.create(
        "Alex the Analyst",
        "A detail-oriented data analyst with expertise in financial markets",
        "Professional yet approachable, uses clear explanations",
        "Help users understand complex financial data through clear analysis"
    );
    ```

Kotlin
:   ```
    val persona = Persona.create(
        name = "Alex the Analyst",
        persona = "A detail-oriented data analyst with expertise in financial markets",
        voice = "Professional yet approachable, uses clear explanations",
        objective = "Help users understand complex financial data through clear analysis"
    )
    ```

This generates a prompt contribution like:

```
You are Alex the Analyst.
Your persona: A detail-oriented data analyst with expertise in financial markets.
Your objective is Help users understand complex financial data through clear analysis.
Your voice: Professional yet approachable, uses clear explanations.
```

##### RoleGoalBackstory

The `RoleGoalBackstory` class follows the Crew AI pattern and is included for users migrating from that framework:

Java
:   ```
    var agent = RoleGoalBackstory.withRole("Senior Software Engineer")
        .andGoal("Write clean, maintainable code")
        .andBackstory("10+ years experience in enterprise software development");
    ```

Kotlin
:   ```
    val agent = RoleGoalBackstory.withRole("Senior Software Engineer")
        .andGoal("Write clean, maintainable code")
        .andBackstory("10+ years experience in enterprise software development")
    ```

This generates:

```
Role: Senior Software Engineer
Goal: Write clean, maintainable code
Backstory: 10+ years experience in enterprise software development
```

#### 4.10.3. Custom PromptContributor Implementations

You can create custom prompt contributors by implementing the interface directly.
This gives you complete control over the prompt content:

Java
:   ```
    public class CustomSystemPrompt implements PromptContributor {
        private final String systemName;

        public CustomSystemPrompt(String systemName) {
            this.systemName = systemName;
        }

        @Override
        public String contribution() {
            return "System: " + systemName + " - Current time: " + LocalDateTime.now();
        }
    }

    public class ConditionalPrompt implements PromptContributor {
        private final Supplier<Boolean> condition;
        private final String trueContent;
        private final String falseContent;

        public ConditionalPrompt(Supplier<Boolean> condition, String trueContent, String falseContent) {
            this.condition = condition;
            this.trueContent = trueContent;
            this.falseContent = falseContent;
        }

        @Override
        public String contribution() {
            return condition.get() ? trueContent : falseContent;
        }
    }
    ```

Kotlin
:   ```
    class CustomSystemPrompt(private val systemName: String) : PromptContributor {
        override fun contribution(): String {
            return "System: $systemName - Current time: ${LocalDateTime.now()}"
        }
    }

    class ConditionalPrompt(
        private val condition: () -> Boolean,
        private val trueContent: String,
        private val falseContent: String
    ) : PromptContributor {
        override fun contribution(): String {
            return if (condition()) trueContent else falseContent
        }
    }
    ```

#### 4.10.4. Examples from embabel-agent-examples

The [embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) repository demonstrates various agent development patterns and Spring Boot integration approaches for building AI agents with Embabel.

#### 4.10.5. Best Practices

* Keep prompt contributors focused and single-purpose
* Use the convenience classes (`Persona`, `RoleGoalBackstory`) when they fit your needs
* Implement custom `PromptContributor` classes for domain-specific requirements
* Consider using dynamic contributors for context-dependent content
* Test your prompt contributions to ensure they produce the desired LLM behavior

### 4.11. Templates

Embabel supports Jinja templates for generating prompts.
You do this via the `PromptRunner.rendering(String)` method.

This method takes a Spring resource path to a Jinja template.
The default location is under `classpath:/prompts/` and the `.jinja` extension is added automatically.

You can also specify a full resource path with [Spring resource conventions](https://docs.spring.io/spring-framework/reference/core/resources.html).

Once you have specified the template, you can create objects using a model map.

An example:

Java
:   ```
    DistinctFactualAssertions distinctFactualAssertions = context.ai()
        .withLlm(properties.deduplicationLlm())
        // Jinjava template from classpath at prompts/factchecker/consolidate_assertions.jinja
        .rendering("factchecker/consolidate_assertions")
        .createObject(
                DistinctFactualAssertions.class,
                Map.of(
                        "assertions", allAssertions,
                        "reasoningWordCount", properties.reasoningWordCount()
                )
        );
    ```

Kotlin
:   ```
    val distinctFactualAssertions = context.ai()
        .withLlm(properties.deduplicationLlm())
        // Jinjava template from classpath at prompts/factchecker/consolidate_assertions.jinja
        .rendering("factchecker/consolidate_assertions")
        .createObject(
                DistinctFactualAssertions::class.java,
                mapOf(
                        "assertions" to allAssertions,
                        "reasoningWordCount" to properties.reasoningWordCount()
                )
        )
    ```

#### 4.11.1. Custom Template Renderer

By default, `rendering()` uses the platform’s `TemplateRenderer` (a Jinja-based renderer that loads templates from the classpath).
You can override this on a per-rendering basis using `withTemplateRenderer()`, which lets you supply a custom `TemplateRenderer` implementation.

This is useful when you need to load templates from a different sourceâfor example, pulling templates from a user-specific directory on the file system, or from a database, enabling per-tenant or per-user prompt customization.

Java
:   ```
    TemplateRenderer perUserRenderer = createRendererForUser(userId);

    String result = context.ai()
        .rendering("user-greeting")
        .withTemplateRenderer(perUserRenderer)
        .generateText(
                Map.of("userName", userName)
        );
    ```

Kotlin
:   ```
    val perUserRenderer = createRendererForUser(userId)

    val result = context.ai()
        .rendering("user-greeting")
        .withTemplateRenderer(perUserRenderer)
        .generateText(
                mapOf("userName" to userName)
        )
    ```

|  |  |
| --- | --- |
|  | Don’t rush to externalize prompts. In modern languages with multi-line strings, it’s often easier to keep prompts in the codebase. Externalizing them can sacrifice type safety and lead to complexity and maintenance challenges. |

### 4.12. RAG (Retrieval-Augmented Generation)

Retrieval-Augmented Generation (RAG) is a technique that enhances LLM responses by retrieving relevant information from a knowledge base before generating answers.
This grounds LLM outputs in specific, verifiable sources rather than relying solely on training data.

For more background on RAG concepts, see:

* [Wikipedia: Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
* [AWS: What is RAG?](https://aws.amazon.com/what-is/retrieval-augmented-generation/)

Embabel Agent provides RAG support through the `LlmReference` interface, which allows you to attach references (including RAG stores) to LLM calls.
The key classes are `ToolishRag` for exposing search operations as LLM tools, and `SearchOperations` for the underlying search functionality.

#### 4.12.1. Agentic RAG Architecture

Unlike traditional RAG implementations that perform a single retrieval step, Embabel Agent’s RAG is **entirely agentic and tool-based**.
The LLM has full control over the retrieval process:

* **Autonomous Search**: The LLM decides when to search, what queries to use, and how many results to retrieve
* **Iterative Refinement**: The LLM can perform multiple searches with different queries until it finds relevant information
* **Cross-Reference Discovery**: The LLM can follow references, expand chunks to see surrounding context, and zoom out to parent sections
* **HyDE Support**: The LLM can generate hypothetical documents (HyDE queries) to improve semantic search results

This agentic approach produces better results than single-shot RAG because the LLM can:

1. Start with a broad search and narrow down
2. Try different phrasings if initial queries return poor results
3. Expand promising results to get more context
4. Combine information from multiple chunks

#### 4.12.2. Facade Pattern for Safe Tool Exposure

Embabel Agent uses a facade pattern to expose RAG capabilities safely and consistently across different store implementations.
The `ToolishRag` class acts as a facade that:

1. **Inspects Store Capabilities**: Examines which `SearchOperations` subinterfaces the store implements
2. **Exposes Appropriate Tools**: Only creates tool wrappers for supported operations
3. **Provides Consistent Interface**: All tools use the same parameter patterns regardless of underlying store

Java
:   ```
    @Override
    public List<Tool> tools() {
        List<Object> toolObjects = new ArrayList<>();
        if (searchOperations instanceof VectorSearch) {
            toolObjects.add(new VectorSearchTools((VectorSearch) searchOperations));
        }
        if (searchOperations instanceof TextSearch) {
            toolObjects.add(new TextSearchTools((TextSearch) searchOperations));
        }
        if (searchOperations instanceof ResultExpander) {
            toolObjects.add(new ResultExpanderTools((ResultExpander) searchOperations));
        }
        if (searchOperations instanceof RegexSearchOperations) {
            toolObjects.add(new RegexSearchTools((RegexSearchOperations) searchOperations));
        }
        return toolObjects.stream()
                .flatMap(obj -> Tool.fromInstance(obj).stream())
                .toList();
    }
    ```

Kotlin
:   ```
    override fun tools(): List<Tool> {
        val toolObjects = buildList {
            if (searchOperations is VectorSearch) {
                add(VectorSearchTools(searchOperations))
            }
            if (searchOperations is TextSearch) {
                add(TextSearchTools(searchOperations))
            }
            if (searchOperations is ResultExpander) {
                add(ResultExpanderTools(searchOperations))
            }
            if (searchOperations is RegexSearchOperations) {
                add(RegexSearchTools(searchOperations))
            }
        }
        return toolObjects.flatMap { Tool.fromInstance(it) }
    }
    ```

This means:

* A Lucene store exposes vector search, text search, regex search, AND result expansion tools
* A Spring AI VectorStore adapter exposes only vector search tools
* A basic text-only store exposes only text search tools
* A directory-based text search exposes text search and regex search

The LLM sees only the tools that actually work with the configured store, preventing runtime errors from unsupported operations.

#### 4.12.3. Getting Started

To use RAG in your Embabel Agent application, add the `rag-core` module and a store implementation to your `pom.xml`:

```
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-rag-lucene</artifactId>
    <version>${embabel-agent.version}</version>
</dependency>

<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-rag-tika</artifactId>
    <version>${embabel-agent.version}</version>
</dependency>
```

The `embabel-agent-rag-lucene` module provides Lucene-based vector and text search.
The `embabel-agent-rag-tika` module provides Apache Tika integration for parsing various document formats.

#### 4.12.4. Our Model

Embabel Agent uses a hierarchical content model that goes beyond traditional flat chunk storage:

```
Datum (sealed interface)
â   Core: id, uri, metadata, labels()
â
âââ ContentElement ââââââââââââââââââââââââââââââââââââââ
â       Structural content (not embedded)               â
â   âââââââââââââââââââââââââââââââââââââââââââââââââ   â
â   â ContentRoot / NavigableDocument               â   â
â   â     Documents with URI and title              â   â
â   âââââââââââââââââââââââââââââââââââââââââââââââââ   â
â   âââââââââââââââââââââââââââââââââââââââââââââââââ   â
â   â ContainerSection / LeafSection                â   â
â   â     Hierarchical document sections            â   â
â   âââââââââââââââââââââââââââââââââââââââââââââââââ   â
â                                                       â
âââ Retrievable âââââââââââââââââââââââââââââââââââââââââ¤
        Embeddable/searchable content                   â
    âââââââââââââââââââââââââââââââââââââââââââââââââ   â
    â Chunk                                         â   â
    â     text, parentId, embedding                 â   â
    â     Primary unit for vector search            â   â
    âââââââââââââââââââââââââââââââââââââââââââââââââ   â
    âââââââââââââââââââââââââââââââââââââââââââââââââ   â
    â NamedEntity                                   â   â
    â     Domain entity contract (Person, Product)  â   â
    â     name, description + domain properties     â   â
    â                                               â   â
    â   âââ NamedEntityData                         â   â
    â         Storage format with properties map    â   â
    â         Hydration via toTypedInstance()       â   â
    âââââââââââââââââââââââââââââââââââââââââââââââââ   â
                                                        â
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
```

**Key Design Points:**

* `Datum` is the root sealed interface for all data objects
* `ContentElement` branch contains structural content (documents, sections) that is NOT embedded
* `Retrievable` branch contains searchable content with embeddings (chunks, entities)
* `NamedEntity` is the domain contract for typed entities
* `NamedEntityData` is the storage format with generic `properties` map and hydration support

##### Content Elements

The `ContentElement` interface is the supertype for all content in the RAG system.
Key subtypes include:

* **`ContentRoot`** / **`NavigableDocument`**: The root of a document hierarchy, with a required URI and title
* **`Section`**: A hierarchical division of content with a title
* **`ContainerSection`**: A section containing other sections
* **`LeafSection`**: A section containing actual text content
* **`Chunk`**: Traditional RAG text chunks, created by splitting `LeafSection` content

##### Chunks

`Chunk` is the primary unit for vector search.
Each chunk:

* Contains a `text` field with the content
* Has a `parentId` linking to its source section
* Includes `metadata` with information about its origin (root document, container section, leaf section)
* Can compute its `pathFromRoot` through the document hierarchy

This hierarchical model enables advanced RAG capabilities like "zoom out" to parent sections or expansion to adjacent chunks.

#### 4.12.5. SearchOperations

`SearchOperations` is the tag interface for search functionality.
Concrete implementations implement one or more subinterfaces based on their capabilities.
This design allows stores to implement only what’s natural and efficient for themâa vector database need not pretend to support full-text search, and a text search engine need not fake vector similarity.

##### VectorSearch

Classic semantic vector search:

Java
:   ```
    public interface VectorSearch extends SearchOperations {
        <T extends Retrievable> List<SimilarityResult<T>> vectorSearch(
            TextSimilaritySearchRequest request,
            Class<T> clazz
        );
    }
    ```

Kotlin
:   ```
    interface VectorSearch : SearchOperations {
        fun <T : Retrievable> vectorSearch(
            request: TextSimilaritySearchRequest,
            clazz: Class<T>,
        ): List<SimilarityResult<T>>
    }
    ```

##### TextSearch

Full-text search using Lucene query syntax:

Java
:   ```
    public interface TextSearch extends SearchOperations {
        <T extends Retrievable> List<SimilarityResult<T>> textSearch(
            TextSimilaritySearchRequest request,
            Class<T> clazz
        );
    }
    ```

Kotlin
:   ```
    interface TextSearch : SearchOperations {
        fun <T : Retrievable> textSearch(
            request: TextSimilaritySearchRequest,
            clazz: Class<T>,
        ): List<SimilarityResult<T>>
    }
    ```

Supported query syntax includes:

* `+term` - term must appear
* `-term` - term must not appear
* `"phrase"` - exact phrase match
* `term*` - prefix wildcard
* `term~` - fuzzy match

##### ResultExpander

Expand search results to surrounding context:

Java
:   ```
    public interface ResultExpander extends SearchOperations {
        List<ContentElement> expandResult(
            String id,
            Method method,
            int elementsToAdd
        );
    }
    ```

Kotlin
:   ```
    interface ResultExpander : SearchOperations {
        fun expandResult(
            id: String,
            method: Method,
            elementsToAdd: Int,
        ): List<ContentElement>
    }
    ```

Expansion methods:

* `SEQUENCE` - expand to previous and next chunks
* `ZOOM_OUT` - expand to enclosing section

##### RegexSearchOperations

Pattern-based search across content:

Java
:   ```
    public interface RegexSearchOperations extends SearchOperations {
        <T extends Retrievable> List<SimilarityResult<T>> regexSearch(
            Pattern regex,
            int topK,
            Class<T> clazz
        );
    }
    ```

Kotlin
:   ```
    interface RegexSearchOperations : SearchOperations {
        fun <T : Retrievable> regexSearch(
            regex: Regex,
            topK: Int,
            clazz: Class<T>,
        ): List<SimilarityResult<T>>
    }
    ```

Useful for finding specific patterns like error codes, identifiers, or structured content that doesn’t match well with semantic or keyword search.

##### CoreSearchOperations

A convenience interface combining the most common search capabilities:

Java
:   ```
    public interface CoreSearchOperations extends VectorSearch, TextSearch { }
    ```

Kotlin
:   ```
    interface CoreSearchOperations : VectorSearch, TextSearch
    ```

Stores that support both vector and text search can implement this single interface for convenience.

#### 4.12.6. ToolishRag

`ToolishRag` is an `LlmReference` that exposes `SearchOperations` as LLM tools.
This gives the LLM fine-grained control over RAG searches.

##### Configuration

Create a `ToolishRag` by wrapping your `SearchOperations`:

Java
:   ```
    public ChatActions(SearchOperations searchOperations) {
        this.toolishRag = new ToolishRag(
                "sources",
                "Sources for answering user questions",
                searchOperations
        );
    }
    ```

Kotlin
:   ```
    class ChatActions(searchOperations: SearchOperations) {
        private val toolishRag = ToolishRag(
            "sources",
            "Sources for answering user questions",
            searchOperations
        )
    }
    ```

##### Using with LLM Calls

Attach `ToolishRag` to an LLM call using `.withReference()`:

Java
:   ```
    @Action(canRerun = true, trigger = UserMessage.class)
    void respond(Conversation conversation, ActionContext context) {
        var assistantMessage = context.ai()
                .withLlm(properties.chatLlm())
                .withReference(toolishRag)
                .rendering("ragbot")
                .respondWithSystemPrompt(conversation, Map.of(
                        "properties", properties
                ));
        context.sendMessage(conversation.addMessage(assistantMessage));
    }
    ```

Kotlin
:   ```
    @Action(canRerun = true, trigger = UserMessage::class)
    fun respond(conversation: Conversation, context: ActionContext) {
        val assistantMessage = context.ai()
            .withLlm(properties.chatLlm())
            .withReference(toolishRag)
            .rendering("ragbot")
            .respondWithSystemPrompt(conversation, mapOf(
                "properties" to properties
            ))
        context.sendMessage(conversation.addMessage(assistantMessage))
    }
    ```

Based on the capabilities of the underlying `SearchOperations`, `ToolishRag` exposes:

* **VectorSearchTools**: `vectorSearch(query, topK, threshold)` - semantic similarity search
* **TextSearchTools**: `textSearch(query, topK, threshold)` - BM25 full-text search with Lucene syntax
* **RegexSearchTools**: `regexSearch(regex, topK)` - pattern-based search using regular expressions
* **ResultExpanderTools**: `broadenChunk(chunkId, chunksToAdd)` - expand to adjacent chunks, `zoomOut(id)` - expand to parent section

The LLM autonomously decides when to use these tools based on user queries.

##### Eager Search

By default, `ToolishRag` is entirely agenticâthe LLM decides when to search and what queries to use.
However, when the topic of the conversation is already known, you can **preload** relevant results before the LLM starts, giving it a head start and reducing the number of tool calls needed.

`ToolishRag` implements the `EagerSearch` interface, which provides `withEagerSearchAbout()`:

Java
:   ```
    // Preload results about the user's topic before the LLM starts
    ToolishRag eagerRag = toolishRag
        .withEagerSearchAbout("Kotlin coroutines", 10);

    context.ai()
        .withReference(eagerRag)
        .respondWithSystemPrompt(conversation, Map.of());
    ```

Kotlin
:   ```
    // Preload results about the user's topic before the LLM starts
    val eagerRag = toolishRag
        .withEagerSearchAbout("Kotlin coroutines", 10)

    context.ai()
        .withReference(eagerRag)
        .respondWithSystemPrompt(conversation, emptyMap())
    ```

The preloaded results are included in the prompt as hints. The LLM still has access to all the usual search tools and can perform additional searches as needed.

For more control over the search parameters, pass a `TextSimilaritySearchRequest` directly:

Java
:   ```
    var request = new TextSimilaritySearchRequest("Kotlin coroutines", 0.7, 10);
    ToolishRag eagerRag = toolishRag.withEagerSearchAbout(request);
    ```

Kotlin
:   ```
    val request = TextSimilaritySearchRequest("Kotlin coroutines", 0.7, 10)
    val eagerRag = toolishRag.withEagerSearchAbout(request)
    ```

|  |  |
| --- | --- |
|  | Combining eager search with agentic tools is the sweet spot: preloaded results give the LLM an immediate head start (no round-trip needed), while the tools remain available for follow-up searches if the preloaded results aren’t sufficient. You get the latency benefit of traditional RAG with the quality benefit of agentic RAG. |

|  |  |
| --- | --- |
|  | Eager search requires `VectorSearch` support in the underlying `SearchOperations`. If the store does not support vector search, `withEagerSearchAbout()` throws `UnsupportedOperationException` eagerly at configuration time. |

|  |  |
| --- | --- |
|  | The `EagerSearch` Interface  `EagerSearch<T>` is a general-purpose interface in the `com.embabel.agent.api.reference` package for any `LlmReference` that can preload context via similarity search. `ToolishRag` is one implementation, but other reference types can implement `EagerSearch` to provide the same consistent pattern for preloading relevant context before an LLM call. |

##### ToolishRag lifecycle

It is safe to create a `ToolishRag` instance and reuse across many LLM calls.
However, instances are not expensive to create, so you can create a new instance per LLM call.
You might choose to do this if you provide a `ResultListener`
that will collect queries and results for logging or analysis: for example, to track which queries were most useful for answering user questions and the complexity in terms of number of searches performed.
This can be useful for implementing a learning feedback loop, for example to discern which queries performed badly, indicating that content such as documentation needs to be enhanced.

##### Result Filtering

In multi-tenant applications or scenarios where searches should be scoped to specific data subsets, `ToolishRag` supports **result filtering**.
Filters are applied transparently to all searchesâthe LLM does not see or control them, ensuring security and data isolation.

Embabel Agent provides two types of filters:

* **Metadata Filters**: Filter on the `metadata` map of `Datum` objects (chunks, sections, etc.)
* **Property Filters**: Filter on object properties of typed entities (e.g., fields of `NamedEntityData` or custom entity classes)

Both use the same `PropertyFilter` type but are applied at different levels.

###### Motivation

Consider a document management system where:

* Each document belongs to an owner (user or organization)
* Some documents are shared reference data accessible to all users
* The LLM should only search documents the current user is authorized to access

Without filtering, you would need separate RAG stores per user or risk data leakage.
With filtering, a single `ToolishRag` instance can be scoped per-request to the current user’s data.

###### Filter API

Embabel Agent provides two filter interfaces for RAG searches:

* **`PropertyFilter`**: Filters on map-based properties (metadata, entity properties)
* **`EntityFilter`**: Extends `PropertyFilter` to add entity-specific filtering, particularly label-based filtering

###### PropertyFilter

The `PropertyFilter` sealed class hierarchy provides type-safe filter expressions for map-based properties:

| Filter Type | Description | Example |
| --- | --- | --- |
| `Eq` | Equals | `PropertyFilter.eq("owner", "alice")` |
| `Ne` | Not equals | `PropertyFilter.ne("status", "deleted")` |
| `Gt`, `Gte` | Greater than (or equal) | `PropertyFilter.gte("score", 0.8)` |
| `Lt`, `Lte` | Less than (or equal) | `PropertyFilter.lt("priority", 5)` |
| `In` | Value in list | `PropertyFilter.in("category", "tech", "science")` |
| `Nin` | Value not in list | `PropertyFilter.nin("status", "deleted", "archived")` |
| `Contains` | String contains substring | `PropertyFilter.contains("tags", "important")` |
| `And` | Logical AND | `PropertyFilter.and(filter1, filter2)` |
| `Or` | Logical OR | `PropertyFilter.or(filter1, filter2)` |
| `Not` | Logical NOT | `PropertyFilter.not(filter)` |

###### EntityFilter

`EntityFilter` extends `PropertyFilter` to add entity-specific filtering. Currently, it adds label-based filtering via `HasAnyLabel`:

| Filter Type | Description | Example |
| --- | --- | --- |
| `HasAnyLabel` | Matches entities with any of the specified labels | `EntityFilter.hasAnyLabel("Person", "Organization")` |

`HasAnyLabel` is particularly useful for:

* **Type-safe entity searches**: Filter results to only include specific entity types
* **Multi-type queries**: Search across multiple entity types in one query

Java
:   ```
    import com.embabel.agent.rag.filter.EntityFilter;
    import com.embabel.agent.rag.filter.PropertyFilter;

    // Filter by single label
    EntityFilter personFilter = EntityFilter.hasAnyLabel("Person");

    // Filter by multiple labels (OR semantics - entity must have ANY of these labels)
    EntityFilter entityFilter = EntityFilter.hasAnyLabel("Person", "Organization");

    // Combine HasAnyLabel with property filters using fluent API
    PropertyFilter simpleCombo = EntityFilter.hasAnyLabel("Person")
        .and(PropertyFilter.eq("status", "active"));

    // Multiple conditions
    PropertyFilter complexFilter = EntityFilter.hasAnyLabel("Person")
        .and(PropertyFilter.eq("status", "active"))
        .and(PropertyFilter.gte("score", 0.8));

    // OR combinations
    PropertyFilter orFilter = EntityFilter.hasAnyLabel("Person")
        .or(PropertyFilter.eq("fallback", true));

    // With negation
    PropertyFilter notDeleted = EntityFilter.hasAnyLabel("Person")
        .and(PropertyFilter.not(PropertyFilter.eq("status", "deleted")));

    // Complex grouping
    PropertyFilter accessFilter = PropertyFilter.or(
        PropertyFilter.and(
            EntityFilter.hasAnyLabel("Person", "Employee"),
            PropertyFilter.eq("active", true)
        ),
        PropertyFilter.eq("role", "admin")
    );
    ```

Kotlin
:   ```
    import com.embabel.agent.rag.filter.EntityFilter
    import com.embabel.agent.rag.filter.PropertyFilter.Companion.eq
    import com.embabel.agent.rag.filter.PropertyFilter.Companion.gte

    // Filter by single label
    val personFilter = EntityFilter.hasAnyLabel("Person")

    // Filter by multiple labels (OR semantics - entity must have ANY of these labels)
    val entityFilter = EntityFilter.hasAnyLabel("Person", "Organization")

    // Combine HasAnyLabel with property filters using fluent API
    val simpleCombo = EntityFilter.hasAnyLabel("Person") and eq("status", "active")

    // Multiple conditions
    val complexFilter = EntityFilter.hasAnyLabel("Person") and
        eq("status", "active") and
        gte("score", 0.8)

    // OR combinations
    val orFilter = EntityFilter.hasAnyLabel("Person") or eq("fallback", true)

    // With negation
    val notDeleted = EntityFilter.hasAnyLabel("Person") and !eq("status", "deleted")

    // Complex grouping
    val accessFilter = (EntityFilter.hasAnyLabel("Person", "Employee") and eq("active", true)) or
        eq("role", "admin")
    ```

Since `EntityFilter` extends `PropertyFilter`, all filter types share the same `and`, `or`, `not` operators and can be freely combined.

|  |  |
| --- | --- |
|  | `EntityFilter.HasAnyLabel` is typically handled via in-memory filtering as most vector stores don’t have native label support. When using Neo4j backends, labels can be translated to native Cypher label predicates for optimal performance. |

|  |  |
| --- | --- |
|  | **Limitation: Nested Properties Not Supported**  Filters currently operate on top-level properties only. Nested property paths like `"address.city"` or `"metadata.source"` are **not** supported. The filter key must match a direct key in the metadata map or a top-level property on the entity object.  For example:  * `PropertyFilter.eq("owner", "alice")` - **Supported**: filters on top-level `owner` property * `PropertyFilter.eq("address.city", "London")` - **Not supported**: nested path will not match |

###### Kotlin Operator Syntax

Kotlin users can use operator and infix functions for a more natural DSL syntax:

Java
:   ```
    import com.embabel.agent.rag.filter.PropertyFilter;

    // Simple filter with not operator
    PropertyFilter notDeleted = PropertyFilter.not(PropertyFilter.eq("status", "deleted"));

    // Combine with 'and' and 'or'
    PropertyFilter userAccess = PropertyFilter.and(
        PropertyFilter.eq("owner", userId),
        PropertyFilter.gte("confidenceScore", 0.7)
    );

    // Complex expressions with grouping
    PropertyFilter accessFilter = PropertyFilter.or(
        PropertyFilter.and(
            PropertyFilter.eq("owner", userId),
            PropertyFilter.ne("status", "deleted")
        ),
        PropertyFilter.eq("role", "admin")
    );
    ```

Kotlin
:   ```
    import com.embabel.agent.rag.filter.PropertyFilter.Companion.eq
    import com.embabel.agent.rag.filter.PropertyFilter.Companion.gte
    import com.embabel.agent.rag.filter.PropertyFilter.Companion.ne

    // Simple filter with not operator
    val notDeleted = !eq("status", "deleted")

    // Combine with infix 'and' and 'or'
    val userAccess = eq("owner", userId) and gte("confidenceScore", 0.7)

    // Complex expressions with grouping
    val accessFilter = (eq("owner", userId) and ne("status", "deleted")) or
        eq("role", "admin")
    ```

###### Metadata vs Entity Filters

`ToolishRag` accepts two separate filter parameters:

* **`metadataFilter`**: A `PropertyFilter` that filters on the `metadata` map of `Datum` objects. Metadata is typically ingestion-time information like source URI, ingestion date, owner ID, etc.
* **`entityFilter`**: An `EntityFilter` that filters on entity properties and labels. For `NamedEntityData`, this filters on the `properties` map and `labels()`. For typed entities, reflection is used to access top-level fields.

Java
:   ```
    // Filter on metadata (e.g., which user owns the document)
    PropertyFilter metadataFilter = PropertyFilter.eq("ownerId", currentUserId);

    // Filter on entity labels and properties
    EntityFilter entityFilter = EntityFilter.hasAnyLabel("Person");

    // Apply both filters
    ToolishRag scopedRag = toolishRag
        .withMetadataFilter(metadataFilter)
        .withEntityFilter(entityFilter);
    ```

Kotlin
:   ```
    // Filter on metadata (e.g., which user owns the document)
    val metadataFilter = PropertyFilter.eq("ownerId", currentUserId)

    // Filter on entity labels and properties (combine label filtering with property filtering)
    val entityFilter = EntityFilter.hasAnyLabel("Person") and PropertyFilter.eq("status", "active")

    // Apply both filters
    val scopedRag = toolishRag
        .withMetadataFilter(metadataFilter)
        .withEntityFilter(entityFilter)
    ```

In most cases, you’ll use metadata filters for access control and entity filters for type-based and business logic filtering.

##### Neo4j Cypher Filtering

When using Neo4j via the Drivine module, metadata filters are automatically converted to Cypher WHERE clauses using `CypherFilterConverter`:

Java
:   ```
    // The filter is converted to Cypher WHERE clause automatically
    PropertyFilter filter = PropertyFilter.and(
        PropertyFilter.eq("owner", "alice"),
        PropertyFilter.gte("confidenceScore", 0.7)
    );

    // In DrivineNamedEntityDataRepository:
    List<SimilarityResult<T>> results = repository.vectorSearch(request, filter);
    // Generates: WHERE (e.owner = $_filter_0) AND (e.confidenceScore >= $_filter_1) AND ...
    ```

Kotlin
:   ```
    // The filter is converted to Cypher WHERE clause automatically
    val filter = eq("owner", "alice") and gte("confidenceScore", 0.7)

    // In DrivineNamedEntityDataRepository:
    val results = repository.vectorSearch(request, metadataFilter = filter)
    // Generates: WHERE (e.owner = $_filter_0) AND (e.confidenceScore >= $_filter_1) AND ...
    ```

The converter produces parameterized queries for safety and handles all filter types including nested logical expressions.

For both `DrivineStore` (chunks) and `DrivineNamedEntityDataRepository` (named entities), **both** metadata and property filters are translated to native Cypher WHERE clauses. This is because Neo4j stores all data as node properties - metadata is simply the set of properties that aren’t core fields like `id`, `text`, `parentId`, etc. This provides optimal performance by filtering at the database level rather than in-memory.

###### Basic Usage

Apply a metadata filter to scope all searches to a specific owner:

Java
:   ```
    // Create a filter for the current user
    PropertyFilter ownerFilter = PropertyFilter.eq("ownerId", currentUserId);

    // Apply to ToolishRag - all searches will be filtered
    ToolishRag scopedRag = toolishRag.withMetadataFilter(ownerFilter);

    // Use in LLM call - LLM cannot see or bypass the filter
    context.ai()
        .withReference(scopedRag)
        .respondWithSystemPrompt(conversation, Map.of());
    ```

Kotlin
:   ```
    // Create a filter for the current user
    val ownerFilter = PropertyFilter.eq("ownerId", currentUserId)

    // Apply to ToolishRag - all searches will be filtered
    val scopedRag = toolishRag.withMetadataFilter(ownerFilter)

    // Use in LLM call - LLM cannot see or bypass the filter
    context.ai()
        .withReference(scopedRag)
        .respondWithSystemPrompt(conversation, emptyMap())
    ```

###### Complex Filters

Combine filters for more sophisticated access control:

Java
:   ```
    // User can access their own documents OR documents in their departments
    PropertyFilter accessFilter = PropertyFilter.or(
        PropertyFilter.eq("ownerId", currentUserId),
        PropertyFilter.in("departmentId", userDepartmentIds)
    );

    ToolishRag scopedRag = toolishRag.withMetadataFilter(accessFilter);

    // Organization-scoped with status restriction
    PropertyFilter orgFilter = PropertyFilter.and(
        PropertyFilter.eq("orgId", currentOrgId),
        PropertyFilter.ne("status", "deleted"),
        PropertyFilter.gte("confidenceScore", 0.7)
    );

    ToolishRag scopedRag2 = toolishRag.withMetadataFilter(orgFilter);
    ```

Kotlin
:   ```
    // User can access their own documents OR documents in their departments
    val accessFilter = eq("ownerId", currentUserId) or
        PropertyFilter.`in`("departmentId", *userDepartmentIds.toTypedArray())

    val scopedRag = toolishRag.withMetadataFilter(accessFilter)

    // Organization-scoped with status restriction
    val orgFilter = eq("orgId", currentOrgId) and
        ne("status", "deleted") and
        gte("confidenceScore", 0.7)

    val scopedRag2 = toolishRag.withMetadataFilter(orgFilter)
    ```

###### Per-Request Scoping Pattern

A common pattern is to create a scoped `ToolishRag` per request in a web application:

Java
:   ```
    @Action(trigger = UserMessage.class)
    void respond(Conversation conversation, ActionContext context) {
        // Get current user from security context
        String userId = SecurityContextHolder.getContext()
            .getAuthentication().getName();

        // Create user-scoped RAG for this request
        ToolishRag userScopedRag = toolishRag.withMetadataFilter(
            PropertyFilter.eq("ownerId", userId)
        );

        context.ai()
            .withReference(userScopedRag)
            .rendering("assistant")
            .respondWithSystemPrompt(conversation, Map.of());
    }
    ```

Kotlin
:   ```
    @Action(trigger = UserMessage::class)
    fun respond(conversation: Conversation, context: ActionContext) {
        // Get current user from security context
        val userId = SecurityContextHolder.getContext()
            .authentication.name

        // Create user-scoped RAG for this request
        val userScopedRag = toolishRag.withMetadataFilter(
            PropertyFilter.eq("ownerId", userId)
        )

        context.ai()
            .withReference(userScopedRag)
            .rendering("assistant")
            .respondWithSystemPrompt(conversation, emptyMap())
    }
    ```

###### Backend Implementation

Filters are applied at different levels depending on the backend:

* **Spring AI VectorStore**: Metadata filters are translated to `Filter.Expression` for native filtering; entity filters (including `HasAnyLabel`) are applied in-memory
* **Neo4j (Drivine)**: Both metadata and entity filters (including `HasAnyLabel`) are translated to native Cypher WHERE clauses and label predicates (optimal performance)
* **Lucene**: Both filter types are applied as post-filters with inflated `topK` to compensate for filtered-out results
* **Custom stores**: Can implement `FilteringVectorSearch` / `FilteringTextSearch` for native translation, or fall back to in-memory filtering

The `InMemoryPropertyFilter` utility class provides fallback filtering for any store implementation:

Java
:   ```
    // In your SearchOperations implementation
    List<SimilarityResult<T>> results = performSearch(request);
    return InMemoryPropertyFilter.filterResults(results, metadataFilter, entityFilter);
    ```

Kotlin
:   ```
    // In your SearchOperations implementation
    val results = performSearch(request)
    return InMemoryPropertyFilter.filterResults(results, metadataFilter, entityFilter)
    ```

For `EntityFilter.HasAnyLabel`, the in-memory filter checks if the entity has any of the specified labels via `NamedEntityData.labels()`.

This ensures filtering works across all backends, with native optimization for metadata filters where available.

#### 4.12.7. Ingestion

##### Document Parsing with Tika

Embabel Agent uses Apache Tika for document parsing. `TikaHierarchicalContentReader` reads various formats (Markdown, HTML, PDF, Word, etc.) and extracts a hierarchical structure:

Java
:   ```
    @ShellMethod("Ingest URL or file path")
    String ingest(@ShellOption(defaultValue = "./data/document.md") String location) {
        var uri = location.startsWith("http://") || location.startsWith("https://")
                ? location
                : Path.of(location).toAbsolutePath().toUri().toString();
        var ingested = NeverRefreshExistingDocumentContentPolicy.INSTANCE
                .ingestUriIfNeeded(
                        luceneSearchOperations,
                        new TikaHierarchicalContentReader(),
                        uri
                );
        return ingested != null ?
                "Ingested document with ID: " + ingested :
                "Document already exists, no ingestion performed.";
    }
    ```

Kotlin
:   ```
    @ShellMethod("Ingest URL or file path")
    fun ingest(@ShellOption(defaultValue = "./data/document.md") location: String): String {
        val uri = if (location.startsWith("http://") || location.startsWith("https://")) {
            location
        } else {
            Path.of(location).toAbsolutePath().toUri().toString()
        }
        val ingested = NeverRefreshExistingDocumentContentPolicy.INSTANCE
            .ingestUriIfNeeded(
                luceneSearchOperations,
                TikaHierarchicalContentReader(),
                uri
            )
        return if (ingested != null) {
            "Ingested document with ID: $ingested"
        } else {
            "Document already exists, no ingestion performed."
        }
    }
    ```

##### Chunking Configuration

Content is split into chunks with configurable parameters:

```
ragbot:
  chunker-config:
    max-chunk-size: 800
    overlap-size: 100
```

Configuration options:

* `maxChunkSize` - Maximum characters per chunk (default: 1500)
* `overlapSize` - Character overlap between consecutive chunks (default: 200)
* `includeSectionTitleInChunk` - Include section title in chunk text (default: true)

##### Chunk Transformation

When chunks are created from documents, they often lack the context needed for effective retrieval.
A chunk containing "This approach improves performance by 40%" is not useful unless the reader knows what "this approach" refers to.
The `ChunkTransformer` interface allows you to enrich chunks with additional context before they are indexed.

###### The urtext Field

Every `Chunk` has two text fields:

* `text` - The indexed content, which may be transformed with additional context
* `urtext` - The original, unmodified chunk text

The `urtext` field preserves the original content for accurate citations.
When displaying search results to users, use `urtext` to show exactly what appeared in the source document, while using the enriched `text` for vector embeddings and search.

###### AddTitlesChunkTransformer

The recommended default transformer is `AddTitlesChunkTransformer`, which prepends document and section titles to each chunk:

Java
:   ```
    @Bean
    ChunkTransformer chunkTransformer() {
        return AddTitlesChunkTransformer.INSTANCE;
    }
    ```

Kotlin
:   ```
    @Bean
    fun chunkTransformer(): ChunkTransformer {
        return AddTitlesChunkTransformer.INSTANCE
    }
    ```

This transforms a chunk like:

```
This approach improves performance by 40% compared to the baseline.
```

Into:

```
# Title: Performance Optimization Guide
# URI: https://docs.example.com/performance
# Section: Caching Strategies

This approach improves performance by 40% compared to the baseline.
```

Now the chunk carries its context, improving both retrieval accuracy and LLM understanding.

###### Custom Transformers

You can create custom transformers by implementing `ChunkTransformer` or extending `AbstractChunkTransformer`:

Java
:   ```
    public class MetadataEnrichingTransformer extends AbstractChunkTransformer {

        @Override
        public Map<String, Object> additionalMetadata(
                Chunk chunk,
                ChunkTransformationContext context) {
            return Map.of(
                "documentType", context.getDocument().getMetadata().get("type"),
                "lastModified", Instant.now().toString()
            );
        }

        @Override
        public String newText(Chunk chunk, ChunkTransformationContext context) {
            // Optionally modify the text
            return chunk.getText();
        }
    }
    ```

Kotlin
:   ```
    class MetadataEnrichingTransformer : AbstractChunkTransformer() {

        override fun additionalMetadata(
            chunk: Chunk,
            context: ChunkTransformationContext
        ): Map<String, Any> {
            return mapOf(
                "documentType" to context.document?.metadata?.get("type"),
                "lastModified" to Instant.now().toString()
            )
        }

        override fun newText(chunk: Chunk, context: ChunkTransformationContext): String {
            // Optionally modify the text
            return chunk.text
        }
    }
    ```

The `ChunkTransformationContext` provides access to:

* `section` - The `Section` containing this chunk
* `document` - The `ContentRoot` (may be null for orphan sections)

###### Chaining Transformers

Use `ChainedChunkTransformer` to apply multiple transformations in sequence:

Java
:   ```
    @Bean
    ChunkTransformer chunkTransformer() {
        return new ChainedChunkTransformer(List.of(
            AddTitlesChunkTransformer.INSTANCE,
            new MetadataEnrichingTransformer(),
            new CustomCleanupTransformer()
        ));
    }
    ```

Kotlin
:   ```
    @Bean
    fun chunkTransformer(): ChunkTransformer {
        return ChainedChunkTransformer(listOf(
            AddTitlesChunkTransformer.INSTANCE,
            MetadataEnrichingTransformer(),
            CustomCleanupTransformer()
        ))
    }
    ```

Transformers are applied in order, with each receiving the output of the previous transformer.

###### Configuring the Store

Pass your `ChunkTransformer` to the store implementation:

Java
:   ```
    @DependsOn("onnxEmbeddingInitializer")  (1)
    @Bean
    DrivineStore drivineStore(
            PersistenceManager persistenceManager,
            EmbeddingService embeddingService,
            ChunkTransformer chunkTransformer,  (2)
            MyProperties properties) {
        return new DrivineStore(
            persistenceManager,
            properties.neoRag(),
            properties.chunkerConfig(),
            chunkTransformer,  (3)
            embeddingService,
            platformTransactionManager,
            new DrivineCypherSearch(persistenceManager)
        );
    }
    ```

Kotlin
:   ```
    @DependsOn("onnxEmbeddingInitializer")  (1)
    @Bean
    fun drivineStore(
        persistenceManager: PersistenceManager,
        embeddingService: EmbeddingService,
        chunkTransformer: ChunkTransformer,  (2)
        properties: MyProperties
    ): DrivineStore {
        return DrivineStore(
            persistenceManager,
            properties.neoRag(),
            properties.chunkerConfig(),
            chunkTransformer,  (3)
            embeddingService,
            platformTransactionManager,
            DrivineCypherSearch(persistenceManager)
        )
    }
    ```

|  |  |
| --- | --- |
| **1** | Ensure the `EmbeddingService` bean is registered before this configuration is wired (see note below) |
| **2** | Inject the `ChunkTransformer` bean |
| **3** | Pass it to the store constructor |

|  |  |
| --- | --- |
|  | `EmbeddingService` beans are registered dynamically by model provider auto-configurations via `registerSingleton`. If your `@Configuration` class injects `EmbeddingService` directly (as above), you should add `@DependsOn` on the provider’s initializer bean â e.g. `@DependsOn("onnxEmbeddingInitializer")` for the ONNX provider. Without it, Spring may resolve the dependency before the initializer has run, resulting in a `NoSuchBeanDefinitionException`. This is only necessary when consuming model beans directly; framework beans like `ModelProvider` handle this internally. |

|  |  |
| --- | --- |
|  | For most use cases, `AddTitlesChunkTransformer` is all you need. It adds essential context that significantly improves retrieval quality without adding complexity. |

##### Using Docling for Markdown Conversion

While we believe that you should write your Gen AI **applications** in Java or Kotlin, ingestion is more in the realm of data science, and Python is indisputably strong in this area.

For complex documents like PDFs, consider using [Docling](https://github.com/DS4SD/docling) to convert to Markdown first:

```
docling https://example.com/document.pdf --from pdf --to md --output ./data
```

Markdown is easier to parse hierarchically and produces better chunks than raw PDF extraction.

#### 4.12.8. Supported Stores

Embabel Agent provides several RAG store implementations:

##### Lucene (embabel-agent-rag-lucene)

Full-featured store with vector search, text search, and result expansion.
Supports both in-memory and file-based persistence:

Java
:   ```
    @Bean
    LuceneSearchOperations luceneSearchOperations(
            ModelProvider modelProvider,
            RagbotProperties properties) {
        var embeddingService = modelProvider.getEmbeddingService(
                DefaultModelSelectionCriteria.INSTANCE);
        return LuceneSearchOperations
                .withName("docs")
                .withEmbeddingService(embeddingService)
                .withChunkerConfig(properties.chunkerConfig())
                .withIndexPath(Paths.get("./.lucene-index"))  // File persistence
                .buildAndLoadChunks();
    }
    ```

Kotlin
:   ```
    @Bean
    fun luceneSearchOperations(
        modelProvider: ModelProvider,
        properties: RagbotProperties
    ): LuceneSearchOperations {
        val embeddingService = modelProvider.getEmbeddingService(
            DefaultModelSelectionCriteria.INSTANCE
        )
        return LuceneSearchOperations
            .withName("docs")
            .withEmbeddingService(embeddingService)
            .withChunkerConfig(properties.chunkerConfig())
            .withIndexPath(Paths.get("./.lucene-index"))  // File persistence
            .buildAndLoadChunks()
    }
    ```

Omit `.withIndexPath()` for in-memory only storage.

##### Neo4j

Graph database store for RAG (available in separate modules `embabel-agent-rag-neo-drivine` and `embabel-agent-rag-neo-ogm`).
Ideal when you need graph relationships between content elements.

##### PostgreSQL pgvector (embabel-rag-pgvector)

PostgreSQL-based RAG store using the pgvector extension (available in the separate `embabel/embabel-rag-pgvector` repository).
Supports hybrid search combining vector similarity, full-text search via tsvector/tsquery, and fuzzy matching via pg\_trgm.
Ideal when you already use PostgreSQL and want a familiar, battle-tested database for RAG.

##### Spring AI VectorStore (SpringVectorStoreVectorSearch)

Adapter that wraps any Spring AI `VectorStore`, enabling use of any vector database Spring AI supports:

Java
:   ```
    public class SpringVectorStoreVectorSearch implements VectorSearch {
        private final VectorStore vectorStore;

        public SpringVectorStoreVectorSearch(VectorStore vectorStore) {
            this.vectorStore = vectorStore;
        }

        @Override
        public <T extends Retrievable> List<SimilarityResult<T>> vectorSearch(
                TextSimilaritySearchRequest request,
                Class<T> clazz) {
            SearchRequest searchRequest = SearchRequest
                .builder()
                .query(request.getQuery())
                .similarityThreshold(request.getSimilarityThreshold())
                .topK(request.getTopK())
                .build();
            List<Document> results = vectorStore.similaritySearch(searchRequest);
            // ... convert results
        }
    }
    ```

Kotlin
:   ```
    class SpringVectorStoreVectorSearch(
        private val vectorStore: VectorStore,
    ) : VectorSearch {
        override fun <T : Retrievable> vectorSearch(
            request: TextSimilaritySearchRequest,
            clazz: Class<T>,
        ): List<SimilarityResult<T>> {
            val searchRequest = SearchRequest
                .builder()
                .query(request.query)
                .similarityThreshold(request.similarityThreshold)
                .topK(request.topK)
                .build()
            val results = vectorStore.similaritySearch(searchRequest)
            // ... convert results
        }
    }
    ```

This allows integration with Pinecone, Weaviate, Milvus, Chroma, and other stores via Spring AI.

#### 4.12.9. Implementing Your Own RAG Store

To implement a custom RAG store, implement only the `SearchOperations` subinterfaces that are natural and efficient for your store.
This is a key design principle: **stores should only implement what they can do well**.

For example:

* A **vector database** like Pinecone might implement only `VectorSearch` since that’s its strength
* A **full-text search engine** might implement `TextSearch` and `RegexSearchOperations`
* A **hierarchical document store** might add `ResultExpander` for context expansion
* A **full-featured store** like Lucene can implement all interfaces

The `ToolishRag` facade automatically exposes only the tools that your store supports.
This means you don’t need to provide stub implementations or throw "not supported" exceptionsâsimply don’t implement interfaces that don’t fit your store’s capabilities.

Java
:   ```
    // A store that only supports vector search
    public class MyVectorOnlyStore implements VectorSearch {
        @Override
        public <T extends Retrievable> List<SimilarityResult<T>> vectorSearch(
                TextSimilaritySearchRequest request,
                Class<T> clazz) {
            // Implement vector similarity search
        }
    }

    // A store that supports both vector and text search
    public class MyFullTextStore implements VectorSearch, TextSearch {
        @Override
        public <T extends Retrievable> List<SimilarityResult<T>> vectorSearch(
                TextSimilaritySearchRequest request,
                Class<T> clazz) {
            // Implement vector similarity search
        }

        @Override
        public <T extends Retrievable> List<SimilarityResult<T>> textSearch(
                TextSimilaritySearchRequest request,
                Class<T> clazz) {
            // Implement full-text search
        }

        @Override
        public String getLuceneSyntaxNotes() {
            return "Full Lucene syntax supported";
        }
    }
    ```

Kotlin
:   ```
    // A store that only supports vector search
    class MyVectorOnlyStore : VectorSearch {
        override fun <T : Retrievable> vectorSearch(
            request: TextSimilaritySearchRequest,
            clazz: Class<T>,
        ): List<SimilarityResult<T>> {
            // Implement vector similarity search
        }
    }

    // A store that supports both vector and text search
    class MyFullTextStore : VectorSearch, TextSearch {
        override fun <T : Retrievable> vectorSearch(
            request: TextSimilaritySearchRequest,
            clazz: Class<T>,
        ): List<SimilarityResult<T>> {
            // Implement vector similarity search
        }

        override fun <T : Retrievable> textSearch(
            request: TextSimilaritySearchRequest,
            clazz: Class<T>,
        ): List<SimilarityResult<T>> {
            // Implement full-text search
        }

        override val luceneSyntaxNotes: String = "Full Lucene syntax supported"
    }
    ```

For ingestion support, extend `ChunkingContentElementRepository` to handle document storage and chunking.

#### 4.12.10. Complete Example

See the [rag-demo](https://github.com/embabel/rag-demo) project for a complete working example including:

* Lucene-based RAG store configuration
* Document ingestion via Tika
* Chatbot with RAG-powered responses
* Jinja prompt templates for system prompts
* Spring Shell commands for interactive testing

### 4.13. Building Chatbots

Chatbots are an important application of Gen AI, although far from the only use, especially in enterprise.

Unlike many other frameworks, Embabel does not maintain a conversation thread to do its core work.
This is a good thing as it means that context compression is not required for most tasks.

If you want to build a chatbot you should use the `Conversation` interface explicitly, and expose a `Chatbot` bean, typically backed by action methods that handle `UserMessage` events.

#### 4.13.1. Core Concepts

##### Long-Lived AgentProcess

An Embabel chatbot is backed by a **long-lived `AgentProcess`** that pauses between user messages.
This design has important implications:

* The same `AgentProcess` can respond to events besides user input
* The blackboard maintains state across the entire session
* Actions can be triggered by user messages, system events, or other objects added to the blackboard
* It’s a **working context** rather than just a chat session

When a user sends a message, it’s added to the blackboard as a `UserMessage`.
The `AgentProcess` then runs, selects an appropriate action to handle it, and pauses again waiting for the next event.

##### Utility AI for Chatbots

**Utility AI is often the best approach for chatbots.** Instead of defining a fixed flow, you define multiple actions with costs, and the planner selects the highest-value action to respond to each message.

This allows:

* Multiple response strategies (e.g., RAG search, direct answer, clarification request)
* Dynamic behavior based on context
* Easy extensibility by adding new action methods

##### Goals in Chatbots

Typically, chatbot agents **do not need a goal**.
The agent process simply waits for user messages and responds to them indefinitely.

However, you can define a goal if you want to ensure the conversation terminates and the `AgentProcess` completes rather than waiting forever.
This is useful for:

* Transactional conversations (e.g., completing a booking)
* Wizard-style flows with a defined endpoint
* Conversations that should end after collecting specific information

#### 4.13.2. Key Interfaces

##### Chatbot

The `Chatbot` interface manages multiple chat sessions:

Java
:   ```
    public interface Chatbot {
        ChatSession createSession(
            User user,
            OutputChannel outputChannel,
            String contextId,
            String conversationId
        );

        ChatSession findSession(String conversationId);
    }
    ```

Kotlin
:   ```
    interface Chatbot {
        fun createSession(
            user: User?,
            outputChannel: OutputChannel,
            contextId: String? = null,
            conversationId: String? = null,
        ): ChatSession

        fun findSession(conversationId: String): ChatSession?
    }
    ```

##### Context IDs and Session State

The `contextId` parameter allows you to **pre-populate the session’s blackboard** with objects from a named context.
This is useful when:

* **Users have multiple contexts** - A user might have different projects, accounts, or workspaces.
  Each context can maintain its own state that persists across sessions.
* **Resuming prior state** - When a user returns, you can restore their previous session state
  (e.g., user preferences, in-progress work, conversation history from a previous session).
* **Pre-loading domain objects** - You can populate the blackboard with objects that should always be present,
  such as the current user’s profile, active subscription, or relevant configuration.

Java
:   ```
    // Create a session with a specific context
    ChatSession session = chatbot.createSession(
        user,
        outputChannel,
        "project-alpha",  // Context ID - loads saved state for this project
        null
    );

    // Or create an anonymous session without context
    ChatSession anonymousSession = chatbot.createSession(
        null,
        outputChannel,
        null,
        null
    );
    ```

Kotlin
:   ```
    // Create a session with a specific context
    val session = chatbot.createSession(
        user,
        outputChannel,
        contextId = "project-alpha"  // Context ID - loads saved state for this project
    )

    // Or create an anonymous session without context
    val anonymousSession = chatbot.createSession(
        user = null,
        outputChannel = outputChannel
    )
    ```

The context mechanism works with `AgentPlatform’s context storage:

1. When `createSession` is called with a `contextId`, the platform looks up any saved objects for that context
2. Those objects are added to the new session’s blackboard
3. As the session runs, changes to the blackboard can be persisted back to the context
4. The next time a session is created with that `contextId`, the updated state is restored

This enables **stateful conversations across sessions** without requiring the chatbot to manually track and restore state.

##### ChatSession

Each session represents an ongoing conversation:

Java
:   ```
    public interface ChatSession {
        OutputChannel getOutputChannel();
        User getUser();
        Conversation getConversation();
        String getProcessId();

        void onUserMessage(UserMessage userMessage);
        boolean isFinished();
    }
    ```

Kotlin
:   ```
    interface ChatSession {
        val outputChannel: OutputChannel
        val user: User?
        val conversation: Conversation
        val processId: String?

        fun onUserMessage(userMessage: UserMessage)
        fun isFinished(): Boolean
    }
    ```

##### Conversation

The `Conversation` interface holds the message history and tracks assets:

Java
:   ```
    public interface Conversation extends StableIdentified, AssetView {
        List<Message> getMessages();
        AssetTracker getAssetTracker();
        List<Asset> getAssets();  // Combined view of all assets
        Message addMessage(Message message);
        UserMessage lastMessageIfBeFromUser();
    }
    ```

Kotlin
:   ```
    interface Conversation : StableIdentified, AssetView {
        val messages: List<Message>
        val assetTracker: AssetTracker
        val assets: List<Asset>  // Combined view of all assets
        fun addMessage(message: Message): Message
        fun lastMessageIfBeFromUser(): UserMessage?
    }
    ```

Message types include:

* `UserMessage` - messages from the user (supports multimodal content)
* `AssistantMessage` - responses from the chatbot (can include assets)
* `SystemMessage` - system-level instructions

#### 4.13.3. Asset Tracking

Chatbots can track **assets**âstructured outputs like generated documents, search results, or user-created contentâat two levels:

##### Conversation-Level Assets

The `Conversation` has an `AssetTracker` for explicitly tracking assets throughout the session:

Java
:   ```
    // Add an asset to the conversation tracker
    conversation.getAssetTracker().addAsset(myAsset);

    // Get all tracked assets
    List<Asset> trackedAssets = conversation.getAssetTracker().getAssets();
    ```

Kotlin
:   ```
    // Add an asset to the conversation tracker
    conversation.assetTracker.addAsset(myAsset)

    // Get all tracked assets
    val trackedAssets = conversation.assetTracker.assets
    ```

Use conversation-level tracking when:

* Assets are created by tools or external processes
* Assets should persist across multiple messages
* You want explicit control over what’s tracked

##### Message-Level Assets

`AssistantMessage` implements `AssetView` and can include assets directly:

Java
:   ```
    AssistantMessage message = new AssistantMessage(
        "Here's the report you requested",
        null,  // name
        null,  // awaitable
        List.of(reportAsset, summaryAsset)  // assets
    );
    conversation.addMessage(message);
    ```

Kotlin
:   ```
    val message = AssistantMessage(
        content = "Here's the report you requested",
        assets = listOf(reportAsset, summaryAsset)
    )
    conversation.addMessage(message)
    ```

Use message-level assets when:

* Assets are directly tied to a specific response
* You want assets to appear alongside the message in the UI
* The asset represents output from that specific interaction

##### Combined Asset View

The `Conversation.assets` property provides a **merged view** of all assets:

Java
:   ```
    // Gets assets from BOTH the tracker AND all messages
    List<Asset> allAssets = conversation.getAssets();
    ```

Kotlin
:   ```
    // Gets assets from BOTH the tracker AND all messages
    val allAssets = conversation.assets
    ```

The merge follows these rules:

1. **Tracker assets appear first** (explicit tracking takes priority)
2. **Message assets follow** in chronological order
3. **Duplicates are removed** by ID (tracker version wins)

This allows flexible asset management:

Java
:   ```
    @Action(canRerun = true, trigger = UserMessage.class)
    void respond(Conversation conversation, ActionContext context) {
        // Create an asset from the response
        Asset resultAsset = createResultAsset(result);

        // Option 1: Add to message (appears with this response)
        var message = new AssistantMessage(
            "Here's your analysis",
            null, null,
            List.of(resultAsset)
        );
        conversation.addMessage(message);

        // Option 2: Add to tracker (explicitly tracked)
        conversation.getAssetTracker().addAsset(resultAsset);

        // Either way, it's visible via conversation.getAssets()
    }
    ```

Kotlin
:   ```
    @Action(canRerun = true, trigger = UserMessage::class)
    fun respond(conversation: Conversation, context: ActionContext) {
        // Create an asset from the response
        val resultAsset = createResultAsset(result)

        // Option 1: Add to message (appears with this response)
        val message = AssistantMessage(
            content = "Here's your analysis",
            assets = listOf(resultAsset)
        )
        conversation.addMessage(message)

        // Option 2: Add to tracker (explicitly tracked)
        conversation.assetTracker.addAsset(resultAsset)

        // Either way, it's visible via conversation.assets
    }
    ```

##### Using Assets as Tools

Assets can be exposed to the LLM as tools via their `LlmReference`:

Java
:   ```
    // Get references from recent assets
    List<LlmReference> refs = conversation.mostRecent(5).references();

    // Use in a prompt
    var response = context.ai()
        .withReferences(refs)  // Assets become available as tools
        .respond(conversation.getMessages());
    ```

Kotlin
:   ```
    // Get references from recent assets
    val refs = conversation.mostRecent(5).references()

    // Use in a prompt
    val response = context.ai()
        .withReferences(refs)  // Assets become available as tools
        .respond(conversation.messages)
    ```

This enables scenarios like:

* Editing previously generated content
* Combining multiple assets
* Querying structured data from earlier in the conversation

#### 4.13.4. Building a Chatbot

##### Step 1: Create Action Methods

Define action methods in an `@EmbabelComponent` that respond to user messages using the `trigger` parameter:

Java
:   ```
    @EmbabelComponent
    public class ChatActions {

        private final ToolishRag toolishRag;
        private final RagbotProperties properties;

        public ChatActions(
                SearchOperations searchOperations,
                RagbotProperties properties) {
            this.toolishRag = new ToolishRag(
                    "sources",
                    "Sources for answering user questions",
                    searchOperations
            );
            this.properties = properties;
        }

        @Action(canRerun = true, trigger = UserMessage.class)  (1) (2)
        void respond(
                Conversation conversation, (3)
                ActionContext context) {
            var assistantMessage = context.ai()
                    .withLlm(properties.chatLlm())
                    .withReference(toolishRag)
                    .rendering("ragbot")
                    .respondWithSystemPrompt(conversation, Map.of(
                            "properties", properties
                    ));
            context.sendMessage(conversation.addMessage(assistantMessage)); (4)
        }
    }
    ```

Kotlin
:   ```
    @EmbabelComponent
    class ChatActions(
        searchOperations: SearchOperations,
        private val properties: RagbotProperties
    ) {
        private val toolishRag = ToolishRag(
            "sources",
            "Sources for answering user questions",
            searchOperations
        )

        @Action(canRerun = true, trigger = UserMessage::class)  (1) (2)
        fun respond(
            conversation: Conversation, (3)
            context: ActionContext
        ) {
            val assistantMessage = context.ai()
                .withLlm(properties.chatLlm())
                .withReference(toolishRag)
                .rendering("ragbot")
                .respondWithSystemPrompt(conversation, mapOf(
                    "properties" to properties
                ))
            context.sendMessage(conversation.addMessage(assistantMessage)) (4)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `trigger = UserMessage.class` - action is invoked when a `UserMessage` is the last object added to the blackboard |
| **2** | `canRerun = true` - action can be executed multiple times (for each user message) |
| **3** | `Conversation` parameter is automatically injected from the blackboard |
| **4** | `context.sendMessage()` sends the response to the output channel |

##### Step 2: Configure the Chatbot Bean

Use `AgentProcessChatbot.utilityFromPlatform()` to create a utility-based chatbot that discovers all available actions:

Java
:   ```
    @Configuration
    class ChatConfiguration {

        @Bean
        Chatbot chatbot(AgentPlatform agentPlatform) {
            return AgentProcessChatbot.utilityFromPlatform(agentPlatform);  (1) (2)
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class ChatConfiguration {

        @Bean
        fun chatbot(agentPlatform: AgentPlatform): Chatbot =
            AgentProcessChatbot.utilityFromPlatform(agentPlatform)  (1) (2)
    }
    ```

|  |  |
| --- | --- |
| **1** | Creates a chatbot using Utility AI planning to select the best action |
| **2** | Discovers all `@Action` methods from `@EmbabelComponent` classes on the platform |

For debugging, you can pass a custom `Verbosity` configuration:

Java
:   ```
    @Bean
    Chatbot chatbot(AgentPlatform agentPlatform) {
        return AgentProcessChatbot.utilityFromPlatform(
                agentPlatform,
                new InMemoryConversationFactory(), (1)
                new Verbosity().showPrompts()      (2)
        );
    }
    ```

Kotlin
:   ```
    @Bean
    fun chatbot(agentPlatform: AgentPlatform): Chatbot =
        AgentProcessChatbot.utilityFromPlatform(
            agentPlatform,
            InMemoryConversationFactory(), (1)
            Verbosity().showPrompts()      (2)
        )
    ```

|  |  |
| --- | --- |
| **1** | Conversation factory (required when specifying verbosity) |
| **2** | `Verbosity` configuration for debugging prompts |

|  |  |
| --- | --- |
|  | Be sure that the `AgentPlatform` has loaded all its actions before creating a new session on your `AgentProcessChatbot`. Otherwise the actions needed to respond to chat may not be available in the session. |

#### 4.13.5. Conversation Storage

By default, chatbots use **in-memory conversations** that are lost when the session ends.
For production applications, you typically want to **persist conversations** to a backing store.

##### Storage Types

Embabel supports two conversation storage types via `ConversationStoreType`:

| Type | Description |
| --- | --- |
| `IN_MEMORY` | Conversations stored in memory only. Fast and simple, suitable for testing and ephemeral sessions. |
| `STORED` | Conversations persisted to a backing store (e.g., Neo4j). Requires `embabel-chat-store` dependency. |

##### Configuring Persistent Storage

To use persistent conversations, inject `ConversationFactoryProvider` and pass the appropriate factory when creating the chatbot:

Java
:   ```
    @Configuration
    class ChatConfiguration {

        @Bean
        Chatbot chatbot(
                AgentPlatform agentPlatform,
                ConversationFactoryProvider conversationFactoryProvider) { (1)

            ConversationFactory factory = conversationFactoryProvider
                    .getFactory(ConversationStoreType.STORED); (2)

            return new AgentProcessChatbot(
                    agentPlatform,
                    user -> createAgent(agentPlatform),
                    factory,  (3)
                    // ... other configuration
            );
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class ChatConfiguration {

        @Bean
        fun chatbot(
            agentPlatform: AgentPlatform,
            conversationFactoryProvider: ConversationFactoryProvider (1)
        ): Chatbot {
            val factory = conversationFactoryProvider
                .getFactory(ConversationStoreType.STORED) (2)

            return AgentProcessChatbot(
                agentPlatform,
                { user -> createAgent(agentPlatform) },
                factory,  (3)
                // ... other configuration
            )
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Inject the `ConversationFactoryProvider` via Spring DI |
| **2** | Get the factory for the desired storage type |
| **3** | Pass the factory to the chatbot - storage is configured once at creation time |

|  |  |
| --- | --- |
|  | Storage type is configured once when creating the chatbot, not per-call. This ensures consistent behavior across all sessions. |

##### Adding embabel-chat-store

To enable persistent storage, add the `embabel-chat-store` dependency:

```
<dependency>
    <groupId>com.embabel.chat</groupId>
    <artifactId>embabel-chat-store</artifactId>
</dependency>
```

This provides:

* `StoredConversationFactory` - creates conversations that persist to Neo4j
* `StoredConversation` - conversation implementation with async persistence
* Message lifecycle events (`MessageEvent`) for UI updates
* Title generation for conversation sessions

##### Restoring Conversations

To restore a conversation, pass the `conversationId` when creating a session:

Java
:   ```
    // Restore existing conversation or create new one
    ChatSession session = chatbot.createSession(
        user,
        outputChannel,
        null,            // contextId
        conversationId   (1)
    );

    // Messages are already loaded if conversation existed
    List<Message> history = session.getConversation().getMessages();
    ```

Kotlin
:   ```
    // Restore existing conversation or create new one
    val session = chatbot.createSession(
        user,
        outputChannel,
        contextId = null,
        conversationId = conversationId   (1)
    )

    // Messages are already loaded if conversation existed
    val history = session.conversation.messages
    ```

|  |  |
| --- | --- |
| **1** | If the conversation exists in storage, it will be loaded automatically. If not, a new conversation is created with this ID. |

This allows applications to:

* Resume conversations across server restarts
* Display conversation history to returning users
* Continue multi-turn interactions from where they left off

|  |  |
| --- | --- |
|  | For lower-level access, you can also use `ConversationFactory.load(conversationId)` directly to check if a conversation exists before creating a session. |

##### Step 3: Use the Chatbot

Interact with the chatbot through its session interface:

Java
:   ```
    // New session (fresh state, generated conversation ID)
    ChatSession session = chatbot.createSession(user, outputChannel, null, null); (1)

    // Session with context (restores blackboard state)
    ChatSession withContext = chatbot.createSession(user, outputChannel, "user-workspace-123", null); (2)

    // Restore existing conversation by ID
    ChatSession restored = chatbot.createSession(user, outputChannel, null, savedConversationId); (3)

    // Both context and conversation restoration
    ChatSession full = chatbot.createSession(user, outputChannel, "user-workspace-123", savedConversationId); (4)

    session.onUserMessage(new UserMessage("What does this document say about taxes?")); (5)
    // Response is automatically sent to the outputChannel
    ```

Kotlin
:   ```
    // New session (fresh state, generated conversation ID)
    val session = chatbot.createSession(user, outputChannel) (1)

    // Session with context (restores blackboard state)
    val withContext = chatbot.createSession(user, outputChannel, contextId = "user-workspace-123") (2)

    // Restore existing conversation by ID
    val restored = chatbot.createSession(user, outputChannel, conversationId = savedConversationId) (3)

    // Both context and conversation restoration
    val full = chatbot.createSession(user, outputChannel, "user-workspace-123", savedConversationId) (4)

    session.onUserMessage(UserMessage("What does this document say about taxes?")) (5)
    // Response is automatically sent to the outputChannel
    ```

|  |  |
| --- | --- |
| **1** | Create a new session with fresh blackboard and auto-generated conversation ID |
| **2** | Load prior blackboard state from the "user-workspace-123" context |
| **3** | Restore an existing conversation with its message history |
| **4** | Both: load context state AND restore conversation history |
| **5** | Send a user message - triggers the agent to select and run an action |

#### 4.13.6. How Message Triggering Works

When you specify `trigger = UserMessage.class` on an action:

1. The chatbot adds the `UserMessage` to both the `Conversation` and the `AgentProcess` blackboard
2. The planner evaluates all actions whose trigger conditions are satisfied
3. For utility planning, the action with the highest value (lowest cost) is selected
4. The action method receives the `Conversation` (with the new message) via parameter injection

This trigger-based approach means:

* You can have multiple actions that respond to user messages with different costs
* The planner picks the most appropriate response strategy
* Actions can also be triggered by other event types (not just `UserMessage`)

#### 4.13.7. Dynamic Cost Methods

For more sophisticated action selection, use `@Cost` methods:

Java
:   ```
    @Cost (1)
    double dynamic(Blackboard bb) { (2)
        return bb.getObjects().size() > 5 ? 100 : 10; (3)
    }

    @Action(canRerun = true,
            trigger = UserMessage.class,
            costMethod = "dynamic") (4)
    void respond(Conversation conversation, ActionContext context) {
        // ...
    }
    ```

Kotlin
:   ```
    @Cost (1)
    fun dynamic(bb: Blackboard): Double = (2)
        if (bb.objects.size > 5) 100.0 else 10.0 (3)

    @Action(canRerun = true,
            trigger = UserMessage::class,
            costMethod = "dynamic") (4)
    fun respond(conversation: Conversation, context: ActionContext) {
        // ...
    }
    ```

|  |  |
| --- | --- |
| **1** | `@Cost` marks this as a cost calculation method |
| **2** | Receives the `Blackboard` to inspect current state |
| **3** | Returns cost value - lower costs mean higher priority |
| **4** | `costMethod` links the action to the cost calculation method |

#### 4.13.8. Prompt Templates

Chatbots typically use **Jinja prompt templates** rather than inline string prompts.
This isn’t strictly necessaryâsimple chatbots can use regular string prompts built in code:

Java
:   ```
    var assistantMessage = context.ai()
            .withLlm(properties.chatLlm())
            .withSystemPrompt("You are a helpful assistant. Answer questions concisely.") (1)
            .respond(conversation.getMessages());
    ```

Kotlin
:   ```
    val assistantMessage = context.ai()
        .withLlm(properties.chatLlm())
        .withSystemPrompt("You are a helpful assistant. Answer questions concisely.") (1)
        .respond(conversation.messages)
    ```

|  |  |
| --- | --- |
| **1** | Simple inline prompt - fine for basic chatbots |

However, production chatbots often need **longer, more complex prompts** for:

* Personality and tone (personas)
* Guardrails and safety instructions
* Domain-specific objectives
* Dynamic behavior based on configuration

For these cases, Jinja templates are the better choice:

Java
:   ```
    var assistantMessage = context.ai()
            .withLlm(properties.chatLlm())
            .withReference(toolishRag)
            .rendering("ragbot") (1)
            .respondWithSystemPrompt(conversation, Map.of( (2)
                    "properties", properties,
                    "persona", properties.persona(),
                    "objective", properties.objective()
            ));
    ```

Kotlin
:   ```
    val assistantMessage = context.ai()
        .withLlm(properties.chatLlm())
        .withReference(toolishRag)
        .rendering("ragbot") (1)
        .respondWithSystemPrompt(conversation, mapOf( (2)
            "properties" to properties,
            "persona" to properties.persona(),
            "objective" to properties.objective()
        ))
    ```

|  |  |
| --- | --- |
| **1** | Loads `prompts/ragbot.jinja` from resources |
| **2** | Template bindings - accessible in Jinja as `properties.persona()` etc. |

Templates allow:

* Separation of prompt engineering from code
* Dynamic persona and objective selection via configuration
* Reusable prompt elements (guardrails, personalization)
* Prompt iteration without code changes

##### Resilient Responses with `respond`

In a chatbot, it’s critical never to leave the user without a reply.
The `respond` method on `Rendering` wraps `respondWithSystemPrompt` with error handling, so that an LLM or infrastructure failure still returns an `AssistantMessage` to the user rather than propagating an exception:

Java
:   ```
    var assistantMessage = context.ai()
            .rendering("ragbot")
            .respond(conversation, model, error -> {
                logger.error("Failed to generate response", error);
                return new AssistantMessage("Sorry, something went wrong. Please try again.");
            });
    ```

Kotlin
:   ```
    val assistantMessage = context.ai()
        .rendering("ragbot")
        .respond(conversation, model) { error ->
            logger.error("Failed to generate response", error)
            AssistantMessage("Sorry, something went wrong. Please try again.")
        }
    ```

##### Template Structure Example

A typical chatbot template structure from the rag-demo project:

```
prompts/
âââ ragbot.jinja                    # Main entry point
âââ elements/
â   âââ guardrails.jinja            # Safety restrictions
â   âââ personalization.jinja       # Dynamic persona/objective loader
âââ personas/
â   âââ clause.jinja                # Legal expert persona
â   âââ ...
âââ objectives/
    âââ legal.jinja                 # Legal document analysis objective
```

The main template (`ragbot.jinja`) composes from reusable elements:

```
{% include "elements/guardrails.jinja" %} (1)

{% include "elements/personalization.jinja" %} (2)
```

|  |  |
| --- | --- |
| **1** | Include safety guardrails first |
| **2** | Then include persona and objective (which are dynamically selected) |

Guardrails define safety boundaries (`elements/guardrails.jinja`):

```
{# Safety and content guardrails for the ragbot. #}

DO NOT DISCUSS POLITICS OR CONTROVERSIAL TOPICS.
```

Personalization dynamically loads persona and objective (`elements/personalization.jinja`):

```
{% set persona_template = "personas/" ~ properties.persona() ~ ".jinja" %} (1)
{% include persona_template %}

{% set objective_template = "objectives/" ~ properties.objective() ~ ".jinja" %} (2)
{% include objective_template %}
```

|  |  |
| --- | --- |
| **1** | Build template path from `properties.persona()` (e.g., "clause" â "personas/clause.jinja") |
| **2** | Build template path from `properties.objective()` (e.g., "legal" â "objectives/legal.jinja") |

A persona template (`personas/clause.jinja`):

```
Your name is Clause.
You are a brilliant legal chatbot who excels at interpreting
legislation and legal documents.
```

An objective template (`objectives/legal.jinja`):

```
You are an authoritative interpreter of legislation and legal documents.
You are renowned for thoroughness and for never missing anything.

You answer questions definitively, in a clear and concise manner.
You cite relevant sections to back up your answers.
If you don't know, say you don't know.
NEVER FABRICATE ANSWERS.

You ground your answers in literal citations from the provided sources.
Always use the available tools. (1)
```

|  |  |
| --- | --- |
| **1** | Instructs the LLM to use RAG tools provided via `withReference()` |

This modular approach lets you:

* Switch personas via `application.yml` without code changes
* Share guardrails across multiple chatbot configurations
* Test different objectives independently

#### 4.13.9. Advanced: State Management with @State

For complex chatbots that need to track state across messages, use `@State` classes.
State classes are automatically managed by the agent framework:

* State objects are persisted in the blackboard
* Actions can depend on specific state being present
* State transitions drive the conversation flow

Cross-reference the @State annotation documentation for details on:

* Defining state classes
* State-dependent actions
* Nested state machines

#### 4.13.10. Complete Example

See the [rag-demo](https://github.com/embabel/rag-demo) project for a complete chatbot implementation including:

* `ChatActions.java` - Action methods responding to user messages
* `ChatConfiguration.java` - Chatbot bean configuration
* `RagbotShell.java` - Spring Shell integration for interactive testing
* Jinja templates for persona-driven prompts
* RAG integration for document-grounded responses

To run the example:

```
./scripts/shell.sh

# In the shell:
ingest ./data/document.md
chat
> What does the document say about...
```

### 4.14. The AgentProcess

An `AgentProcess` is created every time an agent is run.
It has a unique id.

### 4.15. Execution Modes

Embabel supports two execution modes for agent processes, controlled by the
`embabel.agent.platform.process-type` property.

#### 4.15.1. SimpleAgentProcess (Default)

`SimpleAgentProcess` is the default execution mode.
On each planning tick it selects the single best action from the current plan
and runs it to completion before replanning.

This sequential approach is predictable and easy to reason about:
actions never run in parallel and the blackboard is always in a consistent state
when the next action begins.

#### 4.15.2. ConcurrentAgentProcess

`ConcurrentAgentProcess` extends `SimpleAgentProcess` and runs **all currently
achievable actions in parallel** on each planning tick.

Instead of picking one action per tick, it finds every action in the plan that
is achievable given the current world state and launches them concurrently using
the platform’s `Asyncer` abstraction (backed by Spring’s managed task executor
with virtual threads).
Once all launched actions have completed the process replans, and the cycle repeats.

This is useful when an agent has independent sub-tasks that can proceed simultaneouslyâ
for example, enriching multiple data items in parallel, or running several
analysis steps whose outputs do not depend on each other.

##### Activating ConcurrentAgentProcess

Set the following property in your application configuration:

```
embabel:
  agent:
    platform:
      process-type: CONCURRENT
```

or in `application.properties`:

```
embabel.agent.platform.process-type=CONCURRENT
```

The default value is `SIMPLE`.

##### Replanning in Concurrent Mode

Both `SimpleAgentProcess` and `ConcurrentAgentProcess` support
`ReplanRequestedException`, which an action can throw to signal that the agent
should update the blackboard and replan before proceeding.

In `ConcurrentAgentProcess`, multiple concurrently running actions may throw
`ReplanRequestedException` at the same time.
When this happens only the first request is honouredâits blackboard updates
are applied and the triggering action is blacklisted for the next planning
cycle to prevent an immediate infinite loop.
The remaining requests are silently dropped, as they ran in a context that is
about to be replanned anyway.

The blacklist is cleared automatically after a successful planning cycle.
If no plan can be found while a blacklist is active, the blacklist is cleared
and planning is retried, ensuring the agent does not become permanently stuck.

##### Choosing an Execution Mode

| Mode | When to use | Trade-offs |
| --- | --- | --- |
| `SIMPLE` | Most agents; sequential pipelines; when action order matters | Predictable; easier to debug; no concurrency overhead |
| `CONCURRENT` | Independent parallel sub-tasks; fan-out/fan-in patterns; throughput-sensitive workloads | Higher throughput; requires actions to be safe to run concurrently against a shared blackboard |

### 4.16. ProcessOptions

Agent processes can be configured with `ProcessOptions`.

`ProcessOptions` controls:

* `contextId`: An identifier of any existing context in which the agent is running.
* `blackboard`: The blackboard to use for the agent.
  Allows starting from a particular state.
* `test`: Whether the agent is running in test mode.
* `verbosity`: The verbosity level of the agent.
  Allows fine grained control over logging prompts, LLM returns and detailed planning information
* `control`: Control options, determining whether the agent should be terminated as a last resort. `EarlyTerminationPolicy` can based on an absolute number of actions or a maximum budget.
* Delays: Both operations (actions) and tools can have delays.
  This is useful to avoid rate limiting.
* `ephemaral`: blocks Agent Process from persisting in Agent Process Repository and from spawning child processes (light-weighted agent process)
* `toolCallContext`: Out-of-band metadata (e.g., auth tokens, tenant IDs, correlation IDs) passed to all tool invocations during the process.
  This context propagates through the entire tool pipelineâincluding decorator chains and MCP toolsâwithout being exposed to the LLM.
  Set via `withToolCallContext()`:

Java
:   ```
    var processOptions = new ProcessOptions()
        .withToolCallContext(Map.of(
            "authToken", bearerToken,
            "tenantId", tenantId
        ));
    ```

Kotlin
:   ```
    val processOptions = ProcessOptions()
        .withToolCallContext(ToolCallContext.of(
            "authToken" to bearerToken,
            "tenantId" to tenantId,
        ))
    ```

See [Receiving Out-of-Band Context in Tools](#reference.tools__tool-call-context) for how tools receive this context.

![embabel execution context](images/embabel_execution_context.dot.png)

### 4.17. The AgentPlatform

An `AgentPlatform` provides the ability to run agents in a specific environment.
This is an SPI interface, so multiple implementations are possible.

![embabel agent platform model](images/embabel_agent_platform_model.dot.png)

### 4.18. Invoking Embabel Agents

While many examples show Embabel agents being invoked via `UserInput` through the Embabel shell, they can also be invoked programmatically with strong typing.

This is usually how they’re used in web applications.
It is also the most deterministic approach as code, rather than LLM assessment of user input, determines which agent is invoked and how.

#### 4.18.1. Creating an AgentProcess Programmatically

You can create and execute agent processes directly using the `AgentPlatform`:

Java
:   ```
    // Create an agent process with bindings
    AgentProcess agentProcess = agentPlatform.createAgentProcess(
        myAgent,
        new ProcessOptions(),
        Map.of("input", userRequest)
    );

    // Start the process and wait for completion
    Object result = agentPlatform.start(agentProcess).get();

    // Or run synchronously
    AgentProcess completedProcess = agentProcess.run();
    MyResultType result = completedProcess.last(MyResultType.class);
    ```

Kotlin
:   ```
    // Create an agent process with bindings
    val agentProcess = agentPlatform.createAgentProcess(
        agent = myAgent,
        processOptions = ProcessOptions(),
        bindings = mapOf("input" to userRequest)
    )

    // Start the process and wait for completion
    val result = agentPlatform.start(agentProcess).get()

    // Or run synchronously
    val completedProcess = agentProcess.run()
    val result = completedProcess.last<MyResultType>()
    ```

You can create processes and populate their input map from varargs objects:

Java
:   ```
    // Create process from objects (like in web controllers)
    AgentProcess agentProcess = agentPlatform.createAgentProcessFrom(
        travelAgent,
        new ProcessOptions(),
        travelRequest,
        userPreferences
    );
    ```

Kotlin
:   ```
    // Create process from objects (like in web controllers)
    val agentProcess = agentPlatform.createAgentProcessFrom(
        agent = travelAgent,
        processOptions = ProcessOptions(),
        travelRequest,
        userPreferences
    )
    ```

#### 4.18.2. Using AgentInvocation

`AgentInvocation` provides a higher-level, type-safe API for invoking agents.
It automatically finds the appropriate agent based on the expected result type.

##### Basic Usage

Java
:   ```
    // Simple invocation with explicit result type
    var invocation =
        AgentInvocation.create(agentPlatform, TravelPlan.class);

    TravelPlan plan = invocation.invoke(travelRequest);
    ```

Kotlin
:   ```
    // Type-safe invocation with inferred result type
    val invocation: AgentInvocation<TravelPlan> =
        AgentInvocation.create(agentPlatform)

    val plan = invocation.invoke(travelRequest)
    ```

##### Invocation with Named Inputs

Java
:   ```
    // Invoke with a map of named inputs
    Map<String, Object> inputs = Map.of(
        "request", travelRequest,
        "preferences", userPreferences
    );

    TravelPlan plan = invocation.invoke(inputs);
    ```

Kotlin
:   ```
    // Invoke with a map of named inputs
    val inputs = mapOf(
        "request" to travelRequest,
        "preferences" to userPreferences
    )

    val plan = invocation.invoke(inputs)
    ```

##### Custom Process Options

Configure verbosity, budget, and other execution options:

Java
:   ```
    var processOptions = new ProcessOptions()
        .withVerbosity(new Verbosity()
            .withShowPrompts(true)
            .withShowLlmResponses(true)
            .withDebug(true));

    var invocation =
        AgentInvocation.builder(agentPlatform)
            .options(processOptions)
            .build(TravelPlan.class);

    TravelPlan plan = invocation.invoke(travelRequest);
    ```

Kotlin
:   ```
    val processOptions = ProcessOptions(
        verbosity = Verbosity(
            showPrompts = true,
            showLlmResponses = true,
            debug = true
        )
    )

    val invocation: AgentInvocation<TravelPlan> =
        AgentInvocation.builder(agentPlatform)
            .options(processOptions)
            .build()

    val plan = invocation.invoke(travelRequest)
    ```

##### Passing Tool Call Context at Invocation Time

Use `ProcessOptions.withToolCallContext()` to attach out-of-band metadata that flows through the entire agent run to every tool invoked â including remote MCP tools, where it becomes MCP `_meta` on the wire.
This is the right place for cross-cutting infrastructure concerns such as auth tokens, tenant IDs, and correlation IDs that come from the incoming request.

Java
:   ```
    // In a REST controller or event handler
    var processOptions = new ProcessOptions()
        .withToolCallContext(Map.of(
            "authToken",     request.getHeader("Authorization"),
            "tenantId",      request.getHeader("X-Tenant-Id"),
            "correlationId", UUID.randomUUID().toString()
        ));

    var invocation = AgentInvocation.builder(agentPlatform)
        .options(processOptions)
        .build(CustomerReport.class);

    CustomerReport report = invocation.invoke(customerQuery);
    ```

Kotlin
:   ```
    // In a REST controller or event handler
    val processOptions = ProcessOptions()
        .withToolCallContext(ToolCallContext.of(
            "authToken"     to request.getHeader("Authorization"),
            "tenantId"      to request.getHeader("X-Tenant-Id"),
            "correlationId" to UUID.randomUUID().toString(),
        ))

    val invocation = AgentInvocation.builder(agentPlatform)
        .options(processOptions)
        .build<CustomerReport>()

    val report = invocation.invoke(customerQuery)
    ```

Context set here can be read by any `@LlmTool` method that declares a `ToolCallContext` parameter.
It can also be supplemented per-interaction inside `@Action` methods using `PromptRunner.withToolCallContext()`; interaction-level values win on conflict.
See [Receiving Out-of-Band Context in Tools](#reference.tools__tool-call-context) for the full context pipeline.

##### Asynchronous Invocation

For long-running operations, use async invocation:

Java
:   ```
    CompletableFuture<TravelPlan> future = invocation.invokeAsync(travelRequest);

    // Handle result when complete
    future.thenAccept(plan -> {
        logger.info("Travel plan generated: {}", plan);
    });

    // Or wait for completion
    TravelPlan plan = future.get();
    ```

Kotlin
:   ```
    val future: CompletableFuture<TravelPlan> = invocation.invokeAsync(travelRequest)

    // Handle result when complete
    future.thenAccept { plan ->
        logger.info("Travel plan generated: {}", plan)
    }

    // Or wait for completion
    val plan = future.get()
    ```

##### Agent Selection

`AgentInvocation` automatically finds agents by examining their goals:

* Searches all registered agents in the platform
* Finds agents with goals that produce the requested result type
* Uses the first matching agent found
* Throws an error if no suitable agent is available

##### Real-World Web Application Example

Here’s how `AgentInvocation` is used in the [Tripper travel planning application](http://github.com/embabel/tripper) with htmx for asynchronous UI updates:

Java
:   ```
    @Controller
    public class TripPlanningController {

        private final AgentPlatform agentPlatform;
        private final ConcurrentHashMap<String, CompletableFuture<TripPlan>> activeJobs =
            new ConcurrentHashMap<>();
        private static final Logger logger =
            LoggerFactory.getLogger(TripPlanningController.class);
        private static final ConcurrentHashMap<String, TripPlan> tripResultCache =
            new ConcurrentHashMap<>();

        public TripPlanningController(AgentPlatform agentPlatform) {
            this.agentPlatform = agentPlatform;
        }

        @PostMapping("/plan-trip")
        public String planTrip(
                @ModelAttribute TripRequest tripRequest,
                Model model) {
            // Generate unique job ID for tracking
            String jobId = UUID.randomUUID().toString();

            // Create agent invocation with custom options
            var processOptions = new ProcessOptions()
                .withVerbosity(new Verbosity().withShowPrompts(true));
            var invocation = AgentInvocation.builder(agentPlatform)
                .options(processOptions)
                .build(TripPlan.class);

            // Start async agent execution
            CompletableFuture<TripPlan> future = invocation.invokeAsync(tripRequest);
            activeJobs.put(jobId, future);

            // Set up completion handler
            future.whenComplete((result, throwable) -> {
                if (throwable != null) {
                    logger.error("Trip planning failed for job {}", jobId, throwable);
                } else {
                    logger.info("Trip planning completed for job {}", jobId);
                }
            });

            model.addAttribute("jobId", jobId);
            model.addAttribute("tripRequest", tripRequest);

            // Return htmx template that will poll for results
            return "trip-planning-progress";
        }

        @GetMapping("/trip-status/{jobId}")
        @ResponseBody
        public ResponseEntity<Map<String, Object>> getTripStatus(@PathVariable String jobId) {
            CompletableFuture<TripPlan> future = activeJobs.get(jobId);
            if (future == null) {
                return ResponseEntity.notFound().build();
            }

            if (future.isDone()) {
                try {
                    TripPlan tripPlan = future.get();
                    activeJobs.remove(jobId);

                    return ResponseEntity.ok(Map.of(
                        "status", "completed",
                        "result", tripPlan,
                        "redirect", "/trip-result/" + jobId
                    ));
                } catch (Exception e) {
                    activeJobs.remove(jobId);
                    return ResponseEntity.ok(Map.of(
                        "status", "failed",
                        "error", e.getMessage()
                    ));
                }
            } else if (future.isCancelled()) {
                activeJobs.remove(jobId);
                return ResponseEntity.ok(Map.of("status", "cancelled"));
            } else {
                return ResponseEntity.ok(Map.of(
                    "status", "in_progress",
                    "message", "Planning your amazing trip..."
                ));
            }
        }

        @GetMapping("/trip-result/{jobId}")
        public String showTripResult(
                @PathVariable String jobId,
                Model model) {
            // Retrieve completed result from cache or database
            TripPlan tripPlan = tripResultCache.get(jobId);
            if (tripPlan == null) {
                return "redirect:/error";
            }

            model.addAttribute("tripPlan", tripPlan);
            return "trip-result";
        }

        @DeleteMapping("/cancel-trip/{jobId}")
        @ResponseBody
        public ResponseEntity<Map<String, String>> cancelTrip(@PathVariable String jobId) {
            CompletableFuture<TripPlan> future = activeJobs.get(jobId);

            if (future != null && !future.isDone()) {
                future.cancel(true);
                activeJobs.remove(jobId);
                return ResponseEntity.ok(Map.of("status", "cancelled"));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Job not found or already completed"));
            }
        }
    }
    ```

Kotlin
:   ```
    @Controller
    class TripPlanningController(
        private val agentPlatform: AgentPlatform
    ) {

        private val activeJobs = ConcurrentHashMap<String, CompletableFuture<TripPlan>>()

        @PostMapping("/plan-trip")
        fun planTrip(
            @ModelAttribute tripRequest: TripRequest,
            model: Model
        ): String {
            // Generate unique job ID for tracking
            val jobId = UUID.randomUUID().toString()

            // Create agent invocation with custom options
            val processOptions = ProcessOptions(
                verbosity = Verbosity(showPrompts = true)
            )
            val invocation: AgentInvocation<TripPlan> = AgentInvocation.builder(agentPlatform)
                .options(processOptions)
                .build()

            // Start async agent execution
            val future = invocation.invokeAsync(tripRequest)
            activeJobs[jobId] = future

            // Set up completion handler
            future.whenComplete { result, throwable ->
                if (throwable != null) {
                    logger.error("Trip planning failed for job $jobId", throwable)
                } else {
                    logger.info("Trip planning completed for job $jobId")
                }
            }

            model.addAttribute("jobId", jobId)
            model.addAttribute("tripRequest", tripRequest)

            // Return htmx template that will poll for results
            return "trip-planning-progress"
        }

        @GetMapping("/trip-status/{jobId}")
        @ResponseBody
        fun getTripStatus(@PathVariable jobId: String): ResponseEntity<Map<String, Any>> {
            val future = activeJobs[jobId]
                ?: return ResponseEntity.notFound().build()

            return when {
                future.isDone -> {
                    try {
                        val tripPlan = future.get()
                        activeJobs.remove(jobId)

                        ResponseEntity.ok(mapOf(
                            "status" to "completed",
                            "result" to tripPlan,
                            "redirect" to "/trip-result/$jobId"
                        ))
                    } catch (e: Exception) {
                        activeJobs.remove(jobId)
                        ResponseEntity.ok(mapOf(
                            "status" to "failed",
                            "error" to e.message
                        ))
                    }
                }
                future.isCancelled -> {
                    activeJobs.remove(jobId)
                    ResponseEntity.ok(mapOf("status" to "cancelled"))
                }
                else -> {
                    ResponseEntity.ok(mapOf(
                        "status" to "in_progress",
                        "message" to "Planning your amazing trip..."
                    ))
                }
            }
        }

        @GetMapping("/trip-result/{jobId}")
        fun showTripResult(
            @PathVariable jobId: String,
            model: Model
        ): String {
            // Retrieve completed result from cache or database
            val tripPlan = tripResultCache[jobId]
                ?: return "redirect:/error"

            model.addAttribute("tripPlan", tripPlan)
            return "trip-result"
        }

        @DeleteMapping("/cancel-trip/{jobId}")
        @ResponseBody
        fun cancelTrip(@PathVariable jobId: String): ResponseEntity<Map<String, String>> {
            val future = activeJobs[jobId]

            return if (future != null && !future.isDone) {
                future.cancel(true)
                activeJobs.remove(jobId)
                ResponseEntity.ok(mapOf("status" to "cancelled"))
            } else {
                ResponseEntity.badRequest()
                    .body(mapOf("error" to "Job not found or already completed"))
            }
        }

        companion object {
            private val logger = LoggerFactory.getLogger(TripPlanningController::class.java)
            private val tripResultCache = ConcurrentHashMap<String, TripPlan>()
        }
    }
    ```

**Key Patterns:**

* **Async Execution**: Uses `invokeAsync()` to avoid blocking the web request
* **Job Tracking**: Maintains a map of active futures for status polling
* **htmx Integration**: Returns status updates that htmx can consume for UI updates
* **Error Handling**: Proper exception handling and user feedback
* **Resource Cleanup**: Removes completed jobs from memory
* **Process Options**: Configures verbosity and debugging for production use

##### Alternative: Direct AgentProcess Creation

For simpler use cases, you can create and start an `AgentProcess` directly without `AgentInvocation`.
This approach is used in the [Tripper](http://github.com/embabel/tripper) application and works well with webhooks or form submissions where you want to:

* Start a long-running agent process
* Return immediately with a process ID
* Poll for status using the platform’s built-in controllers

Java
:   ```
    @Controller
    @RequestMapping("/journey")
    public class JourneyController {

        private final AgentPlatform agentPlatform;

        public JourneyController(AgentPlatform agentPlatform) {
            this.agentPlatform = agentPlatform;
        }

        @PostMapping("/plan")
        public String planJourney(@ModelAttribute JourneyPlanForm form, Model model) {
            // Convert form to domain objects
            TravelBrief travelBrief = new TravelBrief(
                form.getFrom(),
                form.getTo(),
                form.getDepartureDate(),
                form.getReturnDate(),
                form.getBrief()
            );

            // Find the appropriate agent
            Agent agent = agentPlatform.agents().stream()
                .filter(a -> a.getName().toLowerCase().contains("travel"))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No travel agent found"));

            // Create the agent process with input bindings
            AgentProcess agentProcess = agentPlatform.createAgentProcessFrom(
                agent,
                new ProcessOptions(
                    new Verbosity().withShowPrompts(true),
                    Budget.DEFAULT  // or custom budget
                ),
                travelBrief  // Vararg inputs bound to blackboard
            );

            // Start the process asynchronously
            agentPlatform.start(agentProcess);

            // Add process ID to model for status polling
            model.addAttribute("processId", agentProcess.getId());
            model.addAttribute("travelBrief", travelBrief);

            // Return a view that polls /api/v1/process/{processId} for status
            return "processing";
        }
    }
    ```

Kotlin
:   ```
    @Controller
    @RequestMapping("/journey")
    class JourneyController(
        private val agentPlatform: AgentPlatform
    ) {

        @PostMapping("/plan")
        fun planJourney(@ModelAttribute form: JourneyPlanForm, model: Model): String {
            // Convert form to domain objects
            val travelBrief = TravelBrief(
                form.from,
                form.to,
                form.departureDate,
                form.returnDate,
                form.brief
            )

            // Find the appropriate agent
            val agent = agentPlatform.agents()
                .filter { it.name.lowercase().contains("travel") }
                .firstOrNull()
                ?: throw IllegalStateException("No travel agent found")

            // Create the agent process with input bindings
            val agentProcess = agentPlatform.createAgentProcessFrom(
                agent,
                ProcessOptions(
                    verbosity = Verbosity(showPrompts = true),
                    budget = Budget.DEFAULT  // or custom budget
                ),
                travelBrief  // Vararg inputs bound to blackboard
            )

            // Start the process asynchronously
            agentPlatform.start(agentProcess)

            // Add process ID to model for status polling
            model.addAttribute("processId", agentProcess.id)
            model.addAttribute("travelBrief", travelBrief)

            // Return a view that polls /api/v1/process/{processId} for status
            return "processing"
        }
    }
    ```

The platform provides built-in REST endpoints for status checking:

* `GET /api/v1/process/{processId}` - Returns process status, result, and URLs
* `DELETE /api/v1/process/{processId}` - Terminates a running process
* `GET /events/process/{processId}` - SSE stream of process events

Each endpoint can be individually disabled via configuration (see [Configuration](#reference.configuration)).
Set the corresponding property to `false` to have the endpoint respond with HTTP 404:

```
embabel.agent.platform.rest.process-status-enabled=false
embabel.agent.platform.rest.process-kill-enabled=false
embabel.agent.platform.rest.process-events-enabled=false
```

A simple status polling controller can check completion and redirect to results:

Java
:   ```
    @Controller
    public class ProcessStatusController {

        private final AgentPlatform agentPlatform;

        public ProcessStatusController(AgentPlatform agentPlatform) {
            this.agentPlatform = agentPlatform;
        }

        @GetMapping("/status/{processId}")
        public String checkStatus(
                @PathVariable String processId,
                @RequestParam String successView,
                @RequestParam String resultModelKey,
                Model model) {

            AgentProcess process = agentPlatform.getAgentProcess(processId);
            if (process == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Process not found");
            }

            switch (process.getStatus()) {
                case COMPLETED:
                    model.addAttribute(resultModelKey, process.lastResult());
                    return successView;

                case FAILED:
                    model.addAttribute("error", "Process failed: " + process.getFailureInfo());
                    return "error";

                case TERMINATED:
                    model.addAttribute("error", "Process was terminated");
                    return "error";

                default:
                    // Still running - return polling view
                    model.addAttribute("processId", processId);
                    return "processing";
            }
        }
    }
    ```

Kotlin
:   ```
    @Controller
    class ProcessStatusController(
        private val agentPlatform: AgentPlatform
    ) {

        @GetMapping("/status/{processId}")
        fun checkStatus(
            @PathVariable processId: String,
            @RequestParam successView: String,
            @RequestParam resultModelKey: String,
            model: Model
        ): String {
            val process = agentPlatform.getAgentProcess(processId)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Process not found")

            return when (process.status) {
                ProcessStatus.COMPLETED -> {
                    model.addAttribute(resultModelKey, process.lastResult())
                    successView
                }

                ProcessStatus.FAILED -> {
                    model.addAttribute("error", "Process failed: ${process.failureInfo}")
                    "error"
                }

                ProcessStatus.TERMINATED -> {
                    model.addAttribute("error", "Process was terminated")
                    "error"
                }

                else -> {
                    // Still running - return polling view
                    model.addAttribute("processId", processId)
                    "processing"
                }
            }
        }
    }
    ```

**When to Use Each Approach:**

| Approach | Best For |
| --- | --- |
| `AgentInvocation.invokeAsync()` | When you need a `CompletableFuture` for programmatic handling, chaining, or integration with reactive frameworks |
| Direct `AgentProcess` creation | Webhooks, form submissions, or UI flows where you poll for status via REST/SSE |

##### Webhook Integration Example

For webhook-triggered workflows (e.g., JIRA, GitHub), the direct approach works well:

Java
:   ```
    @RestController
    @RequestMapping("/webhook")
    public class WebhookController {

        private final AgentPlatform agentPlatform;

        public WebhookController(AgentPlatform agentPlatform) {
            this.agentPlatform = agentPlatform;
        }

        @PostMapping("/jira/issue-created")
        public ResponseEntity<Map<String, String>> onJiraIssueCreated(
                @RequestBody JiraWebhookPayload payload) {

            // Find agent that handles JIRA issues
            Agent agent = agentPlatform.agents().stream()
                .filter(a -> a.getName().contains("JiraIssue"))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No JIRA agent configured"));

            // Create domain object from webhook payload
            JiraIssue issue = new JiraIssue(
                payload.getIssue().getKey(),
                payload.getIssue().getFields().getSummary(),
                payload.getIssue().getFields().getDescription()
            );

            // Create and start the agent process
            AgentProcess process = agentPlatform.createAgentProcessFrom(
                agent,
                ProcessOptions.DEFAULT,
                issue
            );
            agentPlatform.start(process);

            // Return process ID for status tracking
            return ResponseEntity.accepted().body(Map.of(
                "processId", process.getId(),
                "statusUrl", "/api/v1/process/" + process.getId(),
                "sseUrl", "/events/process/" + process.getId()
            ));
        }
    }
    ```

Kotlin
:   ```
    @RestController
    @RequestMapping("/webhook")
    class WebhookController(
        private val agentPlatform: AgentPlatform
    ) {

        @PostMapping("/jira/issue-created")
        fun onJiraIssueCreated(
            @RequestBody payload: JiraWebhookPayload
        ): ResponseEntity<Map<String, String>> {
            // Find agent that handles JIRA issues
            val agent = agentPlatform.agents()
                .filter { it.name.contains("JiraIssue") }
                .firstOrNull()
                ?: throw IllegalStateException("No JIRA agent configured")

            // Create domain object from webhook payload
            val issue = JiraIssue(
                payload.issue.key,
                payload.issue.fields.summary,
                payload.issue.fields.description
            )

            // Create and start the agent process
            val process = agentPlatform.createAgentProcessFrom(
                agent,
                ProcessOptions.DEFAULT,
                issue
            )
            agentPlatform.start(process)

            // Return process ID for status tracking
            return ResponseEntity.accepted().body(mapOf(
                "processId" to process.id,
                "statusUrl" to "/api/v1/process/${process.id}",
                "sseUrl" to "/events/process/${process.id}"
            ))
        }
    }
    ```

The webhook caller can then poll `/api/v1/process/{processId}` or subscribe to SSE events at `/events/process/{processId}` to track progress.

|  |  |
| --- | --- |
|  | Agents can also be exposed as [MCP](#reference.integrations__mcp) servers and consumed from tools like Claude Desktop. |

#### 4.18.3. Dynamic Agent and Goal Selection with Autonomy

The `Autonomy` class provides LLM-powered dynamic selection of agents and goals based on user intent.
Rather than programmatically choosing which agent to run, `Autonomy` uses an LLM to rank available agents or goals against the user’s input and select the best match.

This is how the Embabel Shell processes natural language commands.

##### Execution Modes

`Autonomy` supports two execution modes:

**Closed Mode** (`chooseAndRunAgent`): The LLM selects the most appropriate agent based on the user’s intent.
The selected agent runs in isolation using only its own actions and goals.

**Open Mode** (`chooseAndAccomplishGoal`): The LLM selects the most appropriate goal from all available goals across all agents.
Embabel then assembles a dynamic agent that can use any action from any agent to achieve that goal.

##### Closed Mode Example

Use closed mode when you want strict agent boundaries:

Java
:   ```
    @Service
    public class IntentHandler {

        private final Autonomy autonomy;

        public IntentHandler(Autonomy autonomy) {
            this.autonomy = autonomy;
        }

        public AgentProcessExecution handleUserIntent(String userIntent) {
            // LLM ranks all agents and selects the best match
            return autonomy.chooseAndRunAgent(
                userIntent,
                ProcessOptions.DEFAULT
            );
        }
    }
    ```

Kotlin
:   ```
    @Service
    class IntentHandler(
        private val autonomy: Autonomy
    ) {

        fun handleUserIntent(userIntent: String): AgentProcessExecution {
            // LLM ranks all agents and selects the best match
            return autonomy.chooseAndRunAgent(
                userIntent,
                ProcessOptions.DEFAULT
            )
        }
    }
    ```

##### Open Mode Example

Use open mode when you want maximum flexibility in achieving goals:

Java
:   ```
    @Service
    public class GoalHandler {

        private final Autonomy autonomy;
        private final AgentPlatform agentPlatform;

        public GoalHandler(Autonomy autonomy, AgentPlatform agentPlatform) {
            this.autonomy = autonomy;
            this.agentPlatform = agentPlatform;
        }

        public AgentProcessExecution handleUserIntent(String userIntent) {
            // LLM ranks all goals and selects the best match
            // Then assembles an agent from available actions to achieve it
            return autonomy.chooseAndAccomplishGoal(
                ProcessOptions.DEFAULT,
                GoalChoiceApprover.APPROVE_ALL,
                agentPlatform,  // AgentScope containing goals and actions
                Map.of("userInput", new UserInput(userIntent)),
                new GoalSelectionOptions()
            );
        }
    }
    ```

Kotlin
:   ```
    @Service
    class GoalHandler(
        private val autonomy: Autonomy,
        private val agentPlatform: AgentPlatform
    ) {

        fun handleUserIntent(userIntent: String): AgentProcessExecution {
            // LLM ranks all goals and selects the best match
            // Then assembles an agent from available actions to achieve it
            return autonomy.chooseAndAccomplishGoal(
                ProcessOptions.DEFAULT,
                GoalChoiceApprover.APPROVE_ALL,
                agentPlatform,  // AgentScope containing goals and actions
                mapOf("userInput" to UserInput(userIntent)),
                GoalSelectionOptions()
            )
        }
    }
    ```

##### Using Arbitrary Bindings

`chooseAndAccomplishGoal` accepts any bindings, not just `UserInput`.
A `BindingsFormatter` extracts intent text from the bindings for goal ranking:

Java
:   ```
    public AgentProcessExecution processTask(Task task, Person person) {
        // Bindings can be any objects
        Map<String, Object> bindings = Map.of(
            "task", task,
            "person", person
        );

        return autonomy.chooseAndAccomplishGoal(
            ProcessOptions.DEFAULT,
            GoalChoiceApprover.APPROVE_ALL,
            agentPlatform,
            bindings,
            new GoalSelectionOptions(),
            BindingsFormatter.DEFAULT  // Extracts intent from bindings
        );
    }
    ```

Kotlin
:   ```
    fun processTask(task: Task, person: Person): AgentProcessExecution {
        // Bindings can be any objects
        val bindings = mapOf(
            "task" to task,
            "person" to person
        )

        return autonomy.chooseAndAccomplishGoal(
            ProcessOptions.DEFAULT,
            GoalChoiceApprover.APPROVE_ALL,
            agentPlatform,
            bindings,
            GoalSelectionOptions(),
            BindingsFormatter.DEFAULT  // Extracts intent from bindings
        )
    }
    ```

The default `BindingsFormatter` extracts text using this priority:

1. `PromptContributor.contribution()` if the object implements `PromptContributor`
2. `HasInfoString.infoString()` if the object implements `HasInfoString`
3. `toString()` otherwise

You can provide a custom formatter:

Java
:   ```
    BindingsFormatter customFormatter = bindings -> {
        Task task = (Task) bindings.get("task");
        Person person = (Person) bindings.get("person");
        return String.format("Process task '%s' for %s", task.getDescription(), person.getName());
    };

    return autonomy.chooseAndAccomplishGoal(
        ProcessOptions.DEFAULT,
        GoalChoiceApprover.APPROVE_ALL,
        agentPlatform,
        bindings,
        new GoalSelectionOptions(),
        customFormatter
    );
    ```

Kotlin
:   ```
    val customFormatter = BindingsFormatter { bindings ->
        val task = bindings["task"] as Task
        val person = bindings["person"] as Person
        "Process task '${task.description}' for ${person.name}"
    }

    return autonomy.chooseAndAccomplishGoal(
        ProcessOptions.DEFAULT,
        GoalChoiceApprover.APPROVE_ALL,
        agentPlatform,
        bindings,
        GoalSelectionOptions(),
        customFormatter
    )
    ```

##### Goal Choice Approval

You can require approval before executing a selected goal:

Java
:   ```
    // Approve only high-confidence matches
    GoalChoiceApprover approver = GoalChoiceApprover.approveWithScoreOver(0.8);

    // Or implement custom approval logic
    GoalChoiceApprover customApprover = request -> {
        if (request.getGoal().getName().contains("dangerous")) {
            return new GoalChoiceNotApproved("Dangerous goals require manual approval");
        }
        return GoalChoiceApproved.INSTANCE;
    };
    ```

Kotlin
:   ```
    // Approve only high-confidence matches
    val approver = GoalChoiceApprover.approveWithScoreOver(0.8)

    // Or implement custom approval logic
    val customApprover = GoalChoiceApprover { request ->
        if (request.goal.name.contains("dangerous")) {
            GoalChoiceNotApproved("Dangerous goals require manual approval")
        } else {
            GoalChoiceApproved
        }
    }
    ```

##### Confidence Thresholds

`Autonomy` uses configurable confidence thresholds to filter matches.
If no agent or goal exceeds the threshold, a `NoAgentFound` or `NoGoalFound` exception is thrown.

Configure thresholds in `application.properties`:

```
# Minimum confidence for agent selection (0.0 to 1.0)
embabel.agent.platform.autonomy.agent-confidence-cut-off=0.6

# Minimum confidence for goal selection (0.0 to 1.0)
embabel.agent.platform.autonomy.goal-confidence-cut-off=0.6
```

Or override per-request using `GoalSelectionOptions`:

Java
:   ```
    GoalSelectionOptions options = new GoalSelectionOptions(
        0.5,    // goalConfidenceCutOff - override platform default
        null,   // agentConfidenceCutOff - use platform default
        false   // multiGoal - whether to select multiple goals
    );
    ```

Kotlin
:   ```
    val options = GoalSelectionOptions(
        goalConfidenceCutOff = 0.5,    // override platform default
        agentConfidenceCutOff = null,  // use platform default
        multiGoal = false              // whether to select multiple goals
    )
    ```

##### Shell Usage

The Embabel Shell uses `Autonomy` for the `execute` (`x`) and `choose-goal` commands:

```
# Closed mode (default) - select best agent
x "Find a horoscope for Alice who is a Scorpio"

# Open mode - select best goal, use any actions
x "Find a horoscope for Alice who is a Scorpio" -o

# Show goal rankings without executing
choose-goal "Find a horoscope for Alice"
```

See [execute (x)](#shell.commands.execute) and [Shell Commands](#shell.commands) for full command and flag documentation.

##### Handling Selection Failures

Java
:   ```
    try {
        return autonomy.chooseAndRunAgent(userIntent, ProcessOptions.DEFAULT);
    } catch (NoAgentFound e) {
        // No agent matched with sufficient confidence
        logger.info("No matching agent. Rankings: {}", e.getAgentRankings());
        return fallbackResponse();
    } catch (NoGoalFound e) {
        // No goal matched with sufficient confidence (open mode)
        logger.info("No matching goal. Rankings: {}", e.getGoalRankings());
        return fallbackResponse();
    } catch (GoalNotApproved e) {
        // Goal was rejected by the approver
        logger.info("Goal not approved: {}", e.getReason());
        return requiresApprovalResponse();
    }
    ```

Kotlin
:   ```
    try {
        return autonomy.chooseAndRunAgent(userIntent, ProcessOptions.DEFAULT)
    } catch (e: NoAgentFound) {
        // No agent matched with sufficient confidence
        logger.info("No matching agent. Rankings: {}", e.agentRankings)
        return fallbackResponse()
    } catch (e: NoGoalFound) {
        // No goal matched with sufficient confidence (open mode)
        logger.info("No matching goal. Rankings: {}", e.goalRankings)
        return fallbackResponse()
    } catch (e: GoalNotApproved) {
        // Goal was rejected by the approver
        logger.info("Goal not approved: {}", e.reason)
        return requiresApprovalResponse()
    }
    ```

### 4.19. Using States

GOAP planning has many benefits, but can make looping hard to express.
For this reason, Embabel supports the notion of **states** within a GOAP plan.

#### 4.19.1. How States Work with GOAP

Within each state, GOAP planning works normally.
Actions have preconditions based on the types they require, and effects based on the types they produce.
The planner finds the optimal sequence of actions to reach the goal.

When an action returns a `@State`-annotated class, the framework:

1. **Hides previous state objects** - Any existing state objects are hidden from the blackboard
2. **Binds the new state object** - The returned state is added to the blackboard
3. **Re-plans from the new state** - The planner considers only actions from the new state
4. **Continues execution** - Until a goal is reached or no plan can be found

**Context is preserved** across state transitions - non-state objects (such as user messages, customer data, and conversation history) remain available.
Only state objects are hidden, ensuring that only the current state’s actions are considered by the planner.

|  |  |
| --- | --- |
|  | State transitions **hide** previous state objects but do **not clear** the blackboard. Non-state objects remain available in the new state. To clear the entire blackboard (e.g., for looping), use `clearBlackboard = true` on the action. |

#### 4.19.2. When to Use States

States are ideal for:

* **Linear stages** where each stage naturally flows to the next
* **Branching workflows** where a decision point leads to different processing paths
* **Looping patterns** where processing may need to repeat (e.g., revise-and-review cycles)
* **Human-in-the-loop workflows** where user feedback determines the next state
* **Complex workflows** that are easier to reason about as discrete phases

States allow loopback to a whole state, which may contain one or more actions.
This is more flexible than traditional GOAP, where looping requires careful management of preconditions.

#### 4.19.3. Staying in the Current State

An action can return `this` to stay in the current state.
This is useful for actions that respond to inputs without changing state, such as chat handlers:

Java
:   ```
    @State
    record ChitchatState(String context) {
        @Action(canRerun = true)  (1)
        ChitchatState respond(UserMessage message, Ai ai) {
            var response = ai.generateText("Respond to: " + message.content());
            // ... send response
            return this;  (2)
        }
    }
    ```

Kotlin
:   ```
    @State
    data class ChitchatState(val context: String) {
        @Action(canRerun = true)  (1)
        fun respond(message: UserMessage, ai: Ai): ChitchatState {
            val response = ai.generateText("Respond to: ${message.content()}")
            // ... send response
            return this  (2)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `canRerun = true` is required - by default, actions only run once per process |
| **2** | Returning `this` keeps the same state instance active |

When an action returns `this`:

* The state remains active with no transition
* The blackboard is preserved (no clearing)
* The action can run again on subsequent planning cycles (if `canRerun = true`)

|  |  |
| --- | --- |
|  | Without `canRerun = true`, the action’s `hasRun` flag would prevent it from executing again, even though it returned `this`. |

#### 4.19.4. Looping States

For looping patterns where an action may return to a previously-visited state type, use `clearBlackboard = true` on the looping action:

Java
:   ```
    @State
    record ProcessingState(String data, int iteration) implements LoopOutcome {
        @Action(clearBlackboard = true)  (1)
        LoopOutcome process() {
            if (iteration >= 3) {
                return new DoneState(data);  (2)
            }
            return new ProcessingState(data + "+", iteration + 1);  (3)
        }
    }
    ```

Kotlin
:   ```
    @State
    data class ProcessingState(val data: String, val iteration: Int) : LoopOutcome {
        @Action(clearBlackboard = true)  (1)
        fun process(): LoopOutcome {
            if (iteration >= 3) {
                return DoneState(data)  (2)
            }
            return ProcessingState("$data+", iteration + 1)  (3)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `clearBlackboard = true` allows the action to loop back to the same state type |
| **2** | Terminal condition exits the loop |
| **3** | Returns a new instance of the same state type for another iteration |

Without `clearBlackboard = true`, the planner would see the output type already exists on the blackboard and skip the action.
Clearing the blackboard resets the context, allowing natural loops.

|  |  |
| --- | --- |
|  | Only use `clearBlackboard = true` on actions that participate in loops. For linear state transitions, the default behavior (preserving the blackboard) is usually preferred. |

#### 4.19.5. The @State Annotation

Classes returned from actions that should trigger state transitions must be annotated with `@State`:

Java
:   ```
    @State
    record ProcessingState(String data) {
        @Action
        NextState process() {
            return new NextState(data.toUpperCase());
        }
    }
    ```

Kotlin
:   ```
    @State
    data class ProcessingState(val data: String) {
        @Action
        fun process(): NextState {
            return NextState(data.uppercase())
        }
    }
    ```

##### Inheritance

The `@State` annotation is inherited through the class hierarchy.
If a superclass or interface is annotated with `@State`, all subclasses and implementing classes are automatically considered state types.
This means you don’t need to annotate every class in a hierarchy - just annotate the base type.

Java
:   ```
    @State
    interface Stage {}  (1)

    record AssessStory(String content) implements Stage { ... }  (2)
    record ReviseStory(String content) implements Stage { ... }
    record Done(String content) implements Stage { ... }
    ```

Kotlin
:   ```
    @State
    interface Stage  (1)

    data class AssessStory(val content: String) : Stage { ... }  (2)
    data class ReviseStory(val content: String) : Stage { ... }
    data class Done(val content: String) : Stage { ... }
    ```

|  |  |
| --- | --- |
| **1** | Only the parent interface needs `@State` |
| **2** | Implementing records/data classes are automatically treated as state types |

This works with:

* **Interfaces**: Classes implementing a `@State` interface are state types
* **Abstract classes**: Classes extending a `@State` abstract class are state types
* **Concrete classes**: Classes extending a `@State` class are state types
* **Deep hierarchies**: The annotation is inherited through multiple levels

##### Behavior

When an action returns a `@State`-annotated class (or a class that inherits `@State`):

* Any previous state objects are **hidden** from the blackboard (not removed, but no longer visible)
* The returned object is bound to the blackboard (as `it`)
* Planning considers only actions defined within the **current** state class
* Any `@AchievesGoal` methods in the state become potential goals

Context (non-state objects) is preserved across state transitions.
This means user messages, customer data, conversation history, etc. remain available in the new state.
Only state objects are hidden, providing **state scoping** - ensuring only the current state’s actions are considered.

|  |  |
| --- | --- |
|  | For looping states that return to a previously-visited state type, use `@Action(clearBlackboard = true)` on the looping action. This clears the blackboard (including hasRun conditions) and allows the loop to continue. See [Looping States](#looping-states) for details. |

#### 4.19.6. Parent State Interface Pattern

For dynamic choice between states, define a parent interface (or sealed interface/class) that child states implement.
Thanks to [inheritance](#inheritance), you only need to annotate the parent interface - all implementing classes are automatically state types:

Java
:   ```
    @State
    interface Stage {}  (1)

    record AssessStory(String content) implements Stage {  (2)
        @Action
        Stage assess() {
            if (isAcceptable()) {
                return new Done(content);
            } else {
                return new ReviseStory(content);
            }
        }
    }

    record ReviseStory(String content) implements Stage {
        @Action
        AssessStory revise() {
            return new AssessStory(improvedContent());
        }
    }

    record Done(String content) implements Stage {
        @AchievesGoal(description = "Processing complete")
        @Action
        Output complete() {
            return new Output(content);
        }
    }
    ```

Kotlin
:   ```
    @State
    interface Stage  (1)

    data class AssessStory(val content: String) : Stage {  (2)
        @Action
        fun assess(): Stage {
            return if (isAcceptable()) {
                Done(content)
            } else {
                ReviseStory(content)
            }
        }
    }

    data class ReviseStory(val content: String) : Stage {
        @Action
        fun revise(): AssessStory {
            return AssessStory(improvedContent())
        }
    }

    data class Done(val content: String) : Stage {
        @AchievesGoal(description = "Processing complete")
        @Action
        fun complete(): Output {
            return Output(content)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `@State` on the parent interface |
| **2** | No `@State` needed on implementing records/data classes - they inherit it from `Stage` |

This pattern enables:

* **Polymorphic return types**: Actions can return any implementation of the parent interface
* **Dynamic routing**: The runtime value determines which state is entered
* **Looping**: States can return other states that eventually loop back

The framework automatically discovers all implementations of the parent interface and registers their actions as potential next steps.

#### 4.19.7. Example: WriteAndReviewAgent

The following example demonstrates a complete write-and-review workflow with:

* State-based flow control with looping
* Human-in-the-loop feedback using `WaitFor`
* LLM-powered content generation and assessment
* Configurable properties passed through states

Java
:   ```
    abstract class Personas { (1)
        static final RoleGoalBackstory WRITER = RoleGoalBackstory
                .withRole("Creative Storyteller")
                .andGoal("Write engaging and imaginative stories")
                .andBackstory("Has a PhD in French literature; used to work in a circus");

        static final Persona REVIEWER = new Persona(
                "Media Book Review",
                "New York Times Book Reviewer",
                "Professional and insightful",
                "Help guide readers toward good stories"
        );
    }

    @Agent(description = "Generate a story based on user input and review it")
    public class WriteAndReviewAgent {

        public record Story(String text) {}

        public record ReviewedStory(
                Story story,
                String review,
                Persona reviewer
        ) implements HasContent, Timestamped {
            // ... content formatting methods
        }

        @State
        interface Stage {} (2)

        record Properties( (3)
                int storyWordCount,
                int reviewWordCount
        ) {}

        private final Properties properties;

        WriteAndReviewAgent(
                @Value("${storyWordCount:100}") int storyWordCount,
                @Value("${reviewWordCount:100}") int reviewWordCount
        ) {
            this.properties = new Properties(storyWordCount, reviewWordCount);
        }

        @Action
        AssessStory craftStory(UserInput userInput, Ai ai) { (4)
            var draft = ai
                    .withLlm(LlmOptions.withAutoLlm().withTemperature(.7))
                    .withPromptContributor(Personas.WRITER)
                    .createObject(String.format("""
                            Craft a short story in %d words or less.
                            The story should be engaging and imaginative.
                            Use the user's input as inspiration if possible.

                            # User input
                            %s
                            """,
                            properties.storyWordCount,
                            userInput.getContent()
                    ).trim(), Story.class);
            return new AssessStory(userInput, draft, properties); (5)
        }

        record HumanFeedback(String comments) {} (6)

        private record AssessmentOfHumanFeedback(boolean acceptable) {}

        @State
        record AssessStory(UserInput userInput, Story story, Properties properties) implements Stage {

            @Action
            HumanFeedback getFeedback() { (7)
                return WaitFor.formSubmission("""
                        Please provide feedback on the story
                        %s
                        """.formatted(story.text),
                        HumanFeedback.class);
            }

            @Action(clearBlackboard = true)  (8)
            Stage assess(HumanFeedback feedback, Ai ai) {
                var assessment = ai.withDefaultLlm().createObject("""
                        Based on the following human feedback, determine if the story is acceptable.
                        Return true if the story is acceptable, false otherwise.

                        # Story
                        %s

                        # Human feedback
                        %s
                        """.formatted(story.text(), feedback.comments),
                        AssessmentOfHumanFeedback.class);
                if (assessment.acceptable) {
                    return new Done(userInput, story, properties); (9)
                } else {
                    return new ReviseStory(userInput, story, feedback, properties); (10)
                }
            }
        }

        @State
        record ReviseStory(UserInput userInput, Story story, HumanFeedback humanFeedback,
                           Properties properties) implements Stage {

            @Action(clearBlackboard = true)  (11)
            AssessStory reviseStory(Ai ai) {
                var draft = ai
                        .withLlm(LlmOptions.withAutoLlm().withTemperature(.7))
                        .withPromptContributor(Personas.WRITER)
                        .createObject(String.format("""
                                Revise a short story in %d words or less.
                                Use the user's input as inspiration if possible.

                                # User input
                                %s

                                # Previous story
                                %s

                                # Revision instructions
                                %s
                                """,
                                properties.storyWordCount,
                                userInput.getContent(),
                                story.text(),
                                humanFeedback.comments
                        ).trim(), Story.class);
                return new AssessStory(userInput, draft, properties); (12)
            }
        }

        @State
        record Done(UserInput userInput, Story story, Properties properties) implements Stage {

            @AchievesGoal( (13)
                    description = "The story has been crafted and reviewed by a book reviewer",
                    export = @Export(remote = true, name = "writeAndReviewStory"))
            @Action
            ReviewedStory reviewStory(Ai ai) {
                var review = ai
                        .withAutoLlm()
                        .withPromptContributor(Personas.REVIEWER)
                        .generateText(String.format("""
                                You will be given a short story to review.
                                Review it in %d words or less.
                                Consider whether the story is engaging, imaginative, and well-written.

                                # Story
                                %s

                                # User input that inspired the story
                                %s
                                """,
                                properties.reviewWordCount,
                                story.text(),
                                userInput.getContent()
                        ).trim());
                return new ReviewedStory(story, review, Personas.REVIEWER);
            }
        }
    }
    ```

Kotlin
:   ```
    object Personas { (1)
        val WRITER: RoleGoalBackstory = RoleGoalBackstory
            .withRole("Creative Storyteller")
            .andGoal("Write engaging and imaginative stories")
            .andBackstory("Has a PhD in French literature; used to work in a circus")

        val REVIEWER: Persona = Persona(
            "Media Book Review",
            "New York Times Book Reviewer",
            "Professional and insightful",
            "Help guide readers toward good stories"
        )
    }

    @Agent(description = "Generate a story based on user input and review it")
    class WriteAndReviewAgent(
        @Value("\${storyWordCount:100}") storyWordCount: Int,
        @Value("\${reviewWordCount:100}") reviewWordCount: Int
    ) {
        data class Story(val text: String)

        data class ReviewedStory(
            val story: Story,
            val review: String,
            val reviewer: Persona
        ) : HasContent, Timestamped {
            // ... content formatting methods
        }

        @State
        interface Stage (2)

        data class Properties( (3)
            val storyWordCount: Int,
            val reviewWordCount: Int
        )

        private val properties = Properties(storyWordCount, reviewWordCount)

        @Action
        fun craftStory(userInput: UserInput, ai: Ai): AssessStory { (4)
            val draft = ai
                .withLlm(LlmOptions.withAutoLlm().withTemperature(.7))
                .withPromptContributor(Personas.WRITER)
                .createObject("""
                    Craft a short story in ${properties.storyWordCount} words or less.
                    The story should be engaging and imaginative.
                    Use the user's input as inspiration if possible.

                    # User input
                    ${userInput.content}
                    """.trimIndent(), Story::class.java)
            return AssessStory(userInput, draft, properties) (5)
        }

        data class HumanFeedback(val comments: String) (6)

        private data class AssessmentOfHumanFeedback(val acceptable: Boolean)
    }

    @State
    data class AssessStory(
        val userInput: UserInput,
        val story: WriteAndReviewAgent.Story,
        val properties: WriteAndReviewAgent.Properties
    ) : WriteAndReviewAgent.Stage {

        @Action
        fun getFeedback(): WriteAndReviewAgent.HumanFeedback { (7)
            return WaitFor.formSubmission("""
                Please provide feedback on the story
                ${story.text}
                """.trimIndent(),
                WriteAndReviewAgent.HumanFeedback::class.java)
        }

        @Action(clearBlackboard = true)  (8)
        fun assess(feedback: WriteAndReviewAgent.HumanFeedback, ai: Ai): WriteAndReviewAgent.Stage {
            val assessment = ai.withDefaultLlm().createObject("""
                Based on the following human feedback, determine if the story is acceptable.
                Return true if the story is acceptable, false otherwise.

                # Story
                ${story.text}

                # Human feedback
                ${feedback.comments}
                """.trimIndent(),
                AssessmentOfHumanFeedback::class.java)
            return if (assessment.acceptable) {
                Done(userInput, story, properties) (9)
            } else {
                ReviseStory(userInput, story, feedback, properties) (10)
            }
        }
    }

    @State
    data class ReviseStory(
        val userInput: UserInput,
        val story: WriteAndReviewAgent.Story,
        val humanFeedback: WriteAndReviewAgent.HumanFeedback,
        val properties: WriteAndReviewAgent.Properties
    ) : WriteAndReviewAgent.Stage {

        @Action(clearBlackboard = true)  (11)
        fun reviseStory(ai: Ai): AssessStory {
            val draft = ai
                .withLlm(LlmOptions.withAutoLlm().withTemperature(.7))
                .withPromptContributor(Personas.WRITER)
                .createObject("""
                    Revise a short story in ${properties.storyWordCount} words or less.
                    Use the user's input as inspiration if possible.

                    # User input
                    ${userInput.content}

                    # Previous story
                    ${story.text}

                    # Revision instructions
                    ${humanFeedback.comments}
                    """.trimIndent(), WriteAndReviewAgent.Story::class.java)
            return AssessStory(userInput, draft, properties) (12)
        }
    }

    @State
    data class Done(
        val userInput: UserInput,
        val story: WriteAndReviewAgent.Story,
        val properties: WriteAndReviewAgent.Properties
    ) : WriteAndReviewAgent.Stage {

        @AchievesGoal( (13)
            description = "The story has been crafted and reviewed by a book reviewer",
            export = Export(remote = true, name = "writeAndReviewStory"))
        @Action
        fun reviewStory(ai: Ai): WriteAndReviewAgent.ReviewedStory {
            val review = ai
                .withAutoLlm()
                .withPromptContributor(Personas.REVIEWER)
                .generateText("""
                    You will be given a short story to review.
                    Review it in ${properties.reviewWordCount} words or less.
                    Consider whether the story is engaging, imaginative, and well-written.

                    # Story
                    ${story.text}

                    # User input that inspired the story
                    ${userInput.content}
                    """.trimIndent())
            return WriteAndReviewAgent.ReviewedStory(story, review, Personas.REVIEWER)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | **Personas**: Reusable prompt contributors that give the LLM context about its role |
| **2** | **Parent state interface**: Allows actions to return any implementing state dynamically |
| **3** | **Properties record**: Configuration bundled together for easy passing through states |
| **4** | **Entry action**: Uses LLM to generate initial story draft |
| **5** | **State transition**: Returns `AssessStory` with all necessary data |
| **6** | **HITL data type**: Simple record/data class to capture human feedback |
| **7** | **WaitFor integration**: Pauses execution and waits for user to submit feedback form |
| **8** | **Looping action**: `clearBlackboard = true` enables returning to a previously-visited state type |
| **9** | **Terminal branch**: If acceptable, transitions to `Done` state |
| **10** | **Loop branch**: If not acceptable, transitions to `ReviseStory` with the feedback |
| **11** | **Looping action**: `clearBlackboard = true` enables looping back to `AssessStory` |
| **12** | **Loop back**: Returns new `AssessStory` for another round of feedback |
| **13** | **Goal achievement**: Final action that produces the reviewed story and exports it |

#### 4.19.8. Execution Flow

The execution flow for this agent:

1. **`craftStory`** executes with LLM, returns `AssessStory` → enters `AssessStory` state
2. **`getFeedback`** calls `WaitFor.formSubmission()` → agent pauses, waits for user input
3. User submits feedback → `HumanFeedback` added to blackboard
4. **`assess`** executes with LLM to interpret feedback:

   * If acceptable: returns `Done` → blackboard cleared, enters `Done` state
   * If not acceptable: returns `ReviseStory` → blackboard cleared, enters `ReviseStory` state
5. If in `ReviseStory`: **`reviseStory`** executes with LLM, returns `AssessStory` → blackboard cleared, loop back to step 2
6. When in `Done`: **`reviewStory`** executes with LLM, returns `ReviewedStory` → goal achieved

The planner handles all transitions automatically, including loops.
The looping actions (`assess` and `reviseStory`) use `clearBlackboard = true` to enable returning to previously-visited state types.

#### 4.19.9. Human-in-the-Loop with WaitFor

The `WaitFor.formSubmission()` method is key for human-in-the-loop workflows:

Java
:   ```
    @Action
    HumanFeedback getFeedback() {
        return WaitFor.formSubmission("""
                Please provide feedback on the story
                %s
                """.formatted(story.text),
                HumanFeedback.class);
    }
    ```

Kotlin
:   ```
    @Action
    fun getFeedback(): HumanFeedback {
        return WaitFor.formSubmission("""
            Please provide feedback on the story
            ${story.text}
            """.trimIndent(),
            HumanFeedback::class.java)
    }
    ```

When this action executes:

1. The agent process enters a `WAITING` state
2. A form is generated based on the `HumanFeedback` record structure
3. The user sees the prompt and fills out the form
4. Upon submission, the `HumanFeedback` instance is created and added to the blackboard
5. The agent resumes execution with the feedback available

This integrates naturally with the state pattern: the feedback stays within the current state until the next state transition.

#### 4.19.10. Passing Data Through States

When using `clearBlackboard = true` for looping states, all necessary context must be passed through state records since the blackboard is cleared:

Java
:   ```
    @State
    record AssessStory(
        UserInput userInput,    // Original user request
        Story story,            // Current story draft
        Properties properties   // Configuration
    ) implements Stage { ... }

    @State
    record ReviseStory(
        UserInput userInput,
        Story story,
        HumanFeedback humanFeedback,  // Additional context for revision
        Properties properties
    ) implements Stage { ... }
    ```

Kotlin
:   ```
    @State
    data class AssessStory(
        val userInput: UserInput,    // Original user request
        val story: Story,            // Current story draft
        val properties: Properties   // Configuration
    ) : Stage { ... }

    @State
    data class ReviseStory(
        val userInput: UserInput,
        val story: Story,
        val humanFeedback: HumanFeedback,  // Additional context for revision
        val properties: Properties
    ) : Stage { ... }
    ```

|  |  |
| --- | --- |
|  | Use a `Properties` record/data class to bundle configuration values that need to pass through multiple states, rather than repeating individual fields. |

|  |  |
| --- | --- |
|  | For non-looping state transitions (where `clearBlackboard` is not used), the blackboard is preserved, and data can be accessed from the blackboard directly. This is useful when states need access to shared context like user identity or conversation history. |

#### 4.19.11. State Class Requirements

|  |  |
| --- | --- |
|  | State classes **must be** either **static nested classes** (Java) or **top-level classes** (Kotlin). Non-static inner classes are **not allowed** because they hold a reference to their enclosing instance, causing serialization and persistence issues. The framework will throw an `IllegalStateException` if it detects a non-static inner class annotated with `@State`. |

Java
:   ```
    // GOOD: Static nested class (Java record is implicitly static)
    @State
    record AssessStory(UserInput userInput, Story story) implements Stage { ... }

    // GOOD: Top-level class
    @State
    record ProcessingState(String data) { ... }

    // BAD: Non-static inner class - will throw IllegalStateException
    @State
    class AssessStory implements Stage { ... } // Inner class in non-static context
    ```

Kotlin
:   ```
    // GOOD: Top-level data class
    @State
    data class AssessStory(val userInput: UserInput, val story: Story) : Stage { ... }

    // GOOD: Top-level data class
    @State
    data class ProcessingState(val data: String) { ... }

    // BAD: Inner class inside another class - will throw IllegalStateException
    class MyAgent {
        @State
        inner class AssessStory : Stage { ... } // Inner class holds reference to outer
    }
    ```

In Java, records declared inside a class are implicitly static, making them ideal for state classes.
In Kotlin, data classes declared inside a class are inner by default; use **top-level declarations** instead.

|  |  |
| --- | --- |
|  | Top-level state classes are the recommended pattern for Kotlin. They can access the enclosing component via the `@Provided` annotation. See [The @Provided Annotation](reference.annotations) for full documentation. |

#### 4.19.12. Key Points

* Annotate state classes with `@State` (or inherit from a `@State`-annotated type)
* `@State` is inherited through class hierarchies - annotate only the base type
* Use **static nested classes** (Java records) or **top-level classes** to avoid persistence issues
* Use a parent interface for polymorphic state returns
* State actions are automatically discovered and registered
* **State scoping**: When entering a new state, previous states are hidden - only current state’s actions are available
* **Context is preserved**: Non-state objects (user data, conversation, etc.) remain available across transitions
* **Blackboard preserved**: State transitions hide previous states but preserve all other blackboard contents
* **Staying in state**: Return `this` with `canRerun = true` to stay in the current state without transitioning
* For **looping states**, use `@Action(clearBlackboard = true)` to enable returning to previously-visited state types
* When using `clearBlackboard = true`, pass all necessary data through state record fields
* Goals are defined with `@AchievesGoal` on terminal state actions
* Use `WaitFor` for human-in-the-loop interactions within states
* Within a state, normal GOAP planning applies to sequence actions

### 4.20. Choosing a Planner

Embabel supports multiple planning strategies.
Most are deterministic, but their behaviour differs—​although it is always predictable.

All planning strategies are entirely typesafe in Java or Kotlin.

The planning strategies currently supported out of the box are:

| Planner | Best For | Description |
| --- | --- | --- |
| **GOAP** (default) | Business processes with defined outputs | Goal-oriented, deterministic planning. Plans a path from current state to goal using preconditions and effects. |
| **Utility** | Exploration and event-driven systems | Selects the highest-value available action at each step. Ideal when you don’t know the outcome upfront. |
| **Hybrid** | Reducer pipelines (gather many context-producing actions, run one synthesizer, stop) | Like Utility for action picking, but exits as soon as any registered goal is already satisfied. Pair an unsatisfiable goal (e.g. `NIRVANA`) with a real terminal goal: opportunistic research fires while research is profitable; the process completes the moment the real goal is reached. |
| **Supervisor** | Flexible multi-step workflows | LLM-orchestrated composition. An LLM selects which actions to call based on type schemas and gathered artifacts. |

As most of the documentation covers GOAP, this section discusses the alternative planners and nested workflows.

#### 4.20.1. Utility AI

[Utility AI](https://en.wikipedia.org/wiki/Utility_system) selects the action with the highest *net value* from all available actions at each step.
Unlike GOAP, which plans a path to a goal, Utility AI makes greedy decisions based on immediate value.

Utility AI excels in **exploratory scenarios** where you don’t know exactly what you want to achieve.
Consider a GitHub issue triage system: when a new issue arrives, you don’t have a predetermined goal.
Instead, you want to react appropriately based on the issue’s characteristics—​maybe label it, maybe respond, maybe escalate.
The "right" action depends on what you discover as you process it.

This makes Utility AI ideal for scenarios where:

* There is no clear end goal—​you’re exploring possibilities
* Multiple actions could be valuable depending on context
* You want to respond to changing conditions as they emerge
* The best outcome isn’t known upfront

##### When to Use Utility AI

* **Event-driven systems**: React to incoming events (issues, stars, webhooks) with the most appropriate action
* **Chatbots**: Where the platform provides multiple response options and selects the best one
* **Exploration**: When you want to discover what’s possible rather than achieve a specific goal

##### Using Utility AI with `@EmbabelComponent`

For Utility AI, actions are typically provided via `@EmbabelComponent` rather than `@Agent`.
This allows the *platform* to select actions across multiple components based on utility, rather than constraining actions to a single agent.

Here’s an example from the Shepherd project that reacts to GitHub events:

Java
:   ```
    @EmbabelComponent  (1)
    public class IssueActions {

        private final ShepherdProperties properties;
        private final CommunityDataManager communityDataManager;
        private final GitHubUpdater gitHubUpdater;

        public IssueActions(ShepherdProperties properties,
                            CommunityDataManager communityDataManager,
                            GitHubUpdater gitHubUpdater) {
            this.properties = properties;
            this.communityDataManager = communityDataManager;
            this.gitHubUpdater = gitHubUpdater;
        }

        @Action(outputBinding = "ghIssue")  (2)
        public GHIssue saveNewIssue(GHIssue ghIssue, OperationContext context) {
            var existing = communityDataManager.findIssueByGithubId(ghIssue.getId());
            if (existing == null) {
                var issueEntityStatus = communityDataManager.saveAndExpandIssue(ghIssue);
                context.add(issueEntityStatus);  (3)
                return ghIssue;
            }
            return null;  (4)
        }

        @Action(
            pre = {"spel:newEntity.newEntities.?[#this instanceof T(com.embabel.shepherd.domain.Issue)].size() > 0"}  (5)
        )
        public IssueAssessment reactToNewIssue(GHIssue ghIssue, NewEntity<?> newEntity, Ai ai) {
            return ai
                .withLlm(properties.getTriageLlm())
                .creating(IssueAssessment.class)
                .fromTemplate("first_issue_response", Map.of("issue", ghIssue));  (6)
        }

        @Action(pre = {"spel:issueAssessment.urgency > 0.0"})  (7)
        public void heavyHitterIssue(GHIssue issue, IssueAssessment issueAssessment) {
            // Take action on high-urgency issues
        }
    }
    ```

Kotlin
:   ```
    @EmbabelComponent  (1)
    class IssueActions(
        val properties: ShepherdProperties,
        private val communityDataManager: CommunityDataManager,
        private val gitHubUpdater: GitHubUpdater,
    ) {

        @Action(outputBinding = "ghIssue")  (2)
        fun saveNewIssue(ghIssue: GHIssue, context: OperationContext): GHIssue? {
            val existing = communityDataManager.findIssueByGithubId(ghIssue.id)
            if (existing == null) {
                val issueEntityStatus = communityDataManager.saveAndExpandIssue(ghIssue)
                context += issueEntityStatus  (3)
                return ghIssue
            }
            return null  (4)
        }

        @Action(
            pre = ["spel:newEntity.newEntities.?[#this instanceof T(com.embabel.shepherd.domain.Issue)].size() > 0"]  (5)
        )
        fun reactToNewIssue(
            ghIssue: GHIssue,
            newEntity: NewEntity<*>,
            ai: Ai
        ): IssueAssessment {
            return ai
                .withLlm(properties.triageLlm)
                .creating(IssueAssessment::class.java)
                .fromTemplate("first_issue_response", mapOf("issue" to ghIssue))  (6)
        }

        @Action(pre = ["spel:issueAssessment.urgency > 0.0"])  (7)
        fun heavyHitterIssue(issue: GHIssue, issueAssessment: IssueAssessment) {
            // Take action on high-urgency issues
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | `@EmbabelComponent` contributes actions to the platform, not a specific agent |
| **2** | `outputBinding` names the result for later actions to reference |
| **3** | Add entity status to context, making it available to subsequent actions |
| **4** | Returning `null` prevents further actions from firing for this issue |
| **5** | SpEL precondition: only fire if new issues were created |
| **6** | Use AI to assess the issue via a template |
| **7** | This action only fires if the assessment shows urgency > 0 |

The platform selects which action to run based on:

1. Which preconditions are satisfied (type availability + SpEL conditions)
2. The `cost` and `value` parameters on `@Action` (net value = value - cost)

##### Action Cost and Value

The `@Action` annotation supports `cost` and `value` parameters (both 0.0 to 1.0):

Java
:   ```
    @Action(
        cost = 0.1,   (1)
        value = 0.8   (2)
    )
    public Output highValueAction(Input input) {
        // Action implementation
    }
    ```

Kotlin
:   ```
    @Action(
        cost = 0.1,   (1)
        value = 0.8   (2)
    )
    fun highValueAction(input: Input): Output {
        // Action implementation
    }
    ```

|  |  |
| --- | --- |
| **1** | Cost to execute (0.0 to 1.0) - lower is cheaper |
| **2** | Value when executed (0.0 to 1.0) - higher is more valuable |

The Utility planner calculates *net value* as `value - cost` and selects the action with the highest net value from all available actions.

##### The Nirvana Goal

Utility AI supports a special "Nirvana" goal that is never satisfied.
This keeps the process running, continuously selecting the highest-value available action until no actions are available.

##### Extensibility

Utility AI fosters extensibility.
For example, multiple groups within an organization can contribute their own `@EmbabelComponent` classes with actions that bring their own expertise to enhance behaviours around shared types, while retaining the ability to own and control their own extended model.

##### Utility and States

Utility AI can combine with the `@State` annotation to implement classification and routing patterns.
This is particularly useful when you need to:

* **Classify input** into different categories at runtime
* **Route processing** through category-specific handlers
* **Achieve different goals** based on classification

The key pattern is:

1. An entry action classifies input and returns a `@State` type
2. Each `@State` class contains an `@AchievesGoal` action that produces the final output
3. The `@AchievesGoal` output is *not* a `@State` type (to prevent infinite loops)

Here’s an example of a ticket triage system that routes support tickets based on severity:

Java
:   ```
    @Agent(
        description = "Triage and process support tickets",
        planner = PlannerType.UTILITY  (1)
    )
    public class TicketTriageAgent {

        public record Ticket(String id, String description, String customerId) {}
        public record ResolvedTicket(String id, String resolution, String handledBy) {}

        @State
        public sealed interface TicketCategory permits CriticalTicket, BugTicket, GeneralTicket {}  (2)

        @Action
        public TicketCategory triageTicket(Ticket ticket) {  (3)
            if (ticket.description().toLowerCase().contains("down")) {
                return new CriticalTicket(ticket);
            } else if (ticket.description().toLowerCase().contains("bug")) {
                return new BugTicket(ticket);
            } else {
                return new GeneralTicket(ticket);
            }
        }

        @State
        public record CriticalTicket(Ticket ticket) implements TicketCategory {
            @AchievesGoal(description = "Handle critical ticket with immediate escalation")  (4)
            @Action
            public ResolvedTicket handleCritical() {
                return new ResolvedTicket(
                    ticket.id(),
                    "Escalated to on-call engineer",
                    "CRITICAL_RESPONSE_TEAM"
                );
            }
        }

        @State
        public record BugTicket(Ticket ticket) implements TicketCategory {
            @AchievesGoal(description = "Handle bug report")
            @Action
            public ResolvedTicket handleBug() {
                return new ResolvedTicket(
                    ticket.id(),
                    "Bug logged in issue tracker",
                    "ENGINEERING_TEAM"
                );
            }
        }

        @State
        public record GeneralTicket(Ticket ticket) implements TicketCategory {
            @AchievesGoal(description = "Handle general inquiry")
            @Action
            public ResolvedTicket handleGeneral() {
                return new ResolvedTicket(
                    ticket.id(),
                    "Response sent with FAQ links",
                    "SUPPORT_TEAM"
                );
            }
        }
    }
    ```

Kotlin
:   ```
    @Agent(
        description = "Triage and process support tickets",
        planner = PlannerType.UTILITY  (1)
    )
    class TicketTriageAgent {

        data class Ticket(val id: String, val description: String, val customerId: String)
        data class ResolvedTicket(val id: String, val resolution: String, val handledBy: String)

        @State
        sealed interface TicketCategory  (2)

        @Action
        fun triageTicket(ticket: Ticket): TicketCategory {  (3)
            return when {
                ticket.description.contains("down", ignoreCase = true) ->
                    CriticalTicket(ticket)
                ticket.description.contains("bug", ignoreCase = true) ->
                    BugTicket(ticket)
                else ->
                    GeneralTicket(ticket)
            }
        }

        @State
        data class CriticalTicket(val ticket: Ticket) : TicketCategory {
            @AchievesGoal(description = "Handle critical ticket with immediate escalation")  (4)
            @Action
            fun handleCritical(): ResolvedTicket {
                return ResolvedTicket(
                    id = ticket.id,
                    resolution = "Escalated to on-call engineer",
                    handledBy = "CRITICAL_RESPONSE_TEAM"
                )
            }
        }

        @State
        data class BugTicket(val ticket: Ticket) : TicketCategory {
            @AchievesGoal(description = "Handle bug report")
            @Action
            fun handleBug(): ResolvedTicket {
                return ResolvedTicket(
                    id = ticket.id,
                    resolution = "Bug logged in issue tracker",
                    handledBy = "ENGINEERING_TEAM"
                )
            }
        }

        @State
        data class GeneralTicket(val ticket: Ticket) : TicketCategory {
            @AchievesGoal(description = "Handle general inquiry")
            @Action
            fun handleGeneral(): ResolvedTicket {
                return ResolvedTicket(
                    id = ticket.id,
                    resolution = "Response sent with FAQ links",
                    handledBy = "SUPPORT_TEAM"
                )
            }
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Use `PlannerType.UTILITY` for opportunistic action selection |
| **2** | Sealed interface as the state supertype |
| **3** | Entry action classifies and returns a `@State` instance |
| **4** | Each state has an `@AchievesGoal` action producing the final output |

When a `Ticket` is processed:

1. The `triageTicket` action classifies it into one of the state types
2. Entering a state clears other objects from the blackboard
3. The Utility planner selects the `@AchievesGoal` action for that state
4. The goal is achieved when `ResolvedTicket` is produced

This pattern works well when:

* Classification determines the processing path
* Each category has distinct handling requirements
* The final output type is the same across all categories

##### UtilityInvocation: Lightweight Utility Pattern

For simple utility workflows, you don’t need to create an `@Agent` class.
`UtilityInvocation` provides a fluent API to run utility-based workflows directly from `@EmbabelComponent` actions.

Example 1. Invoking with UtilityInvocation

Java
:   ```
    UtilityInvocation.on(agentPlatform)
        .withScope(AgentScopeBuilder.fromInstances(issueActions, labelActions))
        .run(new GHIssue(issueData));
    ```

Kotlin
:   ```
    UtilityInvocation.on(agentPlatform)
        .withScope(AgentScopeBuilder.fromInstances(issueActions, labelActions))
        .run(GHIssue(issueData))
    ```

###### Configuration Options

`UtilityInvocation` supports several configuration methods:

| Method | Description |
| --- | --- |
| `.withScope(AgentScopeBuilder)` | Defines which actions are available |
| `.withAgentName(String)` | Sets a custom name for the created agent (defaults to platform name) |
| `.withProcessOptions(ProcessOptions)` | Configures process-level options |
| `.terminateWhenStuck()` | Adds early termination policy when no actions are available |

Example 2. Setting a custom agent name

Java
:   ```
    UtilityInvocation.on(agentPlatform)
        .withScope(AgentScopeBuilder.fromInstance(myActions))
        .withAgentName("issue-triage-agent")
        .run(input);
    ```

Kotlin
:   ```
    UtilityInvocation.on(agentPlatform)
        .withScope(AgentScopeBuilder.fromInstance(myActions))
        .withAgentName("issue-triage-agent")
        .run(input)
    ```

#### 4.20.2. Hybrid

The Hybrid planner combines Utility AI’s value-based action picking with goal-satisfaction termination â the "iterate then stop" mode. It exists for reducer-style pipelines where:

* You want to fire many opportunistic, context-producing actions (research lookups, KG queries, enrichment passes) in netValue order â like Utility AI.
* You then want a single synthesising action to run, producing a terminal result.
* You want the process to **stop** the moment that terminal result is on the blackboard, rather than continuing to fire low-value or negative-value leftover actions.

##### Why a Separate Planner

GOAP minimises path cost to the goal; it skips opportunistic actions that aren’t on the cheapest plan, so research never fires. Pure Utility AI is greedy single-step; when paired with a satisfiable terminal goal it gives up at step 1 if no single action reaches the goal. Pure Utility AI paired with `NIRVANA` iterates beautifully but never terminates â it keeps picking actions even after your real goal is satisfied, burning compute on the way to nowhere.

Hybrid is the missing middle. It picks the highest-netValue achievable action each tick (so research happens) **and** checks "is the goal already satisfied?" **before** selecting an action (so termination is clean once a real goal is reached).

##### The Two-Goal Pattern

The hybrid planner is designed to be used with **two** goals on the same agent:

1. The **real terminal goal** â what success looks like (e.g. `attention-candidate-produced`, `report-generated`).
2. `com.embabel.agent.core.support.NIRVANA` â the framework’s pre-built unsatisfiable goal, which keeps Utility-style action picking alive while research is still profitable.

At each tick the planner generates one plan per goal. NIRVANA returns the highest-netValue achievable action as a 1-step plan. The real goal returns:

* An **empty plan** (`netValue = 0`) if the goal is already satisfied â beats NIRVANA’s then-only-negative-value leftovers.
* A 1-step plan if a single action reaches the goal.
* `null` otherwise.

The host process picks the highest-net-value plan across goals. While research is profitable, NIRVANA’s plan wins. The moment the real goal is satisfied, its empty plan wins and `plan.isComplete()` fires, terminating the process.

##### When to Use Hybrid

* **Per-signal triage pipelines** that gather multiple context sources before a final assessment LLM call.
* **Research-then-synthesise** workflows where multiple actions contribute typed artifacts to a blackboard, and one final action consumes everything.
* **Pack-extensible reducers** where new opportunistic actions can be added without rewriting the synthesis step â their value alone gets them scheduled.

Use Utility AI without Hybrid when you genuinely want a long-running event loop with no terminal goal (chat surfaces, exploratory triage).

Use GOAP when you have strict typed-dependency ordering and don’t need opportunistic research.

##### Tuning Values

For the hybrid pattern to work as intended:

* **Research actions** (the opportunistic context producers) should have **high net value** so they win the picker race while their `canRerun=false` slot is still open.
* **The synthesiser** (the final action that produces the terminal output) should have **positive but lower net value**. It wins after research is locked out.
* **Wrap-up actions** (those that lift a verdict into the goal output) should have **value just above the synthesiser** so they fire immediately after.

Once the wrap-up writes the terminal artifact, the real goal’s empty plan wins and the process exits â regardless of any remaining negative-value actions.

##### Using Hybrid

Kotlin
:   ```
    import com.embabel.agent.core.Agent
    import com.embabel.agent.core.Goal
    import com.embabel.agent.core.IoBinding
    import com.embabel.agent.core.support.NIRVANA

    // Agent declares BOTH NIRVANA and the real goal.
    val agent = Agent(
        name = "per-signal-triage",
        provider = "example",
        version = "0.0.1",
        description = "Reducer pipeline: research â assess â wrap.",
        actions = listOf(/* â¦ */),
        goals = setOf(
            NIRVANA, (1)
            Goal( (2)
                name = "attention-candidate-produced",
                description = "An AttentionCandidate has been produced.",
                inputs = setOf(IoBinding("attentionCandidate", AttentionCandidate::class.java.name)),
                outputType = null,
            ),
        ),
    )

    // Process picks PlannerType.HYBRID.
    val process = agentPlatform.runAgentFrom(
        agent = agent,
        processOptions = ProcessOptions(plannerType = PlannerType.HYBRID), (3)
        bindings = signalBindings,
    )
    ```

|  |  |
| --- | --- |
| **1** | `NIRVANA` keeps the iterate-by-netValue picking alive across multiple ticks; without it, the planner gives up at step 1 if no single action reaches the real goal. |
| **2** | The real terminal goal â what makes the process stop. Returns an empty plan once satisfied. |
| **3** | Per-process opt-in via `ProcessOptions`. The default (`GOAP`) is unchanged for other processes. |

##### Difference from `UTILITY`

| Scenario | `UTILITY` | `HYBRID` |
| --- | --- | --- |
| Real goal satisfied, no actions achievable | Empty plan (terminate) | Empty plan (terminate) |
| Real goal satisfied, other actions still achievable | Picks highest-netValue action and runs it | Empty plan (terminate) â **the load-bearing fix** |
| Real goal not satisfied, action reaches it in 1 step | 1-step plan | 1-step plan |
| Real goal not satisfied, no 1-step path | `null` (planner gives up) | `null` (planner gives up â paired NIRVANA handles iteration) |
| `NIRVANA` goal | Highest-netValue achievable action; `null` when nothing’s available | Identical to `UTILITY` semantics |

`HYBRID` is `UTILITY` with one extra check: **if the real goal is already satisfied, return an empty plan regardless of what actions remain achievable.** This is what enables clean termination of the two-goal pattern.

#### 4.20.3. Supervisor

The Supervisor planner uses an LLM to orchestrate actions dynamically.
This is a popular pattern in frameworks like [LangGraph](https://langchain-ai.github.io/langgraph/concepts/agentic_concepts/#supervisor) and [Google ADK](https://google.github.io/adk-docs/agents/multi-agents/#supervisor-agent-sample), where a supervisor LLM decides which tools to call and in what order.

|  |  |
| --- | --- |
|  | Unlike GOAP and Utility, the Supervisor planner is **non-deterministic**. The LLM may choose different action sequences for the same inputs. This makes it less suitable for business-critical workflows requiring reproducibility. |

##### Type-Informed vs Type-Driven

A key design decision in supervisor architectures is how types relate to composition:

| Approach | Description |
| --- | --- |
| **Type-Driven** (GOAP) | Types *constrain* composition. An action requiring `MarketData` can only run after an action produces `MarketData`. This is deterministic but rigid. |
| **Type-Informed** (Supervisor) | Types *inform* composition. The LLM sees type schemas and decides what to call based on semantic understanding. This is flexible but non-deterministic. |

Embabel’s Supervisor planner takes the **type-informed** approach while maximizing the benefits of types:

* Actions return **typed outputs** that are validated
* The LLM sees **type schemas** to understand what each action produces
* Results are stored on the **typed blackboard** for later actions
* The same actions work with **any planner** (GOAP, Utility, or Supervisor)

This is a "typed supervisor" pattern—​a middle ground between fully type-driven (GOAP) and untyped string-passing (typical LangGraph).

##### When to Use Supervisor

Supervisor is appropriate when:

* Action ordering is **context-dependent** and hard to predefine
* You want an LLM to **synthesize information** across multiple sources
* The workflow benefits from **flexible composition** rather than strict sequencing
* Non-determinism is acceptable for your use case

Supervisor is **not** recommended when:

* You need **reproducible**, auditable execution paths
* Actions have strict **dependency ordering** that must be enforced
* Latency and cost matter (each decision requires an LLM call)

##### Using Supervisor

To use Supervisor, annotate your agent with `planner = PlannerType.SUPERVISOR` and mark one action with `@AchievesGoal`:

Java
:   ```
    @Agent(
        planner = PlannerType.SUPERVISOR,
        description = "Market research report generator"
    )
    public class MarketResearchAgent {

        public record MarketDataRequest(String topic) {}
        public record MarketData(Map<String, String> revenues, Map<String, Double> marketShare) {}

        public record CompetitorAnalysisRequest(List<String> companies) {}
        public record CompetitorAnalysis(Map<String, List<String>> strengths) {}

        public record ReportRequest(String topic, List<String> companies) {}
        public record FinalReport(String title, List<String> sections) {}

        @Action(description = "Gather market data including revenues and market share")  (1)
        public MarketData gatherMarketData(MarketDataRequest request, Ai ai) {
            return ai.withDefaultLlm().createObject(
                "Generate market data for: " + request.topic(),
                MarketData.class
            );
        }

        @Action(description = "Analyze competitors: strengths and positioning")
        public CompetitorAnalysis analyzeCompetitors(CompetitorAnalysisRequest request, Ai ai) {
            return ai.withDefaultLlm().createObject(
                "Analyze competitors: " + String.join(", ", request.companies()),
                CompetitorAnalysis.class
            );
        }

        @AchievesGoal(description = "Compile all information into a final report")  (2)
        @Action(description = "Compile the final report")
        public FinalReport compileReport(ReportRequest request, Ai ai) {
            return ai.withDefaultLlm().createObject(
                "Create a market research report for " + request.topic(),
                FinalReport.class
            );
        }
    }
    ```

Kotlin
:   ```
    @Agent(
        planner = PlannerType.SUPERVISOR,
        description = "Market research report generator"
    )
    class MarketResearchAgent {

        data class MarketDataRequest(val topic: String)
        data class MarketData(val revenues: Map<String, String>, val marketShare: Map<String, Double>)

        data class CompetitorAnalysisRequest(val companies: List<String>)
        data class CompetitorAnalysis(val strengths: Map<String, List<String>>)

        data class ReportRequest(val topic: String, val companies: List<String>)
        data class FinalReport(val title: String, val sections: List<String>)

        @Action(description = "Gather market data including revenues and market share")  (1)
        fun gatherMarketData(request: MarketDataRequest, ai: Ai): MarketData {
            return ai.withDefaultLlm().createObject(
                "Generate market data for: ${request.topic}"
            )
        }

        @Action(description = "Analyze competitors: strengths and positioning")
        fun analyzeCompetitors(request: CompetitorAnalysisRequest, ai: Ai): CompetitorAnalysis {
            return ai.withDefaultLlm().createObject(
                "Analyze competitors: ${request.companies.joinToString()}"
            )
        }

        @AchievesGoal(description = "Compile all information into a final report")  (2)
        @Action(description = "Compile the final report")
        fun compileReport(request: ReportRequest, ai: Ai): FinalReport {
            return ai.withDefaultLlm().createObject(
                "Create a market research report for ${request.topic}"
            )
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Tool actions have descriptions visible to the supervisor LLM |
| **2** | The goal action is called when the supervisor has gathered enough information |

The supervisor LLM sees type schemas for available actions:

```
Available actions:
- gatherMarketData(request: MarketDataRequest) -> MarketData
    Schema: { revenues: Map, marketShare: Map }
- analyzeCompetitors(request: CompetitorAnalysisRequest) -> CompetitorAnalysis
    Schema: { strengths: Map }

Current artifacts on blackboard:
- MarketData: { revenues: {"CompanyA": "$10B"}, marketShare: {...} }

Goal: FinalReport
```

The LLM decides action ordering based on this information, making informed decisions without being constrained by declared dependencies.

##### Interoperability

Using wrapper request types (like `MarketDataRequest`) enables actions to work with **any planner**:

* **GOAP**: Request types flow through the blackboard based on preconditions/effects
* **Utility**: Actions fire when their request types are available with highest net value
* **Supervisor**: The LLM constructs request objects to call actions

This means you can switch planners without changing your action code—​useful for testing with deterministic planners (GOAP) and deploying with flexible planners (Supervisor).

##### Comparison with LangGraph

[LangGraph’s supervisor pattern](https://github.com/langchain-ai/langgraph-supervisor-py) is a popular approach for multi-agent orchestration.
Here’s how a similar workflow looks in LangGraph vs Embabel:

LangGraph (Python)

```
from langgraph_supervisor import create_supervisor
from langgraph.prebuilt import create_react_agent

# Tools return strings - no type information
def gather_market_data(topic: str) -> str:
    """Gather market data for a topic."""
    return f"Revenue data for {topic}..."  (1)

def analyze_competitors(companies: str) -> str:
    """Analyze competitors."""
    return f"Analysis of {companies}..."  (1)

# Create agents with tools
research_agent = create_react_agent(
    model="openai:gpt-4o",
    tools=[gather_market_data, analyze_competitors],
    name="research_expert",
)

# Supervisor sees all tools, always  (2)
workflow = create_supervisor([research_agent], model=model)
app = workflow.compile()

# State is a dict of messages  (3)
result = app.invoke({"messages": [{"role": "user", "content": "Research cloud market"}]})
```

|  |  |
| --- | --- |
| **1** | Tools return strings—​the LLM must parse and interpret results |
| **2** | All tools always visible—​no filtering based on context |
| **3** | State is untyped message history |

Example 3. Embabel

Java
:   ```
    @Agent(planner = PlannerType.SUPERVISOR)
    public class MarketResearchAgent {

        // Tools return typed objects with schemas  (1)
        @Action(description = "Gather market data for a topic")
        public MarketData gatherMarketData(MarketDataRequest request, Ai ai) {
            return ai.withDefaultLlm().createObject(
                "Generate market data for " + request.topic(), MarketData.class);
        }

        @Action(description = "Analyze competitors")
        public CompetitorAnalysis analyzeCompetitors(CompetitorAnalysisRequest request, Ai ai) {
            return ai.withDefaultLlm().createObject(
                "Analyze " + request.companies(), CompetitorAnalysis.class);
        }

        @AchievesGoal
        @Action
        public FinalReport compileReport(ReportRequest request, Ai ai) { ... }
    }

    // State is a typed blackboard  (2)
    // Tools are filtered based on available inputs  (3)
    ```

Kotlin
:   ```
    @Agent(planner = PlannerType.SUPERVISOR)
    class MarketResearchAgent {

        // Tools return typed objects with schemas  (1)
        @Action(description = "Gather market data for a topic")
        fun gatherMarketData(request: MarketDataRequest, ai: Ai): MarketData {
            return ai.withDefaultLlm().createObject("Generate market data for ${request.topic}")
        }

        @Action(description = "Analyze competitors")
        fun analyzeCompetitors(request: CompetitorAnalysisRequest, ai: Ai): CompetitorAnalysis {
            return ai.withDefaultLlm().createObject("Analyze ${request.companies}")
        }

        @AchievesGoal
        @Action
        fun compileReport(request: ReportRequest, ai: Ai): FinalReport { ... }
    }

    // State is a typed blackboard  (2)
    // Tools are filtered based on available inputs  (3)
    ```

|  |  |
| --- | --- |
| **1** | Tools return typed, validated objects--`MarketData`, `CompetitorAnalysis` |
| **2** | Blackboard holds typed artifacts, not just message strings |
| **3** | Tools with satisfied inputs are prioritized via currying |

##### Key Advantages

Embabel’s Supervisor offers several advantages over typical supervisor implementations:

| Aspect | Typical Supervisor (LangGraph) | Embabel Supervisor |
| --- | --- | --- |
| **Output Types** | Strings—​LLM must parse | Typed objects—​validated and structured |
| **Tool Visibility** | All tools always available | Tools filtered by blackboard state (currying) |
| **Domain Awareness** | None—​tools are opaque functions | Type schemas visible to LLM |
| **Determinism** | Fully non-deterministic | Semi-deterministic: tool availability constrained by types |
| **State** | Untyped message history | Typed blackboard with named artifacts |

###### Blackboard-Driven Tool Filtering

A key differentiator is **curried tool filtering**.
When an action’s inputs are already on the blackboard, those parameters are "curried out"--the tool signature simplifies.

|  |  |
| --- | --- |
|  | What is Currying?  [Currying](https://en.wikipedia.org/wiki/Currying) is a functional programming technique where a function with multiple parameters is transformed into a sequence of functions, each taking a single parameter.  In Embabel’s context: if an action requires `(MarketDataRequest, Ai)` and `MarketDataRequest` is already on the blackboard, we "curry out" that parameter—​the tool exposed to the LLM only needs to provide any remaining parameters. This simplifies the LLM’s task and signals which tools are "ready" to run. |

```
# Initial state: empty blackboard
Available tools:
- gatherMarketData(request: MarketDataRequest) -> MarketData
- analyzeCompetitors(request: CompetitorAnalysisRequest) -> CompetitorAnalysis

# After MarketData is gathered:
Available tools:
- gatherMarketData(request: MarketDataRequest) -> MarketData  [READY - 0 params needed]
- analyzeCompetitors(request: CompetitorAnalysisRequest) -> CompetitorAnalysis
```

This reduces the LLM’s decision space and guides it toward logical next steps—​tools with satisfied inputs appear "ready" with fewer parameters.
This is more deterministic than showing all tools equally, while remaining more flexible than GOAP’s strict ordering.

###### Semi-Determinism

While still LLM-orchestrated, Embabel’s Supervisor is **more deterministic** than typical implementations:

1. **Type constraints**: Actions can only produce specific types—​no arbitrary string outputs
2. **Input filtering**: Tools unavailable until their input types exist
3. **Schema guidance**: LLM sees what each action produces, not just descriptions
4. **Validated outputs**: Results must conform to declared types

This makes debugging easier and behaviour more predictable, while retaining the flexibility that makes supervisor patterns valuable.

###### When Embabel’s Approach Excels

* **Domain-rich workflows**: When your domain has clear types (reports, analyses, forecasts), schemas help the LLM understand relationships
* **Multi-step synthesis**: When actions build on each other’s outputs, typed blackboard tracks progress clearly
* **Hybrid determinism**: When you want more predictability than pure LLM orchestration but more flexibility than GOAP

##### SupervisorInvocation: Lightweight Supervisor Pattern

For simple supervisor workflows, you don’t need to create an `@Agent` class.
`SupervisorInvocation` provides a fluent API to run supervisor-orchestrated workflows directly from `@EmbabelComponent` actions.

This is ideal when:

* You have a small set of related actions in an `@EmbabelComponent`
* You want LLM-orchestrated composition without creating a full agent
* You’re prototyping or exploring supervisor patterns before committing to a full agent design

###### Example: Meal Preparation Workflow

Here’s a complete example from the [embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) repository:

Example 4. Stages - Actions as @EmbabelComponent

Java
:   ```
    @EmbabelComponent
    public class Stages {

        public record Cook(String name, int age) {}

        public record Order(String dish, int quantity) {}

        public record Meal(String dish, int quantity, String orderedBy, String cookedBy) {}

        @Action
        public Cook chooseCook(UserInput userInput, Ai ai) {
            return ai.withAutoLlm().createObject(
                    """
                    From the following user input, choose a cook.
                    User input: %s
                    """.formatted(userInput),
                    Cook.class
            );
        }

        @Action
        public Order takeOrder(UserInput userInput, Ai ai) {
            return ai.withAutoLlm().createObject(
                    """
                    From the following user input, take a food order
                    User input: %s
                    """.formatted(userInput),
                    Order.class
            );
        }

        @Action
        @AchievesGoal(description = "Cook the meal according to the order")
        public Meal prepareMeal(Cook cook, Order order, UserInput userInput, Ai ai) {
            // The model will get the orderedBy from UserInput
            return ai.withAutoLlm().createObject(
                    """
                    Prepare a meal based on the cook and order details and target customer
                    Cook: %s, age %d
                    Order: %d x %s
                    User input: %s
                    """.formatted(cook.name(), cook.age(), order.quantity(), order.dish(), userInput.getContent()),
                    Meal.class
            );
        }
    }
    ```

Kotlin
:   ```
    @EmbabelComponent
    class Stages {

        data class Cook(val name: String, val age: Int)

        data class Order(val dish: String, val quantity: Int)

        data class Meal(val dish: String, val quantity: Int, val orderedBy: String, val cookedBy: String)

        @Action
        fun chooseCook(userInput: UserInput, ai: Ai): Cook {
            return ai.withAutoLlm().createObject(
                """
                From the following user input, choose a cook.
                User input: $userInput
                """.trimIndent()
            )
        }

        @Action
        fun takeOrder(userInput: UserInput, ai: Ai): Order {
            return ai.withAutoLlm().createObject(
                """
                From the following user input, take a food order
                User input: $userInput
                """.trimIndent()
            )
        }

        @Action
        @AchievesGoal(description = "Cook the meal according to the order")
        fun prepareMeal(cook: Cook, order: Order, userInput: UserInput, ai: Ai): Meal {
            // The model will get the orderedBy from UserInput
            return ai.withAutoLlm().createObject(
                """
                Prepare a meal based on the cook and order details and target customer
                Cook: ${cook.name}, age ${cook.age}
                Order: ${order.quantity} x ${order.dish}
                User input: ${userInput.content}
                """.trimIndent()
            )
        }
    }
    ```

Example 5. Invoking with SupervisorInvocation

Java
:   ```
    Stages stages = new Stages();

    Meal meal = SupervisorInvocation.on(agentPlatform)
        .returning(Stages.Meal.class)
        .withScope(AgentScopeBuilder.fromInstance(stages))
        .invoke(new UserInput(request));
    ```

Kotlin
:   ```
    val stages = Stages()

    val meal = SupervisorInvocation.on(agentPlatform)
        .returning(Stages.Meal::class.java)
        .withScope(AgentScopeBuilder.fromInstance(stages))
        .invoke(UserInput(request))
    ```

###### Configuration Options

`SupervisorInvocation` supports several configuration methods:

| Method | Description |
| --- | --- |
| `.returning(Class)` | Specifies the goal type to produce |
| `.withScope(AgentScopeBuilder)` | Defines which actions are available |
| `.withAgentName(String)` | Sets a custom name for the created agent (defaults to `{platformName}.supervisor`) |
| `.withGoalDescription(String)` | Provides a custom description for the goal |
| `.withProcessOptions(ProcessOptions)` | Configures process-level options |

Example 6. Setting a custom agent name

Java
:   ```
    SupervisorInvocation.on(agentPlatform)
        .returning(Report.class)
        .withScope(AgentScopeBuilder.fromInstance(actions))
        .withAgentName("market-research-supervisor")
        .invoke(request);
    ```

Kotlin
:   ```
    SupervisorInvocation.on(agentPlatform)
        .returning(Report::class.java)
        .withScope(AgentScopeBuilder.fromInstance(actions))
        .withAgentName("market-research-supervisor")
        .invoke(request)
    ```

The supervisor LLM sees:

1. **Available actions** with their type signatures and schemas
2. **Current artifacts** on the blackboard (including `UserInput` content)
3. **Goal** to produce a `Meal`

It then orchestrates the actionsâcalling `chooseCook` and `takeOrder` (possibly in parallel), then `prepareMeal` when the dependencies are satisfied.

###### Key Design Points

1. **Actions use UserInput explicitly**: Each action receives `UserInput` and includes it in the LLM prompt, ensuring the actual user request is used.
2. **@AchievesGoal marks the target**: The `prepareMeal` action is marked with `@AchievesGoal` to indicate it produces the final output.
3. **Type-driven dependencies**: `prepareMeal` requires `Cook` and `Order`, which guides the supervisor’s orchestration.

###### SupervisorInvocation vs @Agent with planner = SUPERVISOR

| Aspect | SupervisorInvocation | @Agent(planner = SUPERVISOR) |
| --- | --- | --- |
| **Declaration** | Fluent API, no class annotation | Annotated agent class |
| **Action source** | `@EmbabelComponent` or multiple components | Single `@Agent` class |
| **Best for** | Quick prototypes, simple workflows | Formalized, reusable agents |
| **Goal specification** | `.returning(Class)` fluent method | `@AchievesGoal` on action |
| **Scope** | Explicit via `AgentScopeBuilder` | Implicit from agent class |

###### Comparison with AgenticTool

Both `SupervisorInvocation` and [AgenticTool](#reference.tools__agentic-tools) provide LLM-orchestrated composition, but at different levels:

| Aspect | AgenticTool | SupervisorInvocation |
| --- | --- | --- |
| **Level** | Tool (can be used within actions) | Invocation (runs a complete workflow) |
| **Sub-components** | Other `Tool` instances | `@Action` methods from `@EmbabelComponent` |
| **Output** | `Tool.Result` (text, artifact, or error) | Typed goal object (e.g., `Meal`) |
| **State management** | Minimal (LLM conversation only) | Full blackboard with typed artifacts |
| **Type awareness** | Tools have names and descriptions | Actions have typed inputs/outputs with schemas |
| **Currying** | None | Inputs on blackboard are curried out |
| **Use case** | Mini-orchestration within an action | Complete multi-step workflow with typed results |

Use `AgenticTool` when you need a tool that internally orchestrates other tools.
Use `SupervisorInvocation` when you need a complete workflow that produces a typed result with full blackboard state management.

![embabel planning system](images/embabel_planning_system.dot.png)

### 4.21. API vs SPI

Embabel makes a clean distinction between its API and SPI.
The API is the public interface that users interact with, while the SPI (Service Provider Interface) is intended for developers who want to extend or customize the behavior of Embabel, or platform providers.

|  |  |
| --- | --- |
|  | Application code should only depend on the API (com.embabel.agent.api.\*) not the SPI. The SPI is subject to change and should not be used in production code. |

### 4.22. Embabel and Spring

Embabel embraces [Spring](https://spring.io/projects/spring-framework).
Spring was revolutionary when it arrived, and two decades on it still defines how most JVM applications are built.
You may already know Spring from years of Java or Kotlin development. Or perhaps youâre arriving from Python or another ecosystem. In any case itâs worth noting that Embabel was spearheaded by the creator of Spring himself: the noteworthy Rod Johnson.

Embabel has been assembled using the Spring core platform and then builds upon the [Spring AI](https://spring.io/projects/spring-ai) portfolio project.

We recommend using [Spring Boot](https://spring.io/projects/spring-boot) for building Embabel applications. Not only does it provide a familiar environment for JVM developers, its philosophy is highly relevant for anyone aiming to craft a production-grade agentic AI application.

Why? Because the foundation of the Spring framework is:

* Composability via discreet, fit-for-purpose reusable units. Dependency injection facilitates this.
* Cross-cutting abstractions â such as transaction management and security. Aspect-oriented programming (AOP) is what makes this work.

This same foundation makes it possible to craft agentic applications that are composable, testable, and built on enterprise-grade service abstractions.
With ~70% of production applications deployed on the JVM, Embabel can bring AI super-powers to existing systems â extending their value rather than replacing them.
In this way, Embabel applies the Spring philosophy so that agentic applications are not just clever demos, but truly production-ready systems.

### 4.23. Working with LLMs

Embabel supports any LLM supported by Spring AI.
In practice, this is just about any LLM.

#### 4.23.1. Choosing an LLM

Embabel encourages you to think about LLM choice for every LLM invocation.
The `PromptRunner` interface makes this easy.
Because Embabel enables you to break agentic flows up into multiple action steps, each step can use a smaller, focused prompt with fewer tools.
This means it may be able to use a smaller LLM.

Considerations:

* **Consider the complexity of the return type you expect** from the LLM.
  This is typically a good proxy for determining required LLM quality.
  A small LLM is likely to struggle with a deeply nested return structure.
* **Consider the nature of the task.** LLMs have different strengths; review any available documentation.
  You don’t necessarily need a huge, expensive model that is good at nearly everything, at the cost of your wallet and the environment.
* **Consider the sophistication of tool calling required**.
  Simple tool calls are fine, but complex orchestration is another indicator you’ll need a strong LLM.
  (It may also be an indication that you should create a more sophisticated flow using Embabel GOAP.)
* **Consider trying a local LLM** running under Ollama or Docker.

|  |  |
| --- | --- |
|  | Trial and error is your friend. Embabel makes it easy to switch LLMs; try the cheapest thing that could work and switch if it doesn’t. |

#### 4.23.2. Tuning for Smaller and Local Models

A core goal of Embabel is to make agentic flows work well across the full range of LLMs, so you can choose the cheapest, smallest, or most private model that does the job â rather than always reaching for a frontier model.
Smaller chat models behave differently from frontier models in ways that the framework can compensate for:

* **Silent failures after tool calls.** Weaker open-weights models (e.g. `gpt-oss-20b`, some Qwen variants) sometimes return blank text with no further tool calls when they don’t know how to proceed. Without intervention the tool loop exits with empty content. Activate `embabel.agent.platform.toolloop.empty-response.max-retries: 1` to feed a synthetic nudge back to the model and give it one more chance â see [Empty-Response Handling](#reference.configuration.empty-response).
* **Tool-name confusion.** Smaller models more frequently call tools by approximate names. The default `AutoCorrectionPolicy` handles this by feeding back a "did you mean X?" suggestion; tune `embabel.agent.platform.toolloop.tool-not-found.max-retries` if your model needs more attempts.
* **Iteration headroom.** Recovery costs LLM calls. If you enable retry policies, raise `embabel.agent.platform.toolloop.max-iterations` so a turn that needs an extra round trip doesn’t run out of budget.

These settings are off-by-default so existing deployments using strong models behave exactly as before.
Turn them on per-deployment when the model you’ve picked benefits from them.

#### 4.23.3. Advanced: Custom LLM Integration

|  |  |
| --- | --- |
|  | If you want to use a standard provider (Anthropic, OpenAI, DeepSeek, Mistral) with a user-supplied key at runtime, see [Bring Your Own Key (BYOK)](#reference.customizing.byok). That is the recommended path for BYOK scenarios. This section covers implementing `LlmMessageSender` from scratch for providers not otherwise supported by Embabel. |

Embabel’s tool loop is framework-agnostic, allowing you to integrate any LLM provider by implementing the `LlmMessageSender` interface.
This is useful when:

* You want to use an LLM provider not supported by Spring AI
* You need custom request/response handling
* You’re integrating with a proprietary or internal LLM service

##### The LlmMessageSender Interface

The core abstraction is the `LlmMessageSender` functional interface:

Java
:   ```
    @FunctionalInterface
    public interface LlmMessageSender {
        LlmMessageResponse call(
            List<Message> messages,
            List<Tool> tools
        );
    }
    ```

Kotlin
:   ```
    fun interface LlmMessageSender {
        fun call(
            messages: List<Message>,
            tools: List<Tool>,
        ): LlmMessageResponse
    }
    ```

The implementation makes a single LLM inference call and returns the response.
Importantly, it does **not** execute tools—​it only returns any tool call requests from the LLM.
Tool execution is handled by Embabel’s `DefaultToolLoop`.

|  |  |
| --- | --- |
|  | Even more advanced control over tools execution is available - tools can be executed in parallel, controlled by `ParallelToolLoop`. In order to activate `ParallelToolLoop`, please set the following parameter: |

```
embabel.agent.platform.toolloop.type=parallel
```

For full list of tool loop configuration parameters please refer to `ToolLoopConfiguration`.

##### Tool-Not-Found Recovery Policy

When the LLM calls a tool by a name that doesn’t exist in the available set, the behavior is controlled by `ToolNotFoundPolicy`.

Two built-in policies are provided:

* **`AutoCorrectionPolicy`** (default) â feeds the error back to the LLM so it can self-correct. Uses case-insensitive fuzzy matching to suggest corrections for hallucinated tool names (e.g., `ragbot_vectorSearch` â suggests `vectorSearch`). When multiple candidates match, all are listed. Throws `ToolNotFoundException` after 3 consecutive failures.
* **`ImmediateThrowPolicy`** â throws `ToolNotFoundException` immediately.

The system-wide default is `AutoCorrectionPolicy`, provided as a Spring bean with `@ConditionalOnMissingBean`.
To override it globally, define your own `ToolNotFoundPolicy` bean.

For per-interaction control, use `withToolNotFoundPolicy()` on `PromptRunner`:

Java
:   ```
    promptRunner
        .withToolNotFoundPolicy(new AutoCorrectionPolicy(5))
        .creating(MyOutput.class)
        .create(messages);
    ```

Kotlin
:   ```
    promptRunner
        .withToolNotFoundPolicy(AutoCorrectionPolicy(maxRetries = 5))
        .creating(MyOutput::class.java)
        .create(messages)
    ```

Custom policies can be implemented by implementing the `ToolNotFoundPolicy` interface:

```
class MyEditDistancePolicy : ToolNotFoundPolicy {
    override fun handle(requestedName: String, availableTools: List<Tool>): ToolNotFoundAction {
        // Custom recovery logic, e.g. edit-distance matching
        ...
    }
}
```

##### Response Types

The `LlmMessageResponse` contains:

* `message`: The LLM’s response as an Embabel `Message`
* `textContent`: Text content from the response
* `usage`: Optional token usage information

For responses that include tool calls, return an `AssistantMessageWithToolCalls`:

Java
:   ```
    public record ToolCall(
        String id,         // Unique identifier for the tool call
        String name,       // Name of the tool to invoke
        String arguments   // JSON arguments for the tool
    ) {}
    ```

Kotlin
:   ```
    data class ToolCall(
        val id: String,      // Unique identifier for the tool call
        val name: String,    // Name of the tool to invoke
        val arguments: String, // JSON arguments for the tool
    )
    ```

##### Example: Custom LLM Provider

Here’s an example of implementing `LlmMessageSender` for a hypothetical HTTP-based LLM API:

Java
:   ```
    public class MyCustomLlmMessageSender implements LlmMessageSender {

        private final HttpClient httpClient;
        private final String apiKey;
        private final String model;

        public MyCustomLlmMessageSender(HttpClient httpClient, String apiKey, String model) {
            this.httpClient = httpClient;
            this.apiKey = apiKey;
            this.model = model;
        }

        @Override
        public LlmMessageResponse call(List<Message> messages, List<Tool> tools) {
            // Convert Embabel messages to your API's format
            List<Map<String, Object>> apiMessages = messages.stream()
                .map(message -> Map.<String, Object>of(
                    "role", message.getRole().name().toLowerCase(),
                    "content", message.getTextContent()
                ))
                .toList();

            // Convert tool definitions to your API's format
            List<Map<String, Object>> apiTools = tools.stream()
                .map(tool -> Map.<String, Object>of(
                    "name", tool.getDefinition().getName(),
                    "description", tool.getDefinition().getDescription(),
                    "parameters", tool.getDefinition().getInputSchema().jsonSchema()
                ))
                .toList();

            // Make API request (using your preferred HTTP client)
            MyApiResponse responseBody = httpClient.post("https://api.my-llm.com/chat")
                .header("Authorization", "Bearer " + apiKey)
                .body(Map.of(
                    "model", model,
                    "messages", apiMessages,
                    "tools", apiTools.isEmpty() ? null : apiTools
                ))
                .execute(MyApiResponse.class);

            // Check if LLM requested tool calls
            List<ToolCall> toolCalls = null;
            if (responseBody.getToolCalls() != null) {
                toolCalls = responseBody.getToolCalls().stream()
                    .map(call -> new ToolCall(
                        call.getId(),
                        call.getFunction().getName(),
                        call.getFunction().getArguments()
                    ))
                    .toList();
            }

            Message embabelMessage;
            if (toolCalls == null || toolCalls.isEmpty()) {
                embabelMessage = new AssistantMessage(
                    responseBody.getContent() != null ? responseBody.getContent() : ""
                );
            } else {
                embabelMessage = new AssistantMessageWithToolCalls(
                    responseBody.getContent() != null ? responseBody.getContent() : "",
                    toolCalls
                );
            }

            Usage usage = null;
            if (responseBody.getUsage() != null) {
                usage = new Usage(
                    responseBody.getUsage().getPromptTokens(),
                    responseBody.getUsage().getCompletionTokens()
                );
            }

            return new LlmMessageResponse(embabelMessage, responseBody.getContent(), usage);
        }
    }
    ```

Kotlin
:   ```
    class MyCustomLlmMessageSender(
        private val httpClient: HttpClient,
        private val apiKey: String,
        private val model: String,
    ) : LlmMessageSender {

        override fun call(
            messages: List<Message>,
            tools: List<Tool>,
        ): LlmMessageResponse {
            // Convert Embabel messages to your API's format
            val apiMessages = messages.map { message ->
                mapOf(
                    "role" to message.role.name.lowercase(),
                    "content" to message.textContent
                )
            }

            // Convert tool definitions to your API's format
            val apiTools = tools.map { tool ->
                mapOf(
                    "name" to tool.definition.name,
                    "description" to tool.definition.description,
                    "parameters" to tool.definition.inputSchema.jsonSchema()
                )
            }

            // Make API request
            val response = httpClient.post("https://api.my-llm.com/chat") {
                header("Authorization", "Bearer $apiKey")
                body = mapOf(
                    "model" to model,
                    "messages" to apiMessages,
                    "tools" to apiTools.ifEmpty { null }
                )
            }

            // Parse response and convert to Embabel types
            val responseBody = response.body<MyApiResponse>()

            // Check if LLM requested tool calls
            val toolCalls = responseBody.toolCalls?.map { call ->
                ToolCall(
                    id = call.id,
                    name = call.function.name,
                    arguments = call.function.arguments
                )
            }

            val embabelMessage = if (toolCalls.isNullOrEmpty()) {
                AssistantMessage(responseBody.content ?: "")
            } else {
                AssistantMessageWithToolCalls(
                    content = responseBody.content ?: "",
                    toolCalls = toolCalls
                )
            }

            return LlmMessageResponse(
                message = embabelMessage,
                textContent = responseBody.content ?: "",
                usage = responseBody.usage?.let { u ->
                    Usage(
                        inputTokens = u.promptTokens,
                        outputTokens = u.completionTokens,
                    )
                }
            )
        }
    }
    ```

##### Creating an LlmService

To make your custom LLM available through Embabel’s `ModelProvider`, implement the `LlmService` interface:

Java
:   ```
    public class MyCustomLlmService implements LlmService<MyCustomLlmService> {

        private final String name;
        private final String provider;
        private final HttpClient httpClient;
        private final String apiKey;
        private final LocalDate knowledgeCutoffDate;
        private final List<PromptContributor> promptContributors;
        private final PricingModel pricingModel;

        public MyCustomLlmService(
                String name,
                String provider,
                HttpClient httpClient,
                String apiKey,
                LocalDate knowledgeCutoffDate,
                PricingModel pricingModel) {
            this.name = name;
            this.provider = provider;
            this.httpClient = httpClient;
            this.apiKey = apiKey;
            this.knowledgeCutoffDate = knowledgeCutoffDate;
            this.promptContributors = knowledgeCutoffDate != null
                ? List.of(new KnowledgeCutoffDate(knowledgeCutoffDate))
                : List.of();
            this.pricingModel = pricingModel;
        }

        @Override
        public String getName() { return name; }

        @Override
        public String getProvider() { return provider; }

        @Override
        public LocalDate getKnowledgeCutoffDate() { return knowledgeCutoffDate; }

        @Override
        public List<PromptContributor> getPromptContributors() { return promptContributors; }

        @Override
        public PricingModel getPricingModel() { return pricingModel; }

        @Override
        public LlmMessageSender createMessageSender(LlmOptions options) {
            return new MyCustomLlmMessageSender(
                httpClient,
                apiKey,
                options.getModel() != null ? options.getModel() : name
            );
        }

        @Override
        public MyCustomLlmService withKnowledgeCutoffDate(LocalDate date) {
            return new MyCustomLlmService(name, provider, httpClient, apiKey, date, pricingModel);
        }

        @Override
        public MyCustomLlmService withPromptContributor(PromptContributor promptContributor) {
            var newContributors = new ArrayList<>(promptContributors);
            newContributors.add(promptContributor);
            return new MyCustomLlmService(
                name, provider, httpClient, apiKey, knowledgeCutoffDate,
                newContributors, pricingModel
            );
        }
    }
    ```

Kotlin
:   ```
    data class MyCustomLlmService(
        override val name: String,
        override val provider: String,
        private val httpClient: HttpClient,
        private val apiKey: String,
        override val knowledgeCutoffDate: LocalDate? = null,
        override val promptContributors: List<PromptContributor> =
            buildList { knowledgeCutoffDate?.let { add(KnowledgeCutoffDate(it)) } },
        override val pricingModel: PricingModel? = null,
    ) : LlmService<MyCustomLlmService> {

        override fun createMessageSender(options: LlmOptions): LlmMessageSender {
            return MyCustomLlmMessageSender(
                httpClient = httpClient,
                apiKey = apiKey,
                model = options.model ?: name,
            )
        }

        override fun withKnowledgeCutoffDate(date: LocalDate): MyCustomLlmService =
            copy(
                knowledgeCutoffDate = date,
                promptContributors = promptContributors + KnowledgeCutoffDate(date)
            )

        override fun withPromptContributor(promptContributor: PromptContributor): MyCustomLlmService =
            copy(promptContributors = promptContributors + promptContributor)
    }
    ```

Then register it as a Spring bean:

Java
:   ```
    @Configuration
    public class MyLlmConfiguration {

        @Bean
        public LlmService<?> myCustomLlm(
                HttpClient httpClient,
                @Value("${my-llm.api-key}") String apiKey) {
            return new MyCustomLlmService(
                "my-custom-model",
                "MyProvider",
                httpClient,
                apiKey,
                LocalDate.of(2024, 12, 1),
                null
            );
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class MyLlmConfiguration {

        @Bean
        fun myCustomLlm(
            httpClient: HttpClient,
            @Value("\${my-llm.api-key}") apiKey: String,
        ): LlmService<*> = MyCustomLlmService(
            name = "my-custom-model",
            provider = "MyProvider",
            httpClient = httpClient,
            apiKey = apiKey,
            knowledgeCutoffDate = LocalDate.of(2024, 12, 1),
        )
    }
    ```

The bean will be automatically discovered and made available through the `ModelProvider`.

##### How Model Discovery and Selection Works

When your application starts, `ConfigurableModelProvider` collects all `LlmService` beans from the Spring application context.
Your custom LLM is matched by the `name` property you set on your `LlmService` implementation.

**By name**: Use the `name` from your `LlmService` directly.
This works with `@LlmCall`, `ai.withLlm()`, and `AgenticTool.withLlm()`:

Java
:   ```
    // In a declarative action
    @LlmCall(llm = "my-custom-model")
    String myAction();

    // In an imperative action
    ai.withLlm("my-custom-model")
        .create("Tell me a joke", String.class);
    ```

Kotlin
:   ```
    // In a declarative action
    @LlmCall(llm = "my-custom-model")
    fun myAction(): String

    // In an imperative action
    ai.withLlm("my-custom-model")
        .create<String>("Tell me a joke")
    ```

**By role**: Map a role name to your model name in configuration, then reference it with the `#` prefix:

```
embabel:
  models:
    default-llm: my-custom-model  (1)
    llms:
      best: my-custom-model       (2)
      cheapest: my-small-model    (3)
```

|  |  |
| --- | --- |
| **1** | Sets the default LLM used when no explicit model is specified |
| **2** | Maps the `best` role to your custom model |
| **3** | Maps the `cheapest` role to a different model |

Then reference roles with `#`:

Java
:   ```
    // By role
    @LlmCall(llm = "#best")
    String myAction();

    // Or programmatically
    ai.withLlmByRole("best")
        .create("Tell me a joke", String.class);
    ```

Kotlin
:   ```
    // By role
    @LlmCall(llm = "#best")
    fun myAction(): String

    // Or programmatically
    ai.withLlmByRole("best")
        .create<String>("Tell me a joke")
    ```

|  |  |
| --- | --- |
|  | If no LLM is specified in `@LlmCall` or `withLlm()`, the `default-llm` from configuration is used. |

##### Using Your Custom Implementation (Alternative)

If you need more control over the LLM operations layer itself, you can extend `ToolLoopLlmOperations`:

Java
:   ```
    public class MyCustomLlmOperations extends ToolLoopLlmOperations {

        private final HttpClient httpClient;
        private final String apiKey;

        public MyCustomLlmOperations(
                HttpClient httpClient,
                String apiKey,
                ModelProvider modelProvider,
                ToolDecorator toolDecorator,
                Validator validator) {
            super(modelProvider, toolDecorator, validator);
            this.httpClient = httpClient;
            this.apiKey = apiKey;
        }

        @Override
        protected LlmMessageSender createMessageSender(LlmService<?> llm, LlmOptions options) {
            return new MyCustomLlmMessageSender(
                httpClient,
                apiKey,
                options.getModel() != null ? options.getModel() : "default-model"
            );
        }
    }
    ```

Kotlin
:   ```
    class MyCustomLlmOperations(
        private val httpClient: HttpClient,
        private val apiKey: String,
        modelProvider: ModelProvider,
        toolDecorator: ToolDecorator,
        validator: Validator,
    ) : ToolLoopLlmOperations(
        modelProvider = modelProvider,
        toolDecorator = toolDecorator,
        validator = validator,
    ) {
        override fun createMessageSender(
            llm: LlmService<*>,
            options: LlmOptions,
        ): LlmMessageSender {
            return MyCustomLlmMessageSender(
                httpClient = httpClient,
                apiKey = apiKey,
                model = options.model ?: "default-model",
            )
        }
    }
    ```

The `ToolLoopLlmOperations` base class provides several extension points:

* `createMessageSender()`: Create the LLM communication layer
* `createOutputConverter()`: Parse LLM responses into typed objects
* `sanitizeStringOutput()`: Clean up raw text responses
* `emitCallEvent()`: Emit observability events

##### Key Implementation Notes

1. **Tool calls are not executed by your sender.** Just return the tool call requests—​Embabel’s tool loop handles execution and continuation.
2. **Handle both tool and non-tool responses.** Return `AssistantMessage` for plain text, `AssistantMessageWithToolCalls` when the LLM wants to invoke tools.
3. **Include usage information when available.** This enables cost tracking and observability.
4. **Message types matter.** The tool loop expects specific message types:

   * `UserMessage`: User input
   * `SystemMessage`: System prompts
   * `AssistantMessage`: LLM text response
   * `AssistantMessageWithToolCalls`: LLM response with tool requests
   * `ToolResultMessage`: Result returned to LLM after tool execution

#### 4.23.4. Advanced: Custom Embedding Service

Just as you can integrate a custom LLM, you can implement a custom embedding service that doesn’t depend on Spring AI.
This is useful when:

* You want to use an embedding provider not supported by Spring AI
* You need custom pre/post-processing of embeddings
* You’re integrating with a proprietary or internal embedding API

##### The EmbeddingService Interface

The `EmbeddingService` interface is framework-agnostic.
Unlike `SpringAiEmbeddingService`, a custom implementation does not need to wrap a Spring AI `EmbeddingModel`:

Java
:   ```
    public interface EmbeddingService {
        float[] embed(String text);
        List<float[]> embed(List<String> texts);
        int getDimensions();
        String getName();
        String getProvider();
    }
    ```

Kotlin
:   ```
    interface EmbeddingService : EmbeddingServiceMetadata, HasInfoString {
        fun embed(text: String): FloatArray
        fun embed(texts: List<String>): List<FloatArray>
        val dimensions: Int
    }
    ```

##### Example: Custom Embedding Provider

Here’s an example of implementing `EmbeddingService` for an HTTP-based embedding API:

Java
:   ```
    public class MyCustomEmbeddingService implements EmbeddingService {

        private final String name;
        private final String provider;
        private final int dimensions;
        private final HttpClient httpClient;
        private final String apiKey;

        public MyCustomEmbeddingService(
                String name,
                String provider,
                int dimensions,
                HttpClient httpClient,
                String apiKey) {
            this.name = name;
            this.provider = provider;
            this.dimensions = dimensions;
            this.httpClient = httpClient;
            this.apiKey = apiKey;
        }

        @Override
        public String getName() { return name; }

        @Override
        public String getProvider() { return provider; }

        @Override
        public int getDimensions() { return dimensions; }

        @Override
        public float[] embed(String text) {
            return embed(List.of(text)).get(0);
        }

        @Override
        public List<float[]> embed(List<String> texts) {
            MyEmbeddingResponse response = httpClient
                .post("https://api.my-embeddings.com/embed")
                .header("Authorization", "Bearer " + apiKey)
                .body(Map.of("texts", texts, "model", name))
                .execute(MyEmbeddingResponse.class);
            return response.getEmbeddings();
        }
    }
    ```

Kotlin
:   ```
    class MyCustomEmbeddingService(
        override val name: String,
        override val provider: String,
        override val dimensions: Int,
        private val httpClient: HttpClient,
        private val apiKey: String,
    ) : EmbeddingService {

        override fun embed(text: String): FloatArray =
            embed(listOf(text)).first()

        override fun embed(texts: List<String>): List<FloatArray> {
            val response = httpClient.post("https://api.my-embeddings.com/embed") {
                header("Authorization", "Bearer $apiKey")
                body = mapOf("texts" to texts, "model" to name)
            }
            return response.body<MyEmbeddingResponse>().embeddings
        }
    }
    ```

##### Registering as a Spring Bean

Register your custom embedding service as a Spring bean and it will be automatically discovered:

Java
:   ```
    @Configuration
    public class MyEmbeddingConfiguration {

        @Bean
        public EmbeddingService myCustomEmbeddings(
                HttpClient httpClient,
                @Value("${my-embeddings.api-key}") String apiKey) {
            return new MyCustomEmbeddingService(
                "my-custom-embeddings",
                "MyProvider",
                384,
                httpClient,
                apiKey
            );
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class MyEmbeddingConfiguration {

        @Bean
        fun myCustomEmbeddings(
            httpClient: HttpClient,
            @Value("\${my-embeddings.api-key}") apiKey: String,
        ): EmbeddingService = MyCustomEmbeddingService(
            name = "my-custom-embeddings",
            provider = "MyProvider",
            dimensions = 384,
            httpClient = httpClient,
            apiKey = apiKey,
        )
    }
    ```

##### Discovery and Selection

Custom embedding services follow the same discovery and selection pattern as LLMs (see [How Model Discovery and Selection Works](#how-model-discovery-and-selection-works)).

**By name**: Use `ai.withEmbeddingService()` with the `name` from your implementation:

Java
:   ```
    ai.withEmbeddingService("my-custom-embeddings")
        .embed("Hello world");
    ```

Kotlin
:   ```
    ai.withEmbeddingService("my-custom-embeddings")
        .embed("Hello world")
    ```

**By role**: Map a role name to your embedding service in configuration:

```
embabel:
  models:
    default-embedding-model: my-custom-embeddings  (1)
    embedding-services:
      cheapest: my-custom-embeddings               (2)
```

|  |  |
| --- | --- |
| **1** | Sets the default embedding service |
| **2** | Maps the `cheapest` role to your custom embedding service |

#### 4.23.5. Advanced Caching with Anthropic

While many providers have implicit caching managed internally, Anthropic exposes public APIs for explicit prompt caching control.
This allows you to optimize costs and latency for applications with long prompts, many tools, or extended conversations.

##### Motivation

Anthropic’s prompt caching feature provides significant benefits:

* **Cost savings**: Cache reads cost 90% less than regular input tokens
* **Latency improvements**: Cached content is processed faster
* **Ideal for**: Long system prompts, extensive tool definitions, multi-turn conversations

Without caching, every API call processes the entire prompt from scratch.
With caching, repeated content (system prompts, tools, conversation history) can be cached and reused across requests.

##### How It Works

Anthropic caches the trailing portion of your prompt context.
The cache is identified by an exact match of the content hashcode.
Any change to the cached portion invalidates the cache.

**Key concepts:**

* **Cache creation**: First time content is seen, it’s written to cache with a 25% premium over regular input tokens (for 5-minute TTL)
* **Cache reads**: Subsequent requests with matching content read from cache at 10% of regular input token cost
* **Cache TTL**: 5 minutes (default) or 1 hour (premium, higher creation cost)
* **Minimum size**: 1024 tokens for older models, 4096 tokens for Claude Sonnet 4.5 and newer.

##### Cache Strategies

Embabel provides several caching strategies through `AnthropicCachingConfig`:

**System Prompt Caching**

Cache the system prompt for reuse across multiple requests:

Java
:   ```
    AnthropicCachingConfig cachingConfig = new AnthropicCachingConfig();
    cachingConfig.setSystemPrompt(true);

    LlmOptions options = LlmOptions.withDefaultLlm();
    options = withAnthropicCaching(options, cachingConfig);
    ```

Kotlin
:   ```
    val options = LlmOptions.withDefaultLlm()
        .withAnthropicCaching(systemPrompt = true)
    ```

**Tools Caching**

Cache tool definitions when using many tools or tools with large schemas:

Java
:   ```
    AnthropicCachingConfig cachingConfig = new AnthropicCachingConfig();
    cachingConfig.setTools(true);

    LlmOptions options = LlmOptions.withDefaultLlm();
    options = withAnthropicCaching(options, cachingConfig);
    ```

Kotlin
:   ```
    val options = LlmOptions.withDefaultLlm()
        .withAnthropicCaching(tools = true)
    ```

**System + Tools Caching**

Combine both strategies:

Java
:   ```
    AnthropicCachingConfig cachingConfig = new AnthropicCachingConfig();
    cachingConfig.setSystemPrompt(true);
    cachingConfig.setTools(true);

    LlmOptions options = LlmOptions.withDefaultLlm();
    options = withAnthropicCaching(options, cachingConfig);
    ```

Kotlin
:   ```
    val options = LlmOptions.withDefaultLlm()
        .withAnthropicCaching(
            systemPrompt = true,
            tools = true
        )
    ```

**Conversation History Caching**

Cache conversation history for long multi-turn conversations:

Java
:   ```
    AnthropicCachingConfig cachingConfig = new AnthropicCachingConfig();
    cachingConfig.setConversationHistory(true);

    LlmOptions options = LlmOptions.withDefaultLlm();
    options = withAnthropicCaching(options, cachingConfig);
    ```

Kotlin
:   ```
    val options = LlmOptions.withDefaultLlm()
        .withAnthropicCaching(conversationHistory = true)
    ```

##### Advanced Configuration

**Message Type Minimum Content Length**

Control which messages are eligible for caching based on their content length:

Java
:   ```
    AnthropicCachingConfig cachingConfig = new AnthropicCachingConfig();
    cachingConfig.setSystemPrompt(true);
    cachingConfig.messageTypeMinContentLength(MessageRole.SYSTEM, 1024);
    cachingConfig.messageTypeMinContentLength(MessageRole.USER, 512);

    LlmOptions options = LlmOptions.withDefaultLlm();
    options = withAnthropicCaching(options, cachingConfig);
    ```

Kotlin
:   ```
    val options = LlmOptions.withDefaultLlm()
        .withAnthropicCaching(
            AnthropicCachingConfig(systemPrompt = true)
                .messageTypeMinContentLength(MessageRole.SYSTEM, 1024)
                .messageTypeMinContentLength(MessageRole.USER, 512)
        )
    ```

**Message Type TTL**

Set cache TTL per message type (default is 5 minutes):

Java
:   ```
    AnthropicCachingConfig cachingConfig = new AnthropicCachingConfig();
    cachingConfig.setSystemPrompt(true);
    cachingConfig.messageTypeTtl(MessageRole.SYSTEM, AnthropicCacheTtl.ONE_HOUR);

    LlmOptions options = LlmOptions.withDefaultLlm();
    options = withAnthropicCaching(options, cachingConfig);
    ```

Kotlin
:   ```
    val options = LlmOptions.withDefaultLlm()
        .withAnthropicCaching(
            AnthropicCachingConfig(systemPrompt = true)
                .messageTypeTtl(MessageRole.SYSTEM, AnthropicCacheTtl.ONE_HOUR)
        )
    ```

##### Accessing Cache Metrics

Embabel provides extension methods to access Anthropic-specific cache metrics from the `Usage` object:

Java
:   ```
    import static com.embabel.agent.config.models.anthropic.AnthropicUsage.*;

    AssistantMessage response = promptRunner.respond(messages);
    Usage usage = response.getUsage();

    // Check if cache was created or read
    boolean cacheCreated = hasAnthropicCacheCreation(usage);
    boolean cacheRead = hasAnthropicCacheRead(usage);

    // Get token counts
    Integer creationTokens = anthropicCacheCreationTokens(usage);
    Integer readTokens = anthropicCacheReadTokens(usage);

    // Get summary string for logging
    String summary = anthropicCacheSummary(usage);
    // Example output: "cache[creation=1061, read=0]"
    ```

Kotlin
:   ```
    val response = promptRunner.respond(messages)
    val usage = response.usage

    // Check if cache was created or read
    val cacheCreated = usage.hasAnthropicCacheCreation()
    val cacheRead = usage.hasAnthropicCacheRead()

    // Get token counts
    val creationTokens = usage.anthropicCacheCreationTokens()
    val readTokens = usage.anthropicCacheReadTokens()

    // Get summary string for logging
    val summary = usage.anthropicCacheSummary()
    // Example output: "cache[creation=1061, read=0]"
    ```

##### Best Practices

1. **Cache long, stable content**: System prompts and tool definitions that don’t change frequently are ideal candidates
2. **Mind the minimum size**: Content must meet the minimum token requirement (1024 or 4096 depending on model)
3. **Monitor cache metrics**: Use the cache extension methods to track cache hit rates and validate savings
4. **Consider TTL vs cost**: 1-hour TTL has higher creation cost but better for longer sessions
5. **Test before deploying**: Cache behavior can vary based on prompt structure and usage patterns

##### Reference

For complete details on Anthropic’s prompt caching, see:
[docs.anthropic.com/en/docs/build-with-claude/prompt-caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)

#### 4.23.6. Advanced Feature: Native Structured Output

Native structured output enables the model provider to enforce a JSON Schema directly, rather than relying only on prompt instructions and Embabel’s object construction.
E**mbabel still owns schema generation and object binding**; the native provider path is an optimization and compatibility feature used only when it is explicitly supported and safe for the call.

##### Payload Format

For OpenAI-compatible providers, Spring AI wraps Embabel’s schema in a `response_format` JSON schema payload.
For example, a `MonthItem` object can produce a request fragment like:

```
{
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "MonthItem",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "temperature": { "type": "integer" }
        },
        "required": [ "name", "temperature" ],
        "additionalProperties": false
      }
    }
  },
}
```

OpenAI validates this schema before generation.
If the schema is not valid for the provider-native path, the request fails before the model produces output.

##### Participants Roles

* **Embabel** generates the JSON Schema, decides whether the native path is enabled for a call, and parses the final response into the requested object.
* **Spring AI** wraps Embabel’s schema into provider-specific format options, such as OpenAI’s `response_format`, and serializes the HTTP request.
* **The provider** such as OpenAI validates the native structured-output payload and returns output that matches the accepted schema.

##### Configuration and API

Native structured output is advertised in model metadata:

```
native_support_defaults:
  structured_output:
    supported: true
    strategy: response_format
    strict: false
    prompt_instructions: include
```

For a specific call, enable it through `LlmOptions`:

Java
:   ```
    PromptRunner runner = ai.withLlm(
            withNativeStructuredOutput(
                    LlmOptions.fromCriteria(DefaultModelSelectionCriteria.INSTANCE),
                    NativeStructuredOutputMode.ENABLED
            )
    );

    MonthItem result = runner.createObject(prompt, MonthItem.class);
    ```

Kotlin
:   ```
    val runner = ai.withLlm(
        LlmOptions.fromCriteria(DefaultModelSelectionCriteria)
            .withNativeStructuredOutput(NativeStructuredOutputMode.ENABLED)
    )

    val result = runner.createObject<MonthItem>(prompt)
    ```

* `NativeStructuredOutputMode.ENABLED`: Try the native path when model capability and schema compatibility allow it.
* `NativeStructuredOutputMode.DISABLED`: Force Embabel’s normal object construction path.
* `NativeStructuredOutputMode.DEFAULT`: Let Embabel decide from model capability, API shape, and schema compatibility.

For Java objects, mark required reference fields explicitly:

```
static class MonthItem {
    @JsonProperty(required = true)
    private String name;

    @JsonProperty(required = true)
    private Integer temperature;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }
}
```

##### Limitations

* **Required fields**: OpenAI native structured output requires `required` to include every property. Optional Java reference fields are not treated as required unless annotated, for example with `@JsonProperty(required = true)` or `@NotNull`.
* **Optional values**: Provider-native optionality usually needs nullable required properties, for example `type: ["string", "null"]`, rather than omitting the property from `required`.
* **Arrays of objects**: Some providers, including OpenAI according to Spring AI documentation, do not support arrays of objects natively. Embabel falls back to normal object construction for unsupported shapes.
* **Streaming**: Native structured output is not supported for streaming by Spring AI currently
* **`ifPossible` APIs**: `createObjectIfPossible` and related paths use `MaybeReturn` semantics and stay on Embabel’s fallback object construction path.
* **Provider coverage**: OpenAI-compatible `response_format` is the primary supported path. Anthropic native structured output is currently disabled by default until its semantics are verified.

### 4.24. AWS Bedrock Integration

#### 4.24.1. Add the Dependency

To use AWS Bedrock models, add the Bedrock autoconfiguration starter to your project:

Maven
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-bedrock-autoconfigure</artifactId>
    </dependency>
    ```

Gradle (Kotlin)
:   ```
    implementation("com.embabel.agent:embabel-agent-bedrock-autoconfigure")
    ```

Gradle (Groovy)
:   ```
    implementation 'com.embabel.agent:embabel-agent-bedrock-autoconfigure'
    ```

#### 4.24.2. AWS Configuration

Configure AWS credentials and region using standard Spring AI Bedrock properties.
See the [Spring AI Bedrock documentation](https://docs.spring.io/spring-ai/reference/api/bedrock.html) for credential configuration options.

#### 4.24.3. Available Models

##### Chat Models (Claude)

| Model Name | Model ID | Region | Knowledge Cutoff |
| --- | --- | --- | --- |
| `us_claude_3_5_sonnet` | `us.anthropic.claude-3-5-sonnet-20240620-v1:0` | US | 2024-04-01 |
| `us_claude_3_5_sonnet_v2` | `us.anthropic.claude-3-5-sonnet-20241022-v2:0` | US | 2024-07-01 |
| `us_claude_3_5_haiku` | `us.anthropic.claude-3-5-haiku-20241022-v1:0` | US | 2024-07-01 |
| `us_claude_3_7_sonnet` | `us.anthropic.claude-3-7-sonnet-20250219-v1:0` | US | 2024-10-31 |
| `us_claude_sonnet_4` | `us.anthropic.claude-sonnet-4-20250514-v1:0` | US | 2025-03-01 |
| `us_claude_opus_4` | `us.anthropic.claude-opus-4-20250514-v1:0` | US | 2025-03-01 |
| `eu_claude_3_5_sonnet` | `eu.anthropic.claude-3-5-sonnet-20240620-v1:0` | EU | 2024-04-01 |
| `eu_claude_3_5_sonnet_v2` | `eu.anthropic.claude-3-5-sonnet-20241022-v2:0` | EU | 2024-07-01 |
| `eu_claude_3_5_haiku` | `eu.anthropic.claude-3-5-haiku-20241022-v1:0` | EU | 2024-07-01 |
| `eu_claude_3_7_sonnet` | `eu.anthropic.claude-3-7-sonnet-20250219-v1:0` | EU | 2024-10-31 |
| `eu_claude_sonnet_4` | `eu.anthropic.claude-sonnet-4-20250514-v1:0` | EU | 2025-03-01 |
| `eu_claude_opus_4` | `eu.anthropic.claude-opus-4-20250514-v1:0` | EU | 2025-03-01 |
| `apac_claude_3_5_sonnet` | `apac.anthropic.claude-3-5-sonnet-20240620-v1:0` | APAC | 2024-04-01 |
| `apac_claude_3_5_sonnet_v2` | `apac.anthropic.claude-3-5-sonnet-20241022-v2:0` | APAC | 2024-07-01 |
| `apac_claude_3_5_haiku` | `apac.anthropic.claude-3-5-haiku-20241022-v1:0` | APAC | 2024-07-01 |
| `apac_claude_3_7_sonnet` | `apac.anthropic.claude-3-7-sonnet-20250219-v1:0` | APAC | 2024-10-31 |
| `apac_claude_sonnet_4` | `apac.anthropic.claude-sonnet-4-20250514-v1:0` | APAC | 2025-03-01 |
| `apac_claude_opus_4` | `apac.anthropic.claude-opus-4-20250514-v1:0` | APAC | 2025-03-01 |

##### Embedding Models

| Model Name | Model ID | Type |
| --- | --- | --- |
| `titan_embed_image_v1` | `amazon.titan-embed-image-v1` | Titan |
| `titan_embed_text_v1` | `amazon.titan-embed-text-v1` | Titan |
| `titan_embed_text_v2` | `amazon.titan-embed-text-v2:0` | Titan |
| `cohere_embed_multilingual_v3` | `cohere.embed-multilingual-v3` | Cohere |
| `cohere_embed_english_v3` | `cohere.embed-english-v3` | Cohere |

#### 4.24.4. Configuration

##### Retry Configuration

```
embabel:
  agent:
    platform:
      models:
        bedrock:
          max-attempts: 10              # Default: 10
          backoff-millis: 5000          # Default: 5000
          backoff-multiplier: 5.0       # Default: 5.0
          backoff-max-interval: 180000  # Default: 180000
```

#### 4.24.5. Adding New Models

To add new Bedrock models, edit the configuration file:

```
embabel-agent-autoconfigure/models/embabel-agent-bedrock-autoconfigure/
  src/main/resources/models/bedrock-models.yml
```

##### Adding a Chat Model

```
models:
  - name: "us_claude_opus_5"
    model_id: "us.anthropic.claude-opus-5-20260101-v1:0"
    display_name: "Claude Opus 5 (US)"
    region: "us"
    knowledge_cutoff_date: "2025-10-01"
    pricing_model:
      usd_per1m_input_tokens: 20.0
      usd_per1m_output_tokens: 100.0
```

##### Adding an Embedding Model

```
embedding_models:
  - name: "titan_embed_v3"
    model_id: "amazon.titan-embed-v3"
    display_name: "Titan Embed V3"
    model_type: "titan"
```

Model type must be either `titan` or `cohere`.

#### 4.24.6. See Also

* [Configuration Reference](#reference.configuration)
* [Spring AI Bedrock Integration](https://docs.spring.io/spring-ai/reference/api/bedrock.html)

### 4.25. MiniMax Integration

[MiniMax](https://www.minimax.io) is a Chinese AI company offering high-performance LLMs via an OpenAI-compatible API.
Embabel integrates MiniMax as a first-class provider using the same `OpenAiCompatibleModelFactory` pattern as other OpenAI-compatible providers.

#### 4.25.1. Add the Dependency

Maven
:   ```
    <dependency>
        <groupId>com.embabel.agent</groupId>
        <artifactId>embabel-agent-starter-minimax</artifactId>
    </dependency>
    ```

Gradle (Kotlin)
:   ```
    implementation("com.embabel.agent:embabel-agent-starter-minimax")
    ```

Gradle (Groovy)
:   ```
    implementation 'com.embabel.agent:embabel-agent-starter-minimax'
    ```

#### 4.25.2. API Key Configuration

Set your MiniMax API key via environment variable (recommended) or Spring property:

```
export MINIMAX_API_KEY=your-api-key
```

Or in `application.yml`:

```
embabel:
  agent:
    platform:
      models:
        minimax:
          api-key: your-api-key
```

|  |  |
| --- | --- |
|  | The environment variable `MINIMAX_API_KEY` takes precedence over the property value. Use the property for local development and the environment variable in production deployments. |

#### 4.25.3. Available Models

| Model Name | Model ID | Context Window | Input (per 1M tokens) | Output (per 1M tokens) |
| --- | --- | --- | --- | --- |
| `MiniMax-M3` | `MiniMax-M3` | 512K tokens | $0.60 | $2.40 |
| `MiniMax-M2.7` | `MiniMax-M2.7` | 192K tokens | $1.10 | $4.40 |
| `MiniMax-M2.7-highspeed` | `MiniMax-M2.7-highspeed` | 192K tokens | $0.55 | $2.20 |

`MiniMax-M3` is the latest flagship model â the best default choice and significantly cheaper than `MiniMax-M2.7`.
`MiniMax-M2.7` is the previous flagship, retained for backward compatibility and projects that need its 192K context window.
`MiniMax-M2.7-highspeed` trades some quality for significantly lower latency and cost â a good choice for intermediate steps in a multi-action agent flow.

|  |  |
| --- | --- |
|  | Embabel’s per-step LLM selection makes MiniMax models particularly well-suited to mixed strategies: use `MiniMax-M2.7-highspeed` for extraction and classification steps, and reserve `MiniMax-M3` (or a premium model) only for the final reasoning step. |

#### 4.25.4. Using MiniMax Models

Reference models by name in `@LlmCall` or programmatically via `ai.withLlm()`:

Kotlin
:   ```
    // Declarative
    @LlmCall(llm = "MiniMax-M3")
    fun summarize(article: Article): Summary

    // Programmatic
    ai.withLlm("MiniMax-M2.7-highspeed")
        .create<Classification>("Classify this input")
    ```

Java
:   ```
    // Declarative
    @LlmCall(llm = "MiniMax-M3")
    Summary summarize(Article article);

    // Programmatic
    ai.withLlm("MiniMax-M2.7-highspeed")
        .create("Classify this input", Classification.class);
    ```

Or map MiniMax models to roles in your configuration:

```
embabel:
  models:
    llms:
      cheapest: MiniMax-M2.7-highspeed
      best: MiniMax-M3
```

Then reference by role with the `#` prefix:

Kotlin
:   ```
    @LlmCall(llm = "#cheapest")
    fun extractEntities(text: String): EntityList
    ```

Java
:   ```
    @LlmCall(llm = "#cheapest")
    EntityList extractEntities(String text);
    ```

#### 4.25.5. Temperature Clamping

MiniMax models require temperature in the range `(0.0, 1.0]` â a value of exactly `0.0` is not permitted.
Embabel’s `MiniMaxOptionsConverter` clamps temperature automatically:

* Values `⇐ 0.0` are raised to `0.01`
* Values `> 1.0` are lowered to `1.0`

A `DEBUG` log message is emitted whenever clamping occurs.
No action is required on your part â this is handled transparently.

#### 4.25.6. Configuration Reference

```
embabel:
  agent:
    platform:
      models:
        minimax:
          api-key: your-api-key               # Alternative to MINIMAX_API_KEY env var
          base-url: https://api.minimax.io/v1  # Default; override for proxies
          max-attempts: 4                      # Retry attempts (default: 4)
          backoff-millis: 1500                 # Initial backoff ms (default: 1500)
          backoff-multiplier: 2.0              # Backoff multiplier (default: 2.0)
          backoff-max-interval: 60000          # Max backoff ms (default: 60000)
```

#### 4.25.7. See Also

* [Working with LLMs](#reference.llms)
* [Configuration Reference](#reference.configuration)
* [MiniMax AI](https://www.minimax.io/)

### 4.26. Working with Streams

Developer can choose piping data from LLM gradually, using Embabel streaming capabilities.

In addition to streaming the raw text output from the LLM, Embabel streams can also include LLM reasoning events, so-called "thinking", and stream of objects created by the LLM.
This feature is well aligned with Embabel focus on object-oriented programming model.

#### 4.26.1. Concepts

* `StreamingEvent` - wraps Thinking or user Object
* `StreamingPromptRunnerBuilder` - runner with streaming capabilities
* Spring Reactive Programming Support for Spring AI ChatClient as underlying infrastructure
* All reactive callbacks, such as *doOnNext*, *doOnComplete*, etc. are at developer’s disposal

#### 4.26.2. Example - Simple Thinking and Object Streaming with Callbacks

```
        PromptRunner runner = ai.withDefaultLlm()  // Example uses qwen3:latest
                                .withToolObject(Tooling.class);

        String prompt = "What are exactly two the most hottest months in Florida and their respective highest temperatures";

        // Use StreamingPromptBuilder instead of Kotlin extension function
        Flux<StreamingEvent<MonthItem>> results = new StreamingPromptRunnerBuilder(runner)
                .streaming()
                .withPrompt(prompt)
                .createObjectStreamWithThinking(MonthItem.class);

        // Subscribe with real reactive callbacks using builder pattern
        results
                .timeout(Duration.ofSeconds(150))
                .doOnSubscribe(subscription -> {
                    logger.info("Stream subscription started");
                })
                .doOnNext(event -> {
                    if (event.isThinking()) {
                        String content = event.getThinking();
                        receivedEvents.add("THINKING: " + content);
                        logger.info("Integration test received thinking: {}", content);
                    } else if (event.isObject()) {
                        MonthItem obj = event.getObject();
                        receivedEvents.add("OBJECT: " + obj.getName());
                        logger.info("Integration test received object: {}", obj.getName());
                    }
                })
                .doOnError(error -> {
                    errorOccurred.set(error);
                    logger.error("Integration test stream error: {}", error.getMessage());
                })
                .doOnComplete(() -> {
                    completionCalled.set(true);
                    logger.info("Integration test stream completed successfully");
                })
                .blockLast(Duration.ofSeconds(6000));
```

#### 4.26.3. Example - Simple Raw Text Streaming with Callbacks

```
        PromptRunner runner = ai.withDefaultLlm()  // Example uses qwen3:latest;

        String prompt = "What is the highest building in Paris?";

        // Use StreamingPromptBuilder instead of Kotlin extension function
        Flux<String> results = new StreamingPromptRunnerBuilder(runner)
                .streaming()
                .withPrompt(prompt)
                .generateStream();

        // Subscribe with real reactive callbacks using builder pattern
        results
                .timeout(Duration.ofSeconds(150))
                .doOnSubscribe(subscription -> {
                    logger.info("Stream subscription started");
                })
                .doOnNext(content -> {
                        receivedTextChunks.add(content);
                        logger.info("Integration test received text chunk: {}", content);
                })
                .doOnError(error -> {
                    errorOccurred.set(error);
                    logger.error("Integration test stream error: {}", error.getMessage());
                })
                .doOnComplete(() -> {
                    completionCalled.set(true);
                    logger.info("Integration test stream completed successfully");
                })
                .blockLast(Duration.ofSeconds(6000));
```

### 4.27. Working with LLM Reasoning / Thinking

#### 4.27.1. Motivation

Sometimes you need to validate an LLM’s reasoning process in addition to obtaining a structured result.

Consider this scenario: a user wants to plan a vacation and specifies that their preferred destinations are Greece and Italy, with available travel dates in June, August, or September. They ask the LLM to find flight options with affordable tickets for a one-week stay. The LLM returns a structured `Flight` object containing departure and return dates, destinations, and prices. Even if the output adheres to the expected schema, you may want to verify that:

* The flight dates fall within the requested months
* The destinations are actually in Greece or Italy rather than somewhere else

If the flight details fall outside the user’s criteria, access to the LLM’s reasoning process helps you understand why it made those choices.

An even more important use case arises when the LLM cannot fulfill a requestâfor example, when it cannot create the requested object because the user’s criteria are ambiguous or contradictory. In this case, the thinking blocks explain what went wrong, even though no result was produced.

#### 4.27.2. Concepts

* `ThinkingBlock` â An abstraction that carries details about LLM reasoning, including the tag type, tag value, and reasoning text content.
* `ThinkingTagType` â An enum defining the types of reasoning markers: `TAG` (XML-style tags like `<think>`), `PREFIX` (line prefixes like `//THINKING:`), and `NO_PREFIX` (untagged reasoning text before JSON output).
* `ThinkingResponse<T>` â A response wrapper that holds both the result object and a list of `ThinkingBlock` instances.
* `ThinkingException` â An exception that preserves thinking blocks when object instantiation fails, enabling debugging even in error scenarios.
* `thinking()` â The core `PromptRunner` API method that enables thinking extraction.

#### 4.27.3. Example: Handling Objects and Thinking Blocks

Java
:   ```
    // Configure the PromptRunner with an LLM and optional tools
    PromptRunner runner = ai.withDefaultLlm()  // Example uses claude-sonnet-4-5
                            .withToolObject(Tooling.class);

    String prompt = """
        What is the hottest month in Florida and its average high temperature?
        Please provide a detailed analysis of your reasoning.
        """;

    // Use thinking() to enable thinking block extraction
    ThinkingResponse<MonthItem> response = runner
            .thinking()
            .createObject(prompt, MonthItem.class);

    // Access the structured result
    MonthItem result = response.getResult();

    // Access the LLM's reasoning process
    List<ThinkingBlock> thinkingBlocks = response.getThinkingBlocks();

    // Inspect individual thinking blocks
    for (ThinkingBlock block : thinkingBlocks) {
        System.out.println("Type: " + block.getTagType());   // TAG, PREFIX, or NO_PREFIX
        System.out.println("Tag: " + block.getTagValue());   // e.g., "think", "analysis"
        System.out.println("Content: " + block.getContent());
    }
    ```

Kotlin
:   ```
    // Configure the PromptRunner with an LLM and optional tools
    val runner = ai.withDefaultLlm()  // Example uses claude-sonnet-4-5
                    .withToolObject(Tooling::class.java)

    val prompt = """
        What is the hottest month in Florida and its average high temperature?
        Please provide a detailed analysis of your reasoning.
        """.trimIndent()

    // Use thinking() to enable thinking block extraction
    val response = runner
            .thinking()
            .createObject(prompt, MonthItem::class.java)

    // Access the structured result
    val result = response.result

    // Access the LLM's reasoning process
    val thinkingBlocks = response.thinkingBlocks

    // Inspect individual thinking blocks
    for (block in thinkingBlocks) {
        println("Type: ${block.tagType}")   // TAG, PREFIX, or NO_PREFIX
        println("Tag: ${block.tagValue}")   // e.g., "think", "analysis"
        println("Content: ${block.content}")
    }
    ```

#### 4.27.4. Example: Handling Failures Gracefully

Use `createObjectIfPossible` when the LLM might not be able to produce a valid result:

Java
:   ```
    ThinkingResponse<MonthItem> response = runner
            .thinking()
            .createObjectIfPossible(prompt, MonthItem.class);

    MonthItem result = response.getResult();
    if (result != null) {
        // Process the result
    } else {
        // Object creation failedâexamine the reasoning to understand why
        for (ThinkingBlock block : response.getThinkingBlocks()) {
            logger.info("LLM reasoning: {}", block.getContent());
        }
    }
    ```

Kotlin
:   ```
    val response = runner
            .thinking()
            .createObjectIfPossible(prompt, MonthItem::class.java)

    val result = response.result
    if (result != null) {
        // Process the result
    } else {
        // Object creation failedâexamine the reasoning to understand why
        for (block in response.thinkingBlocks) {
            logger.info("LLM reasoning: {}", block.content)
        }
    }
    ```

#### 4.27.5. Provider Notes

Embabel exposes thinking through a provider-neutral API:

* `PromptRunner.thinking()`
* `LlmOptions.thinking`

This remains the primary public API for enabling reasoning/thinking mode.

Under the hood, provider integrations may translate `Thinking` differently to match provider-specific capabilities. For example, Google GenAI maps Embabel thinking options to the corresponding Spring AI Google GenAI chat options such as `includeThoughts` and `thinkingBudget`.

No new application-level thinking API is required for callers. In general, existing applications should continue to use Embabel’s generic thinking API rather than provider-specific configuration.

Some providers may also define model-level defaults in model YAML, but explicit runtime thinking requests still flow through `LlmOptions.thinking`.

Provider behavior may differ slightly depending on how Spring AI surfaces reasoning data:

* Some providers expose reasoning on the assistant message itself
* Others expose it through generation metadata

As a result, the presence and shape of extracted thinking blocks may vary somewhat by provider and Spring AI integration version.

### 4.28. Working with Callbacks (Interceptors)

#### 4.28.1. Tool Loop Callbacks

LLM invocations in Embabel take place inside `ToolLoop` (see [Advanced: Custom LLM Integration](#reference.llms.custom-integration)).
Embabel Tool Loop is highly customizable, offering clear extension points with a separation between observation (inspectors) and transformation (transformers).

Inspectors observe the loop without modifying it. Implement any callback:

* `beforeLlmCall`,
* `afterLlmCall`,
* `afterToolResult`,
* `afterIteration`.

Inspectors are perfect for logging, collecting metrics, debugging, and are read-only by design.

Transformers modify data flowing through the loop. Use them to truncate large tool results, apply sliding window to conversation history, redact sensitive content. They change what the LLM sees.

##### Tool Loop Callbacks Interfaces

Below are callbacks interfaces (in Kotlin):

```
/**
 * Read-only observer for tool loop lifecycle events.
 * Use for logging, metrics, debugging - does not modify state.
 */
interface ToolLoopInspector : ToolLoopCallback {

    /** Called before each LLM invocation. Default no-op. */
    fun beforeLlmCall(context: BeforeLlmCallContext) = Unit

    /** Called after LLM returns a response, before processing tool calls. Default no-op. */
    fun afterLlmCall(context: AfterLlmCallContext) = Unit

    /** Called after each tool produces a result. Default no-op. */
    fun afterToolResult(context: AfterToolResultContext) = Unit

    /** Called after each complete iteration (all tool calls processed). Default no-op. */
    fun afterIteration(context: AfterIterationContext) = Unit
}

/**
 * Transforms message history or tool results during tool loop execution.
 * Use for compression, summarization, windowing.
 */
interface ToolLoopTransformer : ToolLoopCallback {

    /** Transform history before sending to LLM. Return modified list. */
    fun transformBeforeLlmCall(context: BeforeLlmCallContext): List<Message> = context.history

    /** Transform LLM response before adding to history. Return modified message. */
    fun transformAfterLlmCall(context: AfterLlmCallContext): Message = context.response

    /** Transform tool result before adding to history. Return modified string. */
    fun transformAfterToolResult(context: AfterToolResultContext): String = context.resultAsString

    /** Transform history after iteration completes. Return modified list. */
    fun transformAfterIteration(context: AfterIterationContext): List<Message> = context.history
}
```

##### Simple Out-of-Box Tool Loop Callbacks

Framework provides with simple out-of-box callbacks:

* `ToolLoopLoggingInspector` â logs calls details before and after LLM invocations, after Tool Execution, and after Tool Loop Iteration
* `ToolResultTruncatingTransformer` â truncates tool call results
* `SlidingWindowTransformer` â maintains a sliding window of messages to manage context size, while preserving conversation context system messages

##### Usage: Tool Loop Callbacks

```
// Execute with tools and callbacks
var result = ai.withDefaultLlm()
                .withTools(tools)
                .withToolLoopInspectors(callbackTracker, loggingInspector)
                .withToolLoopTransformers(truncatingTransformer, slidingWindowTransformer)
                .creating(RestaurantRecommendation.class)
                .fromPrompt("""
                        I'm looking for an Italian restaurant near the Upper East Side in NYC.

                        You have access to these tools to fetch restaurant menus:
                        %s

                        Please fetch the menus and recommend the best restaurant for a romantic dinner.
                        """.formatted(String.join(", ", toolNames)));
```

#### 4.28.2. Tool Call Interceptors

While tool loop callbacks provide with powerful features for observing LLM invocations, conversation history and Tools execution, there is also a practical need for the trimmed version of inspector callbacks.

##### Motivation: streaming mode

Streaming is event-driven, see [Working with Streams](#reference.streaming). Streaming model provides with callbacks for getting thinking blocks and structured object.

Framework also provides with additional type of streaming callbacks - Tool Call callbacks.

Tool Call callback includes info about tool definition, tool result, and tool execution duration.

##### Tool Call Interface

```
/**
 * Read-only observer for individual tool call events.
 *
 * Provides observation of tool execution without access to conversation history
 * or iteration state. Works in both streaming mode (where the framework manages
 * the tool loop internally) and non-streaming mode (as a lightweight alternative
 * to [ToolLoopInspector] when history/iteration context is not needed).
 *
 * @see ToolLoopInspector for tool loop-level inspection with full conversation context
 */
interface ToolCallInspector {

    /**
     * Called before tool execution starts.
     * Default no-op.
     */
    fun beforeToolCall(context: BeforeToolCallContext) = Unit

    /**
     * Called after tool execution completes (success or failure).
     * Default no-op.
     */
    fun afterToolCall(context: AfterToolCallContext) = Unit
}
```

##### Simple Out-of-Box Tool Call Interceptor

Please refer to `ToolCallLoggingInspector` for collecting tool call metrics.

##### Usage: Tool Call Interceptors

```
 PromptRunner runner = ai.withDefaultLlm()
                .withToolObject(new Tooling())
                .withToolCallInspectors(new ToolCallLoggingInspector(ToolLoopLoggingInspector.LogLevel.INFO, logger));
```

|  |  |
| --- | --- |
|  | Tool Call Interceptors are applicable to both streaming and non-streaming modes. |

### 4.29. Tracking LLM Cost and Usage

Embabel emits an event for every LLM and embedding call your agent makes.
Subscribe to those events to know, in real time, how much each call cost,
which model handled it, and which agent process it belongs to.

#### 4.29.1. The events

Two events are available:

* `LlmInvocationEvent` â emitted once per LLM call.
* `EmbeddingInvocationEvent` â emitted once per embedding call.

Each event exposes:

* `invocation.llmMetadata` (or `embeddingMetadata`) â model name and provider
* `invocation.usage` â token counts
* `invocation.cost()` â computed cost for that call
* `interactionId` â identifier of the originating interaction
* `agentProcess` â the agent process that triggered the call (use `agentProcess.id` to group, `agentProcess.agent.name` to label)

#### 4.29.2. Subscribing to cost events

Implement `AgenticEventListener` and react to the events you care about.
The listener is registered like any other Embabel event listener.

Java
:   ```
    public class OrganizationCostTracker implements AgenticEventListener {

        private final ConcurrentMap<String, DoubleAdder> costPerAgent = new ConcurrentHashMap<>();

        @Override
        public void onProcessEvent(AgentProcessEvent event) {
            if (event instanceof LlmInvocationEvent llm) {
                costPerAgent
                    .computeIfAbsent(llm.getAgentProcess().getAgent().getName(), k -> new DoubleAdder())
                    .add(llm.getInvocation().cost());
            }
        }
    }
    ```

Kotlin
:   ```
    class OrganizationCostTracker : AgenticEventListener {

        private val costPerAgent = ConcurrentHashMap<String, DoubleAdder>()

        override fun onProcessEvent(event: AgentProcessEvent) {
            if (event is LlmInvocationEvent) {
                costPerAgent
                    .computeIfAbsent(event.agentProcess.agent.name) { DoubleAdder() }
                    .add(event.invocation.cost())
            }
        }
    }
    ```

The same pattern works for `EmbeddingInvocationEvent`.

|  |  |
| --- | --- |
|  | Use a thread-safe data structure (as above) for any state your listener accumulates. Several agent processes may emit events at the same time. |

#### 4.29.3. Blocking spending: the Budget Guardrail pattern

Cost events fire **after** the call completes, so they cannot stop the call that just ran.
What they can do is stop the **next** one.

The pattern combines two pieces you already know:

1. **A listener that counts.** Subscribe to `LlmInvocationEvent` and accumulate cost or tokens against the key you care about â agent process id, tenant, end user.
2. **A guardrail that blocks.** A `UserInputGuardRail` reads the counter before the next LLM call. If the budget is exceeded, the guardrail returns a `CRITICAL` validation error and the call never happens.

```
                       LLM call ââââº LlmInvocationEvent ââ
                                                          â¼
                                            counter (per agent / tenant / user)
                                                          â
   next call âââº UserInputGuardRail reads counter âââââââââ
                                â
                       over budget? âââº CRITICAL âââº call blocked
```

The counter lives in your listener; the decision lives in your guardrail.
Embabel wires both into the agent process for you.
See [Working with Guardrails](#reference.guardrails) for how to register a `UserInputGuardRail` and how `CRITICAL` validation errors stop execution.

|  |  |
| --- | --- |
|  | For a hard cap on the agent process itself (e.g. "stop this run after $1 of total spend"), see `EarlyTerminationPolicy` in [The AgentProcess](#reference.agent-process). Use it standalone, or alongside the Budget Guardrail as a safety net. |

### 4.30. Working with Guardrails

Guardrails have become an essential component in agentic AI systems.
They allow you to validate user inputs and LLM responses using configurable policies.
For vendor-supported guardrails, see:

* [Guardrails Hub](https://guardrailsai.com/docs)
* [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)

Embabel provides a framework for building custom guardrails, enabling developers to integrate validation logic of their choice.

#### 4.30.1. Motivation

While you can validate user prompts or thinking blocks using custom validators, Embabel provides a standardized framework through the `withGuardRails` API.
Guardrails can be implemented as POJOs or Spring beans that implement Embabel’s guardrail interfaces.

Common use cases for guardrails:

* **Input validation**: Validate user prompts with common, streaming, or thinking prompt runners
* **Response validation with thinking**: The thinking API provides access to LLM thinking blocks, even when the LLM cannot construct an object
* **Object response validation**: When the LLM constructs an object, you can still validate the output (the content being validated is the object’s JSON representation)
* **Streaming validation**: In streaming mode, `StreamingEvent.Thinking` provides direct access to LLM reasoning content via the `doOnNext` callback (see [Working with Streams](#reference.streaming))

A key benefit of this framework is access to the `Blackboard` object, which allows guardrail logic to consider other entities participating in the agentic workflow.

#### 4.30.2. Concepts

* `UserInputGuardRail` and `AssistantMessageGuardRail` interfaces define guardrails for user inputs and LLM responses, respectively
* Guardrails are registered using the `withGuardRails` API, which can be chained
* Guardrail validation returns a `ValidationResult` object
* Validation errors are sorted by `ValidationSeverity` level and logged at the corresponding level
* A `CRITICAL` severity level causes a `GuardRailViolationException` to be thrown for user input guardrails, preventing the LLM operation from executing
* By design, `createObjectIfPossible` handles exceptions gracefully and completes without constructing an object; however, `GuardRailViolationException` is wrapped inside `ThinkingResponse` when using thinking mode

#### 4.30.3. Customizing Message Combining

In multi-turn conversations, guardrails often need to validate not just a single prompt but an entire conversation history. When `doTransform` or similar methods are called with multiple `UserMessage` objects, each `UserInputGuardRail` receives the full list and must combine them into a single string for validation.

The `combineMessages` method controls how this combination happens. Different guardrails may need different formats:

* A toxicity filter might want all messages concatenated to check the overall tone
* An audit guardrail might want each message tagged with its position in the conversation
* A PII detector might want clear separators to identify which message contains sensitive data

The default implementation joins messages with newlines:

Java
:   ```
    default String combineMessages(List<UserMessage> userMessages) {
        return userMessages.stream()
                .map(UserMessage::getContent)
                .collect(Collectors.joining("\n"));
    }
    ```

Kotlin
:   ```
    fun combineMessages(userMessages: List<UserMessage>): String {
        return userMessages.joinToString(separator = "\n") { message ->
            message.content
        }
    }
    ```

For example, three messages `["Hello", "How are you?", "Tell me about X"]` become:

```
Hello
How are you?
Tell me about X
```

To customize this behavior, override `combineMessages` in your guardrail:

Java
:   ```
    class AuditGuardRail implements UserInputGuardRail {

        @Override
        public @NotNull String getName() {
            return "AuditGuard";
        }

        @Override
        public @NotNull String getDescription() {
            return "Logs conversation with message markers for audit trail";
        }

        @Override
        public @NotNull String combineMessages(@NotNull List<UserMessage> userMessages) {
            // Tag each message with its position for audit logging
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < userMessages.size(); i++) {
                if (i > 0) {
                    result.append("\n");
                }
                result.append("[Turn ").append(i + 1).append("]: ")
                      .append(userMessages.get(i).getContent());
            }
            return result.toString();
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {
            // input now contains: "[Turn 1]: Hello\n[Turn 2]: How are you?\n[Turn 3]: Tell me about X"
            logger.info("Audit trail: {}", input);
            return ValidationResult.VALID;
        }
    }
    ```

Kotlin
:   ```
    class AuditGuardRail : UserInputGuardRail {
        override val name = "AuditGuard"
        override val description = "Logs conversation with message markers for audit trail"

        override fun combineMessages(userMessages: List<UserMessage>): String {
            // Tag each message with its position for audit logging
            return userMessages.mapIndexed { index, message ->
                "[Turn ${index + 1}]: ${message.content}"
            }.joinToString("\n")
        }

        override fun validate(input: String, blackboard: Blackboard): ValidationResult {
            // input now contains: "[Turn 1]: Hello\n[Turn 2]: How are you?\n[Turn 3]: Tell me about X"
            logger.info("Audit trail: {}", input)
            return ValidationResult.VALID
        }
    }
    ```

#### 4.30.4. Example: Blocking LLM Execution with CRITICAL Validation Errors

This example demonstrates how a guardrail with `CRITICAL` severity prevents LLM execution by throwing a `GuardRailViolationException`.

**Step 1: Define the guardrails**

First, define a user input guardrail that returns a `CRITICAL` validation error:

Java
:   ```
    /**
     * A guardrail that blocks execution by returning a CRITICAL validation error.
     */
    class CriticalUserInputGuardRail implements UserInputGuardRail {

        @Override
        public @NotNull String getName() {
            return "CriticalUserInputGuardRail";
        }

        @Override
        public @NotNull String getDescription() {
            return "Blocks execution when critical policy violations are detected";
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {
            // Return a CRITICAL error to block LLM execution
            return new ValidationResult(true, List.of(
                new ValidationError("policy-violation", "Content violates safety policy", ValidationSeverity.CRITICAL)
            ));
        }
    }
    ```

Kotlin
:   ```
    /**
     * A guardrail that blocks execution by returning a CRITICAL validation error.
     */
    class CriticalUserInputGuardRail : UserInputGuardRail {

        override val name = "CriticalUserInputGuardRail"

        override val description = "Blocks execution when critical policy violations are detected"

        override fun validate(input: String, blackboard: Blackboard): ValidationResult {
            // Return a CRITICAL error to block LLM execution
            return ValidationResult(true, listOf(
                ValidationError("policy-violation", "Content violates safety policy", ValidationSeverity.CRITICAL)
            ))
        }
    }
    ```

Next, define an assistant message guardrail to validate LLM responses:

Java
:   ```
    /**
     * A guardrail that validates LLM thinking blocks.
     */
    class ThinkingBlocksGuardRail implements AssistantMessageGuardRail {

        @Override
        public @NotNull String getName() {
            return "ThinkingBlocksGuardRail";
        }

        @Override
        public @NotNull String getDescription() {
            return "Validates LLM thinking blocks for compliance";
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull ThinkingResponse<?> response, @NotNull Blackboard blackboard) {
            logger.info("Validating thinking blocks: {}", response.getThinkingBlocks());
            return new ValidationResult(true, Collections.emptyList());
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {
            return new ValidationResult(true, Collections.emptyList());
        }
    }
    ```

Kotlin
:   ```
    /**
     * A guardrail that validates LLM thinking blocks.
     */
    class ThinkingBlocksGuardRail : AssistantMessageGuardRail {

        override val name = "ThinkingBlocksGuardRail"

        override val description = "Validates LLM thinking blocks for compliance"

        override fun validate(response: ThinkingResponse<*>, blackboard: Blackboard): ValidationResult {
            logger.info("Validating thinking blocks: {}", response.thinkingBlocks)
            return ValidationResult(true, emptyList())
        }

        override fun validate(input: String, blackboard: Blackboard): ValidationResult {
            return ValidationResult(true, emptyList())
        }
    }
    ```

**Step 2: Use the guardrails with a PromptRunner**

Java
:   ```
    // Configure the PromptRunner with guardrails
    PromptRunner runner = ai.withDefaultLlm()  // Example uses claude-sonnet-4-5
            .withToolObject(Tooling.class)
            .withGenerateExamples(true)
            .withGuardRails(new CriticalUserInputGuardRail(), new ThinkingBlocksGuardRail());

    String prompt = """
            What is the hottest month in Florida and provide its temperature.
            The name should be the month name, temperature should be in Fahrenheit.
            """;

    try {
        // Attempt to create an object with thinking
        ThinkingResponse<MonthItem> response = runner
                .thinking()
                .createObject(prompt, MonthItem.class);
    } catch (GuardRailViolationException ex) {
        // CRITICAL validation errors cause this exception to be thrown,
        // preventing the LLM operation from executing
        logger.error("Guardrail blocked execution: {}", ex.getMessage());
    }
    ```

Kotlin
:   ```
    // Configure the PromptRunner with guardrails
    val runner = ai.withDefaultLlm()  // Example uses claude-sonnet-4-5
            .withToolObject(Tooling::class.java)
            .withGenerateExamples(true)
            .withGuardRails(CriticalUserInputGuardRail(), ThinkingBlocksGuardRail())

    val prompt = """
            What is the hottest month in Florida and provide its temperature.
            The name should be the month name, temperature should be in Fahrenheit.
            """.trimIndent()

    try {
        // Attempt to create an object with thinking
        val response = runner
                .thinking()
                .createObject(prompt, MonthItem::class.java)
    } catch (ex: GuardRailViolationException) {
        // CRITICAL validation errors cause this exception to be thrown,
        // preventing the LLM operation from executing
        logger.error("Guardrail blocked execution: {}", ex.message)
    }
    ```

#### 4.30.5. Example: Using Guardrails for Response Analysis

When the LLM cannot construct an object (for example, when the prompt is ambiguous), guardrails can still analyze the LLM’s thinking process. This is useful for understanding why object creation failed or for extracting insights from the reasoning.

**Step 1: Define a simple user input guardrail**

Java
:   ```
    /**
     * A guardrail that logs user input with INFO-level validation messages.
     */
    class LoggingUserInputGuardRail implements UserInputGuardRail {

        @Override
        public @NotNull String getName() {
            return "LoggingUserInputGuardRail";
        }

        @Override
        public @NotNull String getDescription() {
            return "Logs user input for auditing purposes";
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {
            logger.info("Processing user input: {}", input);
            // Return an INFO-level message (does not block execution)
            return new ValidationResult(true, List.of(
                new ValidationError("audit", "Input logged", ValidationSeverity.INFO)
            ));
        }
    }
    ```

Kotlin
:   ```
    /**
     * A guardrail that logs user input with INFO-level validation messages.
     */
    class LoggingUserInputGuardRail : UserInputGuardRail {

        override val name = "LoggingUserInputGuardRail"

        override val description = "Logs user input for auditing purposes"

        override fun validate(input: String, blackboard: Blackboard): ValidationResult {
            logger.info("Processing user input: {}", input)
            // Return an INFO-level message (does not block execution)
            return ValidationResult(true, listOf(
                ValidationError("audit", "Input logged", ValidationSeverity.INFO)
            ))
        }
    }
    ```

**Step 2: Use guardrails with createObjectIfPossible**

Java
:   ```
    // Configure the PromptRunner with chained guardrails
    PromptRunner runner = ai.withDefaultLlm()  // Example uses claude-sonnet-4-5
            .withToolObject(Tooling.class)
            .withGuardRails(new LoggingUserInputGuardRail())
            .withGuardRails(new ThinkingBlocksGuardRail());

    String prompt = "Think about the coldest month in Alaska and its temperature. Provide your analysis.";

    // Use createObjectIfPossible to handle cases where object creation may fail
    ThinkingResponse<MonthItem> response = runner
            .thinking()
            .createObjectIfPossible(prompt, MonthItem.class);

    // The LLM may not be able to construct an object if the prompt is ambiguous
    if (response.getResult() == null) {
        // Analyze the thinking blocks to understand the LLM's reasoning
        logger.info("Object creation not possible. Thinking blocks: {}", response.getThinkingBlocks());
    }
    ```

Kotlin
:   ```
    // Configure the PromptRunner with chained guardrails
    val runner = ai.withDefaultLlm()  // Example uses claude-sonnet-4-5
            .withToolObject(Tooling::class.java)
            .withGuardRails(LoggingUserInputGuardRail())
            .withGuardRails(ThinkingBlocksGuardRail())

    val prompt = "Think about the coldest month in Alaska and its temperature. Provide your analysis."

    // Use createObjectIfPossible to handle cases where object creation may fail
    val response = runner
            .thinking()
            .createObjectIfPossible(prompt, MonthItem::class.java)

    // The LLM may not be able to construct an object if the prompt is ambiguous
    if (response.result == null) {
        // Analyze the thinking blocks to understand the LLM's reasoning
        logger.info("Object creation not possible. Thinking blocks: {}", response.thinkingBlocks)
    }
    ```

When the LLM cannot provide a definitive answer, you might see reasoning like:

```
Since I must be SURE about EVERY field and cannot make assumptions or provide approximate values,
I cannot provide the success structure with confidence.
```

Guardrails can automate further analysis of LLM responses, for example by using semantic text processing tools like [CoreNLP](https://stanfordnlp.github.io/CoreNLP/).

For more examples, see:

```
embabel-agent-autoconfigure/models/embabel-agent-anthropic-autoconfigure/
  src/test/java/com/embabel/agent/config/models/anthropic/LLMAnthropicThinkingIT.java
```

#### 4.30.6. Global Guardrails Configuration

In addition to attaching guardrails per-call via `withGuardRails(…​)`, Embabel supports declaring **global** guardrails through application properties.
A global guardrail is instantiated once at startup and applied to every LLM operation, in addition to any interaction-specific guardrails configured on the `PromptRunner`.

This is useful for cross-cutting safety policies that should always run, regardless of which call site invokes the LLM (PII redaction, profanity filtering, cost limits, audit logging, etc.).

##### Property Configuration

Global guardrails are defined as comma-separated, fully-qualified class names in `application.properties` (or `application.yml`):

```
# Guardrails applied to every user input
embabel.agent.guardrails.user-input=com.example.ProfanityFilter,com.example.LengthValidator

# Guardrails applied to every assistant message
embabel.agent.guardrails.assistant-message=com.example.OutputValidator

# Whether instantiation failures should fail-fast at startup (default: false)
embabel.agent.guardrails.fail-on-error=false
```

Each class must:

* Implement the appropriate interface (`UserInputGuardRail` for `user-input`, `AssistantMessageGuardRail` for `assistant-message`)
* Provide a public no-arg constructor (instances are created via `BeanUtils.instantiateClass`)

|  |  |
| --- | --- |
|  | Guardrails registered through these properties are **plain POJOs**, **not** Spring-managed beans. The registry calls `BeanUtils.instantiateClass(…​)` directly, so:  * `@Autowired`, `@Value`, and constructor injection of Spring beans **do not work** * `@PostConstruct` / `@PreDestroy` lifecycle callbacks are **not invoked** * `ApplicationContextAware`, `BeanNameAware`, and similar `*Aware` callbacks are **not invoked** * Dynamic access patterns (e.g. composing the `name` field from a Spring-backed holder, or pulling a config bean via a static `ApplicationContext` accessor) will fail or return `null` at startup, because the holder may not be initialized yet  If your guardrail genuinely needs Spring dependencies, the recommended pattern is to bridge the `ApplicationContext` through a small `ApplicationContextAware` holder, and have the guardrail look up beans or properties **at validation time** rather than in the constructor (see [Accessing Spring Beans from a POJO Guardrail](#global-guardrails-spring-bridge)). Alternatively, declare the guardrail as a `@Component` and attach it per-call through `withGuardRails(…​)` on the `PromptRunner`. |

##### Accessing Spring Beans from a POJO Guardrail

When a property-registered guardrail must consult Spring beans or environment properties (for example, a cost limit defined in `application.yml`, or a shared `MeterRegistry`), expose the `ApplicationContext` through a static holder and let the guardrail call back into it at validation time.

```
package com.example.observability;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Bridges Spring's ApplicationContext to POJO guardrails instantiated by
 * embabel's GlobalGuardRailsRegistry. Those guardrails are created via
 * BeanUtils.instantiateClass() with a no-arg constructor, so they cannot
 * use @Autowired â they reach back through this holder to look up beans
 * and properties at validation time.
 */
@Component
public class SpringContextHolder implements ApplicationContextAware {

    private static volatile ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        context = applicationContext;
    }

    public static ApplicationContext context() {
        return context;
    }

    public static <T> T getBean(Class<T> type) {
        ApplicationContext ctx = context;
        return ctx != null ? ctx.getBean(type) : null;
    }

    public static String getProperty(String key, String defaultValue) {
        ApplicationContext ctx = context;
        return ctx != null ? ctx.getEnvironment().getProperty(key, defaultValue) : defaultValue;
    }
}
```

A guardrail can then resolve its dependencies lazily, inside `validate(…​)`:

Java
:   ```
    public class CostLimitGuardRail implements UserInputGuardRail {

        @Override
        public @NotNull String getName() {
            return "CostLimitGuardRail";
        }

        @Override
        public @NotNull String getDescription() {
            return "Blocks requests when the monthly LLM budget is exceeded";
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {
            // Look up dependencies at validation time â the holder is wired by then
            CostTracker tracker = SpringContextHolder.getBean(CostTracker.class);
            String budget = SpringContextHolder.getProperty("app.llm.monthly-budget-usd", "100");

            if (tracker != null && tracker.spentThisMonth() > Double.parseDouble(budget)) {
                return new ValidationResult(false, List.of(
                    new ValidationError("budget-exceeded",
                        "Monthly LLM budget exceeded",
                        ValidationSeverity.CRITICAL)
                ));
            }
            return new ValidationResult(true, Collections.emptyList());
        }
    }
    ```

Kotlin
:   ```
    class CostLimitGuardRail : UserInputGuardRail {

        override val name = "CostLimitGuardRail"
        override val description = "Blocks requests when the monthly LLM budget is exceeded"

        override fun validate(input: String, blackboard: Blackboard): ValidationResult {
            // Look up dependencies at validation time â the holder is wired by then
            val tracker = SpringContextHolder.getBean(CostTracker::class.java)
            val budget = SpringContextHolder.getProperty("app.llm.monthly-budget-usd", "100").toDouble()

            if (tracker != null && tracker.spentThisMonth() > budget) {
                return ValidationResult(false, listOf(
                    ValidationError("budget-exceeded",
                        "Monthly LLM budget exceeded",
                        ValidationSeverity.CRITICAL)
                ))
            }
            return ValidationResult(true, emptyList())
        }
    }
    ```

|  |  |
| --- | --- |
|  | Resolve Spring dependencies **inside `validate(…​)`**, not in the constructor or in field initializers. At construction time, the order in which the `SpringContextHolder` bean and the `GlobalGuardRailsRegistry` are processed is not guaranteed, so the static `context` field may still be `null`. By the time `validate(…​)` is invoked the holder is fully wired. |

##### Merging with Interaction-Specific Guardrails

When an LLM operation executes, global guardrails are merged with the interaction-specific guardrails set through `withGuardRails(…​)`:

* Global guardrails always run first, then interaction-specific ones
* Duplicates are removed based on **class identity** (not the `name` field), so a class registered both globally and per-call will be invoked only once
* The deduplication keeps the global instance, ensuring singleton semantics

##### Strict Mode: `fail-on-error`

By default (`fail-on-error=false`), if a configured guardrail cannot be instantiated (typo in the class name, missing no-arg constructor, constructor throws), the error is logged and the application continues with the remaining guardrails.

Setting `fail-on-error=true` causes Spring startup to fail with a `GuardRailInstantiationException` if any of the following occurs:

* The class cannot be loaded
* The class does not implement the expected guardrail interface
* The constructor throws an exception

Strict mode is recommended in production where missing a guardrail must be treated as a deployment error rather than a silent omission.

##### Example: Defining a Global Guardrail

Java
:   ```
    package com.example;

    public class ProfanityFilter implements UserInputGuardRail {

        @Override
        public @NotNull String getName() {
            return "ProfanityFilter";
        }

        @Override
        public @NotNull String getDescription() {
            return "Blocks user input containing profanity";
        }

        @Override
        public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {
            if (containsProfanity(input)) {
                return new ValidationResult(false, List.of(
                    new ValidationError("profanity", "Input contains disallowed terms", ValidationSeverity.CRITICAL)
                ));
            }
            return new ValidationResult(true, Collections.emptyList());
        }

        private boolean containsProfanity(String input) {
            // ... implementation
            return false;
        }
    }
    ```

Kotlin
:   ```
    package com.example

    class ProfanityFilter : UserInputGuardRail {

        override val name = "ProfanityFilter"
        override val description = "Blocks user input containing profanity"

        override fun validate(input: String, blackboard: Blackboard): ValidationResult {
            if (containsProfanity(input)) {
                return ValidationResult(false, listOf(
                    ValidationError("profanity", "Input contains disallowed terms", ValidationSeverity.CRITICAL)
                ))
            }
            return ValidationResult(true, emptyList())
        }

        private fun containsProfanity(input: String): Boolean {
            // ... implementation
            return false
        }
    }
    ```

Once registered in `application.properties`, the guardrail applies to every LLM call â no code changes are needed at the call site:

```
// ProfanityFilter runs automatically â no explicit withGuardRails() needed
val response = ai.withDefaultLlm()
    .createObject("Hello, world", Greeting::class.java)
```

##### Programmatic Access

The registry can also be accessed programmatically, either as an injected Spring bean or via its companion accessor:

Java
:   ```
    // Spring injection
    public class MyService {
        private final GlobalGuardRailsRegistry registry;

        public MyService(GlobalGuardRailsRegistry registry) {
            this.registry = registry;
        }
    }

    // Static access â get() returns null if Spring hasn't initialized the registry yet;
    // the list accessors return an empty list in that case.
    GlobalGuardRailsRegistry registry = GlobalGuardRailsRegistry.get();
    List<UserInputGuardRail> userGuards = GlobalGuardRailsRegistry.getUserInputGuardRails();
    List<AssistantMessageGuardRail> assistantGuards = GlobalGuardRailsRegistry.getAssistantMessageGuardRails();
    ```

Kotlin
:   ```
    // Spring injection
    class MyService(private val registry: GlobalGuardRailsRegistry)

    // Static access â get() returns null if Spring hasn't initialized the registry yet;
    // the list accessors return an empty list in that case.
    val registry = GlobalGuardRailsRegistry.get()
    val userGuards = GlobalGuardRailsRegistry.getUserInputGuardRails()
    val assistantGuards = GlobalGuardRailsRegistry.getAssistantMessageGuardRails()
    ```

#### 4.30.7. Relationship with Other Validation Mechanisms

The Agent API framework supports Jakarta Bean Validation (JSR-380) for domain object constraints. These constraints are injected into the schema and validated during object construction.

In addition, a planned validation framework for Agent Actions will reuse the same data structures as guardrails, including `ValidationResult`, `ValidationError`, and `ContentValidator`.

In summary, guardrails and bean validators are complementary but distinct:

* **Bean validation** ensures objects are well-formed and meet business constraints
* **Guardrails** ensure AI interactions are safe and compliant with policies

Both can be enabled independently and serve different aspects of the AI safety stack.

`@SecureAgentTool` is a third, orthogonal mechanism: it enforces *access control* rather than
content safety or data validity.
Where guardrails ask "is this content acceptable?", `@SecureAgentTool` asks "is this principal
allowed to invoke this agent action at all?"
The two work well together â `@SecureAgentTool` prevents unauthorised principals from calling
a tool, while guardrails validate the inputs and outputs of calls that are permitted.
See [`@SecureAgentTool`](reference.annotations_secure_agent_tool) for details.

### 4.31. Agent and Action Termination

Embabel provides mechanisms to terminate agents and actions early, either gracefully (at the next
checkpoint) or immediately.
This is useful for scenarios like user cancellation, timeout handling, resource limits, or ctitical error
handling.

#### 4.31.1. Choosing Between Signal and Exception

| Mechanism | When to Use | Behavior |
| --- | --- | --- |
| **Graceful (Signal)** | "Let me finish my work, then stop" - side effects need to complete | Terminates at next checkpoint; current operation completes normally |
| **Immediate (Exception)** | "Stop now, nothing left to do" - no further processing needed | Terminates immediately; nothing executes after the exception being thrown |

#### 4.31.2. Agent Termination

Agent termination stops the entire agent process. The process status becomes `TERMINATED`.

##### Graceful Agent Termination (Signal)

Use `terminateAgent()` when the current operation should complete before stopping.
The agent terminates before the next checkpoint tick.

Kotlin
:   ```
      // Signal: "Let me finish my work, then stop the agent"
      @LlmTool(description = "Save all pending work and shutdown")
      fun saveAndShutdown(ctx: ProcessContext): String {
          repository.saveAll(pendingRecords)  // side effect completes
          ctx.terminateAgent("All work saved, shutting down")
          return "Saved ${pendingRecords.size} records"  // tool finishes normally
      }
    ```

##### Immediate Agent Termination (Exception)

Use `TerminateAgentException` when the agent must stop immediately.
No further tool calls or actions execute.

Kotlin
:   ```
      // Exception: "Stop now, nothing left to do"
      @LlmTool(description = "Validate critical prerequisites")
      fun validatePrerequisites(): String {
          if (!authService.hasRequiredPermissions()) {
              throw TerminateAgentException("Missing required permissions")
              // nothing after this runs
          }
          return "Prerequisites validated"
      }
    ```

Java
:   ```
    @LlmTool(description = "Validate critical prerequisites")
    public String validatePrerequisites() {
    if (!authService.hasRequiredPermissions()) {
    throw new TerminateAgentException("Missing required permissions");
    // nothing after this runs
    }
    return "Prerequisites validated";
    }
    ```

#### 4.31.3. Action Termination

Action termination stops only the current action. The agent continues with the next planned action.
This is useful for skipping problematic steps while allowing the overall goal to proceed.

|  |  |
| --- | --- |
|  | For action termination to allow retry, the action must be defined with `canRerun = true`. |

##### Graceful Action Termination (Signal)

Use `terminateAction()` when the current tool call should complete before stopping the action.
The action terminates between tool calls.

|  |  |
| --- | --- |
|  | Graceful action termination only works for LLM-based actions that use a tool loop. For simple transformation actions, use `TerminateActionException` instead. |

Kotlin
:   ```
      // Signal: "Let me finish my work, then stop"
      @LlmTool(description = "Save and shutdown")
      fun saveAndStop(ctx: ProcessContext): String {
          customerRepository.save(record)  // side effect completes
          ctx.terminateAction("Save complete, no more work needed")
          return "Saved"  // tool finishes normally
      }
    ```

Java
:   ```
    import com.embabel.agent.api.annotation.AchievesGoal;
    import com.embabel.agent.api.annotation.Action;
    import com.embabel.agent.api.annotation.Agent;
    import com.embabel.agent.api.annotation.support.AgentMetadataReader;
    import com.embabel.agent.api.common.ActionContext;
    import com.embabel.agent.api.dsl.Frog;
    import com.embabel.agent.core.AgentProcess;
    import com.embabel.agent.core.AgentProcessStatusCode;
    import com.embabel.agent.core.ProcessOptions;
    import com.embabel.agent.core.support.InMemoryBlackboard;
    import com.embabel.agent.core.support.SimpleAgentProcess;
    import com.embabel.agent.domain.io.UserInput;
    import com.embabel.agent.spi.support.DefaultPlannerFactory;
    import org.junit.jupiter.api.Test;

    import java.time.Instant;

    import static com.embabel.agent.api.termination.Termination.terminateAction;
    import static com.embabel.agent.test.integration.IntegrationTestUtils.dummyPlatformServices;
    import static org.assertj.core.api.Assertions.assertThat;

    /**
     * Java test demonstrating the use of {@code terminateAction(processContext, reason)}
     * extension function from Java using static import.
     *
     * <p>This test verifies that the static import syntax works correctly from Java
     * and that graceful ACTION termination signal is cleared after action completes.
     */
    class TerminateActionJavaTest {

        /**
         * Test agent that explicitly calls terminateAction using Java syntax.
         */
        @Agent(description = "Java agent with graceful action termination")
        static class JavaActionTerminatingAgent {

            @Action
            public String firstAction(UserInput input, ActionContext context) {
                context.set("firstActionRan", true);

                // This is the key test: calling terminateAction from Java using static import
                terminateAction(context.getProcessContext(), "Graceful action termination from Java");

                return "first-" + input.getContent();
            }

            @Action
            public Frog secondAction(String input, ActionContext context) {
                context.set("secondActionRan", true);
                return new Frog(input);
            }

            @Action
            @AchievesGoal(description = "Turn input into frog")
            public Frog frogGoal(Frog frog) {
                return frog;
            }
        }
    ```

##### Immediate Action Termination (Exception)

Use `TerminateActionException` when the action must stop immediately.
Remaining tool calls in the current batch are skipped.

Kotlin
:   ```
      // Exception: "Stop now, nothing left to do"
      @LlmTool(description = "Check service health")
      fun checkHealth(): String {
          if (!mcpClient.isConnected("required_service")) {
              throw TerminateActionException("Service unavailable")
              // nothing after this runs
          }
          return "Healthy"
      }
    ```

Java
:   ```
    @LlmTool(description = "Check service health")
    public String checkHealth() {
    if (!mcpClient.isConnected("required_service")) {
    throw new TerminateActionException("Service unavailable");
    // nothing after this runs
    }
    return "Healthy";
    }
    ```

#### 4.31.4. Catching Both Exception Types

Both `TerminateAgentException` and `TerminateActionException` extend `TerminationException`,
allowing you to catch them together:

```
  try {
      tool.execute()
  } catch (e: TerminationException) {
      logger.info("Terminated: ${e.reason}")
      // Handle both agent and action termination
  }
```

#### 4.31.5. Summary

| Scope | Mechanism | Method/Exception | Use Case |
| --- | --- | --- | --- |
| Agent | Graceful | `processContext.terminateAgent(reason)` | "Finish current work, then stop agent" |
| Agent | Immediate | `throw TerminateAgentException(reason)` | "Stop now - critical error, no recovery" |
| Action | Graceful | `processContext.terminateAction(reason)` | "Finish current tool, then stop action" |
| Action | Immediate | `throw TerminateActionException(reason)` | "Stop now - try different approach" |

### 4.32. Customizing Embabel

#### 4.32.1. Adding LLMs

You can add custom LLMs as Spring beans by implementing the `LlmService` interface.
Embabel provides `SpringAiLlmService` for wrapping Spring AI `ChatModel` instances.

##### Using `SpringAiLlmService`

`SpringAiLlmService` implements the `LlmService` interface and provides framework-agnostic LLM operations
including support for the Embabel tool loop and message sender abstraction.

Java
:   ```
    @Configuration
    public class LlmsConfig {
        @Bean
        public LlmService<?> myLlm() {
            org.springframework.ai.chat.model.ChatModel chatModel = ...
            return new SpringAiLlmService(
                    "myChatModel",              (1)
                    "myChatModelProvider",      (2)
                    chatModel)                  (3)
                .withOptionsConverter(new MyLlmOptionsConverter()) (4)
                .withKnowledgeCutoffDate(LocalDate.of(2025, 4, 1)); (5)
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class LlmsConfig {
        @Bean
        fun myLlm(): LlmService<*> {
            val chatModel: org.springframework.ai.chat.model.ChatModel = ...
            return SpringAiLlmService(
                    "myChatModel",              (1)
                    "myChatModelProvider",      (2)
                    chatModel)                  (3)
                .withOptionsConverter(MyLlmOptionsConverter()) (4)
                .withKnowledgeCutoffDate(LocalDate.of(2025, 4, 1)) (5)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | The name of the LLM (used for model selection). |
| **2** | The provider name, such as "OpenAI" or "Anthropic". |
| **3** | The Spring AI `ChatModel` instance. |
| **4** | Customize with an `OptionsConverter` implementation to convert Embabel `LlmOptions` to Spring AI `ChatOptions`. |
| **5** | Set the knowledge cutoff date if available. |

##### LLM Configuration Options

`SpringAiLlmService` supports the following configuration:

* name (required)
* provider, such as "Mistral" (required)
* `OptionsConverter` to convert Embabel `LlmOptions` to Spring AI `ChatOptions`
* **knowledge cutoff date** (if available)
* any additional `PromptContributor` objects to be used in all LLM calls.
  If knowledge cutoff date is provided, add the `KnowledgeCutoffDate` prompt contributor.
* pricing model (if available)

A common requirement is to add an OpenAI-compatible LLM.
This can be done by extending the `OpenAiCompatibleModelFactory` class as follows:

Java
:   ```
    @Configuration
    public class CustomOpenAiCompatibleModels extends OpenAiCompatibleModelFactory {

        public CustomOpenAiCompatibleModels(
                @Value("${MY_BASE_URL:#{null}}") String baseUrl,
                @Value("${MY_API_KEY}") String apiKey,
                ObservationRegistry observationRegistry) {
            super(baseUrl, apiKey, observationRegistry);
        }

        @Bean
        public LlmService<?> myGreatModel() {
            // Call superclass method
            return openAiCompatibleLlm(
                "my-great-model",
                "me",
                LocalDate.of(2025, 1, 1),
                new PerTokenPricingModel(0.40, 1.6)
            );
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class CustomOpenAiCompatibleModels(
        @Value("\${MY_BASE_URL:#{null}}")
        baseUrl: String?,
        @Value("\${MY_API_KEY}")
        apiKey: String,
        observationRegistry: ObservationRegistry,
    ) : OpenAiCompatibleModelFactory(baseUrl = baseUrl, apiKey = apiKey, observationRegistry = observationRegistry) {

        @Bean
        fun myGreatModel(): LlmService<*> {
            // Call superclass method
            return openAiCompatibleLlm(
                model = "my-great-model",
                provider = "me",
                knowledgeCutoffDate = LocalDate.of(2025, 1, 1),
                pricingModel = PerTokenPricingModel(
                    usdPer1mInputTokens = .40,
                    usdPer1mOutputTokens = 1.6,
                )
            )
        }
    }
    ```

#### 4.32.2. Adding embedding models

Embedding models can also be added as beans of the Embabel type `EmbeddingService`.
Use the `SpringAiEmbeddingService` class to wrap a Spring AI `EmbeddingModel`.

Typically, this is done in an `@Configuration` class like this:

Java
:   ```
    @Configuration
    public class EmbeddingModelsConfig {
        @Bean
        public EmbeddingService myEmbeddingModel() {
            org.springframework.ai.embedding.EmbeddingModel embeddingModel = ...
            return new SpringAiEmbeddingService(
                    "myEmbeddingModel",
                    "myEmbeddingModelProvider",
                    embeddingModel);
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class EmbeddingModelsConfig {
        @Bean
        fun myEmbeddingModel(): EmbeddingService {
            val embeddingModel: org.springframework.ai.embedding.EmbeddingModel = ...
            return SpringAiEmbeddingService(
                    "myEmbeddingModel",
                    "myEmbeddingModelProvider",
                    embeddingModel)
        }
    }
    ```

#### 4.32.3. Bring Your Own Key (BYOK)

By default, Embabel resolves LLMs through autoconfiguration: you set one or more API keys as an
environment variable or property (e.g. `ANTHROPIC_API_KEY`), and the relevant autoconfigure
module registers a pool of `LlmService` beans at startup.
This is the right approach for a platform-level key shared across all users.

BYOK is for cases where the key is not known at startup, or where you want to resolve an
`LlmService` on the fly:

* **User-supplied keys** â each user provides their own API key; the application must validate
  it and wire it into the prompt runner for that session.
* **End-to-end testing** â spin up a real `LlmService` with a dedicated test key outside a
  full Spring context.
* **Multi-tenant or cost-controlled apps** â select a provider dynamically based on per-tenant
  configuration or available quota.

Embabel provides factory classes that validate a key and return a ready `LlmService`,
plus a `detectProvider()` utility that concurrently probes multiple providers and returns
the first that accepts the key.

|  |  |
| --- | --- |
|  | `buildValidated()` and `detectProvider()` handle key validation only. Embabel does not store, log, or otherwise manage the key â the validated `LlmService` is returned to the caller, who is responsible for secure key handling: transmission over HTTPS only, no plaintext logging, limiting key lifetime, and revoking cached services on logout or key rotation. |

##### Building a validated service (known provider)

Use this when the provider is already known â for example, a per-provider field in a settings UI.

```
// Anthropic
val service: LlmService<*> = AnthropicModelFactory(apiKey = userKey).buildValidated()

// OpenAI
val service: LlmService<*> = OpenAiCompatibleModelFactory.openAi(userKey).buildValidated()

// DeepSeek (OpenAI-compatible endpoint)
val service: LlmService<*> = OpenAiCompatibleModelFactory.deepSeek(userKey).buildValidated()

// Mistral (OpenAI-compatible endpoint)
val service: LlmService<*> = OpenAiCompatibleModelFactory.mistral(userKey).buildValidated()

// Gemini (OpenAI-compatible endpoint)
val service: LlmService<*> = OpenAiCompatibleModelFactory.gemini(userKey).buildValidated()
```

`buildValidated()` makes a single probe call with no retries.
On success it returns a production `LlmService`; on failure it throws `InvalidApiKeyException`.

##### Auto-detecting the provider

Use this when a user pastes a key without specifying a provider â for example, a sign-up flow
that accepts keys from any supported provider.

`detectProvider()` races the candidates concurrently using virtual threads and returns the
first `LlmService` that validates successfully. The detected provider is available as
`service.provider` on the result.

```
val service: LlmService<*> = detectProvider(
    AnthropicModelFactory(apiKey = userKey),
    OpenAiCompatibleModelFactory.openAi(userKey),
    OpenAiCompatibleModelFactory.deepSeek(userKey),
    OpenAiCompatibleModelFactory.mistral(userKey),
    OpenAiCompatibleModelFactory.gemini(userKey),
)
val detectedProvider: String = service.provider
```

A single-argument call is valid â it validates against one provider without concurrency,
which is the right path for a settings flow where the provider is known but you still want
`detectProvider’s consistent error handling.

```
val service: LlmService<*> = detectProvider(AnthropicModelFactory(apiKey = userKey))
```

If all candidates throw `InvalidApiKeyException`, `detectProvider` also throws
`InvalidApiKeyException`.

##### Overriding the validation model

Each factory validates the key using a default model (e.g. `gpt-4.1-mini` for OpenAI,
`claude-haiku-4-5` for Anthropic). Override this if the key only grants access to a
specific set of models:

```
// OpenAI â use a different model tier for the probe
OpenAiCompatibleModelFactory.openAi(userKey)
    .validating(OpenAiModels.GPT_41_NANO, OpenAiModels.PROVIDER)

// Anthropic â set validation model at construction time
AnthropicModelFactory(apiKey = userKey, validationModel = AnthropicModels.CLAUDE_SONNET_4_5)
```

##### Adding support for another provider

Any provider that exposes an OpenAI-compatible HTTP API can be added as a one-liner extension
function on `OpenAiCompatibleModelFactory.Companion`:

```
fun OpenAiCompatibleModelFactory.Companion.acme(apiKey: String) =
    OpenAiCompatibleModelFactory.byok(
        baseUrl = "https://api.acme.example.com/v1",
        apiKey = apiKey,
        validationModel = "acme-small",    (1)
        validationProvider = "Acme",       (2)
    )
```

|  |  |
| --- | --- |
| **1** | The cheapest model available on the provider, used for the key-validation probe. |
| **2** | The provider name; returned as `service.provider` after detection. |

The extension function integrates with `detectProvider` like any built-in factory:

```
val service = detectProvider(
    AnthropicModelFactory(apiKey = userKey),
    OpenAiCompatibleModelFactory.openAi(userKey),
    OpenAiCompatibleModelFactory.acme(userKey),
)
```

##### Using the validated service

Once you have an `LlmService`, pass it directly to `PromptRunner` or `Ai` via
`withLlmService()`:

Java
:   ```
    LlmService<?> userLlm = ... // from buildValidated() or detectProvider()
    promptRunner
        .withLlmService(userLlm)
        .creating(MyOutput.class)
        .create(messages);
    ```

Kotlin
:   ```
    val userLlm: LlmService<*> = ... // from buildValidated() or detectProvider()
    promptRunner
        .withLlmService(userLlm)
        .creating(MyOutput::class.java)
        .create(messages)
    ```

Internally this flows through the same model selection path as all other LLM resolution via
`PreResolvedModelSelectionCriteria` â no separate resolution path is needed.

##### Error handling

```
try {
    val service = detectProvider(
        AnthropicModelFactory(apiKey = userKey),
        OpenAiCompatibleModelFactory.openAi(userKey),
    )
    // store or use service
} catch (e: InvalidApiKeyException) {
    // return 401 / surface error to user
    // no Spring AI types to unwrap
}
```

`InvalidApiKeyException` is in `com.embabel.common.byok` and carries no provider-specific
implementation details.

##### Security considerations

The BYOK factories validate keys and return a ready `LlmService` â key lifecycle management
is entirely the caller’s responsibility.

As a reference implementation, Guide holds keys in server-side memory only (`UserKeyStore`).
When a key is validated, the client receives an AES-256-GCM encrypted blob â keyed by a
secret known only to the server â for local-storage caching. A stolen blob is useless without
the server’s decryption key. On page reload the client sends the blob back; the server
decrypts it and restores the in-memory key. Keys are never written to disk or a database.

|  |  |
| --- | --- |
|  | If you need to implement support for a provider not covered by the built-in factories, see [Advanced: Custom LLM Integration](#reference.llms.custom-integration). |

#### 4.32.4. Configuration via `application.properties` or `application.yml`

You can specify Spring configuration, your own configuration and Embabel configuration in the regular Spring configuration files.
Profile usage will work as expected.

#### 4.32.5. Customizing logging

You can customize logging as in any Spring application.

For example, in `application.properties` you can set properties like:

```
logging.level.com.embabel.agent.a2a=DEBUG
```

You can also configure logging via a `logback-spring.xml` file if you have more sophisticated requirements.

See the [Spring Boot Logging](https://docs.spring.io/spring-boot/reference/features/logging.html) reference.

By default, many Embabel examples use personality-based logging experiences such as Star Wars.
You can disable this by updating application.properties accordingly.

```
embabel.agent.logging.personality=severance
```

Remove the `embabel.agent.logging.personality` key to disable personality-based logging.

As all logging results from listening to events via an `AgenticEventListener`, you can also easily create your own customized logging.

### 4.33. Integrations

#### 4.33.1. Model Context Protocol (MCP)

##### Publishing

###### Overview

Embabel Agent can expose your agents as MCP servers, making them available to external MCP clients such as Claude Desktop, VS Code extensions, or other MCP-compatible applications.
The framework provides automatic publishing of agent goals as tools and prompts without requiring manual configuration.

###### Server Configuration

Configure MCP server functionality in your `application.yml`.
The server type determines the execution mode:

```
spring:
  ai:
    mcp:
      server:
        type: SYNC  # or ASYNC
```

###### Server Types

Embabel Agent supports two MCP server execution modes controlled by the `spring.ai.mcp.server.type` property:

**SYNC Mode** (Default)
:   * Blocking operations wrapped in reactive streams
    * Simpler to develop and debug
    * Suitable for most use cases
    * Better error handling and logging

```
spring:
  ai:
    mcp:
      server:
        type: SYNC
```

**ASYNC Mode**
:   * True non-blocking reactive operations
    * Higher throughput for concurrent requests
    * More complex error handling
    * Suitable for high-performance scenarios

```
spring:
  ai:
    mcp:
      server:
        type: ASYNC
```

###### Transport Protocol

Embabel Agent uses **SSE (Server-Sent Events) transport**, exposing your MCP server at `localhost:8080/sse`.
This is compatible with Claude Desktop, MCP Inspector, Cursor, and most desktop MCP clients.

**Clients requiring Streamable HTTP**
:   Some clients (e.g., OpenWebUI) require Streamable HTTP transport instead of SSE.
    Use the `mcpo` proxy to bridge your SSE server:

```
uvx mcpo --port 8000 --server-type sse -- http://localhost:8080/sse
```

Then connect your client to `localhost:8000`.

###### Automatic Publishing

**Tools**
:   Agent goals are automatically published as MCP tools when annotated with `@Export(remote = true)`.
    The `PerGoalMcpToolExportCallbackPublisher` automatically discovers and exposes these goals without any additional configuration.

**Prompts**
:   Prompts are automatically generated for each goal’s starting input types through the `PerGoalStartingInputTypesPromptPublisher`.
    This provides ready-to-use prompt templates based on your agent definitions.

###### Exposing Agent Goals as Tools

Agent goals become MCP tools automatically when annotated with `@Export`:

Java
:   ```
    @Agent(
        goal = "Provide weather information",
        backstory = "Weather service agent"
    )
    public class WeatherAgent {

        @Goal
        @Export(remote = true)  // Automatically becomes MCP tool
        public String getWeather(
            @Param("location") String location,
            @Param("units") String units
        ) {
            return "Weather for " + location + " in " + units;
        }

        @Goal
        public String internalMethod() {
            // Not exposed to MCP (no @Export annotation)
            return "Internal use only";
        }
    }
    ```

Kotlin
:   ```
    @Agent(
        goal = "Provide weather information",
        backstory = "Weather service agent"
    )
    class WeatherAgent {

        @Goal
        @Export(remote = true)  // Automatically becomes MCP tool
        fun getWeather(
            @Param("location") location: String,
            @Param("units") units: String
        ): String {
            return "Weather for $location in $units"
        }

        @Goal
        fun internalMethod(): String {
            // Not exposed to MCP (no @Export annotation)
            return "Internal use only"
        }
    }
    ```

###### Exposing Embabel `ToolObject` and `LlmReference` types as tools

A common requirement is to expose existing Embabel functionality via MCP.
For example, an `LlmReference` might be added to a `PromptRunner` but might also be used as an external tool via MCP.

To do this, use `McpToolExport` to create a bean of type `McpToolExportCallbackPublisher`.

For example, to expose a `ToolishRag` LLM reference as an MCP tool, define a Spring configuration class as follows:

Java
:   ```
    @Configuration
    public class RagMcpTools {

        @Bean
        McpToolExport ragTools( (1)
                SearchOperations searchOperations) {
            var toolishRag = new ToolishRag(
                    "docs",
                    "Embabel docs",
                    searchOperations
            );
            return McpToolExport.fromLlmReference(toolishRag); (2)
        }
    }
    ```

Kotlin
:   ```
    @Configuration
    class RagMcpTools {

        @Bean
        fun ragTools( (1)
            searchOperations: SearchOperations
        ): McpToolExport {
            val toolishRag = ToolishRag(
                "docs",
                "Embabel docs",
                searchOperations
            )
            return McpToolExport.fromLlmReference(toolishRag) (2)
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Your bean should be of type `McpToolExport` |
| **2** | Use `McpToolExport.fromLlmReference` to return the instance |

###### Naming Strategies

When exporting tools, you can control how tool names are transformed using a naming strategy.
This is useful for namespacing tools when exporting from multiple sources to avoid naming conflicts.

**Using ToolObject with a naming strategy:**

Java
:   ```
    @Bean
    public McpToolExport prefixedTools() {
        return McpToolExport.fromToolObject(
            new ToolObject(
                List.of(myToolInstance),
                name -> "myservice_" + name  (1)
            )
        );
    }
    ```

Kotlin
:   ```
    @Bean
    fun prefixedTools(): McpToolExport {
        return McpToolExport.fromToolObject(
            ToolObject(
                objects = listOf(myToolInstance),
                namingStrategy = { "myservice_$it" }  (1)
            )
        )
    }
    ```

|  |  |
| --- | --- |
| **1** | All tool names will be prefixed with `myservice_` |

Common naming strategies include:

* **Prefix**: `{ "namespace_$it" }` - adds a prefix to avoid conflicts
* **Uppercase**: `{ it.uppercase() }` - converts to uppercase
* **Identity**: `StringTransformer.IDENTITY` - preserves original names (default)

**LlmReference naming:**

When using `fromLlmReference`, the reference’s built-in naming strategy is applied automatically.
This prefixes tool names with the lowercased, normalized reference name.
For example, an `LlmReference` named "MyAPI" will prefix all tools with `myapi_`.

Java
:   ```
    // Reference named "WeatherService" will prefix tools with "weatherservice_"
    var reference = new MyWeatherReference();  // name = "WeatherService"
    McpToolExport.fromLlmReference(reference);
    // Tool "getWeather" becomes "weatherservice_getWeather"
    ```

Kotlin
:   ```
    // Reference named "WeatherService" will prefix tools with "weatherservice_"
    val reference = MyWeatherReference()  // name = "WeatherService"
    McpToolExport.fromLlmReference(reference)
    // Tool "getWeather" becomes "weatherservice_getWeather"
    ```

**Exporting multiple sources with different prefixes:**

Java
:   ```
    @Bean
    public McpToolExport multiSourceTools() {
        return McpToolExport.fromToolObjects(
            List.of(
                new ToolObject(
                    List.of(weatherTools),
                    name -> "weather_" + name
                ),
                new ToolObject(
                    List.of(stockTools),
                    name -> "stocks_" + name
                )
            )
        );
    }
    ```

Kotlin
:   ```
    @Bean
    fun multiSourceTools(): McpToolExport {
        return McpToolExport.fromToolObjects(
            listOf(
                ToolObject(
                    objects = listOf(weatherTools),
                    namingStrategy = { "weather_$it" }
                ),
                ToolObject(
                    objects = listOf(stockTools),
                    namingStrategy = { "stocks_$it" }
                )
            )
        )
    }
    ```

###### Filtering Tools

You can filter which tools are exported using the `filter` property on `ToolObject`:

Java
:   ```
    @Bean
    public McpToolExport filteredTools() {
        return McpToolExport.fromToolObject(
            new ToolObject(
                List.of(myToolInstance),
                StringTransformer.IDENTITY,
                name -> name.startsWith("public_")  (1)
            )
        );
    }
    ```

Kotlin
:   ```
    @Bean
    fun filteredTools(): McpToolExport {
        return McpToolExport.fromToolObject(
            ToolObject(
                objects = listOf(myToolInstance),
                filter = { it.startsWith("public_") }  (1)
            )
        )
    }
    ```

|  |  |
| --- | --- |
| **1** | Only tools whose names start with `public_` will be exported |

You can combine naming strategies and filters:

Java
:   ```
    @Bean
    public McpToolExport combinedTools() {
        return McpToolExport.fromToolObject(
            new ToolObject(
                List.of(myToolInstance),
                name -> "api_" + name,
                name -> !name.startsWith("internal")  (1)
            )
        );
    }
    ```

Kotlin
:   ```
    @Bean
    fun combinedTools(): McpToolExport {
        return McpToolExport.fromToolObject(
            ToolObject(
                objects = listOf(myToolInstance),
                namingStrategy = { "api_$it" },
                filter = { !it.startsWith("internal") }  (1)
            )
        )
    }
    ```

|  |  |
| --- | --- |
| **1** | The filter is applied to the original tool name before the naming strategy transforms it |

###### Exposing Tools on Spring Components in Spring AI style

It is also possible to expose tools on Spring components as with regular Spring AI.

For example:

Java
:   ```
    @Component
    public class CalculatorTools {

        @McpTool(name = "add", description = "Add two numbers together")
        public int add(
                @McpToolParam(description = "First number", required = true) int a,
                @McpToolParam(description = "Second number", required = true) int b) {
            return a + b;
        }

        @McpTool(name = "multiply", description = "Multiply two numbers")
        public double multiply(
                @McpToolParam(description = "First number", required = true) double x,
                @McpToolParam(description = "Second number", required = true) double y) {
            return x * y;
        }
    }
    ```

Kotlin
:   ```
    @Component
    class CalculatorTools {

        @McpTool(name = "add", description = "Add two numbers together")
        fun add(
            @McpToolParam(description = "First number", required = true) a: Int,
            @McpToolParam(description = "Second number", required = true) b: Int
        ): Int {
            return a + b
        }

        @McpTool(name = "multiply", description = "Multiply two numbers")
        fun multiply(
            @McpToolParam(description = "First number", required = true) x: Double,
            @McpToolParam(description = "Second number", required = true) y: Double
        ): Double {
            return x * y
        }
    }
    ```

Of course, you can inject the Embabel `Ai` interface to help do the work of the tools if you wish, or invoke other agents from within the tool methods.

For further information, see the [Spring AI MCP Annotations Reference](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-annotations-overview.html).

###### Server Architecture

The MCP server implementation uses several design patterns:

**Template Method Pattern**
:   * `AbstractMcpServerConfiguration` provides common initialization logic
    * Concrete implementations (`McpSyncServerConfiguration`, `McpAsyncServerConfiguration`) handle mode-specific details

**Strategy Pattern**
:   * Server strategies abstract sync vs async operations
    * Mode-specific implementations handle tool, resource, and prompt management

**Publisher Pattern**
:   * Tools, resources, and prompts are discovered through publisher interfaces
    * Automatic registration and lifecycle management
    * Event-driven initialization ensures proper timing

###### Built-in Tools

Every MCP server includes a built-in `helloBanner` tool that displays server information:

```
{
  "type": "banner",
  "mode": "SYNC",
  "lines": [
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    "Embabel Agent MCP SYNC Server",
    "Version: 0.3.0-SNAPSHOT",
    "Java: 21.0.2+13-LTS-58",
    "Started: 2025-01-17T14:23:47.785Z",
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  ]
}
```

##### Security

Embabel MCP servers support two complementary layers of security that work together.
Think of them like a building with a reception desk and locked office doors: the HTTP filter
chain is the reception desk that turns away anyone without a badge, and `@SecureAgentTool`
is the locked door on each individual office that checks what the badge actually permits.

###### Layer 1 â HTTP transport (filter chain)

All requests to MCP endpoints (`/sse/`, `/mcp/`, `/message/**`) must carry a valid JWT
Bearer token or they are rejected with `401 Unauthorized` before the GOAP planner is invoked.

Configure a `SecurityFilterChain` and a JWT resource server in your Spring Security setup:

Kotlin
:   ```
    @Configuration
    @EnableWebSecurity
    class McpSecurityConfiguration {

        @Bean
        fun mcpFilterChain(http: HttpSecurity): SecurityFilterChain {
            http
                .securityMatcher("/sse/**", "/mcp/**", "/message/**")
                .authorizeHttpRequests { it.anyRequest().authenticated() }
                .sessionManagement {
                    it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                }
                .oauth2ResourceServer { oauth2 ->
                    oauth2.jwt { jwt ->
                        jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
                    }
                }
                .csrf { it.disable() }
            return http.build()
        }

        @Bean
        fun jwtAuthenticationConverter(): JwtAuthenticationConverter {
            val authoritiesConverter = JwtGrantedAuthoritiesConverter().apply {
                setAuthoritiesClaimName("authorities")
                setAuthorityPrefix("")  (1)
            }
            return JwtAuthenticationConverter().apply {
                setJwtGrantedAuthoritiesConverter(authoritiesConverter)
            }
        }
    }
    ```

|  |  |
| --- | --- |
| **1** | Empty prefix means JWT claim values like `news:read` map directly to Spring Security authorities, so `hasAuthority('news:read')` in a `@SecureAgentTool` expression works without any `SCOPE_` prefix. |

Configure JWT validation in `application.yml`:

```
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          public-key-location: classpath:keys/public.pem  # local dev
          jws-algorithms: RS256
          # For production, use issuer-uri or jwk-set-uri instead
```

###### Layer 2 â Method-level (`@SecureAgentTool`)

Enforces per-action authorization inside the GOAP execution pipeline, after the HTTP layer
has validated the token.
Place `@SecureAgentTool` on the `@Agent` class to protect every `@Action` in that agent:

Kotlin
:   ```
    @Agent(description = "Curated news digest agent")
    @SecureAgentTool("hasAuthority('news:read')")  (1)
    class NewsDigestAgent {

        @Action
        fun extractTopic(userInput: UserInput, context: OperationContext): NewsTopic { ... } (2)

        @AchievesGoal(description = "Produce news digest",
                      export = Export(remote = true, name = "newsDigest",
                                      startingInputTypes = [UserInput::class]))
        @Action
        fun produceDigest(topic: NewsTopic, context: OperationContext): NewsDigest { ... }  (2)
    }
    ```

Java
:   ```
    @Agent(description = "Curated news digest agent")
    @SecureAgentTool("hasAuthority('news:read')")  (1)
    public class NewsDigestAgent {

        @Action
        public NewsTopic extractTopic(UserInput userInput, OperationContext context) { ... } (2)

        @AchievesGoal(description = "Produce news digest",
                      export = @Export(remote = true, name = "newsDigest",
                                       startingInputTypes = {UserInput.class}))
        @Action
        public NewsDigest produceDigest(NewsTopic topic, OperationContext context) { ... }  (2)
    }
    ```

|  |  |
| --- | --- |
| **1** | Class-level annotation applies to every `@Action` in this agent. |
| **2** | Both `extractTopic` (the intermediate step) and `produceDigest` (the goal action) require `news:read` â without class-level security, intermediate actions run freely before the goal action’s check fires, potentially burning LLM tokens on an unauthorised request. |

See [`@SecureAgentTool`](reference.annotations_secure_agent_tool) for the full annotation
reference including supported SpEL expressions and method-level override behaviour.

###### Dependency

```
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter-mcpserver-security</artifactId>
    <version>${embabel-agent.version}</version>
</dependency>
```

The starter auto-configures `SecureAgentToolAspect` and wires the Spring Security
`MethodSecurityExpressionHandler`. No additional `@EnableMethodSecurity` is required.

##### Consuming

Embabel Agent can consume external MCP servers as tool sources, automatically organizing them into Tool Groups that agents can use.

###### Docker Tools Integration

###### Configuration Approaches

**Docker MCP Gateway** (Recommended)
:   Uses Docker Desktop’s MCP Toolkit extension as a single gateway to multiple tools:

```
spring:
  ai:
    mcp:
      client:
        type: SYNC
        stdio:
          connections:
            docker-mcp:
              command: docker
              args: [mcp, gateway, run]
```

**Individual Containers**
:   Run each MCP server as a separate Docker container:

```
spring:
  ai:
    mcp:
      client:
        type: SYNC
        stdio:
          connections:
            brave-search-mcp:
              command: docker
              args: [run, -i, --rm, -e, BRAVE_API_KEY, mcp/brave-search]
              env:
                BRAVE_API_KEY: ${BRAVE_API_KEY}
```

###### Available Tool Groups

Tool Groups are conditionally created based on configured MCP connections using `@ConditionalOnMcpConnection`:

| Tool Group | Required Connections | Capabilities |
| --- | --- | --- |
| Web Tools | `brave-search-mcp`, `fetch-mcp`, `wikipedia-mcp`, or `docker-mcp` | Web search, URL fetching, Wikipedia queries |
| Maps | `google-maps-mcp` or `docker-mcp` | Geocoding, directions, place search |
| Browser Automation | `puppeteer-mcp` or `docker-mcp` | Page navigation, screenshots, form interaction |
| GitHub | `github-mcp` or `docker-mcp` | Issues, pull requests, comments |

###### How It Works

The `@ConditionalOnMcpConnection` annotation checks for configured connections at startup:

Java
:   ```
    @Bean
    @ConditionalOnMcpConnection({"github-mcp", "docker-mcp"})  (1)
    public ToolGroup githubToolsGroup() {
        return new McpToolGroup(
            CoreToolGroups.GITHUB_DESCRIPTION,
            "docker-github",
            mcpSyncClients,
            tool -> tool.toolDefinition().name().contains("create_issue")  (2)
        );
    }
    ```

Kotlin
:   ```
    @Bean
    @ConditionalOnMcpConnection("github-mcp", "docker-mcp")  (1)
    fun githubToolsGroup(): ToolGroup {
        return McpToolGroup(
            description = CoreToolGroups.GITHUB_DESCRIPTION,
            name = "docker-github",
            clients = mcpSyncClients,
            filter = { it.toolDefinition.name().contains("create_issue") }  (2)
        )
    }
    ```

|  |  |
| --- | --- |
| **1** | Bean created if **any** listed connection is configured |
| **2** | Filter selects which MCP tools belong to this group |

###### Custom Tool Groups

Define custom groups via configuration properties:

```
embabel:
  agent:
    platform:
      tools:
        includes:
          my-tools:
            description: "Custom tool collection"
            provider: "MyOrg"
            tools:
              - tool_name_suffix
```

#### 4.33.2. A2A

#### 4.33.3. Observability

Embabel Agent provides a unified observability module that automatically traces agent lifecycle, actions, LLM calls, tool invocations, and more â with zero code changes.
It integrates with any OpenTelemetry-compatible backend (Zipkin, Langfuse, Jaeger, Prometheus, etc.).

##### Setup

Add the observability starter to your `pom.xml`:

```
<dependency>
    <groupId>com.embabel.agent</groupId>
    <artifactId>embabel-agent-starter-observability</artifactId>
    <version>${embabel-agent.version}</version>
</dependency>
```

Then add an exporter dependency. For example, Zipkin:

```
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-exporter-zipkin</artifactId>
</dependency>
```

Or Langfuse for LLM-focused observability:

```
<dependency>
    <groupId>com.quantpulsar</groupId>
    <artifactId>opentelemetry-exporter-langfuse</artifactId>
    <version>0.4.0</version>
</dependency>
```

|  |  |
| --- | --- |
|  | You can use multiple exporters simultaneously (e.g., Langfuse for traces + Prometheus for metrics). |

##### Configuration

Enable observability and configure your exporter in `application.yml`:

```
embabel:
  observability:
    enabled: true
    service-name: my-agent-app

management:
  tracing:
    enabled: true
    sampling:
      probability: 1.0

  # Zipkin
  zipkin:
    tracing:
      endpoint: http://localhost:9411/api/v2/spans
```

For Langfuse:

```
management:
  langfuse:
    enabled: true
    endpoint: https://cloud.langfuse.com/api/public/otel  # or self-hosted URL
    public-key: pk-lf-...
    secret-key: sk-lf-...
```

##### What Gets Traced

All tracing is automatic once the module is on the classpath.
The following events are captured as OpenTelemetry spans, organized in a parent-child hierarchy:

```
Agent: CustomerServiceAgent (trace root)
âââ planning:formulated [iteration=1, actions=3]
âââ Action: AnalyzeRequest
â   âââ ChatModel: gpt-4 (Spring AI)
â       âââ tool:searchKnowledgeBase
âââ Action: GenerateResponse
â   âââ ChatModel: gpt-4 (Spring AI)
âââ goal:achieved [RequestProcessed]
âââ status: completed [duration=2340ms]
```

##### Tracing Configuration Properties

All tracing options are enabled by default and can be toggled individually:

| Property | Default | Description |
| --- | --- | --- |
| `embabel.observability.enabled` | `true` | Master switch for observability |
| `embabel.observability.service-name` | `embabel-agent` | Service name in traces |
| `embabel.observability.trace-agent-events` | `true` | Agent lifecycle (creation, execution, completion, failures) |
| `embabel.observability.trace-tool-calls` | `true` | Tool invocations with input/output |
| `embabel.observability.trace-tool-loop` | `true` | Tool loop execution |
| `embabel.observability.trace-llm-calls` | `true` | LLM calls with token usage |
| `embabel.observability.trace-planning` | `true` | Planning and replanning iterations |
| `embabel.observability.trace-state-transitions` | `true` | Workflow state changes |
| `embabel.observability.trace-lifecycle-states` | `true` | WAITING, PAUSED, STUCK states |
| `embabel.observability.trace-rag` | `true` | RAG events (request, response, pipeline) |
| `embabel.observability.trace-ranking` | `true` | Ranking/selection events (agent routing) |
| `embabel.observability.trace-dynamic-agent-creation` | `true` | Dynamic agent creation events |
| `embabel.observability.trace-http-details` | `false` | HTTP request/response details (bodies, headers) |
| `embabel.observability.trace-tracked-operations` | `true` | `@Tracked` annotation aspect |
| `embabel.observability.mdc-propagation` | `true` | Propagate agent context into SLF4J MDC |
| `embabel.observability.metrics-enabled` | `true` | Micrometer business metrics (counters, gauges) |
| `embabel.observability.max-attribute-length` | `4000` | Max span attribute length before truncation |

##### Custom Operation Tracking with `@Tracked`

The `@Tracked` annotation lets you add observability spans to your own methods.
Inputs, outputs, duration, and errors are captured automatically.

```
@Tracked("enrichCustomer")
public Customer enrich(Customer input) {
    // Automatically creates a span with method arguments and return value
}
```

You can specify a type and description for richer traces:

```
@Tracked(
    value = "callPaymentApi",
    type = TrackType.EXTERNAL_CALL,
    description = "Payment gateway call"
)
public PaymentResult processPayment(Order order) {
    // ...
}
```

Available track types:

| Type | Description |
| --- | --- |
| `CUSTOM` | General-purpose (default) |
| `PROCESSING` | Data processing operation |
| `VALIDATION` | Validation or verification step |
| `TRANSFORMATION` | Data transformation |
| `EXTERNAL_CALL` | External service/API call |
| `COMPUTATION` | Computation or calculation |

When called within an agent execution, `@Tracked` spans are automatically nested under the current action:

```
Agent: CustomerServiceAgent
âââ Action: ProcessOrder
â   âââ @Tracked: enrichCustomer (PROCESSING)
â   âââ ChatModel: gpt-4
â   âââ @Tracked: callPaymentApi (EXTERNAL_CALL)
âââ status: completed
```

|  |  |
| --- | --- |
|  | `@Tracked` uses Spring AOP proxies. Internal method calls within the same class are **not** intercepted. Extract tracked methods into a separate `@Component` bean for the annotation to work. |

##### MDC Log Correlation

Agent context is automatically propagated into SLF4J MDC, enabling log filtering by agent run or action.

MDC keys set automatically:

| MDC Key | Description | Set on | Removed on |
| --- | --- | --- | --- |
| `embabel.agent.run_id` | Agent process ID | Agent creation | Agent completed/failed/killed |
| `embabel.agent.name` | Agent name | Agent creation | Agent completed/failed/killed |
| `embabel.action.name` | Current action name | Action start | Action result |

Example Logback pattern:

```
<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} [runId=%X{embabel.agent.run_id} agent=%X{embabel.agent.name} action=%X{embabel.action.name}] - %msg%n</pattern>
```

This produces logs like:

```
14:23:45.123 [main] INFO  c.e.MyService [runId=abc-123 agent=CustomerServiceAgent action=AnalyzeRequest] - Processing request
```

To disable MDC propagation:

```
embabel:
  observability:
    mdc-propagation: false
```

##### Supported Backends

| Backend | Type | Module |
| --- | --- | --- |
| Langfuse | Traces | `opentelemetry-exporter-langfuse` |
| Zipkin | Traces | `opentelemetry-exporter-zipkin` |
| OTLP (Jaeger, Tempo) | Traces | `opentelemetry-exporter-otlp` |
| Prometheus | Metrics | `micrometer-registry-prometheus` |

For full details, see the [Observability Module Documentation](https://github.com/embabel/embabel-agent/tree/main/embabel-agent-observability).

### 4.34. Developer Tooling

### 4.35. IntelliJ IDEA Plugin

The Embabel Agent IntelliJ IDEA plugin provides IDE-level support for developing agents with the Embabel framework.
It integrates directly with the IntelliJ platform to give you a cleaner, warning-free development experience.

#### 4.35.1. What It Does

When you annotate methods with Embabel’s core annotations â `@Action`, `@Condition`, or `@Cost` â IntelliJ has no way of knowing that the framework will invoke those methods reflectively at runtime.
Without the plugin, the IDE flags these methods as **unused**, producing false "never used" warnings throughout your agent code.

The plugin registers an `ImplicitUsageProvider` with the IntelliJ platform that tells the IDE:

> Any method annotated with `@Action`, `@Condition`, or `@Cost` is implicitly used by the Embabel Agent framework â do not warn.

This means you can write your agents cleanly without suppressing legitimate IDE inspections or littering your code with `@SuppressWarnings`.

Without the plugin

```
@Agent(description = "Summarizes news articles")
class NewsAgent {

    @Action  // â  IntelliJ: "Method 'summarize' is never used"
    fun summarize(article: RawArticle): ArticleSummary {
        // ...
    }
}
```

With the plugin

```
@Agent(description = "Summarizes news articles")
class NewsAgent {

    @Action  // â No warning â plugin marks this as implicitly used
    fun summarize(article: RawArticle): ArticleSummary {
        // ...
    }
}
```

#### 4.35.2. Installation

The plugin is published to the [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/31142-embabel-agent) (plugin ID: `31142`).

##### Via the IDE (Recommended)

1. Open IntelliJ IDEA.
2. Go to **Settings** â **Plugins** â **Marketplace** tab.
3. Search for **Embabel Agent**.
4. Click **Install**, then restart the IDE when prompted.

##### Via the Marketplace Website

1. Visit [plugins.jetbrains.com/plugin/31142-embabel-agent](https://plugins.jetbrains.com/plugin/31142-embabel-agent).
2. Click **Get**, then follow the browser prompt to open IntelliJ IDEA and install.

#### 4.35.3. Compatibility

| Requirement | Value |
| --- | --- |
| Minimum IntelliJ IDEA version | 2023.3 (build `233`) |
| Maximum IntelliJ IDEA version | No upper cap â compatible with all future releases |
| JVM | 21+ |
| Plugin ID | `com.embabel.agent.intellij-plugin` |

|  |  |
| --- | --- |
|  | The plugin targets IntelliJ IDEA (both Community and Ultimate editions). As of IDEA 2025.3, the Community and Ultimate editions were merged into a single unified distribution. |

#### 4.35.4. Source & Contributing

The plugin source is maintained in its own repository:
[github.com/embabel/embabel-agent-intellij](https://github.com/embabel/embabel-agent-intellij)

Contributions are welcome.
If you use additional Embabel annotations that should also be treated as implicitly used, please open an issue or pull request against that repository.

### 4.36. Agent Skills

Agent Skills provide a standardized way to extend agent capabilities with reusable, shareable skill packages.
Skills are loaded dynamically and provide instructions, resources, and tools to agents.

Embabel implements the [Agent Skills Specification](https://agentskills.io/specification).

#### 4.36.1. What are Agent Skills?

An Agent Skill is a directory containing a `SKILL.md` file with YAML frontmatter and markdown instructions.
Skills can also include bundled resources:

* `scripts/` - Executable scripts (Python, Bash, etc.)
* `references/` - Documentation and reference materials
* `assets/` - Static resources like templates and data files

Skills use a **lazy loading** pattern: only minimal metadata is included in the system prompt, with full instructions loaded when the skill is activated.

#### 4.36.2. Using Skills with PromptRunner

The `Skills` class implements `LlmReference`, allowing it to be passed to a `PromptRunner`:

Java
:   ```
    var skills = new Skills("financial-skills", "Financial analysis skills")
        .withGitHubUrl("https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills");

    var response = context.ai()
        .withLlm(llm)
        .withReference(skills)
        .withSystemPrompt("You are a helpful financial analyst.")
        .respond(conversation.getMessages());
    ```

Kotlin
:   ```
    val skills = Skills("financial-skills", "Financial analysis skills")
        .withGitHubUrl("https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills")

    val response = context.ai()
        .withLlm(llm)
        .withReference(skills)
        .withSystemPrompt("You are a helpful financial analyst.")
        .respond(conversation.messages)
    ```

When skills are added as a reference, the agent can:

* See available skills in the system prompt
* Activate skills to get full instructions
* List and read skill resources

#### 4.36.3. Loading Skills from GitHub

The simplest way to load skills is from a GitHub URL:

Java
:   ```
    var skills = new Skills("my-skills", "Skills for my agent")
        .withGitHubUrl("https://github.com/anthropics/skills/tree/main/skills");
    ```

Kotlin
:   ```
    val skills = Skills("my-skills", "Skills for my agent")
        .withGitHubUrl("https://github.com/anthropics/skills/tree/main/skills")
    ```

Supported URL formats:

* `github.com/owner/repo` - Load from repository root
* `github.com/owner/repo/tree/branch` - Specific branch
* `github.com/owner/repo/tree/branch/path/to/skills` - Specific path

For more control, use explicit parameters:

Java
:   ```
    var skills = new Skills("my-skills", "Skills for my agent")
        .withGitHubSkills("anthropics", "skills", "skills", "main");
    ```

Kotlin
:   ```
    val skills = Skills("my-skills", "Skills for my agent")
        .withGitHubSkills(
            owner = "anthropics",
            repo = "skills",
            skillsPath = "skills",
            branch = "main"
        )
    ```

#### 4.36.4. Loading Skills from Local Directories

Load a single skill from a directory containing `SKILL.md`:

Java
:   ```
    var skills = new Skills("my-skills", "Local skills")
        .withLocalSkill("/path/to/my-skill");
    ```

Kotlin
:   ```
    val skills = Skills("my-skills", "Local skills")
        .withLocalSkill("/path/to/my-skill")
    ```

Load multiple skills from a parent directory:

Java
:   ```
    var skills = new Skills("my-skills", "Local skills")
        .withLocalSkills("/path/to/skills-directory");
    ```

Kotlin
:   ```
    val skills = Skills("my-skills", "Local skills")
        .withLocalSkills("/path/to/skills-directory")
    ```

|  |  |
| --- | --- |
|  | `withLocalSkills` scans immediate subdirectories only (depth 1). It does not recurse into nested directories. |

#### 4.36.5. Skill Directory Structure

A skill directory must contain a `SKILL.md` file:

```
my-skill/
âââ SKILL.md        # Required - metadata and instructions
âââ scripts/        # Optional - executable scripts
âââ references/     # Optional - documentation
âââ assets/         # Optional - static resources
```

The `SKILL.md` file uses YAML frontmatter:

```
---
name: my-skill
description: A skill that does something useful
license: Apache-2.0
compatibility: Requires Python 3.9+
---

# My Skill Instructions

Step-by-step instructions for using this skill...
```

#### 4.36.6. Skill Activation

Skills are activated lazily.
The system prompt contains only minimal metadata (~50-100 tokens per skill).
When an agent needs a skill, it calls the `activate` tool to load full instructions.

The `Skills` class exposes three LLM tools:

* `activate(name)` - Load full instructions for a skill
* `listResources(skillName, resourceType)` - List files in scripts/references/assets
* `readResource(skillName, resourceType, fileName)` - Read a resource file

#### 4.36.7. Combining Skills with Other References

Skills can be combined with other `LlmReference` implementations:

Java
:   ```
    var response = context.ai()
        .withLlm(properties.chatLlm())
        .withReference(
            new LocalDirectory("./data/financial", "Financial data files")
                .withUsageNotes("Search to find files matching user requests.")
        )
        .withReference(
            new Skills("analytics", "Business analytics skills")
                .withGitHubUrl("https://github.com/example/skills/tree/main/analytics")
        )
        .withSystemPrompt("You are a financial analyst assistant.")
        .respond(conversation.getMessages());
    ```

Kotlin
:   ```
    val response = context.ai()
        .withLlm(properties.chatLlm())
        .withReference(
            LocalDirectory("./data/financial", "Financial data files")
                .withUsageNotes("Search to find files matching user requests.")
        )
        .withReference(
            Skills("analytics", "Business analytics skills")
                .withGitHubUrl("https://github.com/example/skills/tree/main/analytics")
        )
        .withSystemPrompt("You are a financial analyst assistant.")
        .respond(conversation.messages)
    ```

#### 4.36.8. Validation

Skills are validated when loaded:

* **Frontmatter validation** - Required fields (name, description) and field lengths
* **File reference validation** - Paths in instructions (e.g., `scripts/build.sh`) must exist
* **Name matching** - Skill name must match its parent directory name

To disable file reference validation:

Java
:   ```
    var loader = new DefaultDirectorySkillDefinitionLoader(false);
    ```

Kotlin
:   ```
    val loader = DefaultDirectorySkillDefinitionLoader(validateFileReferences = false)
    ```

#### 4.36.9. Current Limitations

Script execution
:   Skills with `scripts/` directories are loaded, but script execution is not yet supported.
    A warning is logged when such skills are loaded.

allowed-tools field
:   The `allowed-tools` frontmatter field is parsed but not currently enforced.

See the [Agent Skills Specification](https://agentskills.io/specification) for the full specification.

### 4.37. Testing

Like Spring, Embabel facilitates testing of user applications.
The framework provides comprehensive testing support for both unit and integration testing scenarios.

|  |  |
| --- | --- |
|  | Building Gen AI applications is no different from building other software. Testing is critical to delivering quality software and must be considered from the outset. |

#### 4.37.1. Unit Testing

Unit testing in Embabel enables testing individual agent actions without involving real LLM calls.

Embabel’s design means that agents are usually POJOs that can be instantiated with fake or mock objects.
Actions are methods that can be called directly with test fixtures.
In additional to your domain objects, you will pass a text fixture for the Embabel `OperationContext`, enabling you to intercept and verify LLM calls.

The framework provides `FakePromptRunner` and `FakeOperationContext` to mock LLM interactions while allowing you to verify prompts, hyperparameters, and business logic.
Alternatively you can use mock objects.
[Mockito](https://site.mockito.org/) is the default choice for Java; [mockk](https://mockk.io/) for Kotlin.

##### Testing Prompts and Hyperparameters

Here are unit tests from the [Java Agent Template](http://github.com/embabel/java-agent-template) and [Kotlin Agent Template](http://github.com/embabel/kotlin-agent-template) repositories, using Embabel fake objects:

Java
:   ```
    class WriteAndReviewAgentTest {

        @Test
        void testWriteAndReviewAgent() {
            var context = FakeOperationContext.create();
            var promptRunner = (FakePromptRunner) context.promptRunner();
            context.expectResponse(new Story("One upon a time Sir Galahad . . "));

            var agent = new WriteAndReviewAgent(200, 400);
            agent.craftStory(new UserInput("Tell me a story about a brave knight", Instant.now()), context);

            String prompt = promptRunner.getLlmInvocations().getFirst().getPrompt();
            assertTrue(prompt.contains("knight"), "Expected prompt to contain 'knight'");

            var temp = promptRunner.getLlmInvocations().getFirst().getInteraction().getLlm().getTemperature();
            assertEquals(0.9, temp, 0.01,
                    "Expected temperature to be 0.9: Higher for more creative output");
        }

        @Test
        void testReview() {
            var agent = new WriteAndReviewAgent(200, 400);
            var userInput = new UserInput("Tell me a story about a brave knight", Instant.now());
            var story = new Story("Once upon a time, Sir Galahad...");
            var context = FakeOperationContext.create();
            context.expectResponse("A thrilling tale of bravery and adventure!");
            agent.reviewStory(userInput, story, context);

            var promptRunner = (FakePromptRunner) context.promptRunner();
            String prompt = promptRunner.getLlmInvocations().getFirst().getPrompt();
            assertTrue(prompt.contains("knight"), "Expected review prompt to contain 'knight'");
            assertTrue(prompt.contains("review"), "Expected review prompt to contain 'review'");
        }
    }
    ```

Kotlin
:   ```
    /**
     * Unit tests for the WriteAndReviewAgent class.
     * Tests the agent's ability to craft and review stories based on user input.
     */
    internal class WriteAndReviewAgentTest {

        /**
         * Tests the story crafting functionality of the WriteAndReviewAgent.
         * Verifies that the LLM call contains expected content and configuration.
         */
        @Test
        fun testCraftStory() {
            // Create agent with word limits: 200 min, 400 max
            val agent = WriteAndReviewAgent(200, 400)
            val context = FakeOperationContext.create()
            val promptRunner = context.promptRunner() as FakePromptRunner

            context.expectResponse(Story("One upon a time Sir Galahad . . "))

            agent.craftStory(
                UserInput("Tell me a story about a brave knight", Instant.now()),
                context
            )

            // Verify the prompt contains the expected keyword
            Assertions.assertTrue(
                promptRunner.llmInvocations.first().prompt.contains("knight"),
                "Expected prompt to contain 'knight'"
            )

            // Verify the temperature setting for creative output
            val actual = promptRunner.llmInvocations.first().interaction.llm.temperature
            Assertions.assertEquals(
                0.9, actual, 0.01,
                "Expected temperature to be 0.9: Higher for more creative output"
            )
        }

        @Test
        fun testReview() {
            val agent = WriteAndReviewAgent(200, 400)
            val userInput = UserInput("Tell me a story about a brave knight", Instant.now())
            val story = Story("Once upon a time, Sir Galahad...")
            val context = FakeOperationContext.create()

            context.expectResponse("A thrilling tale of bravery and adventure!")
            agent.reviewStory(userInput, story, context)

            val promptRunner = context.promptRunner() as FakePromptRunner
            val prompt = promptRunner.llmInvocations.first().prompt
            Assertions.assertTrue(prompt.contains("knight"), "Expected review prompt to contain 'knight'")
            Assertions.assertTrue(prompt.contains("review"), "Expected review prompt to contain 'review'")

            // Verify single LLM invocation during review
            Assertions.assertEquals(1, promptRunner.llmInvocations.size)
        }
    }
    ```

##### Testing the Fluent API: withId() and creating()

The `FakePromptRunner` fully supports the fluent API patterns used in production code, enabling comprehensive unit testing of agents that use `withId()` for interaction tracing and `creating()` for structured object creation with examples.

**Testing withId() for Interaction Tracing:**

The `withId()` method sets an interaction ID for better log tracing. In tests, you can verify the interaction ID was correctly set:

Java
:   ```
    @Test
    void shouldSetInteractionIdCorrectly() {
        var context = FakeOperationContext.create();
        var expectedIntent = new UserIntent("command", "Change channel names");
        context.expectResponse(expectedIntent);

        var result = context.ai()
                .withId("classify-intent")  // Set interaction ID for tracing
                .creating(UserIntent.class)
                .fromPrompt("Classify the user's intent");

        assertEquals(expectedIntent, result);

        // Verify the interaction ID was set correctly
        var interaction = context.getLlmInvocations().getFirst().getInteraction();
        assertEquals("classify-intent", interaction.getId().getValue());
    }
    ```

Kotlin
:   ```
    @Test
    fun `should set interaction ID correctly`() {
        val context = FakeOperationContext.create()
        val expectedIntent = UserIntent("command", "Change channel names")
        context.expectResponse(expectedIntent)

        val result = context.ai()
            .withId("classify-intent")  // Set interaction ID for tracing
            .creating(UserIntent::class.java)
            .fromPrompt("Classify the user's intent")

        assertEquals(expectedIntent, result)

        // Verify the interaction ID was set correctly
        val interaction = context.llmInvocations.first().interaction
        assertEquals(InteractionId("classify-intent"), interaction.id)
    }
    ```

**Testing creating() with withExample():**

The `creating()` API allows you to provide strongly-typed examples to improve LLM output quality. In tests, you can verify examples were included:

Java
:   ```
    @Test
    void shouldIncludeExamplesInPrompt() {
        var context = FakeOperationContext.create();
        var expectedPlan = new ChannelEditPlan(1, "Lead Vox");
        context.expectResponse(expectedPlan);

        var result = context.ai()
                .withLlm(llmSelectionService.selectOptimalLlm())
                .withId("analyze-edit-request")
                .creating(ChannelEditPlan.class)
                .withExample("Rename channel 1", new ChannelEditPlan(1, "Bass"))
                .withExample("Rename channel 2", new ChannelEditPlan(2, "Drums"))
                .fromPrompt("Analyze the edit request");

        assertEquals(expectedPlan, result);

        // Verify examples were added as prompt contributors
        var promptContributors = context.getLlmInvocations().getFirst()
                .getInteraction().getPromptContributors();
        assertTrue(promptContributors.size() >= 2, "Examples should be added as prompt contributors");
    }
    ```

Kotlin
:   ```
    @Test
    fun `should include examples in prompt`() {
        val context = FakeOperationContext.create()
        val expectedPlan = ChannelEditPlan(1, "Lead Vox")
        context.expectResponse(expectedPlan)

        val result = context.ai()
            .withLlm(llmSelectionService.selectOptimalLlm())
            .withId("analyze-edit-request")
            .creating(ChannelEditPlan::class.java)
            .withExample("Rename channel 1", ChannelEditPlan(1, "Bass"))
            .withExample("Rename channel 2", ChannelEditPlan(2, "Drums"))
            .fromPrompt("Analyze the edit request")

        assertEquals(expectedPlan, result)

        // Verify examples were added as prompt contributors
        val promptContributors = context.llmInvocations.first().interaction.promptContributors
        assertTrue(promptContributors.size >= 2, "Examples should be added as prompt contributors")
    }
    ```

**Using CreationExample for Reusable Examples:**

For cleaner code and reusability, you can use the `CreationExample` data class to define examples that can be shared across tests or passed as collections:

Java
:   ```
    @Test
    void shouldUseCreationExampleDataClass() {
        var context = FakeOperationContext.create();
        var expectedPlan = new ChannelEditPlan(1, "Lead Vox");
        context.expectResponse(expectedPlan);

        // Create a reusable example using CreationExample
        var example = new CreationExample<>(
            "Rename channel example",
            new ChannelEditPlan(2, "Rhythm")
        );

        var result = context.ai()
                .withDefaultLlm()
                .creating(ChannelEditPlan.class)
                .withExample(example)  // Pass the CreationExample directly
                .fromPrompt("Analyze the edit request");

        assertEquals(expectedPlan, result);
    }
    ```

Kotlin
:   ```
    @Test
    fun `should use CreationExample data class`() {
        val context = FakeOperationContext.create()
        val expectedPlan = ChannelEditPlan(1, "Lead Vox")
        context.expectResponse(expectedPlan)

        // Create a reusable example using CreationExample
        val example = CreationExample(
            description = "Rename channel example",
            value = ChannelEditPlan(2, "Rhythm")
        )

        val result = context.ai()
            .withDefaultLlm()
            .creating(ChannelEditPlan::class.java)
            .withExample(example)  // Pass the CreationExample directly
            .fromPrompt("Analyze the edit request")

        assertEquals(expectedPlan, result)
    }
    ```

**Adding Multiple Examples with withExamples():**

When you have many examples to add, use `withExamples()` to pass them as a list or vararg. This is especially useful when examples are loaded from a file or database:

Java
:   ```
    @Test
    void shouldAddMultipleExamplesFromList() {
        var context = FakeOperationContext.create();
        var expectedPlan = new ChannelEditPlan(1, "Lead Vox");
        context.expectResponse(expectedPlan);

        // Create a list of examples (could be loaded from configuration)
        var examples = List.of(
            new CreationExample<>("Rename to Bass", new ChannelEditPlan(1, "Bass")),
            new CreationExample<>("Rename to Drums", new ChannelEditPlan(2, "Drums")),
            new CreationExample<>("Rename to Keys", new ChannelEditPlan(3, "Keys")),
            new CreationExample<>("Rename to Vocals", new ChannelEditPlan(4, "Vocals"))
        );

        var result = context.ai()
                .withDefaultLlm()
                .creating(ChannelEditPlan.class)
                .withExamples(examples)  // Pass all examples at once
                .fromPrompt("Analyze the request");

        assertEquals(expectedPlan, result);

        // Verify all examples were added
        var promptContributors = context.getLlmInvocations().getFirst()
                .getInteraction().getPromptContributors();
        assertTrue(promptContributors.size() >= 4);
    }
    ```

Kotlin
:   ```
    @Test
    fun `should add multiple examples from list`() {
        val context = FakeOperationContext.create()
        val expectedPlan = ChannelEditPlan(1, "Lead Vox")
        context.expectResponse(expectedPlan)

        // Create a list of examples (could be loaded from configuration)
        val examples = listOf(
            CreationExample("Rename to Bass", ChannelEditPlan(1, "Bass")),
            CreationExample("Rename to Drums", ChannelEditPlan(2, "Drums")),
            CreationExample("Rename to Keys", ChannelEditPlan(3, "Keys")),
            CreationExample("Rename to Vocals", ChannelEditPlan(4, "Vocals"))
        )

        val result = context.ai()
            .withDefaultLlm()
            .creating(ChannelEditPlan::class.java)
            .withExamples(examples)  // Pass all examples at once
            .fromPrompt("Analyze the request")

        assertEquals(expectedPlan, result)

        // Verify all examples were added
        val promptContributors = context.llmInvocations.first().interaction.promptContributors
        assertTrue(promptContributors.size >= 4)
    }
    ```

You can also use vararg syntax for inline example lists:

Java
:   ```
    var result = context.ai()
            .withDefaultLlm()
            .creating(ChannelEditPlan.class)
            .withExamples(
                new CreationExample<>("Example 1", new ChannelEditPlan(1, "Bass")),
                new CreationExample<>("Example 2", new ChannelEditPlan(2, "Drums")),
                new CreationExample<>("Example 3", new ChannelEditPlan(3, "Keys"))
            )
            .fromPrompt("Analyze the request");
    ```

Kotlin
:   ```
    val result = context.ai()
        .withDefaultLlm()
        .creating(ChannelEditPlan::class.java)
        .withExamples(
            CreationExample("Example 1", ChannelEditPlan(1, "Bass")),
            CreationExample("Example 2", ChannelEditPlan(2, "Drums")),
            CreationExample("Example 3", ChannelEditPlan(3, "Keys"))
        )
        .fromPrompt("Analyze the request")
    ```

**Full Fluent API Chain Example:**

Here’s a complete example showing how to test an action that uses all the fluent API features:

Java
:   ```
    @Test
    void shouldTestCompleteFluentApiChain() {
        var context = FakeOperationContext.create();
        var expectedOutput = new ComplexOutput("analysis complete", 42);
        context.expectResponse(expectedOutput);

        // Production code pattern with full fluent API chain
        var result = context.ai()
                .withLlm(LlmOptions.withModel("gpt-4"))
                .withId("complex-analysis")
                .withSystemPrompt("You are an expert analyst")
                .creating(ComplexOutput.class)
                .withExample("Simple case", new ComplexOutput("basic", 1))
                .withExample("Complex case", new ComplexOutput("advanced", 100))
                .fromPrompt("Analyze the input data");

        assertEquals(expectedOutput, result);

        // Comprehensive verification
        var invocation = context.getLlmInvocations().getFirst();
        assertEquals("gpt-4", invocation.getInteraction().getLlm().getModel());
        assertEquals("complex-analysis", invocation.getInteraction().getId().getValue());
        assertTrue(invocation.getInteraction().getPromptContributors().size() >= 3); // system + 2 examples
    }
    ```

Kotlin
:   ```
    @Test
    fun `should test complete fluent API chain`() {
        val context = FakeOperationContext.create()
        val expectedOutput = ComplexOutput("analysis complete", 42)
        context.expectResponse(expectedOutput)

        // Production code pattern with full fluent API chain
        val result = context.ai()
            .withLlm(LlmOptions.withModel("gpt-4"))
            .withId("complex-analysis")
            .withSystemPrompt("You are an expert analyst")
            .creating(ComplexOutput::class.java)
            .withExample("Simple case", ComplexOutput("basic", 1))
            .withExample("Complex case", ComplexOutput("advanced", 100))
            .fromPrompt("Analyze the input data")

        assertEquals(expectedOutput, result)

        // Comprehensive verification
        val invocation = context.llmInvocations.first()
        assertEquals("gpt-4", invocation.interaction.llm.model)
        assertEquals("complex-analysis", invocation.interaction.id.value)
        assertTrue(invocation.interaction.promptContributors.size >= 3) // system + 2 examples
    }
    ```

##### Key Testing Patterns Demonstrated

**Testing Prompt Content:**

* Use `context.getLlmInvocations().getFirst().getPrompt()` to get the actual prompt sent to the LLM
* Verify that key domain data is properly included in the prompt using `assertTrue(prompt.contains(…​))`

**Testing Tools:**

* Access tools via `getInteraction().getTools()` to verify tools added via `withToolObject()` or `withTool()`
* Access tool group requirements via `getInteraction().getToolGroups()` to verify named tool group requirements added via `withToolGroup(ToolGroupRequirement)`

|  |  |
| --- | --- |
|  | `getTools()` returns actual `Tool` instances (from `withToolObject()` and `withTool()`), while `getToolGroups()` returns `ToolGroupRequirement` objects (named requirements like "web\_search" added via `withToolGroup()`). Most tests should use `getTools()`. |

**Testing with Spring Dependencies:**

* Mock Spring-injected services like `HoroscopeService` using standard mocking frameworks - Pass mocked dependencies to agent constructor for isolated unit testing

##### Testing Multiple LLM Interactions

Java
:   ```
    @Test
    void shouldHandleMultipleLlmInteractions() {
        // Arrange
        var input = new UserInput("Write about space exploration");
        var story = new Story("The astronaut gazed at Earth...");
        ReviewedStory review = new ReviewedStory("Compelling narrative with vivid imagery.");

        // Set up expected responses in order
        context.expectResponse(story);
        context.expectResponse(review);

        // Act
        var writtenStory = agent.writeStory(input, context);
        ReviewedStory reviewedStory = agent.reviewStory(writtenStory, context);

        // Assert
        assertEquals(story, writtenStory);
        assertEquals(review, reviewedStory);

        // Verify both LLM calls were made
        List<LlmInvocation> invocations = context.getLlmInvocations();
        assertEquals(2, invocations.size());

        // Verify first call (writer)
        var writerCall = invocations.get(0);
        assertEquals(0.8, writerCall.getInteraction().getLlm().getTemperature(), 0.01);

        // Verify second call (reviewer)
        var reviewerCall = invocations.get(1);
        assertEquals(0.2, reviewerCall.getInteraction().getLlm().getTemperature(), 0.01);
    }
    ```

Kotlin
:   ```
    @Test
    fun `should handle multiple LLM interactions`() {
        // Arrange
        val input = UserInput("Write about space exploration")
        val story = Story("The astronaut gazed at Earth...")
        val review = ReviewedStory("Compelling narrative with vivid imagery.")

        // Set up expected responses in order
        context.expectResponse(story)
        context.expectResponse(review)

        // Act
        val writtenStory = agent.writeStory(input, context)
        val reviewedStory = agent.reviewStory(writtenStory, context)

        // Assert
        assertEquals(story, writtenStory)
        assertEquals(review, reviewedStory)

        // Verify both LLM calls were made
        val invocations = context.llmInvocations
        assertEquals(2, invocations.size)

        // Verify first call (writer)
        val writerCall = invocations[0]
        assertEquals(0.8, writerCall.interaction.llm.temperature, 0.01)

        // Verify second call (reviewer)
        val reviewerCall = invocations[1]
        assertEquals(0.2, reviewerCall.interaction.llm.temperature, 0.01)
    }
    ```

You can also use Mockito or mockk directly.
Consider this component, using direct injection of `Ai`:

Java
:   ```
    @Component
    public record InjectedComponent(Ai ai) {

        public record Joke(String leadup, String punchline) {
        }

        public String tellJokeAbout(String topic) {
            return ai
                    .withDefaultLlm()
                    .generateText("Tell me a joke about " + topic);
        }
    }
    ```

Kotlin
:   ```
    @Component
    class InjectedComponent(private val ai: Ai) {

        data class Joke(val leadup: String, val punchline: String)

        fun tellJokeAbout(topic: String): String {
            return ai
                .withDefaultLlm()
                .generateText("Tell me a joke about $topic")
        }
    }
    ```

A unit test using Mockito (Java) or mockk (Kotlin) to verify prompt and hyperparameters:

Java
:   ```
    class InjectedComponentTest {

        @Test
        void testTellJokeAbout() {
            var mockAi = Mockito.mock(Ai.class);
            var mockPromptRunner = Mockito.mock(PromptRunner.class);

            var prompt = "Tell me a joke about frogs";
            // Yep, an LLM came up with this joke.
            var terribleJoke = """
                    Why don't frogs ever pay for drinks?
                    Because they always have a tadpole in their wallet!
                    """;
            when(mockAi.withDefaultLlm()).thenReturn(mockPromptRunner);
            when(mockPromptRunner.generateText(prompt)).thenReturn(terribleJoke);

            var injectedComponent = new InjectedComponent(mockAi);
            var joke = injectedComponent.tellJokeAbout("frogs");

            assertEquals(terribleJoke, joke);
            Mockito.verify(mockAi).withDefaultLlm();
            Mockito.verify(mockPromptRunner).generateText(prompt);
        }

    }
    ```

Kotlin
:   ```
    class InjectedComponentTest {

        @Test
        fun `test tell joke about`() {
            val mockAi = mockk<Ai>()
            val mockPromptRunner = mockk<PromptRunner>()

            val prompt = "Tell me a joke about frogs"
            // Yep, an LLM came up with this joke.
            val terribleJoke = """
                Why don't frogs ever pay for drinks?
                Because they always have a tadpole in their wallet!
            """.trimIndent()

            every { mockAi.withDefaultLlm() } returns mockPromptRunner
            every { mockPromptRunner.generateText(prompt) } returns terribleJoke

            val injectedComponent = InjectedComponent(mockAi)
            val joke = injectedComponent.tellJokeAbout("frogs")

            assertEquals(terribleJoke, joke)
            verify { mockAi.withDefaultLlm() }
            verify { mockPromptRunner.generateText(prompt) }
        }
    }
    ```

#### 4.37.2. Integration Testing

Integration testing exercises complete agent workflows with real or mock external services while still avoiding actual LLM calls for predictability and speed.

This can ensure:

* Agents are picked up by the agent platform
* Data flow is correct within agents
* Failure scenarios are handled gracefully
* Agents interact correctly with each other and external systems
* The overall workflow behaves as expected
* LLM prompts and hyperparameters are correctly configured

Embabel integration testing is built on top of [Spring’s excellent integration testing support](https://docs.spring.io/spring-framework/reference/testing/integration.html), thus allowing you to work with real databases if you wish.
Spring’s [integration with Testcontainers](https://docs.spring.io/spring-boot/reference/testing/testcontainers.html) is particularly userul.

##### Using EmbabelMockitoIntegrationTest

Embabel provides `EmbabelMockitoIntegrationTest` as a base class that simplifies integration testing with convenient helper methods:

Java
:   ```
    /**
     * Use framework superclass to test the complete workflow of writing and reviewing a story.
     * This will run under Spring Boot against an AgentPlatform instance
     * that has loaded all our agents.
     */
    class StoryWriterIntegrationTest extends EmbabelMockitoIntegrationTest {

        @Test
        void shouldExecuteCompleteWorkflow() {
            var input = new UserInput("Write about artificial intelligence");

            var story = new Story("AI will transform our world...");
            var reviewedStory = new ReviewedStory(story, "Excellent exploration of AI themes.", Personas.REVIEWER);

            whenCreateObject(contains("Craft a short story"), Story.class)
                    .thenReturn(story);

            // The second call uses generateText
            whenGenerateText(contains("You will be given a short story to review"))
                    .thenReturn(reviewedStory.review());

            var invocation = AgentInvocation.create(agentPlatform, ReviewedStory.class);
            var reviewedStoryResult = invocation.invoke(input);

            assertNotNull(reviewedStoryResult);
            assertTrue(reviewedStoryResult.getContent().contains(story.text()),
                    "Expected story content to be present: " + reviewedStoryResult.getContent());
            assertEquals(reviewedStory, reviewedStoryResult,
                    "Expected review to match: " + reviewedStoryResult);

            verifyCreateObjectMatching(prompt -> prompt.contains("Craft a short story"), Story.class,
                    llm -> llm.getLlm().getTemperature() == 0.9 && llm.getToolGroups().isEmpty());
            verifyGenerateTextMatching(prompt -> prompt.contains("You will be given a short story to review"));
            verifyNoMoreInteractions();
        }
    }
    ```

Kotlin
:   ```
    /**
     * Use framework superclass to test the complete workflow of writing and reviewing a story.
     * This will run under Spring Boot against an AgentPlatform instance
     * that has loaded all our agents.
     */
    class StoryWriterIntegrationTest : EmbabelMockitoIntegrationTest() {

        @Test
        fun `should execute complete workflow`() {
            val input = UserInput("Write about artificial intelligence")

            val story = Story("AI will transform our world...")
            val reviewedStory = ReviewedStory(story, "Excellent exploration of AI themes.", Personas.REVIEWER)

            whenCreateObject(contains("Craft a short story"), Story::class.java)
                .thenReturn(story)

            // The second call uses generateText
            whenGenerateText(contains("You will be given a short story to review"))
                .thenReturn(reviewedStory.review)

            val invocation = AgentInvocation.create(agentPlatform, ReviewedStory::class.java)
            val reviewedStoryResult = invocation.invoke(input)

            assertNotNull(reviewedStoryResult)
            assertTrue(reviewedStoryResult.content.contains(story.text),
                "Expected story content to be present: ${reviewedStoryResult.content}")
            assertEquals(reviewedStory, reviewedStoryResult,
                "Expected review to match: $reviewedStoryResult")

            verifyCreateObjectMatching({ prompt -> prompt.contains("Craft a short story") }, Story::class.java) { llm ->
                llm.llm.temperature == 0.9 && llm.toolGroups.isEmpty()
            }
            verifyGenerateTextMatching { prompt -> prompt.contains("You will be given a short story to review") }
            verifyNoMoreInteractions()
        }
    }
    ```

##### Key Integration Testing Features

**Base Class Benefits:**

* `EmbabelMockitoIntegrationTest` handles Spring Boot setup and LLM mocking automatically
* Provides `agentPlatform` and `llmOperations` pre-configured
* Includes helper methods for common testing patterns

**Convenient Stubbing Methods:**

* `whenCreateObject(prompt, outputClass)`: Mock object creation calls
* `whenGenerateText(prompt)`: Mock text generation calls
* Support for both exact prompts and `contains()` matching
* Supports streaming calls by calling `supportsStreaming(true)` in test setup.

**Advanced Verification:**

* `verifyCreateObjectMatching()`: Verify prompts with custom matchers
* `verifyGenerateTextMatching()`: Verify text generation calls
* `verifyNoMoreInteractions()`: Ensure no unexpected LLM calls

**LLM Configuration Testing:**

* Verify temperature settings: `llm.getLlm().getTemperature() == 0.9`
* Check tool groups: `llm.getToolGroups().isEmpty()`
* Validate persona and other LLM options

##### Integration Tests with LLM

Embabel provides integration tests that exercise complete workflows with real LLM providers to verify end-to-end functionality.
These tests are located in the autoconfiguration modules for each LLM provider and verify that the integration with the provider’s API works correctly, including features like guardrails, thinking responses, and structured output.

**Examples of LLM Integration Tests:**

| Test Name | Description | LLM Provider |
| --- | --- | --- |
| LLMOpenAiGuardRailsIntegrationIT | Tests OpenAI integration with guardrails, including moderation API integration using both OpenAI SDK and Spring AI, and validates guardrail invocation for structured output | OpenAI (gpt-4.1-mini) |
| LLMAnthropicGuardRailsIntegrationIT | Tests Anthropic integration with guardrails, validating that AssistantMessageGuardRail is correctly invoked for structured object responses | Anthropic (claude-sonnet-4-5) |
| LLMGeminiGuardRailsIntegrationIT | Tests Gemini integration with guardrails, verifying guardrail functionality with structured output for Google’s Gemini models | Gemini (gemini-2.5-flash) |

###### Test Structure

These integration tests follow a consistent structure designed to test real LLM interactions while maintaining control over the test environment.

**1. Test Location:**

Integration tests are located within autoconfiguration modules rather than in separate test modules.
This placement ensures tests have direct access to the autoconfiguration classes they’re testing and can verify that Spring Boot correctly initializes all required beans.

```
embabel-agent-autoconfigure/
  models/
    embabel-agent-openai-autoconfigure/
      src/test/java/com/embabel/agent/config/models/openai/
        LLMOpenAiGuardRailsIntegrationIT.java
    embabel-agent-anthropic-autoconfigure/
      src/test/java/com/embabel/agent/config/models/anthropic/
        LLMAnthropicGuardRailsIntegrationIT.java
    embabel-agent-gemini-autoconfigure/
      src/test/java/com/embabel/agent/config/models/gemini/
        LLMGeminiGuardRailsIntegrationIT.java
```

**2. Environment Properties:**

Each test configures the Spring environment through the `@SpringBootTest` annotation’s `properties` attribute.
These properties configure the LLM models, timeouts, retries, and logging levels for the test environment.

```
@SpringBootTest(
    properties = {
        "embabel.models.cheapest=gpt-4.1-mini",
        "embabel.models.best=gpt-4.1-mini",
        "embabel.models.default-llm=gpt-4.1-mini",  (1)
        "embabel.agent.platform.llm-operations.prompts.defaultTimeout=240s",
        "embabel.agent.platform.llm-operations.data-binding.fixedBackoffMillis=6000",


        // Thinking Infrastructure logging
        "logging.level.com.embabel.agent.spi.support.springai.ChatClientLlmOperations=TRACE",
        "logging.level.com.embabel.common.core.thinking=DEBUG"

    }
)
```

|  |  |
| --- | --- |
| **1** | The `default-llm` property configures which LLM model to use by default when `ai.withDefaultLlm()` is called |

**3. Active Profiles:**

The `@ActiveProfiles` annotation activates Spring profiles that enable specific functionality for the test environment.
The "thinking" profile enables extended thinking capabilities and additional logging for LLM operations.

```
@ActiveProfiles("thinking")  (1)
```

|  |  |
| --- | --- |
| **1** | Activates the "thinking" profile which enables enhanced tracing and thinking block extraction |

**4. Configuration Properties Scanning:**

The `@ConfigurationPropertiesScan` annotation enables Spring Boot to discover and bind configuration properties classes.
This is essential for integration tests to load all configuration properties from the `embabel.agent` and `embabel.example` packages.

```
@ConfigurationPropertiesScan(
    basePackages = {
        "com.embabel.agent",
        "com.embabel.example"
    }
)
```

**5. Component Scanning:**

The `@ComponentScan` annotation configures component scanning to discover Spring beans.
Integration tests typically exclude certain components (like exception handlers) that might interfere with test execution.

```
@ComponentScan(
    basePackages = {
        "com.embabel.agent",
        "com.embabel.example"
    }
)
```

**6. Importing Autoconfiguration:**

The `@Import` annotation explicitly imports the autoconfiguration class being tested.
This ensures the specific LLM provider’s autoconfiguration is loaded and all required beans are created.

```
@Import({AgentOpenAiAutoConfiguration.class, GuardRailConfiguration.class})  (1)
```

|  |  |
| --- | --- |
| **1** | Imports both the OpenAI autoconfiguration and test-specific guardrail configuration |

**7. Autowired Dependencies:**

Integration tests autowire the beans needed for testing.
While tests may autowire multiple components for verification purposes, **only the `Ai` interface is required** to execute LLM operations.

```
@Autowired
private Ai ai;  (1)

@Autowired
private Autonomy autonomy;  (2)

@Autowired
private List<LlmService<?>> llms;  (2)
```

|  |  |
| --- | --- |
| **1** | The `Ai` interface is the primary entry point and the only required dependency for making LLM calls |
| **2** | Additional autowired components used for verification and testing purposes |

###### Example Test: OpenAI GuardRails Integration

The following example demonstrates a complete integration test from `LLMOpenAiGuardRailsIntegrationIT.java`:

```
|  |  |
| --- | --- |
| ```  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 ``` | ``` @Test void testGuardRailInvokedForStructuredCreateObject() {     logger.info("Starting guardrail structured createObject test");  (1)      List<String> guardRailCalled = Collections.synchronizedList(new ArrayList<>());  (2)      AssistantMessageGuardRail trackingGuard = new AssistantMessageGuardRail() {  (3)         @Override         public @NotNull String getName() {             return "StructuredOutputTrackingGuardRail";         }          @Override         public @NotNull String getDescription() {             return "Tracks guardrail invocation for structured output";         }          @Override         public @NotNull ValidationResult validate(@NotNull String input, @NotNull Blackboard blackboard) {             guardRailCalled.add(input);             logger.info("AssistantMessageGuardRail invoked for structured output: {}", input);             return new ValidationResult(true, Collections.emptyList());         }          @Override         public @NotNull ValidationResult validate(@NotNull ThinkingResponse<?> response, @NotNull Blackboard blackboard) {             return new ValidationResult(true, Collections.emptyList());         }     };      PromptRunner runner = ai.withDefaultLlm()  (4)             .withGuardRails(trackingGuard);      String prompt = """             What is the hottest month in Florida and provide its temperature.             The name should be the month name, temperature should be in Fahrenheit.             """;      MonthItem result = runner.createObject(prompt, MonthItem.class);  (5)      assertNotNull(result, "Result should not be null");  (6)     assertNotNull(result.getName(), "Month name should not be null");     assertFalse(guardRailCalled.isEmpty(),             "AssistantMessageGuardRail should have been called for structured output");     logger.info("GuardRail was invoked {} time(s) for structured createObject", guardRailCalled.size()); } ``` |
```

|  |  |
| --- | --- |
| **1** | Logging statement to track test execution |
| **2** | Thread-safe list to track guardrail invocations |
| **3** | Custom guardrail implementation that tracks when it’s called |
| **4** | Configure the prompt runner using the default LLM (configured as gpt-4.1-mini in test properties) |
| **5** | Execute the LLM call to create a structured object |
| **6** | Verify the result and guardrail invocation |

|  |  |
| --- | --- |
|  | The test uses `withDefaultLlm()` which references the model configured in the `@SpringBootTest` properties (`embabel.models.default-llm=gpt-4.1-mini`). This approach makes tests more flexible and allows the model to be changed without modifying test code. |

##### Testing Annotated Agents

When testing agents built with `@Agent` and `@Action` annotations, you need to verify that:

* The agent metadata is correctly constructed from annotations
* Actions execute with the correct behavior (retry policies, preconditions, etc.)
* The planner selects and executes actions appropriately
* Domain-specific logic works as expected

**Test Structure for Annotated Agents:**

The key steps to test an annotated agent are:

1. Create an instance of your annotated agent class
2. Use `AgentMetadataReader` to extract agent metadata from annotations
3. Create an `AgentProcess` with a dummy or real `AgentPlatform`
4. Provide input data and run the process
5. Verify the output and any side effects

**Example: Testing Action Retry Policy**

Here’s a concise example from `RetryActionAnnotationJavaTest` showing how to test an agent with retry behavior:

```
@Test
void retryMethodFailsOnlyOnceSucceedsSecond() {
    // 1. Create the agent instance
    var instance = new JavaAgentWithTwoRetryActions();  (1)

    // 2. Extract agent metadata from annotations
    var reader = new AgentMetadataReader();
    var agent = reader.createAgentMetadata(instance);  (2)

    // 3. Create agent process with test platform
    var ap = IntegrationTestUtils.dummyAgentPlatform();
    var agentProcess = ap.createAgentProcess(
            agent,
            ProcessOptions.DEFAULT.withPlannerType(PlannerType.UTILITY),  (3)
            Map.of("input", new JavaRetryTestInput("test"))  (4)
    );

    // 4. Run and verify
    assertDoesNotThrow(() ->
        agentProcess.run().resultOfType(JavaRetryTestOutput.class));  (5)

    assertEquals(2, instance.retryInvocations.get(),
        "Retryable method should have been invoked twice");  (6)
}
```

|  |  |
| --- | --- |
| **1** | Instantiate the annotated agent with any required dependencies |
| **2** | Use `AgentMetadataReader` to parse annotations and create agent metadata |
| **3** | Configure the planner type (UTILITY, GOAP, etc.) for the test |
| **4** | Provide input data as a map - keys match action parameter names |
| **5** | Run the process and extract the result of the expected type |
| **6** | Verify behavior using instance fields (like invocation counters) |

**The Annotated Agent Under Test:**

```
@Agent(description = "Java agent with retry", planner = PlannerType.GOAP)
class JavaAgentWithTwoRetryActions {

    final AtomicInteger retryInvocations = new AtomicInteger(0);  (1)

    @AchievesGoal(description = "Process the input")
    @Action(actionRetryPolicyExpression = "${retry-twice}")  (2)
    public JavaRetryTestOutput firstAction(JavaRetryTestInput input) {
        retryInvocations.incrementAndGet();
        if (retryInvocations.get() == 1)
            throw new RuntimeException("Failed!");  (3)

        return new JavaRetryTestOutput("Success!");  (4)
    }
}
```

|  |  |
| --- | --- |
| **1** | Use instance fields to track invocations and verify behavior |
| **2** | Configure action behavior through annotations (retry policy, preconditions, etc.) |
| **3** | First invocation fails to test retry behavior |
| **4** | Second invocation succeeds |

**Key Testing Patterns:**

* **Dummy AgentPlatform**: Use `IntegrationTestUtils.dummyAgentPlatform()` for lightweight testing without Spring context
* **Instance State**: Access instance fields directly to verify internal behavior (invocation counts, state changes)
* **Input Map**: Provide action parameters as a `Map<String, Object>` where keys match parameter names
* **Result Extraction**: Use `agentProcess.run().resultOfType(ExpectedType.class)` to get strongly-typed results
* **Exception Testing**: Use `assertThrows()` to verify failure scenarios and retry exhaustion

### 4.38. Embabel Architecture

Please refer to architectural diagrams in sections:

[Choosing a Planner](#reference.planners)

[The AgentPlatform](#reference.agent-platform)

[The AgentProcess](#reference.agent-process)

### 4.39. Troubleshooting

This section covers common issues you might encounter when developing with Embabel and provides practical solutions.

#### 4.39.1. Common Problems and Solutions

| Problem | Solution | Related Docs |
| --- | --- | --- |
| **Compilation Error** | Check that you’re using the correct version of Embabel in your Maven or Gradle dependencies. You may be using an API from a later version (even a snapshot). Version mismatches between different Embabel modules can cause compilation issues. Ensure all `com.embabel.agent` artifacts use the same version, unless you’re following a specific example that does otherwise. | [Configuration](#reference.configuration) |
| **Don’t Know How to Invoke Your Agent** | Look at examples of processing `UserInput` in the documentation. Study `AgentInvocation` patterns to understand how to trigger your agent flows. The key is understanding how to provide the initial input that your agent expects. | [Invoking Agents](#reference.invoking) |
| **Agent Flow Not Completing** | This usually indicates a data flow problem. First, understand Embabel’s type-driven data flow concepts - review how input/output types create dependencies between actions. Then write an integration test to verify your flow works end-to-end. Familiarize yourself with Embabel’s GOAP planning concept. | [Data Flow Concepts](#overview__concepts) |
| **LLM Prompts Look Wrong or Have Incorrect Hyperparameters** | Write unit tests to capture and verify the exact prompts being sent to your LLM. This allows you to see the actual prompt content and tune temperature, model selection, and other parameters. Unit testing is the best way to debug LLM interactions. | [Testing](#reference.testing) |
| **Agent Gets Stuck in Planning** | Check that all your actions have clear input/output type signatures. Missing or circular dependencies in your type flow can prevent the planner from finding a valid path to the goal. Review your `@Action` method signatures. Look at the log output from the planner for clues. Set your `ProcessOptions.verbosity` to show planning. | [Type-Driven Flow](#overview__concepts) |
| **Tools Not Available to Agent** | Ensure you’ve specified tools using `withToolGroup()` or `withTools()` on your `PromptRunner`. Tools must be explicitly added to each LLM call that needs them. Check that required tool groups are available in your environment. | [Tools](#reference.tools) |
| **Agent Runs But Produces Poor Results** | Review your prompt engineering and persona configuration. Consider adjusting LLM temperature, model selection, and context provided to actions. Write tests to capture actual vs expected outputs. | [Testing](#reference.testing), [LLM Configuration](#reference.llms) |
| **You’re Struggling to Express What You Want in a Plan** | Familiarize yourself with custom conditions for complex flow control. For common behavior patterns, consider using atomic actions with Embabel’s typesafe custom builders such as `ScatterGatherBuilder` and `RepeatUntilBuilder` instead of trying to express everything through individual actions. | [DSL and Builders](#reference.dsl) |
| **Custom conditions not working as expected** | Remember that you must declare `post` conditions on `@Action` methods that may set your custom condition, as well as `pre` conditions on actions that depend on them. Otherwise the planner will assume that the conditions are never set and your plan will not execute as expected. | [Type-Driven Flow](#overview__concepts) |
| **Your Agent Has No Goals and Cannot Execute** | Look at the `@AchievesGoal` annotation and ensure your terminal action is annotated with it. Every agent needs at least one action marked with `@AchievesGoal` to define what constitutes completion of the agent’s work. | [Annotations](#reference.annotations) |
| **Your Agent Isn’t Visible to an MCP Client Like Claude Desktop** | Ensure that your `@AchievesGoal` annotation includes `@Export(remote=true)`. This makes your agent available for remote invocation through MCP (Model Context Protocol) clients. | [Annotations](#reference.annotations), [Integrations](#reference.integrations) |
| **Your Agent Can’t Use Upstream MCP Tools and You’re Seeing Errors in Logs About Possible Misconfiguration** | Check that your Docker configuration is correct if using the default Docker MCP Gateway. Verify that Docker containers are running and accessible. For other MCP configurations, ensure your Spring AI MCP client configuration is correct. See the Spring AI MCP client documentation for detailed setup instructions. | [Spring AI MCP Client](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-client-boot-starter-docs.html) |

#### 4.39.2. Debugging Strategies

##### Enable Debug Logging

Customize Embabel logging in `application.yml` or `application.properties` to see detailed agent execution.
For example:

```
logging:
  level:
    com.embabel.agent: DEBUG
```

#### 4.39.3. Getting Help

The Embabel community is active and helpful.
Join our [Discord](https://discord.gg/t6bjkyj93q) server to ask questions and share experiences.

### 4.40. Migrating from other frameworks

Many people start their journey with Python frameworks.

This section covers how to migrate from popular frameworks when it’s time to use a more robust and secure platform with access to existing code and services.

#### 4.40.1. Migrating from CrewAI

CrewAI uses a collaborative multi-agent approach where agents work together on tasks.
Embabel provides similar capabilities with stronger type safety and better integration with existing Java/Kotlin codebases.

##### Core Concept Mapping

| CrewAI Concept | Embabel Equivalent | Notes |
| --- | --- | --- |
| **Agent Role/Goal/Backstory** | `RoleGoalBackstory` PromptContributor | Convenience class for agent personality |
| **Sequential Tasks** | Typed data flow between actions | Type-driven execution with automatic planning |
| **Crew (Multi-agent coordination)** | Actions with shared PromptContributors | Agents can adopt personalities as needed |
| **YAML Configuration** | Standard Spring `@ConfigurationProperties` backed by `application.yml` or profile-specific configuration files | Type-safe configuration with validation |

##### Migration Example

**CrewAI Pattern:**

```
research_agent = Agent(
    role='Research Specialist',
    goal='Find comprehensive information',
    backstory='Expert researcher with 10+ years experience'
)

writer_agent = Agent(
    role='Content Writer',
    goal='Create engaging content',
    backstory='Professional writer specializing in technical content'
)

crew = Crew(
    agents=[research_agent, writer_agent],
    tasks=[research_task, write_task],
    process=Process.sequential
)
```

**Embabel Equivalent:**

```
@ConfigurationProperties("examples.book-writer")
record BookWriterConfig(
    LlmOptions researcherLlm,
    LlmOptions writerLlm,
    RoleGoalBackstory researcher,
    RoleGoalBackstory writer
) {}

@Agent(description = "Write a book by researching, outlining, and writing chapters")
public record BookWriter(BookWriterConfig config) {

    @Action
    ResearchReport researchTopic(BookRequest request, OperationContext context) {
        return context.ai()
            .withLlm(config.researcherLlm())
            .withPromptElements(config.researcher(), request)
            .withToolGroup(CoreToolGroups.WEB)
            .createObject("Research the topic thoroughly...", ResearchReport.class);
    }

    @Action
    BookOutline createOutline(BookRequest request, ResearchReport research, OperationContext context) {
        return context.ai()
            .withLlm(config.writerLlm())
            .withPromptElements(config.writer(), request, research)
            .createObject("Create a book outline...", BookOutline.class);
    }

    @AchievesGoal(export = @Export(remote = true))
    @Action
    Book writeBook(BookRequest request, BookOutline outline, OperationContext context) {
        // Parallel chapter writing with crew-like coordination
        var chapters = context.parallelMap(outline.chapterOutlines(),
            config.maxConcurrency(),
            chapterOutline -> writeChapter(request, outline, chapterOutline, context));
        return new Book(request, outline.title(), chapters);
    }
}
```

**Key Advantages:**

* **Type Safety**: Compile-time validation of data flow
* **Spring Integration**: Leverage existing enterprise infrastructure
* **Automatic Planning**: GOAP planner handles task sequencing, and is capable of more sophisticated planning
* **Tool Integration with the JVM**: Native access to existing Java/Kotlin services

#### 4.40.2. Migrating from Pydantic AI

Pydantic AI provides a Python framework for building AI agents with type safety and validation.
Embabel offers similar capabilities in the JVM ecosystem with stronger integration into enterprise environments.

##### Core Concept Mapping

| Pydantic AI Concept | Embabel Equivalent | Notes |
| --- | --- | --- |
| **@system\_prompt decorator** | PromptContributor classes | More flexible and composable prompt management |
| **@tool decorator** | Equivalent `@Tool` annotated methods can be included on agent classes and domain objects | **Agent class** |
| `@Agent` annotated record/class | Declarative agent definition with Spring integration | **RunContext** |
| Blackboard state, accessible via `OperationContext` but normally not a concern for user code | **SystemPrompt** | Custom `PromptContributor` |
| Structured prompt contribution system | **deps parameter** | Spring dependency injection |

##### Migration Example

**Pydantic AI Pattern:**

```
# Based on https://ai.pydantic.dev/examples/bank-support/
from pydantic_ai import Agent, RunContext
from pydantic_ai.tools import tool

@system_prompt
def support_prompt() -> str:
    return "You are a support agent in our bank"

@tool
async def get_customer_balance(customer_id: int, include_pending: bool = False) -> float:
    # Database lookup
    customer = find_customer(customer_id)
    return customer.balance + (customer.pending if include_pending else 0)

agent = Agent(
    'openai:gpt-4-mini',
    system_prompt=support_prompt,
    tools=[get_customer_balance],
)

result = agent.run("What's my balance?", deps={'customer_id': 123})
```

**Embabel Equivalent:**

```
// From embabel-agent-examples/examples-java/src/main/java/com/embabel/example/pydantic/banksupport/SupportAgent.java

record Customer(Long id, String name, float balance, float pendingAmount) {

    @Tool(description = "Find the balance of a customer by id")
    float balance(boolean includePending) {
        return includePending ? balance + pendingAmount : balance;
    }
}

record SupportInput(
    @JsonPropertyDescription("Customer ID") Long customerId,
    @JsonPropertyDescription("Query from the customer") String query) {
}

record SupportOutput(
    @JsonPropertyDescription("Advice returned to the customer") String advice,
    @JsonPropertyDescription("Whether to block their card or not") boolean blockCard,
    @JsonPropertyDescription("Risk level of query") int risk) {
}

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

**Key Advantages:**

* **Enterprise Integration**: Native Spring Boot integration with existing services
* **Compile-time Safety**: Strong typing catches errors at build time
* **Automatic Planning**: GOAP planner handles complex multi-step operations
* **JVM Ecosystem**: Access to mature libraries and enterprise infrastructure

#### 4.40.3. Migrating from LangGraph

LangGraph builds agent workflows using a state machine.

See the blog [Build Better Agents in Java vs Python: Embabel vs LangGraph](https://medium.com/@springrod/build-better-agents-in-java-vs-python-embabel-vs-langgraph-f7951a0d855c)
for a detailed comparison of common patterns between LangGraph and Embabel.

#### 4.40.4. Migrating from Google ADK

tbd

### 4.41. API Evolution

We strive to avoid breaking changes.

Because Embabel builds on Spring’s POJO support, framework code dependencies are localized and minimized.

The key core surface area is the `Ai` and `PromptRunner` interfaces, which we will strive to avoid breaking.

For maximum stability:

* If possible, use the latest stable version of `embabel-agent` rather than a snapshot.
  Snapshots may change frequently.
* Avoid using types under the `com.embabel.agent.experimental` package.
* Be aware of the status of the Embabel modules you use
* Avoid using any method or class marked with the `@ApiStatus.Experimental` or `@ApiStatus.Internal` annotations.

|  |  |
| --- | --- |
|  | application code should not depend on any types under the `com.embabel.agent.spi` package. This is intended for provision of runtime infrastructure only, and may change without notice. |

## 5. Asynchronous Mode and Java 25

Async Configuration got defined in *AsyncConfiguration.kt*.
Default implementation employs spring-managed task executor with virtual threads being configured in:

```
agent-application.properties

spring.threads.virtual.enabled=true
```

If spring managed task executor cannot be obtained, implementation falls back to default task executor, *Executors.newCachedThreadPool()*.

Framework employs *Asyncer* abstraction consistently cross Agent Invocation (see [Invoking Embabel Agents](#reference.invoking) ), Agent Actions, Tool Loop, ShellCommands, and other scenarios.

### 5.1. Java 25 Implications

Prior to Java 25, the JVM was imprecise when reading container CPU limits â it often saw the host’s full CPU count rather than the container’s cgroup allocation. Java 25 corrects this to accurately respect cgroup CPU limits (e.g., Kubernetes resources.limits.cpu).

Related OpenJDK ticket: [JDK-8362881]([bugs.openjdk.org/browse/JDK-8362881](https://bugs.openjdk.org/browse/JDK-8362881))

When running Embabel on Java 25 inside containers (Docker/Kubernetes), all agent actions execute serially instead of in parallel. As mentioned above this is caused by Java 25’s improved (more accurate) cgroup CPU detection, which reports availableProcessors() = 1 in CPU-constrained containers. Since ForkJoinPool.commonPool sizes its parallelism based on this value, the effective parallelism drops to 1, serializing all concurrent agent operations.

| JVM Version | availableProcessors() | Common pool parallelism | Behavior |
| --- | --- | --- | --- |
| Pre-25 | Host CPU count (e.g., 8) | 7 | Actions run in parallel |
| 25 | Container CPU limit (e.g., 1) | 1 (minimum) | Actions serialize |

Also, note: modern (post 1.3) Kotlin coroutines implementation in Dispatchers.Default and Dispatchers.IO is backed by Kotlinâs own coroutine scheduler, not Javaâs ForkJoinPool.commonPool().

#### 5.1.1. Why Embabel is Safe

1. Asyncer Abstraction â All parallel execution routes through ExecutorAsyncer
2. Spring Executor â Uses applicationTaskExecutor (ThreadPoolTaskExecutor), not ForkJoinPool
3. Fallback Safety â Even fallback uses newCachedThreadPool(), not ForkJoinPool
4. Coroutine Defaults â Production code uses Dispatchers.IO, not Dispatchers.Default

If Users report serialization issues on Java 25, recommendation is to check for:

1. Custom code using CompletableFuture.supplyAsync() without explicit executor
2. Custom code using Dispatchers.Default (Kotlin coroutines)
3. Spring misconfiguration â applicationTaskExecutor not properly configured
4. Third-party libraries that depend on ForkJoinPool.commonPool

#### 5.1.2. Workarounds (if needed)

Even though Embabel core is safe, users can apply below settings if they have custom code affected:

Option 1: Set container CPU limits

```
# Kubernetes
resources:
limits:
cpu: "4"
requests:
cpu: "2"
```

Option 2: Override ForkJoinPool parallelism

```
java -Djava.util.concurrent.ForkJoinPool.common.parallelism=4 -jar agent.jar
```

## 6. Design Considerations

Embabel is designed to give you the ability to determine the correct balance between LLM autonomy and control from code.
This section discusses the design considerations that you can use to achieve this balance.

### 6.1. Domain objects

A rich domain model helps build a good agentic system.
Domain objects should not merely contain state, but also expose behavior.
Avoid the [anemic domain model](https://en.wikipedia.org/wiki/Anemic_domain_model).
Domain objects have multiple roles:

1. *Ensuring type safety and toolability.*
   Code can access their state; prompts will be strongly typed; and LLMs know what to return.
2. *Exposing behavior to call in code*, exactly as in any well-designed object-oriented system.
3. *Exposing tools to LLMs*, allowing them to call domain objects.

The third role *is* novel in the context of LLMs and Embabel.

|  |  |
| --- | --- |
|  | When designing your domain objects, consider which methods should be callable by LLMs and which should not. |

Expose methods that LLMs should be able to call using the `@Tool` annotation:

Java
:   ```
    @Tool(description = "Build the project using the given command in the root") (1)
    public String build(String command) {
        BuildResult br = ci.buildAndParse(new BuildOptions(command, true));
        return br.relevantOutput();
    }
    ```

Kotlin
:   ```
    @Tool(description = "Build the project using the given command in the root") (1)
    fun build(command: String): String {
        val br = ci.buildAndParse(BuildOptions(command, true))
        return br.relevantOutput()
    }
    ```

|  |  |
| --- | --- |
| **1** | The Spring AI `@Tool` annotation indicates that this method is callable by LLMs. |

When an `@Action` method issues a prompt, tool methods on all domain objects are available to the LLM.

You can also add additional tool methods with the `withToolObjects` method on `PromptRunner`.

Domain objects may or may not be persistent.
If persistent, they will likely be stored in a familiar JVM technology such as JPA or JDBC.
We advocate the use of [Spring Data](https://spring.io/projects/spring-data) patterns and repositories, although you are free to use any persistence technology you like.

### 6.2. Tool Call Choice

When to use MCP or other tools versus method calls in agents

### 6.3. Mixing LLMs

It’s good practice to use multiple LLMs in your agentic system.
Embabel makes it easy.
One key benefit of breaking functionality into smaller actions is that you can use different LLMs for different actions, depending on their strengths and weaknesses.
You can also the cheapest (greenest) possible LLM for a given task.

## 7. Contributing

Open source is a wonderful thing.
We welcome contributions to the Embabel project.

How to contribute:

* Familiarize yourself with the project by reading the documentation.
* Familiarize yourself with the [issue tracker](https://github.com/embabel/embabel-agent/issues/) and open pull requests to ensure you’re not duplicating something.
* [Sign your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)
* Always include a description with your pull requests. **PRs without descriptions will be closed.**
* Join the Embabel community on Discord at [discord.gg/t6bjkyj93q](https://discord.gg/t6bjkyj93q).

Contributions are not limited to code.
You can also help by:

* Improving the documentation
* Reporting bugs
* Suggesting new features
* Engaging with the community on Discord
* Creating examples and other materials
* Talking about Embabel at meetups and conferences
* Posting about Embabel on social media

When contributing code, **do** augment your productivity using coding agents and LLMs, but avoid these pitfalls:

* **Excessive LLM comments that add no value**.
  Code should be self-documenting.
  Comments are for things that are non-obvious.
* **Bloated PR descriptions and other content.**

Nothing personal, but such contributions will automatically be rejected.

|  |  |
| --- | --- |
|  | You must understand anything you contribute. |

## 8. Resources

### 8.1. Rod Johnson’s Blog Posts

* [Embabel: A new Agent Platform For the JVM](https://medium.com/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014) - Introduction to the Embabel agent framework, explaining the motivation for building an agent platform specifically for the JVM ecosystem.
  Covers the key differentiators and benefits of the approach.
* [The Embabel Vision](https://medium.com/@springrod/the-embabel-vision-967654f13793) - Rod Johnson’s vision for the future of agent frameworks and how Embabel fits into the broader AI landscape.
  Discusses the long-term goals and strategic direction of the project.
* [Context Engineering Needs Domain Understanding](https://medium.com/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8) - Deep dive into the DICE (Domain-Integrated Context Engineering) concept and why domain understanding is fundamental to effective context engineering in AI systems.

### 8.2. Examples and Tutorials

* [Creating an AI Agent in Java Using Embabel Agent Framework](https://www.baeldung.com/java-embabel-agent-framework) by Baeldung - A nice introductory example, in Java.
* [Building Agents With Embabel: A Hands-On Introduction](https://jettro.dev/building-agents-with-embabel-a-hands-on-introduction-4f96d2edeac0) by Jettro Coenradie - An excellent Java tutorial.

#### 8.2.1. Embabel Agent Examples Repository

The [Examples Repository](https://github.com/embabel/embabel-agent-examples) is a comprehensive collection of example agents demonstrating different aspects of the framework:

* **Beginner Examples**: Simple horoscope agents showing basic concepts
* **Intermediate Examples**: Multi-LLM research agents with self-improvement
* **Advanced Examples**: Fact-checking agents with parallel verification and confidence scoring
* **Integration Examples**: Agents that use web tools, databases, and external APIs

Perfect starting point for learning Embabel development with hands-on examples.

#### 8.2.2. Java Agent Template

[Template repository](https://github.com/embabel/java-agent-template) for creating new Java-based Embabel agents.
Includes:

* Pre-configured project structure
* Example WriteAndReviewAgent demonstrating multi-LLM workflows
* Build scripts and Docker configuration
* Getting started documentation

#### 8.2.3. Kotlin Agent Template

[Template repository](https://github.com/embabel/kotlin-agent-template) for Kotlin-based agent development with similar features to the Java template but using idiomatic Kotlin patterns.

### 8.3. Sophisticated Example: Tripper Travel Planner

#### 8.3.1. Tripper - AI-Powered Travel Planning Agent

[Tripper](https://github.com/embabel/tripper) is a production-quality example demonstrating advanced Embabel capabilities:

**Features:**

* Generates personalized travel itineraries using multiple AI models
* Integrates web search, mapping, and accommodation search
* Modern web interface built with htmx
* Containerized deployment with Docker
* CI/CD pipeline with GitHub Actions

**Technical Highlights:**

* Uses both Claude Sonnet and GPT-4.1-mini models
* Demonstrates domain-driven design principles
* Shows how to build user-facing applications with Embabel
* Practical example of deterministic planning with AI

**Learning Value:**

* Real-world application of Embabel concepts
* Integration patterns with external services
* Production deployment considerations
* User interface design for AI applications

### 8.4. Goal-Oriented Action Planning (GOAP)

* Here’s an [Introduction to GOAP](https://medium.com/@vedantchaudhari/goal-oriented-action-planning-34035ed40d0b), the planning algorithm used by Embabel.
  Explains the core concepts and why GOAP is effective for AI agent planning.

#### 8.4.1. Small Language Model Agents - NVIDIA Research

* This [Research paper](https://research.nvidia.com/labs/lpr/slm-agents/) discusses the division between "code agency" and "LLM agency" - concepts that inform Embabel’s architecture.

#### 8.4.2. OODA Loop - Wikipedia

Here’s a [Background](https://en.wikipedia.org/wiki/OODA_loop) on the Observe-Orient-Decide-Act loop that underlies Embabel’s replanning approach.

### 8.5. Domain-Driven Design

* Martin Fowler’s [Foundational concepts of Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html) provides a good summary of Embabel’s approach to domain modeling.

#### 8.5.1. Domain-Driven Design: Tackling Complexity in the Heart of Software

* Eric Evans' [seminal book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) on DDD principles.
  Essential reading for understanding how to model complex domains effectively.

#### 8.5.2. DDD and Contextual Validation

* [Advanced DDD concepts](https://www.infoq.com/articles/ddd-contextual-validation/) relevant to building sophisticated domain models for AI agents.

## 9. APPENDIX

## 10. Planning Module

### 10.1. Abstract

Lower level module for planning and scheduling. Used by Embabel Agent Platform.

### 10.2. A\* GOAP Planner Algorithm Overview

```
The A* GOAP (Goal-Oriented Action Planning) Planner is an implementation of the A* search
algorithm specifically designed for planning sequences of actions to achieve specified goals.
The algorithm efficiently finds the optimal path from an initial world state to a goal state by
exploring potential action sequences and minimizing overall cost.
```

#### 10.2.1. Core Algorithm Components

```
The A* GOAP Planner consists of several key components:
```

1. **A** Search\*: Finds optimal action sequences by exploring the state space
2. **Forward Planning**: Simulates actions from the start state toward goals
3. **Backward Planning**: Optimizes plans by working backward from goals
4. **Plan Simulation**: Verifies that plans achieve intended goals
5. **Pruning**: Removes irrelevant actions to create efficient plans
6. **Unknown Condition Handling**: Manages incomplete world state information

#### 10.2.2. A\* Search Algorithm

```
The A* search algorithm operates by maintaining:
```

* **Open List**: A priority queue of states to explore, ordered by f-score
* **Closed Set**: States already fully explored
* **g-score**: Cost accumulated so far to reach a state
* **h-score**: Heuristic estimate of remaining cost to goal
* **f-score**: Total estimated cost (g-score + h-score)

#### 10.2.3. Process Flow

1. **Initialization**:

   * Begin with the start state in the open list
   * Set its g-score to 0 and calculate its h-score
2. **Main Loop**:

   * While the Open List is not empty:

     + Select the state with the lowest f-score from the open list
     + If this state satisfies the goal, construct and return the plan
     + Otherwise, mark the state as processed (add to closed set)
     + For each applicable action, generate the next state and add to open list if it better
       than existing paths
3. **Path Reconstruction**:
   When a goal state is found, reconstruct the path by following predecessors

   * Create a plan consisting of the sequence of actions

     ```
     _Reference: link:goap/AStarGoapPlanner.kt[AStarGoapPlanner]:planToGoalFrom:_
     ```

#### 10.2.4. Forward and Backward Planning Optimization

```
The planner implements a two-pass optimization strategy to eliminate unnecessary actions:
```

##### Backward Planning Optimization

```
This pass works backward from the goal conditions to identify only actions that contribute to
achieving the goal
```

```
_Reference: link:goap/AStarGoapPlanner.kt[AStarGoapPlanner]:_backwardPlanningOptimization___
```

##### Forward Planning Optimization

```
This pass simulates the plan from the start state and removes actions that don't make progress
toward the goal:
```

```
_Reference: link:goap/AStarGoapPlanner.kt[AStarGoapPlanner]:_forwardPlanningOptimization___
```

##### Plan Simulation

```
Plan simulation executes actions in sequence to verify the plan's correctness:
```

```
_Reference: function simulatePlan(startState, actions)_
```

#### 10.2.5. Pruning Planning Systems

```
The planner can prune entire planning systems to remove irrelevant actions:
```

Java
:   ```
    PlanningSystem prune(PlanningSystem planningSystem) {
        // Get all plans to all goals
        List<Plan> allPlans = plansToGoals(planningSystem);
        // Keep only actions that appear in at least one plan
        Set<Action> filteredActions = planningSystem.getActions().stream()
            .filter(action -> allPlans.stream()
                .anyMatch(plan -> plan.getActions().contains(action)))
            .collect(Collectors.toSet());
        return planningSystem.withActions(filteredActions);
    }
    ```

Kotlin
:   ```
    fun prune(planningSystem: PlanningSystem): PlanningSystem {
        // Get all plans to all goals
        val allPlans = plansToGoals(planningSystem)
        // Keep only actions that appear in at least one plan
        return planningSystem.copy(
            actions = planningSystem.actions.filter { action ->
                allPlans.any { plan -> plan.actions.contains(action) }
            }.toSet()
        )
    }
    ```

##### Heuristic Function

```
The heuristic function estimates the cost to reach the goal from a given state:
```

#### 10.2.6. Complete Planning Process

1. Initialize with start state, actions, and goal conditions
2. Run A\* search to find an initial action sequence
3. Apply backward planning optimization to eliminate unnecessary actions
4. Apply forward planning optimization to further refine the plan
5. Verify the plan through simulation
6. Return the optimized action sequence or null if no valid plan exists

### 10.3. Agent Pruning Process

```
When pruning an agent for specific goals:
```

1. Identify all known conditions in the planning system
2. Set initial state based on input conditions
3. Find all possible plans to each goal
4. Keep only actions that appear in at least one plan
5. Create a new agent with the pruned action set

   ```
   This comprehensive approach ensures agents contain only the actions necessary to achieve their
   designated goals, improving efficiency and preventing action leakage between different agents.
   ```

#### 10.3.1. Progress Determination Logic in A\* GOAP Planning

```
The progress determination logic in method *forwardPlanningOptimization* is a critical part of
the forward planning optimization in the A* GOAP algorithm. This logic ensures that only actions
that meaningfully progress the state toward the goal are included in the final plan.
```

##### Progress Determination Expression

Java
:   ```
    boolean progressMade = !nextState.equals(currentState) &&
        action.getEffects().entrySet().stream().anyMatch(entry -> {
            String key = entry.getKey();
            Object value = entry.getValue();
            return goal.getPreconditions().containsKey(key) &&
                !Objects.equals(currentState.get(key), goal.getPreconditions().get(key)) &&
                (Objects.equals(value, goal.getPreconditions().get(key)) || !nextState.containsKey(key));
        });
    ```

Kotlin
:   ```
    val progressMade = nextState != currentState &&
        action.effects.any { (key, value) ->
            goal.preconditions.containsKey(key) &&
            currentState[key] != goal.preconditions[key] &&
            (value == goal.preconditions[key] || key !in nextState)
        }
    ```

##### Detailed Explanation

```
The expression evaluates to true only when an action makes meaningful progress toward achieving
the goal state. Let's break down each component:
```

1. `nextState != currentState`

   * Verifies that the action actually changes the world state
   * Prevents including actions that have no effect
2. `action.effects.any { …​ }`

   * Examines each effect the action produces
   * Returns true if ANY effect satisfies the inner condition
3. `goal.preconditions.containsKey(key)`

   * Ensures we only consider effects that relate to conditions required by the goal
   * Ignores effects that modify conditions irrelevant to our goal
4. `currentState[key] != goal.preconditions[key]`

   * Checks that the current condition value differs from what the goal requires
   * Only counts progress if we’re changing a condition that needs changing
5. `(value == goal.preconditions[key] || key not in nextState)`

   * This checks one of two possible ways an action can make progress:
   * `value == goal.preconditions[key]`

     + The action changes the condition to exactly match what the goal requires
     + Direct progress toward goal achievement
   * `key not in nextState`

     + The action removes the condition from the state entirely
     + This is considered progress if the condition was previously in an incorrect state
     + Allows for actions that clear obstacles or reset conditions

Last updated 2026-06-09 14:38:19 UTC
