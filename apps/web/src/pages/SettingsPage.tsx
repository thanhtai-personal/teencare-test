import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Bell } from "lucide-react";

const familyMembers = [
  { name: "Jessica Martinez", role: "Phụ huynh (Quản trị)", email: "jessica@email.com" },
  { name: "Carlos Martinez", role: "Phụ huynh", email: "carlos@email.com" },
  { name: "Emma Martinez", role: "Thiếu niên", email: "emma@email.com" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Cài đặt</h1>
          <p className="text-muted-foreground">Quản lý tài khoản, vai trò gia đình và tùy chọn quyền riêng tư.</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="roles">Gia đình và vai trò</TabsTrigger>
            <TabsTrigger value="privacy">Riêng tư</TabsTrigger>
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cài đặt tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Họ và tên</Label>
                    <Input defaultValue="Jessica Martinez" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="jessica@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Múi giờ</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Giờ Thái Bình Dương (PT)</SelectItem>
                      <SelectItem value="est">Giờ Miền Đông (ET)</SelectItem>
                      <SelectItem value="cst">Giờ Miền Trung (CT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Lưu thay đổi</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Thành viên gia đình</CardTitle>
                <CardDescription>Quản lý người có quyền truy cập và vai trò của họ.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {familyMembers.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{m.role}</Badge>
                      <Button size="sm" variant="ghost">Sửa</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="mt-2">+ Thêm thành viên gia đình</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Quyền riêng tư và dữ liệu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Chia sẻ dữ liệu ẩn danh để cải thiện AI", desc: "Giúp cải thiện AI của TeenCare bằng dữ liệu sử dụng đã ẩn danh", default: true },
                  { label: "Cho phép con xem báo cáo của mình", desc: "Emma có thể xem điểm sức khỏe và tổng hợp hoạt động của mình", default: true },
                  { label: "Theo dõi vị trí", desc: "Theo dõi vị trí thiết bị để phát cảnh báo an toàn", default: false },
                  { label: "Theo dõi mạng xã hội", desc: "Giám sát hoạt động mạng xã hội công khai để phát hiện tín hiệu rủi ro", default: true },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">{s.label}</Label>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.default} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Tùy chọn thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Cảnh báo an toàn", desc: "Cảnh báo ưu tiên cao về các hoạt động đáng lo ngại", default: true },
                  { label: "Báo cáo sức khỏe hàng tuần", desc: "Tóm tắt dữ liệu sức khỏe của gia đình", default: true },
                  { label: "Nhắc lịch cố vấn", desc: "Nhắc các buổi tư vấn sắp tới", default: true },
                  { label: "Gợi ý từ AI", desc: "Mẹo nuôi dạy và phân tích mới", default: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">{s.label}</Label>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.default} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
