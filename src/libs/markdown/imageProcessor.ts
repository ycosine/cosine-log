import { storageService } from '../storage'
import { CONFIG } from '../../../site.config.js'

interface ImageProcessResult {
  content: string
  processedImages: string[]
}

export class MarkdownImageProcessor {
  private imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  private relativeImageRegex = /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g

  /**
   * 处理Markdown内容中的图片链接
   * 将相对路径图片转换为绝对URL
   */
  processImages(content: string): ImageProcessResult {
    const processedImages: string[] = []
    let processedContent = content

    // 处理相对路径图片
    processedContent = content.replace(this.relativeImageRegex, (match, alt, src) => {
      // 处理相对路径图片
      if (src.startsWith('./') || src.startsWith('../') || !src.startsWith('/')) {
        // 如果是相对路径，转换为绝对路径
        const absoluteSrc = this.resolveImagePath(src)
        processedImages.push(absoluteSrc)
        return `![${alt}](${absoluteSrc})`
      }
      
      // 如果是以 / 开头的绝对路径，添加域名前缀
      if (src.startsWith('/')) {
        const fullUrl = `${CONFIG.link}${src}`
        processedImages.push(fullUrl)
        return `![${alt}](${fullUrl})`
      }

      return match
    })

    return {
      content: processedContent,
      processedImages
    }
  }

  /**
   * 解析相对路径图片为绝对路径
   */
  private resolveImagePath(src: string): string {
    // 如果配置了存储服务，使用存储服务的公共URL
    if (storageService.isEnabled()) {
      const config = storageService.getConfig()
      if (config.type === 'r2' && config.r2.publicUrl) {
        // 假设图片存储在 images/ 目录下
        const cleanSrc = src.replace(/^\.\//, '').replace(/^\.\.\//, '')
        return `${config.r2.publicUrl}/images/${cleanSrc}`
      }
      if (config.type === 'oss' && config.oss.baseUrl) {
        const cleanSrc = src.replace(/^\.\//, '').replace(/^\.\.\//, '')
        return `${config.oss.baseUrl}/images/${cleanSrc}`
      }
    }

    // 回退到本地路径
    const cleanSrc = src.replace(/^\.\//, '').replace(/^\.\.\//, '')
    return `/images/${cleanSrc}`
  }

  /**
   * 提取Markdown内容中的所有图片URL
   */
  extractImageUrls(content: string): string[] {
    const urls: string[] = []
    let match

    while ((match = this.imageRegex.exec(content)) !== null) {
      urls.push(match[2])
    }

    return urls
  }

  /**
   * 替换Markdown内容中的图片URL
   */
  replaceImageUrl(content: string, oldUrl: string, newUrl: string): string {
    const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(!\\[[^\\]]*\\]\\()${escapedOldUrl}(\\))`, 'g')
    return content.replace(regex, `$1${newUrl}$2`)
  }

  /**
   * 验证图片URL是否有效
   */
  async validateImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok && response.headers.get('content-type')?.startsWith('image/') === true
    } catch {
      return false
    }
  }

  /**
   * 获取图片的元数据
   */
  async getImageMetadata(url: string): Promise<{
    width?: number
    height?: number
    size?: number
    type?: string
  } | null> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (!response.ok) return null

      const contentType = response.headers.get('content-type')
      const contentLength = response.headers.get('content-length')

      return {
        type: contentType || undefined,
        size: contentLength ? parseInt(contentLength) : undefined,
      }
    } catch {
      return null
    }
  }

  /**
   * 为Markdown内容生成图片预览
   */
  generateImagePreview(content: string, maxImages: number = 3): string[] {
    const urls = this.extractImageUrls(content)
    return urls.slice(0, maxImages).filter(url => 
      url.startsWith('http') || url.startsWith('/')
    )
  }

  /**
   * 处理图片懒加载
   */
  addLazyLoading(content: string): string {
    return content.replace(
      this.imageRegex,
      (match, alt, src) => {
        // 为图片添加懒加载属性
        return `<img src="${src}" alt="${alt}" loading="lazy" style="max-width: 100%; height: auto;" />`
      }
    )
  }

  /**
   * 为图片添加CDN加速
   */
  applyCDN(content: string, cdnPrefix?: string): string {
    if (!cdnPrefix) return content

    return content.replace(this.imageRegex, (match, alt, src) => {
      // 只对相对路径和本域名图片应用CDN
      if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
        const cleanSrc = src.replace(/^\.\//, '').replace(/^\.\.\//, '').replace(/^\//, '')
        return `![${alt}](${cdnPrefix}/${cleanSrc})`
      }
      return match
    })
  }
}

export const imageProcessor = new MarkdownImageProcessor()
export default imageProcessor