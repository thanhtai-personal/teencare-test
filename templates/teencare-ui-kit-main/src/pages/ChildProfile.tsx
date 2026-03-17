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
  { app: "Games", hours: 0.9 },
  { app: "Study", hours: 1.2 },
];

const interests = ["Photography", "K-Pop", "Anime", "Volleyball", "Coding"];

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
            <p className="text-muted-foreground">Age 15 · 10th Grade · Last active 30 min ago</p>
          </div>
          <Button className="ml-auto" variant="outline">Edit Profile</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Wellness Score</p>
            <p className="text-3xl font-bold mt-1">78<span className="text-base text-muted-foreground">/100</span></p>
            <Progress value={78} className="mt-2" />
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg Screen Time</p>
            <p className="text-3xl font-bold mt-1">6.2<span className="text-base text-muted-foreground"> hrs/day</span></p>
            <p className="text-xs text-destructive mt-1">↑ 40% from last week</p>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Mood This Week</p>
            <p className="text-3xl font-bold mt-1">😊</p>
            <p className="text-xs text-success mt-1">Mostly positive</p>
          </CardContent></Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="screen">Screen Time</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Interests & Activities</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {interests.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">AI Observations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-secondary text-sm">
                  Emma has been spending more time in creative apps this month — a positive trend toward self-expression.
                </div>
                <div className="p-3 rounded-lg bg-secondary text-sm">
                  Sleep schedule appears consistent. Bedtime averages around 10:30 PM on school nights.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="screen" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Daily App Usage</CardTitle></CardHeader>
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
              <CardHeader><CardTitle className="text-base">Social Connections</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Emma has 142 followers across monitored platforms. No concerning interactions flagged this week.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
