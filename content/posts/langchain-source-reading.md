---
title: "LangChain 源码阅读笔记"
date: "2023-11-26"
tags: ['AI', 'LangChain']
categories: ['技术']
description: "LangChain 框架核心概念解析：Memory、Prompts、Parser 等模块的源码分析"
author: "余贤俊"
draft: false
---

LangChain官方介绍是这样说的

```TypeScript
LangChain is a framework for developing applications powered by language models. We believe that the most powerful and differentiated applications will not only call out to a language model via an api, but will also:

Be data-aware: connect a language model to other sources of data
Be agentic: allow a language model to interact with its environment
The LangChain framework is designed with the above principles in mind.
```

对于”前端”开发者最重要的点是，designed with the above principles in mind.

将这波AI技术的各种概念进行了代码级别的面向对象的设计，方便理解和组合使用。

参考资料

1. [https://learningprompt.wiki/docs/insight/AI Summary 会取代人工 Summary 吗？](https://learningprompt.wiki/docs/insight/AI%20Summary%20%E4%BC%9A%E5%8F%96%E4%BB%A3%E4%BA%BA%E5%B7%A5%20Summary%20%E5%90%97%EF%BC%9F)

---

下面把langchain的example一个一个看一遍跑一遍

这里只简单做笔记

像人一样思考：人们在处理复杂事情的时候，一定也是通过不断的整理信息，整理成自己熟悉的一件一件事。每个人身上都有熟悉的调用函数。

### Memory

- Buffer这种属于内存存，其实就是给了一个Array
- MotorheadMemory 是基于monogodb存
- BufferWindowMemory就是提供了一个K的窗口长度，滑动存最近的。是一种防止膨胀的方案而已。

prompts主要做的事情是

### fews shots

这个和zero shots很类似，就是给了一些很基础的例子。

这里能做的原因很简单：因为需要拼接的内容很简单。

疑问：但是这里需要用到LLM的能力吗？从返回来看是不用的，或者说只需要简单的分词

### length_based_example_selector

这里的例子是用了_ExampleSelector_

这个我没理解， select examples是一个什么逻辑。

是如果有特别多的例子，他会随机挑选maxLength的例子，已达到节约token.

达成fews shots的目的吗？

### semantic_similarity_example_selector

语义接近选择器。这里其实对应的是上面的长度对应选择器。

所以上面的意思是选择不超过xx的例子吗

这里用到了embing比对，这个比对有很多种比对方法

这里用到的是一种别的算法，K=1代表返回最临近的一个

### structured_parser_zod

### fix Parser

模版转换，由于LLM输入和输出，都是纯粹的字符串。

这里既有输入的prompt类似引擎的设计

也需要Output parse

output parse就是一个衍生工具，利用LLM的能力，来帮忙修正输出的格式错误，具体里面的promt是另外的做法

### load_form_hub

- 看起来只是一个新建PromtTemplate的远端能力

## PromptTemplate

### partial

有点像yield的功能，支持部分输入，达成链式返回的能力

### formatPromptValue

只是包了一层，多了一个返回toChatMessages

### Steam支持

initializeAgentExecutor

- "zero-shot-react-description"：用于根据输入的文本描述生成自动回复，不需要预先训练。
- "chat-zero-shot-react-description"：用于在聊天场景中基于描述生成自动回复，不需要预先训练。
- "chat-conversational-react-description"：用于在聊天场景中进行对话回复，需要预先训练。

理解