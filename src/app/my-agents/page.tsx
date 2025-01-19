"use client";

import React, { useState } from "react";
import { Play, Square, Trash, Plus } from "lucide-react";
import { ChatDialog } from "@/components/chat-dialog";

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
    if (agent.status === "stopped") {
      toggleAgentStatus(agent.id);
    }
    setSelectedAgent(agent);
    setIsChatOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">我的 Agent</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          创建 Agent
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            <div>
              <h3 className="text-lg font-medium">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  agent.status === "running"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {agent.status === "running" ? "运行中" : "已停止"}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRunAgent(agent)}
                  className={`p-2 ${
                    agent.status === "running"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-green-600 hover:bg-green-50"
                  } rounded-full`}
                >
                  {agent.status === "running" ? (
                    <Square className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <ChatDialog
          agentName={selectedAgent.name}
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            if (selectedAgent.status === "running") {
              toggleAgentStatus(selectedAgent.id);
            }
          }}
        />
      )}
    </div>
  );
} 