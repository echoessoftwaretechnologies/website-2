import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  Plus, Search, Filter, Grid3X3, List, MoreHorizontal, X, Briefcase,
  Clock, CheckCircle2, AlertCircle, Calendar, Users
} from 'lucide-react';
import { useState } from 'react';

const allProjects = [
  { id: 1, name: "Debpto POS System", status: "In Progress", progress: 75, team: ["A", "B", "C"], deadline: "Jan 15, 2026", priority: "High", category: "SaaS" },
  { id: 2, name: "Client Portal Redesign", status: "Review", progress: 90, team: ["D", "E"], deadline: "Jan 10, 2026", priority: "Medium", category: "Web" },
  { id: 3, name: "Cloud Migration", status: "Planning", progress: 30, team: ["F", "G", "H", "I"], deadline: "Feb 01, 2026", priority: "High", category: "Infrastructure" },
  { id: 4, name: "Mobile App v2.0", status: "Development", progress: 60, team: ["J", "K"], deadline: "Jan 25, 2026", priority: "Medium", category: "Mobile" },
  { id: 5, name: "AI Analytics Dashboard", status: "In Progress", progress: 45, team: ["L", "M"], deadline: "Feb 15, 2026", priority: "High", category: "AI/ML" },
  { id: 6, name: "E-commerce Integration", status: "Planning", progress: 15, team: ["N", "O", "P"], deadline: "Mar 01, 2026", priority: "Low", category: "Web" },
];

const projectStats = [
  { label: "Total Projects", value: 24, icon: Grid3X3 },
  { label: "In Progress", value: 8, icon: Clock },
  { label: "Completed", value: 12, icon: CheckCircle2 },
  { label: "Delayed", value: 4, icon: AlertCircle }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof allProjects[0] | null>(null);
  const [projects, setProjects] = useState(allProjects);
  const [projectForm, setProjectForm] = useState({
    name: '',
    category: 'Web',
    status: 'Planning',
    priority: 'Medium',
    deadline: '',
    progress: 0
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-yellow-100 text-yellow-700';
      case 'Planning': return 'bg-purple-100 text-purple-700';
      case 'Development': return 'bg-green-100 text-green-700';
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

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status.toLowerCase().includes(filter));

  return (
    <WorkspaceLayout title="Projects" subtitle="Manage and track all your projects in one place.">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {projectStats.map((stat, i) => (
          <div key={i} className="bg-muted p-5 border border-border hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-display font-medium">{stat.value}</p>
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="progress">In Progress</option>
            <option value="review">Review</option>
            <option value="planning">Planning</option>
          </select>
          <button className="p-2 bg-muted border border-border hover:border-primary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white hover:bg-muted'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white hover:bg-muted'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Projects List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white border border-border hover:border-primary transition-all p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-muted-foreground">{project.category}</span>
                <h3 className="font-medium text-lg mt-1">{project.name}</h3>
              </div>
              <button 
                onClick={() => {
                  setEditingProject(project);
                  setShowEditModal(true);
                }}
                className="p-1 hover:bg-muted rounded"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{project.deadline}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{project.team.length} members</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>{project.status}</span>
                <span className={`text-xs px-2 py-1 font-medium ${getPriorityColor(project.priority)}`}>{project.priority}</span>
              </div>
              <div className="flex -space-x-2">
                {project.team.map((member, j) => (
                  <div key={j} className="w-7 h-7 bg-muted rounded-full flex items-center justify-center border-2 border-white text-xs font-medium">{member}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-md border border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Create New Project</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="SaaS">SaaS</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Infrastructure">Infrastructure</option>
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
                    <option value="Development">Development</option>
                  </select>
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
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-muted/20">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (projectForm.name.trim()) {
                    const newProject = {
                      id: Date.now(),
                      name: projectForm.name,
                      status: projectForm.status,
                      progress: projectForm.progress,
                      team: [],
                      deadline: projectForm.deadline || 'TBD',
                      priority: projectForm.priority,
                      category: projectForm.category
                    };
                    setProjects([newProject, ...projects]);
                    setShowModal(false);
                    setProjectForm({
                      name: '',
                      category: 'Web',
                      status: 'Planning',
                      priority: 'Medium',
                      deadline: '',
                      progress: 0
                    });
                  }
                }}
                disabled={!projectForm.name.trim()}
                className="px-4 py-2 text-sm bg-foreground text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Project Modal */}
      {showEditModal && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white w-full max-w-md border border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Edit Project</h2>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Project Name *</label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="SaaS">SaaS</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Priority</label>
                  <select
                    value={editingProject.priority}
                    onChange={(e) => setEditingProject({...editingProject, priority: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Deadline</label>
                  <input
                    type="text"
                    value={editingProject.deadline}
                    onChange={(e) => setEditingProject({...editingProject, deadline: e.target.value})}
                    placeholder="e.g., Jan 15, 2026"
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingProject.progress}
                  onChange={(e) => setEditingProject({...editingProject, progress: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-muted/20">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (editingProject.name.trim()) {
                    setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
                    setShowEditModal(false);
                    setEditingProject(null);
                  }
                }}
                disabled={!editingProject.name.trim()}
                className="px-4 py-2 text-sm bg-foreground text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
