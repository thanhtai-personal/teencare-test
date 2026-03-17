import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Lightbulb } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, role: "ai", text: "Hi Jessica! 👋 I'm your TeenCare AI Copilot. I can help you understand your teen's behavior, suggest conversation starters, and provide evidence-based parenting advice. What's on your mind?" },
  { id: 2, role: "user", text: "Emma has been really moody lately and spending more time alone. Should I be worried?" },
  { id: 3, role: "ai", text: "It's completely normal for teens Emma's age to seek more alone time — it's part of identity development. However, I've noticed from her activity data that her mood scores dipped slightly this week. Here are some suggestions:\n\n1. **Check in gently** — Try a casual activity together (cooking, walking) rather than a direct conversation.\n2. **Validate her feelings** — Say something like \"I've noticed you seem a bit quieter lately. I'm here whenever you want to talk.\"\n3. **Monitor, don't interrogate** — Keep an eye on sleep and social patterns without being intrusive.\n\nWould you like me to suggest some conversation starters?" },
];

const prompts = [
  "How do I talk to my teen about social media?",
  "What are signs of teen anxiety?",
  "Help me set healthy screen time limits",
];

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: "That's a great question! Based on Emma's recent activity patterns and current research on teen development, here's what I'd recommend..." },
      ]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">AI Copilot</h1>
          <Badge variant="secondary" className="ml-2">Beta</Badge>
        </div>

        <Card className="flex-1 flex flex-col min-h-0">
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t space-y-3">
            <div className="flex gap-2 flex-wrap">
              <Lightbulb className="h-4 w-4 text-muted-foreground mt-1" />
              {prompts.map(p => (
                <button
                  key={p}
                  onClick={() => setInput(p)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask your AI copilot..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
