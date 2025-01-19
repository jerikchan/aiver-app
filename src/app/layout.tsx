import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AiverLogo } from "@/components/icons/aiver-logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aiver - Your AI Agent Platform",
  description: "Manage and discover AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <nav className="border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="flex items-center">
                      <AiverLogo className="h-6 w-auto" />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      href="/my-agents"
                      className="border-transparent text-muted-foreground hover:border-border hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                    >
                      我的 Agent
                    </Link>
                    <Link
                      href="/agent-store"
                      className="border-transparent text-muted-foreground hover:border-border hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                    >
                      Agent 商店
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
