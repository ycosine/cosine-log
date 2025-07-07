'use client'

import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { getPosts } from "src/apis/markdown-client"
import { TTags } from "src/types"

export const useTagsQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey.tags(),
    queryFn: async () => {
      const response = await getPosts()
      const tags: TTags = {}
      
      response.posts.forEach(post => {
        post.frontmatter.tags.forEach(tag => {
          tags[tag] = (tags[tag] || 0) + 1
        })
      })
      
      return tags
    },
    initialData: {} as TTags,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  if (error) {
    console.error("Error loading tags:", error)
  }

  return {
    data: data || {},
    isLoading,
    error
  }
}
