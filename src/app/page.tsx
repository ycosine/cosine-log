import Home from "src/routes/Home"
import { getPostIndex } from "src/libs/markdown/server"

export default function HomePage() {
  return <Home posts={getPostIndex()} />
}
