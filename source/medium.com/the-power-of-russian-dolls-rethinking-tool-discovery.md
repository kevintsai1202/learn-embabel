# The Power of Russian Dolls: Rethinking Tool Discovery | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/the-power-of-russian-dolls-rethinking-tool-discovery-1e79eba1543a](https://medium.com/@springrod/the-power-of-russian-dolls-rethinking-tool-discovery-1e79eba1543a)
**來源網站**: medium.com

---

# The Power of Russian Dolls: Rethinking Tool Discovery

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--1e79eba1543a---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--1e79eba1543a---------------------------------------)

6 min read

·

Jan 19, 2026

--

4

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D1e79eba1543a&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Fthe-power-of-russian-dolls-rethinking-tool-discovery-1e79eba1543a&source=---header_actions--1e79eba1543a---------------------post_audio_button------------------)

Share

Tool calling is central to nearly every use of Gen AI, powering [agentic RAG](/@springrod/rethinking-rag-pipelines-are-the-past-agentic-is-the-future-77c887414621), exposing the functionality of existing systems and domain models, and enabling a wide range of integrations.

Today’s LLMs are trained for tool calling and are good at it. However, tool descriptions can consume a significant portion of the context window, and any LLM can struggle to determine which tools to call. [Testing at Anthropic](https://www.anthropic.com/engineering/advanced-tool-use) showed that Opus 4 scored only 49% accuracy on MCP evaluations when working with large tool libraries: essentially a coin toss.

**Thus tool discovery is a core problem that agent frameworks need to address in order to help developers build more efficient and reliable applications.**

[Embabel](https://github.com/embabel/embabel-agent) now solves this problem in a particularly elegant way. The innovation: Like the famous *matryoshka* Russian dolls, Embabel can organize tools into a hierarchy where each level exposes a single tool that opens up the level below. The result: **You can use as many tools as you want without using an excessive number of tokens or sacrificing reliability**.

Press enter or click to view image in full size

![]()

Matryoshka for your LLM

## Existing Tool Discovery Mechanisms

Any agent framework mitigates the tool discovery problem by breaking flows into steps that can use local tools. In many workflows this sidesteps the problem altogether. But there remain scenarios such as chatbots where sufficient decomposition isn’t possible.

Let’s examine the prior art.

### LangChain / LangGraph: Vector Similarity Search

As you’d expect, LangGraph addresses the tool proliferation problem in the most obvious way — through vector similarity search. Tool descriptions are embedded and stored in a vector store, and tools are matched to user queries via semantic search:

```
# Source: https://langchain-ai.github.io/langgraph/how-tos/many-tools/  
tool_documents = [  
    Document(  
        page_content=tool.description,  
        id=id,  
        metadata={"tool_name": tool.name},  
    )  
    for id, tool in tool_registry.items()  
]  
  
vector_store = InMemoryVectorStore(embedding=OpenAIEmbeddings())  
document_ids = vector_store.add_documents(tool_documents)
```

This introduces additional infrastructure and latency. Furthermore, semantic similarity isn’t always the right criterion for tool selection.

### LangChain4j: Dynamic Tool Provider

LangChain4j has a `ToolProvider` [interface](https://docs.langchain4j.dev/tutorials/ai-services/) that allows runtime tool selection based on the incoming message:

```
// Source: https://github.com/langchain4j/langchain4j/issues/637  
Assistant assistant = AiServices  
    .builder(Assistant.class)  
    .chatLanguageModel(model)  
    .toolProvider(request -> {  
        if (request.userMessage().singleText().contains("booking")) {  
            return ToolProviderResult.builder()  
                .add(bookingToolSpecification, new BookingToolExecutor())  
                .build();  
        }  
        return null;  
    })  
    .build();
```

The Embabel equivalent is the common pattern of building a dynamic list of tools to add to a `PromptRunner` when we’re about to make an LLM call. However, it’s not a complete solution to the tool discovery problem.

### Claude Tool Search Tool: Deferred Loading

Anthropic recently introduced the [Tool Search Tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) for Claude Code and the API. This marks tools with `defer_loading: true` so they remain discoverable without consuming context tokens at session start. Claude then discovers relevant tools on-demand via a search mechanism.

```
// Source: https://www.anthropic.com/engineering/advanced-tool-use  
{  
  "tools": [  
    {"type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex"},  
    {  
      "name": "github.createPullRequest",  
      "description": "Create a pull request",  
      "input_schema": {...},  
      "defer_loading": true  
    }  
  ]  
}
```

Anthropic [reports](https://www.anthropic.com/engineering/advanced-tool-use) an 85% reduction in token usage — from ~134k to ~5k tokens in internal testing — while maintaining full tool access. This is a significant improvement, with accuracy on MCP evaluations jumping from 49% to 74% for Opus 4 and from 79.5% to 88.1% for Opus 4.5.

However, this is still a “search-then-select” approach, introducing an additional inference step to discover tools before using them.

## A Better Solution: Tool Hierarchy

You can use all these approaches with Embabel. But we can do better.

Instead of searching through tools, we **organize** them into a hierarchy. This can be done by the tool developer or by the developer building the agent — who of course may be the same person.

Each **matryoshka tool** acts as a facade: when invoked, it’s replaced in the message history by its children. This lets the LLM navigate a tree of capabilities, drilling down only into the areas relevant to the current task.

### The Unbeatable Math of Binary Search

Consider the difference. With 100 tools using flat selection:

* The LLM must process 100 tool descriptions
* Token consumption scales linearly: O(n)
* Selection accuracy degrades with n

With hierarchical tools organized into10 groups of 10:

* First level: 10 facade tools
* After selection: 10 actual tools
* Maximum tools considered: 20
* Token consumption: O(log n)
* Selection accuracy remains high at each level

You can’t beat the math of logarithmic scaling. Embabel apps can offer an **unlimited number of tools** to any LLM interaction while keeping each selection step manageable.

## Code Example: Spotify Integration

Here’s how this looks in practice with the [Spotify integration in our Impromptu](https://github.com/embabel/impromptu/blob/main/src/main/java/com/embabel/impromptu/integrations/spotify/SpotifyTools.java) classical music exploration chatbot:

```
@MatryoshkaTools(  
    name = "spotify",  
    description = "Access Spotify music features. Invoke this tool to enable " +  
        "Spotify operations like playing music, searching tracks, " +  
        "managing playlists, and controlling playback."  
)  
public record SpotifyTools(  
    ImpromptuUser user,  
    SpotifyService spotifyService  
) {  
  
    @LlmTool(description = "Check if user has linked their Spotify account")  
    public String checkSpotifyStatus() {  
        // Implementation  
    }  
  
  // 10 other tools...
```

The `@MatryoshkaTools` annotation transforms this class into a hierarchical tool. Initially, the LLM sees only the top level description:

```
spotify: Access Spotify music features. Invoke this tool to enable Spotify operations...
```

When the user says “play some Brahms,” the LLM invokes the`spotify`parent tool. This facade is replaced by all the child tools: `checkSpotifyStatus`, `getPlaylists`, `searchTracks`, `playTrack`, etc. Now the LLM can select `playTrack` and proceed.

## Scaling with Multiple Integrations

The power becomes clear when you have many integrations. In the Impromptu chatbot, we have matryoshka tools for several concerns.

```
// Source: https://github.com/embabel/impromptu/blob/main/src/main/java/com/embabel/impromptu/integrations/youtube/YouTubeTools.java  
@MatryoshkaTools(  
    name = "youtube",  
    description = "Access YouTube to play or search for videos"  
)  
public record YouTubeTools(...) { /* 5 tools */ }  
  
  
@MatryoshkaTools(  
    name = "metmuseum",  
    description = "Access the Metropolitan Museum of Art collection. " +  
        "Invoke this tool to search artworks, get artwork details, " +  
        "explore departments, and discover highlighted works..."  
)  
public record MetMuseumTools(...) { /* 6 tools */ }  
  
  
@MatryoshkaTools(  
    name = "imslp",  
    description = "Access IMSLP (International Music Score Library Project) " +  
        "to find and download public domain music scores..."  
)  
public record ImslpTools(...) { /* 4 tools */ }  
  
// more tools...
```

Each integration adds just **one tool** to the top-level selection, regardless of how many operations it supports internally. The Spotify integration has 12 internal tools, YouTube has 5, Met Museum has 6, IMSLP has 4 — that’s 27 tools total, and the number will only grow. But the LLM only sees 4 facades initially, keeping selection simple and accurate.

## Benefit: Rich Tool Descriptions

Another key benefit of this architecture is that *lower level tools can have as detailed descriptions as they need*. Since they’re only expanded occasionally, we don’t need to worry much about token consumption in the descriptions. This enables better tool use accuracy.

Compare these tool descriptions:

**Without hierarchy (must be brief):**

```
findScore: Find a score on IMSLP
```

**With hierarchy (can be comprehensive):**

```
@LlmTool(description = """  
    Find a musical score on IMSLP given composer and work title.  
    COMPOSER FORMAT: Use last name only (e.g., 'Brahms', 'Bach', 'Beethoven').  
    IMSLP page titles use format: Work_Title_(Composer,_First_Last)  
    WORK TITLE FORMAT: Use standard titles with proper spacing:  
    - 'Symphony No. 5' (not 'Symphony No.5')  
    - 'Violin Sonata No. 1, Op. 78' or just 'Violin Sonata Op. 78'  
  
   TROUBLESHOOTING - if no results:  
    1. Simplify: Try just 'Violin Sonata' instead of 'Violin Sonata No. 1 in G major'  
    2. Try searchWorks with a flexible query like 'Brahms violin sonata'  
  
  ALWAYS share the IMSLP page URL with the user - they can browse editions directly.  
    """)  
public String findScore(String composer, String workTitle) {  
    // ...  
}
```

Most tools don’t need this level of detail, but this one was needed to work around what had been a real reliability problem with a shorter description, due to the quirks of the IMSLP API. We would not want to waste this many tokens in interactions that didn’t call about score finding.

The hierarchical approach lets us invest in detailed, helpful descriptions that guide the LLM to correct usage — but only pay the token cost when that specific tool category is relevant.

## Conclusion

Embabel makes it easy to expose *targeted* tools through selective addition to a `PromptRunner`. Two particularly import mechanisms for selection are:

* Exposing tools on previously retrieved entities. [Easy integration with existing domain models](/@springrod/context-engineering-needs-domain-understanding-b4387e8e4bf8) is a core goal of Embabel.
* Matryoshka tools that conceal one or more layers of children.

Together, Embabel enables you to work with as many tools as you want in your applications.

Still think Python agent frameworks are the state of the art?

Writing a good application framework is not a data science problem — it’s a software engineering problem. Type safety, deterministic execution, hierarchical organization, and enterprise-grade tooling matter.

Matryoshka tools demonstrate what’s possible when you approach the many-tools problem from first principles rather than reaching for the familiar “just add vector search” solution. The result is simpler, more predictable, and more scalable.

[Check out Embabel today.](https://github.com/embabel/embabel-agent)
