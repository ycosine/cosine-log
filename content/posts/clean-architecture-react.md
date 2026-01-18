---
title: "Clean Architecture in React 阅读笔记"
date: "2024-02-27"
tags: ['React', '架构']
categories: ['前端']
description: "React 架构设计的阅读笔记"
author: "余贤俊"
draft: false
---

原文链接：[https://alexkondov.com/full-stack-tao-clean-architecture-react/](https://alexkondov.com/full-stack-tao-clean-architecture-react/)

大佬翻译的部分：[https://sorrycc.com/react-clean-architecture/](https://sorrycc.com/react-clean-architecture/)

我的精读的部分

- I don’t like the term refactoring because it’s become pretty loaded in modern software development. It’s synonymous with stopping product work for a week (at best) so you can ponder your implementation’s design, moving logic up and down, extracting functions, and establishing modules.

    Software design shouldn’t be something we think about six months into the project when people start complaining and we run out of excuses to ignore it.

- 首先是要一遍做整理，一边书写新逻辑。而不是摧毁式的重构，全部推到，按照自己所为理想的蓝图，重新搭建一份。
- you edit and design as you go，具体指的是，只依据当前的需求，做适度整理调整。因为某个组件目前承担了过多的职责，所以进行拆分。而不是未来可能会有这种设计，而进行拆分。
- 这个分寸感其实是一个很微妙的东西

![Untitled 13.png](/images/Untitled%2013.png)

```JavaScript
// prompts-client.ts

const api = axios.createInstance('https://example.com/api/v1')

export function getActivePrompt() {
  return api.get('/prompts')
}

export function createAnswer(answer) {
  return api.post('/prompts', { answer })
}
```