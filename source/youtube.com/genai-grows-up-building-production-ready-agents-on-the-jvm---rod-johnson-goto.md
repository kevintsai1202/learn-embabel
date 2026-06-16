# GenAI Grows Up: Building Production-Ready Agents on the JVM • Rod Johnson • GOTO 2025

**影片網址**: [https://www.youtube.com/watch?v=yMDw0nlWd7s](https://www.youtube.com/watch?v=yMDw0nlWd7s)
**影片 ID**: `yMDw0nlWd7s`

## 影片簡介
This presentation was recorded at GOTO Copenhagen 2025. #GOTOcon #GOTOcphhttps://gotocph.comRod Johnson - Building the Future of Agent Frameworks at EmbabelR...

---

## 影片逐字稿 (Transcript)
[00:11] [applause]
[00:13] Thank you, Sam. And it's good to be here
[00:18] again. So, as Sam said, what I want to
[00:20] talk about is building agents for
[00:25] business. So, not just kind of building
[00:28] the kind of cool toys that people love
[00:30] blogging about in the Gen AI space, but
[00:33] building agents that help us and our
[00:37] employers automate real business
[00:40] processes.
[00:42] So, about me, I'm the creator of the
[00:44] Spring Framework and uh founded uh
[00:47] co-founded Spring Source. Um, I am the
[00:50] creator and founder of Imbabel, which is
[00:53] my new company based on my new
[00:55] open-source project, which I will talk
[00:57] about at the end of this presentation.
[01:00] I'm
[01:01] a number of things, but actually I think
[01:03] the one that I'm perhaps most passionate
[01:06] about because it's the one that I always
[01:07] come back to is software developer. And
[01:11] I still love writing code. Even though
[01:14] today in the world of clawed code and
[01:16] other tools, I no longer write 100% of
[01:19] the code that I commit. I still really
[01:22] enjoy creating things and shaping things
[01:25] in code using whatever tool is
[01:28] available. For the last couple of years,
[01:30] I've been borderline obsessed with Gen
[01:32] AI. I guess since that moment when I
[01:35] think it was finally chat GPT3 suddenly
[01:39] stopped endlessly repeating itself and
[01:41] spinning off down a rat hole and became
[01:43] good. I was really fascinated with what
[01:47] you could do with the technology and
[01:50] know since then we've learned a lot. So
[01:54] I would imagine that everyone in this
[01:56] room is using Gen AI on a daily basis
[01:59] for
[02:01] to help in their work as well as
[02:02] personal activities. If you're not, you
[02:05] really should be. So you know, chat GPT
[02:08] was really the killer application of um
[02:12] this class of product and know the
[02:14] benefits are very very real and for many
[02:19] jobs it really changes how we work every
[02:21] day. Since chat GPT first got really
[02:24] good, we've learned more things. So for
[02:26] example, we've seen the emergence of
[02:28] tool calling which was originally
[02:29] pioneered by OpenAI but then taken by
[02:33] anthropic
[02:35] in terms of the MCP standard which has
[02:38] been this incredible enablement of
[02:41] standardized ways that LLMs can talk to
[02:46] the real world in real time. So that
[02:49] made the you know personal assistant and
[02:51] other use cases even more powerful. Also
[02:55] in those couple of years we've seen the
[02:57] emergence of open models and open models
[03:01] are getting really really good now like
[03:03] the progress over the last 6 months has
[03:05] been quite extraordinary particularly
[03:07] when you look at advanced capabilities
[03:09] like tool calling. This in again in an
[03:12] enterprise context is really really
[03:14] important because it's important to
[03:17] realize that large organizations can
[03:20] actually completely control models. I
[03:22] don't mean train models. I don't even
[03:23] necessarily mean fine-tune models. I
[03:26] mean run models on their own hardware so
[03:29] they are completely in control of them
[03:31] for both privacy and updateuling.
[03:36] The personal assistant use case is
[03:38] obviously the killer um app for Genai
[03:42] and it's proved to be surprisingly
[03:43] broad. For example, I would count Claude
[03:46] code and all the other code coding
[03:48] agents as an extension of that use case.
[03:53] So very much human in the loop. So if
[03:57] you get a result you don't like,
[04:00] you can just ignore it and tell it to do
[04:03] something else. um it if you trust it
[04:06] completely I guess you're basically in
[04:08] the world of vibe coding and I think
[04:11] that's potentially quite scary but so
[04:14] you know this is something that is
[04:15] massively proven performance
[04:18] augmentation when you have people
[04:21] involved in the process so it's
[04:23] essentially assistance which is
[04:26] augmenting people
[04:29] the way it works um at least in the case
[04:32] of claude code is extremely interesting
[04:34] Interesting. How many people are
[04:35] familiar with how claude code works?
[04:40] Interesting. Okay. Claude code works
[04:43] through a combination of tool calling
[04:45] and maintaining and updating a dynamic
[04:48] to-do list. So tool calling is well an
[04:51] where an LLM can be instructed to call a
[04:56] tool or a function if it can't do
[04:59] something. I mean the classic example of
[05:00] this was weather. You ask an LLM um what
[05:04] is the weather in Sydney? Well, the LLM
[05:08] doesn't know because firstly it's um
[05:11] training data is probably 10 months old
[05:13] and even if it's training data was
[05:15] yesterday, yesterday is not today. So
[05:17] how does the LLM know? You tell the LLM
[05:23] that you are providing it with tools
[05:25] that it can call to find certain
[05:27] information. So you would for example in
[05:29] your prompt or the way you interact with
[05:31] your model you would tell your LLM if
[05:33] you somebody asks about the weather you
[05:35] need to pass the location and I will
[05:38] tell you what the weather is. So clawed
[05:41] code uses tool calling for things like
[05:45] reading source files. So it knows what's
[05:47] in your codebase, editing source files.
[05:50] Um but it innovated in that it actually
[05:54] creates a plan in the form of a to-do
[05:57] list. So it creates an entirely dynamic
[06:00] to-do list and then checks off some of
[06:03] those activities as it works through the
[06:05] plan. It's very powerful, but it's not
[06:08] enormously predictable. So, you know,
[06:12] sometimes it isn't the right plan,
[06:14] sometimes it just doesn't work. But for
[06:16] this particular case, we don't
[06:19] particularly mind. So, I think this gap
[06:23] between what works for personal
[06:25] assistance and what works for automating
[06:28] business processes is absolutely key.
[06:30] And that would be one of the key
[06:32] takeaways
[06:34] uh I hope you will take from today. So
[06:37] while personal assistance has been a
[06:39] massive success, most enterprise genai
[06:42] projects are failing. So you can um
[06:47] debate which studies are good studies
[06:50] whether you know the 95% failure rate
[06:52] MIT reported seems a little high to me.
[06:56] But the fact is it doesn't really matter
[06:58] whether you cherrypick studies, you come
[07:01] to some very very depressing conclusions
[07:04] that a lot of money is being spent. It
[07:07] typically is going into things like
[07:09] proof of concepts and prototypes in
[07:11] enterprises
[07:13] and it's not getting into production.
[07:17] So why is this?
[07:22] There are some inherently difficult
[07:24] things about this technology. So this
[07:26] technology is inherently
[07:28] non-deterministic and that's new. Like
[07:31] we know we've had to deal with things
[07:33] that were non-deterministic in the past.
[07:36] We know there are certain things like,
[07:38] you know, potential race conditions and
[07:40] distributed systems where you can't just
[07:43] assume that things execute in the order
[07:45] you thought they did. But generally
[07:47] speaking, those things are corner cases.
[07:50] And they're corner cases that account
[07:51] for a great deal of effort. In the case
[07:54] of LLMs, LLMs are inherently and
[07:58] essentially non-deterministic.
[08:00] So everything we build around them has
[08:04] to accept that as a fact. So you know
[08:05] that that certainly is a hard problem.
[08:08] There's no two ways around that. Also,
[08:11] there's the danger of hallucinations.
[08:14] Hallucinations are when LLMs make things
[08:17] up. And obviously that is extremely
[08:20] dangerous because it can be misleading.
[08:23] And if you're in a business process, um,
[08:25] that can be very costly. So, I don't
[08:28] know, um, how widely it was reported in
[08:31] Europe, but Air Canada had a
[08:33] hallucination from a chatbot a year or
[08:35] two ago, and the chatbot gave a
[08:39] passenger a wonderful fair, and the
[08:42] passenger was very happy. So the
[08:44] passenger bought the fair and then there
[08:48] was a court case which Air Canada
[08:50] rightly lost um where they couldn't
[08:52] really go back on the fact they'd sold
[08:54] that passenger the fair. So all in all a
[08:57] single chatbot hallucination was
[08:59] extremely expensive for an airline.
[09:03] There's also the fact that whereas when
[09:06] we write code in any programming
[09:08] language, programming languages are
[09:10] designed to avoid ambiguity
[09:14] when we're prompting to some extent at
[09:17] least we're prompting in natural
[09:18] language. Natural language is far weaker
[09:23] at avoiding ambiguity than programming
[09:26] languages. So the whole prompt
[09:28] engineering thing, which we'll get to,
[09:30] is a scary thing. Also the um costs
[09:34] involved in running and scaling Genai
[09:38] applications are extremely high. I mean
[09:39] this technology is very slow and it uses
[09:42] a lot of processing power. It's also
[09:44] difficult to test. So you know we've got
[09:47] a bunch of hard problems but
[09:49] nevertheless this failure rate can be
[09:52] overcome if we chip it way at them in
[09:54] the right order. So let's consider the
[09:58] problem part of the non-determinism
[10:00] problem which is fragility of prompts.
[10:04] You've probably heard the term prompt
[10:06] engineering.
[10:08] It's a pretty funny term because prompt
[10:11] engineering is not really engineering in
[10:13] any meaningful sense. Like if you regard
[10:16] engineering as you know a quasi
[10:19] scientific precise discipline, prompt
[10:21] engineering sure as hell is not
[10:23] engineering. It's more like a black art.
[10:25] Prompt engineering is more like alchemy.
[10:29] It is. It's literally like you throw
[10:32] throw something in there and oh did that
[10:34] work? Whoa. I'll put a little bit of
[10:36] wolf bane in. Now what about you know
[10:39] eye of new? It's very much like that and
[10:42] that is bad.
[10:44] subtle changes can change outcomes
[10:47] significantly and also prompt
[10:50] engineering can be very sensitive to
[10:53] different models.
[10:56] This is one example
[10:59] of one of the reasons that what works
[11:02] for the personal assistance use case
[11:03] doesn't tend to work for business
[11:05] processes. So a lot of personal
[11:08] assistant things like for example Claude
[11:10] code or you know chat GPT or chatting to
[11:14] Claude work by having a very very
[11:18] powerful model that's given a complex
[11:21] system prompt. It's about three pages
[11:23] long typically that tells it what to do
[11:25] and a whole bunch of tools for things
[11:27] like search the web um do mathematical
[11:32] calculations. these kind of things are
[11:34] exposed via tools.
[11:37] That works reasonably well, but it does
[11:40] not and never will get you to a really
[11:43] high degree of predictability. So if you
[11:47] need the level of predictability that um
[11:52] you need for enterprise workloads,
[11:56] you can't afford that degree of
[11:59] sensitivity to prompt engineering. So
[12:01] for example, you know, sometimes you
[12:03] will chat with chat GPT or Claude and it
[12:05] will misunderstand what you're saying.
[12:07] That's fine if it's just helping you do
[12:09] something and you see that it
[12:10] misunderstood you and you clarify, but
[12:13] it's not fine if you're automating a
[12:15] process. So you know, one of the obvious
[12:18] ways to mitigate the difficulties of
[12:20] prompt engineering is restructure
[12:24] your flows into multiple steps with
[12:26] explicit orchestration. So now your
[12:30] prompts individually are much simpler.
[12:33] So as you can see the role of
[12:35] orchestration in
[12:38] where we need predictability is much
[12:40] bigger than the role of necessity for
[12:44] orchestration in the personal assistant
[12:46] use case.
[12:48] Some of the other reasons for Gen AI
[12:50] failures in enterprise or integration.
[12:53] Typically the AI work is disconnected
[12:56] from the core business systems. It's not
[12:58] aligned with existing workflows or
[12:59] workflow engines and it's coming out of
[13:02] different teams like you know Python has
[13:05] traditionally led the way in AI and
[13:07] machine learning. So a lot of
[13:09] organizations are trying to do their
[13:11] genai work in Python where their core
[13:14] business logic's probably in Java.net
[13:17] net or possibly node or some mix thereof
[13:20] and that obviously is really difficult
[13:22] because the domain model is in Java orn
[13:25] net it's not in python
[13:29] also every time there's an exciting new
[13:31] technology we have the snake oil
[13:34] salespeople
[13:36] and you know I think we're very much
[13:38] seeing that there's a top-down sale
[13:40] around this and often corporate
[13:42] strategies are dictated by you know
[13:46] large vendors was that promise more than
[13:50] is realistic and again are not
[13:53] necessarily thinking about the domain or
[13:55] specific problems of that organization.
[13:59] This again this tends to happen at the
[14:01] beginning of big waves of technology.
[14:04] You get a lot of guidance from the golf
[14:07] course. You get a lot of topdown
[14:09] mandates for doing things that don't
[14:12] necessarily connect to the real world.
[14:14] If we go back in fact not
[14:18] to the just to the um inception of
[14:20] spring in the very early 2000s if we go
[14:23] back a bit farther we saw this as well
[14:26] and it failed utterly where in the early
[14:28] very early years of enterprise Java it
[14:32] was assumed that you know Sun and Oracle
[14:34] and IBM and BEA would just tell you how
[14:37] to do enterprise Java and you just
[14:39] trusted them and wrote a really really
[14:41] big check and everything would be great
[14:44] And everything was not great. In fact,
[14:46] everything was so far from great that
[14:48] hardly any projects succeeded until a
[14:53] bottomup developerled push um change
[14:57] things with practical solutions that
[14:59] really worked. So, you know, I think one
[15:02] of the major reasons for failure is this
[15:05] kind of social top-down um push. And I
[15:08] think that as developers we can
[15:10] contribute to make things work in a
[15:12] programmatic way. Um bottoms up there
[15:16] are also other organizational issues.
[15:19] One pattern that I've seen quite a bit
[15:21] is organizations having a central AI
[15:24] team. This
[15:27] can be an accelerant but it can also be
[15:29] quite dangerous because for example that
[15:32] AI team may not understand or even be
[15:35] particularly interested in the core
[15:37] business. That AI team may not have the
[15:40] same skills as the people who actually
[15:42] wrote the code that runs the business.
[15:45] And I mean I've seen some quite
[15:47] extraordinary um examples of that. And
[15:51] you know, there's definitely a skills
[15:53] gap that needs to be bridged. Okay, so
[15:56] I've given you a very depressing
[15:58] readout. How do we fix this? Well, I
[16:02] think there is hope. Um, and honestly,
[16:05] it is what gets me up in the morning
[16:08] that I think solving this problem is of
[16:12] enormous value and also technically
[16:15] very satisfying. So the first thing we
[16:18] want to do if we're serious about
[16:19] solving this is we need to attack
[16:22] non-determinism because that is the
[16:25] biggest single problem. Now we can't
[16:27] make it go away altogether. So you know
[16:31] essentially we've got to adopt what you
[16:34] could call a harm minimization approach.
[16:37] Right? There are certain things that
[16:39] perhaps it would be great if went away
[16:41] completely like prostitution but we know
[16:44] that simply willing it to go away and
[16:48] saying okay it's gone that doesn't work.
[16:50] So what we need to do is adopt harm
[16:53] minimization.
[16:54] So we recognize that there are a bunch
[16:58] of things we can do that will hopefully
[17:00] be effective and two key three key ones
[17:05] of those are firstly orchestration break
[17:10] complex tasks into smaller steps with
[17:12] smaller prompts.
[17:14] So as I said you talk to chat GPT you
[17:18] got a three-page system prompt lots of
[17:19] tools fine for that use case. If you're
[17:23] trying to automate a particular business
[17:25] process,
[17:27] you will ideally break that up into
[17:30] multiple steps using code.
[17:34] And each step will have a much smaller
[17:36] prompt. It will have much fewer tools.
[17:40] Also, potentially this might give you
[17:42] the opportunity to run some of those
[17:44] steps on much smaller models, which will
[17:46] be cheaper, more environmentally sound.
[17:49] um and also um will give you control and
[17:54] data sovereignty.
[17:56] So breaking complex tasks into steps is
[18:00] a really big big thing. It removes I
[18:04] would say in my experience 80 to 90% of
[18:07] the pain of prompt engineering if you do
[18:09] it right. Um so you know still not
[18:13] wholly deterministic but a great deal
[18:14] better. Um secondly
[18:18] when you do that orchestration you need
[18:20] to do it in a deterministic way. So one
[18:23] of the deterministic ways you can do it
[18:26] is you can actually explicitly do it in
[18:27] code. So for example with langraph you
[18:30] create a finite state machine. With crew
[18:32] AI you specify the ordering of steps.
[18:35] Within Babel um our framework we do it
[18:38] in what I think is a more sophisticated
[18:40] manner. But nevertheless, all of those
[18:42] approaches
[18:44] do give you greater determinism because
[18:46] it wasn't an LLM that was choosing, you
[18:49] know, the orchestration steps. You're
[18:51] really relegating the LLM to one level
[18:54] down where it's helping you execute
[18:56] actions in that step. Third thing, and
[18:59] this is really important, is just
[19:02] because LLMs have this amazing ability
[19:04] to speak natural language doesn't mean
[19:06] we should talk to them in natural
[19:09] language. So structured communication
[19:13] with the LLM, both
[19:16] what you send to the LLM and what you
[19:18] get back tends to make things more
[19:21] predictable. So LLMs don't just
[19:23] understand English and other natural
[19:25] languages. LLMs love structured content
[19:29] like JSON, XML, U, markdown,
[19:33] um, all the well-known structured
[19:36] formats. they, you know, obviously are
[19:39] very very familiar with and the benefits
[19:42] of communicating
[19:44] predominantly
[19:46] from your applications and agents to
[19:48] LLMs using structured um types is that
[19:52] you can reason about them in code. If
[19:55] you talk to your LLM purely in natural
[19:58] language and get natural language back,
[20:00] the set of tools you can use to
[20:03] understand, for example, if you want to
[20:04] inject guard rails, it's pretty small,
[20:07] right? Like you're going to have to use
[20:09] vector embeddings, you or alternatively,
[20:12] you're going to have to trust an LLM to
[20:14] say what is this thing bad? What's in
[20:17] it? So the maximum extent to which you
[20:19] can impose structure
[20:22] the more you can do in code as opposed
[20:26] to in the LLM. So you know one of the
[20:28] things it may sound a bit boring but one
[20:31] of the things that you really want to do
[20:33] in enterprise applications using Genai
[20:37] is do as much as possible in code. It's
[20:40] more predictable. It's easier to test
[20:42] and it is enormously faster and
[20:45] enormously cheaper. So you know you
[20:48] should always be looking as you look at
[20:49] orchestration to think okay LLMs are
[20:52] great they make this whole flow possible
[20:54] but what can I do in a more predictable
[20:58] manner so you know those three
[21:00] approaches to attacking non-determinism
[21:02] okay are key you also need to have guard
[21:06] rails and I've alluded to how you can do
[21:08] that and also you need to have reliable
[21:11] testing so you know attacking
[21:13] non-determinism definitely deals with a
[21:16] big class of failures. But also, I think
[21:19] there's a pragmatic question
[21:22] of how do we make our
[21:26] Gen AI talk to what we already have.
[21:29] Nothing is ever really green field in
[21:32] the real world. So, you know, you read
[21:34] all these blogs where people are talking
[21:37] as though, you know, Gen AI exists in a
[21:40] complete vacuum. Like for example, the
[21:41] number of blogs where you see um an
[21:45] agent that's actually integrated with
[21:47] some real backend system like an Oracle
[21:50] database or whatever is pretty small. Um
[21:53] so you need to think about integration
[21:55] so you can get from where you are to
[21:57] where you want to be. So firstly when
[22:00] you connect to existing systems you want
[22:02] to minimize the friction in doing that.
[22:04] You want to mix minimize the friction in
[22:06] two ways. You want to minimize the
[22:09] friction in a technology perspective and
[22:13] also from a people perspective. So for
[22:16] example, if you can use your existing
[22:18] domain model, if you can use your
[22:20] existing skills,
[22:22] um you can use your existing enterprise
[22:24] infrastructure that would be really
[22:27] really good.
[22:30] Little bit more detail on bringing
[22:32] structure to LLM interactions. I think I
[22:34] largely talked um to this slide but you
[22:38] know it goes it gives firstly the
[22:41] benefit of um type safety, toolability,
[22:45] testability
[22:48] but also all the benefits that we know
[22:51] about working with objects. So for
[22:56] example, we have invested a lot in
[22:58] domain models, some of which are even
[23:00] very good and to be able to leverage
[23:04] that as we move to the new world is
[23:07] really really important.
[23:11] So here for example, I don't know you
[23:12] probably can't read this about up the
[23:14] back, but it's honestly not a terribly
[23:15] interesting piece of code anyway. Uh
[23:17] it's a lang chain example and it shows
[23:20] like virtually any Python example you
[23:23] will see using LLMs. It will show you
[23:25] the use of magic strings. Um so you know
[23:29] we've got two magic strings context and
[23:31] input and hopefully you typed it right.
[23:34] Um that is the kind of thing that
[23:37] frankly is not really fit for prime
[23:41] time. So this brings me to a idea that I
[23:45] blogged about a few weeks ago which I
[23:47] think is really really important. Um
[23:50] domain integrated context engineering.
[23:53] So a few months ago
[23:56] people started to talk not just about
[23:58] prompt engineering they started to talk
[24:00] about context engineering. This is an
[24:03] enormous improvement because I think it
[24:05] captures in a very meaningful way part
[24:10] of the core problem in working with Gen
[24:12] AI which is the context is what you pass
[24:16] to the model thinking about that it's
[24:19] not just not just well ultimately will
[24:21] surface in a prompt but when you think
[24:23] about it you should think in terms of
[24:25] where does it come from where does this
[24:28] input that you're going to send to the
[24:29] LLM where does it come from So while the
[24:32] context engineering term I think was an
[24:35] advance, I believe it's still missing a
[24:39] key element. So when you see current
[24:42] taxonomies of memory um and context,
[24:46] they talk about things like short-term
[24:48] memory, long-term memory, episodic
[24:50] memory, they don't talk
[24:54] about the memory that exists in business
[24:57] applications. Let's suppose for example
[24:59] we talk to in the old world we talk to a
[25:03] customer service representative about
[25:05] our bank account.
[25:08] We do not rely on that person's memory.
[25:11] In fact the entirety of the process that
[25:13] their employer has constructed is so
[25:15] that that person's memory has almost no
[25:19] relation to this. So that person is
[25:22] sitting at a keyboard. They are
[25:24] interacting with various systems of
[25:26] record.
[25:27] um and what amounts to memory
[25:32] and context is highly structured. So you
[25:36] know I think that the industry and this
[25:38] is partly because chat bots in the early
[25:41] stages of Gen AI were way
[25:43] overemphasized.
[25:44] I think the industry has overemphasized
[25:48] this idea of seeking um you know human
[25:52] analogies for memory and the like versus
[25:55] thinking that a lot of state is already
[25:57] kept in enterprises in a very sound way
[26:00] and we should just piggyback on that.
[26:03] So domain integrated context engineering
[26:06] is based on the idea that
[26:09] a very important quite likely the most
[26:12] important part of the context that you
[26:14] will send to your LLM
[26:18] is your domain model and those parts of
[26:21] the domain model you want to expose. And
[26:24] this will work both ways. So you will
[26:27] create prompts that
[26:30] contain
[26:32] data that came from your domain model
[26:34] and the you will ask the LLM to return
[26:38] objects that are either part of or
[26:40] compatible with your domain model. So it
[26:43] works both ways.
[26:47] Okay. So I promised to talk about the
[26:50] JVM. what is the role of Java developers
[26:54] in this evolving world? So here I should
[26:57] say that although I am not personally
[26:59] anet
[27:00] person um pretty much everything I'm
[27:04] going to say about Java applies to .NET.
[27:06] So you know if your organization is
[27:09] heavily built on net is the place where
[27:13] you should do your Gen AI. So, you know,
[27:16] there's a lot of points that I'm making
[27:17] here that are pretty general about how
[27:19] Gen AI should grow out of the core of
[27:22] the enterprise rather than be grafted
[27:24] on.
[27:26] So, the first option in for how Java
[27:31] could approach this has been pretty much
[27:33] the dominant one until very recently,
[27:35] which is imitate Python approaches. So
[27:38] for example, you could create a project
[27:40] called something or other for J um and
[27:45] not really think too hard about the
[27:48] strengths and weaknesses of the Python
[27:50] approaches. For example, it truly
[27:52] surprises me that most Java frameworks
[27:54] are using the same kind of magic
[27:57] strengths because that's not really
[27:58] something we tend to do in Java. So you
[28:01] know the first thing if you just imitate
[28:05] you are not going to improve. you're not
[28:07] really going to help build a strong
[28:09] bridge into your um Java ecosystem and
[28:13] you're also going to be doomed to
[28:15] accepting secondass status that you're
[28:17] downstream of innovation. The second
[28:20] option is what gets me up in the morning
[28:24] which is build something better. And
[28:27] when it comes to business use of Genai,
[28:30] I believe it is
[28:33] Java developers that have a lot of the
[28:35] skills that are necessary to do that. We
[28:38] understand business applications and
[28:40] that understanding is completely
[28:42] critical. So what does it mean to build
[28:45] better? Well, it means to bring the
[28:47] strengths that we have in Java on the
[28:49] JVM to Genai. It means to fully leverage
[28:53] our existing domain model and um
[28:56] knowledge and also to apply what we know
[29:01] about software architecture.
[29:04] I think if we do those things we can
[29:06] actually lead rather than follow. the
[29:10] stakes are very high like you know as
[29:14] the um study evidence that I cited
[29:17] clearly shows business is not fully
[29:19] benefiting from geni at the moment
[29:22] that's an enormous missed opportunity
[29:24] there could be a lot of benefits um for
[29:27] companies and society in doing this so
[29:30] you know I think that when we go back to
[29:32] option one and I just pressed the wrong
[29:35] way on my clicker when we go back to
[29:36] option one this is not really something
[29:39] that we as a JVM community or
[29:43] industry as a whole can afford.
[29:46] What does the JVM bring to Genai? Well,
[29:49] mature and stable, strong typing and
[29:52] compile time safety, really good
[29:55] libraries and tools. And this is
[29:57] something that I have actually in the
[29:59] last few years I have written a lot of
[30:01] Python. I'm totally fluent in Python. Um
[30:05] I keep running into things that kind of
[30:08] astonish me. It's like particularly when
[30:10] you look at things in say the
[30:12] configuration space you know it I'll be
[30:15] looking at something and thinking
[30:16] seriously we solved this in spring in
[30:19] 2005 is this still how you're supposed
[30:21] to be meant to be doing it in Python so
[30:24] you know there's a lot of things for
[30:25] building large scale applications that
[30:27] Java and the frameworks on Java have
[30:30] done very well with so when we compare
[30:34] Python versus the JVM for enterprise AI
[30:37] I think it's critically important
[30:39] important to make a distinction between
[30:41] data science
[30:43] and also machine learning and genai
[30:46] they're all different so data science if
[30:49] you are doing data science I think you
[30:51] should do it in Python the language and
[30:55] framework for it for it is fantastic
[30:58] sure you could try to do it um in on
[31:03] node there's some support for things
[31:05] like um TensorFlow on node
[31:08] Um but you know if you look at say
[31:11] machine learning proper and data science
[31:14] the Python support is so good that that
[31:17] is where you should go. However, Gen AI
[31:20] is completely different. So with Gen AI
[31:24] we are not training models with
[31:26] TensorFlow.
[31:28] What we're doing is making simple HTTP
[31:31] calls to models that somebody else
[31:34] trained for it. They're not running in
[31:35] your Python process. Um, so then you get
[31:40] the question of what is the true
[31:41] adjacency? What's the really hard thing?
[31:44] The re the true adjacency
[31:46] is the rest of the business logic and
[31:50] software that you need to interact with,
[31:52] not the model. So does that make sense?
[31:54] If you're doing data science, Python
[31:56] gives you a very compelling set of tools
[31:59] that frankly you know Java isn't close
[32:02] for. But it is absolutely reversed where
[32:06] business applications are concerned.
[32:08] Java gives you a set of things that
[32:11] Python is absolutely no match for. So if
[32:15] you already have zero enterprise apps in
[32:17] Python, that remains the right number
[32:20] and Genai
[32:23] should not change that at all. I truly
[32:26] think this is an opportunity for the
[32:27] Java community to lead once more. And I
[32:32] think we saw this before in the early to
[32:35] mid 2000s when essentially Spring and
[32:38] other open-source Java projects saved
[32:41] enterprise Java from itself. We saw the
[32:44] same kind of top-down
[32:46] um approach, the same very high failure
[32:49] rate
[32:51] and a developerdriven
[32:54] kind of bottoms up movement created
[32:57] things that truly worked.
[33:00] So now I would like to move on to
[33:03] imbabel which is my new open-source
[33:05] project which directly aims to address
[33:09] all of the problems that cause real
[33:12] world failures with genai. So well
[33:16] firstly obviously it's built on the JVM
[33:18] so we've talked about the benefits of
[33:20] integration
[33:22] but it really strives very hard to
[33:26] tackle the non-determinism problem. It
[33:29] emphasizes reliability, predictability,
[33:32] and testability. It integrates, as you
[33:34] would expect, very closely with Spring.
[33:36] Um, and it also has a modern API that
[33:39] puts a very high um emphasis on strong
[33:43] typing.
[33:45] One key innovation in imbable and here,
[33:48] as I said, we're not trying to play
[33:50] catch-up. I think this is the best model
[33:52] in any language. One key innovation is
[33:55] that we have a planning step which is
[33:58] deterministic.
[33:59] So there's a few ways you can do
[34:01] planning. Remember I said that if you're
[34:04] trying to make a business process
[34:06] predictable,
[34:07] you need to break down into multiple
[34:11] LLM calls, multiple actions. It might be
[34:13] LLM calls or they might be code, but
[34:16] multiple action steps and orchestrate it
[34:19] other than by an LLM. So you know ways
[34:22] that this has been done is leng graph is
[34:25] very popular in the Python world. Leng
[34:27] graph does this in about the most
[34:29] obvious way you can think of which is a
[34:30] finite state machine.
[34:33] Crew AI which is also um a popular
[34:36] framework from Python does this
[34:39] essentially by defining a sequence of
[34:41] steps and the sequence can compose. So
[34:43] one step can go down into its own
[34:46] sequence. So they make both of those
[34:50] increase the determinism of the
[34:52] application because they're putting into
[34:55] code this planning step. Embable also
[34:59] makes it deterministic but it does it in
[35:01] a more sophisticated manner. It thinks
[35:04] in terms of actions and goals and it
[35:08] uses a non
[35:10] LLM AI algorithm called gulp goal
[35:14] oriented action planning to work out how
[35:16] you can achieve a particular goal from
[35:18] your present world state. So I probably
[35:20] don't have time to get into this deeply
[35:22] here but I do have another session which
[35:25] will explain this in considerable
[35:26] detail. So broadly speaking in Babel an
[35:29] imbabel server knows about a number of
[35:33] actions and a number of goals.
[35:36] So if you want to achieve a particular
[35:38] goal, it can look at the present world
[35:41] state and see what actions it can chain
[35:44] together in the optimal order to achieve
[35:48] that goal. So it has the benefit that
[35:51] unlike a finite state machine, it's not
[35:53] brittle. So adding more actions, adding
[35:55] more goals is easy. and you don't have
[35:57] to modify what you already have. But on
[36:00] the other hand, it really will come up
[36:02] with the same plan um every time. It
[36:06] also has benefits in terms of um
[36:11] handling failures because it assesses
[36:14] the world state after it executes every
[36:16] action. So potentially if the initial
[36:18] plan isn't panning out, it can change to
[36:20] a different plan. So you know direct
[36:22] attack on the problem of
[36:25] non-deterministic behavior um through a
[36:30] unique and novel approach to planning.
[36:35] When we look at the plan the you can
[36:40] specify your own preconditions and post
[36:43] conditions or the framework can infer.
[36:46] So an action has required preconditions
[36:50] and expected postcond conditions. Goals
[36:54] have required preconditions. So it's
[36:56] possible for our algorithm which is an
[36:58] AAR algorithm to work out a path for
[37:01] multiple actions to a goal. Normally the
[37:04] developer does not need to explicitly
[37:07] specify that because normally the pre
[37:10] and post conditions
[37:12] are expressed in terms of domain
[37:15] objects. So each action is typically
[37:18] modeled as an annotated method with an
[37:21] action annotation and it's inputs
[37:27] and out return type determine the pre
[37:30] and post conditions. So it's very much
[37:34] tied into the type system. So here, I
[37:36] don't know if you can see this at the
[37:38] back, um, but we have an exa, excuse me,
[37:42] an example of an action that calls an
[37:44] LLM. Um, in this case, it uses our
[37:47] Fluent API. Um, and it's ultimately
[37:51] calling the create method on a prompt
[37:53] runner. And you can see that it's
[37:57] entirely type safe. It's creating a
[37:59] prompt in a completely type safe way. So
[38:02] we're not relying on magic springs here.
[38:04] If we refactor, so presentation
[38:07] request.brief is um called something
[38:10] else that will be fully supported by our
[38:15] tools. This happens to be an example in
[38:18] Cotlin, but our API works beautifully
[38:21] from both um Cotlin and Java. Probably
[38:25] it's worth saying at this point most of
[38:26] the framework is written in Cotlin. I'm
[38:29] a pretty big fan of Cotlin. Most of our
[38:32] users are using Java and that's totally
[38:34] fine. So we also most of our examples
[38:38] are in Java. So you know all the imbable
[38:41] developers are writing Java every day.
[38:45] The achieves goal annotation is an
[38:48] additional annotation you can put on an
[38:50] action that says hey when you've done
[38:52] this you've achieved a particular goal.
[38:56] So again it's largely driven by um types
[39:03] strong typing has many benefits. So you
[39:06] know IDE support is definitely um very
[39:10] nice refactoring capabilities
[39:13] and you know as projects scale I think
[39:16] you know the benefits are very
[39:18] convincing. Here's an example in Java
[39:21] which you also probably can't read at
[39:22] the back. Um, it looks pretty much the
[39:26] same. Um, you will note by the way that
[39:29] we're using, as in all of our examples,
[39:31] we're using modern Java. We're using
[39:33] records. We typically use for the types,
[39:36] the domain types that um we use to
[39:40] interact with models. We typically use
[39:43] records um in Java. And again, you're
[39:46] getting the same thing. Fluent API the
[39:49] ability to create prompts um in strings
[39:53] in a type safe way. Notice um at the end
[39:57] of this it's calling create object and
[39:59] the object is a support output object.
[40:03] So when we go to the LLM
[40:07] probably 90 plus% of the interactions in
[40:11] our examples and um real agents when
[40:14] they go to the LLM they don't ask for a
[40:16] string back they ask for a type. So
[40:20] underneath we're you under the covers
[40:22] we're using spring AI. Spring AI will
[40:25] transparently emit a JSON schema and use
[40:29] Jackson to pass um the return type back
[40:34] into that type. So you know generally
[40:37] the interactions are very very strongly
[40:40] typed
[40:43] when we talk about actions. So for
[40:46] example the here we can see we've got an
[40:49] action u method here. This one's
[40:52] probably a little bit more readable.
[40:54] Actions often, but don't always invoke
[40:58] LLMs. And that's really important.
[41:01] Remember that I said if you want to make
[41:02] something deterministic, often you
[41:05] should say, can I express this in code
[41:08] versus call an LLM? So, in Babel's
[41:12] philosophy is there's really no
[41:13] difference between calling an LLM and
[41:15] running a piece of code. Could be an
[41:17] action. It's going to have strongly
[41:18] typed inputs and outputs. Um but there's
[41:22] no fundamental difference. Obviously the
[41:24] framework under the covers does things
[41:27] like a lot of retry around like I mean
[41:29] it does know that a LLM call is a
[41:32] special thing but in terms of the
[41:34] programming model um it's entirely
[41:37] consistent.
[41:42] So, and if you look at one of our
[41:45] examples, the travel planner example,
[41:48] which is linked to I think on our
[41:49] homepage, which is a pretty
[41:51] sophisticated travel planning agent,
[41:55] there's quite a lot there. Like, for
[41:57] example, building Google map URLs for
[42:00] multi-day trips
[42:02] that we ended up moving into code
[42:05] because LLMs were way too errorprone in
[42:08] doing that. So you know one of the core
[42:10] things inbabel aims to do is enable you
[42:13] to attack the non-determinism
[42:15] problem in the way way that is right for
[42:18] you. You know certain there are
[42:20] definitely applications where it's not
[42:22] as critical and you can rely more on the
[42:24] LLM but you know the more mission
[42:26] critical it is the more predictable you
[42:29] want it to be. Embable builds on spring
[42:32] no surprises there. So the at agent
[42:37] annotation is a spring meta annotation.
[42:40] So for example, every agent is a spring
[42:42] component. This means it automatically
[42:45] gets injected. It is automatically
[42:47] eligible for spring security, spring
[42:50] transaction management, all those um
[42:52] kind of things. Having said that though,
[42:57] there are some things you should not do.
[42:59] So for example, would it be a good idea
[43:02] to have that transactional around a
[43:04] method that calls an LLM?
[43:08] I think we can pretty clearly agree that
[43:10] would be a very very bad idea because it
[43:13] would keep the transaction open and lock
[43:15] the database or whatever um while you're
[43:19] actually performing an operation that's
[43:21] incredibly slow.
[43:23] So you know conceptually the benefits
[43:25] are really strong of having every agent
[43:29] be a spring bean but nevertheless you do
[43:32] you do need to sometimes step back and
[43:34] think okay there are certain things
[43:36] about this that are fundamentally
[43:37] different to everything else we do
[43:40] but you know the benefits also come from
[43:43] integration with spring boot. So by
[43:46] default you can install inbable as a um
[43:49] one of a using a number of spring boot
[43:51] starters and that is very very
[43:54] straightforward and you just put at
[43:56] enables annotation on your spring boot
[44:00] main class and off you go.
[44:04] I not sure how many of you could read
[44:06] the code example but we are put have put
[44:09] a lot of effort into our API. In fact,
[44:13] Arian Pzmer, who spoke here earlier and
[44:15] I think I've got a session with shortly,
[44:18] is um part of the team. Um so he's been
[44:21] helping doing that. So we're really
[44:23] doing our utmost to come up with a
[44:25] modern quite beautiful I think API for
[44:28] use from both Java and Cotlin. One thing
[44:32] that I um should say here is it does it
[44:37] upsets me sometimes when you hear a lot
[44:39] of cheap Java bashing and people should
[44:43] take a look at modern Java. Um, you
[44:46] know, it's very sad that a lot of the
[44:49] Java that you see people writing today
[44:51] is not using modern idioms like records,
[44:55] um, inhouse switch statement, type
[44:57] inference because it really has gotten a
[45:00] lot better. As with Spring, there's a
[45:04] great deal of emphasis on you unit
[45:06] testing. So you can unit test your
[45:09] individual actions within your agents
[45:12] and
[45:14] that even extends to where they're
[45:16] calling LLM. So it's really easy to unit
[45:19] test actions and verify that the prompt
[45:21] was built correctly and also that the
[45:24] hyperparameters like temperature were
[45:26] correct. This actually is a really big
[45:28] thing because although testing, you
[45:31] know, genuinely testing the reliability
[45:33] of our prompts against an LLM is really
[45:36] quite difficult, you would be surprised
[45:39] at how many bugs flow from incorrect
[45:42] prompt building and that can be totally
[45:45] picked up by unit tests.
[45:49] We also have as with Spring an
[45:51] integration testing approach which
[45:53] builds on Spring integration testing
[45:55] which enables you to test your entire
[45:58] agent flows.
[46:02] So another example is this slide deck.
[46:05] So 90% of this slide deck was built with
[46:08] an agent um from
[46:11] Inbable. So basically the starting point
[46:14] is a YAML file that goes into um a
[46:18] Cotlin data class and that includes for
[46:21] example me writing probably twothirds of
[46:24] a page about what I want to say um
[46:27] listing some of the images I want to use
[46:30] and also listing the references that I
[46:33] want. So for example, it pulled that
[46:35] code out of various of our GitHub repos
[46:38] because I listed them as things um I
[46:41] would like it to have access to. So you
[46:44] know this is building on the core
[46:47] framework but also some of the
[46:49] functionality we have like file tools
[46:53] um that is very very useful. So the
[46:56] diagrams shows the flow. So it starts by
[47:00] reading its configuration. So finding
[47:02] out for example what the presentation
[47:04] was supposed to be about, how many
[47:06] slides it should have. Then it uses a
[47:10] good LLM to identify research topics. By
[47:14] the way, when you break your flows up
[47:17] into multiple steps,
[47:19] you can and absolutely should use
[47:21] different LLMs for different steps
[47:24] because it can enable you to save money,
[47:26] get things to perform a lot faster. uh
[47:29] and also different LLMs have different
[47:30] strengths and weaknesses. So started off
[47:33] by using GPT41
[47:36] to identify
[47:39] things that should be researched to
[47:41] support statements that the presenter
[47:43] seems to want to make. So then it goes
[47:45] off and in parallel it uses a cheaper
[47:47] LLM GPT 4.1 mini armed with web search
[47:51] and other tools to go and do all that
[47:54] research. When that's finished, it puts
[47:57] them all together and calls the best LLM
[48:00] that we can get at to build a slide deck
[48:04] in MAP markdown syntax based on that. So
[48:09] that was using Claude 37 Sonnet which
[48:12] performed far better than um GPT41 for
[48:16] that. After that, it does a set of a
[48:19] sequence of post-processing steps, some
[48:21] of which are purely code and some of
[48:23] which um require an LLM. So, the one
[48:26] that requires an LLM is the initial
[48:31] slide deck builder prompt said if you
[48:33] think that a image would really add to
[48:36] this slide, put a comment in the
[48:38] markdown saying illustrate colon and
[48:41] then the search term that you should use
[48:43] to get that image. So we go off in the
[48:47] add illustration step. We go off with
[48:51] again a cheaper LLM because you don't
[48:52] need a god LLM for this in parallel and
[48:55] we do image searches and update the um
[49:00] markdown for that slide. Um if we find a
[49:04] suitable image finally again purely in
[49:08] code we do a little bit more
[49:10] post-processing and call the map um CLI
[49:14] tool to generate HTML from markdown
[49:23] and an example of the actual code the
[49:26] agent this again is open source this is
[49:29] um if you go to imbable on GitHub this
[49:31] This is the deca um example and this is
[49:36] the part of the agent. So you know the
[49:39] first action is identify research
[49:42] topics. Um we've also got an action to
[49:47] research the topics which actually cause
[49:49] calls some support we have in the
[49:51] framework for parallel processing. Um
[49:55] and finally we have the create dick um
[49:59] action.
[50:05] So hopefully I've given you a sense that
[50:07] it would make sense to use a Java
[50:09] framework if you're in Java versus a
[50:11] Python framework. But let's let's do
[50:13] some other um comparisons with InBabel.
[50:17] So compared to Crew AI or Langraph from
[50:20] Python, um Inbabel has much stronger
[50:23] typing which is not surprising. It has
[50:26] the potential to integrate with your
[50:28] existing domain. So some of our examples
[50:31] illustrate talking to Spring data
[50:33] repositories and using JPA or other um
[50:38] backends that are familiar from the
[50:39] enterprise. Um it has flexible planning
[50:43] versus you know the finite state machine
[50:46] or other fixed way of doing steps. It
[50:49] tends to put far more emphasis on domain
[50:52] objects than Python frameworks do.
[50:54] probably the maybe the outlier in the
[50:57] Python space is paid AI um which does
[51:01] tend to emphasize using pyantic models
[51:04] but really I don't think anything um has
[51:08] the same emphasis as inbable does um has
[51:11] the ability to integrate with your
[51:13] existing business apps very very easily
[51:16] um and you know enables you to build on
[51:19] your existing stack versus take a new
[51:22] stack.
[51:24] So Gen AI I think to solve the problem
[51:27] of its horrendous failure rate in
[51:29] enterprise does need to grow up and you
[51:33] sometimes when things grow up they go to
[51:35] the JVM. Remember the um wave of
[51:39] companies in the late 2000s like Twitter
[51:42] etc that um were built on other
[51:44] technology stacks and eventually move
[51:47] back to the JVM because of performance.
[51:50] I think this is another moment where we
[51:52] will discover that the JVM has a great
[51:55] deal to offer. Whatever language you're
[51:59] going to do this in, structure and
[52:01] domain integration are key. And you
[52:04] know, I would hope for example in the
[52:06] net space. I'm to be honest, I'm not
[52:07] terribly familiar with the um Genai
[52:10] framework um on that frameworks on that
[52:13] platform, but I would hope that they
[52:16] also seize that opportunity because I
[52:18] think it's very compelling for doing
[52:19] this, right? So, you know, Embabel is
[52:23] not aiming to play catchup with Python
[52:25] frameworks. It's aiming to do something
[52:27] new that ultimately we will well put to
[52:31] other platforms. And I think that really
[52:34] um is the right way forward, not
[52:36] imitating what's already out there. So I
[52:39] would say as developers, start right
[52:42] away. Don't wait for a grand
[52:44] transformation strategy. You know, think
[52:46] about where you could apply a little bit
[52:48] of um Gen AI today and gradually take
[52:53] baby steps towards putting runs on the
[52:56] board. So we have the easiest way to get
[52:58] started with imbable is to go to either
[53:01] our Java agent template or Cotlin agent
[53:05] template repo their GitHub template
[53:07] repos you can clone that assuming you've
[53:10] got an open AI or anthropic key you
[53:13] literally have will have an agent up and
[53:15] running in five minutes so I have a
[53:19] session on Friday which will be zero
[53:23] slides and nothing but code. So if
[53:26] you're interested in learning more about
[53:28] how it works in practice, please come
[53:31] along. Thank you. [applause]
