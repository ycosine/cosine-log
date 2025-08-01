---
title: "JavaScript 异步编程模式演进"
date: "2024-02-10"
tags: ["JavaScript", "异步编程", "Promise"]
description: "从回调地狱到 async/await，理解 JavaScript 异步编程的演进历程"
author: "余贤俊"
draft: false
---

# JavaScript 异步编程模式演进

JavaScript 的异步编程模式经历了巨大的演变。让我们回顾这段历程，理解每种模式的优缺点。

## 回调函数时代

最初，JavaScript 使用回调函数处理异步操作：

```javascript
// 回调地狱的典型例子
getUserData(userId, (err, user) => {
  if (err) {
    handleError(err);
    return;
  }
  
  getUserPosts(user.id, (err, posts) => {
    if (err) {
      handleError(err);
      return;
    }
    
    getPostComments(posts[0].id, (err, comments) => {
      if (err) {
        handleError(err);
        return;
      }
      
      // 终于拿到了数据...
      console.log(comments);
    });
  });
});
```

### 回调的问题

1. **回调地狱** - 代码嵌套过深，难以阅读
2. **错误处理困难** - 每个回调都需要单独处理错误
3. **难以组合** - 并行或串行操作复杂

## Promise 的革命

Promise 提供了更优雅的异步处理方式：

```javascript
// Promise 链式调用
getUserData(userId)
  .then(user => getUserPosts(user.id))
  .then(posts => getPostComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => handleError(err));
```

### Promise 的高级用法

并行处理：

```javascript
// 并行获取多个用户数据
const userIds = [1, 2, 3, 4, 5];
const userPromises = userIds.map(id => getUserData(id));

Promise.all(userPromises)
  .then(users => console.log('All users:', users))
  .catch(err => console.error('Error:', err));

// 获取第一个完成的
Promise.race([
  fetchFromAPI1(),
  fetchFromAPI2(),
  fetchFromAPI3()
]).then(result => console.log('Fastest result:', result));
```

错误恢复：

```javascript
fetchPrimaryAPI()
  .catch(err => {
    console.log('Primary API failed, trying backup...');
    return fetchBackupAPI();
  })
  .then(data => processData(data))
  .catch(err => {
    console.error('Both APIs failed:', err);
    return getDefaultData();
  });
```

## async/await 的优雅

async/await 让异步代码看起来像同步代码：

```javascript
async function fetchUserDataWithPosts(userId) {
  try {
    const user = await getUserData(userId);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    
    return {
      user,
      posts,
      comments
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

### 并行处理优化

```javascript
// 低效的串行处理
async function fetchAllSequential(ids) {
  const results = [];
  for (const id of ids) {
    const data = await fetchData(id); // 每个请求都要等待
    results.push(data);
  }
  return results;
}

// 高效的并行处理
async function fetchAllParallel(ids) {
  const promises = ids.map(id => fetchData(id));
  return await Promise.all(promises);
}

// 限制并发数
async function fetchWithConcurrencyLimit(ids, limit = 3) {
  const results = [];
  
  for (let i = 0; i < ids.length; i += limit) {
    const batch = ids.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map(id => fetchData(id))
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

## 高级异步模式

### 异步迭代器

```javascript
// 异步生成器
async function* fetchPages(url) {
  let nextUrl = url;
  
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    
    yield data.items;
    nextUrl = data.nextPageUrl;
  }
}

// 使用异步迭代器
async function processAllPages() {
  for await (const items of fetchPages('/api/items')) {
    console.log('Processing batch:', items);
    await processItems(items);
  }
}
```

### Promise 工具函数

```javascript
// 超时 Promise
function withTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

// 重试逻辑
async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

// 使用示例
const data = await retry(
  () => fetchUnreliableAPI(),
  3,
  1000
);
```

### 取消请求

```javascript
// 使用 AbortController
class CancelableRequest {
  constructor() {
    this.controller = new AbortController();
  }
  
  async fetch(url) {
    try {
      const response = await fetch(url, {
        signal: this.controller.signal
      });
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled');
      }
      throw error;
    }
  }
  
  cancel() {
    this.controller.abort();
  }
}

// 使用
const request = new CancelableRequest();
const dataPromise = request.fetch('/api/data');

// 如果需要取消
setTimeout(() => request.cancel(), 5000);
```

## 实际应用示例

### 数据预加载

```javascript
class DataPreloader {
  constructor() {
    this.cache = new Map();
  }
  
  preload(key, fetchFn) {
    if (!this.cache.has(key)) {
      this.cache.set(key, fetchFn());
    }
  }
  
  async get(key, fetchFn) {
    if (!this.cache.has(key)) {
      this.preload(key, fetchFn);
    }
    
    try {
      return await this.cache.get(key);
    } catch (error) {
      this.cache.delete(key);
      throw error;
    }
  }
}

// 使用
const preloader = new DataPreloader();

// 预加载数据
preloader.preload('user', () => fetchUser());
preloader.preload('settings', () => fetchSettings());

// 当需要时获取
const user = await preloader.get('user', () => fetchUser());
```

### 批量请求优化

```javascript
class BatchRequestQueue {
  constructor(batchFn, delay = 50, maxSize = 10) {
    this.batchFn = batchFn;
    this.delay = delay;
    this.maxSize = maxSize;
    this.queue = [];
    this.timeout = null;
  }
  
  add(item) {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject });
      
      if (this.queue.length >= this.maxSize) {
        this.flush();
      } else {
        this.scheduleFlush();
      }
    });
  }
  
  scheduleFlush() {
    if (this.timeout) return;
    
    this.timeout = setTimeout(() => {
      this.flush();
    }, this.delay);
  }
  
  async flush() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0, this.maxSize);
    const items = batch.map(({ item }) => item);
    
    try {
      const results = await this.batchFn(items);
      batch.forEach(({ resolve }, index) => {
        resolve(results[index]);
      });
    } catch (error) {
      batch.forEach(({ reject }) => {
        reject(error);
      });
    }
  }
}
```

## 总结

JavaScript 异步编程的演进历程：

1. **回调函数** - 简单但容易造成回调地狱
2. **Promise** - 链式调用，更好的错误处理
3. **async/await** - 同步风格的异步代码
4. **高级模式** - 迭代器、取消、批处理等

选择合适的异步模式可以让代码更清晰、更易维护。理解每种模式的特点，才能在实际开发中做出最佳选择。