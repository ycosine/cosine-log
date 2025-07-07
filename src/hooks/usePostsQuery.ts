'use client'

import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { getPosts } from "src/apis/markdown-client"
import type { Post } from "src/libs/markdown/types"

const usePostsQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey.posts(),
    queryFn: async () => {
      const response = await getPosts()
      return response.posts
    },
    initialData: [] as Post[],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  if (error) {
    console.error("Error loading posts:", error)
  }

  return data || []
}

export default usePostsQuery
