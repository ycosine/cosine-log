"use client"

import PostDetail from "./PostDetail"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const Detail: React.FC<Props> = ({ post }) => {
  return <PostDetail post={post} />
}

export default Detail
