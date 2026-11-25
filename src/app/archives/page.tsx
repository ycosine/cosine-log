import Archives from "src/routes/Archives"
import { getPostIndex } from "src/libs/markdown/server"

export const metadata = {
  title: "归档 - Cosine 余弦是定理",
  description: "浏览 Cosine 余弦是定理博客的所有文章归档",
}

export default function ArchivesPage() {
  return <Archives posts={getPostIndex()} />
}
