import TypoFeed from 'src/routes/Feed/TypoFeed'
import { getAllPosts } from 'src/libs/markdown/server'

export default async function ModernPage() {
  const posts = await getAllPosts()
  return <TypoFeed posts={posts} />
}