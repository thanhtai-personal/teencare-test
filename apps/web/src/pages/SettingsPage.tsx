import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Eye, Bell } from "lucide-react";

const familyMembers = [
  { name: "Jessica Martinez", role: "Parent (Admin)", email: "jessica@email.com" },
  { name: "Carlos Martinez", role: "Parent", email: "carlos@email.com" },
  { name: "Emma Martinez", role: "Teen", email: "emma@email.com" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account, family roles, and privacy preferences.</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="roles">Family & Roles</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Jessica Martinez" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="jessica@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Family Members</CardTitle>
                <CardDescription>Manage who has access and their roles.</CardDescription>
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
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="mt-2">+ Add Family Member</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Privacy & Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Share anonymized data for AI improvement", desc: "Help improve TeenCare's AI with anonymous usage data", default: true },
                  { label: "Allow teen to view their own reports", desc: "Emma can see her wellness scores and activity summaries", default: true },
                  { label: "Location tracking", desc: "Track device location for safety alerts", default: false },
                  { label: "Social media monitoring", desc: "Monitor public social media activity for safety signals", default: true },
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
                <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Safety alerts", desc: "High-priority alerts about concerning activity", default: true },
                  { label: "Weekly wellness reports", desc: "Summary of your family's wellness data", default: true },
                  { label: "Mentor reminders", desc: "Upcoming session reminders", default: true },
                  { label: "AI recommendations", desc: "New parenting tips and insights", default: false },
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
