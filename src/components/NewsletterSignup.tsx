'use client'

import { useState } from 'react'
import { HiMail, HiCheckCircle } from 'react-icons/hi'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
    
    // 3秒后重置状态
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <HiMail className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          订阅技术周刊
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          每周分享最新的技术文章、开源项目和前端趋势。订阅后第一时间获取优质内容推送。
        </p>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  邮箱地址
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入你的邮箱地址"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    订阅中...
                  </div>
                ) : (
                  '订阅'
                )}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              免费订阅，随时取消。我们不会发送垃圾邮件。
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <HiCheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              订阅成功！
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              感谢你的订阅！你将很快收到确认邮件。
            </p>
          </div>
        )}
        
        {/* Social Proof */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            已有 <span className="font-semibold text-gray-900 dark:text-white">1,000+</span> 开发者订阅
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-white"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              和其他开发者一起学习成长
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}