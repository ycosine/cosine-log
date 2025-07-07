# Cloudflare R2 对象存储配置指南

本项目支持使用 Cloudflare R2 对象存储来托管博客中的图片资源。以下是详细的配置步骤。

## 1. 创建 Cloudflare R2 存储桶

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 在左侧菜单中选择 "R2 Object Storage"
3. 点击 "Create bucket" 创建新的存储桶
4. 输入存储桶名称（例如：`my-blog-images`）
5. 选择存储桶位置（建议选择离用户较近的区域）

## 2. 配置 R2 API Token

1. 在 Cloudflare Dashboard 中，进入 "My Profile" > "API Tokens"
2. 点击 "Create Token"
3. 选择 "R2 Token" 模板
4. 配置权限：
   - Account: 选择你的账户
   - Zone Resources: Include All zones（或选择特定域名）
   - R2 Resources: Include All buckets（或选择特定存储桶）
5. 点击 "Continue to summary" 然后 "Create Token"
6. 保存生成的 Token（这是你的 Access Key ID）

## 3. 获取 Secret Access Key

1. 在 R2 页面，点击右侧的 "Manage R2 API tokens"
2. 点击 "Create API token"
3. 输入 Token 名称
4. 设置权限（建议设置为 Object Read and Write）
5. 选择存储桶范围
6. 创建后会显示 Access Key ID 和 Secret Access Key

## 4. 配置自定义域名（推荐）

1. 在 R2 存储桶设置中，找到 "Custom Domains"
2. 点击 "Connect Domain"
3. 输入你的域名（例如：`images.yourdomain.com`）
4. 按照提示配置 DNS 记录
5. 等待 SSL 证书生效

## 5. 环境变量配置

在项目根目录创建 `.env.local` 文件，添加以下配置：

```env
# 启用存储服务并设置为 R2
STORAGE_TYPE=r2

# Cloudflare R2 配置
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET=your_r2_bucket_name
R2_PUBLIC_URL=https://your-custom-domain.com
```

**配置说明：**

- `R2_ACCOUNT_ID`: 在 Cloudflare Dashboard 右侧可以找到
- `R2_ACCESS_KEY_ID`: 步骤3中获取的 Access Key ID
- `R2_SECRET_ACCESS_KEY`: 步骤3中获取的 Secret Access Key
- `R2_BUCKET`: 步骤1中创建的存储桶名称
- `R2_PUBLIC_URL`: 步骤4中配置的自定义域名（推荐）或 R2.dev 域名

## 6. 更新站点配置

在 `site.config.js` 中启用存储服务：

```javascript
// 对象存储配置 (optional) - 支持 Cloudflare R2 和 Alibaba Cloud OSS
storageConfig: {
  enable: true, // 设置为 true 启用对象存储
  type: process.env.STORAGE_TYPE || "r2", // 'r2' or 'oss'
  
  // ... 其他配置
},
```

## 7. 使用方法

### 在 Markdown 文章中使用图片

配置完成后，你可以在 Markdown 文章中使用以下几种方式引用图片：

```markdown
<!-- 相对路径（推荐） -->
![图片描述](./image.jpg)
![图片描述](../images/photo.png)

<!-- 绝对路径 -->
![图片描述](/images/screenshot.png)

<!-- 直接使用完整URL -->
![图片描述](https://your-custom-domain.com/images/banner.jpg)
```

### 程序中上传图片

使用提供的 `ImageUpload` 组件：

```tsx
import ImageUpload from 'src/components/ImageUpload'

function MyComponent() {
  const handleImageUpload = (url: string) => {
    console.log('图片上传成功:', url)
    // 在这里处理上传成功的逻辑
  }

  const handleError = (error: string) => {
    console.error('上传失败:', error)
  }

  return (
    <ImageUpload
      onUpload={handleImageUpload}
      onError={handleError}
      maxSize={10} // 最大10MB
    />
  )
}
```

### API 使用

上传图片：
```javascript
// 获取预签名上传URL
const response = await fetch('/api/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fileName: 'image.jpg',
    contentType: 'image/jpeg'
  })
})

const { uploadUrl, publicUrl } = await response.json()

// 直接上传到 R2
await fetch(uploadUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': 'image/jpeg' }
})

// 使用 publicUrl 作为图片地址
```

删除图片：
```javascript
await fetch('/api/images/delete', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://your-custom-domain.com/images/image.jpg'
  })
})
```

## 8. 故障排除

### 常见问题

1. **上传失败：权限错误**
   - 检查 API Token 是否有正确的权限
   - 确认存储桶名称是否正确

2. **图片无法显示：CORS 错误**
   - 在 R2 存储桶设置中配置 CORS 规则
   - 允许来自你的域名的请求

3. **自定义域名未生效**
   - 检查 DNS 记录是否正确配置
   - 等待 SSL 证书生效（通常需要几分钟）

### CORS 配置示例

在 R2 存储桶设置中添加 CORS 规则：

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com", "http://localhost:3000"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## 9. 费用说明

Cloudflare R2 的计费模式：

- **存储费用**: $0.015/GB/月
- **Class A 操作** (上传): $4.50/百万次请求
- **Class B 操作** (下载): $0.36/百万次请求
- **出站流量**: 免费（无限制）

对于个人博客来说，费用通常很低，每月可能只需要几美分到几美元。

## 10. 备份建议

建议定期备份你的图片资源：

1. 使用 Cloudflare 的数据导出功能
2. 设置自动化脚本定期下载重要图片
3. 在本地保留原始图片副本

完成以上配置后，你的博客就可以使用 Cloudflare R2 来托管图片了！