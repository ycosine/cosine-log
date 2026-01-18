"use client"

import { useEffect, useRef } from "react"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // 处理所有标记为 Next.js Image 的图片
    const images = contentRef.current.querySelectorAll(
      'img[data-next-image="true"]'
    )

    images.forEach((img) => {
      const src = img.getAttribute("data-src") || ""
      const alt = img.getAttribute("data-alt") || ""
      const width = parseInt(img.getAttribute("width") || "800")
      const height = parseInt(img.getAttribute("height") || "600")

      // 创建容器
      const container = document.createElement("div")
      container.className = "markdown-image-container"
      container.style.position = "relative"
      container.style.width = "100%"
      container.style.aspectRatio = `${width}/${height}`

      // 创建 Next.js Image 元素
      const nextImage = document.createElement("img")
      nextImage.src = src
      nextImage.alt = alt
      nextImage.loading = "lazy"
      nextImage.style.width = "100%"
      nextImage.style.height = "100%"
      nextImage.style.objectFit = "contain"

      // 替换原始 img
      if (img.parentNode) {
        img.parentNode.insertBefore(container, img)
        container.appendChild(nextImage)
        img.remove()
      }
    })

    // 处理 Mermaid 图表
    const loadMermaid = async () => {
      const mermaidElements = contentRef.current?.querySelectorAll(".mermaid")
      if (!mermaidElements || mermaidElements.length === 0) return

      try {
        // 动态导入 Mermaid
        const mermaid = (await import("mermaid")).default

        // 配置 Mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          themeVariables: {
            primaryColor: "#0ea5e9",
            primaryTextColor: "#fff",
            primaryBorderColor: "#0284c7",
            lineColor: "#5c5c5c",
            secondaryColor: "#006100",
            tertiaryColor: "#fff",
          },
          securityLevel: "loose",
        })

        // 处理每个 Mermaid 元素
        for (let i = 0; i < mermaidElements.length; i++) {
          const element = mermaidElements[i] as HTMLElement

          // 跳过已处理的元素
          if (element.classList.contains("mermaid-processed")) continue

          const mermaidCode =
            element.getAttribute("data-mermaid") || element.textContent || ""

          if (!mermaidCode.trim()) continue

          try {
            // 生成唯一 ID - 使用索引而不是时间戳，避免 hydration 错误
            const graphId = `mermaid-graph-${i}`

            // 创建一个新的 div 来渲染
            const renderDiv = document.createElement("div")
            renderDiv.textContent = mermaidCode
            renderDiv.id = graphId

            // 临时添加到 body（但不显示）
            renderDiv.style.position = "absolute"
            renderDiv.style.top = "-9999px"
            renderDiv.style.left = "-9999px"
            document.body.appendChild(renderDiv)

            // 渲染
            await mermaid.run({
              nodes: [renderDiv],
            })

            // 获取渲染后的 SVG
            const svg = renderDiv.innerHTML

            // 移除临时元素
            document.body.removeChild(renderDiv)

            // 更新原始元素
            element.innerHTML = svg
            element.classList.add("mermaid-processed", "mermaid-diagram")
            element.removeAttribute("data-mermaid")
          } catch (error) {
            console.error("Mermaid rendering error:", error)
            element.innerHTML = `<pre>${mermaidCode}</pre>`
            element.classList.add("mermaid-error", "mermaid-processed")
          }
        }
      } catch (error) {
        console.error("Failed to load Mermaid:", error)
      }
    }

    loadMermaid()
  }, [content])

  return (
    <div
      ref={contentRef}
      className="markdown-content prose prose-lg max-w-none
                 prose-headings:text-text-primary-light dark:prose-headings:text-text-primary-dark
                 prose-p:text-text-primary-light dark:prose-p:text-text-primary-dark
                 prose-a:text-primary-600 dark:prose-a:text-primary-400
                 prose-a:no-underline hover:prose-a:underline
                 prose-strong:text-text-primary-light dark:prose-strong:text-text-primary-dark
                 prose-code:text-text-primary-light dark:prose-code:text-text-primary-dark
                 prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900
                 prose-pre:text-gray-800 dark:prose-pre:text-gray-200
                 prose-blockquote:text-text-secondary-light dark:prose-blockquote:text-text-secondary-dark
                 prose-blockquote:border-primary-500
                 prose-table:text-text-primary-light dark:prose-table:text-text-primary-dark
                 prose-th:text-text-primary-light dark:prose-th:text-text-primary-dark
                 prose-td:text-text-primary-light dark:prose-td:text-text-primary-dark"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
