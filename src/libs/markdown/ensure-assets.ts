// This file ensures assets are available during runtime
import fs from "fs"
import path from "path"

const PUBLIC_ASSETS_DIR = path.join(process.cwd(), "public/assets")

export function ensureAssetsDirectory() {
  // Only run on server side
  if (typeof window !== "undefined") return

  // Ensure public/assets directory exists
  if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
    fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true })
  }
}
