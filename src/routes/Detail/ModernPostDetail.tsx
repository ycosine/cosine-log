'use client'

import styled from "@emotion/styled"
import { colors } from "src/styles/colors"
import { useScheme } from "src/hooks/useScheme"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import { BiTime, BiCalendar, BiUser, BiArrowBack } from "react-icons/bi"
import { HiOutlineShare, HiOutlineBookmark } from "react-icons/hi"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const ModernPostDetail: React.FC<Props> = ({ post }) => {
  const [scheme] = useScheme()

  if (!post) {
    return (
      <ErrorContainer>
        <h2>文章不存在</h2>
        <p>抱歉，您要查看的文章不存在或已被删除。</p>
        <Link href="/">
          <BackButton>
            <BiArrowBack />
            返回首页
          </BackButton>
        </Link>
      </ErrorContainer>
    )
  }

  return (
    <Container data-theme={scheme}>
      {/* Header */}
      <Header>
        <HeaderContent>
          <BackLink href="/">
            <BiArrowBack />
            返回首页
          </BackLink>
          
          <HeaderActions>
            <ActionButton>
              <HiOutlineBookmark />
            </ActionButton>
            <ActionButton>
              <HiOutlineShare />
            </ActionButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      {/* Article */}
      <Article>
        <ArticleHeader>
          <CategoryBadge>{post.frontmatter.categories[0]}</CategoryBadge>
          <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
          <ArticleDescription>{post.frontmatter.description}</ArticleDescription>
          
          <ArticleMeta>
            <MetaItem>
              <BiUser />
              {post.frontmatter.author}
            </MetaItem>
            <MetaItem>
              <BiCalendar />
              {format(new Date(post.frontmatter.date), 'yyyy年MM月dd日', { locale: zhCN })}
            </MetaItem>
            <MetaItem>
              <BiTime />
              {post.readingTime} 分钟阅读
            </MetaItem>
          </ArticleMeta>

          <TagsList>
            {post.frontmatter.tags.map(tag => (
              <TagBadge key={tag}>{tag}</TagBadge>
            ))}
          </TagsList>
        </ArticleHeader>

        {post.frontmatter.cover && (
          <CoverImage>
            <img src={post.frontmatter.cover} alt={post.frontmatter.title} />
          </CoverImage>
        )}

        <ArticleContent
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        <ArticleFooter>
          <UpdatedTime>
            最后更新：{format(new Date(post.updatedTime), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
          </UpdatedTime>
        </ArticleFooter>
      </Article>

      {/* Table of Contents - could be added later */}
      
      {/* Related Posts - could be added later */}
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? colors.dark.background.primary : colors.light.background.primary};
  color: ${props => props.theme === 'dark' ? colors.dark.text.primary : colors.light.text.primary};
  transition: all 0.3s ease;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${colors.light.border.primary};
  border-top: 3px solid ${colors.light.primary[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${colors.light.background.primary};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${colors.light.border.primary};
  
  [data-theme="dark"] & {
    background: ${colors.dark.background.primary};
    border-bottom: 1px solid ${colors.dark.border.primary};
  }
`

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.light.text.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${colors.light.primary[600]};
  }
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
    
    &:hover {
      color: ${colors.dark.primary[400]};
    }
  }
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${colors.light.primary[500]};
  color: ${colors.light.text.inverse};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: ${colors.light.primary[600]};
  }
  
  [data-theme="dark"] & {
    background: ${colors.dark.primary[500]};
    
    &:hover {
      background: ${colors.dark.primary[600]};
    }
  }
`

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid ${colors.light.border.primary};
  border-radius: 8px;
  color: ${colors.light.text.secondary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.light.background.secondary};
    border-color: ${colors.light.primary[300]};
    color: ${colors.light.primary[600]};
  }
  
  [data-theme="dark"] & {
    border-color: ${colors.dark.border.primary};
    color: ${colors.dark.text.secondary};
    
    &:hover {
      background: ${colors.dark.background.secondary};
      border-color: ${colors.dark.primary[400]};
      color: ${colors.dark.primary[400]};
    }
  }
`

const Article = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const ArticleHeader = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`

const CategoryBadge = styled.span`
  display: inline-block;
  background: ${colors.light.primary[100]};
  color: ${colors.light.primary[700]};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  [data-theme="dark"] & {
    background: ${colors.dark.primary[200]};
    color: ${colors.dark.primary[800]};
  }
`

const ArticleTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: ${colors.light.text.primary};
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const ArticleDescription = styled.p`
  font-size: 1.25rem;
  color: ${colors.light.text.secondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
  }
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  color: ${colors.light.text.tertiary};
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.tertiary};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const TagsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const TagBadge = styled.span`
  background: ${colors.light.secondary[100]};
  color: ${colors.light.secondary[700]};
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
  
  [data-theme="dark"] & {
    background: ${colors.dark.secondary[200]};
    color: ${colors.dark.secondary[800]};
  }
`

const CoverImage = styled.div`
  margin-bottom: 3rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  [data-theme="dark"] & {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
`

const ArticleContent = styled.div`
  line-height: 1.8;
  font-size: 1.125rem;
  color: ${colors.light.text.primary};
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.primary};
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 2.5rem 0 1rem 0;
    line-height: 1.3;
    font-weight: 700;
  }
  
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1.125rem; }
  
  p {
    margin: 1.5rem 0;
  }
  
  /* Lists */
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin: 0.5rem 0;
  }
  
  /* Links */
  a {
    color: ${colors.light.text.link};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;
    
    &:hover {
      border-bottom-color: ${colors.light.text.linkHover};
    }
    
    [data-theme="dark"] & {
      color: ${colors.dark.text.link};
      
      &:hover {
        border-bottom-color: ${colors.dark.text.linkHover};
      }
    }
  }
  
  /* Code */
  code {
    background: ${colors.light.background.tertiary};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875em;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    
    [data-theme="dark"] & {
      background: ${colors.dark.background.tertiary};
    }
  }
  
  pre {
    background: ${colors.light.background.tertiary};
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 2rem 0;
    
    [data-theme="dark"] & {
      background: ${colors.dark.background.tertiary};
    }
    
    code {
      background: transparent;
      padding: 0;
    }
  }
  
  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${colors.light.primary[300]};
    margin: 2rem 0;
    padding: 1rem 2rem;
    background: ${colors.light.background.secondary};
    border-radius: 0 8px 8px 0;
    font-style: italic;
    
    [data-theme="dark"] & {
      border-left-color: ${colors.dark.primary[400]};
      background: ${colors.dark.background.secondary};
    }
  }
  
  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    background: ${colors.light.background.card};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    [data-theme="dark"] & {
      background: ${colors.dark.background.card};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  }
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${colors.light.border.primary};
    
    [data-theme="dark"] & {
      border-bottom-color: ${colors.dark.border.primary};
    }
  }
  
  th {
    background: ${colors.light.background.secondary};
    font-weight: 600;
    
    [data-theme="dark"] & {
      background: ${colors.dark.background.secondary};
    }
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    [data-theme="dark"] & {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
  }
  
  /* Horizontal rule */
  hr {
    border: none;
    height: 1px;
    background: ${colors.light.border.primary};
    margin: 3rem 0;
    
    [data-theme="dark"] & {
      background: ${colors.dark.border.primary};
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.125rem; }
    h6 { font-size: 1rem; }
    
    pre {
      padding: 1rem;
      margin: 1.5rem -1rem;
      border-radius: 0;
    }
    
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 0.75rem 0.5rem;
    }
  }
`

const ArticleFooter = styled.footer`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${colors.light.border.primary};
  text-align: center;
  
  [data-theme="dark"] & {
    border-top-color: ${colors.dark.border.primary};
  }
`

const UpdatedTime = styled.p`
  color: ${colors.light.text.tertiary};
  font-size: 0.875rem;
  margin: 0;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.tertiary};
  }
`

export default ModernPostDetail