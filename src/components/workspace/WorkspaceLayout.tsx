import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FolderKanban, MessageSquare, 
  Calendar, Settings, Bell, Search, Plus,
  CheckCircle2, Menu, X, Briefcase, LogOut, FileText, Scale
} from 'lucide-react';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/workspace' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/workspace/projects' },
  { id: 'team', label: 'Team', icon: Users, path: '/workspace/team' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/workspace/messages', badge: 3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/workspace/calendar' },
  { id: 'invoice', label: 'Invoice', icon: FileText, path: '/workspace/invoice' },
  { id: 'legal', label: 'Legal Docs', icon: Scale, path: '/workspace/legal' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/workspace/settings' }
];

const teamMembers = [
  { id: 1, name: "Alex Kumar", role: "Lead Developer", status: "online" },
  { id: 2, name: "Priya Sharma", role: "UI/UX Designer", status: "online" },
  { id: 3, name: "Rahul Menon", role: "DevOps Engineer", status: "offline" },
  { id: 4, name: "Divya Nair", role: "Project Manager", status: "online" },
];

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function WorkspaceLayout({ children, title, subtitle }: WorkspaceLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New project assigned", message: "You have been assigned to Debpto POS System", time: "2 min ago", read: false },
    { id: 2, title: "Task completed", message: "Alex Kumar completed API Integration task", time: "15 min ago", read: false },
    { id: 3, title: "Meeting reminder", message: "Design Review Meeting starts in 30 minutes", time: "1 hour ago", read: true },
    { id: 4, title: "New team member", message: "Sneha Reddy joined the Engineering team", time: "3 hours ago", read: true },
  ]);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    deadline: ''
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const handleNewProject = () => {
    if (projectForm.name.trim()) {
      console.log('New Project:', projectForm);
      setShowNewProjectModal(false);
      setProjectForm({ name: '', description: '', status: 'Planning', priority: 'Medium', deadline: '' });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white [&_*]:!font-[Montserrat]" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-border' : 'bg-white border-b border-border'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile Menu Toggle + Search */}
            <div className="flex items-center gap-2 ml-0 lg:-ml-20">
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-muted transition-colors flex-shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="hidden md:flex items-center relative">
                <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search projects, tasks, or team members..."
                  className="pl-10 pr-4 py-2 w-96 bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-muted transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
              <div className="w-px h-8 bg-border"></div>
              <button
                onClick={() => {
                  localStorage.removeItem('workspace_auth');
                  localStorage.removeItem('workspace_user');
                  navigate('/login');
                }}
                className="p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <Link to="/" className="flex items-center">
                <img src="/2.png" alt="Echoes Software" className="w-[120px] h-auto object-contain" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Panel */}
      {showNotifications && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowNotifications(false)}
          />
          <div className="fixed top-16 right-4 sm:right-8 lg:right-[calc(50%-700px+1rem)] w-80 sm:w-96 bg-white border border-border shadow-lg z-50 max-h-[500px] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-medium">Notifications</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      onClick={() => {
                        setNotifications(notifications.map(n => 
                          n.id === notification.id ? {...n, read: true} : n
                        ));
                      }}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notification.read ? 'bg-primary' : 'bg-gray-300'}`} />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border bg-muted/20">
              <Link 
                to="/workspace/notifications" 
                onClick={() => setShowNotifications(false)}
                className="block text-center text-sm text-primary hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Main Layout */}
      <div className="pt-16 flex max-w-[1400px] mx-auto">
        {/* Sidebar - Desktop always visible, Mobile toggled */}
        <aside className={`w-64 fixed left-0 top-16 bottom-0 bg-white border-r border-border overflow-y-auto z-40 transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:block`}>
          <div className="p-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button 
                onClick={() => setShowNewProjectModal(true)}
                className="bg-primary text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                <span className="text-[10px] font-medium">New Project</span>
              </button>
              <button 
                className="bg-green-500 text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] font-medium">Add Task</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <p className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground mb-3 px-3">
                Main Menu
              </p>
              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive(item.path) ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Team Section */}
            <div className="mt-8">
              <p className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground mb-3 px-3">
                Online Team
              </p>
              <div className="space-y-1">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 px-3 py-2 hover:bg-muted transition-colors cursor-pointer">
                    <div className="relative">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">{member.name.charAt(0)}</span>
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tighter">
              {title} <span className="text-muted-foreground/40 italic">Workspace</span>
            </h1>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
          {children}
        </main>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowNewProjectModal(false)} />
          <div className="relative bg-white w-full max-w-md border border-border shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Create New Project</h2>
              </div>
              <button onClick={() => setShowNewProjectModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Project Name *</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  placeholder="Enter project description"
                  rows={3}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Priority</label>
                  <select
                    value={projectForm.priority}
                    onChange={(e) => setProjectForm({...projectForm, priority: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Deadline</label>
                <input
                  type="date"
                  value={projectForm.deadline}
                  onChange={(e) => setProjectForm({...projectForm, deadline: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-muted/20">
              <button 
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleNewProject}
                disabled={!projectForm.name.trim()}
                className="px-4 py-2 text-sm bg-foreground text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
