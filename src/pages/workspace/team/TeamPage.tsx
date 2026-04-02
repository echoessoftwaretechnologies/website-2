import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  Search, Filter, Plus, Mail, Phone, MoreHorizontal,
  Briefcase, Clock, CheckCircle2, MessageSquare, X, User, Trash2, Edit3
} from 'lucide-react';
import { useState } from 'react';

const allTeamMembers = [
  { id: 1, name: "Alex Kumar", role: "Lead Developer", email: "alex@echoess.in", phone: "+91 98765 43210", status: "online", department: "Engineering", tasks: 8, projects: 3 },
  { id: 2, name: "Priya Sharma", role: "UI/UX Designer", email: "priya@echoess.in", phone: "+91 98765 43211", status: "online", department: "Design", tasks: 5, projects: 2 },
  { id: 3, name: "Rahul Menon", role: "DevOps Engineer", email: "rahul@echoess.in", phone: "+91 98765 43212", status: "offline", department: "Infrastructure", tasks: 6, projects: 4 },
  { id: 4, name: "Divya Nair", role: "Project Manager", email: "divya@echoess.in", phone: "+91 98765 43213", status: "online", department: "Management", tasks: 12, projects: 5 },
  { id: 5, name: "Vikram Patel", role: "Backend Developer", email: "vikram@echoess.in", phone: "+91 98765 43214", status: "busy", department: "Engineering", tasks: 7, projects: 3 },
  { id: 6, name: "Sneha Reddy", role: "Frontend Developer", email: "sneha@echoess.in", phone: "+91 98765 43215", status: "online", department: "Engineering", tasks: 9, projects: 2 },
];

const departmentStats = [
  { name: "Engineering", count: 8, color: "bg-blue-500" },
  { name: "Design", count: 4, color: "bg-purple-500" },
  { name: "Management", count: 3, color: "bg-green-500" },
  { name: "Infrastructure", count: 2, color: "bg-orange-500" }
];

export default function TeamPage() {
  const [filter, setFilter] = useState('all');
  const [members, setMembers] = useState(allTeamMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState<typeof allTeamMembers[0] | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    department: 'Engineering',
    status: 'online'
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const filteredMembers = filter === 'all' ? members : members.filter(m => m.department.toLowerCase() === filter);

  return (
    <WorkspaceLayout title="Team" subtitle="Manage your team members and their assignments.">
      {/* Department Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {departmentStats.map((dept, i) => (
          <button 
            key={i}
            onClick={() => setFilter(filter === dept.name.toLowerCase() ? 'all' : dept.name.toLowerCase())}
            className={`p-5 border transition-all text-left ${filter === dept.name.toLowerCase() ? 'border-primary bg-primary/5' : 'border-border hover:border-primary bg-muted'}`}
          >
            <div className={`w-3 h-3 rounded-full ${dept.color} mb-3`}></div>
            <p className="text-2xl font-display font-medium">{dept.count}</p>
            <p className="text-sm text-muted-foreground">{dept.name}</p>
          </button>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search team members..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="p-2 bg-muted border border-border hover:border-primary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white border border-border hover:border-primary transition-all p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium">{member.name.charAt(0)}</span>
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></span>
                </div>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setEditingMember(member);
                  setShowEditModal(true);
                }}
                className="p-1 hover:bg-muted rounded"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                <span>{member.department}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{member.tasks} tasks</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>{member.projects} projects</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 text-sm border border-border hover:border-primary hover:bg-muted transition-colors flex items-center justify-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button className="flex-1 py-2 text-sm bg-foreground text-background hover:bg-primary transition-colors">
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white w-full max-w-md border border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Add New Member</h2>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Role *</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  placeholder="e.g., Frontend Developer"
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Department</label>
                  <select
                    value={newMember.department}
                    onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Status</label>
                  <select
                    value={newMember.status}
                    onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input
                  type="text"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-muted/20">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (newMember.name.trim() && newMember.role.trim()) {
                    const member = {
                      id: Date.now(),
                      name: newMember.name,
                      role: newMember.role,
                      email: newMember.email || `${newMember.name.toLowerCase().replace(' ', '.')}@echoess.in`,
                      phone: newMember.phone || '+91 98765 00000',
                      status: newMember.status,
                      department: newMember.department,
                      tasks: 0,
                      projects: 0
                    };
                    setMembers([member, ...members]);
                    setShowAddModal(false);
                    setNewMember({
                      name: '',
                      role: '',
                      email: '',
                      phone: '',
                      department: 'Engineering',
                      status: 'online'
                    });
                  }
                }}
                disabled={!newMember.name.trim() || !newMember.role.trim()}
                className="px-4 py-2 text-sm bg-foreground text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white w-full max-w-md border border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Edit Member</h2>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Role *</label>
                <input
                  type="text"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Department</label>
                  <select
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({...editingMember, department: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Status</label>
                  <select
                    value={editingMember.status}
                    onChange={(e) => setEditingMember({...editingMember, status: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input
                  type="text"
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tasks</label>
                  <input
                    type="number"
                    value={editingMember.tasks}
                    onChange={(e) => setEditingMember({...editingMember, tasks: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Projects</label>
                  <input
                    type="number"
                    value={editingMember.projects}
                    onChange={(e) => setEditingMember({...editingMember, projects: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to delete this member?')) {
                    setMembers(members.filter(m => m.id !== editingMember.id));
                    setShowEditModal(false);
                    setEditingMember(null);
                  }
                }}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (editingMember.name.trim() && editingMember.role.trim()) {
                      setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
                      setShowEditModal(false);
                      setEditingMember(null);
                    }
                  }}
                  disabled={!editingMember.name.trim() || !editingMember.role.trim()}
                  className="px-4 py-2 text-sm bg-foreground text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
