'use client'

import Link from 'next/link'
import { HiCalendar, HiClock, HiTag } from 'react-icons/hi'

export default function FeaturedPosts() {
  // 这里暂时使用模拟数据，后续可以接入实际的API
  const featuredPosts = [
    {
      slug: 'nextjs-15-upgrade',
      title: 'Next.js 15 升级指南：从Pages Router到App Router',
      excerpt: '详细介绍如何将Next.js项目从Pages Router迁移到App Router，包括路由结构、数据获取、元数据配置等方面的变化。',
      date: '2024-01-15',
      readTime: '8 分钟',
      tags: ['Next.js', 'React', '升级'],
      cover: '/images/nextjs-cover.jpg',
      featured: true
    },
    {
      slug: 'react-query-v5',
      title: 'React Query v5 新特性解析',
      excerpt: 'React Query v5带来了许多重要更新，包括新的API设计、性能优化和TypeScript改进。',
      date: '2024-01-10',
      readTime: '6 分钟',
      tags: ['React', 'React Query', 'State Management'],
      cover: '/images/react-query-cover.jpg'
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            精选文章
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            深度技术分享和实践经验
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
      
      <div className="grid lg:grid-cols-2 gap-8">
        {featuredPosts.map((post, index) => (
          <article
            key={post.slug}
            className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              index === 0 ? 'lg:col-span-2' : ''
            }`}
          >
            <Link href={`/${post.slug}`}>
              <div className={`grid ${index === 0 ? 'lg:grid-cols-2' : ''} gap-0`}>
                {/* Cover Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    {/* Placeholder for cover image */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <HiTag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        精选
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className={`p-6 lg:p-8 ${index === 0 ? 'lg:order-1' : ''}`}>
                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <HiCalendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </div>
                    <div className="flex items-center">
                      <HiClock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                    index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                  }`}>
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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