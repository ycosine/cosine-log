"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types"
import type {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types"
import { Excalidraw as Board, exportToBlob } from "@excalidraw/excalidraw"

import { safeJsonParse } from "src/libs/utils/parse-json"
import { clsx } from "clsx"

// import { useModalStack } from "../modal"
import useScheme from "src/hooks/useScheme"

export interface ExcalidrawProps {
  zenModeEnabled?: boolean
  viewModeEnabled?: boolean
  showExtendButton?: boolean
  onChange?: (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => void
  className?: string
  onReady?: (api: ExcalidrawImperativeAPI) => void

  data?: object
  refUrl?: string
}

export function Excalidraw({
  data,
  viewModeEnabled = true,
  zenModeEnabled = false,
  onChange,
  className,

  onReady,
  showExtendButton,
  refUrl,
}: ExcalidrawProps) {
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI>()

  const [scheme] = useScheme()
  const isDarkMode = scheme === "dark"

  const [finalData, setFinalData] = useState<ExcalidrawElement | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (refUrl) {
      console.info("refUrl", refUrl)
      setLoading(true)
      fetch(refUrl)
        .then((res) => res.text())
        .then((text) => {
          if (!isMounted) return
          const tryParseJson = safeJsonParse(text)
          console.info("try", tryParseJson)
          if (tryParseJson) {
            setFinalData(tryParseJson as ExcalidrawElement)
          }

          setLoading(false)
        })
    } else {
      setFinalData(data as ExcalidrawElement)
      setLoading(false)
    }

    return () => {
      setLoading(false)
      isMounted = false
    }
  }, [data, refUrl])
  //   const modal = useModalStack()
  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
      className={clsx("relative h-[500px] w-full", className)}
    >
      {loading && (
        <div className="absolute inset-0 z-[10] flex center">
          <div className="loading loading-spinner" />
        </div>
      )}
      <Board
        key={JSON.stringify(finalData)}
        theme={isDarkMode ? "dark" : "light"}
        initialData={finalData}
        detectScroll={false}
        zenModeEnabled={zenModeEnabled}
        onChange={onChange}
        viewModeEnabled={viewModeEnabled}
        excalidrawAPI={(api) => {
          excalidrawAPIRef.current = api
          setTimeout(() => {
            api.scrollToContent(undefined, {
              fitToContent: true,
            })
          }, 1000)

          onReady?.(api)
        }}
      />

      {/* {viewModeEnabled && showExtendButton && (
        <button
          onClick={() => {
            if (!excalidrawAPIRef.current) {
              return
            }
            modal.present({
              title: "Preview",
              content: () => (
                <ExcalidrawImpl
                  data={data}
                  className="h-full"
                  showExtendButton={false}
                  refUrl={refUrl}
                />
              ),
              clickOutsideToDismiss: true,
              max: true,
            })
          }}
          className={clsx(
            "absolute bottom-2 right-2 z-10 box-content flex h-5 w-5 rounded-md border p-2 center",
            "border-zinc-200 bg-base-100 text-zinc-600",
            "dark:border-neutral-800 dark:text-zinc-500"
          )}
        >
          <i className="icon-[mingcute--external-link-line]" />
        </button>
      )} */}
    </div>
  )
}
