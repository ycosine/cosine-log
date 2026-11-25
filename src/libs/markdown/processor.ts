import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { remarkObsidianImage } from './plugins/remark-obsidian-image'
import { remarkNextImage } from './plugins/remark-next-image'
import { rehypeMermaidSimple } from './plugins/rehype-mermaid'
import { rehypeToc } from './plugins/rehype-toc'
import { rehypeCodeBlock } from './plugins/rehype-code-block'
import type { TocItem } from './types'

// 创建 markdown 处理器
export const createMarkdownProcessor = () => {
  return unified()
    .use(remarkParse)
    .use(remarkGfm) // 支持 GitHub Flavored Markdown
    .use(remarkObsidianImage) // 处理 Obsidian 风格的图片引用
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkNextImage) // 自定义图片处理
    .use(rehypeHighlight, {
      // 代码高亮配置
      detect: true,
      ignoreMissing: true,
    })
    .use(rehypeMermaidSimple) // 使用简化的 Mermaid 插件
    .use(rehypeToc) // 标题锚点 + 目录
    .use(rehypeCodeBlock) // 代码块语言标签 + 复制按钮
    .use(rehypeStringify, { allowDangerousHtml: true })
}

// 处理 markdown 内容
export async function processMarkdown(
  content: string
): Promise<{ html: string; toc: TocItem[] }> {
  const processor = createMarkdownProcessor()
  const result = await processor.process(content)
  return { html: result.toString(), toc: (result.data.toc as TocItem[]) ?? [] }
}
