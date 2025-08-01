'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next"
import { useEffect } from "react"
import { queryKey } from "src/constants/queryKey"

type Scheme = "light" | "dark"
type SetScheme = (scheme: Scheme) => void

const useScheme = (): [Scheme, SetScheme] => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKey.scheme(),
    queryFn: () => getCookie("scheme") || "light",
    initialData: "light",
  })

  const scheme = data === "light" ? "light" : "dark"

  const setScheme = (scheme: "light" | "dark") => {
    setCookie("scheme", scheme)
    queryClient.setQueryData(queryKey.scheme(), scheme)
    
    // Update HTML class for Tailwind dark mode
    if (typeof window !== "undefined") {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(scheme)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const savedScheme = getCookie("scheme")
    const currentScheme = savedScheme === "dark" ? "dark" : "light"
    
    // Set initial class
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(currentScheme)
    
    setScheme(currentScheme)
  }, [])

  return [scheme, setScheme]
}

export default useScheme
export { useScheme }
