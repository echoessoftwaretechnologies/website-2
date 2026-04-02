import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  User, Bell, Lock, Mail, Save,
  ChevronRight, Smartphone
} from 'lucide-react';
import { useState } from 'react';

const settingSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <WorkspaceLayout title="Settings" subtitle="Manage your workspace preferences and account settings.">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="bg-white border border-border">
          <nav className="p-2">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  activeSection === section.id 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === section.id ? 'text-white' : 'text-muted-foreground'}`} />
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-white border border-border p-6">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-medium">Profile Settings</h2>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium">A</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all">
                    Change Avatar
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input type="text" defaultValue="Admin Team" className="w-full px-4 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" defaultValue="admin@echoess.in" className="w-full px-4 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <input type="text" defaultValue="Administrator" className="w-full px-4 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <input type="text" defaultValue="Management" className="w-full px-4 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-medium">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-muted">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors ml-auto ${emailNotifications ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${emailNotifications ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-muted">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors ml-auto ${pushNotifications ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${pushNotifications ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-medium">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password regularly</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input type="password" placeholder="Current Password" className="w-full px-4 py-2 bg-white border border-border text-sm focus:outline-none focus:border-primary" />
                    <input type="password" placeholder="New Password" className="w-full px-4 py-2 bg-white border border-border text-sm focus:outline-none focus:border-primary" />
                    <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-2 bg-white border border-border text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-border">
            <button className="inline-flex items-center gap-2 px-6 py-2 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
