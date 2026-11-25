import { visit } from "unist-util-visit"
import type { Element, Root } from "hast"

const COPY_ICON: Element = {
  type: "element",
  tagName: "svg",
  properties: {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
  },
  children: [
    {
      type: "element",
      tagName: "rect",
      properties: { x: 9, y: 9, width: 11, height: 11, rx: 2 },
      children: [],
    },
    {
      type: "element",
      tagName: "path",
      properties: { d: "M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" },
      children: [],
    },
  ],
}

function languageOf(code: Element): string {
  const cls = code.properties?.className
  if (!Array.isArray(cls)) return ""
  const lang = cls.map(String).find((c) => c.startsWith("language-"))
  return lang ? lang.slice("language-".length) : ""
}

// pre > code 外面包一层，带语言标签和复制按钮（点击由客户端委托处理）
export function rehypeCodeBlock() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || typeof index !== "number") return
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code"
      )
      if (!code) return

      const lang = languageOf(code)
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["code-block"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["code-block-bar"] },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: {},
                children: [{ type: "text", value: lang || "code" }],
              },
              {
                type: "element",
                tagName: "button",
                properties: {
                  type: "button",
                  className: ["code-copy"],
                  ariaLabel: "复制代码",
                },
                children: [COPY_ICON],
              },
            ],
          },
          node,
        ],
      }
      parent.children[index] = wrapper
      return "skip"
    })
  }
}
