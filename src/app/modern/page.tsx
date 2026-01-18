import PostList from "src/routes/Feed/PostList"
import { getAllPosts } from "src/libs/markdown/server"

export default async function ModernPage() {
  const posts = await getAllPosts()
  return <PostList posts={posts} />
}
