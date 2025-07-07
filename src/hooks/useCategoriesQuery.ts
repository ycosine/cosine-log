'use client'

import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { getPosts } from "src/apis/markdown-client"
import { DEFAULT_CATEGORY } from "src/constants"
import { TCategories } from "src/types"

export const useCategoriesQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey.categories(),
    queryFn: async () => {
      const response = await getPosts()
      const categories: TCategories = {}
      
      response.posts.forEach(post => {
        post.frontmatter.categories.forEach(category => {
          categories[category] = (categories[category] || 0) + 1
        })
      })
      
      return {
        [DEFAULT_CATEGORY]: response.posts.length,
        ...categories,
      }
    },
    initialData: {} as TCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  if (error) {
    console.error("Error loading categories:", error)
  }

  return {
    data: data || {},
    isLoading,
    error
  }
}
