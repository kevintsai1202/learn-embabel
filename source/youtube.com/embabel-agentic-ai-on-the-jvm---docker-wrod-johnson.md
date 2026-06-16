# Embabel & Agentic AI on the JVM (w/Rod Johnson) | Docker’s AI Guide to the Galaxy

**影片網址**: [https://www.youtube.com/watch?v=9iyFYrUI5CY](https://www.youtube.com/watch?v=9iyFYrUI5CY)
**影片 ID**: `9iyFYrUI5CY`

## 影片簡介
Spring Framework creator Rod Johnson joins host Oleg Šelajev to unpack Embabel—an agentic AI framework for the JVM built on Spring/Spring AI—with deep dives ...

---

## 影片逐字稿 (Transcript)
[00:00] Hello there. I'm super pumped for
[00:02] today's episode of the II Guide to the
[00:03] Galaxy because in our studio we have the
[00:06] true giant of the industry, the one and
[00:09] only Rod Johnson. From his experience in
[00:14] I don't know more than several decades
[00:16] in Java from the creation of Spring
[00:19] Framework um to helping the industry now
[00:23] create better AI agents and understand
[00:25] how to do AI agents better. Um, we're
[00:28] gonna talk about AI, of course, but it
[00:31] is my true pleasure to introduce and
[00:33] present to you Rod. Rod, how are you
[00:36] doing today?
[00:37] >> I'm doing very well. Um, great, great to
[00:40] be here.
[00:42] >> Uh, awesome. So, you've lately like
[00:45] you've done all the like industry
[00:48] revolutionizing stuff several times. Um
[00:51] and now your current spin uh is embabel
[00:57] which is the agentic AI
[01:01] agentic application framework uh for the
[01:05] JVM uh based on your experience with
[01:08] spring based on your experience with how
[01:09] to create enterprise grade actual
[01:12] production level software um can you
[01:15] maybe tell us a little bit first what
[01:18] motivated you to create Embabel and How
[01:21] would you describe it like as an a short
[01:23] elevator pitch?
[01:26] >> So I guess I
[01:28] I'd already been quite interested in
[01:31] machine learning for a number of years.
[01:34] Um and then when we got that amazing
[01:36] moment when suddenly you know GPT3
[01:39] became actually good uh and instead of
[01:42] spinning off down some rat hole actually
[01:45] gave good answers. I became pretty much
[01:48] obsessed by how you could take that
[01:50] technology and make it useful for
[01:51] business. Uh so you know thinking about
[01:56] sure for the personal assistant use case
[01:59] it's pretty compelling almost out of the
[02:01] box certainly give it a few tools and
[02:03] it's pretty compelling but how do you
[02:05] build business processes on it that are
[02:08] repeatable reliable cost effective safe
[02:12] and that really scratched the itch that
[02:16] I've always had around programming
[02:18] models and how do you create a framework
[02:20] that enables people to do this
[02:21] effectively.
[02:22] I started like a lot of people around
[02:25] Genai. I started in Python. Um, and
[02:29] believe it or not, this is probably as
[02:31] of two years ago, my Python at the time
[02:34] was much much more fluent than my Java
[02:36] because I'd been writing Python daily
[02:37] for years and hadn't written Java for
[02:40] quite some time. And I fairly quickly
[02:43] came to three conclusions. Firstly, that
[02:46] Python is not a great language for
[02:48] building complex software.
[02:51] Secondly, that there is no special
[02:53] reason whatsoever that you should do
[02:55] genai in Python. And thirdly, to unlock
[02:59] business value, you have to go where the
[03:02] business value is. So you need to have
[03:04] zero friction to access the business
[03:08] logic and the infrastructure that
[03:10] already exists. So for example, if your
[03:12] business logic is in Java, if it's
[03:15] innet, if it's say on node, that's where
[03:19] you want to build your genai
[03:21] applications. You absolutely don't want
[03:23] to do a stack jump. So you know, having
[03:26] said that, the fact is that Java is
[03:28] number one of those three things in
[03:30] terms of business value that's out
[03:32] there, particularly in enterprise. And
[03:35] also, I kind of know a bit about the
[03:37] JVM. So yeah, it just suddenly struck me
[03:40] that the obvious thing to do was to
[03:42] build a framework for the JVM. So I
[03:45] built on top of Spring on top of Spring
[03:48] AI and frankly I think I think the
[03:50] result is a programming model that is
[03:52] significantly superior to anything in
[03:54] the Python world.
[03:57] >> Right? So just to clarify when you say
[03:59] like you need to when you want to build
[04:01] AI into like actual industry and
[04:05] enterprises and you need to meet uh the
[04:09] ecosystem where the value is you meet
[04:11] you mean people wise not application
[04:14] wise because on application level AI is
[04:17] just integrating external systems right
[04:19] so technically you could build it in
[04:22] Python but to enable enterprise teams
[04:26] which are normally
[04:28] JVM based orn net based, you need to
[04:30] meet them there.
[04:32] >> Well, I think it really depends on what
[04:34] are the assets that your genai is
[04:37] talking to. And sure, you know, every
[04:40] blog demo out there is using Brave
[04:43] Search or Weather Services or all these
[04:46] things that um are kind of cool, but the
[04:51] fact is if you want to get it business
[04:52] value and say it's coded in Java ornet,
[04:56] you are going to have to get it up.
[04:57] Obviously, you could put some kind of
[04:59] interface on it, um, like a REST
[05:01] interface or maybe expose it as MCP
[05:04] tools, but already you'd have to be
[05:06] using the JVM to do the latter of those
[05:08] things. Um, but I think the missing
[05:12] piece here is domain modeling.
[05:15] So, real world value is delivered in the
[05:18] enterprise by true understanding of the
[05:21] domain. And that understanding of the
[05:23] domain exists already in you know code
[05:27] that is developed over years and years
[05:29] of experience. So I think you need
[05:31] really high fidelity between your the
[05:33] prompts you're sending to the model and
[05:36] the structured returns you're getting
[05:38] from the model and your domain model.
[05:40] And then when you think about that the
[05:43] idea of having a language jump
[05:45] unnecessarily in there is clearly going
[05:47] to lose a lot of fidelity.
[05:50] >> Yeah. Yeah. that that makes a lot of
[05:52] sense. So um when when when spring
[05:57] framework was coming up right there was
[05:59] a very core principles of well you
[06:04] wanted like a lightweight programming
[06:06] model with components you wanted
[06:08] dependency injection to be the kind of
[06:11] sort of the core concept for this. Uh,
[06:14] is there something like this in in Babel
[06:17] or would you say it's just a like a some
[06:19] of the parts where it's just many small
[06:23] things that make it good?
[06:26] >> Um, no really I think there are some
[06:29] pretty big ideas behind it and they
[06:32] combine together hopefully as with
[06:34] Spring to make a coherent hole. So
[06:37] firstly, obviously it is on the JVM and
[06:39] it's fully leveraging what we have on
[06:41] the JVM which already gives you with
[06:43] Spring Lake far superior configuration
[06:46] management than you see in the Python
[06:48] world. I mean it's just better. Um so
[06:50] that's one thing but then there are two
[06:52] other key ideas which I think are very
[06:54] important.
[06:56] The well actually directly following on
[06:58] that there's the fact that we heavily
[07:00] emphasize type safety. So, you know, if
[07:03] you're working in a strongly typed
[07:05] language, you should fully leverage
[07:06] that. Even if you look at some of the
[07:08] other Java frameworks, they're actually
[07:10] not they don't seem to have gotten that
[07:12] memo. So, you're seeing like magic
[07:15] string keys in templates, we don't do
[07:17] that at all. Everything is strongly
[07:19] typed. And that of course minimizes your
[07:21] potential for error. And there are two
[07:24] other key ideas. The second is the idea
[07:28] of a planning step that is
[07:31] deterministic.
[07:32] So to do complex workflows, you need
[07:35] more than one LLM interaction. In many
[07:38] cases, in fact, very often you're using
[07:40] different LLMs um for each interaction.
[07:44] You also need interactions that are
[07:46] actually just calling code rather than
[07:49] an LLM at all. So, you know, one way you
[07:52] can address that is to just expose
[07:55] everything as a tool. Like throw a bunch
[07:57] of MCP or other tools at your model and
[07:59] let it figure it out. That works well in
[08:03] certain cases, but it is nowhere near
[08:05] reliable enough to automate business
[08:08] processes. So, that is where in Babel
[08:11] introduces the idea of a deterministic
[08:14] planning step. So sure you can you can
[08:18] give your LLM's tools you can do all the
[08:20] same kind of things you can do in other
[08:21] frameworks but we have the ability to
[08:24] express multi- aent workflows
[08:27] through planning. So instead of just
[08:31] relying on the M LLM to work out how to
[08:34] chain things we model the world in terms
[08:37] of actions and goals. So when you try to
[08:40] do something in imbabel it maps onto a
[08:42] goal. A goal has certain preconditions
[08:46] that must be true. Then our planning
[08:49] algorithm which is an AAR planning
[08:51] algorithm. So you know deterministic
[08:54] nonLM um AI algorithm looks at the
[08:58] preconditions and postcond conditions of
[09:00] all the actions that the system knows
[09:02] about and works out a path that can get
[09:04] you to the goal.
[09:08] This has a number of advantages.
[09:11] Firstly, it can explain why it did what
[09:13] it did.
[09:14] Secondly, it's deterministic. And
[09:17] thirdly, even if it sounds complicated,
[09:20] in practice, the action chaining is
[09:22] driven by data types most of the time.
[09:24] So the developer doesn't really need to
[09:26] think about it, but they still get the
[09:29] benefit that the system will do the same
[09:31] thing um each time it runs in terms of
[09:34] planning multi- aent steps. So I think
[09:37] that's a that is an innovation there.
[09:41] There are some other frameworks like
[09:42] Microsoft semantic kernel that do
[09:45] planning but they use an LLM to plan and
[09:47] as soon as you do that you're obviously
[09:49] losing determinism. So you know there
[09:52] definitely is I think a key innovation
[09:54] there in Babel and my goal was certainly
[09:59] not to like play catchup or imitate
[10:02] what's in Python. I would not be
[10:04] interested in doing that. Um my goal was
[10:06] to create the best agent framework um in
[10:11] the JV app. Um finally we have a lot of
[10:15] emphasis on domain modeling. So you know
[10:18] we encourage people when they think
[10:20] about building their agents
[10:23] they should start by thinking about
[10:25] their domain model. It's like software
[10:28] good software engineering and it is
[10:30] pretty amazing once you get the domain
[10:32] model right your agents kind of very
[10:34] often naturally fall out of that and you
[10:37] get a lot of reuse and a lot of
[10:39] productivity in building agents.
[10:42] >> That sounds sensible. Uh can you maybe
[10:44] show us an example of an enable agent uh
[10:48] and show those concept in in in the
[10:51] code? Um
[10:53] >> certainly. Um, so what I'm going to do
[10:56] is show you our um Java agent template.
[11:02] I shall just get the right window up and
[11:06] I shall share my screen. So here we have
[11:10] um one of our repositories on InBabel at
[11:14] GitHub. This is the Java agent template.
[11:18] Easiest way to get started with imbable
[11:21] if you're using Java. So all you do is
[11:24] just go to this use this template and
[11:26] it'll create a repository in your own
[11:28] GitHub account. We also have a Cotlin um
[11:31] agent template. But so I've already got
[11:34] this cloned. So let me just bring up the
[11:39] um default um form factor of this which
[11:44] is that um we start under SpringShell.
[11:48] Um obviously in production um use of
[11:52] inbabel you're going to be in a web
[11:54] application or a message application or
[11:56] some other form factor but for you know
[11:58] development the interactive spring shell
[12:00] is really cool. So here when it comes up
[12:04] you'll see that it um detects models
[12:08] which will depend on the API keys you
[12:10] give it. So I have given it here um
[12:13] anthropic and open AI API keys and it's
[12:18] detected the most it's automatically
[12:21] deployed the most popular models. Um you
[12:24] can configure all that in code you can
[12:26] add any model that's supported by spring
[12:28] AI which is just about everything. So by
[12:32] default it is configured by um using um
[12:39] spring boot. So let's just go to the
[12:44] sorry it's bit hard to work out how to
[12:45] do this with this small screen. So um
[12:49] let's go to the Java source and we will
[12:52] find the
[12:56] application class. It's a Spring Boot
[12:58] application class. Obviously, if you um
[13:02] create your own project from this um
[13:04] template, you'd rename the class, but
[13:06] you know, very very straightforward. All
[13:08] we need is at Spring Boot application
[13:11] and at enable agents. And so at enable
[13:16] agents automatically causes
[13:19] um the imbable processing to occur. to
[13:22] get this running. This is actually a
[13:24] Maven example, but of course it runs as
[13:27] well in Gradle. So here we're just using
[13:30] absolutely vanilla spring boot parent
[13:32] later Spring Boot parent and we have
[13:35] just added two of our starters to get
[13:39] going. So you know if you particularly
[13:40] if you're familiar with Spring Boot
[13:42] getting going is really easy. So there
[13:47] is one agent already deployed. So we can
[13:50] ask the shell how many agents does it
[13:52] know about and it says that there's an
[13:56] agent that will generate a story based
[13:58] on user input and review it. There's a
[14:01] lot of the planning information here
[14:03] which we don't need to go into um first
[14:06] but let's firstly have a look at the
[14:08] code right and review agent.
[14:11] So you can see that we've got an at
[14:14] agent annotation here. This causes
[14:18] imbable to um load the agent metadata
[14:22] from looking at that class. Also, it is
[14:26] a spring at component annotation. So,
[14:29] spring is also going to inject this. Um
[14:31] so, it's it's a special spring component
[14:34] that is also an imbabelable agent. So,
[14:36] here therefore spring is capable of
[14:38] injecting this. We get that from our
[14:40] configuration if we want to externalize
[14:42] it. And um we now have a number of
[14:46] annotated methods. So the first one here
[14:50] is at action um and it's craft stories.
[14:54] So let's look at this in a little bit
[14:56] more detail. At action says to imbable
[15:00] this is one of those actions. Remember
[15:02] we've got actions and we've got goals.
[15:04] Actions will be chained together to
[15:06] achieve a goal. So this says this is an
[15:09] action that you could use. And you can
[15:11] see the preconditions here are going to
[15:14] be inferred by the parameters. So we
[15:17] need a user input and we need an
[15:20] operation context which is a special
[15:22] framework thing that enables us to run
[15:24] prompts. So here we've got a nice fluent
[15:28] API for saying with LLM. In this case
[15:31] we're using an automatic LLM and we're
[15:33] setting the temperature hyperparameter.
[15:36] We're setting a prompt contributor to
[15:38] give it a persona. Um and then finally
[15:42] we're calling this prompt. By default
[15:46] prompts are constructed in Java or
[15:49] Cotlin code. You can also externalize
[15:51] them in Ginger templates. But one of the
[15:55] major benefits of not just in Babel but
[15:58] any agent framework is that it
[16:00] encourages breaking up
[16:04] longer workflows into smaller action
[16:06] steps. So as you can see this is this a
[16:09] pretty short prompt. So given that you
[16:12] know Java and all modern languages have
[16:14] multi-line strings if you do it here you
[16:17] get type safety as well in terms of
[16:19] what's exposed in building that string.
[16:21] So typically you know you build your
[16:23] prompts right here which means that if
[16:26] you refactor for example the name of the
[16:30] word count or whatever your prompt isn't
[16:32] going to break.
[16:34] >> Yep. So um that is the first action to
[16:39] execute this fully immabable needs to
[16:42] know about a goal. So there's another
[16:44] action here that reviews the story.
[16:46] Notice it takes the story and the user
[16:49] input as well as the operation context.
[16:52] So this inbable can work out that this
[16:54] action can only run after a story has
[16:58] been created. These are very simple
[17:00] domain types. So um the story and
[17:03] reviewed story are both records. A lot
[17:06] either your domain objects can very
[17:10] often be types you've already got. You
[17:12] can use them like for example you might
[17:14] you can even use say JPA entities or
[17:17] things that already model your domain or
[17:19] in a new application like this they're
[17:21] typically um going to be Java records.
[17:25] And so here this add achieves goal
[17:29] annotation
[17:30] says
[17:33] that this actually will achieve the um
[17:36] review story create and review story
[17:39] goal. So now when we run this we can do
[17:46] write me what do we want a story about
[17:50] >> um about about with the lion running.
[17:52] >> Okay. How about a story about
[17:56] >> about a what was it?
[17:58] >> A lion running around to blasting people
[18:00] with plutonium.
[18:06] >> Okay. Now that is that's left field. Um
[18:11] so so firstly it's going to choose the
[18:13] agent based on user template a lot user
[18:16] input. This output um explains the
[18:20] planning, but let's see what do we get
[18:22] in a neon lit city.
[18:26] H they're
[18:28] LLMs generally try to put a nice spin on
[18:31] things like I don't know the they've
[18:33] somehow glossed over the fact that this
[18:35] is not a nice thing to do. This is
[18:37] possibly not a nice line. Um but you
[18:39] know, hey, I'm not responsible for the
[18:41] LLM. Um so you can see those two steps
[18:47] ran and interestingly at the end one of
[18:50] the things that Inbabel does is track
[18:52] the invocation of every LLM it uses and
[18:56] where possible work out the cost of
[18:58] that. So we have access to an LLM
[19:01] database that gives us um the input and
[19:04] output token cost. So to see how this
[19:07] ran, let's run it again um and get it to
[19:12] show the prompts and be more verbose. A
[19:15] lion running around and splashing
[19:19] people with plutonium.
[19:23] >> I don't know why I asked that.
[19:25] >> And don't make it a feelood story. Um
[19:29] okay. And now I'm going to do dashp. So
[19:32] it's going to show us the prompts. So,
[19:34] and we can go back over this in a little
[19:37] more detail.
[19:40] So, the lion
[19:43] proud. Oh, this is much better. I like
[19:46] Yes. Oh, beautiful. Much better. We've
[19:50] no longer got a feelood um story. Um so,
[19:55] let's go through the output um here. So
[20:00] the very first thing it did was try to
[20:02] find an appropriate agent. If you're
[20:05] using it in production, you're typically
[20:07] asking it to achieve a goal explicitly
[20:10] because obviously we love determinism.
[20:12] But in this case, what it's doing is
[20:15] looking at all the goals it knows about
[20:17] and saying, okay, what does the user
[20:19] seem to want? Well, they clearly want to
[20:20] be told a story. So therefore, it hits
[20:22] on the story goal. One interesting thing
[20:25] about this whole goal and action thing
[20:28] idea is that it's extensible without
[20:31] modification. If you look for example at
[20:34] the way say crew AI in Python or
[20:36] Langchain in or Langraph model um
[20:40] workflows they wire things together
[20:43] right for example in langraph it's a
[20:45] state machine that tends to be fairly
[20:49] hard to change right to change that to
[20:51] add additional functionality can be
[20:53] quite difficult in this case although
[20:55] planning is deterministic we can add
[20:57] more actions add more goals and
[20:59] potentially enrich the behavior so it
[21:01] shows choose the agent and it was pretty
[21:05] confident about choosing the agent. In
[21:07] this case, he used an LLM to choose the
[21:09] agent. So now it has created an instance
[21:14] of the agent and the very first thing
[21:17] it's going to do is plan. So here it has
[21:22] formulated a plan. So remember planning
[21:25] is dynamic. So it's said it can call a
[21:28] craft story goal then it can call the
[21:30] review craft story action then the
[21:33] review story action and then it will
[21:35] have achieved that goal. So now it runs
[21:39] the first action which means that going
[21:42] back here the first thing it's going to
[21:44] do is call this. So you should see
[21:47] something relating to that. So what do
[21:49] we see? So the auto LLM resolved to
[21:53] GPT41 mini and here is our prompt that
[21:59] um included our user input. Notice
[22:01] there's some extra stuff here and the
[22:04] extra stuff comes from the persona.
[22:06] Remember we said with prompt contributor
[22:08] persona's writer
[22:12] um and also we've got the knowledge
[22:16] cutoff and the system date. they have
[22:19] both automatically been put in by the
[22:22] framework. So, you know, when you use
[22:25] say claude or um chatgpt
[22:29] um there's about a three-page system
[22:31] prompt that includes lots of things like
[22:33] today's date. So, if you call it
[22:35] directly with the API and don't put that
[22:37] some of that stuff in, you will for
[22:39] example tool use when we get to that
[22:41] will be a real problem because it won't
[22:43] know whether it needs to search related
[22:46] to the current date. So, you know,
[22:48] Inbable takes care of putting some of
[22:50] these things in so you don't have to
[22:51] think about it. So, the prompt responded
[22:55] with um a story object. How did it know
[22:58] to respond with a story object? Because
[23:01] it used the create object method and we
[23:05] specified story.class.
[23:09] So we build on top of Spring AI and
[23:13] Spring AI handles like generating JSON
[23:16] schema passing it to the model getting
[23:19] the type back. So in general we strongly
[23:22] emphasize both strongly typed
[23:26] you know prompt building and getting
[23:29] typed responses back. Um it generally
[23:33] there's a whole bunch of benefits in
[23:34] having that kind of structure.
[23:36] Okay, so we received the LLM response.
[23:40] Um, and
[23:43] now it's going to replan. But you can
[23:46] see that the world state that is
[23:49] assessed, which in this case is based on
[23:50] the data types, is now different. So we
[23:53] started off with the world state, we had
[23:55] nothing set but user input.
[23:58] In this case, the world state is that
[24:01] we've run has story and we've actually
[24:04] got a story object. So when it plans it
[24:06] now sees it only needs to do one more
[24:08] step. The benefit of planning after each
[24:11] action is executed is a precondition is
[24:15] absolute. An action cannot run unless
[24:17] all its preconditions have been
[24:18] satisfied.
[24:20] A postcond condition is kind of a
[24:22] promise or a side effect. So you know
[24:25] maybe it didn't work in which case it
[24:27] might be possible to replan and find
[24:30] another route to the goal. And for
[24:33] example, if it would run that action but
[24:35] not create the story, like
[24:38] >> we would have the action run but we
[24:41] would not have the story and then the
[24:42] planning algorithm could potentially
[24:44] figure out like a like a workar around
[24:47] or something else. Okay. Go.
[24:49] >> Exactly. So the the cases where that's
[24:52] important is where you have an
[24:54] errorprone operation which you might
[24:56] retry or you might have to reread around
[24:59] or alternatively when you need human in
[25:02] the loop right like maybe something
[25:06] requires human intervention and the
[25:08] agent process would go into a wait state
[25:12] until it gets what it needs. So this is
[25:15] where
[25:17] it's
[25:18] probably worth noting
[25:21] how the agentic part differs from
[25:23] something say like spring AI or lang
[25:26] chain. So the agentic part is
[25:29] maintaining a process. So it's
[25:31] maintaining state across these multiple
[25:34] interactions. So you know it's partly a
[25:36] workflow engine. So the um
[25:42] this uses a different persona and also
[25:45] it's obviously got access to everything
[25:48] um there from the story. So for example,
[25:52] we've put in the story text as well as
[25:54] the user input and at the end of it it
[25:59] um sped out the output. Um so that is
[26:05] probably the simplest possible example
[26:07] of an energetic flow. Also in the Java
[26:10] agent template there's
[26:13] something that is even simpler which is
[26:15] the simplest possible way you can use in
[26:17] Babel. So if you just type this you will
[26:21] see that it invented a lum an animal
[26:24] named luminara of species gleamwing
[26:27] serpent. And so here just incredibly
[26:30] simple simple um prompt specifying the
[26:35] type and we're injecting an AI object.
[26:40] So when you have imbable set up anywhere
[26:44] if you want to add just a tiny little
[26:45] bit of AI to your application you can
[26:48] get this AI object which gives you the
[26:51] ability to call llaps.
[26:55] So you know
[26:56] >> so if I would be building an application
[26:58] and I would have like a particular
[27:02] injection point where I need to do
[27:03] something like a fuzzy computation I
[27:06] would just in my normal spring boot
[27:09] application I can just add in babel
[27:12] sortter and inject AI like this and yep
[27:15] sort of this is it.
[27:17] >> Yep. Absolutely.
[27:19] >> Yeah. And I mean, one of the advant one
[27:22] of the really interesting use cases
[27:24] we've seen for this is where people
[27:27] literally are just filling in the gaps
[27:29] in existing applications. Like one of
[27:31] our um customers is in the travel
[27:34] business and they one of the first
[27:37] things they've done is they have a form
[27:40] where if the user like fills in a free
[27:43] form text field, it used to have to go
[27:45] to a person. And so they're actually
[27:48] able to use a local source model GPTOSS.
[27:52] Um so they completely control the
[27:55] deployment of that model and try to
[27:57] solve it just using this kind of you
[27:59] know very simple. Yeah. So you know not
[28:02] not everything is a fancy agent. Um so
[28:06] our goal is to try to um you know cover
[28:09] things from the simplest to the more
[28:11] complex. Should I go on to a more
[28:13] complex demo using tools
[28:15] >> or can I ask can I ask can I ask about
[28:17] like designing the agents? So like
[28:20] there's like a like a naive approach to
[28:24] creating agents which is uh most of the
[28:27] demos you see will show and this is how
[28:32] I think a lot of mind share how to
[28:34] create a genic applications look like
[28:36] this right so your agent is three things
[28:39] it's an it's an LLM or like some sort of
[28:42] AI component it is uh the system prompt
[28:46] or like the actual description what your
[28:48] agent would
[28:49] And this is the collection of tools.
[28:51] We're going to get tools and how exactly
[28:53] to wire them in in a bit. But uh so
[28:56] those three necessary things and you can
[29:01] create useful things, right? Like you
[29:03] can you can glue those components
[29:05] together. You can say that is my LLM,
[29:08] that is my key. Go talk to it. And
[29:11] here's the prompt for you. you are a
[29:13] marketing persona or you're a coder and
[29:17] you're helping with me with this
[29:18] particular task. So that is like at a
[29:24] high level could work and potentially
[29:26] with the like genius level AI you could
[29:30] solve any problem like that probably. Uh
[29:33] so when Babel takes a very different
[29:35] approach where you need to sort of give
[29:37] it action so you need to do some domain
[29:40] modeling. How would you how would you
[29:42] approach creating a system of agents
[29:45] like or maybe like a single agent uh but
[29:48] with a more deterministic workflow using
[29:51] embabel? Do you write the method
[29:54] signatures
[29:55] and then sort of feel the prompts or do
[29:58] you start with the prompt? Like what's
[30:00] your take on like how do you do this?
[30:03] >> Okay, there's a lot of lot of things
[30:06] there and they're all great topics. So
[30:09] maybe to start off yes as you say that
[30:12] is those three things are the default
[30:14] way um people start now you can
[30:17] absolutely do that within Babel you can
[30:19] expose as many tools as you want you can
[30:21] have a complex prompt you can throw it
[30:22] into model you have that we generally
[30:26] don't encourage that is the way to model
[30:29] whole applications because the problem
[30:31] with that is you're going to have a
[30:33] large prompt you're going to have a lot
[30:35] of tools they're not going to be
[30:37] predictable how those tools are called
[30:39] by any model and also you are tied to a
[30:43] god model right essentially as you say
[30:46] you want genius level AI to make this
[30:49] work and that comes with a number of
[30:52] problems firstly it comes with cost it
[30:54] comes with latency it also comes with
[30:58] the fact that in an enterprise you don't
[31:00] control that model like your god model
[31:02] literally I mean the model providers can
[31:05] break you overnight I've had
[31:07] applications broken literally overnight
[31:10] by both open open AI and enthropic. So
[31:16] our view of the world is firstly you
[31:19] should assess what is it that you're
[31:21] building. So for example, if you're
[31:23] building a coding agent, take Claude
[31:25] code. Claude code's great. Claude code
[31:28] essentially does that, right? It's got a
[31:31] sophisticated way of rewriting its to-do
[31:33] list, but it gives a genius level AI, a
[31:36] lot of tools, um, and says, "Go figure
[31:38] out how to solve this problem." Um, it
[31:42] works well most of the time, and you
[31:45] know, it's probably the right approach
[31:47] to that problem. However, its failure
[31:50] rate is completely unacceptable for
[31:52] automating business applications, right?
[31:54] It is inherently not predictable. Um but
[31:59] nevertheless for that particular
[32:00] scenario it's quite good. On the other
[32:03] hand you look at any business process
[32:05] that's going to surface directly in
[32:07] customer interactions.
[32:09] You know if claude code does something
[32:12] wrong you just revert it and get right
[32:14] like you can see oh that's a bit off
[32:16] bye-bye it's gone. You can't really do
[32:18] that if you've had an interaction with
[32:20] your customer and you put something in
[32:21] front of them that was really wrong. In
[32:24] fact, I think Air Canada tried that a
[32:26] while ago when you know they presented a
[32:28] wonderful quote uh fair to someone and
[32:30] then um tried to take it back. So you
[32:34] need more predictability. So the goal
[32:36] within Babel is to say whatever you want
[32:39] to do, you have the tools to do it. Like
[32:42] you want to write one one call that has
[32:45] a ton of tools. We don't particularly
[32:47] recommend it, but sure you can do it.
[32:50] Um, but essentially the development
[32:53] process, my experience has been that you
[32:56] learn as you go. And you start off
[33:00] typically
[33:02] with experimenting with some prompts.
[33:05] And in fact, for anything complex, I'd
[33:07] strongly recommend people try something
[33:09] like the OpenAI playground or some of
[33:11] those tools, right? Like iterating on
[33:14] any code is slower than just iterating
[33:16] with prompts. So, you know, prompts are
[33:18] important. you should start by, you
[33:21] know, getting a sense um but then
[33:24] depending on the level of predictability
[33:27] you want, um work out how much you want
[33:30] to pull into the domain. Like one of the
[33:32] things we could do to directly
[33:34] illustrate this would be to jump to our
[33:35] travel planner demo, which is way more
[33:38] complex, but I think it's a great
[33:40] illustration of the kind of trade-offs
[33:42] around this. Should we should we do
[33:44] that?
[33:45] >> Yep, that's awesome. I'm I'm sure
[33:49] >> this one
[33:50] >> this one is in the um tripper uh repo um
[33:57] on imbable. This one's actually written
[33:59] in Cotlin but you know essentially Java
[34:02] or Cotlin are exactly the same. So let's
[34:04] have a look at the domain model we've
[34:06] got here which is a little fancier. So
[34:10] we start off with um a travel brief. So
[34:14] this is where the the kind of thing
[34:17] people want to do and their departure
[34:20] and return dates. Um and we also know
[34:24] about travelers.
[34:26] And what we're going to pop out the end
[34:29] is this travel plan object. So there's a
[34:33] lot of structure here. So for example,
[34:36] it's not free text. So, for example,
[34:39] it's not saying you will stay in Paris
[34:41] um on Tuesday, you'll stay in Djon on
[34:44] Wednesday. What it's um doing is
[34:47] breaking it up for example in a list of
[34:49] stays. So,
[34:52] um it also has access to the travelers
[34:56] and
[34:57] it means that certain things we can put
[35:02] in code for greater predictability. So
[35:05] as you the richer your domain model
[35:07] becomes
[35:09] the more you can work with code. So this
[35:12] has major benefits. So for example let's
[35:15] suppose we have a rule that you um
[35:19] cannot stay um more than four nights in
[35:22] the one place. We just write that in
[35:24] code. We're not relying on an LLM. Um
[35:28] similarly if we had rules that you
[35:30] cannot have to drive more than 600
[35:32] kilometers in a day we could write code
[35:35] for that just use Google map calls and
[35:37] um so you know there's a lot of benefits
[35:40] in your ability to make things
[35:41] predictable by working with code. The
[35:45] most um impactful single one of this is
[35:48] the code that I've got highlighted. So
[35:51] when we run this, it's going to produce
[35:55] a Google map link for the driving
[35:58] itinerary.
[36:00] Both Claude and um OpenAI models think
[36:04] they can generate Google map links and
[36:06] they kind of can, but when you have a
[36:09] really long Google map link, you just
[36:11] need one character off and the whole
[36:13] thing doesn't work. So, you know, I
[36:16] would say we were getting probably 85%
[36:18] failure um when I was letting it do it.
[36:22] So, instead, I just wrote this code
[36:24] using the domain structure that we have
[36:27] to calculate the um the link in code and
[36:32] it has not failed since. So, while we
[36:35] talk about this, let's actually um run
[36:38] it. So, it's got a simple HTMX web
[36:41] interface on it. Um this this is really
[36:45] live. I'll leave it for the sake of
[36:46] time. I'll um leave it the same um
[36:51] samples but so when we plan it. Whoops.
[36:54] Whoa. Oh, that's because I am not
[36:57] running a server. Okay. Yep. It's a
[36:58] genuine example. Start this lever. Um so
[37:02] this one obviously has a web stack on
[37:05] it. Um,
[37:07] and it's using um MCP tools because it's
[37:11] going to need Google search uh or sorry,
[37:14] Brave search. It's going to um
[37:19] need
[37:20] uh
[37:22] Google mapping tools and it's going to
[37:24] need an Airbnb. Um, you're probably
[37:27] going to like where these tools come
[37:28] from um because they come from Docker
[37:33] and the um Docker desktop um MCP um
[37:39] gateway and you know I think really this
[37:42] is a far superior alternative to say you
[37:45] know running tools with NPX or UV as
[37:48] individual processes like it you should
[37:50] handle secrets. Yeah. So that's all
[37:53] good. Um, so the tools are accessed via
[37:56] MCP. You can see it's um started up. Um,
[38:02] and now hopefully it will look. Whoops.
[38:07] Oh, actually, okay, it did. It did
[38:09] actually. Okay, so it's um correctly
[38:12] submitting it. So, let's go back here.
[38:15] We'll resize this. So this is a very
[38:18] simple interface to stream back events
[38:21] as inbable runs. It generates events. So
[38:25] you probably noticed the Star Wars
[38:28] logging before. It's both a bit of fun,
[38:31] but it's also has a serious point that
[38:35] all info logging comes from um events
[38:40] which means we can stream those events
[38:42] over something like SSA. So what our
[38:46] travel planner agent does um is
[38:51] start off the very beginning. It uses a
[38:54] number of different models by the way.
[38:56] So it starts off by finding points of
[39:00] interest. So it says considering the
[39:02] following travel brief and notice we're
[39:04] building this prompt in a type safe way.
[39:06] Find points of interest that are
[39:08] relevant to the travelers. So here we're
[39:11] using a good LLM. I've externalized the
[39:14] LLM into um YAML using Spring. So we can
[39:19] change this. For example, we want to
[39:21] change the persona of the planner. We
[39:23] want to set hyperparameters or
[39:24] everything all externalized.
[39:27] Um and we're giving it tools. So here
[39:31] again, you see that fluent API you get
[39:34] from context.ai
[39:35] very nice in either Java or Cotlin. So
[39:38] here we're specifying tools. We're
[39:41] saying we want web tools. We want map
[39:43] tools and we want math tools. Um, and
[39:47] we're using a good LLM. So, if we look
[39:51] here at the Thinker LLM, it's GPT41. So,
[39:54] it's a full fat GPT
[39:57] um for one. So, once it's done that, it
[40:01] produces an itinerary ideas object. So
[40:06] one of the other things that I think
[40:07] makes a lot of sense with domain
[40:09] modeling is when you have these interim
[40:12] objects because you can put guard rails
[40:14] on them, you can validate them, right?
[40:16] Again, the more domain model, the more
[40:19] structure you have, the more you
[40:21] understand what's going on and obviously
[40:24] understandability and explanability is
[40:26] you one of the major challenges we face.
[40:28] So now we've got a list of points of
[40:30] interest in that object. So that takes
[40:32] us to the next action and the planner
[40:35] can work all of this out from the um
[40:38] types the flow of data types and so it
[40:42] researches points of interest. So here
[40:45] you can see it firstly specifies a
[40:49] prompt runner which has got the
[40:50] requisite tools that it needs and now it
[40:53] uses um the operation context parallel
[40:58] map method. So it says, hey, you can run
[41:00] this in parallel, but don't have more
[41:02] than a certain degree of concurrency.
[41:04] Very important to control that because
[41:07] you're not well, you're not really going
[41:08] to run out of virtual threads on your
[41:10] JVM, but you are if you do it um too
[41:14] fast, you're going to get rate limited,
[41:16] and that will be a great deal slower if
[41:18] you're backing off and waiting for the
[41:20] model to be rate limited. Um so here
[41:25] we're using a different LLM. So here you
[41:28] can see that we're using the researcher
[41:30] LLM. Let's have a look at the researcher
[41:34] LLM. It's GPT41 mini. So you know
[41:37] another good example here that you use
[41:42] the appropriate LLM for the call. This
[41:45] is a short prompt. All it has to do is a
[41:47] little bit of tool calling. Doesn't have
[41:48] to think of any wonderful ideas. So once
[41:52] we've got that, we now have points of
[41:56] interest findings. Now we use a good
[41:59] model. Again, the rider LLM is a good
[42:01] model. And it takes all of that and
[42:04] builds um a U proposed travel plan. Next
[42:10] step is it finds places to sleep. So it
[42:12] looks at the days we're staying and for
[42:15] each of those it uses the Airbnb tour to
[42:19] see Airbnb locations. So here is what it
[42:23] output from Roman stones to wine
[42:26] thrones. So we should have a link to the
[42:28] interactive map. And
[42:31] guess what? The interactive map actually
[42:34] works because it was built in code and
[42:37] there aren't any funny um characters
[42:39] there. Um, so we've
[42:45] used image search um to um find places
[42:51] along the way. We've written it up and
[42:53] then also we've got our um air B&B links
[42:59] which should be for um the correct Oh
[43:03] no, that sorry that um actually is
[43:06] wrong. There's there is a bug in that
[43:08] prompt that thing. Um so but um you know
[43:15] by and a whole lot of this was um
[43:21] was coordinated through data types and
[43:24] is therefore very um testable.
[43:28] Um what else was I going to say? Oh yes
[43:31] there's some some post-processing at the
[43:33] end. The post-processing at the end
[43:37] involves LLMs love hallucinating images.
[43:40] I don't know why both openi models and
[43:43] anthropic models love hallucinating
[43:46] images. Um what we do is a final pass
[43:50] where we look at every image run an HTTP
[43:54] get on it and if it doesn't exist we
[43:56] just quietly delete it. So you know
[43:59] again you need these kind of kind of
[44:02] workarounds in cope. So does that that
[44:05] make sense?
[44:07] >> Yes. I'm personally I think I need to
[44:11] sleep on this and maybe play with it a
[44:13] little bit bit more. I don't fully
[44:17] understand
[44:18] uh it feels that there should be value
[44:21] in building the plan by a planning ll by
[44:25] the planning approach rather than in
[44:28] writing it in code because for a task
[44:31] like here there is only a natural one
[44:34] natural way to connect uh the actions uh
[44:38] and that what normally I would say in
[44:41] the method right I would say find
[44:43] pointers of interest do this, do that,
[44:46] chain that via uh just variables passing
[44:50] back and forth. Uh and I'm sure there
[44:53] are like many use cases where this
[44:55] non-deterministic planning and retrying
[44:58] and replanning is essential. Probably
[45:02] not in a simple example like this. Uh,
[45:05] it feels very powerful, but it also
[45:09] feels like like I'm a little too
[45:13] inexperienced to appreciate that. Um,
[45:16] >> well, I think we jump we did jump from a
[45:19] simple example to a fairly complex
[45:21] example. So there is a lot.
[45:24] >> Yeah, it it is it is awesome to see such
[45:27] a complex thing in action. It is it is a
[45:30] very comprehensive example. I think one
[45:32] of the best where uh you actually
[45:34] connect to external systems like no way
[45:38] an LLM would actually guess that Google
[45:41] Maps link correctly like no chance 100%.
[45:44] >> Uh and and it's it's it's a very nice
[45:48] example because a lot of data in the
[45:50] real world actually super important like
[45:52] if you if you pass like an IBAN for the
[45:55] bank account right every number actually
[45:57] is very significant right.
[46:00] >> Yeah. Well, actually, interestingly, in
[46:02] terms of making it more reliable, the
[46:04] Airbnb
[46:05] um link is the only thing that is a bit
[46:07] flaky at the moment. The reason for that
[46:10] is that I'm using the AirB an Airbnb
[46:14] tool. So, an LLM is calling that because
[46:18] I can't I don't think Airbnb have an API
[46:21] I could call in code. So, I could make
[46:23] that 100% reliable if Airbnb had an API
[46:26] that I could call in code. So you know
[46:28] it is actually the one floor in the
[46:31] application is actually a demonstration
[46:33] of the limits of tool collet because
[46:36] yeah I've looked at that prompt it looks
[46:39] fine to me I've debugged it it's sending
[46:41] the correct prompt and often it gets the
[46:44] tool the tool called just a little bit
[46:47] wrong and you know then you end up in
[46:49] Nashville instead of in France. Um, so
[46:54] yeah.
[46:54] >> Yeah. As for most things, you probably
[46:56] need to have some human in the loop at
[46:58] least at the end of this. So hopefully
[47:01] you're not going to book this holiday uh
[47:04] travel plan and then just go without
[47:06] looking. No, this is awesome. This I
[47:09] feel as a Java developer myself, I feel
[47:11] this is very approachable. Uh I think I
[47:14] understand better your idea about how to
[47:16] create a system of agents using the
[47:19] actions um and goals. That was a very
[47:23] high level thing that I didn't grasp
[47:26] before. So thank you. This was very very
[47:28] educational for me personally. Uh one
[47:31] maybe one of the last questions. Uh do
[47:34] you see like so in Babel is a few months
[47:37] old now right? So you've been working
[47:39] for uh some time on this and in the AI
[47:43] ecosystem time goes even faster than in
[47:46] JavaScript right it's just that's uh
[47:49] since the beginning of this year it's
[47:51] forever in AI years uh
[47:54] >> do you see ideas from embabel sort of uh
[47:59] start being adopted or do people in the
[48:04] ecosystem take notice or
[48:08] uh is everyone building their own things
[48:10] and not particularly
[48:14] uh looking for inspiration?
[48:17] >> Um look, I think there currently is
[48:20] probably not as much awareness as there
[48:23] should be of what's happening on the JVM
[48:25] ecosystem, say in the Python ecosystem.
[48:28] Um I
[48:31] think that the domain modeling my
[48:33] emphasis on domain modeling I think that
[48:35] is starting to get um more awareness
[48:39] now. Um so yeah I think that the ideas
[48:46] hopefully will you know will
[48:48] cross-pollinate. I mean certainly I'm
[48:50] very familiar with all the Python
[48:52] frameworks. uh I I'm not sure that I've
[48:55] learned that much from them but well
[48:57] actually that's that's maybe a little
[48:58] harsh but you know frankly I would say
[49:01] that if you look at the approaches to
[49:03] planning in Python
[49:06] they are the obvious things like you
[49:08] know if you think about this problem of
[49:10] how do you plan multi-urgent workflows
[49:13] for you know 10 minutes and you haven't
[49:15] thought of this finite state machine you
[49:17] haven't thought of sequential nested
[49:19] execution like crew AI and you haven't
[49:22] thought about using an LLM to plan like
[49:25] um semantic kernel, you're probably not
[49:29] a serious computer scientist. So, you
[49:32] know what I would say is that I think
[49:34] there's a significant advantage in not
[49:36] being first mover. Look, I think that
[49:38] understandably a lot of the Python
[49:40] frameworks ran with the obvious things
[49:42] and rather than whereas, you know, I
[49:44] kind of had I don't know if I'd call it
[49:47] the luxury because it was kind of also
[49:49] sometimes frustrating. I spent a lot of
[49:52] time thinking and thinking okay is there
[49:54] a better way and maybe you know
[49:56] sometimes not being first mover is a
[49:58] considerable advantage like if you look
[50:00] at spring so you know obviously I was
[50:04] pretty well known to have a low opinion
[50:06] of EJB the fact is though that if EJB
[50:10] had not come before spring
[50:13] would not have been as good so we took
[50:16] ideas like declarative transaction
[50:17] management was a really good idea
[50:19] admittedly it wasn't originating in EJB,
[50:21] but you know, we did the same things
[50:24] where they' done things that were good
[50:26] and we learned from the things that
[50:27] they' done that were not good. So, you
[50:29] know, often to get to a really good
[50:31] model, it's important to see what's out
[50:33] there.
[50:34] >> Yeah, that's a true Java way actually
[50:37] like that's how the whole language and
[50:39] the platform operates and moves forward.
[50:41] >> Uh taking time, taking their sweet time
[50:44] to achieve there, but uh
[50:47] >> the results are super impressive. So the
[50:50] whole question about like the time the
[50:53] space of time is really interesting and
[50:55] obviously it has accelerated a lot in um
[50:58] so for example you know some of the
[51:00] first wave of frameworks in Python like
[51:02] for example langchain still has some
[51:04] legacy in terms of its design from
[51:07] pre-tool calling being a thing right
[51:09] like so you know capabilities of models
[51:12] are definitely um improved but
[51:16] interestingly there still is momentum
[51:19] Like you look at lang chain which is
[51:20] really quite dominant in Python. Um and
[51:24] the fact that lang chain you know
[51:27] develop traction
[51:29] traction is stickier than you would
[51:32] think even despite things having
[51:34] accelerated. What we're trying to do is
[51:38] progress to 1.0 fairly rapidly. But we
[51:42] understand that you can't like it's
[51:43] different from say doing a release of
[51:45] spring, right? You've got to get to
[51:47] market quickly. you've got to follow
[51:49] features quickly. So, we differentiate
[51:52] between stable and experimental
[51:54] features. So, when we do 1.0 final,
[51:57] which we hopefully will by the end of
[51:59] the year, there will definitely be um
[52:02] types and methods in there that are
[52:04] annotated with the jet brains at API
[52:07] status experimental. And we think that's
[52:09] a really nice balance. So, you know,
[52:12] when we ship 1.0, Oh, if you don't get
[52:14] any warnings in your IDE about using
[52:16] experimental features, we'll do our
[52:18] utmost not to break your code. Um, but
[52:20] on the other hand, there will be extra
[52:23] stuff that's not yet baked and you know,
[52:25] you will be able to give us feedback on
[52:27] it. Hopefully, it will work to the
[52:29] benefit of everyone,
[52:31] >> right? What's the best way to connect
[52:32] with the Embabel community and give
[52:35] feedback and learn?
[52:37] >> Um, the Discord um is pretty good. So
[52:41] the link to discord is on the repo, the
[52:46] agent repo. Um and also you know
[52:50] obviously raise issues, discussions,
[52:53] pull requests. We you know getting some
[52:55] really quite good uh community
[52:57] engagement. We've got quite a number of
[52:58] community contributors. Uh we've got
[53:01] people translating resources into
[53:03] different languages. Also people making
[53:05] you know material code improvements.
[53:08] >> Yeah, that is awesome. That's the power
[53:10] of open source.
[53:11] >> It is it is pretty pretty amazing. I
[53:14] mean I haven't done
[53:15] >> so really most of what I've done in the
[53:18] last probably 15 years since GitHub
[53:21] really became a thing
[53:22] >> was not actively developed open source.
[53:26] I mean some of it was open source but it
[53:27] wasn't open source to the big community.
[53:29] And that is actually pretty satisfying
[53:32] to feel that rush again and also do it
[53:35] with like so much better tools. In the
[53:37] early spring era, we were using Source
[53:40] Forge and CVS. Admittedly, we switched
[53:43] off CVS pretty quickly. But, you know,
[53:44] it's just amazing to do this with the
[53:46] kind of tools we have for community now.
[53:49] >> Yeah. Yeah. Just to just to wait until
[53:51] AI will get good at coding and then you
[53:54] won't even need to keep
[53:56] >> this is already an issue. um like we are
[53:59] getting like overall the community um
[54:02] contributions are great but we do get
[54:05] some things that are very obviously AI
[54:07] generated and where the contributor
[54:08] probably didn't really understand them
[54:10] and like every open source active open
[54:13] source project I talk about is dealing
[54:15] with this. So we actually um are
[54:19] planning to develop community agents
[54:21] that help us manage like GitHub and
[54:26] because yeah unfortunately probably the
[54:27] only defense against people making pull
[54:29] requests with bots is having bots to
[54:31] triage them.
[54:32] >> Yeah, they as it was everything they the
[54:35] answer to problems with AI is more AI,
[54:38] >> right? Yeah. It's good you're a model
[54:40] vendor.
[54:41] >> You can lose money even faster.
[54:44] >> Excellent. Thank you so much. This was
[54:46] very very insightful. Uh I learned a
[54:48] ton. I'm sure our viewers learned a lot.
[54:52] Uh check out the sample agents. Check
[54:54] out the embabel. It's Java. It's spring
[54:57] boot. If you are in Java ecosystem, it
[54:59] will feel very very natural for you. You
[55:01] can plug it into your existing
[55:03] applications using making use of your
[55:05] domain model existing classes. just see
[55:08] how it feels or you can create from
[55:10] scratch just for example using the agent
[55:14] template as raw truth. So thank you for
[55:17] watching and stay tuned for the next
[55:19] episode.
[55:21] >> Great. Thank you so much.
