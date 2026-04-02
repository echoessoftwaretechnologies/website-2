import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  Search, Send, Paperclip, MoreHorizontal,
  Phone, Video, Info, Check, CheckCheck, ArrowLeft,
  Pin
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const conversations = [
  { id: 1, user: "Alex Kumar", role: "Lead Developer", lastMessage: "Can you review the PR?", time: "2 min ago", unread: 2, status: "online", pinned: true },
  { id: 2, user: "Priya Sharma", role: "UI/UX Designer", lastMessage: "Mockups are ready", time: "15 min ago", unread: 0, status: "online" },
  { id: 3, user: "Rahul Menon", role: "DevOps Engineer", lastMessage: "Deployment done", time: "1 hour ago", unread: 0, status: "offline", pinned: true },
  { id: 4, user: "Divya Nair", role: "Project Manager", lastMessage: "Meeting at 2 PM", time: "2 hours ago", unread: 1, status: "online" },
  { id: 5, user: "Vikram Patel", role: "Backend Developer", lastMessage: "API optimized", time: "3 hours ago", unread: 0, status: "busy" },
];

const messagesData = {
  1: [
    { id: 1, sender: "me", text: "Hey Alex, how's the API integration going?", time: "10:30 AM", status: "read" },
    { id: 2, sender: "them", text: "Pretty good! Completed most endpoints.", time: "10:32 AM", status: "read" },
    { id: 3, sender: "them", text: "Can you review the PR I just submitted?", time: "10:35 AM", status: "read" },
    { id: 4, sender: "me", text: "Sure, I'll take a look now.", time: "10:38 AM", status: "delivered" },
  ],
};

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = messagesData[selectedChat.id as keyof typeof messagesData] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const handleChatSelect = (chat: typeof conversations[0]) => {
    setSelectedChat(chat);
    setShowChat(true);
  };

  const filteredConversations = conversations.filter(chat => 
    chat.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredConversations.filter(c => c.pinned);
  const regularChats = filteredConversations.filter(c => !c.pinned);

  return (
    <WorkspaceLayout title="Messages" subtitle="Connect with your team.">
      <div className="bg-white border border-border h-[calc(100vh-260px)] min-h-[500px]">
        <div className="flex h-full">
          
          {/* Sidebar */}
          <div className={`${showChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-80 xl:w-96 border-r border-border bg-muted/20 flex-col`}>
            {/* Search */}
            <div className="p-4 border-b border-border bg-white">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {/* Pinned */}
              {pinnedChats.length > 0 && (
                <div className="p-2">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 px-3 flex items-center gap-1">
                    <Pin className="w-3 h-3" /> PINNED
                  </p>
                  {pinnedChats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} isActive={selectedChat.id === chat.id} onClick={() => handleChatSelect(chat)} getStatusColor={getStatusColor} />
                  ))}
                </div>
              )}

              {/* All Messages */}
              {regularChats.length > 0 && (
                <div className="p-2">
                  {pinnedChats.length > 0 && (
                    <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">ALL MESSAGES</p>
                  )}
                  {regularChats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} isActive={selectedChat.id === chat.id} onClick={() => handleChatSelect(chat)} getStatusColor={getStatusColor} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${showChat ? 'flex' : 'hidden lg:flex'} flex-1 flex-col bg-white`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowChat(false)} className="lg:hidden p-2 -ml-2 hover:bg-muted rounded">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center border border-border font-medium">
                    {selectedChat.user.charAt(0)}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(selectedChat.status)} rounded-full border-2 border-white`}></span>
                </div>
                <div>
                  <p className="font-medium text-sm">{selectedChat.user}</p>
                  <p className="text-xs text-muted-foreground capitalize">{selectedChat.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded hidden sm:block"><Phone className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 hover:bg-muted rounded hidden sm:block"><Video className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 hover:bg-muted rounded hidden sm:block"><Info className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 hover:bg-muted rounded"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Select a conversation to start messaging</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span>
                  </div>
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] lg:max-w-[70%] px-4 py-2.5 ${msg.sender === 'me' ? 'bg-foreground text-white' : 'bg-white border border-border'}`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${msg.sender === 'me' ? 'text-white/60' : 'text-muted-foreground'}`}>
                          <span>{msg.time}</span>
                          {msg.sender === 'me' && (
                            msg.status === 'read' ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-white">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded"><Paperclip className="w-5 h-5 text-muted-foreground" /></button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && newMessage.trim() && setNewMessage('')}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                />
                <button 
                  onClick={() => newMessage.trim() && setNewMessage('')}
                  disabled={!newMessage.trim()}
                  className="p-2.5 bg-foreground text-white hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

function ChatItem({ chat, isActive, onClick, getStatusColor }: { 
  chat: typeof conversations[0]; 
  isActive: boolean; 
  onClick: () => void;
  getStatusColor: (s: string) => string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
        isActive ? 'bg-white border-l-2 border-l-primary' : 'hover:bg-white/60 border-l-2 border-l-transparent'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${isActive ? 'bg-primary text-white' : 'bg-muted'}`}>
          {chat.user.charAt(0)}
        </div>
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor(chat.status)} rounded-full border-2 border-white`}></span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`font-medium text-sm truncate ${chat.unread > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{chat.user}</p>
          <span className="text-[10px] text-muted-foreground">{chat.time}</span>
        </div>
        <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
          {chat.lastMessage}
        </p>
      </div>
      {chat.unread > 0 && (
        <span className="bg-primary text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
          {chat.unread}
        </span>
      )}
    </button>
  );
}
