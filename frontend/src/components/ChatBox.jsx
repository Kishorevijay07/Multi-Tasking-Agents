import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/api";
import Message from "./Message";
import { Send, Loader2 } from "lucide-react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am Nexus. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await sendMessage(input, chatId);
      if (!chatId) {
        setChatId(res.chat_id);
      }
      setMessages([
        ...newMessages,
        { role: "assistant", text: res.response },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-surface border border-white/5 text-text-light p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm">Nexus is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/5 bg-surface/30">
        <div className="relative flex items-center">
          <textarea
            className="w-full bg-black/40 border border-white/10 rounded-3xl pl-5 pr-14 py-3 text-text-light placeholder:text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none transition-all"
            rows="1"
            placeholder="Message Nexus..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ minHeight: '52px', maxHeight: '120px' }}
          />
          <button
            className={`absolute right-2 p-2 rounded-full flex items-center justify-center transition-all ${
              input.trim() 
                ? 'bg-primary text-bg hover:bg-primary-dark shadow-[0_0_10px_rgba(102,252,241,0.4)] animate-pop-in' 
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-4 h-4 ml-[2px]" />
          </button>
        </div>
        <div className="text-center mt-3 text-xs text-text/50">
          Nexus can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}