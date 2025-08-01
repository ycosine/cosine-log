import { visit } from 'unist-util-visit'
import type { Element, Root } from 'hast'

// Simple Mermaid plugin that converts mermaid code blocks to div elements
export function rehypeMermaidSimple() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      // Look for pre > code.language-mermaid
      if (
        node.tagName === 'pre' &&
        node.children?.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'code' &&
        node.children[0].properties?.className?.includes('language-mermaid')
      ) {
        const codeNode = node.children[0]
        const mermaidCode = codeNode.children?.[0]?.type === 'text' 
          ? codeNode.children[0].value 
          : ''
        
        // Replace with a div that will be processed client-side
        const mermaidDiv: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['mermaid'],
            'data-mermaid': mermaidCode
          },
          children: [{
            type: 'text',
            value: mermaidCode
          }]
        }
        
        // Replace the pre element with the mermaid div
        if (parent && typeof index === 'number') {
          parent.children[index] = mermaidDiv
        }
      }
    })
  }
}