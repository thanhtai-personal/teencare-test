import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Star, Clock } from "lucide-react";

const mentors = [
  { name: "Dr. Sarah Rivera", role: "Child Psychologist", rating: 4.9, sessions: 23, initials: "SR", available: true },
  { name: "Mark Chen", role: "Teen Life Coach", rating: 4.7, sessions: 15, initials: "MC", available: true },
  { name: "Dr. Aisha Patel", role: "Family Therapist", rating: 4.8, sessions: 31, initials: "AP", available: false },
];

const upcomingSessions = [
  { mentor: "Dr. Sarah Rivera", date: "Mar 19, 2026", time: "3:00 PM", topic: "Managing Emma's screen time" },
  { mentor: "Mark Chen", date: "Mar 22, 2026", time: "10:00 AM", topic: "Building communication skills" },
];

export default function MentorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Mentor Hub</h1>
          <p className="text-muted-foreground">Connect with parenting experts and schedule sessions.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title="Total Sessions" value="38" icon={Calendar} trend={{ value: "4 this month", positive: true }} />
          <StatCard title="Active Mentors" value="3" icon={Users} />
          <StatCard title="Avg Rating" value="4.8" icon={Star} />
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Your Mentors</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mentors.map(m => (
              <div key={m.name} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                <Avatar><AvatarFallback className="bg-primary text-primary-foreground text-sm">{m.initials}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role} · {m.sessions} sessions · ⭐ {m.rating}</p>
                </div>
                <Badge variant={m.available ? "default" : "secondary"}>
                  {m.available ? "Available" : "Busy"}
                </Badge>
                <Button size="sm" variant="outline" disabled={!m.available}>Book</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Upcoming Sessions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{s.topic}</p>
                  <p className="text-xs text-muted-foreground">{s.mentor} · {s.date} at {s.time}</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
