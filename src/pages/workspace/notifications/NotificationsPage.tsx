import { useState, useEffect } from 'react';
import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  Bell, CheckCircle, Trash2, Filter, Search,
  Clock, User, Folder, Calendar, AlertCircle, 
  CheckCircle2, X
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
    case 'project': return 'bg-blue-100 text-blue-700';
    case 'task': return 'bg-green-100 text-green-700';
    case 'meeting': return 'bg-purple-100 text-purple-700';
    case 'team': return 'bg-orange-100 text-orange-700';
    case 'system': return 'bg-gray-100 text-gray-700';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRead = filter === 'all' || 
                       (filter === 'unread' && !n.read) || 
                       (filter === 'read' && n.read);
    const matchesType = typeFilter === 'all' || n.type === typeFilter;
    return matchesSearch && matchesRead && matchesType;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  };

  const deleteNotification = (id: number) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
    setSelectedNotification(null);
  };

  return (
    <WorkspaceLayout 
      title="Notifications" 
      subtitle={`You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
    >
      {/* Stats & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded">
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">{notifications.length} Total</span>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-blue-700">{unreadCount} Unread</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 text-xs sm:text-sm border border-border hover:bg-muted transition-colors disabled:opacity-50 rounded"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Mark all read</span>
            <span className="sm:hidden">Mark read</span>
          </button>
          <button
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 text-xs sm:text-sm border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 rounded"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Clear all</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-muted border border-border rounded">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          {(['all', 'unread', 'read'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium capitalize rounded transition-colors ${
                filter === f 
                  ? 'bg-foreground text-background' 
                  : 'bg-white border border-border hover:border-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-48 pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-white border border-border text-xs sm:text-sm focus:outline-none focus:border-primary rounded"
          />
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded transition-colors ${
            typeFilter === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-muted border border-border hover:border-primary'
          }`}
        >
          <span className="hidden sm:inline">All Types</span>
          <span className="sm:hidden">All</span>
        </button>
        {['project', 'task', 'meeting', 'team', 'system'].map(type => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium capitalize rounded transition-colors ${
              typeFilter === type 
                ? 'bg-primary text-white' 
                : 'bg-muted border border-border hover:border-primary'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-muted border border-border rounded">
          <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">No notifications found</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {searchQuery ? 'Try adjusting your search' : 'You\'re all caught up!'}
          </p>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {filteredNotifications.map(notification => {
            const Icon = getTypeIcon(notification.type);
            return (
              <div
                key={notification.id}
                onClick={() => {
                  setSelectedNotification(notification);
                  markAsRead(notification.id);
                }}
                className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border cursor-pointer transition-all hover:shadow-md rounded ${
                  notification.read 
                    ? 'bg-white border-border' 
                    : 'bg-blue-50/50 border-blue-200'
                }`}
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                    <div className="min-w-0">
                      <h3 className={`text-xs sm:text-sm font-medium truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-1.5 sm:ml-2 inline-flex w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">{notification.message}</p>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0 flex items-center gap-0.5 sm:gap-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {notification.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded capitalize ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="p-1.5 sm:p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setSelectedNotification(null)} 
          />
          <div className="relative bg-white w-full max-w-md border border-border shadow-xl rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(selectedNotification.type)}`}>
                  {(() => {
                    const Icon = getTypeIcon(selectedNotification.type);
                    return <Icon className="w-4 h-4 sm:w-5 sm:h-5" />;
                  })()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm sm:text-base truncate">{selectedNotification.title}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{selectedNotification.time}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNotification(null)}
                className="p-1.5 sm:p-2 hover:bg-muted rounded"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">{selectedNotification.message}</p>
              
              {selectedNotification.details && (
                <div className="bg-muted p-2.5 sm:p-3 rounded">
                  <p className="text-[10px] sm:text-xs font-medium mb-1.5 sm:mb-2">Details:</p>
                  <pre className="text-[10px] sm:text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                    {selectedNotification.details}
                  </pre>
                </div>
              )}
              
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-border">
                <span className={`text-[10px] sm:text-xs px-2 py-1 rounded capitalize ${getTypeColor(selectedNotification.type)} w-fit`}>
                  {selectedNotification.type}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteNotification(selectedNotification.id)}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs border border-red-200 text-red-600 hover:bg-red-50 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-foreground text-background hover:bg-primary rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
