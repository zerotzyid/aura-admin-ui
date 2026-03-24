import React, { useState } from "react";
import { BasicCard } from "@/components/dashboard/Cards";
import { StatusBadge } from "@/components/dashboard/UIComponents";
import { Breadcrumb, Avatar, AvatarGroup } from "@/components/dashboard/UtilityComponents";
import { Modal } from "@/components/dashboard/Overlays";
import { FormInput, FormTextarea, FormSelect } from "@/components/dashboard/FormComponents";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

// NEW COMPONENT — Calendar page

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface CalendarEvent {
  id: string;
  title: string;
  date: number;
  time: string;
  color: "primary" | "success" | "warning" | "info";
  attendees: string[];
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const events: CalendarEvent[] = [
    { id: "1", title: "Team Standup", date: 3, time: "9:00 AM", color: "primary", attendees: ["John Doe", "Jane Smith"] },
    { id: "2", title: "Design Review", date: 7, time: "2:00 PM", color: "info", attendees: ["Bob Wilson", "Alice Brown"] },
    { id: "3", title: "Sprint Planning", date: 10, time: "10:00 AM", color: "success", attendees: ["John Doe", "Charlie Davis", "Eve Wilson"] },
    { id: "4", title: "Client Meeting", date: 14, time: "3:30 PM", color: "warning", attendees: ["Jane Smith"] },
    { id: "5", title: "Code Review", date: 18, time: "11:00 AM", color: "primary", attendees: ["Bob Wilson", "John Doe"] },
    { id: "6", title: "Release Day", date: 22, time: "9:00 AM", color: "success", attendees: ["John Doe", "Jane Smith", "Bob Wilson", "Alice Brown"] },
    { id: "7", title: "Retrospective", date: 25, time: "4:00 PM", color: "info", attendees: ["John Doe", "Jane Smith"] },
  ];

  const colorMap = {
    primary: "bg-primary/10 text-primary border-l-primary",
    success: "bg-success/10 text-success border-l-success",
    warning: "bg-warning/10 text-warning border-l-warning",
    info: "bg-info/10 text-info border-l-info",
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const upcomingEvents = events.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Calendar" }]} />
          <h1 className="text-2xl font-bold text-foreground mt-2">Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">{MONTHS[month]} {year}</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> New Event
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {/* Calendar grid */}
        <BasicCard className="xl:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-card-foreground">{MONTHS[month]} {year}</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
              <Button variant="ghost" size="icon-sm" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-px mb-1">
            {DAYS.map(d => (
              <div key={d} className="py-2 text-center text-xs font-semibold text-muted-foreground">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-px">
            {calendarDays.map((day, i) => {
              const dayEvents = day ? events.filter(e => e.date === day) : [];
              return (
                <div
                  key={i}
                  className={`min-h-[80px] rounded-lg border border-transparent p-1.5 transition-colors ${
                    day ? "hover:bg-accent/30 cursor-pointer" : ""
                  } ${day && isToday(day) ? "bg-primary/5 border-primary/20" : ""}`}
                >
                  {day && (
                    <>
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                        isToday(day) ? "bg-primary text-primary-foreground font-bold" : "text-card-foreground"
                      }`}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map(ev => (
                          <div key={ev.id} className={`rounded px-1.5 py-0.5 text-[10px] font-medium truncate border-l-2 ${colorMap[ev.color]}`}>
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <p className="text-[10px] text-muted-foreground px-1.5">+{dayEvents.length - 2} more</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </BasicCard>

        {/* Upcoming events sidebar */}
        <div className="space-y-6">
          <BasicCard title="Upcoming Events">
            <div className="space-y-4">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="flex gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-${ev.color === "primary" ? "primary" : ev.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">{MONTHS[month]} {ev.date} · {ev.time}</p>
                    <div className="mt-1.5">
                      <AvatarGroup users={ev.attendees.map(name => ({ name }))} max={3} size="xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BasicCard>

          <BasicCard title="Today's Schedule">
            <div className="space-y-3 text-center py-4">
              <p className="text-3xl font-bold text-card-foreground">{today.getDate()}</p>
              <p className="text-sm text-muted-foreground">{DAYS[today.getDay()]}, {MONTHS[today.getMonth()]}</p>
              <StatusBadge variant="success" dot>No events today</StatusBadge>
            </div>
          </BasicCard>
        </div>
      </div>

      {/* New Event Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Event" footer={
        <>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setModalOpen(false)}>Create Event</Button>
        </>
      }>
        <div className="space-y-4">
          <FormInput label="Event Title" placeholder="Enter event title" />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Date" type="date" />
            <FormInput label="Time" type="time" />
          </div>
          <FormSelect label="Category" options={[
            { label: "Meeting", value: "meeting" },
            { label: "Review", value: "review" },
            { label: "Deadline", value: "deadline" },
            { label: "Social", value: "social" },
          ]} />
          <FormTextarea label="Description" placeholder="Add details..." />
        </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
