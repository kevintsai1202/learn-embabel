# Devnexus 2026 - Hands on Embabel - Rod Johnson

**影片網址**: [https://www.youtube.com/watch?v=5hG2Nz4oV0I](https://www.youtube.com/watch?v=5hG2Nz4oV0I)
**影片 ID**: `5hG2Nz4oV0I`

## 影片簡介
Stay Connected, get Devnexus News and Updates - https://atlj.ug/YTConnect********************************************************************************This...

---

## 影片逐字稿 (Transcript)
[00:07] In this case, there's going to be zero
[00:09] slides and lots of code. Uh, and I'm
[00:13] going to start at the very beginning in
[00:15] terms of how you get started and do the
[00:17] simplest possible thing within Babel.
[00:19] And hopefully we'll get up to some
[00:20] interesting stuff like agentic rag and
[00:23] obviously more complex workflows. So we
[00:27] are starting here from um you should be
[00:31] aware of the embabel agent repo on
[00:34] GitHub. That's the core framework repo.
[00:37] The framework itself has a number of
[00:39] subm modules and there's also numerous
[00:42] other repositories. So things like for
[00:44] example with rag the neo store is a
[00:48] separate um subm module as the is the pg
[00:51] vector store. So, you know, go to have a
[00:54] look at um in Babel on GitHub and
[00:56] there's a lot of stuff out there.
[01:00] Specifically,
[01:01] uh one other thing I will say is the
[01:03] documentation is also pretty good. So,
[01:06] this is the current version of the
[01:08] documentation or our documentation has
[01:11] lots of code samples. It has every
[01:14] example in both Java and uh Cotlin. So
[01:19] regardless of which um JVM language you
[01:22] program in, we still love you and we're
[01:24] committed to ensuring that the framework
[01:26] is really idiomatic in both languages.
[01:30] If you're a Java developer, as I imagine
[01:32] most people are here, honestly,
[01:36] you would not be able to tell that the
[01:38] framework's written in column. You will
[01:39] not see a single KT import. You will not
[01:43] see a single companion uh import. it
[01:46] will be completely idiomatic from Java.
[01:49] Another way of learning in Babbable is
[01:51] using the inbabel guide. So, uh, one of
[01:55] our developers, Jasper Blues, has built
[01:58] a chatbot, which is also an MCP server,
[02:01] open- source, of course, and it
[02:04] vectorizes our documentation and puts it
[02:08] into Neo, and you can actually talk to
[02:10] it about imbabel, and it also
[02:13] illustrates our agentic rag. It's
[02:16] interesting I think now that um you know
[02:20] chat bots are such an important source
[02:23] of information it makes document quality
[02:26] documentation doubly important. So you
[02:29] know it's always been important but even
[02:31] more so um today. Okay where we're going
[02:35] to start is with a different project
[02:37] also at imbable called Java agent
[02:41] template. This as you can see here is a
[02:44] GitHub template repository. So you can
[02:46] click on that and you can create a new
[02:49] repository in your own account or
[02:52] organization
[02:54] uh which will be based on our template.
[02:57] So we have two versions of this. We've
[02:59] got Java agent template and Cotlin agent
[03:02] template. All the code that I'm going to
[03:04] show today is Java. So when you create
[03:09] your own project, you will end up with
[03:12] something like this. It is a standard
[03:15] Maven project. Obviously, you might
[03:18] prefer to use gradal. We work fine with
[03:21] anything. But as you can see here, the
[03:25] um this is bog standard spring boot. So
[03:28] we're using the Spring Boot starter
[03:30] parent version of uh 3 511. There are
[03:34] some compatibility issues with Spring
[03:36] Boot 4 um that hopefully will be
[03:39] resolved um fairly soon. So, Spring 3
[03:43] 511
[03:44] and all you really need to do is add
[03:47] some of our starters. It's good practice
[03:49] to pull out a properties uh properties
[03:52] for imbable version. We're currently
[03:54] 034.
[03:57] We aim to get to 1.0 probably early
[04:01] April. We should have and this is
[04:04] important for to consider in adoption.
[04:07] We should have a API freeze within a
[04:11] couple of weeks. So that after that it
[04:13] will just be you know bug fixing and
[04:14] tidying up. There are already people
[04:16] using imbabel in production. So on um
[04:20] probably I would say versions 32
[04:23] onwards. Uh but 34 is you know a good um
[04:27] you can use the snapshots if you want
[04:28] but 34 is in Maven repo and it's pretty
[04:32] good solid release.
[04:34] So now we're as you would expect with
[04:37] Spring Boot we bring in starters. So
[04:40] you're always going to need the agent
[04:42] starter that's the core framework but
[04:44] that doesn't give you any LLMs. in order
[04:47] to talk to LLMs, you will need to have
[04:51] the spec LLM specific um starters. So in
[04:54] this case, there's a profile. So if an
[04:57] open AI environment key is set, um you
[05:00] get open AI and if the enthropic API key
[05:04] is set, you'll get clawed models as
[05:06] well. So once you've got these starters
[05:08] in, inbable will automatically recognize
[05:11] the providers and automatically register
[05:14] some models. Um, you can also create
[05:17] additional LLMs as beans, um, if you
[05:21] wish. We support everything that Spring
[05:23] AI supports, which is pretty much
[05:25] everything out of the box. Um, but we do
[05:29] do some extra things with models. So,
[05:31] for example, if you connect to um, OAMA,
[05:35] we can actually enumerate all the models
[05:37] that it's providing. Same with Docker
[05:39] local models. And we also have some
[05:42] metadata about well-known LLMs which are
[05:45] quite important. So we have metadata for
[05:47] knowledge cutoff
[05:49] um which is really really important and
[05:52] also pricing model. So which enables the
[05:55] agents to track how much they're
[05:57] costing. Okay, it's pretty easy to set
[05:59] up. Now you would have a
[06:04] spring boot application. Absolutely
[06:05] nothing inbable specific on that. Our
[06:08] starters will make it doable stuff. So
[06:10] let's do the simplest possible thing you
[06:12] can do with imbabel which is inject the
[06:16] imbable AI interface. So let's suppose
[06:20] we just want to do a simple agent loop,
[06:23] right? We want to do some tool calling.
[06:25] Um we're not building a complex
[06:27] workflow. We're doing a simple agent
[06:29] loop. All we need to do is inject the AI
[06:32] interface. This gets us into our core um
[06:36] programming model. So here you can see
[06:39] using AI we say with default LLM you can
[06:43] configure the LLM in properties but you
[06:46] could also change it to be for example
[06:50] with lm limb by roll fubar and you could
[06:54] define the fooar ro in your properties
[06:57] file. Um or you could if you wanted to
[07:00] do you could say with um LLM and
[07:05] actually specify the model. So you could
[07:08] say GPT4.1
[07:10] mini. It's not a good idea generally to
[07:13] ask for the model specifically. I think
[07:15] it's really good to mediate it through
[07:16] the concept of ROS, right? Because then
[07:19] you can change in one place where you
[07:22] set up your models. Okay, so let's go
[07:24] back to this FU. I have a feeling fooar
[07:28] won't work. So I'll go back to the
[07:30] default LLM. And now as you can see we
[07:33] have a fluent API for working with what
[07:37] we call a prompt runner. So when we
[07:39] specify an LLM we are now in a prompt
[07:43] runner. We can give the particular
[07:44] invocation an ID. That is good practice
[07:48] to make your logs more readable. If we
[07:50] don't do that we'll see something in the
[07:52] logs about like animal.invent animal.
[07:55] And if you're making multiple LLM calls
[07:57] within one method, that might get pretty
[08:00] um nasty. But the fluent API is strongly
[08:04] typed. So here in this case, we said we
[08:06] want to create animal class. Remember
[08:09] what I said in the keynote about
[08:10] structure. As far as possible, you
[08:14] should in when um using Genai in
[08:18] business processes, you should return
[08:21] structured objects rather than just
[08:23] text. LLMs are very good at it. There's
[08:26] a pretty complicated dance underneath
[08:29] where um Spring AI and Inbable emit the
[08:33] JSON schema description and send it up
[08:36] to the LLM. So the LLM knows what to um
[08:40] return. But you know in reality with
[08:43] modern models they are really really
[08:45] good at returning structured output. So,
[08:48] um it's likely to work very very well
[08:51] because it's strongly typed. We're able
[08:54] to specify examples. How many people
[08:56] know what um zeros versus few shot
[09:00] means?
[09:01] Okay, this is a core AI concept. Um
[09:05] there was a famous paper a few years
[09:07] back that noticed that um examples
[09:11] really make models more accurate. So
[09:13] it's a very good idea if you are working
[09:17] with a particular um operation to give
[09:20] the model some examples of potentially
[09:23] things that are good and things that are
[09:25] bad. Well, the traditional way to do
[09:27] that is to like just put JSON because
[09:31] remember the model is going to be
[09:32] returning JSON. Put JSON hardcoded in
[09:34] your prompt. But that's not really very
[09:36] nice. So this shows you one of the
[09:38] benefits of our strongly typed API
[09:40] because we know we're creating animal
[09:43] class. We now with example is strongly
[09:47] typed. So you've described the example
[09:50] and then you actually have the correct
[09:52] type. We've put a lot of effort into a
[09:54] very type- safe API and I think um it
[09:58] has a lot of benefits. So in this case
[10:00] the examples we're giving are to
[10:03] indicate the kind of things that will
[10:04] pass validation.
[10:07] Finally we are going to specify a
[10:10] prompt. So in this case the prompt is
[10:13] static. But notice that the prompt is
[10:16] created inside a method rather than say
[10:18] as in lang chain for J where it's
[10:20] typically in an annotation. It is much
[10:23] better to create prompts inside methods
[10:25] because you obviously have access to all
[10:28] the types that are in scope. So, you
[10:31] know, you want structured output as far
[10:33] as possible, but you also want to build
[10:36] your prompts using structures you've
[10:38] already got. And obviously, it's really
[10:40] easy to do that when you're doing it in
[10:41] a method. If you wanted um to
[10:47] externalize the prompt, we do have
[10:49] support for that. And we have a template
[10:52] renderer which is pluggable. The default
[10:54] implementation is ginger. J I N G J A
[10:59] which is the de facto standard in the
[11:01] Python world for uh prompt templates.
[11:04] The reason we chose that is firstly I
[11:06] think ginger templates are pretty
[11:08] readable for the kind of things you need
[11:09] to do in prompts and secondly
[11:13] um
[11:15] there is prior art out there. There's
[11:17] quite a lot of prompts that you can
[11:19] already use. That's why we didn't choose
[11:21] something like mustache uh which isn't
[11:23] really used in the Python world. I am
[11:26] generally reticent to externalize
[11:28] prompts. The reason being, as I said
[11:31] this morning, prompt engineering is
[11:33] thoroughly evil and you are best to
[11:36] avoid it. If your prompts are quite
[11:38] small because you're doing very specific
[11:40] tasks, you don't actually need to change
[11:42] them very often. So therefore, it's
[11:45] totally fine having them in code. And of
[11:48] course, if you have them in code, they
[11:50] are type- safe. Neutly in Java, they're
[11:52] not wholly type- safe because Java
[11:53] doesn't have interpolated strings, but
[11:55] don't start me on that. I was So,
[11:57] actually, to be perfectly honest, I
[11:59] switched from mainly programming in Java
[12:01] to mainly programming in Cotlin when
[12:04] they took um string templates out of
[12:07] Java and I had to I think change 75
[12:10] places in u my codebase. But anyway, I
[12:13] digress. Let's get back to imbable. So
[12:17] this is literally the simplest thing we
[12:19] can do. We have injected the AI
[12:22] interface. We've chosen an LLM. If we
[12:25] want, we could specify hyperparameters
[12:27] here as well. So hyperparameters are
[12:29] things like temperature, u max tokens,
[12:33] um all of those things are exposed in a
[12:35] portable manner. And we're going to
[12:36] create a particular type. So let's have
[12:39] a look at animal class. Animal is a
[12:44] record. But notice that animal has on it
[12:48] a um
[12:51] validation
[12:53] um Java beans validation annotation. So
[12:56] it is possible to annotate that in in
[13:01] Babel if it sees such annotations on a
[13:04] structured type. It will actually
[13:08] validate when it gets it back and it
[13:10] will inform the LLM about the validation
[13:13] rules automatically. So even though I
[13:15] put in those examples in the code about
[13:19] um good example and bad example, it'll
[13:21] almost certainly work all the time
[13:23] without that because um it actually is
[13:27] sending to the LLM the validation rules.
[13:29] As far as I know, other frameworks don't
[13:32] do that. I I'm not aware of another one
[13:35] doing it. Okay, let us run this thing.
[13:38] So when we start up the um start up the
[13:43] shell, you will see that most of our
[13:46] simpler examples are based around spring
[13:48] shell.
[13:50] >> Yes.
[13:51] >> What was wrong with the bad example?
[13:52] What was
[13:53] >> um it didn't pass that validation rule.
[13:55] So the validation rule is species must
[13:58] contain ox. And so fluffox is good but
[14:03] sparky is bad because sparky doesn't
[14:06] contain ox. Yep. Um, so our simple
[14:10] examples use Spring Shell. It's a really
[14:12] convenient way to get up and running.
[14:15] It's also really easy when you're
[14:17] developing to add like Spring Shell
[14:19] commands uh and just very quickly have
[14:22] something to work with. So you can see
[14:25] here the um
[14:28] there should be a shell command some
[14:31] here that ex somewhere that exposes
[14:33] this. So
[14:35] here we have shell method. This is on
[14:38] something that's annotated with spring
[14:39] shell component. We have shell method
[14:42] animal and it basically calls that
[14:45] method. It's just the this class the
[14:48] injected demo is just injected with
[14:50] spring as you normally would inject
[14:53] anything. So you might have noticed when
[14:55] it came out that we saw Yoda. The reason
[14:59] for that is that our logging is
[15:02] completely pluggable. I did with InBabel
[15:05] something I wanted to do this to spring
[15:07] but it was already too late to retrofit
[15:09] it which is have logging based on
[15:12] events. So in imbabel all info level
[15:16] logging is based on events that are
[15:19] emitted and this is a really really good
[15:22] discipline because you can pass those
[15:24] events over the wire. We've got SSE
[15:26] support for it. It's really quite
[15:28] powerful and also you can respond to
[15:31] particular events in your own code but
[15:34] you know it enables some cool stuff with
[15:37] respect to logging. Um this one is the
[15:39] Star Wars logging and you can configure
[15:41] the logging personality
[15:44] um in your properties or application
[15:47] YAML file. U my personal favorite is
[15:50] severance. I don't know how many people
[15:52] have watched that show. I love how how
[15:55] many severance watchers? Oh, it's almost
[15:57] enough to switch to severance logging.
[16:00] Uh, everyone knows Star Wars, but Oh,
[16:03] yeah. Let's Let's do it. Um,
[16:06] so,
[16:08] um, so now we've got our ah there Lumen.
[16:12] Um,
[16:15] the music dance experience is officially
[16:17] cancelled. Uh, and we're in optics and
[16:19] design. Um, okay. Let us type in animal
[16:23] and see what it does.
[16:26] So we get pretty um pretty detailed
[16:30] logging by default in in Babel. If you
[16:33] want even more detailed logging, there's
[16:35] a couple of things you can do. One thing
[16:37] you can do is configure the options for
[16:39] your agent process. Another thing you
[16:41] can do is you can go to debug logging.
[16:44] So as I said, the core info logging
[16:47] comes out of the events, but every
[16:49] package has its own like debug logging.
[16:51] So you can turn that on for a particular
[16:53] package or class if you want. So here
[16:56] you can see that it created an animal
[16:59] for us. Sorry. Um
[17:02] it created an animal forest glimmer wing
[17:06] which is of the species lum lumifox
[17:09] luminox which is okay because it's got
[17:11] ox um in it. So you know this is very
[17:15] very simple but already really quite
[17:18] useful. These are not workflows, but
[17:20] you've totally got if you want aic tool
[17:23] loop tools that you can use in this. So
[17:26] you could add a number of tools that the
[17:27] LLM will use. That prompt runner
[17:30] interface that we got into through AI is
[17:33] really um really useful. Let's now go to
[17:37] what we consider a true agent, which is
[17:40] basically a workflow. So this is the
[17:44] write and review agent. Um, this is that
[17:48] big enough at the back? For some reason,
[17:50] the font seems a little smaller. Yeah.
[17:52] Okay, cool. Um, so what this is going to
[17:56] do is something a little bit more
[17:58] elaborate. So, when you create a agent,
[18:05] one of the first things I like to do is
[18:07] think about the nouns rather than the
[18:09] verbs. Think about the domain model that
[18:11] your agent will use. This typically
[18:15] falls into two types of things. One is
[18:18] real domain objects that already that
[18:20] hopefully already exist and that's
[18:23] awesome when you can leverage that and
[18:25] that's one of the reasons that it's
[18:26] makes a lot of sense to do this in Java.
[18:29] The other type is objects that are used
[18:33] for LLM returns just to provide
[18:35] structure. You can make them private um
[18:39] and that will work. Obviously, you
[18:40] should reduce the visibility. it will
[18:42] still work in the framework um if you do
[18:45] that. So in this case we only really
[18:47] have meaningful domain objects but I
[18:50] find that pattern occurs quite a bit
[18:52] where you like basically group a bunch
[18:54] of things together to get a structured
[18:57] return um but they're not like you know
[18:59] part of your public API. In this case,
[19:03] what it's going to do is write a story
[19:07] about a topic that we give it and then
[19:11] it is going to use another call to
[19:14] review that story. So, you know,
[19:16] simplest example of a um a genetic
[19:19] workflow you can have where you've got
[19:21] two calls.
[19:23] Now, let's think about the flow here.
[19:26] Remember how I said in Babel does
[19:28] deterministic planning? Well, off the
[19:30] top of our head, I think we know that in
[19:32] order to be able to write a review of a
[19:34] story, we need a story, right? So, like
[19:36] you can see how the planner in this case
[19:39] can look at the types of the action
[19:41] methods and say, I need to call first
[19:44] the craft story method and then the
[19:48] review method. So, we've got our simple
[19:51] u domain objects which are records. Um,
[19:54] and let's have a look at the actual
[19:57] type. So we have to annotate our um
[20:03] agent with at agent um or at im inbable
[20:09] component if that has a slightly
[20:12] different meaning but basically the two
[20:14] of those either of those indicates that
[20:17] there are going to be action methods and
[20:19] goals that are annotated on this class.
[20:22] Of course, you can create actions and
[20:23] goals programmatically, but you don't
[20:26] tend to it tends to be easier to use the
[20:29] annotation model. At agent is a spring
[20:33] um component annotation. So, I don't
[20:36] know how many people are familiar with
[20:38] the meta annotations in spring. I don't
[20:40] know when they came into the framework.
[20:42] They're super cool. Um probably I guess
[20:45] late, you probably know this, Jeremy. Uh
[20:49] >> around 2.5.
[20:51] Okay. Yeah. So quite a while ago. So
[20:53] basically you know how in spring you've
[20:56] got at component and at service and at
[20:58] controller
[21:00] at controller is an at component because
[21:04] it itself is annotated with the at
[21:06] component annotation. So when we have at
[21:09] agent or at imbabel component it also
[21:13] says to spring hey this is a bean do
[21:15] your spring magic stuff to it. So
[21:18] obviously all of our embabel components
[21:20] get injected by spring. In this case you
[21:23] can see that we've um injected it with
[21:28] um a couple of value parameters that
[21:30] we've externalized in our properties
[21:32] file. So we've put a lot of effort into
[21:35] ensuring that externalization
[21:37] um works nicely with core imbable
[21:40] things. So for example, if you have LLM
[21:43] options that specify the model, the
[21:45] hyperparameters, you can actually
[21:48] externalize them into application YAML
[21:50] or application properties and they will
[21:52] work really really well.
[21:55] >> Question
[21:57] will still work if you want the Java.
[22:02] >> Um yes, absolutely. Yeah, I mean this
[22:05] this is just a spring beam, so yeah, it
[22:07] will work exactly the same. Yep. Yeah,
[22:10] we use in most of our examples, we do
[22:12] use a fair bit of Java um config in the
[22:15] more complex examples. Okay, so now
[22:18] we've got our agent. Let's actually ask
[22:22] the shell about itself. So, let's ask it
[22:25] some of the things it knows. Tools.
[22:28] Um, it only has the out of the box
[22:32] tools. It's not connected to MCP. So, it
[22:35] has Apple script tools and it has math
[22:38] tools. that come out of the box. It
[22:41] knows that I'm on OSX, so it has the
[22:43] Apple script um tools. You can easily
[22:46] consume MCP tools and you can easily
[22:48] write your own tools and I will get to
[22:50] that. But let's ask what models it has.
[22:54] So here you can see that it has both um
[22:58] anthropic and open AI models. It's got
[23:03] the current popular ones and you can add
[23:06] more if you want or you can add
[23:07] different starters to get O Lama or
[23:10] whatever. Let's ask it what agents it's
[23:13] got. So it's got write and review agent
[23:18] which we just saw there and it's showing
[23:21] us information about the planning um of
[23:24] that agent. Let's ask what actions it
[23:26] has.
[23:29] It actions are review story and craft
[23:32] story. So inbable really is designed to
[23:36] know about the capabilities that are
[23:37] deployed to the server. The reason for
[23:40] that is that planning capabilities can
[23:43] extend when you add more actions or more
[23:46] goals. So it can literally find paths to
[23:49] do things it couldn't do before when you
[23:51] add more capabilities. I think that's a
[23:53] that's a pretty different concept to
[23:56] other um frameworks. Um right. So um
[24:02] your audi is kind. Um let's run the
[24:07] right let's look again at the write and
[24:09] review agent.
[24:11] So we've got if we don't have actions
[24:14] and we don't have we need multiple at
[24:17] least one action and we need at least
[24:19] one goal for an agent to be useful. So
[24:23] the first thing action here is craft
[24:26] story. So it is its preconditions can be
[24:32] inferred by the fact that it takes a
[24:36] user input
[24:38] and its post condition is story. So
[24:41] those are going to be stored in the
[24:43] blackboard. If you look at the AI um
[24:46] parameter that is not a precondition. So
[24:49] the way in which this works is kind of
[24:51] like method injection. It's a bit
[24:52] similar to Spring MVC. You know how in
[24:55] Spring MVC you can if you want you can
[24:58] um use the serlet uh inject the HTTP
[25:02] serlet or whatever it is some of those
[25:04] things um and that uh so that's just
[25:07] automatically provided by the platform.
[25:11] So this basically corresponds to a
[25:14] precondition
[25:16] of um user input and the postcond
[25:18] condition of story and we should see it
[25:20] here. Actions um so craft story name you
[25:25] can see preconditions
[25:28] um that it hasn't run before by default
[25:30] actions can run only once in a workflow.
[25:33] Um user input is true um and that there
[25:37] isn't a story because it wouldn't need
[25:39] to run. So and the post condition um is
[25:43] that the story will be true. Now let's
[25:47] have a look um at the
[25:51] other action which is review story. This
[25:57] takes user input and the story and again
[26:01] the AI parameter that you're just going
[26:03] to use to call um things. So this can
[26:06] only run after the first one's run and
[26:08] obviously the objects that were already
[26:10] in the blackboard are still available.
[26:11] So user input is still available. Notice
[26:14] also it is annotated with at achieves
[26:18] goal. So this is a shorthand that
[26:21] basically says we have a goal that
[26:25] corresponds to the output type of this
[26:28] action. So if we ask the shell what
[26:30] goals we have, it will tell us
[26:34] um so goals, we have one goal and you
[26:39] can see the precondition is that it's
[26:42] run that it's got a user input. Um it's
[26:45] got and it's got a story and it's got a
[26:47] reviewed story.
[26:49] Let's actually run it. Um what do we
[26:54] want a story about?
[26:57] >> About Is that achieves goal annotation
[27:01] singular or could you repeat that with
[27:03] separate goals?
[27:04] >> Um, you can repeat it with separate
[27:06] goals. Yes. Yep. Usually you do one in
[27:10] an agent.
[27:14] >> No. Um, so basically there's no there is
[27:19] not really except for the convenience
[27:21] annotation. There's not a relationship
[27:23] between action and goal. So that's just
[27:25] a convenience annotation that says,
[27:27] "Hey, we're make a goal from the this
[27:31] action being able to be executed, but
[27:33] they're fundamentally different things.
[27:35] Actions have preconditions and expected
[27:38] postcond conditions. Goals have only
[27:41] preconditions." Preconditions are
[27:43] absolute. So for example, we can't
[27:45] review a story unless we have a story.
[27:48] Post conditions are, you know, hopeful
[27:53] expectations. So maybe you ran the craft
[27:56] story and it didn't work. So the planner
[27:59] will check after each um action
[28:02] execution to see if the expected post
[28:04] conditions have been achieved. But I you
[28:08] can see how this planning algorithm can
[28:11] work through chaining the expected uh
[28:15] pre and post conditions towards a path
[28:18] to the goal. Actions also can have
[28:21] costs. So it's costs can either be
[28:25] specified in the annotation as a
[28:27] constant or they can be dynamically
[28:30] calculated which means that unlike say a
[28:32] state machine potentially if there are
[28:34] multiple routes to a goal it could
[28:36] choose a different route at runtime. So
[28:40] imagine for example that a particular um
[28:43] thing requires calling a service that's
[28:45] under very heavy load. Maybe you call
[28:47] three other services that's normally
[28:49] more expensive, but like the thing that
[28:51] you know you're under is under heavy
[28:54] load, you push up its cost to extremely
[28:57] high. One thing that we're actually
[28:59] probably at some point we'll test out,
[29:01] we'll simply be using average latency as
[29:04] a proxy for cost. I think that could be
[29:06] quite um interesting. So, what do we
[29:09] what are we going to have a story about?
[29:15] Oh, really?
[29:17] A tech conference in Atlanta. Um, notice
[29:21] that we haven't set up any rag at this
[29:25] point. Um, so, you know, this is just
[29:28] working from general knowledge. And
[29:30] there we are. So, the brisk and
[29:32] imaginative. So, that's a review. At the
[29:34] heart of Atlanta's bustling tech
[29:36] conference, mayor discovered a
[29:38] mysterious device humming beneath a
[29:40] booth, etc. Um, this brisk and
[29:43] imaginative tale captures the vibrant
[29:46] energy of a tech conference. Really?
[29:49] Okay. Um,
[29:52] so to make to show that this is a real
[29:54] demo, I'm going to make a couple of
[29:55] changes here. So, generate text, you'll
[29:58] be given a short story to review. Um,
[30:01] okay. So, let's do this. Let's
[30:06] um
[30:08] No. Why is my caps lock not working?
[30:12] You are a notoriously harsh and a Serbic
[30:16] critic critic. Your sentences are short
[30:21] and your judgments harsh.
[30:25] Um, okay. Let's let's try that. Um, and
[30:30] let's maybe change for the writing the
[30:33] story. Let's make the story really quite
[30:35] wacky. So we've put the temperature here
[30:38] hyperparameter for temperature at 7.
[30:41] Let's make it 1.3.
[30:43] And it's generally depends on the model,
[30:47] but with open AI models, temperature
[30:49] above 1.4, it eventually spins off into
[30:53] a mixture of Python and C. Um 1.3 is
[30:57] going to be pretty wacky. Um but you
[31:00] know, we should see something different.
[31:02] Um and
[31:04] okay so I had to restart it obviously
[31:06] for that right actually if I do bang
[31:09] bang spring um shell will run it again
[31:13] so let's see
[31:19] this story sputters rather than ignites
[31:21] the tech conference setting is a cliche
[31:24] backdrop laden with tired tropes like
[31:27] coding wizards okay at the heart of
[31:30] Atlanta's sprawling tech conference Maya
[31:32] discon disconnected her prototype VR
[31:34] goggles amid a sea of buzzling in
[31:37] buzzing innovators. A vibrant collage of
[31:40] coding wizards and digital dreamers.
[31:43] This is I mean I much prefer this
[31:45] review. This is a limp tech fantasy that
[31:47] neither engages nor illustrates.
[31:52] Um so very easy um to use um API and
[32:00] let's now get a little bit fancier by
[32:04] asking it to show its planning and
[32:07] prompts in details. So write and review
[32:12] a story about garbage compactors.
[32:18] I don't know. I have absolutely no idea
[32:20] what made that come into my head. Um, so
[32:24] now we're seeing the complete prompt um,
[32:28] information as well as full planning
[32:30] information. So once we get the end, uh,
[32:33] we can go back and look at how it did
[32:35] it. A contrived fantasy drenched in neon
[32:37] cliche. I love this.
[32:41] This tale about anthropomorphic garbage
[32:44] compactors tries way too hard to be
[32:46] profound.
[32:48] The poetic conceit of discarded dreams
[32:51] is over wrought and ental.
[32:55] Okay, let's let's see how this um
[32:59] occurred. So we're going to look at the
[33:03] output the detailed prompt output and
[33:05] planning output in conjunction with the
[33:07] code so that we fully understand what it
[33:09] did. Okay. So it created an agent um and
[33:14] it's an instance of the agent that we
[33:17] have. You get your each agent process
[33:19] gets its own instance and it gets its
[33:22] own blackboard. So this is just showing
[33:26] what the goals etc and conditions of
[33:28] that agent were. So the very first thing
[33:31] it did was plan. So ready to plan from
[33:35] this world state. So it's showing you
[33:37] the world state. Basically everything in
[33:39] the world state is false except for user
[33:42] input. Right? That's what we would
[33:44] expect. It knows how to calculate the
[33:47] world state from all the types instances
[33:51] that are expected and also from any
[33:54] specific conditions you might add
[33:55] yourself. You can actually implement
[33:57] your own condition methods if you want
[33:59] with that condition. So for example, if
[34:01] you wanted to do that by looking at the
[34:04] state of an external service, you could
[34:06] do that. Um, so it's chosen a plan. So
[34:11] it's formulated a plan. Um, and its plan
[34:16] is craft story followed by review story.
[34:19] So it's worked out what order it needs
[34:21] to run things in. Um, and now it's going
[34:24] to go run the first one. So here you can
[34:27] see that it's made under the covers of
[34:31] Spring AI chat model call to GPT4.1 mini
[34:35] which is our default LLM and these are
[34:38] the messages that it is sending. The
[34:41] first message is a system message which
[34:44] has um the current date and the
[34:47] knowledge cut off of the model as well
[34:50] as some information that came from our
[34:53] own prompt. So knowledge cutoff is
[34:57] really really important um because LLMs
[35:01] don't know the current date obviously
[35:04] unless you tell them and they also don't
[35:06] know their own knowledge cutoff um so
[35:09] this is one of the reasons that we have
[35:11] metadata for particular models so we are
[35:14] able to put in that information um for
[35:19] the LLM to know it won't make any
[35:22] difference for this um Of course, like
[35:25] the story, there's no tools available,
[35:28] but for example, if you wanted it to do
[35:31] any kind of searching, it's absolutely
[35:33] critical. So, a little while back, I
[35:37] asked before we had this capability
[35:40] through the API, um, tell me about the
[35:43] recent Australian federal election. And
[35:45] it cheerfully told me about the 2022
[35:47] federal election because as far as it
[35:49] was concerned, it's the most recent one.
[35:51] I mean, it's logical enough. um even
[35:53] though we'd had one a few weeks earlier.
[35:56] Soon as you put in the knowledge cutoff,
[35:58] it solves that and it will drive tool
[36:00] use correctly. You can also see there's
[36:02] a bunch of generated stuff here which is
[36:05] around the schema um to tell the LLM
[36:08] what to return. And then we have the um
[36:14] user message which is the instruction.
[36:17] Um
[36:19] most of you are probably aware but the
[36:21] way in which LLMs work is completely
[36:23] stateless. So every interaction with an
[36:26] LLM you pass a list of messages.
[36:28] Typically the first message is a system
[36:31] message and then there are user messages
[36:35] which are instructions or conversation
[36:39] dual methods assistant messages if
[36:41] you're using a conversation and tool
[36:44] messages which show that the LLM has
[36:48] called a tool and the results that it
[36:50] got. In this case it's very simple.
[36:52] There's only system message and user
[36:54] message. So it executes that. it comes
[36:57] back and now it replans and decides that
[37:00] it can actually do the review. Um, and
[37:03] you can see that the prompt has been
[37:06] built up here through um through our
[37:10] code. Okay, let's try something a little
[37:14] bit um more interesting where we
[37:16] introduce tool use. So tool use was a
[37:20] transformational
[37:22] um technology when it first appeared a
[37:24] couple of years ago and tool use enables
[37:28] LLMs to interact in real time. So for
[37:32] examp the classic example of this is
[37:33] weather service. So if you ask the LLM
[37:38] what is the weather in Atlanta
[37:42] if you've given it the current date it
[37:44] can probably guess the average for this
[37:46] time of year. So that will already
[37:48] improve things but obviously it has no
[37:50] ability um innately to know what it is.
[37:54] So you provide it with a list of tools
[37:57] that it can call. So essentially you
[38:00] would say I have a weather service tool
[38:03] for you. Call it with the location if
[38:05] you need. So now the LLM will call that
[38:11] tool. So it'll come respond to the first
[38:14] message with give me the weather
[38:16] location Atlanta. Um and then once it's
[38:20] got that response it will generate a
[38:22] final result. So the tool calling dance
[38:26] is in fact a dance because these
[38:28] interactions are stateless and when you
[38:32] use any framework what it's doing under
[38:34] the cover with any tool calls is
[38:36] concealing that for for you. So for
[38:39] example, it's not unusual the multiple
[38:41] tool calls to occur within a single
[38:45] logic loop that is concealed for you by
[38:48] the framework. We go a step further in
[38:50] imbable as I mentioned this morning
[38:52] where we actually can rewrite the tool
[38:54] calling history to enable fancy nested
[38:57] tools. But just be aware that there is a
[38:59] bunch of magic in any framework that is
[39:01] occur occurring there because LLMs are
[39:04] inherently stateless. So this one is a
[39:08] different
[39:10] um slightly more complex example where
[39:14] it's going to be given a person's name
[39:16] and star sign and it is going to um
[39:24] find their horoscope for today using a
[39:26] tool. it is going to um
[39:33] look up current news relating to things
[39:35] that are relevant to that horoscope and
[39:37] then given the relevant news items and
[39:39] the content of the horoscope itself it's
[39:41] going to write up a funny summary. Uh so
[39:43] it again it's combining multiple things
[39:46] towards that final goal. So let's ask
[39:50] what this is a different project. This
[39:52] is in babel agent examples and it
[39:55] contains examples of a number of things.
[39:57] Uh we also have a cotlin um form of this
[40:01] as well. So our final goal here is the
[40:04] write up and the write up has a star
[40:07] person which is a simple uh person with
[40:10] name and star sign relevant news stories
[40:14] um and a horoscope.
[40:17] How do we get there? Well, we have to
[40:20] make multiple calls to get there. So,
[40:22] let's try this. Linda is a Scorpio. Fine
[40:27] news for her.
[40:30] So, it's going to create a plan where
[40:33] the very first thing it will do is
[40:34] extract a star person from the input.
[40:38] So, in this case, we've got the name and
[40:40] the star sign. So, it's able to do that.
[40:42] If it can't do it, there's another
[40:44] route, and we will get to that in a
[40:46] minute. So now it's starting to call
[40:48] tools. You can say it's calling to a
[40:50] brave new search with arguments,
[40:53] relationship advice, relationship gifts.
[40:56] Okay. I wonder what it said in the
[40:57] horoscope. Um and okay. Ah Scorpio Linda
[41:02] today your horoscope remains a
[41:04] mysterious enigma as elusive as your
[41:06] ability to resist etc etc. Um so
[41:11] the
[41:12] order of operations it did will be
[41:15] clearer if we run it again with the
[41:20] planning on so with the dashp Scorpio
[41:23] fine news for her
[41:28] so it's created a plan uh here so its
[41:32] plan was um
[41:36] extract star person retrieve retrieve
[41:38] horoscope, find news stories and then um
[41:42] do the write up and again it's been able
[41:44] to infer this by the methods. So let's
[41:48] have a look at extract star person which
[41:51] is the first thing that it did. Oops.
[41:56] Extract star person. So this takes user
[41:58] input which is a special um type that we
[42:01] have for you can guess what it is. um it
[42:05] uses a good LLM. Um in this case the
[42:09] roles are set up in application.yml.
[42:12] So if you have a look in application.yml
[42:16] you will see is best of
[42:21] um oh maybe that's in
[42:22] application.properties. I think this one
[42:24] has both. Um so it uses an LLM that
[42:28] we've externalized and it calls create
[42:31] object if possible. So this is something
[42:34] that I don't know if it's supported in
[42:36] other frameworks. It's not supported in
[42:38] Spring AI as far as I know where it
[42:41] basically tries to create an object and
[42:45] returns null if it can't do it. It's
[42:48] actually can be quite useful
[42:49] particularly with this idea of
[42:51] rereading. So when if it fails to do
[42:55] that the post condition of this method
[42:58] will not be true. So this method
[43:01] actually we should make this clearer. Um
[43:06] I must say I have programming in Cotlin
[43:09] has made me um really pretty keen on
[43:13] nullability annotations. So this would
[43:16] make it more explicit because that's
[43:17] really what's happening. So then once
[43:20] it's done that it got can find news
[43:24] stories. So this one here, you can see
[43:28] we're adding a tool group.
[43:32] So this means that you can expo have web
[43:35] tools for use in this step. Notice that
[43:40] as I said this morning, it's really good
[43:42] practice to break things up into
[43:43] multiple steps. If you break them up
[43:45] into multiple steps, each of your
[43:47] prompts is pretty small. And also you
[43:50] provide only the tools that you need. So
[43:53] the other steps in this process like
[43:55] writing up doesn't need access to the
[43:57] web. Um you only provide the tools that
[44:00] are necessary. You can also add um tools
[44:04] that you create in Java. So for example,
[44:07] you could do something like this. Plus
[44:11] FUBA.
[44:32] Um,
[44:37] public string shouldn't ever program in
[44:40] more than one programming language at
[44:41] once. Um,
[44:49] okay. So, if we had something like that
[44:52] that had multiple
[44:54] um tools on it, um, we could simply add
[44:59] it here. So for example with tool object
[45:04] new
[45:06] fuba
[45:08] uh so it's one of the people get really
[45:11] excited about MCP tools and by the way
[45:14] the u web search here is an MCP tool um
[45:19] and I mean MCP is obviously very
[45:21] important interop standard but in
[45:24] enterprise tools that you create
[45:26] yourself based on your own services or
[45:29] even on your own domain object objects
[45:31] are really powerful because notice for
[45:33] example you could conditionally add that
[45:36] tool object. What I find very often is
[45:39] that um I create a list of tool objects
[45:42] and add to that list based on um the
[45:46] present state.
[45:48] Any questions about that? I'll just show
[45:51] a couple more things. So, the write up
[45:52] requires the star person, relevant news
[45:55] stories, and the horoscope, and it puts
[45:57] it all together into one pretty big
[45:59] prompt. So, you will see the final
[46:02] prompt will actually um be uh fairly
[46:07] big. Um so, Linda, the horoscope. Whoa,
[46:13] the horoscope service failed. I have to
[46:14] have a look at that. Um
[46:17] but the horoscope service by the way is
[46:19] just a just a spring bin. Um so
[46:23] horoscope service
[46:26] is in this case implemented as
[46:32] just using spring rest. Sorry
[46:38] >> sorry
[46:39] >> if I have multiple actions in a
[46:44] >> can I have logic to say applies that
[46:47] action based on conditions.
[46:52] >> So basically out of the box your
[46:54] conditions that it will apply the action
[46:56] on are its types. You can also define
[47:00] your own at condition methods. So and
[47:03] you can reference and named conditions.
[47:05] So if you wanted to you could do
[47:07] something like this. Um,
[47:13] so where's the star news? So let's
[47:17] suppose here we wanted some custom
[47:19] conditions.
[47:20] I don't know if fooar on the brain. So
[47:23] here we say pre equals fooar. And now we
[47:28] can say at condition public
[47:32] fubar public boolean
[47:36] fubar
[47:38] return false.
[47:40] So that would now cause that action um
[47:43] never to be able to run
[47:47] but obviously be more interesting if
[47:48] your fooar condition did something. So
[47:51] typically the um types the flow of types
[47:55] is sufficient. Um but there are times
[47:58] that you want custom conditions and you
[48:00] can do that. You can also respond to the
[48:03] last thing being added to the
[48:04] blackboard. So you could say for example
[48:07] trigger equals userinput.class
[48:11] which will ensure that this can only run
[48:14] if the very last thing that was added to
[48:16] the blackboard was user input.
[48:19] >> So what if let's say in your example the
[48:22] person weren't able to create it with
[48:24] your prompt.
[48:25] >> Could you say what would say hey tell it
[48:28] to trigger?
[48:30] >> Okay let's try it. um let's revert the
[48:34] bad things that I did to it and let's
[48:36] try what happens. So because in this
[48:39] case we do have an alternative route. So
[48:42] let's say
[48:48] Linda would like news based on her
[48:51] horoscope. So we can create part of a
[48:54] person but we can't create a star
[48:55] person. So, what it's going to do is try
[48:59] to create a star person, discover that
[49:01] it can't do that. Um, and then it's
[49:04] going to find itself unable to create a
[49:06] star person and try to work out is there
[49:08] any other path that it can do. And it
[49:10] says here, let's get some astrological
[49:13] details for Linda and it wants the star
[49:16] sign.
[49:18] So if we look at the planner output here
[49:22] we will see that it has replanned the
[49:26] very first time it was um okay let's go
[49:30] back to the very beginning here. So its
[49:34] first um
[49:36] first plan was the initial plan of
[49:41] extract star person right was going to
[49:43] do that from input retrieve horoscope
[49:46] find new stories that when it ran didn't
[49:50] work so it went for a different approach
[49:53] which starts with um a symbol star
[49:56] person.
[49:58] So let me have show you how that how it
[50:00] knew how to do that rooting. So extract
[50:04] star person is an action gives you from
[50:08] user input a star person. Um whereas a
[50:12] symbol star person takes a person and
[50:16] the starry information and puts it
[50:18] together. How do you get starry
[50:20] information from a person? You have this
[50:23] action but you can see that the cost of
[50:25] this action is 100. So like we don't
[50:28] want to present a form in front of the
[50:30] user um unless that is going to um be
[50:36] absolutely necessary. So you know it
[50:38] shows intelligent routting based on the
[50:41] conditions as they have emerged. Other
[50:45] questions? Yep.
[50:47] >> So a lot of these examples have been
[50:49] pretty consistent length of like planned
[50:51] out actions, right? Is there any chance
[50:54] that we could use it for like recursive
[50:56] chains of
[50:58] like pretty conditions?
[51:01] >> So recursive chains you mean like
[51:03] nesting actions or you can actually nest
[51:07] actions. So there's a couple of ways you
[51:09] can do that. One is you can nest through
[51:12] exposing an action as a tool where it
[51:15] becomes like a sub agent. So you give a
[51:19] single co a genetic loop um some of your
[51:23] um agents as tools and then they will
[51:28] kick off that whole flow. Um and you can
[51:30] also and explicitly create a sub um flow
[51:35] within an agent process. Does that
[51:37] answer the question?
[51:39] >> No.
[51:41] Is that so can actions be asynchronous
[51:44] or do they have to be synchronous?
[51:47] >> Uh presently actions are synchronous but
[51:51] there is a parallelization mechanism
[51:53] that you can use to run things in
[51:55] parallel and like fork join.
[51:59] >> You can run a process asynchronously.
[52:01] You can kick it off in its own thread.
[52:03] >> Subg.
[52:07] um they die if they complete and it's up
[52:10] to the platform whether it decides to
[52:13] throw away the data they held. Um but
[52:16] they also can stay open. So for example,
[52:19] a chatbot is a long lived agent process.
[52:22] All of these ones you've seen are
[52:23] shortlived but chat bots are longived.
[52:29] >> Yes. Yes. So do you have some logic to
[52:32] detect infinite loop? Like what if
[52:34] action one results in action two, action
[52:37] two results in three, but three results
[52:39] back one,
[52:40] >> will that cause an infinite loop?
[52:42] >> No, it wouldn't because it would already
[52:43] be satisfied. So if it returned the same
[52:46] thing. Yeah. Yep. Yep. So actually chat
[52:50] bots are an interesting thing because
[52:52] they're such a common requirement. We
[52:54] model chat bots in a somewhat different
[52:56] way to other frameworks where we don't
[52:58] really think there's anything special
[52:59] about a chatbot. As far as we're
[53:01] concerned, there is a conversation and a
[53:04] user message that are just types that
[53:06] you have in the blackboard. So the
[53:08] chatbot will be a long live process
[53:11] which will generally have at least one
[53:13] action that responds to a user message.
[53:16] The beauty of this approach is you can
[53:19] also respond to things other than user
[53:20] messages in the scope of the chatbot.
[53:22] question
[53:23] >> and is controlled entirely by the LLM.
[53:26] So for example, we use the prompt runner
[53:29] um we say with tool and um give it a
[53:33] number of tools and the LLM is totally
[53:35] responsible for deciding whether to call
[53:38] the tools and in what order to call the
[53:40] tools and what arguments to give them.
[53:42] An action is higher level. It's a step
[53:45] within a workflow that is orchestrated
[53:48] by the gulp planner. So actions are
[53:52] deterministic in their planning. So you
[53:55] know when it makes a plan it will always
[53:57] make the same plan from the same world
[53:59] state and that plan will consist of a
[54:02] number of actions. So actions are higher
[54:04] level typically one action will have
[54:07] zero well not typically always will have
[54:10] zero or more LLM calls within it. One is
[54:14] probably the most common and those then
[54:17] can call tools. Does that make sense?
[54:19] But tools can also wrap agents that can
[54:23] have multiple actions.
[54:28] >> Turtles all the way down. Uh
[54:30] >> start all the way over.
[54:32] >> Sorry.
[54:42] >> Yes. Absolutely. Yep. Yep. Yep. Yeah.
[54:45] And that has the advantage that like if
[54:48] you've got a simple interface for
[54:50] something really complex could be a nice
[54:52] way to do it to let the LLM the the
[54:55] place where I would say often a lot of
[54:58] agency for LLMs is necessary is chat
[55:01] bots because very often it's kind of you
[55:04] know pretty open what the user might
[55:06] say. Um and therefore you have to give
[55:09] the LLM considerable autonomy. I'll just
[55:13] really quickly show a chatbot with um
[55:18] our aerogenic rag support as the last
[55:20] example. So
[55:23] where is it? Herbot. Yep.
[55:26] Okay. The bot chatbot is running. This
[55:30] um example
[55:32] um is actually fairly sophisticated.
[55:34] It's a chatbot that you can use as a
[55:36] starting point and it has both memory
[55:39] and it also has rag. Let's just log in.
[55:45] Um
[55:47] oops.
[55:50] Okay. So, who are you?
[55:56] I'm your helpful and knowledgeable
[55:58] assistant. This is also an example of
[56:01] using Ginger templates. So, let's have a
[56:04] look at the code in the um chatbot. Um
[56:09] so in chat actions you will see that we
[56:14] have a respond action and this is action
[56:20] that specifies a trigger. So this action
[56:23] can only run when a user message was the
[56:26] last thing added. You can see it also
[56:28] says can rerun equals true. So by
[56:31] default actions can only run once in the
[56:33] same agent process. But clearly it
[56:35] wouldn't be very interesting if a
[56:36] chatbot only responded once and then um
[56:40] shut up. So and we also have the
[56:42] conversation the user and the action
[56:45] context. Uh and here we are using the
[56:49] rendering method which is rendering a
[56:53] template given a model. So this is bot
[56:57] um ginger template and that itself is
[57:00] composed of including other things. chat
[57:03] bots externalizing prompts really is
[57:06] essential. Um business processes not so
[57:10] much. Okay, let's also have a look at
[57:13] some of the things that this gets. It's
[57:15] given a bunch of tools. The tools are
[57:17] built dynamically. The um most
[57:21] interesting tool is going to be the
[57:23] global documents tool. And here we do
[57:25] have Java configuration. So this uses
[57:28] our agentic rag interface
[57:31] um where we've got a property filter. So
[57:34] we're saying these are documents that
[57:36] are in the global context. So against
[57:39] the same store we can potentially have
[57:42] metadata filters. So for example the
[57:44] user might only be able to see their
[57:46] documents or they might be able to see
[57:48] their documents plus global documents.
[57:51] So this is simply an LLM reference which
[57:54] is kind of a combination between tool
[57:56] and prompt contributor. And let's just
[57:59] run it and see what it does. The only
[58:01] thing that it knows about that I've
[58:03] ingested is Robert Schumann's music
[58:06] criticism. You need to find things that
[58:08] are a little obscure to prove it's not
[58:10] doing it from general knowledge. What
[58:12] did
[58:14] there's since I upgraded the version of
[58:16] Vardin there is a bug in terms of
[58:19] spontaneous logout that um
[58:22] >> Yep. Okay. What did Schumann think of my
[58:26] beer? Now watch closely
[58:29] to see um the tool calls shared docs
[58:34] text search and here it has ended up
[58:37] using text search rather than vector
[58:39] search although both were available.
[58:41] Okay, sorry for going over time. Hope
[58:43] that was useful to you. Thank you.
[58:51] >> I'm going to grab this
