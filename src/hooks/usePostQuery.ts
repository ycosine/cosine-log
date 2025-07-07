'use client'

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { queryKey } from "src/constants/queryKey"
import { getPost } from "src/apis/markdown-client"
import type { Post } from "src/libs/markdown/types"

const usePostQuery = () => {
  const params = useParams()
  const slug = params?.slug as string
  
  const { data, isLoading, error } = useQuery<Post | null>({
    queryKey: queryKey.post(slug || ''),
    queryFn: async () => {
      if (!slug || typeof slug !== 'string') return null
      return await getPost(slug)
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  if (error) {
    console.error("Error loading post:", error)
  }

  return data
}

export default usePostQuery
