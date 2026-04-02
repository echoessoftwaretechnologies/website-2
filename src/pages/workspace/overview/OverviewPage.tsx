import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  Briefcase, Users, CheckCircle2, Clock, 
  TrendingUp, ArrowRight, Filter, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const workspaceStats = [
  { value: "24", label: "Active Projects", trend: "+12%", icon: Briefcase },
  { value: "156", label: "Team Members", trend: "+8%", icon: Users },
  { value: "98%", label: "Tasks Completed", trend: "+5%", icon: CheckCircle2 },
  { value: "12", label: "Pending Reviews", trend: "-3", icon: Clock }
];

const recentProjects = [
  { id: 1, name: "Debpto POS System", status: "In Progress", progress: 75, team: ["A", "B", "C"], deadline: "Jan 15, 2026", priority: "High" },
  { id: 2, name: "Client Portal Redesign", status: "Review", progress: 90, team: ["D", "E"], deadline: "Jan 10, 2026", priority: "Medium" },
  { id: 3, name: "Cloud Migration", status: "Planning", progress: 30, team: ["F", "G", "H", "I"], deadline: "Feb 01, 2026", priority: "High" },
  { id: 4, name: "Mobile App v2.0", status: "Development", progress: 60, team: ["J", "K"], deadline: "Jan 25, 2026", priority: "Medium" }
];

const recentActivity = [
  { id: 1, user: "Alex Kumar", action: "completed task", target: "API Integration", project: "Debpto POS", time: "2 hours ago" },
  { id: 2, user: "Priya Sharma", action: "added comment on", target: "UI Mockups", project: "Client Portal", time: "4 hours ago" },
  { id: 3, user: "Rahul Menon", action: "created", target: "New Sprint", project: "Cloud Migration", time: "6 hours ago" },
  { id: 4, user: "Divya Nair", action: "uploaded", target: "Requirements Doc", project: "Mobile App", time: "8 hours ago" }
];

const upcomingTasks = [
  { id: 1, title: "Design Review Meeting", project: "Debpto POS", time: "Today, 2:00 PM" },
  { id: 2, title: "Client Presentation", project: "Client Portal", time: "Tomorrow, 10:00 AM" },
  { id: 3, title: "Code Review", project: "Mobile App", time: "Tomorrow, 3:00 PM" },
  { id: 4, title: "Sprint Planning", project: "Cloud Migration", time: "Jan 05, 9:00 AM" }
];

const teamMembers = [
  { id: 1, name: "Alex Kumar", role: "Lead Developer", status: "online", tasks: 8 },
  { id: 2, name: "Priya Sharma", role: "UI/UX Designer", status: "online", tasks: 5 },
  { id: 3, name: "Rahul Menon", role: "DevOps Engineer", status: "offline", tasks: 6 },
  { id: 4, name: "Divya Nair", role: "Project Manager", status: "online", tasks: 12 },
  { id: 5, name: "Vikram Patel", role: "Backend Developer", status: "busy", tasks: 7 }
];

export default function OverviewPage() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-yellow-100 text-yellow-700';
      case 'Planning': return 'bg-purple-100 text-purple-700';
      case 'Development': return 'bg-green-100 text-green-700';
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <WorkspaceLayout title="Admin" subtitle="Manage projects, track progress, and collaborate with your team.">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {workspaceStats.map((stat, i) => (
          <div key={i} className="bg-muted p-5 border border-border hover:border-primary transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : stat.trend.startsWith('-') ? 'text-red-600' : 'text-blue-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-display font-medium tracking-tighter">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-medium">Active Projects</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted transition-colors"><Filter className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-muted transition-colors"><Download className="w-4 h-4" /></button>
              <Link to="/workspace/projects" className="inline-flex items-center gap-1 px-3 py-1.5 bg-foreground text-background text-[10px] tracking-widest uppercase font-semibold hover:bg-primary transition-all">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="bg-white border border-border hover:border-primary transition-all duration-300 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{project.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due {project.deadline}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 font-medium ${getPriorityColor(project.priority)}`}>{project.priority}</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: project.progress + '%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>{project.status}</span>
                    <div className="flex -space-x-2">
                      {project.team.map((member, j) => (
                        <div key={j} className="w-7 h-7 bg-muted rounded-full flex items-center justify-center border-2 border-white text-xs font-medium">{member}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-muted border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Upcoming Tasks</h3>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="bg-white p-3 border border-border hover:border-primary transition-colors">
                  <p className="font-medium text-sm mb-1">{task.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Recent Activity</h3>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">{activity.user.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action} </span>
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.project} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white p-5">
            <h3 className="font-medium mb-4">Team Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Tasks This Week</span>
                <span className="font-medium">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Completed</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Efficiency</span>
                <span className="font-medium">87.5%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12% from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-medium">Team Overview</h2>
          <Link to="/workspace/team" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            View All Members <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white border border-border p-4 text-center hover:border-primary transition-all">
              <div className="relative inline-block mb-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-medium">{member.name.charAt(0)}</span>
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></span>
              </div>
              <p className="font-medium text-sm">{member.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3" />
                <span>{member.tasks} tasks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
