---
title: "Node 18 Fetch 兼容与网络代理解决方案"
date: "2023-11-26"
tags: ['Node.js', '网络']
categories: ['技术']
description: "Node.js 18 fetch 兼容性和网络代理配置的最终解决指南"
author: "余贤俊"
draft: false
---

1. centos7 无法安装node 18，因为一些c++依赖库的问题
2. fetch是从node16开始支持，需要添加

NODE_OPTIONS='--experimental-fetch’来兼容支持

但是这个实验特性会有一些问题

1. node-fetch库的兼容

```TypeScript
// fetch-polyfill.js
import fetch, {
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
  FormData,
  Headers,
  Request,
  Response,
} from 'node-fetch'

if (!globalThis.fetch) {
  globalThis.fetch = fetch
  globalThis.Headers = Headers
  globalThis.Request = Request
  globalThis.Response = Response
}

// index.js
import './fetch-polyfill'
```

但是需要注意不同版本的node-fetch是不一样的

注意2.x ⇒ 3.x的区别

1. 如何做proxy agent

http-proxy-agent只支持2.x的版本

可以搜具体怎么做

也就是3.x，如果node 18之后是不支持这样做的。

https://github.com/nodejs/node/issues/42814

类似[https://www.npmjs.com/package/global-agent](https://www.npmjs.com/package/global-agent)也是不完全支持3.x之后的版本的。

这里有很多抓包工具等，都提供了类似的方案，总之就是不行。

```TypeScript
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

直接修改bash命令行也是不行，只能影响类似curl 等比较原始的请求命令

对于node原生发起的请求是不能进行代理的。

这里只讨论fetch，所以我也没试过axios等其他请求库是什么情况

1. node 18的请求方法实现

在22年的某个版本后，实现是通过[https://undici.nodejs.org/#/docs/api/Agent](https://undici.nodejs.org/#/docs/api/Agent)

undici这个请求库实现的。当然也是自己的。

里面提供了Agent的代理方法

这个全局代理的配置，会被node识别，所以最终的解决方法是：

```TypeScript
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const HTTP_PROXY = 'http://127.0.0.1:7890';

const proxyAgent = new ProxyAgent(HTTP_PROXY);
setGlobalDispatcher(proxyAgent);
```

如果不是node端，是使用2.x版本的node-fetch，或者浏览器原生，可以使用http-agent-proxy这个配置进行。

1. 如果需要抓包https

这个全局证书安装之后，还需要在node端默认开启一个不安全的证书配置。

```TypeScript
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
```

1. 串行代理，场景是，我需要抓包，也需要翻墙。

代理工具大部分其实提供了“外部代理”的配置，可以搜索类似关键词看看

![Untitled 16.png](/images/Untitled%2016.png)