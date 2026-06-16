# Rethinking RAG: Pipelines Are the Past, Agentic Is the Future | by Rod Johnson | Medium

**來源網址**: [https://medium.com/@springrod/rethinking-rag-pipelines-are-the-past-agentic-is-the-future-77c887414621](https://medium.com/@springrod/rethinking-rag-pipelines-are-the-past-agentic-is-the-future-77c887414621)
**來源網站**: medium.com

---

# *Rethinking RAG: Pipelines Are the Past, Agentic Is the Future*

[![Rod Johnson](https://miro.medium.com/v2/resize:fill:64:64/0*w7FhiB6igokPDlHh.jpeg)](/@springrod?source=post_page---byline--77c887414621---------------------------------------)

[Rod Johnson](/@springrod?source=post_page---byline--77c887414621---------------------------------------)

8 min read

·

Jan 8, 2026

--

2

[Listen](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D77c887414621&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40springrod%2Frethinking-rag-pipelines-are-the-past-agentic-is-the-future-77c887414621&source=---header_actions--77c887414621---------------------post_audio_button------------------)

Share

[RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) is essential. It’s also hard to get right. Production RAG systems often disappoint, and the response is typically to add more and more workarounds, such as [reranking](https://www.pinecone.io/learn/series/rag/rerankers/), [HyDE](https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde) (Hypothetical Document Embeddings), query expansion, and chunk overlap tuning. Complexity grows, while results don’t necessarily improve.

The problem isn’t the workarounds. It’s what they’re working around. Popular RAG frameworks such as LangChain use an obsolete model that dates back to 2023, before LLM tool calling emerged and changed everything. They use static pipelines when what’s needed is fundamentally different: L**etting the LLM reason about retrieval rather than blindly executing a predetermined flow**.

Recent research is clear. The future of RAG is agentic.

Press enter or click to view image in full size

![]()

## The Legacy Pipeline Approach

Traditional RAG follows a rigid pipeline:

Press enter or click to view image in full size

![]()

### LangChain (Python): The OG Pipeline

As I’ve [previously noted](/@springrod/build-better-agents-in-java-vs-python-embabel-vs-langgraph-f7951a0d855c), LangChain owes its prominence to historically being the first mover. In this case, this has become a major liability, as its RAG approach is obsolete.

Here’s how LangChain implements RAG using [LCEL (LangChain Expression Language)](https://python.langchain.com/docs/concepts/lcel/):

```
from langchain_core.runnables import RunnablePassthrough, RunnableParallel  
from langchain_core.output_parsers import StrOutputParser  
  
# The canonical RAG pipeline  
rag_chain = (  
    {"context": retriever, "question": RunnablePassthrough()}  
    | prompt  
    | llm  
    | StrOutputParser()  
)   
  
# Or with RunnableParallel for slightly more control  
rag_chain = (  
    RunnableParallel(context=retriever | format_docs, question=RunnablePassthrough())  
    | qa_prompt   
    | llm  
)
```

This pattern appears across tutorials, documentation, and production systems. Welcome to 2023.

### LangChain4j: Different Language, Same Old Model

As you would expect from its name, [LangChain4j](https://docs.langchain4j.dev/tutorials/rag/) brings the same model to the JVM. The tutorial explicitly defines RAG in this limited, obsolete way: “Simply put, RAG is the way to find and inject relevant pieces of information from your data into the prompt before sending it to the LLM.”

Here’s example code from the [Easy RAG example](https://github.com/langchain4j/langchain4j-examples/blob/main/rag-examples/src/main/java/_1_easy/Easy_RAG_Example.java):

```
public class Easy_RAG_Example {  
    public static void main(String[] args) {  
        List<Document> documents = loadDocuments(toPath("documents/"), glob("*.txt"));  
  
  Assistant assistant = AiServices.builder(Assistant.class)  
            .chatModel(CHAT_MODEL)  
            .chatMemory(MessageWindowChatMemory.withMaxMessages(10))  
            .contentRetriever(createContentRetriever(documents))  
            .build();  
        startConversationWith(assistant);  
    }  
  
    private static ContentRetriever createContentRetriever(List<Document> documents) {  
        InMemoryEmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();  
        EmbeddingStoreIngestor.ingest(documents, embeddingStore);  
        return EmbeddingStoreContentRetriever.from(embeddingStore);  
    }  
}
```

The `ContentRetriever` supplements the prompt to help answer queries. The [documentation explicitly describes](https://docs.langchain.com/oss/python/langchain/rag) this as a "two-step chain" that provides "reduced latency at the expense of flexibility."

Spring AI uses a [similar](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html) (if more flexible) pipeline model.

## What’s Wrong With Pipelines?

True, these are simple examples. You can build more elaborate pipelines with these old school RAG frameworks, but can’t fix the core problem with the approach.

The pipeline model has fundamental problems that no amount of tuning can fix:

* **Static retrieval** The retriever retrieves once and hopes for the best. If the initial query doesn’t match how documents are indexed, you get poor results. Even if hybrid search is available, the balance between vector and full-text search will be fixed for all queries. The LLM never gets a chance to try a different, highly contextual approach.
* **Lack of self-correction** If retrieved chunks don’t actually answer the question, the pipeline has no mechanism to recognise this and try again. It has to trust whatever comes back from the vector store. Nor can it decide how hard to try in a particular scenario: Is this a legal matter or a casual question? Should it dig deep, regardless of latency, or give up quickly?
* **Context blindness** The retriever may not know what the LLM learned from previous turns in a conversation. Retrieval is often isolated, unable to build on prior context.

To compensate for these limitations, teams bolt on increasingly complex preprocessing: HyDE (Hypothetical Document Embeddings) to bridge the query-document vocabulary gap, rerankers to fix retrieval ordering, query expansion to catch more results, overlap tuning to hope chunk boundaries don’t split relevant content.

> *Chunk boundaries are an especially serious problem. No chunk size can be optimal for all documents. Retrieved chunks are often split in the wrong place, making them misleading.*

## Recent Research Agrees

Recent research is unambiguous:

* [**Anthropic**](https://www.anthropic.com/engineering/multi-agent-research-system): *Traditional approaches using RAG use static retrieval… You can’t hardcode a fixed path for exploring complex topics, as the process is inherently dynamic and path-dependent.* Anthropic’s multi-agent research system **outperformed single-agent approaches by 90.2%**.
* [**NVIDIA**](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/): Agentic RAG “refines queries using reasoning, turning RAG into a sophisticated tool” versus traditional RAG’s “lack of reasoning” and “context blindness.”
* [**arXiv survey**](https://arxiv.org/abs/2501.09136) (January 2025): *Traditional RAG systems are constrained by static workflows and lack the adaptability required for multistep reasoning and complex task management.*
* **Comparative studies** ([TechRxiv](https://www.techrxiv.org/users/876974/articles/1325941-traditional-rag-vs-agentic-rag-a-comparative-study-of-retrieval-augmented-systems), [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5188363)): 80% improvement in retrieval quality and 90% of users preferring agentic systems.

Pipeline RAG is not state of the art. It’s a first-generation approach that is now largely obsolete.

## The Future: Agentic RAG

What if we let the LLM control the retrieval process? Instead of a rigid pipeline, give the model tools to search, evaluate results, refine queries, and iterate until it finds what it needs.

This is **agentic** RAG. The LLM becomes an active participant in retrieval rather than a passive consumer of whatever the pipeline produces.

## Embabel: Agentic RAG Done Right

Embabel’s modern RAG support sits cleanly on top of the core framework through our `LlmReference` abstraction. The `ToolishRag` class enables easy agentic RAG over any a range of back end stores, which may have different capabilities.

### ToolishRag: Fine-Grained Search as LLM Tools

`ToolishRag` wraps any `SearchOperations` implementation and exposes its capabilities as individual tools the LLM can invoke.

`ToolishRag` inspects what interfaces the underlying store implements and only exposes tools for operations the store actually supports.

For example, a Lucene store supports vector search, text search, regex search, and result expansion tools. A Neo4j database supports vector and full text search, plus valuable tools to navigate source document structure from chunks. A simple vector database adapter gets only vector search. The LLM will always be equipped with the best possible toolkit for the store in use, with the developer only needed to write the same simple, intuitive code.

### Key Tools

**Vector Search** — Semantic similarity search with configurable top-K and threshold:

```
@LlmTool(description = "Perform vector search. Specify topK and similarity threshold from 0-1")  
fun vectorSearch(query: String, topK: Int, threshold: ZeroToOne): String
```

**Text Search** — BM25 search with Lucene syntax support:

```
@LlmTool(description = "Perform BM25 search with Lucene syntax: +term, -term, \"phrases\", wildcards (*), fuzzy (~)")  
fun textSearch(query: String, topK: Int, threshold: ZeroToOne): String
```

**Chunk Expansion** — Broaden context around a retrieved chunk:

```
@LlmTool(description = "Given a chunk ID, expand to surrounding chunks")  
fun broadenChunk(chunkId: String, chunksToAdd: Int = 2): String
```

Similarly, for document-structured stores such as Neo4j, **Zoom Out** — Navigate to parent sections for broader context:

```
@LlmTool(description = "Given a content element ID, expand to parent section")  
fun zoomOut(id: String): String
```

> The zoom tools are valuable, as they mitigate the problem of chunk boundaries splitting relevant content. If the LLM sees the start or end of what appears to be a promising seam of content, it can continue mining.

The LLM decides which tools to use, in what order, and with what parameters. It can try a vector search, evaluate the results, decide they’re not quite right, and try a text search with different terms. It can find a relevant chunk, then broaden it to see surrounding context. It can zoom out to understand where a chunk fits in the document structure.

The LLM is able to reason about retrieval to help achieve its overall goal, rather than being forced to rely on predetermined results.

### Using ToolishRag in Practice

The API is simple, consistent and elegant. Rag tools can be added to any LLM interaction via the Embabel `PromptRunner`. Here's an example from a production chatbot:

```
  var toolishRag = new ToolishRag(  
          "sources",  
          "The music criticism written by Robert Schumann: His own writings",  
          searchOperations);  
   
  var response = ai  
          .withLlm(properties.chatLlm())  
          .withReference(toolishRag)  
          .generateText("""  
              You are a helpful authority on Robert Schumann's writings.  
              Use the tools available to you to answer the user's questions.  
              """);
```

1. `SearchOperations,` like the `Ai` interface, is normally injected into the class—it could be Lucene, a Spring AI vector store, Neo4j, or any other implementation  
2. `ToolishRag` wraps it and exposes appropriate tools based on the store's capabilities  
3. `.withReference(toolishRag)` gives the LLM access to search tools

The LLM has full control. It can search multiple times with different queries. It can evaluate whether results are relevant. It can expand context when needed. It can give up gracefully if nothing works — the default goal explicitly says *Continue search until the question is answered, or you have to give up. Be creative, try different types of queries.* You can customize this part of the prompt.

This example comes from our [Ragbot](https://github.com/embabel/ragbot) sample application. Our [guide chatbot and MCP server](https://github.com/embabel/guide) helping users build Embabel applications also use `ToolishRag` for RAG, backed by the Embabel documentation and related content.

## What’s Next: Entities in RAG

Chunks are necessary but not always sufficient. Real documents have structure: sections, headings, entities, relationships, and refer to entities. A chunk that mentions “the CEO” loses meaning without knowing who “the CEO” refers to. A document discussing the user’s phone account should be linked to their customer and service entities.

We’re extending Embabel’s agentic RAG to include entity extraction and graph integration. Entities provide structure above chunks. When the agent retrieves a chunk mentioning “the acquisition,” it can traverse to the entity representing that acquisition, find the companies involved, the date, the value — context that pure chunk retrieval would miss.

This is another area where agentic approaches excel. An agent can decide when entity lookup is valuable, when graph traversal helps, when plain text search is enough. A pipeline must choose one approach for all queries.

I’ll write more about this soon.

## Conclusion

RAG is essential. Pipeline RAG is inadequate.

Frameworks such as LangChain rely on a pipeline model that treats retrieval as a fixed preprocessing step.

As a newer framework, Embabel takes a fundamentally different approach that reflects recent research and experience. `ToolishRag` exposes fine-grained search operations as tools the LLM controls. The `LlmReference` abstraction integrates RAG into the core agent framework rather than bolting it on as an afterthought. The result is retrieval that adapts, iterates, and reasons—not retrieval that executes a predetermined flow and hopes for the best.

If you’re building production RAG systems, you have a choice. You can keep adding workarounds to a fundamentally limited architecture. Or you can adopt an approach that addresses the root cause: letting intelligent agents reason about retrieval rather than executing blind pipelines.

The research is clear. The results are dramatic. Pipeline RAG is the past. Agentic RAG is the future.

[Embabel](https://github.com/embabel/embabel-agent) is [how you build it](https://docs.embabel.com/embabel-agent/guide/0.3.2-SNAPSHOT/#reference.rag), on the JVM.
