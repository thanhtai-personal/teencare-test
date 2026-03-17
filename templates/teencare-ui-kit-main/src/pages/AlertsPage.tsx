import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Lightbulb, CheckCircle, Shield } from "lucide-react";

const alerts = [
  { id: 1, severity: "high" as const, title: "Unusual late-night phone usage", desc: "Emma was active on her phone between 1–3 AM last night. This is unusual for her pattern.", time: "3h ago", icon: AlertTriangle },
  { id: 2, severity: "medium" as const, title: "Screen time exceeded daily limit", desc: "Total screen time reached 7.5 hours yesterday, exceeding the 5-hour family goal.", time: "12h ago", icon: Shield },
  { id: 3, severity: "low" as const, title: "New follower from unknown account", desc: "Emma received a follow request from an account not in her known contacts list.", time: "1d ago", icon: Bell },
];

const recommendations = [
  { title: "Start a digital detox weekend", desc: "Research shows periodic tech breaks improve teen mental health. Try a family no-screen Saturday.", category: "Wellness" },
  { title: "Open conversation about online friends", desc: "Emma has been chatting with 3 new contacts this week. A casual check-in could help ensure safety.", category: "Safety" },
  { title: "Celebrate Emma's creative work", desc: "She spent 4 hours on digital art this week. Positive reinforcement could boost confidence.", category: "Engagement" },
  { title: "Set collaborative screen time goals", desc: "Involving teens in setting their own limits leads to 60% better compliance than imposed rules.", category: "Parenting Tip" },
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

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Alerts & Recommendations</h1>
          <p className="text-muted-foreground">Stay informed about important events and get AI-powered advice.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" /> Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`flex items-start gap-3 p-4 rounded-lg border ${severityStyles[a.severity]}`}>
                <a.icon className={`h-5 w-5 shrink-0 mt-0.5 ${a.severity === "high" ? "text-destructive" : a.severity === "medium" ? "text-warning" : "text-muted-foreground"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <Badge variant={severityBadge[a.severity]} className="text-[10px]">{a.severity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline">Dismiss</Button>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" /> AI Recommendations
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
                <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs">Learn more →</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
