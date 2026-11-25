import About from "src/routes/About"
import { getPostIndex } from "src/libs/markdown/server"
import { CONFIG } from "../../../site.config"

export const metadata = {
  title: "关于 - Cosine 余弦是定理",
  description: "了解更多关于 Cosine 余弦是定理博客的信息",
}

export default function AboutPage() {
  const posts = getPostIndex()
  const tags = new Set(posts.flatMap((p) => p.tags))

  return (
    <About
      stats={{ totalPosts: posts.length, totalTags: tags.size, since: CONFIG.since }}
    />
  )
}
