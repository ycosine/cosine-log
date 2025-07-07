'use client'

import { useState } from "react"
import styled from "@emotion/styled"
import usePostsQuery from "src/hooks/usePostsQuery"
import { useTagsQuery } from "src/hooks/useTagsQuery"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"
import { useScheme } from "src/hooks/useScheme"
import { Post } from "src/libs/markdown/types"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import TypoThemeToggle from "src/components/TypoThemeToggle"

const TypoFeed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  
  const posts = usePostsQuery()
  const { data: tags } = useTagsQuery()
  const { data: categories } = useCategoriesQuery()
  const [scheme] = useScheme()

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

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
        {/* Bio Section */}
        <BioSection>
          <Bio>让万物穿过</Bio>
          <SubBio>记录技术思考与生活感悟的数字空间</SubBio>
        </BioSection>

        {/* Search Bar */}
        {posts.length > 10 && (
          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </SearchSection>
        )}

        {/* Posts List */}
        {currentPosts.length === 0 ? (
          <NoPostsMessage>
            <h2>暂无文章</h2>
            <p>正在加载文章列表...</p>
          </NoPostsMessage>
        ) : (
          <PostsList>
            {currentPosts.map((post) => (
            <PostItem key={post.slug}>
              <PostHeader>
                <PostDate>
                  {format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
                </PostDate>
                <PostCategory>
                  {post.frontmatter.categories[0] || '未分类'}
                </PostCategory>
              </PostHeader>
              
              <PostTitle>
                <PostLink href={`/${post.slug}`}>
                  {post.frontmatter.title}
                </PostLink>
              </PostTitle>
              
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              
              <PostFooter>
                <PostTags>
                  {post.frontmatter.tags.slice(0, 3).map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </PostTags>
                <ReadMore href={`/${post.slug}`}>
                  Read more →
                </ReadMore>
              </PostFooter>
            </PostItem>
            ))}
          </PostsList>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            {currentPage > 1 && (
              <PageNumber onClick={() => setCurrentPage(currentPage - 1)}>
                ←
              </PageNumber>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageNumber
                key={page}
                active={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageNumber>
            ))}
            
            {currentPage < totalPages && (
              <PageNumber onClick={() => setCurrentPage(currentPage + 1)}>
                →
              </PageNumber>
            )}
          </Pagination>
        )}
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

const BioSection = styled.section`
  text-align: center;
  margin-bottom: 64px;
  padding: 48px 0;
`

const Bio = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--font-color);
`

const SubBio = styled.p`
  font-size: 18px;
  color: var(--font-color-secondary);
  margin: 0;
  line-height: 1.6;
`

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`

const PostItem = styled.article`
  padding-bottom: 24px;
  border-bottom: 1px dashed var(--color-hr);
  
  &:last-child {
    border-bottom: none;
  }
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`

const PostDate = styled.time`
  font-size: 14px;
  color: var(--font-color-extra);
  font-weight: 500;
`

const PostCategory = styled.span`
  font-size: 14px;
  color: var(--color-active);
  background: var(--color-list-item);
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
`

const PostTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
`

const PostLink = styled(Link)`
  color: var(--font-color);
  text-decoration: none;
  transition: color 0.5s ease-in-out;
  
  &:hover {
    color: var(--color-active);
  }
`

const PostExcerpt = styled.p`
  color: var(--font-color-secondary);
  margin: 0 0 24px 0;
  line-height: 1.7;
`

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

const PostTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const Tag = styled.span`
  font-size: 12px;
  color: var(--font-color-extra);
  background: var(--color-list-item);
  padding: 2px 8px;
  border-radius: 8px;
  
  &:before {
    content: '#';
  }
`

const ReadMore = styled(Link)`
  color: var(--color-active);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    text-decoration: underline;
    transform: translateX(4px);
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 64px;
`

const SearchSection = styled.section`
  margin-bottom: 48px;
  text-align: center;
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  border: 1px solid var(--color-hr);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--font-color);
  font-size: 16px;
  transition: all 0.5s ease-in-out;
  
  &::placeholder {
    color: var(--font-color-extra);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-active);
    box-shadow: 0 0 0 2px rgba(64, 120, 242, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    &:focus {
      box-shadow: 0 0 0 2px rgba(97, 174, 238, 0.1);
    }
  }
`

const NoPostsMessage = styled.div`
  text-align: center;
  padding: 64px 0;
  color: var(--font-color-secondary);
  
  h2 {
    color: var(--font-color);
    margin-bottom: 16px;
  }
  
  p {
    margin: 8px 0;
  }
`

const PageNumber = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'var(--color-active)' : 'transparent'};
  color: ${props => props.active ? '#fff' : 'var(--font-color-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--color-active)' : 'var(--color-hr)'};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    background: var(--color-active);
    color: #fff;
    border-color: var(--color-active);
  }
`

export default TypoFeed