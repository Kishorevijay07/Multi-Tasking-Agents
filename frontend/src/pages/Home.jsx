import ChatBox from "../components/ChatBox";
import Upload from "../components/Upload";
import { Sparkles, Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 animate-slide-up">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-primary/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(102,252,241,0.2)]">
          <Bot className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
          Nexus <span className="text-primary font-light">AI</span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </h1>
        <p className="text-text max-w-lg mx-auto text-sm">
          Your intelligent multi-agent assistant. Upload files or start a conversation to explore capabilities.
        </p>
      </div>

      <div className="bg-surface/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
          <Upload />
        </div>
        <ChatBox />
      </div>
    </div>
  );
}