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
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            <HiOutlineSparkles className="icon" />
            Cosine 余弦是定理
          </HeroTitle>
          <HeroSubtitle>
            记录技术思考与生活感悟的数字空间
          </HeroSubtitle>
          <HeroDescription>
            世间一切变化皆有利于我
          </HeroDescription>
        </HeroContent>
        <HeroStats>
          <StatItem>
            <StatNumber>{posts.length}</StatNumber>
            <StatLabel>文章</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{Object.keys(tags).length}</StatNumber>
            <StatLabel>标签</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{Object.keys(categories).length}</StatNumber>
            <StatLabel>分类</StatLabel>
          </StatItem>
        </HeroStats>
      </HeroSection>

      {/* Search and Filter Section */}
      <FilterSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BiSearch className="search-icon" />
        </SearchContainer>
        
        <FilterTabs>
          <FilterTab 
            active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            全部
          </FilterTab>
          {Object.entries(categories).map(([category, count]) => (
            <FilterTab
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({count})
            </FilterTab>
          ))}
        </FilterTabs>

        <TagCloud>
          {Object.entries(tags).map(([tag, count]) => (
            <TagItem
              key={tag}
              active={selectedTag === tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              #{tag} ({count})
            </TagItem>
          ))}
        </TagCloud>
      </FilterSection>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <FeaturedSection>
          <SectionTitle>精选文章</SectionTitle>
          <FeaturedGrid>
            {featuredPosts.map((post, index) => (
              <FeaturedCard key={post.slug} featured={index === 0}>
                <Link href={`/${post.slug}`}>
                  <FeaturedCardContent>
                    <FeaturedCardMeta>
                      <CategoryBadge>{post.frontmatter.categories[0]}</CategoryBadge>
                      <PostDate>
                        {format(new Date(post.frontmatter.date), 'yyyy年MM月dd日', { locale: zhCN })}
                      </PostDate>
                    </FeaturedCardMeta>
                    <FeaturedCardTitle>{post.frontmatter.title}</FeaturedCardTitle>
                    <FeaturedCardDescription>{post.excerpt}</FeaturedCardDescription>
                    <FeaturedCardTags>
                      {post.frontmatter.tags.slice(0, 3).map(tag => (
                        <TagBadge key={tag}>{tag}</TagBadge>
                      ))}
                    </FeaturedCardTags>
                    <FeaturedCardFooter>
                      <ReadingTime>
                        <BiTime />
                        {post.readingTime} 分钟阅读
                      </ReadingTime>
                    </FeaturedCardFooter>
                  </FeaturedCardContent>
                </Link>
              </FeaturedCard>
            ))}
          </FeaturedGrid>
        </FeaturedSection>
      )}

      {/* Regular Posts */}
      <PostsSection>
        <SectionTitle>最新文章</SectionTitle>
        <PostsGrid>
          {regularPosts.map(post => (
            <PostCard key={post.slug}>
              <Link href={`/${post.slug}`}>
                <PostCardContent>
                  <PostCardHeader>
                    <PostCardMeta>
                      <CategoryIcon>
                        <BiFolder />
                        {post.frontmatter.categories[0]}
                      </CategoryIcon>
                      <PostDate>
                        {format(new Date(post.frontmatter.date), 'MM/dd', { locale: zhCN })}
                      </PostDate>
                    </PostCardMeta>
                  </PostCardHeader>
                  <PostCardTitle>{post.frontmatter.title}</PostCardTitle>
                  <PostCardDescription>{post.excerpt}</PostCardDescription>
                  <PostCardTags>
                    {post.frontmatter.tags.slice(0, 3).map(tag => (
                      <TagBadge key={tag} small>{tag}</TagBadge>
                    ))}
                  </PostCardTags>
                  <PostCardFooter>
                    <ReadingTime>
                      <BiTime />
                      {post.readingTime} 分钟
                    </ReadingTime>
                  </PostCardFooter>
                </PostCardContent>
              </Link>
            </PostCard>
          ))}
        </PostsGrid>
      </PostsSection>
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

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, 
    ${colors.light.primary[50]} 0%, 
    ${colors.light.secondary[50]} 100%
  );
  border-bottom: 1px solid ${colors.light.border.primary};
  
  [data-theme="dark"] & {
    background: linear-gradient(135deg, 
      ${colors.dark.background.secondary} 0%, 
      ${colors.dark.background.tertiary} 100%
    );
    border-bottom: 1px solid ${colors.dark.border.primary};
  }
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 3rem;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  .icon {
    color: ${colors.light.primary[500]};
  }
  
  [data-theme="dark"] & .icon {
    color: ${colors.dark.primary[400]};
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${colors.light.text.secondary};
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.light.text.tertiary};
  font-style: italic;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.tertiary};
  }
`

const HeroStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`

const StatItem = styled.div`
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.light.primary[600]};
  margin-bottom: 0.5rem;
  
  [data-theme="dark"] & {
    color: ${colors.dark.primary[400]};
  }
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${colors.light.text.secondary};
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
  }
`

const FilterSection = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid ${colors.light.border.primary};
  
  [data-theme="dark"] & {
    border-bottom: 1px solid ${colors.dark.border.primary};
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.light.text.tertiary};
    font-size: 1.25rem;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${colors.light.border.primary};
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: ${colors.light.background.primary};
  
  &:focus {
    border-color: ${colors.light.primary[500]};
    box-shadow: 0 0 0 3px ${colors.light.primary[100]};
  }
  
  [data-theme="dark"] & {
    background: ${colors.dark.background.secondary};
    border-color: ${colors.dark.border.primary};
    color: ${colors.dark.text.primary};
    
    &:focus {
      border-color: ${colors.dark.primary[400]};
      box-shadow: 0 0 0 3px ${colors.dark.primary[100]};
    }
  }
`

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`

const FilterTab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? colors.light.primary[500] : colors.light.border.primary};
  border-radius: 25px;
  background: ${props => props.active ? colors.light.primary[500] : colors.light.background.primary};
  color: ${props => props.active ? colors.light.text.inverse : colors.light.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.light.primary[500]};
    background: ${props => props.active ? colors.light.primary[600] : colors.light.primary[50]};
  }
  
  [data-theme="dark"] & {
    border-color: ${props => props.active ? colors.dark.primary[400] : colors.dark.border.primary};
    background: ${props => props.active ? colors.dark.primary[400] : colors.dark.background.secondary};
    color: ${props => props.active ? colors.dark.text.inverse : colors.dark.text.primary};
    
    &:hover {
      border-color: ${colors.dark.primary[400]};
      background: ${props => props.active ? colors.dark.primary[500] : colors.dark.primary[100]};
    }
  }
`

const TagCloud = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

const TagItem = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? colors.light.secondary[500] : colors.light.border.secondary};
  border-radius: 15px;
  background: ${props => props.active ? colors.light.secondary[500] : colors.light.background.secondary};
  color: ${props => props.active ? colors.light.text.inverse : colors.light.text.secondary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.light.secondary[500]};
    background: ${props => props.active ? colors.light.secondary[600] : colors.light.secondary[50]};
  }
  
  [data-theme="dark"] & {
    border-color: ${props => props.active ? colors.dark.secondary[400] : colors.dark.border.secondary};
    background: ${props => props.active ? colors.dark.secondary[400] : colors.dark.background.tertiary};
    color: ${props => props.active ? colors.dark.text.inverse : colors.dark.text.secondary};
    
    &:hover {
      border-color: ${colors.dark.secondary[400]};
      background: ${props => props.active ? colors.dark.secondary[500] : colors.dark.secondary[100]};
    }
  }
`

const FeaturedSection = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const PostsSection = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.light.text.primary};
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.primary};
  }
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FeaturedCard = styled.article<{ featured: boolean }>`
  background: ${colors.light.background.card};
  border: 1px solid ${colors.light.border.primary};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.featured && `
    grid-row: span 2;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: ${colors.light.primary[300]};
  }
  
  [data-theme="dark"] & {
    background: ${colors.dark.background.card};
    border-color: ${colors.dark.border.primary};
    
    &:hover {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: ${colors.dark.primary[400]};
    }
  }
`

const FeaturedCardContent = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const FeaturedCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const CategoryBadge = styled.span`
  background: ${colors.light.primary[100]};
  color: ${colors.light.primary[700]};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  
  [data-theme="dark"] & {
    background: ${colors.dark.primary[200]};
    color: ${colors.dark.primary[800]};
  }
`

const PostDate = styled.span`
  color: ${colors.light.text.tertiary};
  font-size: 0.875rem;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.tertiary};
  }
`

const FeaturedCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${colors.light.text.primary};
  line-height: 1.4;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.primary};
  }
`

const FeaturedCardDescription = styled.p`
  color: ${colors.light.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
  }
`

const FeaturedCardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`

const TagBadge = styled.span<{ small?: boolean }>`
  background: ${colors.light.secondary[100]};
  color: ${colors.light.secondary[700]};
  padding: ${props => props.small ? '0.25rem 0.5rem' : '0.375rem 0.75rem'};
  border-radius: 8px;
  font-size: ${props => props.small ? '0.75rem' : '0.875rem'};
  font-weight: 500;
  
  [data-theme="dark"] & {
    background: ${colors.dark.secondary[200]};
    color: ${colors.dark.secondary[800]};
  }
`

const FeaturedCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${colors.light.border.tertiary};
  
  [data-theme="dark"] & {
    border-top: 1px solid ${colors.dark.border.tertiary};
  }
`

const ReadingTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.light.text.tertiary};
  font-size: 0.875rem;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.tertiary};
  }
`

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const PostCard = styled.article`
  background: ${colors.light.background.card};
  border: 1px solid ${colors.light.border.primary};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: ${colors.light.primary[300]};
  }
  
  [data-theme="dark"] & {
    background: ${colors.dark.background.card};
    border-color: ${colors.dark.border.primary};
    
    &:hover {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      border-color: ${colors.dark.primary[400]};
    }
  }
`

const PostCardContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PostCardHeader = styled.div`
  margin-bottom: 1rem;
`

const PostCardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const CategoryIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.light.primary[600]};
  font-size: 0.875rem;
  font-weight: 500;
  
  [data-theme="dark"] & {
    color: ${colors.dark.primary[400]};
  }
`

const PostCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${colors.light.text.primary};
  line-height: 1.4;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.primary};
  }
`

const PostCardDescription = styled.p`
  color: ${colors.light.text.secondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
  font-size: 0.875rem;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
  }
`

const PostCardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`

const PostCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${colors.light.border.tertiary};
  
  [data-theme="dark"] & {
    border-top: 1px solid ${colors.dark.border.tertiary};
  }
`

export default ModernFeed