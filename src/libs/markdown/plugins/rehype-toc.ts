import { visit } from "unist-util-visit"
import type { Element, ElementContent, Root } from "hast"
import type { TocItem } from "../types"

function textOf(node: ElementContent | Element): string {
  if (node.type === "text") return node.value
  if (node.type === "element") return node.children.map(textOf).join("")
  return ""
}

function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[\s]+/g, "-")
      // 保留中日韩文字、字母数字、连字符
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  )
}

// 给 h2/h3 加 id，并把目录写到 file.data.toc
export function rehypeToc() {
  return (tree: Root, file: { data: Record<string, unknown> }) => {
    const used = new Map<string, number>()
    const toc: TocItem[] = []

    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return
      const text = textOf(node).trim()
      if (!text) return

      const base = slugify(text)
      const count = used.get(base) ?? 0
      used.set(base, count + 1)
      const id = count === 0 ? base : `${base}-${count}`

      node.properties = { ...node.properties, id }
      toc.push({ id, text, depth: node.tagName === "h2" ? 2 : 3 })
    })

    file.data.toc = toc
  }
}
