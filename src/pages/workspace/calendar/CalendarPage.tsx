import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Clock, MapPin, Users, Plus, MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const events = [
  { id: 1, title: "Design Review", time: "10:00 AM - 11:00 AM", type: "meeting", attendees: ["A", "B", "C"], location: "Conference Room A" },
  { id: 2, title: "Sprint Planning", time: "2:00 PM - 3:30 PM", type: "planning", attendees: ["D", "E", "F", "G"], location: "Zoom" },
  { id: 3, title: "Client Call", time: "4:00 PM - 5:00 PM", type: "call", attendees: ["H", "I"], location: "Google Meet" },
];

const upcomingEvents = [
  { id: 1, title: "Team Standup", date: "Tomorrow, 9:00 AM", type: "daily" },
  { id: 2, title: "Product Demo", date: "Jan 15, 2:00 PM", type: "demo" },
  { id: 3, title: "Retrospective", date: "Jan 16, 3:00 PM", type: "meeting" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

  return (
    <WorkspaceLayout title="Calendar" subtitle="Schedule and manage your meetings and events.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white border border-border overflow-x-auto">
          <div className="min-w-[600px]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-display font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-1 hover:bg-muted rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm border border-border hover:bg-muted"
                >
                  Today
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-1 hover:bg-muted rounded"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all">
              <Plus className="w-4 h-4" />
              New Event
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border-b border-border">
            {days.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 border-r border-b border-border last:border-r-0"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = isCurrentMonth && day === today;
              return (
                <div 
                  key={day} 
                  className={`h-24 border-r border-b border-border last:border-r-0 p-2 ${isToday ? 'bg-primary/5' : ''}`}
                >
                  <span className={`text-sm ${isToday ? 'bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center' : ''}`}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Today's Events */}
          <div className="bg-muted border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Today's Schedule</h3>
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white p-3 border border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="w-3 h-3" /></button>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <div className="flex -space-x-1">
                        {event.attendees.map((a, i) => (
                          <div key={i} className="w-4 h-4 bg-muted rounded-full flex items-center justify-center text-[8px] font-medium border border-white">{a}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-border p-5">
            <h3 className="font-medium mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
