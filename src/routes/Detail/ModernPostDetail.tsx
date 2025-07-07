'use client'

import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import styled from "@emotion/styled"
import { BiTime, BiCalendar, BiUser, BiArrowBack, BiHome, BiBookmark, BiShare } from "react-icons/bi"
import { useScheme } from "src/hooks/useScheme"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const ModernPostDetail: React.FC<Props> = ({ post }) => {
  const [scheme] = useScheme()
  
  if (!post) {
    return (
      <Container data-theme={scheme}>
        <ErrorContainer>
          <ErrorContent>
            <ErrorTitle>404 - File Not Found</ErrorTitle>
            <ErrorMessage>
              <span className="prompt">cat:</span>
              <span className="path">{post?.slug || 'unknown'}.md</span>
              <span className="error">: No such file or directory</span>
            </ErrorMessage>
            <BackButton href="/">
              <BiArrowBack />
              cd ~/
            </BackButton>
          </ErrorContent>
        </ErrorContainer>
      </Container>
    )
  }

  return (
    <Container data-theme={scheme}>
      {/* Simple Header */}
      <Header>
        <HeaderContent>
          <NavButton href="/">
            <BiArrowBack />
            <span>Back</span>
          </NavButton>
          
          <HeaderMeta>
            <span>{post.frontmatter.categories?.[0] || '技术'}</span>
            <span>•</span>
            <span>{format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}</span>
            <span>•</span>
            <span>{post.readingTime || '5'}min</span>
          </HeaderMeta>
        </HeaderContent>
      </Header>

      {/* Article */}
      <Article>
        {/* Article Header */}
        <ArticleHeader>
          <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
          
          {post.frontmatter.description && (
            <ArticleDescription>{post.frontmatter.description}</ArticleDescription>
          )}
          
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <TagsContainer>
              {post.frontmatter.tags.map(tag => (
                <TagBadge key={tag}>#{tag}</TagBadge>
              ))}
            </TagsContainer>
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
          <FooterInfo>
            Last updated: {format(new Date(post.updatedTime || post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
          </FooterInfo>
          
          <BackToHome href="/">
            <BiHome />
            <span>Back to Home</span>
          </BackToHome>
        </ArticleFooter>
      </Article>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? '#0a0a0a' : '#fafafa'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#1a1a1a'};
  font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', monospace;
  transition: all 0.3s ease;
`

// Error Page Styles
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`

const ErrorContent = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#fff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
  border-radius: 8px;
`

const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
`

const ErrorMessage = styled.div`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: ${props => props.theme === 'dark' ? '#ccc' : '#666'};
  
  .prompt {
    color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  }
  
  .path {
    color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  }
  
  .error {
    color: ${props => props.theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
  }
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
    border-color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  }
`

// Header Styles
const Header = styled.header`
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#fff'};
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
`

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  }
`

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

// Article Styles
const Article = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const ArticleHeader = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#1a1a1a'};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const ArticleDescription = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  line-height: 1.6;
  margin: 0 0 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`

const TagBadge = styled.span`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
`

const CoverImage = styled.div`
  margin: 0 0 3rem 0;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const ArticleContent = styled.div`
  line-height: 1.8;
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#ccc' : '#333'};
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#1a1a1a'};
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.3;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }
  
  p {
    margin-bottom: 1.5rem;
    text-align: justify;
  }
  
  a {
    color: ${props => props.theme === 'dark' ? '#4dabf7' : '#1c7ed6'};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  /* Code */
  code {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    color: ${props => props.theme === 'dark' ? '#ff79c6' : '#e91e63'};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: ${props => props.theme === 'dark' ? '#1e1e1e' : '#f8f9fa'};
    border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    
    code {
      background: transparent;
      color: ${props => props.theme === 'dark' ? '#f8f8f2' : '#212529'};
      padding: 0;
      font-size: 0.9rem;
    }
  }
  
  /* Lists */
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
    
    p {
      margin-bottom: 0.5rem;
    }
  }
  
  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${props => props.theme === 'dark' ? '#4dabf7' : '#1c7ed6'};
    background: ${props => props.theme === 'dark' ? 'rgba(77, 171, 247, 0.1)' : 'rgba(28, 126, 214, 0.1)'};
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 8px 8px 0;
    
    p {
      margin-bottom: 0;
      font-style: italic;
      color: ${props => props.theme === 'dark' ? '#b8c5d6' : '#495057'};
    }
  }
  
  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
    
    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
    }
    
    th {
      background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f9fa'};
      color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#212529'};
      font-weight: 600;
    }
    
    tbody tr:hover {
      background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
    }
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Horizontal rules */
  hr {
    border: none;
    height: 1px;
    background: ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
    margin: 3rem 0;
  }
`

const ArticleFooter = styled.footer`
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const FooterInfo = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  text-align: center;
`

const BackToHome = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f9fa'};
  color: ${props => props.theme === 'dark' ? '#4dabf7' : '#1c7ed6'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#333' : '#e9ecef'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

export default ModernPostDetail