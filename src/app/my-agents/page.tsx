"use client";

import React, { useState } from "react";
import { Play, Square, Trash, Plus, MessageCircle } from "lucide-react";
import { ChatDialog } from "@/components/chat-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "running" | "stopped";
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Agent1 - 日常任务",
    description: "执行游戏日常任务，包括签到、资源收集等",
    status: "stopped",
  },
  {
    id: "2",
    name: "Agent1 - 副本战斗",
    description: "自动执行副本战斗，获取游戏资源和装备",
    status: "running",
  },
];

export default function MyAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRunningDialog, setIsRunningDialog] = useState(false);

  const toggleAgentStatus = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status: agent.status === "running" ? "stopped" : "running",
            }
          : agent
      )
    );
  };

  const deleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
  };

  const handleRunAgent = (agent: Agent) => {
    if (agent.status === "running") {
      toggleAgentStatus(agent.id);
      return;
    }
    
    toggleAgentStatus(agent.id);
    setSelectedAgent(agent);
    setIsChatOpen(true);
    setIsRunningDialog(true);
  };

  const handleOpenChat = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsChatOpen(true);
    setIsRunningDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">我的 Agent</h1>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          创建 Agent
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="pb-3">
              <CardTitle>{agent.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge
                  variant={agent.status === "running" ? "default" : "secondary"}
                >
                  {agent.status === "running" ? "运行中" : "已停止"}
                </Badge>
                <div className="flex space-x-2">
                  {agent.status === "running" && (
                    <Button
                      onClick={() => handleOpenChat(agent)}
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                      title="打开对话"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() => handleRunAgent(agent)}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      agent.status === "running"
                        ? "text-destructive hover:text-destructive"
                        : "text-primary hover:text-primary"
                    )}
                    title={agent.status === "running" ? "停止" : "运行"}
                  >
                    {agent.status === "running" ? (
                      <Square className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => deleteAgent(agent.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title="删除"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAgent && (
        <ChatDialog
          agentName={selectedAgent.name}
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            if (isRunningDialog && selectedAgent.status === "running") {
              toggleAgentStatus(selectedAgent.id);
            }
          }}
        />
      )}
    </div>
  );
} 