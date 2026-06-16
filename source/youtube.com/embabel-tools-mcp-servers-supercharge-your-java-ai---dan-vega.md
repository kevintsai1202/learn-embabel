# Embabel Tools & MCP Servers: Supercharge Your Java AI Agents

**影片網址**: [https://www.youtube.com/watch?v=2mGr7kdstJs](https://www.youtube.com/watch?v=2mGr7kdstJs)
**影片 ID**: `2mGr7kdstJs`

## 影片簡介
LLMs are powerful, but they hallucinate and the real superpower comes when you give your AI agents tools and real-world context. In this video, I show you ex...

---

## 影片逐字稿 (Transcript)
[00:00] Welcome back friends, Dan Vega here, and
[00:01] today we're going to continue our
[00:03] exploration into Imbue. Imbue is a
[00:06] framework for building agentic flows on
[00:09] the JVM. And this has been a framework I
[00:12] wanted to look at for a while, finally
[00:14] got a chance to sit down and start
[00:15] playing around with it. I did a first
[00:17] video on this, I'll leave this somewhere
[00:19] up here in the description below. That
[00:21] was my first look, my kind of first
[00:23] impressions, how to get started with it,
[00:25] and today we're going to continue on
[00:27] with that. I want to take a look at a
[00:29] few features. One the logging is really
[00:31] cool. I really like the Star Wars and
[00:34] the Severance personalities, it just
[00:35] kind of adds a little flair to the
[00:37] council for you. And then we're going to
[00:39] take a look at MCP servers and tools.
[00:43] Again, I've talked a lot about this on
[00:45] the channel in the past. I think, you
[00:47] know, large language models are great.
[00:49] These coding agents are great, but I
[00:51] think when we what we really need to do
[00:53] to start to alleviate some of the
[00:55] hallucination is be able to add context
[00:58] and add actions, right? And we can do
[01:01] that through tools and through MCP
[01:03] servers. And so we're going to build on
[01:06] our blog writing agent today. I had two
[01:09] very simple actions in the first video.
[01:12] We're going to build on that, add some
[01:13] more actions, and then we'll introduce
[01:15] some tools and MCP servers just so you
[01:18] can have see how you work that into your
[01:21] own projects. Okay, with that, let's go
[01:24] over here and take a look at my screen.
[01:27] So, if you want to follow along, again,
[01:29] watch the first video. But this is the
[01:31] repo, the blog agent. You can see I just
[01:33] updated this to to make sure the
[01:35] starting code was correct.
[01:37] But if you want to, you can pull down
[01:40] the step one starter, that is from the
[01:42] first video. And then we're going to add
[01:44] some things to it. All the final code
[01:46] will be in the master branch. You can go
[01:47] ahead and check that out if you want to
[01:48] just dig through it.
[01:50] But what the the idea here was, hey,
[01:52] let's build an agent that can write blog
[01:55] posts. Now, you don't just say, hey,
[01:56] write me a blog post, right? There's a
[01:57] bunch of things that you might need to
[02:00] do in a blog post agent. We started
[02:03] simple with just, hey, write a draft and
[02:06] then review it. And I left this in the
[02:08] readme, but there are a bunch of other
[02:10] things that we can do to this. We can
[02:13] Where are we at here? So, what's next?
[02:15] Like, hey, what if we wanted to like add
[02:17] a TLDR or write a catchy hook or add
[02:21] some front matter to it? Like, there are
[02:23] a bunch of things that we can do. I
[02:25] think the original one has more of those
[02:27] in there. But that's the idea. We're
[02:29] going to add some actions, and through
[02:30] that we'll be able to add some tools.
[02:33] If you want to dive deeper, again, this
[02:35] is something that I am trying to do here
[02:38] a little bit more is there's a lot of
[02:40] really great documentation on the Imbue
[02:42] docs. And so this is a really good place
[02:45] to dive in. We're we're kind of looking
[02:47] at the tools section right now and
[02:49] understanding how to use tools, how to
[02:51] bring in MCP servers. There's like some
[02:53] groups of tools that Imbue makes
[02:55] available to you, which is really nice.
[02:57] And so this is going to really kind of
[03:00] supercharge
[03:01] your agents. All right. So, with that,
[03:04] let's head over to IntelliJ.
[03:07] And this is the original
[03:10] blog agent that I had.
[03:13] There's kind of the idea in here of an
[03:15] agent that has a couple actions. The
[03:18] first one is to write a draft, and the
[03:20] second one is to review a draft. And
[03:23] again, from the recap of the first one,
[03:25] the way this works is you define a bunch
[03:27] of actions, and then you define a goal.
[03:30] So, this one is annotated with at
[03:32] achieve goal. The goal is I want a
[03:34] reviewed and polished blog post ready to
[03:36] go. So, as we said add some more actions
[03:39] in here, the goal is going to change,
[03:41] right? Because we're going to have a
[03:42] bunch more actions. Maybe we want like a
[03:45] final published blog post that has all
[03:47] of these other kind of characteristics
[03:49] to it. So, with that, let's go ahead and
[03:52] add to this.
[03:54] All right. So, first off, here in our
[03:55] application.yaml, I'm going to go ahead
[03:57] and add some logging, and there's
[03:59] different personalities. As you can see,
[04:01] Star Wars, Colossus, Hitchhiker, Monty
[04:03] Python, Severance, all very cool. And if
[04:06] you go ahead and do this and then run
[04:08] your application, you'll see in the logs
[04:10] you get some different personalities
[04:11] here, right? So, I'm going to go ahead
[04:13] and open this and
[04:15] feel the force. And you see our friend
[04:18] Yoda there. And as you go through the
[04:20] logs and do some things, you'll see a
[04:22] bunch of like Star Wars references,
[04:24] which is I don't know production
[04:27] value in this, but I find it really
[04:30] really nice and a lot of fun to use. So,
[04:33] take a look at those logging
[04:34] personalities if you're interested.
[04:36] Okay, so the next task is we have this
[04:40] write draft and we have this review
[04:42] draft. And we really want to improve on
[04:45] this, and we want to do a couple of
[04:46] things that that will allow us to take
[04:48] advantage of like some tools and maybe
[04:52] some MCP servers.
[04:54] So, we're not going to do a whole bunch
[04:56] of live coding here because that is
[05:00] really the interesting part. And I feel
[05:02] like that last video was a little long
[05:03] cuz we typed a lot of stuff out. So, I'm
[05:06] going to start here, and I'm going to
[05:08] basically add a TLDR summary at the top
[05:10] of the blog post. I really like this
[05:12] when I get to a blog post and there's a
[05:14] TLDR, just, hey, if it's 10 minutes
[05:16] long, let me see if this is something
[05:18] that that I really want to read through
[05:20] before I go ahead and read through it.
[05:22] So, this is going to produce a final
[05:24] post. So, let's go ahead and create a
[05:27] new Java class. Actually, this will be a
[05:30] record. We'll call this final post. And
[05:33] this final post will have a title,
[05:37] content, and feedback. And we are going
[05:41] to implement our blog post here.
[05:45] If you missed this, our blog post here
[05:48] is a sealed interface, and so let's go
[05:50] ahead and add final post to this, and
[05:53] that should satisfy that. So, we have an
[05:57] TLDR summary. Basically, we're going to
[05:58] use the default LLM, we give it an ID.
[06:01] What we are trying to create from that
[06:03] is a string class, and you'll see why in
[06:06] a second. We're not strongly typing this
[06:08] for a reason.
[06:10] So, then we have a front prompt,
[06:12] write a one-sentence TLDR summary for
[06:14] this blog post. Return only the summary
[06:16] text, nothing else. So, I just want the
[06:18] text. I just want the TLDR. I'm giving
[06:21] it the title and the content so it can
[06:23] go ahead and use that as a base for
[06:25] creating the TLDR. So, I get the
[06:27] content, so TLDR, here it is. And then
[06:31] we're going to return a final post with
[06:33] that. So, the content with the TLDR will
[06:36] be in there, and now we have a final
[06:39] post. Okay, so the next thing we're
[06:41] going to do is we're going to introduce
[06:42] a tool. And the reason I want to
[06:44] introduce the tool is to basically
[06:46] capture reading time. So, in the front
[06:49] matter for the blog post, I'm going to
[06:51] add this little key for reading time, so
[06:53] we know how long it might take to read
[06:55] this blog post. So, to do that, I need
[06:58] to define the tool first. So, I'm going
[07:00] to come in here, and we're going to call
[07:01] this the reading stats tool. Okay, that
[07:05] looks good. We're going to mark this
[07:07] with at component. Okay. And then I'm
[07:11] going to say private,
[07:14] let's say static final
[07:17] int words, nope, int words per minute.
[07:22] We'll say 200. I did some searching out
[07:25] there, the average reading time is 200
[07:27] words per minute. On technical posts, if
[07:29] it's like really technical, it might be
[07:30] a little more less than that, maybe 150,
[07:32] but that's a good start. So, the way
[07:34] that we do this is we're going to start
[07:36] by defining a LLM tool. This is the
[07:39] annotation that comes from Imbue. I
[07:41] believe that the underneath the hood is
[07:43] this using
[07:45] No, this is not using
[07:47] tool from Spring AI, but somewhere down
[07:49] the line I think it is. So, calculate
[07:52] the word count and estimating reading
[07:53] time in minutes for a piece of text.
[07:55] Reading speed is assumed to be 200 words
[07:58] per minute.
[08:00] Okay. So, now we can define the tool.
[08:02] And again, a tool in AI, whether it's
[08:05] Spring AI, Imbue, is really just the
[08:07] idea of, hey, we want to provide some
[08:10] extra functionality to the large
[08:11] language model. It doesn't know how to
[08:13] do this yet.
[08:14] So, we can define a tool, and then
[08:16] basically when the LLM needs to know
[08:19] that information, it can basically
[08:20] invoke this tool. So, we're going to say
[08:24] calculate reading stats. It is going to
[08:29] take in some text, and this is going to
[08:32] be, let's go ahead and annotate this
[08:34] with at LLM
[08:40] tool.param.
[08:43] Param, yep. And then the description of
[08:46] this is just going to be the full text
[08:50] of the blog post to analyze, right? So,
[08:53] it needs to analyze that. So, we have
[08:55] that parameter there
[08:58] called text. And basically want to say
[09:01] if text equals null or is empty, right?
[09:07] Return,
[09:08] let's say, zero words,
[09:11] zero minute read. Oops, zero minute
[09:14] read, right? Okay, so that's that. If
[09:18] not, we want to go ahead and get the
[09:20] words. So, we'll say text.trim
[09:23] .split,
[09:25] and we'll use some regex here.
[09:30] And then we want to get the length,
[09:32] right? So, length
[09:34] We'll get a var from that. That will
[09:36] give us the words.
[09:38] From there,
[09:40] we can go ahead and say the minutes
[09:44] No, what are you doing? That's not what
[09:47] we want. Let's say
[09:49] math.max.
[09:52] We will say one int
[09:56] math.ceiling.
[10:00] And from the ceiling, we'll say words
[10:03] double words per minute. That's what I'm
[10:05] looking for. Okay, so finally we can
[10:07] return
[10:09] string.format
[10:11] words percentage. Yeah, that looks good.
[10:14] Okay, so now we have this tool that we
[10:16] can go ahead and use, but we got to make
[10:18] it available to the agent. So we have
[10:21] this reading stats tool. It is a
[10:22] component.
[10:24] So it will be available
[10:26] if we need to inject it in a class and
[10:28] we actually do, right? We have these
[10:30] properties here, but we also need
[10:33] private final reading stats tool. Nope,
[10:37] I don't want to do that.
[10:39] And then we'll go ahead and add that as
[10:41] a constructor parameter and now we can
[10:43] go ahead and use that.
[10:45] So
[10:47] in our
[10:49] front matter now, we can go ahead and
[10:51] use that. So I'm going to copy this
[10:55] method because this is a little bit of a
[10:57] long method. So let's say in here we
[11:01] have our
[11:02] first draft, we have our final at our
[11:06] TLDR, we have our review draft, and we
[11:09] have that. So somewhere around here,
[11:12] let's go ahead and add this.
[11:16] So we are going to get a published post.
[11:18] This is like the published post. I
[11:20] realize that I have the final draft and
[11:22] a blog post a draft and final post.
[11:25] We could probably clean this up a little
[11:26] bit. That's okay. This is This is just
[11:28] going through the motions here.
[11:30] So
[11:31] we're going to have a published post.
[11:32] We'll have an idea of front matter.
[11:34] Let's go ahead and create those now so
[11:37] that we have them. All right, so we'll
[11:39] create a published post here. This is
[11:42] going to be a record. Sure.
[11:45] This is going to have the same things
[11:48] going to implement blog post.
[11:53] Sure. Again, we can clean this up.
[11:56] Not too focused on that right now.
[11:58] And then we need some front matter. So
[12:00] let's go ahead and say
[12:03] front matter.
[12:08] Sure.
[12:09] And we'll go ahead and say that it's
[12:11] going to take a description, a list of
[12:13] tags, a list of keywords, and the
[12:15] reading time. So if you're not familiar
[12:18] with front matter in a blog post,
[12:19] there's kind of three, you know, three
[12:21] dashes and then there's some key value
[12:23] pairs in a blog post that kind of has
[12:25] metadata about the blog post. So we're
[12:27] going to kind of write that information
[12:29] out as well.
[12:30] So the way we do that is we can call
[12:32] this with tool object and we can pass in
[12:35] our reading stats tool. And in that
[12:38] reading stats tool, it's going to look
[12:40] for any tools basically annotated with
[12:43] @LMTool. So now we provided a tool that
[12:46] the large language model has access to.
[12:49] So the way this works is when we call to
[12:52] the large language model and give it a
[12:53] prompt, so here it says generate front
[12:56] matter metadata for this blog post,
[12:58] etc., etc.
[13:00] Use the calculate reading stats tool to
[13:03] put to on the post content below to
[13:05] compute the read time. Now this helps.
[13:07] This doesn't mean that it will always
[13:09] always 100% of time use this,
[13:12] but this helps kind of guide and say,
[13:14] "Hey, you have some tools available to
[13:15] you. Go ahead and use this one if you
[13:17] need to calculate reading stat time." So
[13:20] we're passing that off and it will
[13:21] basically send back to us. We'll we'll
[13:23] invoke that tool, get the reading stats
[13:25] for it, and then send that back to the
[13:27] large language model.
[13:30] So from there we collect some of this
[13:32] front matter. So here's the slug, here's
[13:35] the tags, here's the keywords. I think I
[13:37] added in a property for defining the
[13:39] number of keywords. You don't want to
[13:41] get too lengthy with this, so I think I
[13:43] default to like five. And then here's
[13:45] what that front matter looks like. So
[13:47] this will go at the top of the blog
[13:48] post. Here's all that information along
[13:51] with that reading time that we just
[13:53] generated.
[13:55] All right, and then we get our content,
[13:57] we get our published post, we write that
[13:59] to a file, and we return the published
[14:02] post. Now we can see what we're missing
[14:04] here is we we had an achieves goal on
[14:08] the review and improve draft. We That is
[14:11] not the final goal now. The final goal
[14:13] is I want a published post that contains
[14:16] that front matter. So I'm just moving my
[14:19] achieves goal down and I'm saying,
[14:21] "Okay, here's a description of a blog
[14:23] post with front matter." Actually, let's
[14:25] get a little more descriptive with this.
[14:27] Let's say a reviewed
[14:30] and polished blog post with front
[14:34] matter, right? So this is the goal now.
[14:37] The goal is we want it to do this. And
[14:39] the way that this works is it takes in a
[14:41] final post and it says, "Okay, well how
[14:43] do I get a final post? Oh, I see
[14:45] something that returns a final post. I
[14:47] need to add a TRD TLDR to this, right?"
[14:50] And so forth. So because it kind of
[14:52] looks at those types, it can build out a
[14:54] plan to achieve that goal.
[14:57] So so far, so good.
[15:00] I'm not going to run this yet because
[15:01] the blog writing process takes a minute
[15:04] and I want to make sure we get all this
[15:05] in before we we go ahead and do that.
[15:08] Okay, so that was showing off the just
[15:11] like a single tool that you want to add
[15:12] to it. Now I want to talk about maybe
[15:14] adding an MCP server. And how can we do
[15:17] that? So I'm going to copy in one more
[15:19] action here.
[15:21] And if we go, let's see, we have write
[15:23] our draft. Before we write a draft, and
[15:26] again, order doesn't matter here
[15:28] to Ambaible. This just matters to me.
[15:31] Like when I'm reading this file, I want
[15:33] to kind of put this in the right order.
[15:35] So I'm going to add this here, but I'm
[15:36] going to add a new action.
[15:38] And this action is going to be to
[15:41] research the topic using the web search.
[15:44] And the way that we're going to do this
[15:45] is we're going to use the default LLM.
[15:48] And Ambaible has this with tool group.
[15:51] So there's a way to pass in a group,
[15:53] which is kind of like saying, "Hey, this
[15:56] is a tool group for the prompt runner."
[15:59] This is a collection of groups and
[16:00] there's actually some built-in ones into
[16:02] Ambaible. So if we look at this core
[16:04] tool groups
[16:06] .web, search the web, fetch URLs, and
[16:08] look up Wikipedia articles. Use this
[16:11] when the user asks to search online,
[16:12] find information on the web, look
[16:14] something up, etc.
[16:16] So the way that this works is it has
[16:19] some different ways to do this. So you
[16:22] can use a brave web search. So general
[16:24] web search used for current events,
[16:25] facts, news, or any web lookup.
[16:28] Fetch, you can use search Wikipedia.
[16:31] So there are ways to use There are
[16:32] different groups in here that you can
[16:34] use. So we see maps and GitHub, browser
[16:37] automation. There's a whole bunch of
[16:38] core group tools in this group. So we're
[16:41] going to use that and we're going to be
[16:43] able to go ahead and then search the
[16:45] web. And what we want to do is we want
[16:47] to research this topic. Because again,
[16:49] if we're like like let's say that we
[16:51] were writing a blog post about getting
[16:53] started with Ambaible.
[16:55] Ambaible may not have been around when
[16:57] these large language models were
[16:58] trained. So we need to be able to
[17:00] augment it with some information, right?
[17:03] And so the way that we do that, first
[17:05] actually, let's come back to this. We
[17:07] need a researched
[17:09] topic. And again, a researched topic is
[17:12] really just going to be a record. So
[17:14] let's come up here and say new Java
[17:16] class, researched topic.
[17:19] Sure. And we'll look something like
[17:22] this. It'll just have a topic and the
[17:23] research that it did for it.
[17:26] So we're using the default LLM, we're
[17:28] passing in this tool group cuz it needs
[17:30] it. What we want back is a strongly
[17:33] typed researched topic. And then from
[17:35] the prompt, we're going to say, "Hey,
[17:36] research the following topic using web
[17:38] search tools.
[17:40] Find current, relevant, and accurate
[17:42] information. Limit yourself to no more
[17:44] than three web tools." This is just
[17:47] because if you're using a free API key
[17:49] from something like Brave web search,
[17:52] there will be some rate limiting on it
[17:54] and this does this in parallel, so you
[17:56] can run into some rate limiting in it.
[17:58] So I just kind of limit it to three, but
[17:59] if you had like a
[18:01] actual API key, then you probably
[18:03] wouldn't run into this. So
[18:06] that's what we're going to do.
[18:07] And to do this, we need to go ahead and
[18:10] set up an MCP server. So that's that's
[18:13] the way this works is we're actually
[18:15] going to define an MCP server. And so if
[18:18] you followed any of my videos on Spring
[18:20] AI, you probably know how to set up an
[18:23] MCP server and that is using AI MCP and
[18:27] then the client. This is going to be a
[18:29] standard in and out. This is just
[18:31] running on my machine. If this was, say,
[18:34] a public MCP server, you could configure
[18:36] that, too. And what we're seeing is we
[18:38] have a brave search MCP server. And the
[18:42] way that you install that is doing this
[18:44] and you need a brave API key, which is
[18:47] passed in through that environment.
[18:50] So with that, I think we have what we
[18:53] need. Let's double-check this.
[18:55] So we take in some user input. That will
[18:58] give us a researched topic. I think from
[19:01] the draft post now, right?
[19:04] I think from the draft post, we want to
[19:06] go ahead and pass in the researched
[19:09] topic and not the user input because the
[19:12] user input gets passed to the research.
[19:15] So research topic, research topic. And
[19:19] then
[19:20] and because of that, we're going to go
[19:21] ahead and update our prompt just a
[19:23] little bit and we're going to say, "Hey,
[19:24] write a Write a blog post about this
[19:26] topic. Use the following research to
[19:28] inform your writing." So we have some
[19:30] additional context. Go ahead and use it.
[19:33] And then we'll go ahead and say research
[19:36] here.
[19:37] So that will
[19:39] get us everything we need. We are saying
[19:41] here some max tokens.
[19:43] And then we have these ideas of prompt
[19:46] contributors. We've talked about this in
[19:48] the last video. I think I don't know if
[19:50] I added this one
[19:52] in the previous one, but hey, you are a
[19:54] writer. You also have this persona of
[19:56] JSON output. Personas just give it away
[19:58] to say like, I don't have to bake these
[20:01] instructions into the prompt. So, the
[20:03] personas are, hey, you're a
[20:07] writer and here is the role, goal,
[20:09] backstory. What is the role? What is the
[20:11] goal? What is the backstory? This is the
[20:13] writer persona. This is just a JSON
[20:17] output prompt contributor. Making sure
[20:20] that if we get information back in a
[20:21] blog post that contains a code, we want
[20:25] to make sure we go ahead and escape it.
[20:27] So, with that, I think we have
[20:30] everything we need. Let's see if we can
[20:32] go ahead and rerun this.
[20:36] Okay.
[20:37] We see it going. So, I'm going to say,
[20:40] write me a blog post on getting started
[20:45] with Claude code, right?
[20:48] So, again, these if you missed the first
[20:51] one, that that may have flew by you, but
[20:53] we're running with Spring Shell here and
[20:56] we get
[20:58] some commands that we can run. X is like
[21:00] A, I want to execute that agent. You see
[21:03] that we gave it a string and that is the
[21:06] topic that I want to write the blog post
[21:07] on, right?
[21:09] So, we see
[21:11] tool calling here. So, we're using
[21:15] Claude Sonnet 4.6 for the research
[21:17] topic.
[21:18] The nice thing about this is when we go
[21:20] in and we define our large language
[21:22] models, I think I have just a default
[21:25] one here.
[21:26] So, we have a default one here. And then
[21:29] we have a reviewer. I have a little bit
[21:31] one that is going to
[21:33] I think a little better model to go
[21:34] ahead and review the blog post, but you
[21:36] could set up models for different tasks
[21:39] or you could set up different models and
[21:41] really have and be able to kind of go
[21:43] ahead and choose which model is best for
[21:44] that task.
[21:46] So, we see some of that that Star Wars
[21:49] in here now in the logging. Do or do
[21:51] not, there is no try.
[21:53] So,
[21:55] executing action right draft and as you
[21:58] can see, it's just going to go. This is
[22:00] I really like some of the verbosity in
[22:02] here telling me what's going on.
[22:04] So, you can kind of follow the agent
[22:06] through its actions on its way to
[22:08] achieving its goal.
[22:10] We see
[22:11] the ask LLM Claude Opus 4.6 to review
[22:14] the draft. And then ultimately, what
[22:17] we're going to get down to
[22:19] is this front matter one, right? So, we
[22:22] get all the way down this front matter.
[22:25] And in this front matter, this is going
[22:27] to achieve our goal of a published post.
[22:30] So, we are going to generate this final
[22:32] post with the front matter and we
[22:34] ultimately write it to a file so that I
[22:37] can have it here in my hard drive. So,
[22:39] let's keep going.
[22:41] Adding the front matter, so we are into
[22:44] the last action there and hopefully if
[22:47] all goes well, we will have a new blog
[22:50] post in
[22:51] uh
[22:53] Where is it? I don't know why that came
[22:55] in.
[22:57] We should have a blog post directory. If
[23:00] not, it should go ahead and write it to
[23:01] it and I see a whole bunch of text on
[23:04] here, so it looks like it worked. LLMs
[23:07] used. We see the LLMs across five
[23:09] different calls. Here's the number of
[23:11] tokens. This cost me 0.19 cents. Here's
[23:15] some tool usage. So, this is really
[23:17] important to me. I like this. I want to
[23:19] know that like things just didn't happen
[23:21] underneath the hood. We see our tool
[23:23] stats. Brave web search worked.
[23:26] We see our tool stats calculate reading
[23:28] stats. So, that's the single tool that
[23:30] we wrote.
[23:31] And I've got a bad feeling about this.
[23:34] So, let's go ahead and reload this from
[23:36] disks. There's our blog post getting
[23:39] started with Claude code.
[23:42] And we see our front matter here. So,
[23:43] our title, our slug, our reading time,
[23:46] 999 words. That's about a 5-minute read.
[23:49] I love this. I love being able to
[23:51] calculate this. This isn't something I
[23:53] have to figure out. We have tags,
[23:55] keywords we want to target. This is
[23:58] important. I haven't added an SEO action
[24:01] to this yet, but with those keywords to
[24:03] target, once you have a like polished
[24:05] post, then you can go through and say,
[24:07] okay, this looks good, but I want to
[24:09] target these keywords. Are there
[24:11] improvements we can make to this post to
[24:13] be a little bit more search engine
[24:15] optimized. So, we have our TLDR here,
[24:18] which is really nice. And then here's
[24:20] our blog post. You go through, you see
[24:21] some like code snippets, you see a way
[24:24] to get started. And this is really this
[24:27] whole blog post is around the tone and
[24:29] style that I want this blog post to be
[24:31] in.
[24:32] So, this looks good. All right, so there
[24:34] you have it. Kind of step two with
[24:36] getting started with Inbabel, being able
[24:38] to add tools and MCP servers. This
[24:40] really kind of adds some functionality
[24:42] to your agent and I hope you saw that
[24:44] like we we started out with two actions
[24:47] and we've really built upon that now.
[24:49] Like, what are the other things that a
[24:51] blog writing agent might need to do? It
[24:54] might need to write a TLDR, it might
[24:56] need to do research on the topic.
[24:58] It might need to go off and do some SEO.
[25:01] Whatever the case may be, we can start
[25:03] to build all all those actions and
[25:06] ultimately, what is the what is the goal
[25:08] there? I want a published blog post that
[25:10] I can go ahead and publish. Now, you
[25:14] could even like include like a GitHub
[25:16] MCP server and go ahead and like send a
[25:19] PR for that. I kind of like to review it
[25:21] first, but
[25:22] that could easily be something that
[25:24] sends out to a PR to GitHub and then you
[25:26] can review it there and decide if you
[25:28] want to go ahead and publish it there.
[25:30] So,
[25:31] this is really nice. I'm really enjoying
[25:33] Inbabel,
[25:34] a lot of the functionality that it
[25:36] brings.
[25:37] I like this kind of goal-oriented action
[25:40] planning.
[25:42] It makes my my job a little bit easier
[25:44] and again, I think Rod talks about this
[25:46] a lot, but this idea of determinism in a
[25:49] non-deterministic world, right? We know
[25:52] what the goal is. Here a bunch of tools
[25:54] or MCP servers, here are some actions
[25:56] you can take, but ultimately, this is
[25:59] the goal of the agent. Go ahead and
[26:01] figure all that out for me.
[26:03] So, hey, I hope you learned something
[26:04] new today. I had a lot of fun putting
[26:06] this together. If you did learn
[26:08] something new, do me a favor. Give me a
[26:09] thumbs up, subscribe to the channel and
[26:12] as always, happy coding, friends.
[26:14] Here we go. Here we go. Here we go. Here
[26:15] we go. Here we go. Here we go. Here we
[26:16] go. Here we go. Yeah.
[26:17] Here we go. Here we go. Here we go. Here
[26:18] we go. Here we go. Here we go. Here we
[26:18] go. Here we go. Yeah.
[26:19] >> [music]
[26:19] >> Here we go. Here we go. Here we go. Here
[26:20] we go. Here we go. Here we go. Here we
[26:21] go. Here we go.
[26:22] Yeah.
