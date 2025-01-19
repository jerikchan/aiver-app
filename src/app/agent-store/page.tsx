"use client";

import React from "react";
import { Download } from "lucide-react";

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

const templates: AgentTemplate[] = [
  {
    id: "1",
    name: "Agent1 - 基础任务",
    description: "适用于日常任务的自动化执行，包括资源收集、日常签到等基础功能",
    category: "基础",
  },
  {
    id: "2",
    name: "Agent1 - 战斗模式",
    description: "专注于战斗场景的自动化，支持 PVE 战斗、副本挑战等功能",
    category: "战斗",
  },
  {
    id: "3",
    name: "Agent1 - 交易策略",
    description: "针对游戏内交易的自动化策略，包括资源交易、装备交易等功能",
    category: "交易",
  },
];

export default function AgentStorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Agent 商店</h1>
        <p className="text-gray-500 mt-2">
          选择预设模板快速部署你的游戏 Agent
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {template.category}
                </span>
              </div>
              <h3 className="text-lg font-medium mt-2">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {template.description}
              </p>
            </div>
            <div className="pt-4">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                使用此模板
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 