import { ImageResponse } from "next/og"
import { AiverFavicon } from "@/components/icons/aiver-favicon"

// 路由段配置
export const runtime = "edge"

// 图像元数据
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// 图像生成
export default function Icon() {
  return new ImageResponse(
    (
      <AiverFavicon />
    ),
    {
      ...size,
    }
  )
} 