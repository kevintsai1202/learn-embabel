# Why You Should Build Agents on the JVM by Rod Johnson

**影片網址**: [https://www.youtube.com/watch?v=dbx1_P7W1DM](https://www.youtube.com/watch?v=dbx1_P7W1DM)
**影片 ID**: `dbx1_P7W1DM`

## 影片簡介
This keynote explores the rise of Java AI Agents, with a focus on Embabel - an innovative JVM-based agent framework designed for Java and Kotlin developers. ...

---

## 影片逐字稿 (Transcript)
[00:00] [Music]
[00:07] Hi. Well, it's good to be here. It's
[00:09] quite a few uh years since I spoke here
[00:12] at DevOps and I'm just reminded what an
[00:14] amazing amazing show it is. So, what I
[00:18] want to do now is jump several levels
[00:21] up. like we've heard from some really
[00:23] really cool things um that are happening
[00:26] in the JVM and are also relevant to AI
[00:31] that of course gives us the underpinning
[00:34] that means that we are able to run on
[00:37] Java on the JVM much of the world's
[00:39] business logic but I'm going to go up
[00:41] several layers and I'm going to talk
[00:43] about agents and in fact really multi-
[00:47] aent systems so complex agents and talk
[00:50] about why you should build those on the
[00:54] JVM. I probably don't need this slide
[00:57] after we've what we've already heard
[00:59] this morning. Um, Genai is not hype. I
[01:04] know there are a minority of developers
[01:06] who believe that they can just put their
[01:08] heads down and it will go away and
[01:10] eventually their managers will get sick
[01:12] of talking about it. It's not going to
[01:15] happen. It changes the nature of how we
[01:18] work. If it hasn't already changed how
[01:21] you work, you really should learn more
[01:24] and about the tools that are available
[01:27] to you. Stefan obviously gave us some
[01:29] great examples of that. So, you know,
[01:32] first thing, it is the elephant in the
[01:34] room. I really love what Stefan has done
[01:36] with this conference making it about
[01:38] agents and AI. It is what we all need to
[01:41] care about most at this time.
[01:44] So really the first killer use case with
[01:47] Gen AI was the personal assistant,
[01:49] right? Chat GPT, we could go and ask it
[01:53] things. Then we could connect chat GPT
[01:55] or claude or other LLMs with tools and
[01:58] it could do web research and all these
[02:00] kind of things um in real time for us.
[02:04] That all falls really in the use case of
[02:07] personal assistance.
[02:09] It's fundamentally human in the loop,
[02:11] right? you are interacting with a model
[02:15] and the tools the model is using, but
[02:16] you're really you're directing it. So,
[02:20] it turns out that that use case is very
[02:22] broad. So, Claude code is basically just
[02:25] a fancy personal assistant. It's very
[02:28] very capable in how it works, but it's
[02:30] just another example of this human in
[02:32] the loop case. And the technology behind
[02:36] it is really very clever. I'd encourage
[02:38] you to read up on how Claude Code works.
[02:42] It very much relies on LLM's calling
[02:45] tools, but LLM's creating dynamic to-do
[02:48] lists and then checking them off through
[02:51] tool calls. Extremely powerful, very
[02:53] powerful tool, not very predictable, but
[02:57] you know, for this task, that's fine. I
[03:00] use clawed code quite a bit. Anything
[03:02] that I don't like never gets committed
[03:05] in git. I roll back lots and lots and
[03:08] that's great. What I commit is valuable
[03:12] to me, saves me time, makes me move
[03:14] faster than I would otherwise. However,
[03:19] this is not the reality in enterprise
[03:21] applications. So, for example, you've
[03:23] got this magic thing. Imagine you're
[03:25] working with git. You've got this magic
[03:27] thing called called a roll back. Bad
[03:30] thing bad thing gone. Bad thing never
[03:33] happened. No record exists of bad thing.
[03:36] That is not the case when you're trying
[03:38] to automate business processes using Gen
[03:41] AI. For example, you've probably heard
[03:43] about Air Canada a year or two ago,
[03:46] offered somebody an absolutely amazing
[03:48] fair or their chatbot did. Air Canada
[03:51] made the mistake of not honoring that
[03:53] fair which ended up in a court case
[03:55] which they lost. But that's an example,
[03:58] you know, that incorrect
[04:00] message to a customer,
[04:03] that mistake, it's not going to go away.
[04:05] You cannot cope with the level of
[04:08] unpredictability that are perfectly fine
[04:10] for coding agents. This obviously isn't
[04:12] just my opinion. There are a bunch of
[04:15] surveys. The particularly dire one was
[04:17] the MIT survey recently. I don't know
[04:20] how accurate any of these are, but the
[04:22] fact is it is overwhelming. Gen AI
[04:26] projects in enterprises tend to fail. So
[04:29] why is this?
[04:33] There are some unavoidable challenges.
[04:35] Working with this technology is hard. So
[04:39] once upon a time things that were known
[04:42] to be non-deterministic with just the
[04:44] nasty corner cases that we dreaded
[04:46] having to deal with like you know race
[04:49] conditions all these some maybe some of
[04:51] the issues in distributed systems they
[04:53] were typically corner cases and they
[04:55] accounted for a lot of our time.
[04:58] You could write most of your code
[05:00] pretending that it would execute in a
[05:02] predictable deterministic manner. That
[05:05] is no longer true. If you're interacting
[05:07] with LLMs, everything you do is going to
[05:10] encounter non-determinism and therefore
[05:12] become less predictable.
[05:15] So that's you know that is a genuine
[05:17] hard problem um that is inherent in the
[05:20] technology. Similarly, we all know about
[05:22] hallucinations. Hallucinations are bad.
[05:24] Um, LLMs do love making stuff up that
[05:28] things are getting a bit better over
[05:30] time, but you know, there are quite a
[05:32] lot of techniques that you need to use
[05:34] to mitigate that. Prompt engineering is
[05:38] a complete misnomer because it's not
[05:40] really engineering. It's really alchemy.
[05:44] Prompt engineering is like essentially
[05:46] throwing things at the wall and hoping
[05:48] that you know you add something like
[05:49] take a deep breath or think step by step
[05:52] or um put something in big you know
[05:56] capital letters to say do not do
[05:59] whatever you don't want it to do
[06:02] inherently nasty and messy. Um and
[06:06] similarly obviously the cost and
[06:07] environmental implications are also a
[06:09] problem.
[06:11] There are also some avoidable challenges
[06:13] that we make for ourselves and many of
[06:15] these are organizational. So one of the
[06:17] reasons Gen AI projects tend to fail is
[06:20] they're driven very often from the top
[06:22] down. The board wants
[06:25] Gen AI and they want it now. And of
[06:28] course we know how well that works. You
[06:31] know before open source really fixed the
[06:34] problem in the early 2000s J2E was very
[06:37] much top down. And we know how well that
[06:40] era of of technology worked. Similarly,
[06:43] from an organizational point of view,
[06:46] you get siloing. And this is really
[06:48] dangerous. I've seen the um what I think
[06:51] is actually an antiattern where you have
[06:54] a central AI function, central AI group,
[06:57] and it's essentially disconnected from
[06:59] the rest of the business.
[07:02] I actually recently spoke to um the one
[07:06] of the AI leaders at a large
[07:08] organization in Australia.
[07:11] They have been in the job for 10 and a
[07:13] half months. They were unaware of
[07:15] whether the um company had any Java in
[07:18] production.
[07:19] I've never worked for that company and I
[07:21] happen to know about 70% of what they do
[07:23] is in Java. So you know this by
[07:25] definition will not work.
[07:29] Similar related to that is the green
[07:31] field fallacy. So you get people trying
[07:34] to build agents trying to execute on Gen
[07:38] AI
[07:40] imagining that they're in green field
[07:43] like all those blogs you read they use a
[07:45] few MCP tools to do web search or the
[07:47] like. They virtually never talk to an
[07:50] existing database or enterprise system.
[07:53] So you know if you start if people start
[07:57] feeling that genai is green field
[07:59] inherently and ignoring what's there
[08:01] they are bound to fail. So you know
[08:05] everything in software tends to stick
[08:07] around. We need to build on what's
[08:09] there. You know every time someone says
[08:11] this time it's different
[08:14] typically they're going to lose a lot of
[08:15] money in the stock market or they're
[08:16] going to make some other appalling
[08:18] mistake. This time it's different in the
[08:20] sense that the technology is quasi
[08:23] miraculous in some ways but it's not
[08:26] different in that it is our
[08:28] responsibility to take forward what we
[08:30] have what works and bring the new
[08:33] features to it. Turns out that there's a
[08:36] pretty big and important division here
[08:39] between the personal assistance scenario
[08:42] and what you need to automate business
[08:44] processes. So for example, claude code
[08:47] is great for what it does, but you
[08:49] cannot use that approach which is just
[08:51] based on giving LLMs lots of agency and
[08:54] lots of tools. You can't use that
[08:56] approach to automate business processes.
[09:00] Okay, told you what is wrong and what's
[09:03] scary. How do we fix it?
[09:06] Well, the first thing that we need to do
[09:08] if we want to u make our business
[09:11] processes more agentic is we need to
[09:14] attack non-determinism.
[09:16] We're not going to be able to declare
[09:19] complete victory because LLMs are
[09:21] inherently unpredictable but we are
[09:24] going to be able to put a lot of runs on
[09:26] the board. And the way in which we can
[09:29] do that for example is we break complex
[09:31] tasks into multiple steps. We use
[09:34] smaller prompts. We give each of those
[09:37] LLMs that we invoke fewer tools. And
[09:40] where possible, if we can do something
[09:42] in code, we do it in code because if we
[09:44] can do it in code, it will be quicker,
[09:46] cheaper, and more reliable. It will also
[09:50] be better for the planet. So, you know,
[09:53] I think one of the key things is really
[09:56] fight the battle as best we can fight it
[09:59] to make our systems as deterministic as
[10:01] they can be.
[10:03] This is something that in imbabel which
[10:05] I'll get to we have built very deeply
[10:08] into our concepts. We also can introduce
[10:11] guard rails build reliable testing
[10:14] frameworks and build bring a lot of
[10:17] well-known good practices. Second
[10:21] we could integrate with what works. Do
[10:23] the opposite of the green field fallacy.
[10:25] Start by saying okay we are as I imagine
[10:29] most of you are working for fairly large
[10:31] companies
[10:33] our problem is leveraging the promise of
[10:35] genai technology in the context of this
[10:38] company's existing business and assets
[10:41] well a lot of those assets are written
[10:45] in Java and we need to be able to
[10:48] connect to them in a very natural way so
[10:51] you know firstly I think we massively
[10:53] mitigate our risks if we adopt
[10:56] incrementally but secondly we build out
[10:59] of what already works.
[11:03] This in order to achieve both these
[11:06] goals we need to bring more structure
[11:08] into how we work with LLMs. LLMs have
[11:12] this you know almost magical facility in
[11:14] natural languages. So, you know, not
[11:18] just not just English, any language.
[11:20] Like in uh a workshop yesterday, I got
[11:24] um the imbabel write and review story to
[11:27] review the story in Dutch. And well, I
[11:29] can't read Dutch, but no one complained.
[11:32] Uh so, you know, they have this amazing
[11:35] freakish ability, but it doesn't mean
[11:37] that we should talk to them in English.
[11:40] Take for example, let's let's roll back
[11:42] the clock. Let's imagine we're talking
[11:44] to a customer support agent and we're
[11:47] not thinking about Genai. We've called
[11:49] up say our insurance company and we're
[11:51] talking about our policy. The person
[11:53] that we're talking to isn't relying on
[11:55] their memory.
[11:57] They are relying on structure. They're
[11:59] sitting in front of a keyboard. The
[12:01] keyboard's probably connected through
[12:03] some Java middleware to an Oracle or
[12:06] other database. And the things all the
[12:09] way down are structured. They're
[12:10] objects. They're tables. theory
[12:12] structure. It's not just English. So,
[12:15] you know, that person um would not be
[12:18] very popular with their shift supervisor
[12:20] if at the end of the shift they said,
[12:21] "Well, I didn't bother entering any
[12:23] forms, but this is what I know." Um I
[12:26] can tell you in, you know, 700 words the
[12:30] key things that happened today. I don't
[12:32] think that person would be popular. So,
[12:34] we bring as much structure to LLM
[12:37] interactions as we can. And this means
[12:39] structure in terms of object types. This
[12:42] brings us to a term that I introduced a
[12:44] couple of months ago called domain
[12:46] integrated context engineering which I
[12:49] think is really really important. So
[12:52] this is the idea of taking our domain
[12:56] model and making it central to what we
[12:59] do with LLMs. In fact, we can even put
[13:03] tools for our LLMs to use selectively on
[13:06] our domain objects and it works. It
[13:08] works beautifully and it enables us to
[13:11] integrate with the domain models we've
[13:13] already got. Okay, what can we do as
[13:16] Java developers? Well, the first thing
[13:19] we could do would be imitate Python
[13:21] frameworks. So, you know, just look at
[13:23] what's out there in Python and try to do
[13:26] that in Java. Obviously, that's a pretty
[13:29] poor promise for us because what does it
[13:32] mean? Does it mean that we're downstream
[13:34] of where immigr innovation comes from?
[13:37] Does it mean also that we're going to
[13:39] suffer from, you know, essentially the
[13:40] fact that a lot of things in Python are
[13:41] effectively dtyped? As I think you can
[13:44] guess, I don't think this is very
[13:46] exciting and it wouldn't get me out of
[13:48] bed in the morning. What I think we need
[13:52] to do, can do and are doing is build
[13:56] better. Look, absolutely look at what
[14:00] Python frameworks have to offer. Um, be
[14:03] very familiar with that, but do better.
[14:07] Build better frameworks in Java. Aim to
[14:10] lead, not to follow. And aim to bring
[14:14] the skills that we have as enterprise
[14:17] developers. Remember we built the core
[14:19] business apps. So really we are uniquely
[14:22] placed to bring them into the world of
[14:24] Gen AI. Guess what? Everything we know
[14:27] about building robust software. And look
[14:29] at this room. There's a lot of knowledge
[14:31] about building robust software in this
[14:33] room. Everything we know still matters.
[14:36] It's not different. It's different in
[14:39] the sense that it's incremental and an
[14:41] important new thing has emerged, but
[14:43] it's not fundamentally different. The
[14:45] next phase of the AI revolution won't be
[14:48] written in Jupyter notebooks.
[14:52] Python is an important language. I think
[14:55] every developer needs to be familiar
[14:56] with Python. I believe it or not, when I
[14:59] first started working on Inbabel a
[15:00] couple of years ago, I was significantly
[15:02] more fluent in Python than Java because
[15:04] I hadn't done Java for a number of
[15:06] years. Python's great for data science
[15:09] scripting and prototyping, but it is not
[15:11] great for enterprise applications. And
[15:13] remember, GNAI is quite different from
[15:16] data science. A lot of people make this
[15:18] mistake. Genai is really about
[15:21] application development skills. Data
[15:23] science different skill set. So, you
[15:26] know, your organization very likely has
[15:29] zero enterprise apps in Python.
[15:33] Probably a pretty good number.
[15:35] So, okay. Now, on to what I am
[15:38] personally um endeavoring to do about
[15:40] this. And I would like to introduce my
[15:42] new framework imbabel. Inbabel is a
[15:46] framework that is directly attended to
[15:49] address the key failure points of genai.
[15:51] So obviously it's on the JVM. So I think
[15:54] you know as you know one of the key
[15:56] reasons for failure is distance from the
[15:59] critical technology that runs the
[16:01] business but it also directly tackles
[16:04] the problem of non-determinism.
[16:07] It really emphasizes domain modeling
[16:09] heavily which helps you expose your
[16:11] existing assets. Um, and it's designed
[16:16] around toolability and testability. As I
[16:19] said, the goal is not to just copy what
[16:22] exists in Python. So whereas for example
[16:25] you know lang graph for J basically
[16:29] takes the finite state machine approach
[16:31] of um lang chain for python.
[16:36] Embabel introduces a new dynamic
[16:39] planning approach using a nonlm AI
[16:42] algorithm called gulp goal oriented
[16:44] action planning. It's really interesting
[16:47] benefits and I don't have time to go
[16:48] into it here, but it gives you
[16:51] deterministic planning that's
[16:53] nevertheless smart. So you can add more
[16:55] actions and goals to your system and it
[16:57] can learn to do additional things but do
[17:01] them in a predictable way.
[17:04] Compared to other frameworks, inbable is
[17:07] really more a server than a framework.
[17:09] So for example, it builds on Spring AI.
[17:11] But if you look at Spring AI, Spring AI
[17:13] is about taking processes and enabling
[17:16] them to invoke LLMs. So,
[17:20] Embable is a server that is managing
[17:22] what we call agent processes and these
[17:26] potentially can be long running. So,
[17:29] compared to other frameworks, the server
[17:31] knows about all the capabilities that
[17:33] were deployed to it, which means you can
[17:35] extend capabilities by adding actions to
[17:38] goals. So it's it's pretty ambitious
[17:40] project today. I would say that it
[17:42] probably is the nicest way to do Gen AI
[17:44] on any platform, but tomorrow I think it
[17:48] truly can extend to be the fabric that
[17:51] you Gen AI enable your um JVM centric
[17:56] enterprise with
[17:59] it. Well, actually this screen's so big
[18:01] you can probably see it. We're very
[18:02] proud of our API. It is a very modern
[18:07] API and actually it was great seeing
[18:09] some of those examples um of Java 25.
[18:13] You know the way Java itself is changing
[18:15] and getting better and the way people
[18:17] write Java APIs is getting better. So
[18:20] you know this is a really really nice
[18:23] API brilliant tool support um and a
[18:27] pleasure to program with. So compared to
[18:31] Python frameworks,
[18:35] I've done a series of blogs where I'm
[18:36] taking Python frameworks and taking some
[18:39] of their examples and writing them in
[18:41] Java within Babel. So far I've done
[18:42] three and I'll do many more. Two of them
[18:45] were Crew AI examples. Crew AI is a very
[18:49] popular uh framework in the Python
[18:51] space. The third one was paid AI. I
[18:54] would strongly encourage you to look at
[18:56] those blogs because for example the
[18:59] first one I did with crew moderately
[19:01] complex example.
[19:03] The Java version has significantly fewer
[19:06] lines of Java code than of Python code
[19:10] and it also has significantly fewer
[19:12] lines of YAML than the Crew AI example.
[19:15] So, you know, when people complain that
[19:17] Java is verbose, with a well-designed
[19:20] API and modern Java, it's not your
[19:24] grandfather or grandmother's Java.
[19:28] So, I what I would like to leave you
[19:31] with is Gen AI needs to grow up. It's
[19:34] not working, right? It's working for the
[19:36] personal assistance. It's not working in
[19:38] enterprise. It needs to grow up. And
[19:41] really it is JVM developers who have the
[19:45] skills to do this because bringing
[19:49] domain integration um is absolutely
[19:52] critical to success. I now when I'm
[19:55] writing a new agent I start by designing
[19:57] the domain objects that we'll use and
[19:59] then the agents fall out naturally. So
[20:02] Embable aims to bring the JVM strengths
[20:06] to Gen AI and it is genuine innovation.
[20:10] So finally I would say the future is up
[20:12] to you. I would strongly encourage you
[20:15] to learn as much as you can about Gen
[20:18] AI. No single framework is going to
[20:20] solve your problems. You need to educate
[20:22] yourself. Look, for example, at what
[20:24] Stefan has been doing, how he's been
[20:26] exploring. You really need to be doing
[20:29] that kind of thing for yourselves. You
[20:30] need to be reading blogs. You need to
[20:32] understand best practices. But then once
[20:36] you've got yourself up to speed,
[20:39] you should be able to pitch your boss on
[20:41] doing Genai and Java. For example, this
[20:43] slide deck was largely generated by an
[20:46] imbabel agent. These are the steps that
[20:48] it went through. Our travel planner
[20:51] application is one of the nicest and
[20:53] most sophisticated um gen agent samples
[20:57] I've seen anywhere. So you know not only
[21:00] can you persuade hopefully your boss
[21:02] that you can incrementally genai their
[21:04] existing applications
[21:06] don't be shy tell them hey have you
[21:08] looked at this Java thing you know it's
[21:10] better than they have on Python okay so
[21:14] this was all slides no code please come
[21:18] on Thursday afternoon to my session and
[21:20] I guarantee you there will not be a
[21:22] single slide there will be nothing but
[21:24] code and I will demonstrate how to get
[21:27] started with imbable Thank you. Great.
[21:30] >> Thank you.
[21:34] [Music]
