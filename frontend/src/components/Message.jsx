import { Bot, User } from "lucide-react";

export default function Message({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-4 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
          ${isUser ? "bg-primary/20 text-primary" : "bg-surface border border-primary/30 text-primary shadow-[0_0_10px_rgba(102,252,241,0.15)]"}`}
        >
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>
        
        <div className={`p-4 rounded-2xl text-sm leading-relaxed
          ${isUser 
            ? "bg-primary text-bg rounded-tr-none" 
            : "bg-surface border border-white/5 text-text-light rounded-tl-none shadow-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}