# You Can Build Better AI Agents in Java Than Python | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/you-can-build-better-ai-agents-in-java-than-python-868eaf008493](https://medium.com/@springrod/you-can-build-better-ai-agents-in-java-than-python-868eaf008493)
**來源網站**: medium.com

---

# You Can Build Better AI Agents in Java Than Python

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--868eaf008493---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--868eaf008493---------------------------------------)

14 min read

·

Aug 18, 2025

--

9

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D868eaf008493&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fyou-can-build-better-ai-agents-in-java-than-python-868eaf008493&source=---header_actions--868eaf008493---------------------post_audio_button------------------)

Share

Too many people assume that Gen AI means Python. Not so.

In this blog I’ll demonstrate that the best programming model for writing agents is on the JVM, and that [the Embabel agent framework](https://github.com/embabel/embabel-agent) offers significant advantages over Python alternatives.

I’ll take a nontrivial sample app from a leading Python framework and rewrite it in Java to be cleaner, more extensible, and require lesscode.

Press enter or click to view image in full size

![The JVM strikes back]()

The JVM strikes back

## The Task: Writing a Book

[CrewAI](https://www.crewai.com/) is one of the most popular agent frameworks. Thus it’s a good candidate to benchmark Java versus Python.

I chose an example from the official [collection of complete CrewAI applications](https://github.com/crewAIInc/crewAI-examples), billed as containing “end-to-end implementations that showcase how to build real-world applications using CrewAI’s framework for orchestrating AI agents.”

The [Write a Book Flow](https://github.com/crewAIInc/crewAI-examples/tree/main/flows/write_a_book_with_flows) seemed a good place to start. Here’s their description of what it does:

> This flow will guide you through the process of writing a book by leveraging multiple AI agents, each with specific roles. Here’s a brief overview of what will happen in this flow:
>
> 1. Generate Book Outline: The flow starts by using the `OutlineCrew` to create a comprehensive outline for your book. This crew will search the internet, define the structure, and main topics of the book based on the provided goal and topic.
>
> 2. Write Book Chapters: Once the outline is ready, the flow will kick off a new crew, `WriteBookChapterCrew`, for each chapter outlined in the previous step. Each crew will be responsible for writing a specific chapter, ensuring that the content is detailed and coherent.
>
> 3. Join and Save Chapters: In the final step, the flow will combine all the chapters into a single markdown file, creating a complete book. This file will be saved in the root folder of your project.
>
> By following this flow, you can efficiently produce a well-structured and comprehensive book, leveraging the power of multiple AI agents to handle different aspects of the writing process.

This is a nice multi-agent scenario, fun in itself and relevant to many real-world problems.

## The Crew Implementation

### Concepts

Crew models tasks in terms of “crews”: groups of specialized agents that are assigned tasks. Most Crew examples have a 1:1 mapping between agents and tasks.

Agents and tasks are usually expressed in YML, and everything is wired up in Python. As in most Python frameworks, Pydantic models are used to specify structured output from LLM calls.

### The Implementation

The book writing flow involves two crews. The first researches the topic of the book and writes an outline; the second writes each chapter of the book, after further, focused research.

The outline crew consists of two agents. A Crew agent has a role, goal and backstory:

```
researcher:  
  role: >  
    Research Agent  
  goal: >  
    Gather comprehensive information about {topic} that will be used to create an organized and well-structured book outline.  
    Here is some additional information about the author's desired goal for the book:\n\n {goal}  
  backstory: >  
    You're a seasoned researcher, known for gathering the best sources and understanding the key elements of any topic.   
    You aim to collect all relevant information so the book outline can be accurate and informative.  
  
outliner:  
  role: >  
    Book Outlining Agent  
  goal: >  
    Based on the research, generate a book outline about the following topic: {topic}   
    The generated outline should include all chapters in sequential order and provide a title and description for each chapter.  
    Here is some additional information about the author's desired goal for the book:\n\n {goal}  
  backstory: >  
    You are a skilled organizer, great at turning scattered information into a structured format.   
    Your goal is to create clear, concise chapter outlines with all key topics and subtopics covered.
```

The outline crew has two tasks, also defined in YML:

```
research_topic:  
  description: >  
    Research the provided topic of {topic} to gather the most important information that will   
    be useful in creating a book outline. Ensure you focus on high-quality, reliable sources.  
  
    Here is some additional information about the author's desired goal for the book:\n\n {goal}  
  expected_output: >  
    A set of key points and important information about {topic} that will be used to create the outline.  
  agent: researcher  
  
generate_outline:  
  description: >  
    Create a book outline with chapters in sequential order based on the research findings.   
    Ensure that each chapter has a title and a brief description that highlights the topics and subtopics to be covered.  
    It's important to note that each chapter is only going to be 3,000 words or less.  
    Also, make sure that you do not duplicate any chapters or topics in the outline.  
  
    Here is some additional information about the author's desired goal for the book:\n\n {goal}  
  
  expected_output: >  
    An outline of chapters, with titles and descriptions of what each chapter will contain.  
  agent: outliner
```

Agent and crew definitions contain placeholders such as `{topic}` and `{goal}`.

The crew is wired up in Python. The agents are loaded and configured. Each agent can use its own LLM and tools:

```
@CrewBase  
class OutlineCrew:  
    """Book Outline Crew"""  
  
    agents_config = "config/agents.yaml"  
    tasks_config = "config/tasks.yaml"  
    llm = LLM(model="gpt-4o")  
  
    @agent  
    def researcher(self) -> Agent:  
        search_tool = SerperDevTool()  
        return Agent(  
            config=self.agents_config["researcher"],  
            tools=[search_tool],  
            llm=self.llm,  
            verbose=True,  
        )  
  
    @agent  
    def outliner(self) -> Agent:  
        return Agent(  
            config=self.agents_config["outliner"],  
            llm=self.llm,  
            verbose=True,  
        )
```

Next, the tasks are loaded, specifying their output format (what the LLM call should return):

```
@task  
def research_topic(self) -> Task:  
    return Task(  
        config=self.tasks_config["research_topic"],  
    )  
  
@task  
def generate_outline(self) -> Task:  
    return Task(  
        config=self.tasks_config["generate_outline"],   
        output_pydantic=BookOutline  
    )
```

Finally we build the crew. The ordering of agents implies the data flow: the research will be available when the outline is computed, although this is not made explicit:

```
@crew  
def crew(self) -> Crew:  
    """Creates the Book Outline Crew"""  
    return Crew(  
        agents=self.agents,  
        tasks=self.tasks,  
        process=Process.sequential,  
        verbose=True,  
    )
```

The “write book chapter” crew is similar.

Python code in the root of the example brings together both crews. Pydantic models provide a simple domain model for book and chapter outline:

```
class ChapterOutline(BaseModel):  
    title: str  
    description: str  
  
  
class BookOutline(BaseModel):  
    chapters: List[ChapterOutline]  
  
  
class Chapter(BaseModel):  
    title: str  
    content: str
```

These types are used in `BookState`. The `topic` and `goal` fields are inputs, pre-populated here:

```
class BookState(BaseModel):  
    id: str = "1"  
    title: str = "The Current State of AI in July 2025"  
    book: List[Chapter] = []  
    book_outline: List[ChapterOutline] = []  
    topic: str = (  
        "Exploring the latest trends in AI across different industries as of July 2025"  
    )  
    goal: str = """  
        The goal of this book is to provide a comprehensive overview of the current state of artificial intelligence in July 2025.  
        It will delve into the latest trends impacting various industries, analyze significant advancements,  
        and discuss potential future developments. The book aims to inform readers about cutting-edge AI technologies  
        and prepare them for upcoming innovations in the field.  
    """
```

This state class allows everything to be tied together in `main.py`. `BookFlow` extends the generic `Flow` superclass, using `BookState` as `self.state`.

```
class BookFlow(Flow[BookState]):  
    initial_state = BookState  
  
    @start()  
    def generate_book_outline(self):  
        print("Kickoff the Book Outline Crew")  
        output = (  
            OutlineCrew()  
            .crew()  
            .kickoff(inputs={"topic": self.state.topic, "goal": self.state.goal})  
        )  
  
        chapters = output["chapters"]  
        print("Chapters:", chapters)  
  
        self.state.book_outline = chapters  
        return chapters  
  
    @listen(generate_book_outline)  
    async def write_chapters(self):  
        print("Writing Book Chapters")  
        tasks = []  
  
        async def write_single_chapter(chapter_outline):  
            output = (  
                WriteBookChapterCrew()  
                .crew()  
                .kickoff(  
                    inputs={  
                        "goal": self.state.goal,  
                        "topic": self.state.topic,  
                        "chapter_title": chapter_outline.title,  
                        "chapter_description": chapter_outline.description,  
                        "book_outline": [  
                            chapter_outline.model_dump_json()  
                            for chapter_outline in self.state.book_outline  
                        ],  
                    }  
                )  
            )  
            title = output["title"]  
            content = output["content"]  
            chapter = Chapter(title=title, content=content)  
            return chapter  
  
        for chapter_outline in self.state.book_outline:  
            print(f"Writing Chapter: {chapter_outline.title}")  
            print(f"Description: {chapter_outline.description}")  
            # Schedule each chapter writing task  
            task = asyncio.create_task(write_single_chapter(chapter_outline))  
            tasks.append(task)  
  
        # Await all chapter writing tasks concurrently  
        chapters = await asyncio.gather(*tasks)  
        print("Newly generated chapters:", chapters)  
        self.state.book.extend(chapters)  
  
        print("Book Chapters", self.state.book)  
  
    @listen(write_chapters)  
    async def join_and_save_chapter(self):  
        print("Joining and Saving Book Chapters")  
        # Combine all chapters into a single markdown string  
        book_content = ""  
  
        for chapter in self.state.book:  
            # Add the chapter title as an H1 heading  
            book_content += f"# {chapter.title}\n\n"  
            # Add the chapter content  
            book_content += f"{chapter.content}\n\n"  
  
        # The title of the book from self.state.title  
        book_title = self.state.title  
  
        # Create the filename by replacing spaces with underscores and adding .md extension  
        filename = f"./{book_title.replace(' ', '_')}.md"  
  
        # Save the combined content into the file  
        with open(filename, "w", encoding="utf-8") as file:  
            file.write(book_content)  
  
        print(f"Book saved as {filename}")  
        return book_content
```

The `@listen` decorators specify flow linkage. Parallelization of chapter writing is achieved in code, using Python `asyncio`. The `join_and_save_chapter` function also uses code to compile and save the book.

### Strengths and Weaknesses

The approach is intuitive. The problem is decomposed so each step has a clear responsibility, uses its own LLM and tools, and is easy to optimize. This is better than trusting a single LLM to perform the whole task. The types bring helpful structure and make it possible to mix LLM interactions with manually authored code.

However, there are definite weaknesses:

* **There’s a lot of ceremony** in setting everything up. This relatively simple flow requires multiple directories, each with several artifacts.
* **The data types are not used consistently**. Types are largely used to constrain LLM returns. Prompts are still built with magic keys.
* **The parameters injected into functions decorated with** `@listen` **are untyped**. The application is far from type safe.
* **The agent/task division seems somewhat confused**. Agents know about input keys, limiting their potential for reuse in different tasks, and making the division into agents and tasks questionable, especially as it brings duplication.

> This is much better than throwing a big prompt and tools at a single model and praying. But there’s plenty of room for improvement. Let’s see if we can do better.

## The Embabel Implementation

Expressing this flow in [Embabel](https://github.com/embabel/embabel-agent) is straightforward.

### Concept Mapping

If you’ve followed my [previous blogs](/@springrod/embabel-a-new-agent-platform-for-the-jvm-1c83402e0014), you will know that Embabel has a novel approach, using a [planner](/@springrod/ai-for-your-gen-ai-how-and-why-embabel-plans-3930244218f6) to determine flow. Planning is based on **actions** (steps that need to be taken) and **goals**, which define the ultimate world state we want to achieve. Embabel also [emphasizes type safety](/@springrod/from-alchemy-to-engineering-building-type-safe-gen-ai-applications-with-embabel-c3d89b7c989f), eliminating all magic keys in prompts.

Thus:

* The types in the Crew implementation naturally map to Embabel domain objects. We will add richer behavior if it makes the application simpler and cleaner.
* The data flow will be more elegant in Embabel. There will be no magic String keys and everything will be type safe.
* There’s no need for an equivalent of Crew’s `@listen` decorator, as Embabel’s planner can work out what order actions should run in, based on the types they require.
* Configuration will be easy given that Embabel builds on Spring. We can externalize anything we want, including LLM names and hyperparameters.

The equivalent of a Crew agent personality is provided by the `RoleGoalBackstory` class, which is just one of the many ways in which Embabel helps bring structure to prompt construction.

As with Crew, Embabel will maintain state throughout the flow’s execution.

### The Embabel Code

We end up with a single Java class and YML in `application.yml`, which is automatically loaded by Spring.

The YML has similar content to the Crew YML, but also externalizes LLM model and temperature:

```
examples:  
  book-writer:  
  
    max-concurrency: 8  
  
    researcher-llm:  
      model: gpt-4.1-nano  
      temperature: 0.7  
  
    writer-llm:  
      model: gpt-4.1-mini  
  
  
    researcher:  
      role: Researcher  
      goal: >  
        Gather comprehensive information about a topic that will be used   
        to create an organized and well-structured book outline.  
        Consider the author's desired goal for the book.  
  
      backstory: >  
        You are an experienced researcher skilled in finding the most relevant and up-to-date information on any given topic.   
        Your job is to provide insightful data that supports and enriches the writing process for the chapter.  
  
    outliner:  
      role: Outliner  
      goal: >  
        Based on research, generate a book outline about the given topic.  
        The generated outline should include all chapters in sequential order and provide a title and description for each chapter.  
        Consider the author's desired goal for the book  
      backstory: >  
        You are a skilled organizer, great at turning scattered information into a structured format.  
        Your goal is to create clear, concise chapter outlines with all key topics and subtopics covered.  
  
    writer:  
      role: Chapter Writer  
      goal: >  
        Write a well-structured chapter for a book based on the provided chapter title, goal, and outline.  
      backstory: >  
        You are an exceptional writer, known for producing engaging, well-researched, and informative content.  
        You excel at transforming complex ideas into readable and well-organized chapters.
```

The role, goal and backstories are the same, except for the fact that there are no magic keys. Prompts will be built in a type safe way.

This YML will surface in the JVM via a Spring`@ConfigurationProperties` class. We just need to use an annotation:

```
@ConfigurationProperties("examples.book-writer")  
record BookWriterConfig(  
        LlmOptions researcherLlm,  
        LlmOptions writerLlm,  
        int maxConcurrency,  
        RoleGoalBackstory researcher,  
        RoleGoalBackstory outliner,  
        RoleGoalBackstory writer,  
        String outputDirectory  
) {  
  
    public Path saveContent(Book book) {  
        var dir = outputDirectory != null ? outputDirectory : System.getProperty("user.dir");  
        var fileName = book.title().replace(" ", "_").toLowerCase() + ".md";  
        return FileTools.readWrite(dir).createFile("books" + File.separator + fileName, book.text(), true);  
    }  
}
```

The domain types follow the same structure as the Crew original:

```
record ChapterOutline(String title, String content) {  
}  
  
record BookOutline(String title,  
                   List<ChapterOutline> chapterOutlines) implements PromptContributor {  
  
    @NotNull  
    @Override  
    public String contribution() {  
        return "Book Outline:\nTitle: " + title + "\n" + chapterOutlines.stream()  
                .map(chapter -> chapter.title() + "\n" + chapter.content())  
                .collect(Collectors.joining("\n\n"));  
    }  
}  
  
record Chapter(String title, String content) {  
}  
  
record Book(BookRequest request,  
            String title,  
            List<Chapter> chapters) {  
  
    public String text() {  
        return "# " + title() + "\n" + request.goal() + "\n\n" +  
                chapters().stream()  
                        .map(chapter -> "## " + chapter.title() + "\n" + chapter.content())  
                        .collect(Collectors.joining("\n\n"));  
    }  
}
```

We’ve added some behavior. These are objects, not merely structs. A `Book` knows how to format itself to text. `BookOutline` implements the Embabel `PromptContributor` interface, allowing consistent use in prompts. We also add a `BookRequest` type to kick off the flow. It also implements `PromptContributor`.

We inject the configuration into the agent, which is defined in a class annotated with `@Agent`. Like the `ConfigurationProperties` class, the agent will automatically be discovered and configured by Spring.

The agent’s steps, called **actions** in Embabel, are similar to those of the Crew example. However, they’re wired up in a better, safer way. Each is annotated with `@Action`.

Here’s the full agent:

```
@Agent(description = "Write a book, first creating an outline, then writing the chapters and combining them")  
public record BookWriter(BookWriterConfig config) {  
  
    static final Logger logger = LoggerFactory.getLogger(BookWriter.class);  
  
    @Action  
    ResearchReport researchTopic(  
            BookRequest bookRequest,  
            OperationContext context) {  
        return context.ai()  
                .withLlm(config.researcherLlm())  
                .withPromptElements(config.researcher(), bookRequest)  
                .withToolGroup(CoreToolGroups.WEB)  
                .createObject(  
                        """  
                        Research the topic to gather the most important information that will  
                        be useful in creating a book outline. Ensure you focus on high-quality, reliable sources,  
                        and create a set of key points and important information that can be used to create a book outline.  
                        """,  
                        ResearchReport.class);  
    }  
  
    @Action  
    BookOutline createOutline(  
            BookRequest bookRequest,  
            ResearchReport researchReport,  
            OperationContext context) {  
        return context.ai()  
                .withLlm(config.writerLlm())  
                .withPromptElements(config.outliner(), bookRequest, researchReport)  
                .withToolGroup(CoreToolGroups.WEB)  
                .createObject(  
                        """  
                        Create a book outline as requested with chapters in sequential order based on the given research findings.  
                        Ensure that each chapter has a title and a brief description that highlights the topics and subtopics to be covered.  
                        Ensure that you do not duplicate any chapters or topics in the outline.  
                        """,  
                        BookOutline.class);  
    }  
  
    @Action  
    Book writeBook(  
            BookRequest bookRequest,  
            BookOutline bookOutline,  
            ResearchReport researchReport,  
            OperationContext context  
    ) {  
        var chapters = context.parallelMap(  
                bookOutline.chapterOutlines(),  
                config.maxConcurrency(),  
                chapterOutline -> writeChapter(  
                        bookRequest,  
                        bookOutline,  
                        chapterOutline,  
                        context  
                )  
        );  
        return new Book(bookRequest, bookOutline.title(), chapters);  
    }  
  
    @AchievesGoal(  
        description = "Book has been written and published about the requested topic",  
        export = @Export(remote = true)  
    )  
    @Action  
    Book publishBook(Book book) {  
        var path = config.saveContent(book);  
        logger.info("Book {} written and saved to {}", book.title(), path);  
        return book;  
    }  
  
    private Chapter writeChapter(  
            BookRequest bookRequest,  
            BookOutline bookOutline,  
            ChapterOutline chapterOutline,  
            OperationContext context) {  
        logger.info("Researching chapter {}...", chapterOutline.title());  
        var specificResearch = context.ai()  
                .withLlm(config.researcherLlm())  
                .withPromptElements(config.researcher(), bookRequest, bookOutline)  
                .withToolGroup(CoreToolGroups.WEB)  
                .createObject(  
                        """  
                        Research the topic of the chapter titled "%s" for the given book outline.  
                        Consider the following chapter outline:  
                        %s  
                          
                        Ensure that you focus on high-quality, reliable sources,  
                        and create a set of key points and important information  
                        that can be used to write the chapter.  
                        """.formatted(chapterOutline.title(), chapterOutline.content()),  
                        ResearchReport.class);  
        logger.info("Writing chapter {}...", chapterOutline.title());  
        return context.ai()  
                .withLlm(config.writerLlm())  
                .withPromptElements(bookRequest, config.writer(), bookOutline, specificResearch)  
                .createObject(  
                        """  
                        Write a well-structured chapter for the book based on the provided chapter title, goal, and outline.  
                        The chapter should be written in markdown format.  
                        Chapter title: %s  
                        Chapter outline: %s  
                        """.formatted(chapterOutline.title(), chapterOutline.content()  
                        ),  
                        Chapter.class  
                );  
    }  
}
```

This should be intuitive. Let’s look in more detail at the first action.

```
@Action  
BookOutline createOutline(  
        BookRequest bookRequest,  
        ResearchReport researchReport,  
        OperationContext context) {  
    return context.ai()  
            .withLlm(config.writerLlm())  
            .withPromptElements(config.outliner(), bookRequest, researchReport)  
            .withToolGroup(CoreToolGroups.WEB)  
            .createObject(  
              """  
              Create a book outline as requested with chapters in sequential order based on the given research findings.  
              Ensure that each chapter has a title and a brief description that highlights the topics and subtopics to be covered.  
              Ensure that you do not duplicate any chapters or topics in the outline.  
              """,  
              BookOutline.class);  
}
```

The first two parameters of the method are domain objects, ensuring type safety in prompt construction. The third parameter is an Embabel`OperationContext.` This is a gateway to AI and other framework services. The `context.ai()` method allows us to specify an LLM with `withLlm`, returning a `PromptRunner` that we can use to make LLM calls. As in the Crew example, we specify tools to give the LLM. The `withToolGroup(CoreToolsGroup.WEB)` method requests tools related to web search. There is an intentional degree of indirection here; in different environments we might have different search providers. The examples repo uses Brave search via the Docker MCP Gateway, but the agent code doesn’t know that.

The `createObject` method builds a prompt and specifies the return type. The prompt is built with access to relevant domain objects, so we *know* what’s available and what type it is.

In this case, the `withPromptElements(config.outliner(), bookRequest, researchReport)`call adds structured elements to the prompt. This makes sense here as we can use the same formatting across different LLM calls. However, many prompts are entirely built as type safe strings.

> We could externalize the prompts to Jinja templates using Embabel’s `withTemplate` method. However, the small focused prompts typically used with an agent framework don’t require a lot of prompt engineering.

Unlike the Crew example, we control concurrency. The following Python from the Crew example is unsafe, as it is the LLM that decides how many chapters there will be, risking being rate limited or worse:

```
for chapter_outline in self.state.book_outline:  
    task = asyncio.create_task(write_single_chapter(chapter_outline))  
    tasks.append(task)  
# Await all chapter writing tasks concurrently  
chapters = await asyncio.gather(*tasks)
```

Our equivalent using the `OperationContext.parallelMap` method allows concurrency to be managed by the platform:

```
var chapters = context.parallelMap(  
    bookOutline.chapterOutlines(),  
    config.maxConcurrency(),  
    chapterOutline -> writeChapter(  
            bookRequest,  
            bookOutline,  
            chapterOutline,  
            context  
    )  
);  
return new Book(bookRequest, bookOutline.title(), chapters);
```

The overall flow functionality is the same.

## Takeaways

Wait, there is *less* Java code than Python code?? There is also less YML. The Embabel version is also superior in other ways:

* **It’s entirely type safe.** No risk of mistyping prompt keys, and better tool support for both language and framework.
* **It’s more configurable**. We can switch LLMs, change hyperparameters and concurrency limit in YML.
* **It’s closer to a production application**. It uses a logging framework versus relying on system output, and it controls concurrency to avoid the risk of hitting rate limits.
* Embabel’s **unit** **testing** support allows us to test prompts easily.

As agents become more complex and need to access existing functionality, the argument for writing them on the JVM (where so much valuable functionality already resides) is particularly compelling. However, as this example shows, there is no reason to write *any* agents in Python unless you are already in the Python ecosystem. The JVM is also more than competitive for simpler examples.

> I chose to write this example in Java. If I’d written it in Kotlin, the superiority over the Crew AI example would have been even more obvious.

## Next Steps

The book writer example is in the [embabel-agent-examples](https://github.com/embabel/embabel-agent-examples) repository, along with other examples, in Java and Kotlin.

As Embabel offers a superior programming model to any Python agent framework, expect further blogs targeting CrewAI’s Python competitors. I’m going to enjoy this, a lot.

Embabel is not aiming to play catchup to Python frameworks, but to provide the best programming model for Gen AI on any platform. Even better, a model that seamlessly integrates with much of the world’s most valuable business logic.

Start building agents on the JVM today. Use our [GitHub Java agent template](https://github.com/embabel/java-agent-template) and have your first agent running in minutes. Join our [growing community](https://discord.com/invite/t6bjkyj93q) and help us build the future of agent frameworks.
