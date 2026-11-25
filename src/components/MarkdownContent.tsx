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
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "neutral",
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

  // 代码块复制按钮（按钮由 rehype-code-block 在构建时生成）
  useEffect(() => {
    const root = contentRef.current
    if (!root) return
    const onClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>(".code-copy")
      if (!button) return
      const code = button.closest(".code-block")?.querySelector("pre code")
      if (!code) return
      try {
        await navigator.clipboard.writeText(code.textContent ?? "")
        button.dataset.copied = ""
        button.setAttribute("aria-label", "已复制")
        window.setTimeout(() => {
          delete button.dataset.copied
          button.setAttribute("aria-label", "复制代码")
        }, 1500)
      } catch {
        // 剪贴板不可用时静默失败
      }
    }
    root.addEventListener("click", onClick)
    return () => root.removeEventListener("click", onClick)
  }, [])

  return (
    <div
      ref={contentRef}
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
