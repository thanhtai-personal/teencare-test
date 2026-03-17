import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const screenTimeData = [
  { app: "TikTok", hours: 2.1 },
  { app: "Instagram", hours: 1.4 },
  { app: "YouTube", hours: 1.8 },
  { app: "Trò chơi", hours: 0.9 },
  { app: "Học tập", hours: 1.2 },
];

const interests = ["Nhiếp ảnh", "K-Pop", "Anime", "Bóng chuyền", "Lập trình"];

export default function ChildProfile() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">EM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Emma Martinez</h1>
            <p className="text-muted-foreground">15 tuổi · Lớp 10 · Hoạt động gần nhất 30 phút trước</p>
          </div>
          <Button className="ml-auto" variant="outline">Chỉnh sửa hồ sơ</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Điểm sức khỏe tinh thần</p>
            <p className="text-3xl font-bold mt-1">78<span className="text-base text-muted-foreground">/100</span></p>
            <Progress value={78} className="mt-2" />
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Thời gian màn hình trung bình</p>
            <p className="text-3xl font-bold mt-1">6.2<span className="text-base text-muted-foreground"> giờ/ngày</span></p>
            <p className="text-xs text-destructive mt-1">↑ 40% so với tuần trước</p>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Tâm trạng tuần này</p>
            <p className="text-3xl font-bold mt-1">😊</p>
            <p className="text-xs text-success mt-1">Phần lớn tích cực</p>
          </CardContent></Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="screen">Màn hình</TabsTrigger>
            <TabsTrigger value="social">Xã hội</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Sở thích và hoạt động</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {interests.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Quan sát từ AI</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-secondary text-sm">
                  Tháng này Emma dành nhiều thời gian hơn cho các ứng dụng sáng tạo, đây là tín hiệu tích cực cho khả năng thể hiện bản thân.
                </div>
                <div className="p-3 rounded-lg bg-secondary text-sm">
                  Lịch ngủ khá ổn định. Vào ngày đi học, giờ đi ngủ trung bình khoảng 22:30.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="screen" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Sử dụng ứng dụng theo ngày</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={screenTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 90%)" />
                    <XAxis dataKey="app" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="hsl(190 60% 42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="social" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Kết nối xã hội</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Emma có 142 người theo dõi trên các nền tảng được theo dõi. Tuần này không có tương tác đáng lo nào được ghi nhận.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
