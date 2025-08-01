const fs = require('fs')
const path = require('path')

const ASSETS_DIR = path.join(process.cwd(), 'content/assets')
const PUBLIC_ASSETS_DIR = path.join(process.cwd(), 'public/assets')

// 确保目标目录存在
if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
  fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true })
}

// 复制所有文件
if (fs.existsSync(ASSETS_DIR)) {
  const files = fs.readdirSync(ASSETS_DIR)
  
  files.forEach(file => {
    const sourcePath = path.join(ASSETS_DIR, file)
    const targetPath = path.join(PUBLIC_ASSETS_DIR, file)
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`Copied: ${file}`)
    }
  })
  
  console.log(`✅ Assets copied to public/assets`)
} else {
  console.log('⚠️  No assets directory found')
}