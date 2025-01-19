"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Terminal, Info, AlertCircle, CheckCircle2, ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "system" | "status" | "error" | "success";
  content: string;
  timestamp: string;
}

interface ChatDialogProps {
  agentId: string;
  agentName: string;
  isOpen: boolean;
  onClose: () => void;
}

const MessageIcon = ({ role }: { role: Message["role"] }) => {
  switch (role) {
    case "system":
      return <Terminal className="h-4 w-4 text-gray-500" />;
    case "status":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

const getMessageStyles = (role: Message["role"]) => {
  switch (role) {
    case "system":
      return "text-gray-300 bg-gray-800/50";
    case "status":
      return "text-blue-300 bg-blue-900/50";
    case "error":
      return "text-red-300 bg-red-900/50";
    case "success":
      return "text-green-300 bg-green-900/50";
    default:
      return "";
  }
};

export function ChatDialog({ agentId, agentName, isOpen, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef<number>(0);

  // 监听滚动事件
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer as HTMLElement;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 30;
      setAutoScroll(isAtBottom);
      lastScrollRef.current = scrollTop;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理自动滚动
  useEffect(() => {
    if (!autoScroll) return;
    
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollContainer) return;

    const timeoutId = setTimeout(() => {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, autoScroll]);

  const scrollToBottom = () => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollContainer) return;
    
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    setAutoScroll(true);
  };

  const addMessage = (content: string, role: Message["role"]) => {
    const newMessage: Message = {
      role,
      content,
      timestamp: new Date().toLocaleString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    addMessage(`执行指令: ${input}`, "system");
    setInput("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("正在分析指令...", "status");
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      addMessage("开始执行任务", "success");
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (Math.random() > 0.5) {
        addMessage("任务执行完成", "success");
      } else {
        addMessage("执行过程中遇到错误", "error");
      }
    } catch (error) {
      addMessage("执行指令时发生错误", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[800px] w-[90vw] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-gray-100">
            <Terminal className="h-5 w-5" />
            <span>{agentName} - 运行状态</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <ScrollArea ref={scrollAreaRef} className="h-[400px] w-full pr-4">
            <div className="space-y-2 font-mono text-sm">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start space-x-3 p-2 rounded-lg transition-all duration-200 animate-in slide-in-from-bottom-2",
                    getMessageStyles(message.role)
                  )}
                >
                  <MessageIcon role={message.role} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {!autoScroll && messages.length > 0 && (
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600"
              onClick={scrollToBottom}
              title="滚动到底部"
            >
              <ArrowDown className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            placeholder={isLoading ? "执行中..." : "输入指令..."}
            disabled={isLoading}
            className={cn(
              "font-mono bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          />
          <Button 
            onClick={handleSend} 
            size="icon"
            disabled={isLoading || !input.trim()}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 transition-all",
              (isLoading || !input.trim()) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 