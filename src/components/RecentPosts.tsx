'use client'

import Link from 'next/link'
import { HiCalendar, HiClock } from 'react-icons/hi'

export default function RecentPosts() {
  // 模拟数据，后续接入实际API
  const recentPosts = [
    {
      slug: 'test-post',
      title: '测试文章',
      excerpt: '这是一篇测试文章的内容。测试内容，确保 Markdown 渲染正常工作。',
      date: '2024-01-01',
      readTime: '3 分钟',
      category: '技术'
    },
    {
      slug: 'tailwind-dark-mode',
      title: 'Tailwind CSS 暗黑模式最佳实践',
      excerpt: '如何在Tailwind CSS中优雅地实现暗黑模式，包括配置、组件设计和用户体验优化。',
      date: '2024-01-05',
      readTime: '5 分钟',
      category: '前端'
    },
    {
      slug: 'typescript-tips',
      title: 'TypeScript 进阶技巧分享',
      excerpt: '分享一些TypeScript的高级用法，帮助你写出更加类型安全和优雅的代码。',
      date: '2024-01-08',
      readTime: '7 分钟',
      category: 'TypeScript'
    },
    {
      slug: 'performance-optimization',
      title: 'React 应用性能优化指南',
      excerpt: '从代码分割到懒加载，从memo到useMemo，全面提升React应用的性能表现。',
      date: '2024-01-12',
      readTime: '10 分钟',
      category: 'React'
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            最新文章
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            最近的技术思考和项目分享
          </p>
        </div>
        
        <Link 
          href="/posts"
          className="hidden sm:inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          查看全部
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {recentPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
          >
            <Link href={`/${post.slug}`}>
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {post.category}
                  </span>
                  
                  {/* Meta Info */}
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <HiCalendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                      <HiClock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">阅读更多</span>
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      {/* Mobile View All Link */}
      <div className="text-center mt-8 sm:hidden">
        <Link 
          href="/posts"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          查看全部文章
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}