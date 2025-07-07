'use client'

import Link from 'next/link'
import { HiArrowRight, HiCode, HiLightBulb, HiFire } from 'react-icons/hi'

export default function Hero() {
  const features = [
    {
      icon: HiCode,
      title: '技术分享',
      description: '前端开发、后端技术、架构设计'
    },
    {
      icon: HiLightBulb,
      title: '思考总结',
      description: '项目经验、技术思考、学习心得'
    },
    {
      icon: HiFire,
      title: '开源项目',
      description: '分享有趣的开源项目和工具'
    }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cosine
            </span>
            <br />
            <span className="text-4xl lg:text-5xl">余弦是定理</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            世间一切变化皆有利于我
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up">
            分享前端开发经验、技术思考和开源项目。一个专注于技术成长的个人博客。
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Link
              href="/posts"
              className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              开始阅读
              <HiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 font-medium hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-200"
            >
              了解更多
            </Link>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-col items-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  )
}