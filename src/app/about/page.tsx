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
  const categories = new Set<string>()
  
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tags.add(tag))
    post.frontmatter.categories.forEach(cat => categories.add(cat))
  })
  
  const stats = {
    totalPosts,
    totalTags: tags.size,
    totalCategories: categories.size,
  }
  
  return <About stats={stats} />
}