# AI Focus Groups That Evolve Your Messaging While You Sleep | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/ai-focus-groups-that-evolve-your-messaging-while-you-sleep-3c7b2a836a17](https://medium.com/@springrod/ai-focus-groups-that-evolve-your-messaging-while-you-sleep-3c7b2a836a17)
**來源網站**: medium.com

---

# AI Focus Groups That Evolve Your Messaging While You Sleep

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--3c7b2a836a17---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--3c7b2a836a17---------------------------------------)

7 min read

·

Oct 21, 2025

--

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D3c7b2a836a17&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fai-focus-groups-that-evolve-your-messaging-while-you-sleep-3c7b2a836a17&source=---header_actions--3c7b2a836a17---------------------post_audio_button------------------)

Share

## The Problem with Traditional Focus Groups

[Focus groups](https://en.wikipedia.org/wiki/Focus_group) are expensive. Getting the right people into a room costs thousands of dollars and weeks of coordination. You get one shot at feedback, then it’s back to the drawing board. What if you could run hundreds of iterations overnight for the cost of a coffee?

**Enter AI personas.** But let’s not stop at synthetic feedback. Let’s build a system where AI creatives automatically improve messaging based on that feedback, iterating until they hit a the quality threshold.

This is the power of agentic AI with intelligent planning.

## What We’re Building

Using [Embabel’s](https://github.com/embabel/embabel-agent) [GOAP (Goal-Oriented Action Planning)](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6), we’ll create an agent that:

1. **Generates** message variants using AI creatives with distinct personalities
2. **Tests** those variants against diverse AI personas in virtual focus groups
3. **Analyzes** reactions with quantified [Likert ratings](https://en.wikipedia.org/wiki/Likert_scale)
4. **Evolves** messaging automatically based on feedback
5. **Iterates** until hitting quality targets or resource limits

The complete implementation lives in the [Embabel grouper repo](https://github.com/embabel/grouper).

**Fair warning:** This won’t yet replace Don Draper. But it’s a powerful exploration tool and demonstrates architectural patterns you can adapt for your own goal-driven AI systems.

![We still need Don Draper (perhaps)]()

## Architecture: Start with the Domain Model

Building agents is just software engineering**.** Domain modelling is as important as ever.

Our model centers on these concepts:

* **Message**: A core concept (“smoking is bad”) with an objective (“deter smoking”) and deliverable (“billboard slogan”)
* **MessageVariant**: Specific wording attempts (“Smoking ages your skin 10 years faster”)
* **Participant**: Virtual focus group member with defined LLM and parameters
* **FocusGroup**: Collection of participants representing your target audience
* **FocusGroupRun**: One complete evaluation cycle
* **Reaction**: Structured feedback from each participant
* **BestScoringVariants**: Top performing message variants, tracked across iterations

Where appropriate we encapsulate behaviour in these types, such as stats calculations in `FocusGroupRun` and sorting for `BestScoringVariants.`

The domain model is largely AI-agnostic. Designing it took longer than implementing the agent, and that’s fine. The upfront investment will pay dividends in maintainability and extensibility.

## Actions and Goals

Just as we’ve broken the concepts down into individual types, we’ll break the overall flow into **actions** and **goals**. An Embabel action is an annotated Java method that performs a step, which may or may not interact with an LLM. A goal is achieved when we have the final result.

Actions and goals are defined in terms of domain types.

## Capturing Reactions: Making LLMs Return Structured Data

We model a participant’s reaction as a Java type that will be instantiated in response to an LLM call:

```
public record Reaction(  
    @JsonPropertyDescription("Things that resonate about the message")  
    String positives,  
    @JsonPropertyDescription("Things that backfire about the message")  
    String negatives,  
    @JsonProperty("Quotes saying how this message makes me feel")  
    List<String> quotes,  
    @JsonPropertyDescription("Likert rating")  
    LikertRating rating  
) {}
```

The `@JsonPropertyDescription` annotations help the LLM to populate fields correctly. While sensible naming is usually enough, explicit descriptions can help explain exactly what each field means.

The `LikertRating` translates qualitative feedback into quantitative scores we can optimize:

```
public record LikertRating(Scale scale) {  
  
  /**  
   * Likert scale rating  
   */  
  public enum Scale {  
      STRONGLY_DISAGREE(0.0),  
      DISAGREE(0.25),  
      NEUTRAL(0.5),  
      AGREE(0.75),  
      STRONGLY_AGREE(1.0);  
  
      private final double value;  
  
      Scale(double value) {  
          this.value = value;  
      }  
  
      public double getValue() {  
          return value;  
      }  
  }  
  
  /**  
   * Return a score from 0-1 where 0 is strongly disagree  
   */  
  public double score() {  
      return scale.getValue();  
  }  
}
```

These numbers will drive our fitness function.

## Running Focus Groups: Type Safe Prompts

Embabel’s `PromptRunner` lets us build prompts in a type-safe, composable way:

```
var reaction = context.ai()  
    .withLlm(participant.llm())  
    .withPromptContributor(participant)           
    .creating(Reaction.class)  
    .fromPrompt("""  
        You are a member of a focus group.  
        Your replies are confidential—be honest without fear of judgment.  
          
        React to this message given your persona:  
        <message>%s</message>  
          
        Assess whether it achieves this objective:  
        <objective>%s</objective>  
          
        Consider its effectiveness as:  
        <deliverable>%s</deliverable>  
        """.formatted(variant.wording(), objective, deliverable));
```

> Make the structure of your prompt as clear as possible to the LLM. Pseudo XML tags like `<objective>…</objective>` are just one way to do it.

With the extra system message Embabel automatically puts in for current date and knowledge cutoff, prompts will look like this:

```
Messages  ⇩  .......................................................................................  
  SYSTEM <Current date: 2025-10-21  
  ----  
  NAME: Tom  
  IDENTITY:  
  a 16 year old boy who lives in Chertsey and wants to study PPE at Cambridge.  You are a member of the young conservatives.  You go to the gym every day and have run a mile in 4:30.  
  ----  
  Knowledge cutoff: 2024-08  
  >  
  ....................................................................................................  
  USER <You are a member of a focus group.  
  Your replies are confidential and you don't need to worry about  
  anyone knowing what you said, so you can share your feelings  
  honestly without fear of judgment or consequences.  
  Be honest.  
  React to the following message given your persona:  
  <message>Look at old people who smoke. They wish they hadn't started at your age</message>  
  Assess in terms of whether it would produce the following objective in your mind:  
  <objective>To deter the participant from wanting to smoke</objective>  
  Also consider whether it is effective as <deliverable>A concise, memorable slogan for use in a national campaign aimed at British teenagers  
  Imagine it on the side of every second bus in London or on billboards across the UK.  
  The slogan should be concise and one that people will remember for years,  
  like "Just do it" from Nike or "Think different" from Apple.  
  It could be accompanied by an impactful image but the focus is on the wording.  
  </deliverable>  
  >
```

## Parallelization Without Getting Rate-Limited

LLM calls are slow. Run them serially and you’ll wait forever. Run them all at once and you’ll hit rate limits.

Embabel’s `parallelMap` handles this elegantly:

```
var results = context.parallelMap(  
    focusGroupRun.combinations,  
    config.maxConcurrency(),  
    presentation -> evaluateReaction(presentation, context)  
);
```

## The Magic: Iterative Evolution with GOAP

We want the agent to keep evolving messages until they’re good enough — or we run out of budget.

Traditional imperative code would use a while loop. Embabel uses **declarative goals and conditions**:

```
@Action(pre = {RUN_FOCUS_GROUP_CONDITION},   
        post = {DONE_CONDITION},   
        canRerun = true)  
FocusGroupRun runFocusGroup(  
    FocusGroup focusGroup,  
    Positioning positioning,  
    BestScoringVariants bestVariants,  
    OperationContext context) { ... }  
  
@Action(cost = 1.0, post = {DONE_CONDITION}, canRerun = true)  
Positioning evolvePositioning(  
    FocusGroupRun run,  
    BestScoringVariants bestVariants,  
    Ai ai) { ... }  
  
@Action(pre = {DONE_CONDITION})  
@AchievesGoal(description = "Focus group has evaluated positioning")  
BestScoringVariants results(BestScoringVariants best) { ... }
```

The `DONE_CONDITION` checks our fitness function:

```
@Condition(name = DONE_CONDITION)  
boolean done(FocusGroupRun run, OperationContext context) {  
    return context.count(FocusGroupRun.class) >= maxIterations  
        || fitnessFunction.test(run);  
}
```

**This is powerful.** The GOAP planner automatically orchestrates the iteration loop. You declare what needs to be true, not how to make it true.

## Creative Diversity: Multiple AI Copywriters

Different AI models and temperatures produce different creative styles. We configure multiple “creative” personas in YAML, binding to the embabel `Actor` type via normal Spring Boot configuration handling:

```
grouper:  
  creatives:  
    - persona:  
        role: Creative star at global advertising agency  
        goal: Conceive memorable, impactful campaigns  
        backstory: |  
          Experience across industries. Previously conceived   
          hugely successful, bold campaigns.  
      llm:  
        model: gpt-4.1  
        temperature: 0.4  # Conservative, polished  
    - persona:  
        role: Maverick copywriter breaking conventions  
        goal: Create provocative, unforgettable messaging  
        backstory: |  
          Award-winning campaigns that challenged status quo.  
          Makes people stop, think, and act.  
      llm:  
        model: gpt-4.1  
        temperature: 1.2  # Wild, experimental  
        
      - persona:  
        role: Data-driven marketing strategist  
        goal: Craft messages that resonate with audiences  
        backstory: |  
          Combines psychological insights with market research.  
          Campaigns consistently outperform in A/B testing.  
      llm:  
        model: claude-sonnet-4-5  
        temperature: 0.2  # Precise, analytical
```

After each focus group run, a chosen creative evaluates previous feedback and generates new variants, using this prompt:

```
var creativeControl = nextCreative()  
    .promptRunner(ai)  
    .withPromptContributor(message)  
    .creating(CreativeControl.class)  
    .fromPrompt("""  
        Given this feedback and previous learnings:  
        %s  
          
        1. Summarize feedback in max %d words  
        2. Create new message wordings to test  
          
        Be creative. Break through!  
        Refine promising attempts or try completely new angles.  
        Maximum %d variants.  
          
        Best performers so far:  
        %s  
        """.formatted(feedback, wordLimit, maxVariants, bestSoFar));
```

## Real Results: Does It Work?

After 15 iterations on anti-smoking slogans for British teenagers (cost: ~15 cents), here are the top-scoring variants:

* **0.73**: *Smoking ages your skin 10 years faster*
* **0.72**: *Cigarettes age you faster than time*
* **0.69**: *Wrinkles: The Real Price of Smoking*
* **0.68**: *Smoking adds 10 years to your face*
* **0.67**: *Smoking doesn’t pause aging. It accelerates it*

Not bad for pocket change. The agent found that teenagers care deeply about appearance and aging , and came to focus messages on vanity rather than distant health consequences.

**Could this do better?** Absolutely. Invest more in iterations, use frontier models for creatives, and define more representative participants. The architecture, based on a real domain model, is solid and extensible.

## Why This Pattern Matters

This isn’t just about focus groups. The pattern — **iterate until a fitness function is satisfied** — can be applied in many cases, such as:

* **Code generation**: Evolve implementations until tests pass and performance targets are met
* **Content optimization**: Refine any kind of copy until metrics are met
* **API design**: Evolve interfaces until usability scores from synthetic developers hit targets

Anywhere you have a measurable goal and an ability to generate variations, this pattern works.

## Try It Yourself

The code lives in the [Embabel grouper repository](https://github.com/embabel/grouper).

**Quick experiments**, with no code changes needed, as messages and participants are defined in YML:

* Add richer participant backstories
* Make focus groups more demographically representative
* Experiment with creative personas and temperatures
* Use more expensive models

**Advanced directions:**

* Integrate web search so personas stay current on cultural trends
* Implement genetic algorithms to breed high-performing message variants
* Add multi-objective optimization by enriching the fitness function (maximize impact while minimizing offense)

## Get Started

Ready to build your own goal-driven agents? Start with the [Embabel java-agent-template](https://github.com/embabel/java-agent-template).

The future of software isn’t just calling LLMs — it’s building systems that use LLMs to iteratively achieve goals. GOAP planning makes this architectural pattern accessible and maintainable.

**What will you build?**
