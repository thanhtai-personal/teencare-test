import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Lightbulb, CheckCircle, Shield } from "lucide-react";

const alerts = [
  { id: 1, severity: "high" as const, title: "Sử dụng điện thoại khuya bất thường", desc: "Đêm qua Emma dùng điện thoại trong khoảng 1–3 giờ sáng, khác với thói quen thường ngày.", time: "3 giờ trước", icon: AlertTriangle },
  { id: 2, severity: "medium" as const, title: "Vượt giới hạn thời gian màn hình", desc: "Tổng thời gian màn hình hôm qua là 7.5 giờ, vượt mục tiêu gia đình là 5 giờ.", time: "12 giờ trước", icon: Shield },
  { id: 3, severity: "low" as const, title: "Có người theo dõi mới từ tài khoản lạ", desc: "Emma nhận yêu cầu theo dõi từ một tài khoản không có trong danh sách liên hệ quen thuộc.", time: "1 ngày trước", icon: Bell },
];

const recommendations = [
  { title: "Bắt đầu cuối tuần giảm thiết bị số", desc: "Nghiên cứu cho thấy nghỉ công nghệ định kỳ giúp cải thiện sức khỏe tinh thần tuổi teen. Hãy thử một ngày thứ Bảy không màn hình.", category: "Sức khỏe tinh thần" },
  { title: "Mở cuộc trò chuyện về bạn bè online", desc: "Tuần này Emma trò chuyện với 3 liên hệ mới. Một cuộc hỏi thăm nhẹ nhàng có thể giúp đảm bảo an toàn.", category: "An toàn" },
  { title: "Ghi nhận các sản phẩm sáng tạo của Emma", desc: "Tuần này Emma dành 4 giờ cho vẽ kỹ thuật số. Khích lệ đúng lúc có thể tăng sự tự tin.", category: "Gắn kết" },
  { title: "Đặt mục tiêu màn hình cùng con", desc: "Khi teen cùng tham gia đặt giới hạn, mức độ tuân thủ thường cao hơn nhiều so với áp đặt một chiều.", category: "Mẹo phụ huynh" },
];

const severityStyles = {
  high: "border-destructive/30 bg-destructive/5",
  medium: "border-warning/30 bg-warning/5",
  low: "border-border",
};

const severityBadge = {
  high: "destructive" as const,
  medium: "secondary" as const,
  low: "outline" as const,
};

const severityText = {
  high: "Cao",
  medium: "Trung bình",
  low: "Thấp",
};

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Cảnh báo và gợi ý</h1>
          <p className="text-muted-foreground">Theo dõi các sự kiện quan trọng và nhận tư vấn từ AI.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" /> Cảnh báo đang hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`flex items-start gap-3 p-4 rounded-lg border ${severityStyles[a.severity]}`}>
                <a.icon className={`h-5 w-5 shrink-0 mt-0.5 ${a.severity === "high" ? "text-destructive" : a.severity === "medium" ? "text-warning" : "text-muted-foreground"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <Badge variant={severityBadge[a.severity]} className="text-[10px]">{severityText[a.severity]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline">Bỏ qua</Button>
                  <Button size="sm">Xem chi tiết</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" /> Gợi ý từ AI
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {recommendations.map((r, i) => (
              <div key={i} className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px]">{r.category}</Badge>
                </div>
                <p className="text-sm font-medium mb-1">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
                <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs">Tìm hiểu thêm →</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
