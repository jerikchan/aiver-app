"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Send } from "lucide-react";

interface Message {
  role: "system" | "status";
  content: string;
  timestamp: string;
}

interface ChatDialogProps {
  agentName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ agentName, isOpen, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // 模拟添加系统日志
  const addSystemLog = (content: string) => {
    const newMessage: Message = {
      role: "system",
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // 模拟添加状态更新
  const addStatusUpdate = (content: string) => {
    const newMessage: Message = {
      role: "status",
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // 模拟游戏操作
  const handleSend = () => {
    if (!input.trim()) return;

    addSystemLog(`执行指令: ${input}`);
    setInput("");

    // 模拟游戏状态更新
    setTimeout(() => {
      addStatusUpdate("当前状态: 正在执行任务中...");
    }, 1000);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-bold">
              {agentName} - 运行状态
            </Dialog.Title>
            <Dialog.Close
              className="rounded-full p-1.5 hover:bg-gray-100"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="h-[400px] overflow-y-auto mb-4 space-y-2 font-mono text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${
                  message.role === "system" ? "text-gray-600" : "text-blue-600"
                }`}
              >
                <span className="text-xs text-gray-400">[{message.timestamp}]</span>
                <span>{message.content}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="输入指令..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none font-mono"
            />
            <button
              onClick={handleSend}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 