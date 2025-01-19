import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold tracking-tight">
        欢迎使用{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Aiver
        </span>
      </h1>
      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        Aiver 是一个专注于 Starknet 链游的 Agent 管理平台，帮助你轻松创建、管理和运行游戏 Agent，
        实现自动化游戏体验
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/my-agents"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          开始使用
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link
          href="/agent-store"
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          浏览模板
        </Link>
      </div>
      <div className="mt-20 grid gap-8 md:grid-cols-3 max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">自动化游戏</h3>
          <p className="mt-2 text-gray-600">
            通过智能 Agent，实现游戏任务的自动化执行，提升游戏效率
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">多样化策略</h3>
          <p className="mt-2 text-gray-600">
            支持多种游戏策略模板，适配不同的游戏场景和任务需求
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">实时监控</h3>
          <p className="mt-2 text-gray-600">
            提供实时的游戏状态监控和 Agent 运行数据，确保稳定性
          </p>
        </div>
      </div>
    </div>
  );
}
