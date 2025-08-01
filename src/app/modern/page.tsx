import ModernFeed from 'src/routes/Feed/ModernFeed'
import { getAllPosts } from 'src/libs/markdown/server'

export default async function ModernPage() {
  const posts = await getAllPosts()
  return <ModernFeed posts={posts} />
}