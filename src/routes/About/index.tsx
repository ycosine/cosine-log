"use client"

import Link from "next/link"
import ThemeToggle from "src/components/ThemeToggle"
import Footer from "src/components/Footer"
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
    <div className="min-h-screen bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font font-montserrat text-base leading-[1.75] tracking-[0.6px] typo-transition">
      {/* Top spacer to cover scroll content */}
      <div className="fixed top-0 left-0 right-0 h-4 bg-typo-light-background dark:bg-typo-dark-background z-40"></div>

      {/* Header - 与首页保持一致 */}
      <header className="sticky top-4 bg-typo-light-background/80 dark:bg-typo-dark-background/80 backdrop-blur-[10px] z-50">
        <div className="max-width-main mx-auto px-[8vw]">
          <nav className="flex justify-between items-center py-6 border-b border-typo-light-hr dark:border-typo-dark-hr max-md:flex-col max-md:gap-4 max-md:py-4">
            <Link
              href="/"
              className="text-2xl font-semibold text-typo-light-font dark:text-typo-dark-font no-underline typo-transition"
            >
              {CONFIG.blog.title}
            </Link>
            <div className="flex items-center gap-8 max-md:gap-6">
              <Link
                href="/archives"
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
              >
                归档
              </Link>
              <Link
                href="/about"
                className="text-typo-light-font dark:text-typo-dark-font no-underline text-base typo-transition underline"
              >
                关于
              </Link>
              <a
                href="/feed.xml"
                target="_blank"
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
              >
                RSS
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-width-main mx-auto px-[8vw] py-12">
        {/* Title Section */}
        <section className="text-center mb-16 py-12">
          <h1 className="text-[32px] font-semibold m-0 mb-4 text-typo-light-font dark:text-typo-dark-font">
            关于我
          </h1>
          <p className="text-lg text-typo-light-font-secondary dark:text-typo-dark-font-secondary m-0 leading-relaxed">
            {CONFIG.profile.bio}
          </p>
        </section>

        {/* About Content */}
        <div className="max-w-[700px] mx-auto">
          {/* Bio Section */}
          <section className="mb-12">
            <p className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary leading-relaxed mb-6">
              {CONFIG.profile.aboutBio ||
                `${CONFIG.blog.title} 是一个专注于技术分享和思考的个人博客。在这里，我会分享我的技术心得、学习笔记以及对生活的感悟。`}
            </p>
          </section>

          {/* Stats Section */}
          <section className="mb-12">
            <div className="flex justify-center gap-16 py-8 max-md:gap-8 max-md:flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-semibold text-typo-light-font dark:text-typo-dark-font mb-2">
                  {stats.totalPosts}
                </div>
                <div className="text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra">
                  文章
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-typo-light-font dark:text-typo-dark-font mb-2">
                  {stats.totalTags}
                </div>
                <div className="text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra">
                  标签
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-typo-light-font dark:text-typo-dark-font mb-2">
                  {stats.totalCategories}
                </div>
                <div className="text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra">
                  分类
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12 text-center">
            <h2 className="text-xl font-semibold mb-6 text-typo-light-font dark:text-typo-dark-font">
              联系方式
            </h2>
            <div className="flex flex-col gap-3 items-center">
              {CONFIG.profile.email && (
                <a
                  href={`mailto:${CONFIG.profile.email}`}
                  className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
                >
                  {CONFIG.profile.email}
                </a>
              )}
              {CONFIG.profile.github && (
                <a
                  href={`https://github.com/${CONFIG.profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
                >
                  @{CONFIG.profile.github}
                </a>
              )}
              {CONFIG.link && (
                <a
                  href={CONFIG.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
                >
                  {CONFIG.link}
                </a>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default About
