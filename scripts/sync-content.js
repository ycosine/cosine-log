const fs = require("fs")
const path = require("path")

const OBSIDIAN_VAULT_ROOT = "/Users/yuxianjun/Project/cosine_obsidian"
const BLOG_SOURCE_DIR = path.join(OBSIDIAN_VAULT_ROOT, "Blog")
const TARGET_POSTS_DIR = path.join(process.cwd(), "content/posts")
const TARGET_IMAGES_DIR = path.join(process.cwd(), "public/images")

if (fs.existsSync(TARGET_POSTS_DIR)) {
  console.log("Cleaning existing posts...")
  fs.rmSync(TARGET_POSTS_DIR, { recursive: true, force: true })
}
fs.mkdirSync(TARGET_POSTS_DIR, { recursive: true })

if (!fs.existsSync(TARGET_IMAGES_DIR)) {
  fs.mkdirSync(TARGET_IMAGES_DIR, { recursive: true })
}

// Matches ![[path/to/image.png|optional-alt]]
// Group 1: path/to/image.png
// Group 2: optional-alt
const OBSIDIAN_IMG_REGEX = /!\[\[(.*?)(?:\|(.*?))?\]\]/g

console.log(`Syncing content from ${BLOG_SOURCE_DIR}...`)

const files = fs.readdirSync(BLOG_SOURCE_DIR)
let processedCount = 0
let imageCount = 0

files.forEach((file) => {
  if (!file.endsWith(".md")) return

  const sourcePath = path.join(BLOG_SOURCE_DIR, file)
  let content = fs.readFileSync(sourcePath, "utf8")

  content = content.replace(OBSIDIAN_IMG_REGEX, (match, linkPath, alt) => {
    const imageName = path.basename(linkPath)
    const altText = alt || imageName.replace(/\.[^/.]+$/, "")

    // Resolve image path: first try relative to vault root, then fallback to 'Assets' folder
    let imgSourcePath = path.join(OBSIDIAN_VAULT_ROOT, linkPath)

    if (!fs.existsSync(imgSourcePath)) {
      imgSourcePath = path.join(OBSIDIAN_VAULT_ROOT, "Assets", imageName)
    }

    if (fs.existsSync(imgSourcePath)) {
      const targetImgPath = path.join(TARGET_IMAGES_DIR, imageName)

      try {
        fs.copyFileSync(imgSourcePath, targetImgPath)
        imageCount++
      } catch (err) {
        console.error(`Error copying image ${imageName}:`, err)
      }

      return `![${altText}](/images/${encodeURIComponent(imageName)})`
    } else {
      console.warn(`⚠️  Image not found: ${linkPath} (in ${file})`)
      return match
    }
  })

  fs.writeFileSync(path.join(TARGET_POSTS_DIR, file), content)
  processedCount++
})

console.log(`✅ Sync complete!`)
console.log(`📝 Processed ${processedCount} posts`)
console.log(`🖼  Copied ${imageCount} images`)
