---
title: "Node.js 性能优化实战"
date: "2024-03-05"
tags: ["Node.js", "性能优化", "后端"]
description: "分享 Node.js 应用性能优化的实用技巧和最佳实践"
author: "余贤俊"
draft: false
---

# Node.js 性能优化实战

Node.js 作为一个基于事件驱动的异步 I/O 运行时，在构建高性能应用时需要特别注意一些优化技巧。

## 理解事件循环

事件循环是 Node.js 的核心，理解它对性能优化至关重要：

```javascript
// 避免阻塞事件循环
// 不好的做法
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 好的做法 - 使用 setImmediate 分批处理
function fibonacciAsync(n, callback) {
  if (n <= 1) {
    callback(n);
    return;
  }
  
  setImmediate(() => {
    fibonacciAsync(n - 1, (val1) => {
      fibonacciAsync(n - 2, (val2) => {
        callback(val1 + val2);
      });
    });
  });
}
```

## 内存管理

### 避免内存泄漏

常见的内存泄漏场景：

```javascript
// 全局变量累积
let cache = {};
app.get('/data/:id', (req, res) => {
  // 缓存不断增长，从不清理
  cache[req.params.id] = fetchData(req.params.id);
  res.json(cache[req.params.id]);
});

// 解决方案：使用 LRU 缓存
const LRU = require('lru-cache');
const cache = new LRU({ max: 500 });
```

### 使用 Stream 处理大文件

```javascript
// 不好的做法 - 一次性读取整个文件
const data = fs.readFileSync('large-file.txt');
res.send(data);

// 好的做法 - 使用流
const stream = fs.createReadStream('large-file.txt');
stream.pipe(res);
```

## 并发处理

### 使用 Worker Threads

对于 CPU 密集型任务，使用 Worker Threads：

```javascript
const { Worker } = require('worker_threads');

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: data
    });
    
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

### 集群模式

利用多核 CPU：

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // 工作进程代码
  require('./app');
}
```

## 数据库优化

### 连接池

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 批量操作

```javascript
// 不好的做法
for (const user of users) {
  await db.query('INSERT INTO users VALUES ($1, $2)', [user.name, user.email]);
}

// 好的做法
const values = users.map(u => `('${u.name}', '${u.email}')`).join(',');
await db.query(`INSERT INTO users (name, email) VALUES ${values}`);
```

## 缓存策略

### Redis 缓存

```javascript
const redis = require('redis');
const client = redis.createClient();

async function getCachedData(key) {
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFromDB(key);
  await client.setex(key, 3600, JSON.stringify(data));
  return data;
}
```

## 监控和分析

### 使用性能分析工具

```javascript
// 使用 console.time
console.time('operation');
await someOperation();
console.timeEnd('operation');

// 使用 Performance Hooks
const { performance } = require('perf_hooks');
const start = performance.now();
await someOperation();
const end = performance.now();
console.log(`Operation took ${end - start} ms`);
```

## 最佳实践总结

1. **异步优先** - 始终使用异步 API
2. **避免阻塞** - 不要在主线程执行 CPU 密集型任务
3. **合理缓存** - 使用内存缓存和 Redis
4. **监控内存** - 定期检查内存使用情况
5. **使用集群** - 充分利用多核 CPU
6. **优化查询** - 使用索引和批量操作
7. **压缩响应** - 启用 gzip 压缩

通过应用这些优化技巧，可以显著提升 Node.js 应用的性能和可扩展性。