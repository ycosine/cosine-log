'use client'

import { useState } from "react"
import styled from "@emotion/styled"
import { colors } from "src/styles/colors"
import usePostsQuery from "src/hooks/usePostsQuery"
import { useTagsQuery } from "src/hooks/useTagsQuery"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"
import { useScheme } from "src/hooks/useScheme"
import { Post } from "src/libs/markdown/types"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import { BiTime, BiTag, BiFolder, BiSearch } from "react-icons/bi"
import { HiOutlineSparkles } from "react-icons/hi"

const ModernFeed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  const posts = usePostsQuery()
  const { data: tags } = useTagsQuery()
  const { data: categories } = useCategoriesQuery()
  const [scheme] = useScheme()

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === null || 
      post.frontmatter.categories.includes(selectedCategory)
    
    const matchesTag = selectedTag === null || 
      post.frontmatter.tags.includes(selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  })

  const featuredPosts = filteredPosts.slice(0, 3)
  const regularPosts = filteredPosts.slice(3)

  return (
    <Container data-theme={scheme}>
      {/* Terminal Header */}
      <Header>
        <HeaderContent>
          <TerminalPrompt>
            <span className="user">user@cosine</span>
            <span className="separator">:</span>
            <span className="path">~/blog</span>
            <span className="cursor">$</span>
          </TerminalPrompt>
          
          <HeaderStats>
            <span>{posts.length} posts</span>
            <span>{Object.keys(tags).length} tags</span>
          </HeaderStats>
        </HeaderContent>
      </Header>

      {/* Search Bar */}
      <SearchSection>
        <SearchContainer>
          <SearchPrompt>ls | grep</SearchPrompt>
          <SearchInput
            type="text"
            placeholder="'keyword'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        
        {(selectedCategory || selectedTag) && (
          <ActiveFilters>
            <span>Active filters:</span>
            {selectedCategory && (
              <FilterChip onClick={() => setSelectedCategory(null)}>
                cat:{selectedCategory} ✕
              </FilterChip>
            )}
            {selectedTag && (
              <FilterChip onClick={() => setSelectedTag(null)}>
                tag:{selectedTag} ✕
              </FilterChip>
            )}
          </ActiveFilters>
        )}
      </SearchSection>

      {/* Quick Filters */}
      <FilterSection>
        <FilterGroup>
          <FilterLabel>Categories:</FilterLabel>
          <FilterTabs>
            {Object.entries(categories).slice(0, 5).map(([category, count]) => (
              <FilterTab
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </FilterTab>
            ))}
          </FilterTabs>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Tags:</FilterLabel>
          <TagCloud>
            {Object.entries(tags).slice(0, 6).map(([tag, count]) => (
              <TagItem
                key={tag}
                active={selectedTag === tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </TagItem>
            ))}
          </TagCloud>
        </FilterGroup>
      </FilterSection>

      {/* Posts List */}
      <PostsSection>
        <SectionHeader>
          <SectionTitle>
            {filteredPosts.length} file{filteredPosts.length !== 1 ? 's' : ''} found
          </SectionTitle>
        </SectionHeader>
        
        <PostsList>
          {filteredPosts.map((post, index) => (
            <PostItem key={post.slug}>
              <Link href={`/${post.slug}`}>
                <PostItemContent>
                  <PostItemHeader>
                    <PostItemMeta>
                      <PostItemDate>
                        {format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
                      </PostItemDate>
                      <PostItemCategory>[{post.frontmatter.categories[0]}]</PostItemCategory>
                      <ReadingTime>
                        {post.readingTime}min
                      </ReadingTime>
                    </PostItemMeta>
                  </PostItemHeader>
                  
                  <PostItemTitle>{post.frontmatter.title}</PostItemTitle>
                  <PostItemDescription>{post.excerpt}</PostItemDescription>
                  
                  <PostItemTags>
                    {post.frontmatter.tags.slice(0, 3).map(tag => (
                      <TagBadge key={tag}>#{tag}</TagBadge>
                    ))}
                  </PostItemTags>
                </PostItemContent>
              </Link>
            </PostItem>
          ))}
        </PostsList>
      </PostsSection>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? '#0a0a0a' : '#fafafa'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#1a1a1a'};
  font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', monospace;
  transition: all 0.3s ease;
`

// Header Styles
const Header = styled.header`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const TerminalPrompt = styled.div`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#ccc' : '#333'};
  
  .user {
    color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  }
  
  .separator {
    color: ${props => props.theme === 'dark' ? '#666' : '#999'};
  }
  
  .path {
    color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  }
  
  .cursor {
    color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  }
`

const HeaderStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    font-size: 0.8rem;
  }
`

// Search Section
const SearchSection = styled.section`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#fff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  
  &:focus-within {
    border-color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  }
`

const SearchPrompt = styled.span`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 0.875rem;
  white-space: nowrap;
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#1a1a1a'};
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#666' : '#999'};
  }
`

const ActiveFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  flex-wrap: wrap;
`

const FilterChip = styled.button`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  color: ${props => props.theme === 'dark' ? '#ccc' : '#333'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
  }
`

// Filter Section
const FilterSection = styled.section`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const FilterLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  min-width: 5rem;
`

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const FilterTab = styled.button<{ active: boolean }>`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${props => props.active ? 
    (props.theme === 'dark' ? '#00ff41' : '#007acc') : 
    (props.theme === 'dark' ? '#333' : '#ddd')};
  background: ${props => props.active ? 
    (props.theme === 'dark' ? 'rgba(0, 255, 65, 0.1)' : 'rgba(0, 122, 204, 0.1)') : 
    'transparent'};
  color: ${props => props.active ? 
    (props.theme === 'dark' ? '#00ff41' : '#007acc') : 
    (props.theme === 'dark' ? '#ccc' : '#666')};
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:hover {
    border-color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
    color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
  }
`

const TagCloud = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const TagItem = styled.button<{ active: boolean }>`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${props => props.active ? 
    (props.theme === 'dark' ? '#ff6b6b' : '#e74c3c') : 
    (props.theme === 'dark' ? '#444' : '#ddd')};
  background: ${props => props.active ? 
    (props.theme === 'dark' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(231, 76, 60, 0.1)') : 
    'transparent'};
  color: ${props => props.active ? 
    (props.theme === 'dark' ? '#ff6b6b' : '#e74c3c') : 
    (props.theme === 'dark' ? '#aaa' : '#666')};
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:hover {
    border-color: ${props => props.theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
    color: ${props => props.theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
  }
`

// Posts Section
const PostsSection = styled.section`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  margin: 0;
`

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const PostItem = styled.article`
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#fff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#e0e0e0'};
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
    transform: translateX(2px);
  }
`

const PostItemContent = styled.div`
  padding: 1rem;
`

const PostItemHeader = styled.div`
  margin-bottom: 0.75rem;
`

const PostItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  flex-wrap: wrap;
`

const PostItemDate = styled.span`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
`

const PostItemCategory = styled.span`
  color: ${props => props.theme === 'dark' ? '#00ff41' : '#007acc'};
`

const PostItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#1a1a1a'};
  line-height: 1.4;
`

const PostItemDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
`

const PostItemTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`

const TagBadge = styled.span<{ small?: boolean }>`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
  padding: ${props => props.small ? '0.25rem 0.5rem' : '0.375rem 0.75rem'};
  border-radius: 4px;
  font-size: ${props => props.small ? '0.75rem' : '0.875rem'};
  font-weight: 500;
  font-family: inherit;
  
  &:before {
    content: '#';
    color: ${props => props.theme === 'dark' ? '#666' : '#999'};
  }
`

const ReadingTime = styled.span`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 0.75rem;
`

export default ModernFeed