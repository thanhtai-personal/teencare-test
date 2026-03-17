import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, Shield, TrendingUp, MessageSquare, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const moodData = [
  { day: "Mon", score: 7 },
  { day: "Tue", score: 6 },
  { day: "Wed", score: 8 },
  { day: "Thu", score: 5 },
  { day: "Fri", score: 7 },
  { day: "Sat", score: 9 },
  { day: "Sun", score: 8 },
];

const activities = [
  { text: "Emma completed her weekly mood check-in", time: "2h ago", type: "success" as const },
  { text: "AI flagged a concerning social media pattern", time: "5h ago", type: "warning" as const },
  { text: "Mentor session scheduled with Dr. Rivera", time: "1d ago", type: "info" as const },
  { text: "New parenting tip available: Screen Time Balance", time: "1d ago", type: "info" as const },
];

const typeColors = { success: "bg-success", warning: "bg-warning", info: "bg-info" };

export default function ParentDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Jessica 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your family today.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Family Members" value="3" subtitle="2 teens, 1 child" icon={Users} />
          <StatCard title="Wellness Score" value="82%" icon={Heart} trend={{ value: "5% this week", positive: true }} />
          <StatCard title="Safety Alerts" value="1" subtitle="Needs review" icon={Shield} />
          <StatCard title="AI Insights" value="12" subtitle="This month" icon={TrendingUp} trend={{ value: "3 new", positive: true }} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base">Weekly Mood Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 90%)" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis domain={[0, 10]} fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(190 60% 42%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View all</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${typeColors[a.type]}`} />
                  <div>
                    <p className="text-sm leading-snug">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" /> Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <p className="text-sm font-medium">Increased screen time detected for Emma</p>
                  <p className="text-xs text-muted-foreground">Average 6.2hrs/day — up 40% this week</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button size="sm">Chat with AI Copilot</Button>
              <Button size="sm" variant="outline">Schedule Mentor Call</Button>
              <Button size="sm" variant="outline">View Recommendations</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
