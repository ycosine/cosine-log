import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'
import { CONFIG } from '../../../../site.config'

interface ImageNode extends Element {
  tagName: 'img'
  properties: {
    src?: string
    alt?: string
    title?: string
    width?: number
    height?: number
    [key: string]: any
  }
}

export const remarkNextImage: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img') {
        const imageNode = node as ImageNode
        const src = imageNode.properties.src || ''
        const alt = imageNode.properties.alt || ''
        
        // 检查是否启用了 OSS
        const useOSS = CONFIG.storageConfig?.enable && CONFIG.storageConfig?.oss?.baseUrl
        
        // 处理图片路径
        let imageSrc = src
        if (useOSS && !src.startsWith('http')) {
          // 如果启用了 OSS 且不是外部链接，使用 OSS URL
          imageSrc = `${CONFIG.storageConfig.oss.baseUrl}${src.startsWith('/') ? src : '/' + src}`
        } else if (!src.startsWith('http')) {
          // 否则使用本地 public 路径
          imageSrc = src.startsWith('/') ? src : '/' + src
        }
        
        // 为 Next.js Image 组件准备属性
        imageNode.properties['data-next-image'] = 'true'
        imageNode.properties['data-src'] = imageSrc
        imageNode.properties['data-alt'] = alt
        
        // 添加默认宽高以避免布局偏移
        if (!imageNode.properties.width) {
          imageNode.properties.width = 800
        }
        if (!imageNode.properties.height) {
          imageNode.properties.height = 600
        }
        
        // 添加样式类
        imageNode.properties.className = 'markdown-image'
      }
    })
  }
}