import OSS from "ali-oss"

export interface OSSConfig {
  region: string
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  baseUrl?: string
}

export class OSSClient {
  private client: OSS | null = null
  private config: OSSConfig | null = null

  constructor(config?: OSSConfig) {
    if (config) {
      this.init(config)
    }
  }

  init(config: OSSConfig) {
    this.config = config
    this.client = new OSS({
      region: config.region,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      bucket: config.bucket,
    })
  }

  async uploadFile(file: File, key?: string): Promise<string> {
    if (!this.client || !this.config) {
      throw new Error("OSS client not initialized")
    }

    const fileName = key || `images/${Date.now()}-${file.name}`

    try {
      const result = await this.client.put(fileName, file)

      // 返回完整的 URL
      if (this.config.baseUrl) {
        return `${this.config.baseUrl}/${fileName}`
      }

      return result.url
    } catch (error) {
      console.error("OSS upload error:", error)
      throw error
    }
  }

  async uploadBuffer(buffer: Buffer, fileName: string): Promise<string> {
    if (!this.client || !this.config) {
      throw new Error("OSS client not initialized")
    }

    try {
      const result = await this.client.put(fileName, buffer)

      if (this.config.baseUrl) {
        return `${this.config.baseUrl}/${fileName}`
      }

      return result.url
    } catch (error) {
      console.error("OSS upload error:", error)
      throw error
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    if (!this.client) {
      throw new Error("OSS client not initialized")
    }

    try {
      await this.client.delete(fileName)
    } catch (error) {
      console.error("OSS delete error:", error)
      throw error
    }
  }

  async listFiles(prefix: string = ""): Promise<string[]> {
    if (!this.client) {
      throw new Error("OSS client not initialized")
    }

    try {
      const result = await this.client.list({ prefix } as any, {})
      return result.objects?.map((obj) => obj.name) || []
    } catch (error) {
      console.error("OSS list error:", error)
      throw error
    }
  }
}

// 创建全局 OSS 客户端实例
export const ossClient = new OSSClient()

// 初始化 OSS 客户端
export function initOSS() {
  const config: OSSConfig = {
    region: process.env.OSS_REGION || "",
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || "",
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || "",
    bucket: process.env.OSS_BUCKET || "",
    baseUrl: process.env.OSS_BASE_URL || "",
  }

  // 检查是否有完整的配置
  if (
    config.region &&
    config.accessKeyId &&
    config.accessKeySecret &&
    config.bucket
  ) {
    ossClient.init(config)
    console.log("OSS client initialized successfully")
  } else {
    console.warn(
      "OSS configuration incomplete, upload functionality will be disabled"
    )
  }
}

// 处理 Markdown 中的图片上传
export async function uploadMarkdownImages(content: string): Promise<string> {
  if (!ossClient) {
    return content
  }

  // 匹配 Markdown 中的图片语法
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let processedContent = content
  const matches = Array.from(content.matchAll(imageRegex))

  for (const match of matches) {
    const [_fullMatch, _alt, src] = match

    // 只处理本地图片路径
    if (src.startsWith("http") || src.startsWith("//")) {
      continue
    }

    try {
      // 这里需要根据实际情况处理本地图片上传
      // 由于在服务器端无法直接访问本地文件系统中的图片
      // 可能需要在构建时预处理或者通过其他方式处理
      console.log(`需要上传图片: ${src}`)

      // 暂时保持原样，可以在后续实现具体的上传逻辑
      // const uploadedUrl = await uploadLocalImage(src)
      // processedContent = processedContent.replace(fullMatch, `![${alt}](${uploadedUrl})`)
    } catch (error) {
      console.error(`上传图片失败 ${src}:`, error)
    }
  }

  return processedContent
}
