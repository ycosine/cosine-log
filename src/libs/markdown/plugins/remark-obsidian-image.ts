import { visit } from "unist-util-visit"
import type { Root, Paragraph } from "mdast"
import path from "path"
import fs from "fs"
import { ensureAssetsDirectory } from "../ensure-assets"

const ASSETS_DIR = path.join(process.cwd(), "content/assets")
const PUBLIC_ASSETS_DIR = path.join(process.cwd(), "public/assets")

// 确保 public/assets 目录存在
ensureAssetsDirectory()

export function remarkObsidianImage() {
  return (tree: Root) => {
    visit(tree, "paragraph", (node: Paragraph) => {
      const children = node.children
      let i = 0

      while (i < children.length) {
        const child = children[i]

        // 查找包含 ![[filename]] 格式的文本节点
        if (child.type === "text" && child.value.includes("![[")) {
          const text = child.value
          const regex = /!\[\[([^\]]+)\]\]/g
          let lastIndex = 0
          const newChildren: any[] = []
          let match

          while ((match = regex.exec(text)) !== null) {
            // 添加匹配前的文本
            if (match.index > lastIndex) {
              newChildren.push({
                type: "text",
                value: text.slice(lastIndex, match.index),
              })
            }

            const filename = match[1]
            const sourcePath = path.join(ASSETS_DIR, filename)
            const targetPath = path.join(PUBLIC_ASSETS_DIR, filename)

            // 复制文件到 public/assets（如果存在）
            if (fs.existsSync(sourcePath)) {
              try {
                fs.copyFileSync(sourcePath, targetPath)
              } catch (error) {
                console.error(`Failed to copy ${filename}:`, error)
              }
            }

            // 创建图片节点
            newChildren.push({
              type: "image",
              url: `/assets/${filename}`,
              alt: filename.replace(/\.[^/.]+$/, ""), // 移除扩展名作为 alt 文本
              data: {
                isObsidian: true,
              },
            })

            lastIndex = regex.lastIndex
          }

          // 添加剩余的文本
          if (lastIndex < text.length) {
            newChildren.push({
              type: "text",
              value: text.slice(lastIndex),
            })
          }

          // 替换原始节点
          children.splice(i, 1, ...newChildren)
          i += newChildren.length
        } else {
          i++
        }
      }
    })
  }
}
