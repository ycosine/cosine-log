---
title: "Web 安全最佳实践"
date: "2024-02-20"
tags: ["安全", "Web开发", "最佳实践"]
description: "了解常见的 Web 安全威胁和防护措施"
author: "余贤俊"
draft: false
---

# Web 安全最佳实践

Web 安全是每个开发者都应该重视的话题。本文将介绍常见的安全威胁和防护措施。

## XSS (跨站脚本攻击)

### 什么是 XSS？

XSS 允许攻击者在网页中注入恶意脚本：

```javascript
// 危险的做法
document.getElementById('output').innerHTML = userInput;

// 安全的做法
document.getElementById('output').textContent = userInput;
```

### 防护措施

1. **输入验证和清理**

```javascript
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}
```

2. **使用 CSP (内容安全策略)**

```javascript
// Express.js 示例
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  next();
});
```

3. **React 中的安全实践**

```jsx
// React 默认会转义内容
const userContent = "<script>alert('XSS')</script>";
return <div>{userContent}</div>; // 安全，会显示文本

// 危险：使用 dangerouslySetInnerHTML
return <div dangerouslySetInnerHTML={{__html: userContent}} />; // 不安全！
```

## CSRF (跨站请求伪造)

### 防护措施

1. **使用 CSRF Token**

```javascript
// Express.js with csurf
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.post('/transfer', csrfProtection, (req, res) => {
  // 验证 CSRF token
  res.send('Money transferred');
});
```

2. **SameSite Cookie**

```javascript
res.cookie('sessionId', sessionId, {
  httpOnly: true,
  secure: true, // 仅 HTTPS
  sameSite: 'strict' // 防止 CSRF
});
```

## SQL 注入

### 危险示例

```javascript
// 不要这样做！
const query = `SELECT * FROM users WHERE id = ${userId}`;

// 攻击者可以输入: 1 OR 1=1
```

### 安全实践

```javascript
// 使用参数化查询
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId], (err, results) => {
  // 处理结果
});

// 使用 ORM (如 Sequelize)
const user = await User.findOne({
  where: { id: userId }
});
```

## 认证和授权

### 密码安全

```javascript
const bcrypt = require('bcrypt');

// 哈希密码
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// 验证密码
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

### JWT 最佳实践

```javascript
const jwt = require('jsonwebtoken');

// 生成 token
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '1h',
      issuer: 'myapp'
    }
  );
}

// 验证 token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

## HTTPS 和安全传输

### 强制 HTTPS

```javascript
// Express.js 中间件
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

### 安全头部

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 文件上传安全

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    // 生成安全的文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    // 检查文件类型
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});
```

## 敏感数据保护

### 环境变量

```javascript
// 使用 dotenv
require('dotenv').config();

// 不要硬编码敏感信息
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;
```

### 数据加密

```javascript
const crypto = require('crypto');

// 加密
function encrypt(text) {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}
```

## 安全检查清单

1. ✅ 使用 HTTPS
2. ✅ 实施 CSP
3. ✅ 验证和清理所有输入
4. ✅ 使用参数化查询
5. ✅ 正确处理认证和授权
6. ✅ 保护敏感数据
7. ✅ 定期更新依赖
8. ✅ 实施安全头部
9. ✅ 限制文件上传
10. ✅ 记录和监控异常

## 总结

Web 安全是一个持续的过程，需要：

- 保持警惕和持续学习
- 遵循最佳实践
- 定期进行安全审计
- 及时修复漏洞

记住：安全性应该从项目开始就考虑，而不是事后补救。