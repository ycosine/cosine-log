'use client'

import ModernPostDetail from "./ModernPostDetail"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const Detail: React.FC<Props> = ({ post }) => {
  return <ModernPostDetail post={post} />
}

export default Detail
