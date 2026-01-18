"use client"

import Giscus from "@giscus/react"
import { useTheme } from "next-themes"
import { CONFIG } from "site.config"

export default function Comments() {
  const { resolvedTheme } = useTheme()

  if (!CONFIG.giscus.enable) return null

  return (
    <div className="mt-10 pt-10 border-t border-typo-light-hr dark:border-typo-dark-hr">
      <Giscus
        id="comments"
        repo={CONFIG.giscus.config.repo as any}
        repoId={CONFIG.giscus.config.repoId}
        category={CONFIG.giscus.config.category}
        categoryId={CONFIG.giscus.config.categoryId}
        mapping={CONFIG.giscus.config.mapping as any}
        strict={CONFIG.giscus.config.strict}
        reactionsEnabled={CONFIG.giscus.config.reactionsEnabled as any}
        emitMetadata={CONFIG.giscus.config.emitMetadata as any}
        inputPosition={CONFIG.giscus.config.inputPosition as any}
        theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
        lang={CONFIG.giscus.config.lang as any}
        loading="lazy"
      />
    </div>
  )
}
