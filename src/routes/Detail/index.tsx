'use client'

import TypoPostDetail from "./TypoPostDetail"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const Detail: React.FC<Props> = ({ post }) => {
  return <TypoPostDetail post={post} />
}

export default Detail
