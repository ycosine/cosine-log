import { getAllPosts } from "src/libs/markdown/server"
import { CONFIG } from "../../../site.config"

export async function GET() {
  const posts = await getAllPosts()
  const siteUrl = CONFIG.link
  const author = CONFIG.profile.name

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${CONFIG.blog.title}</title>
    <link>${siteUrl}</link>
    <description>${CONFIG.blog.description}</description>
    <language>${CONFIG.lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map((post) => {
        const url = `${siteUrl}/${post.slug}`
        return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${CONFIG.profile.email} (${author})</author>
      ${post.frontmatter.tags
        .map((tag) => `<category>${tag}</category>`)
        .join("")}
    </item>`
      })
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
