import { ImageResponse } from "next/og"
import { AiverLogo } from "@/components/icons/aiver-logo"

// 路由段配置
export const runtime = "edge"

// 图像元数据
export const alt = "Aiver"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

// 图像生成
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #000000, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <AiverLogo className="w-[600px] h-auto" />
          <div
            style={{
              fontSize: 48,
              fontWeight: 400,
              color: "#888",
              textAlign: "center",
            }}
          >
            Your AI Agent Platform
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 