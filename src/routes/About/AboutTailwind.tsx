'use client'

import Link from "next/link"
import { BiArrowBack, BiGlobe, BiEnvelope, BiLogoGithub, BiBookOpen, BiTag, BiFolder } from "react-icons/bi"
import ThemeToggle from "src/components/ThemeToggle"
import { CONFIG } from "../../../site.config"

type Props = {
  stats: {
    totalPosts: number
    totalTags: number
    totalCategories: number
  }
}

const About: React.FC<Props> = ({ stats }) => {
  return (
    <div className="min-h-screen bg-background-primary-light dark:bg-background-primary-dark text-text-primary-light dark:text-text-primary-dark">
      {/* Header */}
      <header className="sticky top-4 bg-background-primary-light/80 dark:bg-background-primary-dark/80 backdrop-blur-[10px] z-50">
        <div className="max-width-main mx-auto px-8">
          <nav className="flex justify-between items-center py-6 border-b border-border-primary-light dark:border-border-primary-dark">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark no-underline transition-all duration-200 ease-in-out hover:text-text-primary-light dark:hover:text-text-primary-dark hover:-translate-x-0.5"
            >
              <BiArrowBack />
              <span>返回首页</span>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[800px] mx-auto px-8 py-12">
        <div className="animate-fade-in">
          <h1 className="text-[2.5rem] font-bold mb-12 text-center text-text-primary-light dark:text-text-primary-dark">
            关于本站
          </h1>
          
          {/* Profile Section */}
          <div className="flex items-center gap-8 mb-12 p-8 bg-background-secondary-light dark:bg-background-secondary-dark rounded-xl max-sm:flex-col max-sm:text-center">
            <div className="shrink-0">
              <img 
                src={CONFIG.profile.image} 
                alt={CONFIG.profile.name}
                className="w-[120px] h-[120px] rounded-full border-4 border-border-primary-light dark:border-border-primary-dark"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-[1.75rem] font-semibold mb-2 text-text-primary-light dark:text-text-primary-dark">
                {CONFIG.profile.name}
              </h2>
              <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                {CONFIG.profile.role}
              </p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {CONFIG.profile.bio}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mb-12 max-sm:grid-cols-1">
            <div className="flex flex-col items-center p-8 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-3xl text-primary-600 dark:text-primary-400 mb-2">
                <BiBookOpen />
              </div>
              <div className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                {stats.totalPosts}
              </div>
              <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                文章
              </div>
            </div>
            <div className="flex flex-col items-center p-8 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-3xl text-primary-600 dark:text-primary-400 mb-2">
                <BiTag />
              </div>
              <div className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                {stats.totalTags}
              </div>
              <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                标签
              </div>
            </div>
            <div className="flex flex-col items-center p-8 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-3xl text-primary-600 dark:text-primary-400 mb-2">
                <BiFolder />
              </div>
              <div className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                {stats.totalCategories}
              </div>
              <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                分类
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="mb-12">
            <section className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                关于博客
              </h3>
              <p className="leading-[1.8] text-text-secondary-light dark:text-text-secondary-dark mb-4">
                {CONFIG.blog.title} 是一个专注于技术分享和思考的个人博客。
                在这里，我会分享我的技术心得、学习笔记以及对生活的感悟。
              </p>
              <p className="leading-[1.8] text-text-secondary-light dark:text-text-secondary-dark mb-4">
                博客使用 Next.js 15 构建，支持 Markdown 写作，代码高亮，以及 Mermaid 流程图。
                所有文章都经过精心编写，力求为读者提供有价值的内容。
              </p>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                技术栈
              </h3>
              <ul className="list-none grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <li className="py-3 px-4 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark text-sm before:content-['▸_'] before:text-primary-600 dark:before:text-primary-400 before:font-bold">
                  Next.js 15 - React 框架
                </li>
                <li className="py-3 px-4 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark text-sm before:content-['▸_'] before:text-primary-600 dark:before:text-primary-400 before:font-bold">
                  TypeScript - 类型安全
                </li>
                <li className="py-3 px-4 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark text-sm before:content-['▸_'] before:text-primary-600 dark:before:text-primary-400 before:font-bold">
                  Tailwind CSS - 原子化样式
                </li>
                <li className="py-3 px-4 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark text-sm before:content-['▸_'] before:text-primary-600 dark:before:text-primary-400 before:font-bold">
                  Markdown - 内容管理
                </li>
                <li className="py-3 px-4 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark text-sm before:content-['▸_'] before:text-primary-600 dark:before:text-primary-400 before:font-bold">
                  Highlight.js - 代码高亮
                </li>
                <li className="py-3 px-4 bg-background-secondary-light dark:bg-background-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark text-sm before:content-['▸_'] before:text-primary-600 dark:before:text-primary-400 before:font-bold">
                  Mermaid - 流程图支持
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                联系方式
              </h3>
              <div className="flex flex-col gap-4">
                {CONFIG.profile.email && (
                  <div className="flex items-center gap-3 text-text-secondary-light dark:text-text-secondary-dark">
                    <BiEnvelope className="text-xl text-primary-600 dark:text-primary-400" />
                    <a 
                      href={`mailto:${CONFIG.profile.email}`}
                      className="text-text-secondary-light dark:text-text-secondary-dark no-underline transition-all duration-200 ease-in-out hover:text-text-primary-light dark:hover:text-text-primary-dark hover:underline"
                    >
                      {CONFIG.profile.email}
                    </a>
                  </div>
                )}
                {CONFIG.profile.github && (
                  <div className="flex items-center gap-3 text-text-secondary-light dark:text-text-secondary-dark">
                    <BiLogoGithub className="text-xl text-primary-600 dark:text-primary-400" />
                    <a 
                      href={`https://github.com/${CONFIG.profile.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary-light dark:text-text-secondary-dark no-underline transition-all duration-200 ease-in-out hover:text-text-primary-light dark:hover:text-text-primary-dark hover:underline"
                    >
                      @{CONFIG.profile.github}
                    </a>
                  </div>
                )}
                {CONFIG.link && (
                  <div className="flex items-center gap-3 text-text-secondary-light dark:text-text-secondary-dark">
                    <BiGlobe className="text-xl text-primary-600 dark:text-primary-400" />
                    <a 
                      href={CONFIG.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary-light dark:text-text-secondary-dark no-underline transition-all duration-200 ease-in-out hover:text-text-primary-light dark:hover:text-text-primary-dark hover:underline"
                    >
                      {CONFIG.link}
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="text-center pt-8 border-t border-border-primary-light dark:border-border-primary-dark">
            <p className="text-text-tertiary-light dark:text-text-tertiary-dark text-sm">
              © {CONFIG.since} - {new Date().getFullYear()} {CONFIG.profile.name}. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default About