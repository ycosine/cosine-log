import { TPosts, TPostStatus, TPostType } from "src/types"

export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[]
  acceptType?: TPostType[]
}

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
}
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

function shortHash(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = Math.imul(31, hash) + title.charCodeAt(i) | 0;
  }
  return Math.abs(hash).toString(16)
}

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption
) {
  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options
  const filteredPosts = posts
    .map((post) => {
      const isNotSlug = !post.slug;
      const hash = shortHash(post.title + ' ' + post.createdTime);
      return {
        ...post,
        slug: isNotSlug ? hash : post.slug,
      }
    })
    // filter data
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime)
      if (!post.title || !post.slug || postDate > tomorrow) return false
      return true
    })
    // filter status
    .filter((post) => {
      const postStatus = post.status?.[0]
      return acceptStatus.includes(postStatus)
    })
    // filter type
    .filter((post) => {
      const postType = post.type[0]
      return acceptType.includes(postType)
    })
  return filteredPosts
}
