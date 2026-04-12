import { useState, useEffect } from 'react';
import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  Plus, Edit2, Trash2, Bell, Search, Filter,
  CheckCircle, X, Calendar, User, Folder, AlertCircle,
  MessageSquare, Clock
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'project' | 'task' | 'meeting' | 'team' | 'system';
  details?: string;
}

const NOTIFICATIONS_KEY = 'echoes_notifications';

const defaultNotifications: Notification[] = [
  { 
    id: 1, 
    title: "New project assigned", 
    message: "You have been assigned to Debpto POS System", 
    time: "2 min ago", 
    read: false,
    type: 'project',
    details: "Project ID: PRJ-2024-001\nClient: Debpto Enterprises\nDeadline: Dec 31, 2024"
  },
  { 
    id: 2, 
    title: "Task completed", 
    message: "Alex Kumar completed API Integration task", 
    time: "15 min ago", 
    read: false,
    type: 'task',
    details: "Task: API Integration\nProject: E-Commerce Platform"
  },
  { 
    id: 3, 
    title: "Meeting reminder", 
    message: "Design Review Meeting starts in 30 minutes", 
    time: "1 hour ago", 
    read: true,
    type: 'meeting',
    details: "Meeting: Design Review\nTime: Today, 3:00 PM\nLocation: Conference Room A"
  },
  { 
    id: 4, 
    title: "New team member", 
    message: "Sneha Reddy joined the Engineering team", 
    time: "3 hours ago", 
    read: true,
    type: 'team',
    details: "Name: Sneha Reddy\nRole: Senior Developer\nDepartment: Engineering"
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'project': return Folder;
    case 'task': return CheckCircle;
    case 'meeting': return Calendar;
    case 'team': return User;
    case 'system': return AlertCircle;
    default: return Bell;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'project': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'task': return 'bg-green-100 text-green-700 border-green-200';
    case 'meeting': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'team': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'system': return 'bg-gray-100 text-gray-700 border-gray-200';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'project' as Notification['type'],
    details: '',
    time: 'Just now'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      setNotifications(defaultNotifications);
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(defaultNotifications));
    }
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    }
  }, [notifications]);

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || n.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAdd = () => {
    setEditingNotification(null);
    setFormData({
      title: '',
      message: '',
      type: 'project',
      details: '',
      time: 'Just now'
    });
    setShowModal(true);
  };

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      details: notification.details || '',
      time: notification.time
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNotification) {
      // Update existing
      setNotifications(prev => prev.map(n => 
        n.id === editingNotification.id 
          ? { ...n, ...formData, details: formData.details || undefined }
          : n
      ));
    } else {
      // Add new
      const newNotification: Notification = {
        id: Date.now(),
        ...formData,
        read: false,
        details: formData.details || undefined
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
    
    setShowModal(false);
  };

  const resetToDefault = () => {
    if (confirm('Reset all notifications to default?')) {
      setNotifications(defaultNotifications);
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(defaultNotifications));
    }
  };

  const clearAll = () => {
    if (confirm('Delete all notifications?')) {
      setNotifications([]);
      localStorage.removeItem(NOTIFICATIONS_KEY);
    }
  };

  return (
    <WorkspaceLayout 
      title="Notification Manager" 
      subtitle="Create, edit and manage system notifications"
    >
      {/* Stats & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-lg">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-sm sm:text-lg">{notifications.length} Notifications</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto">
          <button
            onClick={handleAdd}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-primary transition-colors rounded"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add New</span>
            <span className="sm:hidden">Add</span>
          </button>
          <button
            onClick={resetToDefault}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-border text-xs sm:text-sm hover:bg-muted transition-colors rounded"
          >
            <span className="hidden sm:inline">Reset Default</span>
            <span className="sm:hidden">Reset</span>
          </button>
          <button
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-red-200 text-red-600 text-xs sm:text-sm hover:bg-red-50 transition-colors disabled:opacity-50 rounded"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Clear All</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 p-2 sm:p-4 bg-muted border border-border rounded-lg">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded transition-colors ${
              typeFilter === 'all' 
                ? 'bg-foreground text-background' 
                : 'bg-white border border-border hover:border-primary'
            }`}
          >
            All
          </button>
          {['project', 'task', 'meeting', 'team', 'system'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium capitalize rounded transition-colors ${
                typeFilter === type 
                  ? 'bg-foreground text-background' 
                  : 'bg-white border border-border hover:border-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-white border border-border text-xs sm:text-sm focus:outline-none focus:border-primary rounded"
          />
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-muted border border-border rounded-lg">
          <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
          <p className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">No notifications</p>
          <p className="text-sm text-muted-foreground mb-4">Create your first notification</p>
          <button
            onClick={handleAdd}
            className="px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded hover:bg-primary/90"
          >
            Add Notification
          </button>
        </div>
      ) : (
        <div className="grid gap-2 sm:gap-3">
          {filteredNotifications.map(notification => {
            const Icon = getTypeIcon(notification.type);
            return (
              <div
                key={notification.id}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-border hover:border-primary transition-all rounded-lg group"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <h3 className="font-medium text-sm sm:text-base truncate">{notification.title}</h3>
                        {!notification.read && (
                          <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] bg-primary text-white rounded-full">NEW</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">{notification.message}</p>
                      {notification.details && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2 bg-muted p-1.5 sm:p-2 rounded line-clamp-1">
                          {notification.details.substring(0, 40)}...
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded capitalize border ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                    <div className="flex items-center gap-0.5 sm:gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(notification)}
                        className="p-1.5 sm:p-2 hover:bg-muted rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1.5 sm:p-2 hover:bg-red-50 text-red-500 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-lg border border-border shadow-xl rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
              <h2 className="text-base sm:text-lg font-semibold">
                {editingNotification ? 'Edit Notification' : 'Add Notification'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 sm:p-2 hover:bg-muted rounded">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., New project assigned"
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border text-xs sm:text-sm focus:outline-none focus:border-primary rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Message *</label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g., You have been assigned to..."
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border text-xs sm:text-sm focus:outline-none focus:border-primary rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Type *</label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {['project', 'task', 'meeting', 'team', 'system'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type as Notification['type'] })}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium capitalize border rounded transition-colors ${
                        formData.type === type
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-white border-border hover:border-primary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Time Display</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border text-xs sm:text-sm focus:outline-none focus:border-primary rounded"
                >
                  <option value="Just now">Just now</option>
                  <option value="1 min ago">1 min ago</option>
                  <option value="5 min ago">5 min ago</option>
                  <option value="15 min ago">15 min ago</option>
                  <option value="30 min ago">30 min ago</option>
                  <option value="1 hour ago">1 hour ago</option>
                  <option value="2 hours ago">2 hours ago</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Details (Optional)</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Additional details about this notification..."
                  rows={3}
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border text-xs sm:text-sm focus:outline-none focus:border-primary rounded resize-none"
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Shown when user clicks on notification</p>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 sm:py-2.5 border border-border text-xs sm:text-sm font-medium hover:bg-muted transition-colors rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 sm:py-2.5 bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-primary transition-colors rounded"
                >
                  {editingNotification ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
