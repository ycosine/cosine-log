'use client'

import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import styled from "@emotion/styled"
import { useScheme } from "src/hooks/useScheme"
import TypoThemeToggle from "src/components/TypoThemeToggle"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const TypoPostDetail: React.FC<Props> = ({ post }) => {
  const [scheme] = useScheme()
  
  if (!post) {
    return (
      <Container data-theme={scheme}>
        <Header>
          <Nav>
            <SiteTitle href="/">Cosine 余弦是定理</SiteTitle>
            <NavLinks>
              <NavLink href="/archives">Archives</NavLink>
              <NavLink href="/about">About</NavLink>
              <TypoThemeToggle />
            </NavLinks>
          </Nav>
        </Header>
        
        <Main>
          <ErrorMessage>
            <h1>404 - Post Not Found</h1>
            <p>The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <BackLink href="/">← Back to Home</BackLink>
          </ErrorMessage>
        </Main>
      </Container>
    )
  }

  return (
    <Container data-theme={scheme}>
      {/* Header */}
      <Header>
        <Nav>
          <SiteTitle href="/">Cosine 余弦是定理</SiteTitle>
          <NavLinks>
            <NavLink href="/archives">Archives</NavLink>
            <NavLink href="/about">About</NavLink>
            <TypoThemeToggle />
          </NavLinks>
        </Nav>
      </Header>

      {/* Main Content */}
      <Main>
        <Article>
          {/* Article Header */}
          <ArticleHeader>
            <ArticleMeta>
              <MetaItem>
                {format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
              </MetaItem>
              <MetaSeparator>·</MetaSeparator>
              <MetaItem>{post.frontmatter.categories[0] || '未分类'}</MetaItem>
              <MetaSeparator>·</MetaSeparator>
              <MetaItem>{post.readingTime || '5'} min read</MetaItem>
            </ArticleMeta>
            
            <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
            
            {post.frontmatter.description && (
              <ArticleDescription>{post.frontmatter.description}</ArticleDescription>
            )}
            
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <ArticleTags>
                {post.frontmatter.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ArticleTags>
            )}
          </ArticleHeader>

          {/* Cover Image */}
          {post.frontmatter.cover && (
            <CoverImage>
              <img 
                src={post.frontmatter.cover} 
                alt={post.frontmatter.title}
              />
            </CoverImage>
          )}

          {/* Article Content */}
          <ArticleContent 
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />

          {/* Article Footer */}
          <ArticleFooter>
            <FooterMeta>
              Last updated: {format(new Date(post.updatedTime || post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
            </FooterMeta>
            
            <BackToHome href="/">
              ← Back to Home
            </BackToHome>
          </ArticleFooter>
        </Article>
      </Main>
    </Container>
  )
}

// Styled Components with Typo theme CSS variables
const Container = styled.div`
  --font-color: ${props => props.theme === 'dark' ? '#fff' : '#252525'};
  --font-color-secondary: ${props => props.theme === 'dark' ? '#c9c9c9' : '#5A5A5A'};
  --font-color-extra: ${props => props.theme === 'dark' ? '#969696' : '#969696'};
  --color-background: ${props => props.theme === 'dark' ? '#3b3e4a' : '#fff'};
  --color-hr: ${props => props.theme === 'dark' ? '#585c69' : '#e8e8e8'};
  --color-active: ${props => props.theme === 'dark' ? '#61AEEE' : '#4078F2'};
  --color-unactive: ${props => props.theme === 'dark' ? '#969696' : '#969696'};
  --color-list-item: ${props => props.theme === 'dark' ? '#4a4d59' : '#f7f7f7'};
  --color-code-block: ${props => props.theme === 'dark' ? '#4a4d59' : '#f7f7f7'};
  --main-width: 1080px;

  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--font-color);
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.75;
  letter-spacing: 0.6px;
  transition: all 0.3s ease;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-hr);
  z-index: 100;
  backdrop-filter: blur(10px);
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 24px 8vw;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px 8vw;
  }
`

const SiteTitle = styled(Link)`
  font-size: 24px;
  font-weight: 600;
  color: var(--font-color);
  text-decoration: none;
  transition: color 0.5s ease-in-out;
  
  &:hover {
    color: var(--color-active);
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`

const NavLink = styled(Link)`
  color: var(--font-color-secondary);
  text-decoration: none;
  font-size: 16px;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    color: var(--color-active);
    text-decoration: underline;
  }
`

const Main = styled.main`
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 48px 8vw;
`

const Article = styled.article`
  max-width: 800px;
  margin: 0 auto;
`

const ArticleHeader = styled.header`
  margin-bottom: 48px;
  text-align: center;
`

const ArticleMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: var(--font-color-extra);
  font-size: 14px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

const MetaItem = styled.span``

const MetaSeparator = styled.span`
  opacity: 0.5;
`

const ArticleTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: var(--font-color);
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const ArticleDescription = styled.p`
  font-size: 18px;
  color: var(--font-color-secondary);
  line-height: 1.6;
  margin: 0 0 24px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ArticleTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
`

const Tag = styled.span`
  font-size: 12px;
  color: var(--font-color-extra);
  background: var(--color-list-item);
  padding: 4px 12px;
  border-radius: 12px;
  
  &:before {
    content: '#';
  }
`

const CoverImage = styled.div`
  margin: 0 0 48px 0;
  text-align: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`

const ArticleContent = styled.div`
  line-height: 1.75;
  letter-spacing: 0.6px;
  margin-bottom: 64px;
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: var(--font-color);
    margin-top: 48px;
    margin-bottom: 24px;
    font-weight: 600;
    line-height: 1.3;
  }
  
  h1 { font-size: 32px; }
  h2 { font-size: 28px; }
  h3 { font-size: 24px; }
  h4 { font-size: 20px; }
  h5 { font-size: 18px; }
  h6 { font-size: 16px; }
  
  p {
    margin-bottom: 24px;
    color: var(--font-color);
  }
  
  a {
    color: var(--color-active);
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  /* Code */
  code {
    background: var(--color-code-block);
    color: var(--font-color);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "JetBrains Mono", "SF Mono", "Monaco", "Consolas", monospace;
    font-size: 14px;
  }
  
  pre {
    background: var(--color-code-block);
    border-radius: 8px;
    padding: 24px;
    overflow-x: auto;
    margin: 24px 0;
    
    code {
      background: transparent;
      padding: 0;
      font-size: 14px;
    }
  }
  
  /* Lists */
  ul, ol {
    margin-bottom: 24px;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 8px;
    color: var(--font-color);
    
    p {
      margin-bottom: 8px;
    }
  }
  
  /* Blockquotes */
  blockquote {
    border-left: 4px solid var(--color-active);
    background: var(--color-list-item);
    padding: 24px;
    margin: 24px 0;
    border-radius: 0 8px 8px 0;
    
    p {
      margin-bottom: 0;
      color: var(--font-color-secondary);
      font-style: italic;
    }
  }
  
  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--color-hr);
    
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--color-hr);
    }
    
    th {
      background: var(--color-list-item);
      color: var(--font-color);
      font-weight: 600;
    }
    
    tbody tr:hover {
      background: var(--color-list-item);
    }
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 24px 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  /* Horizontal rules */
  hr {
    border: none;
    height: 1px;
    background: var(--color-hr);
    margin: 48px 0;
  }
`

const ArticleFooter = styled.footer`
  border-top: 1px dashed var(--color-hr);
  padding-top: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FooterMeta = styled.div`
  font-size: 14px;
  color: var(--font-color-extra);
`

const BackToHome = styled(Link)`
  color: var(--color-active);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    text-decoration: underline;
    transform: translateX(-4px);
  }
`

const ErrorMessage = styled.div`
  text-align: center;
  padding: 64px 0;
  
  h1 {
    font-size: 32px;
    margin-bottom: 16px;
    color: var(--font-color);
  }
  
  p {
    font-size: 18px;
    color: var(--font-color-secondary);
    margin-bottom: 32px;
  }
`

const BackLink = styled(Link)`
  color: var(--color-active);
  text-decoration: none;
  font-size: 16px;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    text-decoration: underline;
  }
`

export default TypoPostDetail