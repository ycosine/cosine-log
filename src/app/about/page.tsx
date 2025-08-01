import About from 'src/routes/About'
import { getAllPosts } from 'src/libs/markdown/server'

export const metadata = {
  title: '关于 - Cosine 余弦是定理',
  description: '了解更多关于 Cosine 余弦是定理博客的信息',
}

export default async function AboutPage() {
  const posts = await getAllPosts()
  const totalPosts = posts.length
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tags.add(tag))
  })
  
  const stats = {
    totalPosts,
    totalTags: tags.size,
    totalCategories: 0, // Keep for backward compatibility, will remove from About component later
  }
  
  return <About stats={stats} />
}