import { Excalidraw } from "src/components/Excalidraw"

export const CallOut: React.FC<{
  block: any
}> = (props) => {
  return (
    <div className="w-full">
      <Excalidraw refUrl="/1rsc.json" />
    </div>
  )
}
