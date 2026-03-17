import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Star, Clock } from "lucide-react";

const mentors = [
  { name: "Dr. Sarah Rivera", role: "Chuyên gia tâm lý trẻ em", rating: 4.9, sessions: 23, initials: "SR", available: true },
  { name: "Mark Chen", role: "Huấn luyện viên kỹ năng tuổi teen", rating: 4.7, sessions: 15, initials: "MC", available: true },
  { name: "Dr. Aisha Patel", role: "Chuyên gia trị liệu gia đình", rating: 4.8, sessions: 31, initials: "AP", available: false },
];

const upcomingSessions = [
  { mentor: "Dr. Sarah Rivera", date: "19/03/2026", time: "15:00", topic: "Quản lý thời gian màn hình của Emma" },
  { mentor: "Mark Chen", date: "22/03/2026", time: "10:00", topic: "Xây dựng kỹ năng giao tiếp" },
];

export default function MentorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Trung tâm cố vấn</h1>
          <p className="text-muted-foreground">Kết nối chuyên gia nuôi dạy con và đặt lịch tư vấn.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title="Tổng số buổi" value="38" icon={Calendar} trend={{ value: "4 buổi trong tháng này", positive: true }} />
          <StatCard title="Cố vấn đang hoạt động" value="3" icon={Users} />
          <StatCard title="Điểm đánh giá TB" value="4.8" icon={Star} />
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Cố vấn của bạn</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mentors.map(m => (
              <div key={m.name} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                <Avatar><AvatarFallback className="bg-primary text-primary-foreground text-sm">{m.initials}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role} · {m.sessions} buổi · ⭐ {m.rating}</p>
                </div>
                <Badge variant={m.available ? "default" : "secondary"}>
                  {m.available ? "Sẵn sàng" : "Bận"}
                </Badge>
                <Button size="sm" variant="outline" disabled={!m.available}>Đặt lịch</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Buổi sắp tới</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{s.topic}</p>
                  <p className="text-xs text-muted-foreground">{s.mentor} · {s.date} lúc {s.time}</p>
                </div>
                <Button size="sm" variant="outline">Tham gia</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
