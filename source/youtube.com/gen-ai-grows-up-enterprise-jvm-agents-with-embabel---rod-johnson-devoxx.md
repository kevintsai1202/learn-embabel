# Gen AI Grows Up: Enterprise JVM Agents With Embabel  by  Rod Johnson

**影片網址**: [https://www.youtube.com/watch?v=_Y-srK-Ad4c](https://www.youtube.com/watch?v=_Y-srK-Ad4c)
**影片 ID**: `_Y-srK-Ad4c`

## 影片簡介
Since the emergence of Gen AI, it&#39;s become obvious that agents will be a big part of our future as both technologists and citizens. Building predictable,...

---

## 影片逐字稿 (Transcript)
[00:00] [Music]
[00:07] Hi. So, the good thing about today is
[00:11] that because I already had 20 minutes in
[00:14] the keynote, I think you know why I
[00:17] think that we should be building agents
[00:20] on the JVM. So, that's good. I can move
[00:23] on to why you should specifically do
[00:25] that using imbable rather than another
[00:29] framework. So this is a 100% slide uh
[00:35] free presentation. So I do hope you can
[00:37] read the code up the back. I did check
[00:39] out didn't seem too bad. U but there's
[00:42] going to be a whole lot of looking at my
[00:45] IDE. So firstly why does inbabel exist?
[00:51] I got really interested in Gen AI
[00:53] probably two, three years ago. Well,
[00:56] really interested might be an
[00:57] understatement maybe. If you ask my
[01:00] girlfriend, she might say borderline
[01:02] obsessed, but it was quite a long time
[01:04] ago. And at that time, because I'd been
[01:06] doing quite a lot of machine learning
[01:08] stuff, I was actually significantly more
[01:10] fluent in Python than in Java. So, I
[01:14] started experimenting with APIs and
[01:17] looking at building a framework in
[01:18] Python.
[01:20] and fairly quickly concluded that for
[01:22] two reasons that was not the thing to
[01:24] do. Firstly, Python is not ideally
[01:26] suited to building I think the complex
[01:29] applications that we often need in
[01:30] business. Um and secondly that agents
[01:35] are as valuable as what they can get at.
[01:38] What they can get at could be for
[01:40] example your domain model. It could be
[01:42] your messaging services. It could be the
[01:45] investment you've made in the entities
[01:47] and the way you persist them to the
[01:50] database. So for that reason, it was a
[01:53] no-brainer that the JVM was going to be
[01:56] very important. So I took a long look at
[01:58] the various frameworks that were out. Of
[02:00] course, the landscape was much much
[02:02] earlier um back then and broadly
[02:05] speaking, I think that none of them had
[02:10] hit on the ideal approach. So firstly,
[02:16] let's talk about the level we need. So
[02:18] you could say do the level of spring AI
[02:22] or the level of lang chain in Python or
[02:24] the non-agenic part of lang chain for J.
[02:28] And essentially what that's doing is
[02:30] valuable. It's necessary but not
[02:32] sufficient. What it's doing is enabling
[02:34] you to call models in a portable way.
[02:38] That proves to be actually pretty
[02:40] difficult because not only do you need
[02:42] to cope with the different APIs of the
[02:45] different model providers. You'd need to
[02:47] do a bunch of magic around, you know,
[02:49] hopefully portable abstractions around
[02:51] hyperparameters like temperature and
[02:54] also you need to do the tool called
[02:56] dance because actually while we may
[02:59] think it's easy enough to just add tools
[03:02] using our um framework, there's quite a
[03:05] lot of magic that has to go on under the
[03:08] covers where the LLM calls back the tool
[03:11] instance and um it's all transparent to
[03:14] you as the developer. So that layer is
[03:17] really really important and fortunately
[03:20] it is now a layer that is as mature in
[03:22] Java as anything is when AI is concerned
[03:26] like you know we're looking at a whole
[03:27] different level of maturity here
[03:29] compared to what we have been used to
[03:32] coming out of the JVM space. When we say
[03:34] one framework is mature it's not mature
[03:37] like Spring um but you know it's mature
[03:41] on the JVM in the context of what else
[03:43] is out there.
[03:45] However, just being able to make calls
[03:47] to an LLM in a portable way is not
[03:51] sufficient. We also need to do
[03:54] orchestration.
[03:55] This actually is something where I think
[03:58] we've seen a big recognition this week.
[04:01] I don't know how many of you followed
[04:02] the recent um Open AI announcements
[04:05] around agent kit amongst other things.
[04:08] Open AI are now putting a big emphasis
[04:11] on orchestration as part of the
[04:13] solution. So they seem to have, you
[04:16] know, stopped talking quite so much
[04:18] about how AGI was just around the corner
[04:20] with their models. So now they're
[04:22] accepting that to solve real problems,
[04:24] we need orchestration. We need a series
[04:26] of steps and a way of wiring up those
[04:28] steps. So that what is what brings you
[04:31] to what I regard as a true agent
[04:33] framework rather than a framework for
[04:35] portably calling LLMs. So that is not
[04:38] for example in the Python world. Lang
[04:41] chain is the lower level thing. Lang
[04:43] graph and crew AI are this kind of
[04:46] higher level thing that's really focused
[04:49] around how you chain multiple steps
[04:51] together into an agentic workflow. So
[04:55] looking at both what existed in Python
[04:57] and what existed in Java at that space I
[05:00] was not and continue not to be
[05:03] impressed. So in the Python space there
[05:06] are the two most popular things crew AI
[05:10] and langraph work by specifying the
[05:14] order of the action steps that um you
[05:17] want to execute and they typically make
[05:20] an LLM call for each step or possibly
[05:22] they run some code for the individual
[05:24] step. In the case of langraph you wire
[05:28] that up as a finite state machine. So
[05:31] you specify nodes and edges. In the case
[05:34] of crew AI, you specify a sequence and
[05:37] some elements in your sequence can kind
[05:40] of compose and go into their own flow.
[05:43] So both of these things involve you
[05:45] wiring up the steps ahead of time in
[05:49] code. I think those are obviously the
[05:53] you know the things that occur to
[05:54] they're the obvious way to do it, right?
[05:56] Like if you thought about this problem
[05:57] for more than half an hour and you
[05:59] didn't come up with both of those
[06:01] approaches as a potential approach,
[06:03] you're probably not a great framework
[06:05] developer.
[06:08] But what happens if we think about the
[06:10] problem for a bit longer than that and
[06:11] we think okay what would be a good
[06:13] solution that isn't just obvious and
[06:16] that is what I brought brought me to one
[06:19] of the key differentiators of imbabel.
[06:23] Embable does allow you to break flows up
[06:27] into multiple action steps. That's
[06:28] really important and you know langraph
[06:31] crew AI lang chain a genetic enable you
[06:34] to do that and it's a really important
[06:35] thing to do. But in terms of how you
[06:38] plan the steps there are essentially
[06:41] three approaches. The two existing
[06:43] approaches are explicit wiring up ahead
[06:46] of time as in length or crew AAI
[06:49] using an LLM to do the planning which is
[06:52] for example what Microsoft semantic
[06:54] kernel does or in the case of inbable we
[06:58] did something quite different which is
[07:00] use a distinct planning step that uses a
[07:06] pathfinding nonLM algorithm to work out
[07:09] what steps should be achieve executed in
[07:12] the right order to achieve a goal. Why
[07:14] is this important? It's important for
[07:16] two reasons. Firstly, it's more flexible
[07:20] than say a finite state machine. If you
[07:22] have a finite state machine and you want
[07:24] to add extra nodes and edges, there's a
[07:26] bunch of wiring and rewiring you need to
[07:28] do, right? If you're addressing a
[07:31] problem like regular expression parsing
[07:33] where regular expressions don't change
[07:35] very often, that's fine. But if you're
[07:38] dealing with business logic where it
[07:39] changes a lot, that's not necessarily
[07:41] ideal. Secondly,
[07:45] when you're ordering actions
[07:48] separate from the definition of action,
[07:50] but like ordering the actions explicitly
[07:52] in code, you lose type safety. For
[07:55] example, in Crew AI, when you specify
[07:58] the order of your tasks, as they call
[08:03] actions, well, you could be wrong. like
[08:06] the next task is relying on the magic um
[08:10] thing that apparently went into the map
[08:12] in the previous task with the right
[08:14] string key. So if you're doing that kind
[08:17] of ordering unless you're like directly
[08:20] invoking it in code like do thing A do
[08:22] thing B if you're doing that kind of
[08:24] ordering with a framework you're
[08:25] throwing away typing. So that brought us
[08:29] to the core innovation in in Babel which
[08:32] is we do planning but it's deterministic
[08:36] and it's not done in your code. Right?
[08:38] Let's let's make this more concrete by
[08:41] code examples. So firstly I'm going to
[08:44] show how easy it is to get started with
[08:46] imbable. To do that you go to the Java
[08:50] agent template. So if you go to the um
[08:54] Java agent template at inbable you will
[08:58] see that you've got this lovely little
[09:00] use this template button. Um this is
[09:03] some nice functionality GitHub has. You
[09:06] can create your own repository in your
[09:08] own organization very very quickly. If
[09:10] you have an open AI or enthropic key you
[09:13] will have your agent up and running um
[09:16] in under a minute. So what I'm going to
[09:19] do is look at what's in that Java agent
[09:22] template. Standard Spring Boot
[09:24] application. In this case, we're using
[09:26] Maven, but of course you can use Gradle.
[09:28] Notice we extend the Spring Boot parent
[09:32] and we bring in the imbable starters
[09:36] that we want. So in this case, we bring
[09:39] in the core imbable agent starter and we
[09:42] also bring in the starter for OpenAI
[09:45] models. You could use starter anthropic
[09:48] starter bedrock. There was a workshop on
[09:51] uh Monday that um covered the support we
[09:54] have for bedrock. So all of those things
[09:56] are brought in as extra starters. So
[09:58] very familiar to Spring Boot. So then of
[10:02] course you would need a application main
[10:06] class. Again we're very much in the
[10:08] Spring Boot world here. Um and you just
[10:12] define a spring boot application and you
[10:13] add a single thing to it which is at
[10:15] enable agents.
[10:17] So add enable agents means that imbabel
[10:21] is now going to participate in the class
[10:23] path scanning that spring does and it's
[10:25] going to identify agents and actions
[10:29] that will be useful to it. Another
[10:32] important thing here is the logging
[10:35] theme. All logging in in imbable is done
[10:38] in response to events. Uh this is
[10:41] something I always wanted to do with
[10:42] spring but it was a bit too late to
[10:44] retrofit. So all info level logging
[10:47] comes from reacting to an event. And
[10:50] this is a really good discipline because
[10:51] it means we have to emit the correct
[10:53] events so that you understand exactly
[10:55] what's happening. Those events can also
[10:57] obviously go over the wire with SSE or
[11:01] alternatively you can write application
[11:03] code that reacts to specific events. So
[11:07] because logging is done um in response
[11:10] to events, we can easily change the
[11:12] style of our logging. So we have the
[11:14] notion of logging themes and we've got a
[11:16] few out of the box including Star Wars
[11:18] and Severance for fans of that show and
[11:22] the default one for this is Star Wars.
[11:25] My experience is that most people in the
[11:27] community think this is great and fun,
[11:29] but a very small number of people really
[11:32] really disapprove of it. And the answer
[11:34] is that. And now you get perfectly
[11:36] normal boring logging. But I'm going to
[11:38] put it back. Okay. So this is the um
[11:43] Java agent template. This is what you
[11:45] would get if you ran it yourself. So you
[11:49] can start it up with a shell or in the
[11:51] IDE. And by default, you can see we've
[11:54] got our Star Wars logging here. Um, and
[11:57] he's in one of the um, approved colors.
[12:00] I think it might have been Tatooine
[12:01] blue. Um, someone in the team looked it
[12:04] up. Um, so by default, it starts up in
[12:08] Spring Shell. It's a really nice
[12:10] interactive way of adding functionality
[12:13] because you can add your own at shell
[12:14] components with at shell methods. So you
[12:17] know obviously this is not how people
[12:19] run inbabel in production but it is very
[12:22] very useful to get started. So we now
[12:25] have an imbabel server running and a
[12:28] different thing about say inbable to
[12:31] take spring aai is inbabel really is a
[12:34] server so it knows everything that's
[12:36] deployed on it. It's able to manage
[12:39] processes. So when it's running agent
[12:41] processes they might be long running.
[12:42] They might even wait for human response.
[12:45] So we've got a server here. Let's ask it
[12:48] a bit about itself and we have some
[12:50] shell commands for that. So let's
[12:52] firstly ask it what models it has. So
[12:55] here it tells us that it's got access to
[12:58] various open AI models. This is because
[13:02] we brought in the open AI starter. We
[13:04] also support any model that's supported
[13:06] by Spring AI. So for example, bedrock
[13:09] models, we did a whole workshop on that.
[13:11] Any bedrock model you can get access to.
[13:13] Enthropic models, the claude models are
[13:16] severely rate limited, but they're very
[13:18] very good. Um, so clawed models, if you
[13:21] have your anthropic key and bring in the
[13:22] right starter and also lama models,
[13:28] local models are becoming more and more
[13:31] important. I mean if you look at the
[13:33] pace of improvement of the large
[13:36] commercial models like for closed source
[13:38] models like say GPT
[13:41] um or claude I would say the rate of
[13:43] improvement is slowing if you look at
[13:45] what's happening with local models so
[13:47] the smaller open models it's
[13:49] accelerating so the best local models
[13:53] are now amazingly good and one of the
[13:56] benefits of using any true agent
[13:58] framework like in Babel or Crew or
[14:01] Langraph is you're breaking flows down
[14:04] into smaller steps. Those smaller steps
[14:07] are more amendable to running on a local
[14:10] model. So we support OAMA um local
[14:15] models. We also support the Docker um
[14:18] local model capability and you have a
[14:20] wide choice of models that you can run
[14:22] at varying sizes and I strongly
[14:24] encourage you to look at that. But this
[14:27] one's going to run against OpenAI. Now
[14:31] let's ask it about agents. So there's a
[14:35] bit of um stuff here that I'll explain
[14:38] later, but at the moment the TLDDR is
[14:40] it's got a write and review agent.
[14:42] Generate a story based on user input and
[14:45] review it. So this is a simple agent
[14:48] that consists of two steps in the
[14:50] workflow. The first one is it generates
[14:52] a story using one LLM call. The second
[14:55] one uses a different LLM call to review
[14:59] that story. So fairly common um kind of
[15:02] pattern, pretty simple but um
[15:04] nevertheless somewhat interesting. But
[15:07] let's ask
[15:10] a little bit more. Let's ask what goals
[15:13] we have. So here you can see the goal is
[15:16] the story has been crafted and reviewed
[15:18] by a book reviewer and the goal has a
[15:22] set of preconditions. Let's talk about
[15:24] how Inbabel does action planning. I said
[15:26] you don't need to wire it up explicitly.
[15:30] What you do is you write your code and
[15:32] in Babel works out what things need to
[15:34] be run in what order to achieve the
[15:36] appropriate goal. So actions have
[15:41] preconditions
[15:43] and expected postcond conditions.
[15:46] Goals have only preconditions.
[15:49] So these are assessed from the world
[15:52] state. This is an algorithm called GOP,
[15:55] goal oriented action planning. It is one
[15:57] of the most popular algorithms used in
[16:00] controlling AI characters in gaming. So
[16:03] I like to say that although hardly any
[16:05] enterprise Java developer has heard of
[16:07] this algorithm, I think you've nearly
[16:09] all been killed at some point by a gulp
[16:12] AI.
[16:14] It's really a manif a repackaging of a
[16:18] very very old AI concept. So back in the
[16:22] 50s there was something called general
[16:24] problem solver that was fairly similar
[16:26] to this. In the 70s there was something
[16:28] called strips. Um and it's this concept
[16:32] of essentially a pathf finding algorithm
[16:34] like aar through a series of world
[16:38] states.
[16:40] Why is this good? Well firstly it means
[16:43] that your system will always choose the
[16:46] same path with given world state. Right?
[16:49] So, it's not like an LLM where it can't
[16:51] explain why it chose to do something. It
[16:53] can explain exactly why it chose the
[16:56] steps in what order.
[16:59] Um, and it's also, you know, really
[17:01] pretty fast compared to an LLM. But
[17:05] because
[17:06] we're planning with the actions and
[17:08] goals we know about,
[17:10] we can add more actions and goals and
[17:13] then our system potentially can do more
[17:15] things. So because you're not needing to
[17:18] wire things together explicitly, say
[17:20] with a finite state machine, you can
[17:23] increase the power of your system
[17:24] without making it non-deterministic by
[17:27] adding more actions and goals. Okay, so
[17:30] let's see a simple example of this. Wow,
[17:33] that's okay. We're good. So we have one
[17:38] um agent which is to craft a story. So,
[17:41] I'm just going to invoke it saying, tell
[17:43] me a story about what shall we um tell a
[17:48] story about? Loudest shout wins.
[17:51] >> Star Wars.
[17:52] >> Star Wars. Okay. Yeah.
[17:56] So, this with this mode of invocation,
[17:58] what it will do is choose a goal using
[18:00] an LLM and obviously the write and
[18:03] review story goal is appropriate here
[18:05] and then it will execute it. In a
[18:07] distant galaxy, young Kira discovered an
[18:10] ancient holocron buried beneath the
[18:13] sands of Tatooine. Okay, so we've got
[18:15] our um we've got our story and we've got
[18:18] our review. The story is a little bit
[18:23] it's a little bit wacky like empowered
[18:26] Kira ignited her lightsaber ready to
[18:29] challenge. It's it's expressed in kind
[18:31] of more flowery language than the
[18:33] review. Let's see why that is. So now
[18:37] I'm going to run it again with the -ashp
[18:40] option so you can see exactly what
[18:43] prompts it emitted.
[18:47] Well, actually we'll look at a little
[18:48] bit of code first and then we'll get
[18:49] back to that. So what do we have here in
[18:52] our write and review agent? How did know
[18:55] that it existed? The way it knew it
[18:57] existed is that
[19:00] it saw a class with at agent annotation
[19:04] on it. ad agent is a spring meta
[19:06] annotation. So this means that just the
[19:09] same way for example a rest controller
[19:12] is a spring bean. Um any imbable at
[19:15] agent is a spring bean. So it's going to
[19:17] get injected. It's going to get you know
[19:19] security whatever services the spring
[19:21] container has to offer. In this case, um
[19:26] the um constructor does take a couple of
[19:29] parameters which are um defaulted. Um so
[19:34] it uses spring value parameters but you
[19:37] know in real more sophisticated agents
[19:39] you will inject other services that come
[19:42] from your spring JVM world. So think
[19:45] about that for example let's suppose you
[19:48] were um doing this with crew AI in
[19:50] Python
[19:52] not going to be injecting Java services
[19:55] getting at the Java domain objects that
[19:57] probably represent a lot more of your
[20:00] business value in your organization than
[20:02] anything you have in Python. So you know
[20:04] firstly we are as close to the spring
[20:06] world with this as if we were writing a
[20:09] rest controller. Secondly let's look at
[20:12] where these actions come from. So if we
[20:15] ask it before we run it again with the
[20:17] prompt, let's ask it what actions it
[20:19] knows about. We ask what goals. Let's
[20:21] see what actions. So review story and
[20:24] craft story and it's got the planner
[20:26] information about them. But here for
[20:28] example is the craft story action.
[20:32] The craft story action takes two
[20:33] parameters. One is user input which is a
[20:37] like standard framework class that's
[20:39] useful for initial binding use initial
[20:42] user input. The second one is operation
[20:44] context. Operation context is a special
[20:48] thing that enables you to get at the
[20:50] capabilities of the platform like
[20:52] calling models. Um but
[20:56] the way in which action preconditions
[20:59] and goal preconditions are determined in
[21:02] imbeable is around data typing. I
[21:05] believe it is by far the most type of
[21:08] any framework. Um, and you never never
[21:11] use rely on string keys. When you build
[21:15] your prompts, it's type safe. When you
[21:17] look at the data flow between different
[21:19] actions, it's type safe. So, what this
[21:21] says here is that this action has a
[21:24] precondition of user input, right? You
[21:26] can't do it unless you've got user
[21:28] input. Um, and it's got an expected post
[21:32] condition of a story object. as your pro
[21:35] agent process executes it has a
[21:38] blackboard. So it has it's maintaining
[21:41] state.
[21:43] So user input um is a domain object in
[21:46] this case. Operation context is not
[21:48] operation context and AI are just
[21:50] imbalable um types that are really handy
[21:54] to use but don't affect your control
[21:55] flow. Secondly, we've got this other
[22:00] action which is annotated without
[22:02] achieves goal. So this is an action that
[22:05] takes
[22:06] user input and a story and returns a
[22:10] reviewed story. The achieves goal
[22:14] annotation is a convenient way of saying
[22:17] when you've executed this action, you've
[22:19] achieved the following goal. So it's
[22:20] just it's just really a shorthand. So
[22:23] this defines both an action and a goal.
[22:27] So the planner can look at your code and
[22:30] it can work out what order these
[22:33] operations need to run in. So it's
[22:35] completely type safe. You're not
[22:37] specifying ordering of things that could
[22:39] potentially conflict with the types. It
[22:42] will work out that it can run them in
[22:44] that order. If you wanted to add any
[22:46] custom preconditions, you could also do
[22:49] that by saying which particular
[22:51] preconditions you want. But most of the
[22:54] time your conditions are satisfied by
[22:58] data types. So if you look here at the
[23:01] more detailed output, you can see for
[23:03] example the precondition of craft story
[23:07] um is that it hasn't run um and we have
[23:12] user input.
[23:15] So let's run it again with um more
[23:19] explicit prompt. Firstly, we'll just
[23:22] take a quick look at how the craft story
[23:24] method works.
[23:26] So, from the context, we get the AI
[23:31] object. You can often inject in um
[23:35] embable the AI object or the operation
[23:38] context. Usually, if you've got a choice
[23:40] between the two, it's better to do the
[23:42] AI object because all that does is
[23:44] enable you to run prompts. And it's good
[23:46] practice to, you know, use the least
[23:49] powerful thing you can. But in this
[23:51] case, we're getting AI from operation
[23:53] context. We now go into our fluent
[23:56] interface um that makes it really easy
[23:59] to custom choose LLMs, customize the
[24:02] calls and run prompts. So we're saying
[24:05] with LLM and we're saying auto LLM with
[24:08] temperature, we could also if we wanted
[24:11] to do with max tokens. All of this is
[24:15] very very easy, very toable interface.
[24:19] We're adding here a prompt contributor.
[24:22] So, Embable helps you structure prompts
[24:25] from reusable piece parts. They can be
[24:28] packaged as the prompt contributor
[24:30] interface. You don't have to do this,
[24:32] but it can be quite um handy. So in this
[24:35] case, this structures um the information
[24:38] about the persona that you want in um
[24:41] the writer.
[24:43] Um and then we call one of the um
[24:49] methods to either generate text or
[24:51] create an object that you have on prompt
[24:54] runner. So in general, you want to
[24:58] create objects. Just because your LLM
[25:01] speaks natural language doesn't mean
[25:02] that you should always talk to it in
[25:04] natural language. It doesn't mean you
[25:06] should ask it to return purely natural
[25:07] language. So generally you want to
[25:11] return as much structure as you possibly
[25:15] can. What we're saying here is given
[25:18] this prompt
[25:21] return create an object of story class.
[25:26] As you can see here, the prompt is
[25:27] created in
[25:30] code. We have support for externalizing
[25:33] prompts into Ginger templates, and that
[25:35] works really quite well when you've got
[25:37] big fat complicated prompts. But my
[25:41] experience is that if you're breaking
[25:43] things up correctly into multiple steps,
[25:46] you're better to build your prompts in
[25:48] code. Prompt engineering. Once you break
[25:51] things down into small prompts with
[25:54] fewer tools, prompt engineering becomes
[25:56] less of a thing and prompts in code make
[26:00] a lot of sense. Prompts in annotations
[26:02] like lang chain forj I think make no
[26:04] sense at all. But prompts in actual code
[26:07] where you can get it all the objects in
[26:09] scope make a lot of sense. So this is
[26:13] generally the way you do it. And then of
[26:15] course you can do anything you like with
[26:17] the uh what you get back. Right. Let's
[26:19] now run it again and we'll ask it to
[26:22] show prompts. Tell me a story. Actually
[26:25] say story about ant. I'm curious what
[26:27] it's going to do. So I'm asking it to
[26:30] show prompts. So here we get a lot more
[26:34] um detail
[26:36] and let's look at the prompts and the
[26:39] planning information. So at the very
[26:42] beginning Yoda said he created a process
[26:45] create the process I have and is
[26:49] planning from this world state. So the
[26:52] world state is we don't have a story
[26:54] object we don't have a review but we do
[26:56] have a user input. So the planner is
[26:59] able to work out this plan towards the
[27:01] goal. So the goal is to have a reviewed
[27:03] story. What we can do is craft the story
[27:06] call review story and then we will meet
[27:08] that goal. One of the other advantages
[27:11] of this dynamic planning approach
[27:15] is
[27:16] it can reroute after every execution of
[27:20] an action.
[27:22] The planner reassesses world state and
[27:24] replans. In most cases, it's just going
[27:27] to find that the plan is working.
[27:28] Everything um is going very well. But
[27:32] imagine if you didn't achieve the
[27:35] expected effects from a particular
[27:36] action. There might be another way to
[27:39] get to the goal. An example of this is
[27:41] for is say you have insufficient input,
[27:44] but you could ask the user for another
[27:46] piece of information. It's not something
[27:48] you want to do by choice because you
[27:49] would love not to throw a form up, but
[27:52] you know the planner in one of our
[27:53] examples can um get to the point where
[27:56] it says, "Okay, well, I'll throw up a
[27:57] form because that way I can get what I
[28:00] need.
[28:02] So it then started executing these
[28:05] actions. So you can see it executed the
[28:08] first action. It's using GPT41 mini.
[28:11] It's using GPT41 mini because we said
[28:15] with auto LLM. So it's using the LLM
[28:18] that we've marked as the default on this
[28:21] instance. Of course we can change that.
[28:23] Um and here is the prompt. It's got a
[28:26] little bit more into it than what we
[28:28] wrote. Like obviously it's got these
[28:30] things here. here the craft a short
[28:31] story that we wrote but it's also got
[28:34] the persona information remember I
[28:37] brought in that prompt contributor and
[28:39] it's also got the current system date
[28:42] and or current date and the knowledge
[28:45] cutoff of the model that's actually
[28:47] really important the framework within
[28:49] Babel puts that in by default
[28:51] particularly if you're getting into tool
[28:53] calling if the model doesn't know its
[28:56] knowledge cutoff date and the current
[28:57] date it doesn't know how to search
[28:59] properly Okay. So, a few months ago, um
[29:03] before I put that functionality in, I
[29:05] was asking through, um an agent about
[29:08] the recent Australian general election.
[29:11] Even though the agent had access to web
[29:13] tools, it was happily telling me about
[29:15] the 2022 election because thought that
[29:18] was recent. I guess it kind of makes
[29:20] sense. It's like it it interpreted to be
[29:22] the most recent Australian election. it
[29:24] knew about. As soon as we added that
[29:27] functionality where it puts in the
[29:29] current date and the knowledge cutoff,
[29:32] it will use tools correctly. You might
[29:35] be thinking here, how do we know the
[29:36] current date? Well, that's pretty easy.
[29:38] But the tricky bit is how do we know the
[29:41] knowledge cutoff of the model? And with
[29:44] all the models that we support out of
[29:46] the box, we actually assign their
[29:49] knowledge, we include their knowledge
[29:50] cutoff and also their cost per token,
[29:53] which is also important. Um, but we're
[29:55] also building a larger LLM database
[29:58] because there are a bunch of things that
[30:00] you really really need to know to use
[30:02] models usefully. So, we're probably
[30:05] going to unveil our LLM database in the
[30:07] next month.
[30:09] I mentioned that we know about the
[30:11] knowledge cutoff. We also know about the
[30:15] models pricing. Well, we may or may not
[30:18] know for all the popular models we know.
[30:21] So when inbabel executes say a
[30:24] multi-step flow across many models, it
[30:27] tracks the token usage, input and output
[30:30] token usage because they're um typically
[30:33] um priced differently. Um, it actually
[30:35] uses Spring AI to do that, but we add
[30:38] this extra thing where we compute the
[30:41] price of all those input and output
[30:44] tokens totaled across all the models.
[30:46] This is actually another really cool
[30:48] thing about this is because on the agent
[30:51] process as it's running this usage and
[30:54] pricing data is exposed, you can
[30:56] actually write agents that are aware of
[30:59] their cost. So for example where you can
[31:02] expose a tool that returns the cost and
[31:06] can for example suggest that the um LLM
[31:09] should use fewer tokens or call fewer
[31:12] tools. So very powerful um capability.
[31:16] So it ran the first um prompt and
[31:21] there's also additional stuff that isn't
[31:23] shown in this log to do with the type
[31:25] marshalling. So under the covers, Spring
[31:27] AI went to
[31:31] looked at the um story class that was
[31:33] supposed to be returned and generated a
[31:35] JSON schema and gave it to the LLM and
[31:38] said you must return this thing.
[31:43] Then after that we executed the um
[31:46] second prompt different persona here um
[31:50] so different prompt contributor also
[31:52] different hyperparameters. So when we
[31:54] did the review story um you can see that
[32:00] we didn't bother setting the
[32:01] temperature. The reason you know the
[32:03] first output's a little bit flowery is
[32:07] because we set the temperature to 0.7
[32:10] which is very high. Okay. Now let's look
[32:14] at a slightly more um complex example.
[32:17] We're going to look at something that
[32:20] uses tools. So in the in real agents,
[32:25] tools are vitally important. Tools are
[32:27] what enables the LLM to reach back into
[32:30] its environment, right? MCP tools are
[32:32] very very important. But if you're
[32:35] working in the JVM,
[32:38] tools that are exposed from your Java
[32:41] code are incredibly important. So you
[32:43] can just, for example, put an at tool
[32:45] annotation on any method and you can
[32:48] expose it to LLMs. And in Babel makes
[32:50] that particularly easy. That is a killer
[32:54] capability when you want to expose
[32:57] existing business functionality. So this
[33:00] one is our imbable agents examples um
[33:04] repo and it's got a lot more things in
[33:07] it. So for example, it's got a fact
[33:09] checker. It's got a book writer which
[33:11] was um taken from a crew AI example and
[33:15] I think is much much nicer in Java
[33:17] within Babel. and it's got the star
[33:20] newsfinder which is what we're going to
[33:23] show now. So what this does is given a
[33:26] person and their star sign
[33:29] it looks up their horoscope. Looks up
[33:32] their horoscope using REST client. It's
[33:34] just an API call. It's not an LLM isn't
[33:37] doing that. Then it runs another LLM
[33:42] call using web tools to search the web
[33:45] for news that seems to be relevant to
[33:46] the horoscope today. And then finally it
[33:49] puts it all together into a write up. So
[33:52] let's try this.
[34:00] And we're going to show prompts here. So
[34:03] this has got more moving parts um than
[34:07] the previous one. There's going to be a
[34:09] longer set of actions. So you can see
[34:12] where's its plan? So here's the plan.
[34:15] So, the plan is extract star person,
[34:18] retrieve horoscope, find news stories,
[34:21] and write up. Ooh, the tools are This
[34:25] isn't really going to work because the
[34:26] tools don't seem Oh, saying tools are
[34:29] not enabled. Maybe there's something
[34:30] wrong with my Docker configuration.
[34:32] That's that's unfortunate though. Um, so
[34:35] it's possible that these aren't true
[34:37] results from the web. Um, but that's
[34:40] purely a misconfiguration rather than
[34:42] anything in in Babel. Okay. So, at the
[34:45] end of it, we get a pretty wacky story.
[34:49] Scorpio special, chaos is your friend
[34:51] today. Dear Linda, the stars are
[34:52] basically saying, throw your plans out
[34:54] the window and embrace the weird today.
[34:57] Let's see how this particular sausage
[34:59] was made. So, if we go to the star news,
[35:03] by the way, we've got an example of this
[35:05] in Cotlin as well. The framework itself
[35:08] is largely written in Cotlin. Um, but
[35:13] most of our users are on Java and we've
[35:15] put a lot of effort into making sure the
[35:17] API is beautiful from Java. Okay. So,
[35:20] pretty much the same kind of thing like
[35:22] we start off with um a class, we inject
[35:27] that class using spring. So, for
[35:29] example, where did our horoscope service
[35:31] come from? It's just a spring um service
[35:35] and it's implemented using restclient.
[35:38] The first step here was an add action
[35:41] that's extract star person. So this
[35:43] given user input um try it calls create
[35:47] object if possible. This is something
[35:49] that we add to what spring AAI can do.
[35:52] So whereas Spring AI can return you an
[35:55] object of an individual type, we have
[35:58] the ability to say if you can create it,
[36:01] but if you don't, say why you couldn't
[36:02] do it. Um, and return null. That
[36:05] actually tends to be quite powerful
[36:07] because this is one of the examples
[36:09] where if we can't do that, we could
[36:11] reroute. We could ask the user. For
[36:13] example, if we didn't get a star sign um
[36:16] or we didn't get a name, we could go and
[36:18] ask the user. So this idea of you know
[36:21] create object if possible um is I think
[36:25] quite um important. Everything that you
[36:28] do ultimately in running prompts within
[36:31] Babel will go through the context and AI
[36:34] interface. This has quite a lot of
[36:37] benefits. For a start it's a really
[36:38] really nice API that we've put a lot of
[36:40] effort into. Um, and secondly, it means
[36:44] that in Babel agents are really easy to
[36:47] unit test because it's very easy to mock
[36:49] just that one interface. Even with
[36:52] integration testing, you can easily use
[36:54] a mock um chat model and actually um see
[37:00] your flow run with the kind of, you
[37:02] know, successive results that you want
[37:05] to see. So, you know, there's a lot of
[37:07] effort on putting a really convenient
[37:09] nice to use API. So now let's assume
[37:11] it's got a star person. It's able to run
[37:15] this retrieve horoscope method. Again,
[37:18] any of these if we want to unit test
[37:19] them, it's like it's a POJO, right? It's
[37:21] very very easy to unit test them. We
[37:24] don't have to worry about whatever magic
[37:26] fields might be in any map. We can just
[37:28] instantiate the object and call the
[37:30] method. So here as you can see actions
[37:33] can either call LLMs or actions can
[37:39] simply call code. Actions that call code
[37:43] are absolutely awesome. Anything that
[37:46] you can do purely in terms of code
[37:49] rather than invoking an LLM, you should
[37:51] absolutely do in code. It's way faster.
[37:55] like, you know, essentially almost
[37:57] anything you can do in code compared to
[38:00] anything you can do with an LLM is
[38:01] instant. Um, it's way faster, it's way
[38:04] cheaper, it's more reliable, and it
[38:06] also, you know, if you care about the
[38:08] planet, it's going to use a lot less
[38:10] water and electricity. So, one of the
[38:13] major benefits of any agent framework is
[38:15] break your flows up. So, you have
[38:18] individual LLM calls and you have
[38:21] structure all along the way. And this
[38:24] makes it much easier to mix in code
[38:27] interactions.
[38:29] So here the next thing once we've got
[38:32] our star person, our horoscope um and
[38:35] our horoscope, now we can build a prompt
[38:37] to call web tools. So notice here we
[38:42] specified tool groups. So in Babel gives
[38:45] you um two different ways of getting at
[38:48] tools. One is the notion of a tool
[38:51] group. So we like to introduce a degree
[38:53] of interaction. You don't ask for
[38:55] example for duckgo or Google or brave
[38:57] search. You ask for web search the web
[39:02] search tool group. This means that in
[39:05] different environments you can easily um
[39:08] change the underpinnings. It also mean
[39:11] the services that you use. It also means
[39:14] for example that you could write
[39:16] something that is aware of user access
[39:18] levels. So for example, you know, maybe
[39:20] you get the super fast search um if
[39:23] you're on a high tier. So I think
[39:24] there's a lot of benefits in adding that
[39:26] level of indirection. So now because
[39:29] we've added the tool groups at action
[39:32] level, they will be added to the LLM.
[39:34] You also um can um add tools like this
[39:40] if you want. So for example
[39:44] with tools. So you can specify tool
[39:46] groups or you can do with tool object
[39:49] and when you specify a tool object it
[39:53] will expose all the at tool methods that
[39:57] are on that instance. That is super
[40:00] powerful. One of the best places to use
[40:03] that is where you're working with
[40:06] entities. So there's a couple of our
[40:08] examples that do this. So the first step
[40:11] of the action it's not using an LLM.
[40:13] First step of the action is for example
[40:15] looking up a customer because the
[40:17] request included a customer ID. Then it
[40:21] exposes that customer to the prompt. So
[40:26] any tools that are on the customer can
[40:29] be invoked. Really powerful pattern
[40:31] because amongst other things it means
[40:34] that you can keep data away from your
[40:36] LLM that shouldn't go to your LLM.
[40:39] Right? like the tools on the customer
[40:42] will act will act on customer state but
[40:44] you probably actually don't want to send
[40:46] over the wire to open AI or anthropic
[40:49] and particularly in Europe um obviously
[40:52] that's a major issue
[40:54] if you use this pattern that sensitive
[40:58] data stays in the entity backing the
[41:00] tool and the LLM never knows about it so
[41:04] tools are very very important
[41:07] um so and at the And we we call we put
[41:11] all of these things together.
[41:14] So I'd like to move on now to a fancier
[41:18] example, which is our travel planner.
[41:22] When we restart this, we're going to see
[41:24] whether or not I get any warnings. If I
[41:27] get warnings, my Docker configuration
[41:29] may be messed up. I think this one's
[41:30] going to work. So this is actually
[41:32] connecting to the Docker local MCP
[41:35] gateway. Um, this is quite powerful and
[41:37] an easy way to get started with MCP.
[41:40] Like obviously one thing you can do with
[41:41] MCP is run a bunch of tools as NPX or
[41:45] UVX or whatever they're exposed as.
[41:47] Really, really messy. The Docker MCP
[41:50] gateway is quite nice because it puts it
[41:52] in a consistent place and can handle
[41:54] secrets for you. So, this is our
[41:57] fanciest example. Um, and this is a
[42:01] travel planner.
[42:03] put got a simple HTMX web interface on
[42:07] it and it's a fairly complicated flow.
[42:09] So I'm going to kick it off and then
[42:11] start talking through the code while it
[42:13] runs. This is going to take this going
[42:14] to take a few minutes to run. So this is
[42:16] completely live by the way. The like I'm
[42:18] not going to change this because I know
[42:20] to talk about the defaults. Um but it
[42:23] totally works and you can get it running
[42:26] yourself um fairly easily. Just do take
[42:29] care because an average run will cost
[42:30] you 10 to 20 cents. But on the other
[42:33] hand, it's a really really good travel
[42:35] planner. So let's assume that um Claude
[42:39] and Ingred want to go from Barcelona to
[42:43] Bordeaux in the next couple of weeks. We
[42:45] know that Ingred loves history and
[42:47] museums and Jonah Arc and Claude loves
[42:50] food and wine, which is probably why he
[42:51] wants to go to Bordeaux. Well, it says
[42:52] he has a particular interest in
[42:53] Cabernet, so that's certainly why he
[42:55] wants to go to Bordeaux. Okay, so I've
[42:57] kicked it off. You can see that there's
[43:01] um
[43:02] some events coming out here. These
[43:05] events are from the same event stream
[43:09] that we used for logging. So let's have
[43:13] a look at the implementation of the
[43:15] code. This one is actually in Cotlin. So
[43:18] the very first thing you should do when
[43:21] you need to write an agent is
[43:24] create a domain model. either find an
[43:27] existing domain model or create a domain
[43:29] model. Create think about your domain
[43:31] objects before you think about your
[43:33] agents. Trust me, your agents are easy
[43:36] to write once you have the domain
[43:39] objects. So in this case, we start with
[43:43] a journey travel brief where we want to
[43:46] go from, where we want to go to, how we
[43:48] want to travel, and the dates. Notice we
[43:50] got a little bit of structure in this
[43:52] already because the dates are date
[43:53] objects um not just strings.
[43:57] We have travelers travelers not very
[43:59] interesting name and a little bit about
[44:00] them. It corresponds to what we have on
[44:02] that form. So what our flow does is
[44:06] ultimately comes up with a um proposed
[44:11] travel plan. So you can see here that
[44:13] I've added a bunch of JSON property
[44:16] descriptions. these will be sent to the
[44:18] model in the JSON schema. Um, so it's a
[44:22] way to hint a little bit more about what
[44:24] those fields mean. To be honest, LLMs
[44:28] are pretty smart. So most of the time if
[44:31] you use sensible um field naming, it
[44:34] will just work. But in this case, we've
[44:36] just gone the extra mile. So the step
[44:40] the flow in the agent is let me go back
[44:44] to the tripper
[44:47] agent tripper agent. So this repo it's
[44:50] tripper t r i pp er um just it in babel.
[44:55] So the agent is configured its
[44:58] configuration is using spring at
[45:01] configuration properties and actually we
[45:03] have this in a yl um file is a bit more
[45:06] structure in it. So you know anything
[45:08] that you are used to doing with spring
[45:10] you can just do.
[45:13] So the first action that will run is
[45:17] find points of interest. So in this case
[45:21] we use the thinker llm. Um this is
[45:25] specified in application.yml.
[45:29] So if we look at thinker llm and it's
[45:32] using gpt41.
[45:34] So it's using a pretty good model
[45:36] because we want to look at the um the
[45:40] journey that people are making and
[45:42] deciding decide what is interesting in
[45:46] that context. Okay. So let's go back to
[45:52] here. So using that LLM we add the
[45:56] prompt elements of um the travel
[45:59] planners persona and the travelers and
[46:01] we give it a number of tools here. We
[46:04] give it um web tools, we give it map
[46:09] tools and we give it map math tools. So
[46:12] it's going to be able to use in this
[46:14] case Google maps to um work out what are
[46:18] interesting places. it returns this
[46:21] itinerary ideas type. So very often you
[46:26] will use your existing domain objects
[46:28] but you also create these little you
[46:30] know interim objects that are useful for
[46:33] LLM return structures really important
[46:37] thankfully even in Java now we have
[46:40] records which are pretty much equivalent
[46:42] to cotlin data classes so it's a very
[46:44] concise thing to do I think this may
[46:46] have finished let's have a look um yes
[46:49] it has finished epic autumn road from
[46:53] gothic Barcelona owner to Bordeaux wine
[46:55] legend. So we have here an interactive
[46:59] map which I'm very confident will work.
[47:03] The reason I'm very confident in that
[47:05] link is that it wasn't built by an LLM.
[47:09] When I initially wrote the first version
[47:12] of this, I let the LLM generate the
[47:15] Google Map URL.
[47:18] It looked pretty good, but the thing's
[47:20] about 300 characters long. You just need
[47:22] one funny character in there that it
[47:24] hasn't escaped and you're totally messed
[47:26] up. So, let me show you how I solved
[47:28] that because it's a very good
[47:31] illustration of why we take this overall
[47:34] approach of breaking things down. So
[47:37] here we have the journey map URL
[47:42] property and it's actually computed
[47:44] because when we asked the LLM to create
[47:47] the travel plan, we didn't just say give
[47:50] us text. We said give us a list of where
[47:53] we'll be on particular dates. Because
[47:56] we've got that structure, we can write
[47:58] code that works against it. So this is
[48:03] what we asked the LLM to return to us.
[48:07] So this was in originally inspired by a
[48:09] crew AI example that naturally just
[48:11] asked for a string. You can't do any
[48:14] interesting post-processing on a string.
[48:16] So for example, imagine here if well
[48:19] you've already seen that we can build
[48:21] the map URL this way. We can also
[48:23] compute how long we stay in each place
[48:25] because if we see that days we have two
[48:28] days in the same location will be
[48:30] probably staying in the same
[48:32] accommodation. So it's very useful for
[48:34] example when we go and talk to the
[48:36] Airbnb API. Similarly we've got a list
[48:39] of countries visited which isn't just
[48:41] text. So for example let's suppose we
[48:44] have visa concerns. So let's suppose we
[48:47] want to know for example for me as a
[48:49] British and Australian dual citizen do I
[48:51] need visas um for some of the places I'm
[48:55] going. So the more structure you put the
[48:59] better guard rails you can have the more
[49:00] validation you can do and the more of
[49:03] your behaviors you can move to code. Um
[49:07] so finally after we um did that so let's
[49:11] briefly go through these steps in the
[49:14] agent and right so we found points of
[49:18] interest then in the second one we
[49:20] researched points of interest so we you
[49:23] we create a prompt runner and we use
[49:26] parallel map on the operation context to
[49:29] run research with many LLM calls in
[49:32] parallel we're always careful to bound
[49:35] the number of calls we take in parallel
[49:37] because if we don't do that we'll get
[49:38] rate limited or worse. But as we work
[49:41] through this we were able to get to the
[49:44] structure um and we were able to go down
[49:49] to actually
[49:52] use the Airbnb API to find availability
[49:56] for the correct dates. We're able to put
[49:58] in useful links and also we were able to
[50:01] log the usage. It cost 19 used two
[50:04] different LLMs. It used GPT41 for the
[50:07] tricky things and it used GPT41 mini, a
[50:11] cheaper model for doing the research
[50:13] because the research was pretty easy.
[50:15] Okay, I think I'm out of time, but
[50:17] hopefully that wetted your appetite. I
[50:20] do believe this is not just the best way
[50:23] of building agents on Java. I think it
[50:25] is the best model period. And you know,
[50:27] we're not aiming to play catch-up with
[50:29] Python. We're aiming to prove that Java
[50:32] and the JVM is the best place to build
[50:34] agents. Thank you.
[50:43] [Music]
[50:49] [Music]
