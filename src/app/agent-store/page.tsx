"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <p className="text-muted-foreground mt-2">
          选择预设模板快速部署你的游戏 Agent
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {template.category}
                </Badge>
              </div>
              <h3 className="text-lg font-medium mt-2">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {template.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="default">
                <Download className="h-4 w-4 mr-2" />
                使用此模板
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 