"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Parent {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Student {
  id: number;
  name: string;
  dob: string;
  gender: string;
  current_grade: string;
  parent_id: number;
  parent_name?: string;
}

interface ClassItem {
  id: number;
  name: string;
  subject: string;
  day_of_week: DayOfWeek;
  time_slot: string;
  teacher_name: string;
  max_students: number;
  registered_students: number;
}

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type AlertState =
  | { type: "success"; text: string }
  | { type: "error"; text: string }
  | null;

const DAY_OPTIONS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const DEFAULT_PARENT_FORM = {
  name: "",
  phone: "",
  email: "",
};

const DEFAULT_STUDENT_FORM = {
  name: "",
  dob: "",
  gender: "",
  current_grade: "",
  parent_id: "",
};

const DEFAULT_CLASS_FORM = {
  name: "",
  subject: "",
  day_of_week: "Monday" as DayOfWeek,
  time_slot: "",
  teacher_name: "",
  max_students: "20",
};

const DEFAULT_SUBSCRIPTION_FORM = {
  student_id: "",
  package_name: "",
  total_sessions: "12",
  used_sessions: "0",
  end_date: "",
};

const DEFAULT_REGISTER_FORM = {
  student_id: "",
  class_id: "",
};

interface ApiPayload<T> {
  data?: T;
  error?: string;
  details?: unknown;
}

async function parseJsonSafe<T>(response: Response): Promise<ApiPayload<T>> {
  try {
    return (await response.json()) as ApiPayload<T>;
  } catch {
    return {};
  }
}

function pickError(payload: ApiPayload<unknown>): string {
  const details = payload?.details;
  if (Array.isArray(details) && details.length > 0) {
    return String(details[0]);
  }

  if (typeof payload?.error === "string") {
    return payload.error;
  }

  return "Unexpected error.";
}

export default function ParentDashboard() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  const [parentForm, setParentForm] = useState(DEFAULT_PARENT_FORM);
  const [studentForm, setStudentForm] = useState(DEFAULT_STUDENT_FORM);
  const [classForm, setClassForm] = useState(DEFAULT_CLASS_FORM);
  const [subscriptionForm, setSubscriptionForm] = useState(DEFAULT_SUBSCRIPTION_FORM);
  const [registerForm, setRegisterForm] = useState(DEFAULT_REGISTER_FORM);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);

  const classByDay = useMemo(() => {
    return DAY_OPTIONS.map((day) => ({
      day,
      items: classes.filter((item) => item.day_of_week === day),
    }));
  }, [classes]);

  const setSuccess = (text: string) => setAlert({ type: "success", text });
  const setError = (text: string) => setAlert({ type: "error", text });

  const loadParents = useCallback(async () => {
    const response = await fetch("/api/parents", { cache: "no-store" });
    const payload = await parseJsonSafe<Parent[]>(response);

    if (!response.ok) {
      throw new Error(pickError(payload));
    }

    setParents(Array.isArray(payload.data) ? payload.data : []);
  }, []);

  const loadStudents = useCallback(async () => {
    const response = await fetch("/api/students", { cache: "no-store" });
    const payload = await parseJsonSafe<Student[]>(response);

    if (!response.ok) {
      throw new Error(pickError(payload));
    }

    setStudents(Array.isArray(payload.data) ? payload.data : []);
  }, []);

  const loadClasses = useCallback(async () => {
    const response = await fetch("/api/classes", { cache: "no-store" });
    const payload = await parseJsonSafe<ClassItem[]>(response);

    if (!response.ok) {
      throw new Error(pickError(payload));
    }

    setClasses(Array.isArray(payload.data) ? payload.data : []);
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadParents(), loadStudents(), loadClasses()]);
  }, [loadParents, loadStudents, loadClasses]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await refreshAll();
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, [refreshAll]);

  const runSubmit = async (handler: () => Promise<void>) => {
    setIsSubmitting(true);
    try {
      await handler();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateParent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await runSubmit(async () => {
      const response = await fetch("/api/parents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parentForm),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) throw new Error(pickError(payload));

      setParentForm(DEFAULT_PARENT_FORM);
      await loadParents();
      setSuccess("Parent created.");
    });
  };

  const handleCreateStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await runSubmit(async () => {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...studentForm,
          parent_id: Number(studentForm.parent_id),
        }),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) throw new Error(pickError(payload));

      setStudentForm(DEFAULT_STUDENT_FORM);
      await loadStudents();
      setSuccess("Student created.");
    });
  };

  const handleCreateClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await runSubmit(async () => {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...classForm,
          max_students: Number(classForm.max_students),
        }),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) throw new Error(pickError(payload));

      setClassForm(DEFAULT_CLASS_FORM);
      await loadClasses();
      setSuccess("Class created.");
    });
  };

  const handleCreateSubscription = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await runSubmit(async () => {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...subscriptionForm,
          student_id: Number(subscriptionForm.student_id),
          total_sessions: Number(subscriptionForm.total_sessions),
          used_sessions: Number(subscriptionForm.used_sessions),
        }),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) throw new Error(pickError(payload));

      setSubscriptionForm(DEFAULT_SUBSCRIPTION_FORM);
      setSuccess("Subscription created.");
    });
  };

  const handleRegisterClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await runSubmit(async () => {
      const classId = Number(registerForm.class_id);

      const response = await fetch(`/api/classes/${classId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: Number(registerForm.student_id),
        }),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) throw new Error(pickError(payload));

      setRegisterForm(DEFAULT_REGISTER_FORM);
      await loadClasses();
      setSuccess("Class registration completed.");
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">TeenUp Mini LMS</h1>
            <p className="text-sm text-muted-foreground">
              Manage Parent, Student, Class, Subscription and Registration.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              void runSubmit(async () => {
                await refreshAll();
                setSuccess("Data refreshed.");
              });
            }}
            disabled={isSubmitting}
          >
            Refresh
          </Button>
        </div>

        {alert ? (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              alert.type === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            {alert.text}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Parents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{parents.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{students.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{classes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Loading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{isLoading ? "Yes" : "No"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Parent</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateParent} className="space-y-3">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    value={parentForm.name}
                    onChange={(event) =>
                      setParentForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Phone</Label>
                  <Input
                    value={parentForm.phone}
                    onChange={(event) =>
                      setParentForm((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={parentForm.email}
                    onChange={(event) =>
                      setParentForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  Save Parent
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Student</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateStudent} className="space-y-3">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    value={studentForm.name}
                    onChange={(event) =>
                      setStudentForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={studentForm.dob}
                    onChange={(event) =>
                      setStudentForm((prev) => ({ ...prev, dob: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Gender</Label>
                  <Input
                    value={studentForm.gender}
                    onChange={(event) =>
                      setStudentForm((prev) => ({ ...prev, gender: event.target.value }))
                    }
                    placeholder="male/female"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Current Grade</Label>
                  <Input
                    value={studentForm.current_grade}
                    onChange={(event) =>
                      setStudentForm((prev) => ({ ...prev, current_grade: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Parent</Label>
                  <Select
                    value={studentForm.parent_id}
                    onValueChange={(value) =>
                      setStudentForm((prev) => ({ ...prev, parent_id: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {parents.map((parent) => (
                        <SelectItem key={parent.id} value={String(parent.id)}>
                          {parent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={isSubmitting || parents.length === 0}>
                  Save Student
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Class</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateClass} className="space-y-3">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    value={classForm.name}
                    onChange={(event) =>
                      setClassForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Subject</Label>
                  <Input
                    value={classForm.subject}
                    onChange={(event) =>
                      setClassForm((prev) => ({ ...prev, subject: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Day</Label>
                  <Select
                    value={classForm.day_of_week}
                    onValueChange={(value: DayOfWeek) =>
                      setClassForm((prev) => ({ ...prev, day_of_week: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAY_OPTIONS.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Time Slot</Label>
                  <Input
                    value={classForm.time_slot}
                    onChange={(event) =>
                      setClassForm((prev) => ({ ...prev, time_slot: event.target.value }))
                    }
                    placeholder="18:00-19:30"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Teacher</Label>
                  <Input
                    value={classForm.teacher_name}
                    onChange={(event) =>
                      setClassForm((prev) => ({ ...prev, teacher_name: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Max Students</Label>
                  <Input
                    type="number"
                    min={1}
                    value={classForm.max_students}
                    onChange={(event) =>
                      setClassForm((prev) => ({ ...prev, max_students: event.target.value }))
                    }
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  Save Class
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSubscription} className="space-y-3">
                <div className="space-y-1">
                  <Label>Student</Label>
                  <Select
                    value={subscriptionForm.student_id}
                    onValueChange={(value) =>
                      setSubscriptionForm((prev) => ({ ...prev, student_id: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={String(student.id)}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Package Name</Label>
                  <Input
                    value={subscriptionForm.package_name}
                    onChange={(event) =>
                      setSubscriptionForm((prev) => ({ ...prev, package_name: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Total Sessions</Label>
                    <Input
                      type="number"
                      min={1}
                      value={subscriptionForm.total_sessions}
                      onChange={(event) =>
                        setSubscriptionForm((prev) => ({ ...prev, total_sessions: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Used Sessions</Label>
                    <Input
                      type="number"
                      min={0}
                      value={subscriptionForm.used_sessions}
                      onChange={(event) =>
                        setSubscriptionForm((prev) => ({ ...prev, used_sessions: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={subscriptionForm.end_date}
                    onChange={(event) =>
                      setSubscriptionForm((prev) => ({ ...prev, end_date: event.target.value }))
                    }
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting || students.length === 0}>
                  Save Subscription
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Register Student To Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleRegisterClass}
              className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
            >
              <div className="space-y-1">
                <Label>Student</Label>
                <Select
                  value={registerForm.student_id}
                  onValueChange={(value) =>
                    setRegisterForm((prev) => ({ ...prev, student_id: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={String(student.id)}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Class</Label>
                <Select
                  value={registerForm.class_id}
                  onValueChange={(value) =>
                    setRegisterForm((prev) => ({ ...prev, class_id: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((classItem) => (
                      <SelectItem key={classItem.id} value={String(classItem.id)}>
                        {classItem.name} ({classItem.day_of_week} {classItem.time_slot})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  students.length === 0 ||
                  classes.length === 0 ||
                  !registerForm.student_id ||
                  !registerForm.class_id
                }
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Classes By Weekday</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
              {classByDay.map(({ day, items }) => (
                <div key={day} className="rounded-md border p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold">{DAY_LABELS[day]}</p>
                    <Badge variant="secondary" className="text-[10px]">
                      {items.length}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {items.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No class</p>
                    ) : (
                      items.map((classItem) => {
                        const isFull = classItem.registered_students >= classItem.max_students;
                        return (
                          <div key={classItem.id} className="rounded border p-2">
                            <p className="text-xs font-medium">{classItem.name}</p>
                            <p className="text-[11px] text-muted-foreground">{classItem.subject}</p>
                            <p className="text-[11px] text-muted-foreground">{classItem.time_slot}</p>
                            <p className="text-[11px] text-muted-foreground">{classItem.teacher_name}</p>
                            <p
                              className={`text-[11px] ${
                                isFull ? "text-red-600" : "text-emerald-600"
                              }`}
                            >
                              {classItem.registered_students}/{classItem.max_students}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
