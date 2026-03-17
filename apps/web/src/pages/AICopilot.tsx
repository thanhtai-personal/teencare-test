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
  { id: 1, role: "ai", text: "Chào Jessica! Mình là AI Copilot của TeenCare. Mình có thể giúp bạn hiểu hành vi của con, gợi ý cách bắt chuyện và đưa ra lời khuyên nuôi dạy dựa trên dữ liệu. Bạn đang băn khoăn điều gì?" },
  { id: 2, role: "user", text: "Gần đây Emma hay cáu gắt và ở một mình nhiều hơn. Mình có nên lo không?" },
  { id: 3, role: "ai", text: "Ở tuổi của Emma, việc muốn có không gian riêng là khá bình thường, đây là một phần của quá trình phát triển bản sắc. Tuy nhiên, mình thấy điểm cảm xúc của Emma tuần này giảm nhẹ. Bạn có thể thử:\n\n1. **Hỏi han nhẹ nhàng**: Rủ con làm việc chung (nấu ăn, đi dạo) thay vì hỏi dồn.\n2. **Công nhận cảm xúc**: Có thể nói \"Mẹ thấy dạo này con ít nói hơn. Khi nào con muốn chia sẻ thì mẹ luôn sẵn sàng.\"\n3. **Theo dõi nhưng không chất vấn**: Quan sát giấc ngủ và nhịp sinh hoạt xã hội một cách tinh tế.\n\nBạn muốn mình gợi ý vài câu mở đầu cuộc trò chuyện không?" },
];

const prompts = [
  "Mình nên nói chuyện với con về mạng xã hội thế nào?",
  "Dấu hiệu lo âu ở tuổi teen là gì?",
  "Giúp mình đặt giới hạn thời gian màn hình hợp lý",
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
        { id: Date.now() + 1, role: "ai", text: "Câu hỏi rất hay. Dựa trên xu hướng hoạt động gần đây của Emma và các nghiên cứu hiện tại về phát triển tuổi teen, mình gợi ý như sau..." },
      ]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Trợ lý AI</h1>
          <Badge variant="secondary" className="ml-2">Thử nghiệm</Badge>
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
                placeholder="Hỏi trợ lý AI của bạn..."
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
