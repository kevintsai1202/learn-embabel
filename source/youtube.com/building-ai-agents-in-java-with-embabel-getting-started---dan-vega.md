# Building AI Agents in Java with Embabel (Getting Started)

**影片網址**: [https://www.youtube.com/watch?v=G5VDQCZu6t0](https://www.youtube.com/watch?v=G5VDQCZu6t0)
**影片 ID**: `G5VDQCZu6t0`

## 影片簡介
Rod Johnson, the creator of Spring Framework, has launched Embabel. A framework for building AI agents on the JVM. He's called it his most important project ...

---

## 影片逐字稿 (Transcript)
[00:00] What a great time it is to be a Java
[00:01] developer and today we're going to take
[00:03] a look at Imbueble, a framework for
[00:06] authoring agentic flows on the JVM. So,
[00:09] I've talked a lot about Spring AI in the
[00:11] past and all the things I'm doing with
[00:13] AI. I've even built some agents in
[00:15] Spring AI. This has been on my list for
[00:18] a long time to take a look at Imbueble
[00:20] and I finally got a chance to sit down,
[00:22] learn a little bit about it and I'll
[00:24] tell you I'm really impressed with the
[00:26] framework. It has a lot of great
[00:27] features and it's currently on um I
[00:30] think 0.4.1
[00:32] maybe or 0.4.0 snapshot and there is a
[00:37] lot to like about the framework. So,
[00:39] today what we're going to do is take a
[00:41] quick look at what it is and why you
[00:43] might want to use it and then we'll go
[00:45] out and build a simple project. We there
[00:48] are some starters out there and some
[00:49] samples. We're going to start fresh and
[00:51] build a simple example that we could
[00:53] build on later if we want to, but it's
[00:55] going to introduce us to some of the
[00:58] concepts. So, with that uh I'm going to
[01:01] jump over to my screen here
[01:03] and actually I'll take me off so that we
[01:05] can see everything here. So, Imbueble
[01:08] pronounced Imbueble. I just said
[01:10] Imbueble and then pronounced it
[01:12] Imbueble. There's a pronunciation there
[01:14] in the docs. Framework for authoring
[01:16] agentic flows on the JVM that seamlessly
[01:18] mix LLM prompt interactions with code
[01:21] and domain models. Let's zoom in here a
[01:24] little bit. This was started by Rod
[01:26] Johnson. Yes, the Rod Johnson, the
[01:28] creator of Spring Framework, launched
[01:30] Imbueble as his new open source project.
[01:33] He described it as his most important
[01:35] project since he worked on founding
[01:38] Spring. So, let's talk about some of the
[01:41] core concepts of Imbueble. There's the
[01:43] idea of actions, goals, and plans which
[01:46] contribute to this GOOP, goal-oriented
[01:48] action planning. And so, if we take a
[01:50] look at actions, goals, and plans,
[01:53] actions are the building blocks of agent
[01:55] behavior, discrete steps an agent takes.
[01:59] Goals define what the agent is trying to
[02:01] achieve and the framework will
[02:03] dynamically formulate these. Plans,
[02:06] these are sequence of actions to reach a
[02:08] goal, replanning after each action is
[02:12] complete. This replanning loop is
[02:14] effectively an OODA loop allowing the
[02:17] system to adapt to new information. So,
[02:20] those are kind of the concrete blocks.
[02:22] Once you're getting started here, these
[02:25] are the main things that you want to
[02:26] understand, actions, goals, and plans.
[02:29] And so, goal-oriented programming
[02:31] uh uses a non-LLM AI algorithm to find
[02:35] the optimal path to a goal. This is
[02:38] deterministic, which is really a key
[02:41] point here and explainable, right? We
[02:43] need determinism in this world of
[02:45] non-deterministic calls that we're
[02:47] making.
[02:48] Not another LLM call. Imbueble also
[02:51] supports a utility AI out of the box,
[02:53] which chooses actions based on dynamic
[02:56] utility scores rather than a strict
[02:58] precondition and postcondition, which is
[03:01] valuable for explanation and open-ended
[03:03] tasks. If you're curious where GOOP
[03:06] comes from, Rod has explained this many
[03:08] times, but GOOP comes from the gaming
[03:10] world. It's a technique where each
[03:12] action has conditions that must be true
[03:15] before it can run and affects the change
[03:18] of the world state. A planner figures
[03:20] out which actions to chain together to
[03:22] reach a goal, making MPC behavior more
[03:25] flexible than traditional state
[03:27] machines.
[03:28] Also, finally I'll kind of just kind of
[03:30] round this out with something a couple
[03:32] of things that Imbueble really embraces.
[03:35] One is the idea of decomposition, right?
[03:37] This is a fundamental of software
[03:40] engineering and as Rod has pointed out
[03:42] many times in presentations, just
[03:45] because we're working on AI doesn't mean
[03:48] the fundamentals change. Decomposition
[03:51] in software development is the practice
[03:52] of breaking down a complex system,
[03:55] problem, or task into smaller smaller,
[03:58] more manageable parts. And that's what
[04:01] we're doing here. We're taking a goal,
[04:03] which is in the case of the example
[04:06] we'll walk through today, writing a new
[04:08] blog post, and we're breaking that down
[04:10] into different actions. Uh and then
[04:13] we'll come up with a plan to go ahead
[04:15] and achieve that goal.
[04:17] Imbueble also embraces type-safe domain
[04:20] models. It encourages strong typing for
[04:22] everything, both prompts and return
[04:25] types. Domain objects are typically
[04:27] Kotlin data classes or Java records,
[04:30] ensuring prompts are type-safe,
[04:31] toolable, and surviving refactoring.
[04:35] So, this is kind of my getting started,
[04:38] my first look at Imbueble. This is me
[04:41] going through a couple videos, some
[04:43] documentation, some sample projects, and
[04:46] really kind of pulling out what the
[04:48] important parts were to me.
[04:50] And if I didn't mention it before, this
[04:52] is built on Spring AI. It was actually
[04:55] written in Kotlin, but very Duke and
[04:58] Java friendly.
[04:59] So, with that uh let's get started with
[05:02] Imbueble.
[05:03] A couple of resources that you want to
[05:04] check out is GitHub. So, there's a mean
[05:07] github.com/imbueble.
[05:09] There's a bunch of projects underneath
[05:10] there. You can go ahead and and dig
[05:12] through the docs there.
[05:14] You can also go ahead and check out the
[05:15] documentation here. Um not a not a huge
[05:18] fan of the contrast here, but the
[05:20] documentation itself is really, really
[05:22] good.
[05:23] Um this is something I just started
[05:26] going through. I haven't actually had a
[05:28] chance to like really dive into the
[05:30] docs. I'm more at the 101 level right
[05:33] now. So, if you're there, that's okay.
[05:35] Get on the get on the train with me and
[05:37] we'll go through some of this. I have a
[05:39] lot more to explore and as I do, I will
[05:42] share my findings with you.
[05:44] So, to get started, there is some
[05:47] templates. Uh maybe I should kind of
[05:48] point those out. If you go in here,
[05:50] there's a Java template and a Kotlin
[05:52] template or you can use a project
[05:54] creator. I like to start fresh. I want
[05:56] to start with nothing but a Spring
[05:58] project and add Imbueble in there and
[06:00] then go ahead and create an agent. So,
[06:04] to do so, uh I don't believe it supports
[06:07] Spring AI 2.0 yet, which means you
[06:09] cannot use Spring Boot 4. That's okay.
[06:12] I'm sure it's coming at some point, but
[06:14] for right now, I'm going to use Spring
[06:16] Boot 3.5.13.
[06:18] I'm going to fill out my information
[06:20] here. Um we're going to call this a blog
[06:23] agent.
[06:24] Um and actually I already have one of
[06:26] those, so let's just call it the blog
[06:28] agent for blog agent. And then I'm going
[06:31] to add no dependencies. I don't need any
[06:33] dependencies. I'm going to add a couple
[06:35] dependencies in there and some
[06:37] repositories for the Imbueble specific
[06:39] stuff, but we won't need anything more
[06:42] than that. So, with that, we can
[06:44] generate a new project, download a zip
[06:46] file. You can open it up in whatever IDE
[06:48] or text editor you're most efficient in.
[06:50] For me, that's going to be IntelliJ. We
[06:52] have what we need. Let's write some
[06:54] code. All right. So, I haven't done
[06:55] anything special. This is just a normal
[06:57] Spring application. We'll need to make a
[06:58] couple modifications here to our um
[07:02] pom.xml.
[07:04] I am going to add some properties here.
[07:06] I think the example I had was in JDK 23,
[07:09] so I'll just use that. We're defining
[07:12] the version of Imbueble that we're using
[07:14] and again that is the 0.4.0 snapshot and
[07:18] Spring AI I'm using 1.1.4.
[07:22] Again, when I find out when this is uh
[07:25] supporting when this supports Spring
[07:26] Boot 4 and Spring AI 2.0, I will be sure
[07:30] to make a video on that.
[07:32] Okay, from a dependency management
[07:36] standpoint, let's go here. We're going
[07:39] to add um Spring AI uh the bomb in
[07:42] there, so we get the correct version and
[07:46] then uh for dependencies, we'll just
[07:49] need to add a couple here. So, I'm going
[07:50] to add these two in here, so we have our
[07:52] Spring Boot starter. We're going to add
[07:55] in the Imbueble agent starter shell. So,
[07:57] we're going to be building a shell agent
[07:59] today. Nothing stopping you from
[08:01] building say an MVC app, uh but I just
[08:04] find this uh this was some of the
[08:06] samples that I've seen and uh it gives
[08:09] you some nice things out of the box, so
[08:10] I'm going to start with that. And then
[08:12] you have to pick your models, which
[08:13] models you want to support. So, I'm
[08:15] picking OpenAI today, but you can add um
[08:19] Anthropic, Gemini, anything Spring AI
[08:21] supports and Imbueble will support. You
[08:23] can also add multiple models because as
[08:25] we'll see, one of the features of
[08:28] Imbueble is the ability to support
[08:30] multiple models and also go ahead and um
[08:34] select the right one for the right job.
[08:37] So, those are really the two
[08:38] dependencies that I need. Uh to get
[08:40] those, I'm going to pull in some
[08:42] repositories.
[08:44] So, let's go ahead and pull those in and
[08:47] with that, we should have everything we
[08:49] need. Let's see if Maven builds here
[08:52] okay and I think it will cuz I've done
[08:53] this before.
[08:55] Um but that's really what you need.
[08:56] Again, you can use one of those
[08:57] templates to get started with. I wanted
[08:59] to start with a fresh, brand new Spring
[09:02] app. I just feel I learn better that
[09:04] way, so uh to each his own, right?
[09:07] Okay.
[09:08] So, we have those things. One of those
[09:10] things that Imbueble really um
[09:13] encourages is type safety here and if we
[09:16] look at this, the types of the type-safe
[09:18] domain models
[09:20] um encouraging strong typing for
[09:22] everything from prompts to return types,
[09:24] right? So, I want to start with with a
[09:26] couple of just types that I'm going to
[09:29] work with in my system and this is kind
[09:31] of how I'd build any application, right?
[09:33] AI is no different. Uh it's just another
[09:35] integration here. So, I'm going to start
[09:37] with the idea of a blog draft. And
[09:40] actually this is going to be a record
[09:41] wherever we can use records uh
[09:43] encouraged to do that. So, I'm going to
[09:45] say that we're going to have a title and
[09:47] a content. That's it. So, we're going to
[09:49] start really easy. Got to got to walk
[09:52] before we can run, right? Um and then
[09:54] I'm going to have a record for a
[09:56] reviewed post. We're basically going to
[09:58] have two actions here. One to go ahead
[10:00] and write a blog post and two to go
[10:02] ahead and review it. So, I call this
[10:05] reviewed
[10:06] post.
[10:08] And again, Dan, why didn't you select
[10:10] record? Um this record is going to have
[10:13] a title,
[10:15] content, and feedback. So, any feedback
[10:19] it had when it reviewed our blog post.
[10:23] Okay?
[10:24] So, that is a good start. Um let's go
[10:27] ahead and create our agent. So, I'm
[10:30] going to create a new class here. We're
[10:32] going to call this the blog writer
[10:35] agent.
[10:36] All right. And here's where we start. We
[10:38] start with an annotation. So, there's
[10:40] this annotation programming model, which
[10:42] is really great, familiar to Spring
[10:44] developers. We're going to start with
[10:46] something called an agent, and we're
[10:48] going to give it a description. So, I'm
[10:50] going to say write Oh, oops. I need some
[10:53] of those. Write and review a blog post
[10:57] about a given
[11:01] topic, right? So, if we dive into agent,
[11:04] uh a couple of things to note here. This
[11:06] is annotated with @Component. This means
[11:09] that Spring will go ahead and manage
[11:11] this for us, which means we get all the
[11:13] benefits of Spring. So, if you need to
[11:16] ask for an instance of a class, you can
[11:17] go ahead and do it if it's managed by
[11:19] Spring. Um and we'll certainly kind of
[11:22] dive into some of that today.
[11:24] Um indicates that this class is an
[11:25] agent. It doesn't just contribute
[11:28] actions, goals, and conditions. It is an
[11:31] agent in itself. This is a Spring
[11:33] stereotype annotation. So, annotated
[11:35] classes will be picked up on the class
[11:37] path and injected either agent or agent
[11:40] capabilities should be used, not both.
[11:44] So, we are marking this as an agent.
[11:47] So, what we want to do now is basically
[11:49] create some actions, right? Remember, we
[11:52] have this idea of actions, goals, and
[11:56] plans. We want to create some actions
[11:59] first. So, let's go ahead and start with
[12:03] um
[12:04] a method here that is going to return a
[12:06] blog draft.
[12:09] And we'll go go ahead and call this
[12:10] write draft. And what this is going to
[12:13] take in is a couple of things. One, it's
[12:15] going to take in user input. This comes
[12:18] from Imbue. We'll call that input.
[12:21] And it's also going to get uh something
[12:24] in
[12:25] uh Imbue called AI. So, this is AI. And
[12:29] again, because we're in a Spring
[12:30] component, Spring is managing these for
[12:33] us.
[12:34] And AI is an interface, a gateway to AI
[12:36] functionality in the context of an
[12:38] operation. This includes both LLM and
[12:41] embedding models. So, that is going to
[12:45] um get us started. So, let's just say
[12:46] return null for now.
[12:48] And what we want to do is we want to
[12:50] mark this with the action annotation.
[12:53] So, this is going to be action. We're
[12:55] going to give this a description as
[12:57] well. Um let's just be a little bit more
[13:00] descriptive here. Write a first draft of
[13:04] the blog post, right? And so, that is
[13:07] our action. So, it's looking This is an
[13:11] agent. It's probably scanning agents for
[13:13] different actions. If And if we look at
[13:15] action here, um this is an annotation
[13:17] class.
[13:19] And if we scroll up, annotate annotation
[13:22] to indicate method implementing an
[13:24] action. Method can have a number of
[13:25] parameters, which represent necessary
[13:28] input types. Methods can return any
[13:30] type. The return type will become an
[13:33] effect. So, you see what this annotation
[13:35] takes, things like description, pre,
[13:38] post, can rerun. There's a whole bunch
[13:40] of things to dive into, but let's just
[13:42] keep it simple for now.
[13:44] So, now we actually need to return a
[13:46] blog draft from here. And so, how do we
[13:49] do that? So, we're going to start with
[13:50] AI.
[13:52] And uh actually, let's go ahead and
[13:54] configure a couple things first because
[13:56] we did not do that yet.
[13:58] So, in our application.yaml,
[14:01] we need to configure a couple of things.
[14:03] So, we start with Imbue.
[14:06] So, Imbue.
[14:08] And we want to set up um
[14:10] the different models that we'll use. So,
[14:13] we say models, and then we can set a
[14:15] default LLM. So, in my case, I'm going
[14:18] to say that
[14:19] uh GPT
[14:22] 5 mini is going to be my default model.
[14:25] It's cheaper, it's faster.
[14:27] Um but then we can also go ahead and set
[14:30] up LLM-specific ones. So, when we get to
[14:33] a reviewer later, we can say that that
[14:36] one uses a specific model, which is
[14:39] GPT-5. Now, this doesn't exist yet, so
[14:42] we don't really need that yet.
[14:44] Also, we need to go ahead and set up our
[14:47] OpenAI API key. So, I'm going to say
[14:50] uh agent,
[14:52] uh platform,
[14:54] models, OpenAI, and then our API key is
[14:58] that I have that in an environment
[15:01] variable, so that will work. So, that'll
[15:03] get us started.
[15:05] Um that looks good for now.
[15:07] Now that we have that set up, we can
[15:09] start to build out this first agent. So,
[15:11] I'm going to use the AI here, and there
[15:14] are a bunch of different things I can
[15:15] do. So, first off, I can say with
[15:17] default LLM. So, if we're going to just
[15:20] use that default LLM that we've kind of
[15:22] configured, we could use that.
[15:24] There are also um a bunch of other
[15:26] things we could do here. We could say
[15:29] Oops. We can say with LLM, and we can
[15:32] take in some LLM options. So, if I
[15:35] wanted to, I can say with uh LLM options
[15:38] with default LLM, and maybe I wanted to
[15:41] configure something like the
[15:43] temperature. Maybe I wanted to turn that
[15:44] up. This is how you configure your LLM
[15:48] options here. So, I'm going to leave the
[15:50] default on. That's fine. So,
[15:53] with default LLM.
[15:56] And then I'm going to give it an ID. So,
[15:58] this is just a string ID. We'll call
[16:01] this blog post
[16:03] draft writer. This will become important
[16:07] like with the reviewer. That's how we
[16:09] kind of referenced it in our properties.
[16:12] Um but that one is fine for now.
[16:15] And then what we're going to do is we
[16:16] can use this creating method. And the
[16:19] creating method takes a type. And this
[16:22] would allow us to make sure that we are
[16:24] working with uh strongly typed objects
[16:27] here. We're going to say that what we
[16:29] are going to get back is a blog draft,
[16:32] right? And so, that really helps us get
[16:34] it um that that structured output back.
[16:37] So, from there, uh I'm going to say from
[16:39] prompt, and we're going to use
[16:42] uh some text blocks here, and I'll just
[16:44] go ahead and copy and paste this in. So,
[16:48] I have uh you are a software developer
[16:51] and educator writing a blog post. Write
[16:53] a blog post about this. Keep it
[16:55] practical and beginner-friendly. Use
[16:57] short sentences and plain language.
[16:59] Include code examples, but keep them
[17:01] short and simple. Write the content in
[17:06] markdown.
[17:07] So, from there, I'm just going to say
[17:09] formatted, and we'll get to the user
[17:12] input.
[17:14] Uh actually, we just have Let's call
[17:16] that user input, so we understand that.
[17:19] So, this is going to be user input.
[17:22] And we'll say user input. That get
[17:25] content, right? Okay. So, we are getting
[17:29] there.
[17:30] Um and that's what we are going to
[17:32] return now. So, we can definitely start
[17:34] to improve on this, and we will, but
[17:37] this is a good first start. Um we can go
[17:40] ahead and write a draft. So, there is
[17:44] one action there, but there is no um
[17:48] other actions. So, we're going to add
[17:50] one in to basically review the post. And
[17:53] part of this is defining like how What
[17:56] is the outcome? How do we know when we
[17:58] achieve an outcome?
[18:00] And so, this is not the outcome, right?
[18:02] The outcome is we've written a draft,
[18:05] and we've reviewed it. So, I'm going to
[18:07] start a new action here.
[18:09] And we're going to say description, and
[18:11] this is going to be review and improve
[18:15] uh the draft, right? This should look
[18:18] pretty familiar. We're going to return
[18:20] that strongly typed reviewed post. So,
[18:23] we have a reviewed post here, and we'll
[18:25] just say review draft. And what we're
[18:28] going to take in is a blog draft. And
[18:31] again, we'll take in uh AI here. So,
[18:34] there's that.
[18:36] Okay. So, now we need to write out the
[18:38] action, but I want to write one more
[18:40] thing here. Because remember, we've
[18:41] talked about actions, goals, and plans.
[18:46] And to achieve a goal, we need to know
[18:47] like what action will help us achieve
[18:49] that. And we can mark this with achieves
[18:53] goal.
[18:54] And we can basically say the description
[18:56] for this is a reviewed
[19:00] and polished blog post, right? So, we
[19:04] are marking this with @AchievesGoal, and
[19:06] it says the annotation that can be added
[19:08] to an action method to indicate that its
[19:10] execution achieves a goal, right? This
[19:15] doesn't achieve a goal. Writing a first
[19:17] draft of a blog post is not the goal.
[19:20] What we want is a finely tuned blog post
[19:23] that has been reviewed, right?
[19:27] So, let's go ahead and say AI
[19:31] .
[19:33] Um with
[19:34] LLM by role. So, this is where that role
[19:37] comes in. So, if we look in our
[19:39] application.yaml here, let's go ahead
[19:43] and say that the reviewer is going to
[19:45] use GPT-5. So, now we're not hardcoding
[19:49] the model into our application. That is
[19:52] in configuration. So, we'll just say
[19:55] reviewer,
[19:56] right?
[19:57] And then we can say with ID,
[20:01] call this the blog post reviewer, right?
[20:05] And we can say uh creating. So, again,
[20:09] what oops. Creating. So, what class,
[20:13] like what is the structured output here?
[20:15] And that is a reviewed post. That is the
[20:17] return type we want. And then we can say
[20:20] from prompt. And again, we'll use our um
[20:24] text blocks here.
[20:26] I'll copy in uh this text, this prompt.
[20:29] So, here we are.
[20:33] Can I ever get this to format correctly?
[20:35] Um okay.
[20:36] So, you are technical editor, review and
[20:38] improve this blog post, the title, the
[20:41] content, fix any technical errors,
[20:43] tighten the writing, provide a revised
[20:44] title, revised content, and a brief
[20:46] summary of the changes you made as
[20:48] feedback. And that's where this
[20:51] uh is no longer just a blog draft, it's
[20:53] a reviewed post, which has feedback on
[20:56] it, right?
[20:57] So, what do we need to do here now? Now
[21:00] we need to say formatted, and we're
[21:03] going to pass in the draft. Uh it's not
[21:06] get title, it's just title.
[21:08] And we need to pass in the draft
[21:10] content, right?
[21:13] So, from there,
[21:15] um
[21:17] right?
[21:18] Should be looking good. Okay, so now um
[21:22] actually, what I want to do is I want to
[21:23] return something from that. And that is
[21:25] going to um return something that is
[21:28] reviewed.
[21:29] And so, from there, we can basically
[21:31] return reviewed.
[21:34] Uh if I wanted to, I can go ahead and
[21:37] output this as well. So,
[21:40] reviewed. Sure. Uh actually, let's just
[21:42] do that.
[21:43] So, now I have my two actions, and one
[21:45] of these actually will determine if we
[21:49] achieve our goal.
[21:50] In a bigger system, and something we'll
[21:52] probably do in the near future, is there
[21:55] probably could be a lot more actions.
[21:58] We could try to come up with a TLDR for
[22:01] the article. We could come up with a
[22:02] much catchier intro or a catchier title,
[22:05] or work on SEO. There are a bunch of
[22:08] actions that we can add in here, right?
[22:10] And this is the really cool part,
[22:12] because we are not defining a um a a
[22:16] step-by-step process of what the agent
[22:18] needs to do to complete its task. We are
[22:21] giving it a bunch of actions. These are
[22:23] things you can do, and then it's really
[22:25] up to the agent to decide which ones to
[22:28] call to ultimately achieve the goal that
[22:30] we want, which is a polished blog post,
[22:33] right? But we're going to keep it simple
[22:35] here,
[22:36] and we're just going to use these two
[22:37] actions.
[22:38] Okay.
[22:39] Um so, with that, uh we're we're going
[22:42] to output this to just kind of the
[22:45] console, but uh we'll we'll kind of pick
[22:48] up on this and then maybe write this to
[22:49] a markdown file as well.
[22:51] So, let's see if everything is working.
[22:55] Uh so, let's go ahead and see if we can
[22:57] run this app.
[22:59] So, you'll see um some things come up
[23:01] here. Uh we got this nice ASCII art from
[23:04] Amabel. Uh there's some things going on
[23:06] you can kind of look at here, registered
[23:09] the models. Uh again, we're in a shell
[23:11] application. So, now because I'm in a
[23:13] spring shell app, I can easily just type
[23:15] help and find out some information about
[23:19] this shell command. So, this comes from
[23:21] the starter, one of the starters that we
[23:23] included. And we can do some things like
[23:25] we can type in models, like what models
[23:27] are available. Here are the available
[23:29] LLMs. Uh what is the in default
[23:32] embedding service? Here's the available
[23:34] embedding services. Here are all the
[23:36] models that we have access to. We've
[23:39] really only declared, I think GPT-5 and
[23:42] GPT-5-mini as available models.
[23:46] So, what else can we do? We can come in
[23:48] here and say um what are the different
[23:52] tools that are available? We don't have
[23:53] any tools. Um execute or X is basically
[23:57] how we run an agent. So, we'll execute
[24:00] that in a second. We can talk about
[24:02] platforms. We can list our agents. So,
[24:05] what agents do we have access to? In
[24:07] this case, um here the only agent is to
[24:10] write and review a blog post about a
[24:12] given topic. Uh there's versions here,
[24:15] there's goals. So, the goal, again,
[24:18] achieve goal is to have a reviewed and
[24:20] polished blog post. That is the review
[24:23] draft. And then um all the different
[24:26] actions um and schema types and
[24:29] everything that you need to understand
[24:30] about that agent.
[24:33] So, again, let's go into help. And the
[24:35] way that we go ahead and execute this is
[24:39] by typing execute or X.
[24:41] And I want to write a post um explain
[24:46] virtual threads to me like a
[24:50] five-year-old,
[24:51] right?
[24:52] So, let's see how this runs. I
[24:55] We may run this in later, but there's a
[24:57] dash P flag as well that's very helpful
[25:00] that will kind of output everything
[25:02] that's going on, kind of show you what's
[25:04] being sent to the large language model,
[25:06] give you a little bit more info. Uh but
[25:08] there is a lot of info going on here
[25:10] already.
[25:11] So, we see uh choosing an agent based on
[25:14] user input, choosing the agent blog
[25:17] writer agent. Uh we see the description
[25:20] of that, the goals, the actions that we
[25:22] kind of saw from the the shell command.
[25:25] And it's going down, and it says using
[25:28] LLM GPT-5-mini to create that blog
[25:30] draft. Um write draft tool.
[25:35] Um
[25:35] executed. Ready to plan form.
[25:39] Uh plan from.
[25:41] So, formulated a plan. There's a whole
[25:43] bunch of things going on here. So, uh no
[25:46] suitable model found for
[25:49] hm
[25:52] Okay, so wait. What did we say GPT?
[25:56] Maybe I must have typed something wrong.
[25:58] Let's see.
[26:00] GPT-5.
[26:04] This is the default. GPT-5-mini.
[26:07] Oh, yeah. Good old good old-fashioned
[26:11] YAML.
[26:13] I did screw that up. That is why it
[26:15] couldn't find the role reviewer um in
[26:19] the model that it should use. So, let's
[26:21] go ahead and try that again.
[26:24] So, explain virtual threads
[26:28] to me like a five-year-old, right? Okay,
[26:32] so now it's going to go through. It
[26:33] actually did go through the blog draft
[26:36] action, so it completed that one, and it
[26:39] got to the review action, uh but
[26:41] couldn't complete that because it didn't
[26:43] have access to the large language model
[26:46] that it needed to, the one that we gave
[26:48] it, right? All right, so you see it
[26:49] finished. Uh you see my output there.
[26:52] You asked, explain virtual threads to me
[26:54] like a five-year-old. Here's the
[26:55] timestamp. What came back was that
[26:58] reviewed post. It has the title, the
[27:00] content, and then the feedback. What did
[27:03] the reviewer do to kind of clean that
[27:05] up? Tighten the language, clarified the
[27:07] virtual threads are JVM managed and
[27:09] scheduled onto a small pool of carrier
[27:11] OS threads, etc.
[27:13] You also get this nice output. LLMs
[27:15] used, GPT-5, GPT-5-mini across two
[27:18] calls. Here are the number of prompt
[27:20] tokens, here the number of completion
[27:22] tokens. Here's what it cost you. I
[27:24] really appreciate this output. Um this
[27:28] is very nice. But I want to take this a
[27:30] step further.
[27:31] Now, what I want to do is actually write
[27:33] this out to a markdown file.
[27:35] And so, we're going to go ahead and do
[27:37] that. So, the way that we're going to do
[27:38] that
[27:39] is I want to add some blog agent
[27:42] properties. So, let's go in here. Say
[27:45] blog agent properties, right?
[27:49] And we'll go ahead and mark this with
[27:51] configuration properties, and we'll call
[27:53] this the blog agent.
[27:56] And in here, um this should be a record.
[28:01] Let's do a record. And all we're going
[28:03] to have here is output dir.
[28:06] And um
[28:08] we'll just say public. Yes.
[28:12] Uh no.
[28:15] If output dir equals null and it's
[28:18] blank, sure. Um then I just want to set
[28:21] output dir to let's go blog posts,
[28:25] right?
[28:27] That looks good. Okay. Um if output dir,
[28:31] why is it complaining? All right, let's
[28:34] see. I think if we go back to our
[28:37] application here
[28:39] and just say enable configuration
[28:42] properties.
[28:44] There's that.
[28:46] Let's go ahead and set something.
[28:49] So, I am I'm actually going to use that.
[28:53] Um
[28:54] Let's just say that. So, our output dir
[28:57] is blog posts.
[28:59] Um
[29:00] and it's still complaining.
[29:04] Oh.
[29:05] Uh
[29:06] Oh, duh.
[29:08] Dan. All right. So, that should work
[29:10] now. Um
[29:12] not registered via enable configuration
[29:15] properties. Yes, we need to do that.
[29:18] Okay. Silly silly little mistakes. Okay,
[29:21] now what we can do in our um blog agent,
[29:26] so let's go back to
[29:28] our blog writer.
[29:31] Here we can say
[29:34] uh private final. Yes.
[29:38] Yes, get that through constructor and
[29:40] property constructor injection. And now
[29:43] we can do is we can go ahead and write
[29:45] this out to a file. So, I am going to
[29:49] copy my handy little method to write to
[29:51] a file.
[29:53] And
[29:55] uh we need a logger here.
[29:59] So, that will give us that. So, all this
[30:01] does is take the reviewed post, it
[30:03] extracts the file name and replaces some
[30:06] things, and adds MD on to it. So, that
[30:09] is going to be the file name that we
[30:10] create. It will go ahead and get the
[30:12] output directory from the properties
[30:14] that we just created,
[30:16] uh get the file path, and then try to
[30:18] write that file.
[30:19] So, what we need to replace here is just
[30:22] the system out, and we'll say write to
[30:24] file, and we'll pass in the reviewed
[30:26] post.
[30:28] And now, this should give us a nice
[30:30] markdown file in our application.
[30:34] So, let's try and do this again.
[30:36] So,
[30:38] uh let's go ahead and say X. Um
[30:43] how to get started
[30:46] with Spring
[30:48] Boot, right?
[30:50] >> [snorts]
[30:50] >> Okay, and oh man, I want to actually Let
[30:53] me stop this because I do want to show
[30:55] you uh the feature I talked about
[30:57] earlier, which is the ability to get a
[30:59] little bit more information
[31:01] uh in the console here. So, I'm going to
[31:03] say X-P.
[31:05] Um how to get started
[31:10] with Spring Boot. So, I really
[31:13] appreciate this um -P,
[31:16] which
[31:18] uh
[31:19] I think I was supposed to do it this
[31:22] way.
[31:22] How to get started with Spring Boot -P.
[31:28] Okay. So, now it's going to give us a
[31:30] little bit more verbose uh verbosity in
[31:32] here, and you see that right away. And
[31:35] we see that the message is here's the
[31:37] current date, and you get to see some of
[31:40] behind-the-scenes of what's going on.
[31:41] Your response should be in JSON format.
[31:43] You should use this uh RFC 8259
[31:47] compliant JSON response.
[31:50] Here's the JSON schema. Like, this is
[31:52] what I want it to look like. Again, this
[31:53] is a blog draft, so it has a string uh
[31:56] for content and a string for title,
[31:59] no additional properties. Here's the
[32:01] user message. Here's the options. If we
[32:03] had any chat options, we would pass it
[32:05] with it. So, you get a lot more
[32:07] information out of here, and this is
[32:08] really great
[32:10] uh if you need to like debug what's
[32:12] going on. Uh we see there's no tools
[32:14] here. If there were tools and tools
[32:16] weren't getting called, we can kind of
[32:18] debug that. Um so, this is really
[32:20] helpful information when you're trying
[32:22] to like step through and understand the
[32:25] process of achieving that goal. Like,
[32:27] what actions were called? What was being
[32:30] sent to the large language model? And so
[32:32] forth.
[32:34] So, hopefully when we get done here, we
[32:36] will basically
[32:37] uh review this post, and and then write
[32:40] this to a file. So, this should go ahead
[32:42] and write a file into a folder called
[32:45] blog posts. And let's see here, we are
[32:48] done. So, here's what you asked. Again,
[32:52] here's the models that were invoked,
[32:53] prompt tokens, completion tokens. Here
[32:55] was what it cost. Uh let's reload this.
[32:59] There's our blog post, and there is our
[33:03] um markdown file. So, we see this is in
[33:05] markdown because that was part of the
[33:07] prompt. That's what I wanted back as far
[33:10] as output. Here's a Spring Boot
[33:11] Quickstart. Build and run your first
[33:14] REST API.
[33:15] So, we see there's actually some uh code
[33:18] samples in here, but I did say keep them
[33:20] short and concise.
[33:22] Uh but we get a nice little blog post. I
[33:23] haven't read through this, but um this
[33:26] is just the start, right?
[33:28] So, let's take a look at one more
[33:30] feature, which I think is really
[33:31] interesting, and it's this idea of
[33:34] personas, right? So, I have this this
[33:36] writer. I've kind of baked in here like,
[33:39] "Hey, you are a software developer and
[33:41] an educator writing a blog post." I have
[33:44] this you are a technical editor. What I
[33:46] want to do is kind of take this one step
[33:48] further, and we can do so
[33:51] um with this idea of personas.
[33:53] So, I'm going to create a new class in
[33:56] here. Let's call this um personas.
[34:00] And again, the idea here is that these
[34:02] could be reusable.
[34:04] Uh so, we'll say it's abstract class.
[34:07] I'm going to kind of copy these two in
[34:10] here, so these two personas that I have.
[34:13] And uh we can see what they are. So,
[34:16] you can use this role goal goal
[34:19] backstory, and this role goal goal black
[34:22] backstory. Say that five times fast.
[34:25] Takes a role, a goal, and a backstory.
[34:28] So, the role is, "Hey, you're a software
[34:30] developer and an educator." The goal is
[34:32] to write practical, beginner-friendly
[34:34] blog posts. The backstory is, "I'm an
[34:37] experienced developer who loves teaching
[34:39] through clear, simple writing." And then
[34:42] we have one for our technical editor as
[34:45] well.
[34:46] So, what this allows us to do is really
[34:47] kind of cut down these prompts and be
[34:49] specific with what we are trying to do
[34:51] here. So, here I can get rid of this,
[34:54] and then in here, I can say with prompt
[34:58] contributor, and I'll pull in those
[35:00] personas, and for this one, I'll use a
[35:02] writer.
[35:03] And then for this one,
[35:07] I will say with prompt contributor
[35:10] personas
[35:12] reviewer, right?
[35:14] So, now I have contributed those
[35:16] personas, and again, I can use those
[35:18] personas wherever else I need to use
[35:20] them. So, let's say I did I did have
[35:23] like uh an SEO expert. Maybe I had a
[35:26] persona for that. But maybe there are
[35:28] actions that combine both of those. Then
[35:31] I can go ahead and use those personas
[35:33] wherever I need to. I'm not kind of
[35:35] putting that into the hardcoded prompt
[35:37] here. It is getting added to the prompt
[35:40] that gets sent, but we're not kind of
[35:42] hardcoding in it into what we're trying
[35:45] to do here. And again, with this kind of
[35:47] goal-oriented action planning, we are
[35:51] using decomposition. We are trying to
[35:53] like, what is the goal? The goal is to
[35:55] write a blog post, but how can we break
[35:57] that down into as many smaller steps as
[36:01] possible to achieve that goal?
[36:04] So, let's see uh if this works again.
[36:06] I'm going to go ahead and stop and run
[36:08] this.
[36:12] And let's just say
[36:14] um
[36:17] how to get started with Cloud Code,
[36:21] right?
[36:22] Okay, so while this is running, I'm
[36:23] going to go ahead and copy over the
[36:25] readme. I am going to leave the um
[36:30] the URL for the GitHub repo in the
[36:32] description below.
[36:34] And in the readme, I have a couple
[36:36] things that might be interesting if you
[36:38] want to go ahead and kind of take this
[36:40] further.
[36:41] So, there's a bunch of information on
[36:42] how this project works.
[36:44] But what's next? Like, how can we take
[36:47] this a step further? Right now, we have
[36:49] current two current actions, draft and
[36:51] review.
[36:52] Here's some ideas for expanding the
[36:53] pipeline with additional actions.
[36:56] Uh maybe we want to write some catchy
[36:58] hooks, write a or write a catchy title,
[37:00] write a hook. I love the idea of
[37:02] generating a TLDR, a short short summary
[37:06] for social sharing, or email, or
[37:08] newsletters. I even like at the
[37:10] beginning of an article if there's a
[37:11] TLDR. So, that'd be a really cool action
[37:13] to build out.
[37:15] We can talk about SEO and discovery,
[37:17] quality and polish. Maybe do some
[37:19] fact-checking. What's a readability
[37:21] score?
[37:22] Publishing pipelines, generating front
[37:24] matter. So, right now my markdown
[37:26] doesn't have any front matter. When I
[37:28] create a blog post, I need front matter
[37:29] for that. Maybe create an outline first.
[37:33] Uh maybe we want to create something to
[37:34] generate a thumbnail. There's a whole
[37:37] bunch of things that we can do here, and
[37:41] uh this is really kind of just the tip
[37:43] of the iceberg.
[37:45] So, let's see um starting looks like it
[37:48] is in uh oh, it's actually
[37:53] We have an error here, LLM invocation,
[37:56] blog draft writer, um three to invalid
[37:59] LLM return. So, it had an issue with the
[38:02] return.
[38:04] Um so, it has not finished yet, but
[38:06] that's okay.
[38:07] All right, so that first one didn't go
[38:09] through. I think it had something to do
[38:10] with some of the code examples coming
[38:11] back. I wasn't escaping the JSON uh
[38:14] correctly, but I'll take a look into
[38:15] that. But I ran it again, "What are the
[38:16] basic building blocks of Cloud Code?"
[38:19] and I got this blog post as output. And
[38:22] again, I'll leave some of these in the
[38:24] final repo. So, there it is, your first
[38:26] look at Embeddable, or at least my first
[38:28] look. You may have gone through it
[38:30] before. Um I finally again, as I said at
[38:32] the beginning of this, I have been
[38:34] wanting to dive into this for a while
[38:35] now.
[38:36] Uh just haven't had the time. Finally
[38:38] got some time to go through it. Really
[38:40] impressed with kind of the getting you
[38:41] started experience. There's some
[38:43] templates for getting you up and
[38:45] running. There's a bunch of samples out
[38:46] there. There's some videos out there on
[38:48] YouTube. Uh Rod has been presenting on
[38:50] this a lot, so you can see some uh
[38:52] presentations from him.
[38:54] Uh the documentation is really good.
[38:56] It's almost too good right now because I
[38:58] only kind of just hit the surface. I
[39:00] really got to dive in and and take a
[39:02] look at some more of the advanced
[39:04] features like tools. Um they do some
[39:06] really cool thing with uh agentic rag
[39:08] pipelines or agentic rag um as opposed
[39:12] to like normal kind of what we've been
[39:15] doing with rag, right? So, there's some
[39:17] really cool things they're doing there,
[39:19] and there's just a whole bunch of things
[39:20] I haven't gotten into yet. So, I'm
[39:22] excited to dive a little bit further.
[39:24] I'll probably start here with kind of
[39:25] building out this blogging agent and
[39:27] adding some more actions to it just to
[39:29] to kind of learn the ropes, and then
[39:31] we'll go into some of those uh more
[39:33] advanced features. But hey, let me know,
[39:35] are you building agents in Java and
[39:37] Spring? Are you using Spring AI?
[39:40] Uh have you looked at Embeddable yet?
[39:41] What are your first impressions?
[39:44] Uh, mine mine are pretty really good
[39:45] actually. Uh, so I'm excited to to dive
[39:48] into this a little bit further. But, I
[39:50] learned a lot. I love learning new
[39:52] things. I love teaching them. So, if you
[39:54] learned something new, do me a big favor
[39:56] friends. Leave me a thumbs up. Subscribe
[39:58] to the channel. And as always, happy
[40:00] coding.
[40:05] >> [music]
