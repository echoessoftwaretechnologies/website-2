import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, X, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Meeting {
    id: string;
    title: string;
    type: string;
    participants: string;
    date: string;
    time: string;
}

const MeetingArrangement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // February 2026
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        participants: '',
        time: ''
    });

    const [meetings, setMeetings] = useState<Meeting[]>([
        {
            id: '1',
            title: 'Project Kickoff Meeting',
            type: 'team',
            participants: 'John, Sarah, Mike',
            date: '5/2/2026',
            time: '10:00'
        },
        {
            id: '2',
            title: 'Client Presentation',
            type: 'client',
            participants: 'Tech Solutions Team',
            date: '8/2/2026',
            time: '14:30'
        }
    ]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate) {
            setNotification({ type: 'error', message: 'Please select a date!' });
            return;
        }

        const newMeeting: Meeting = {
            id: Date.now().toString(),
            ...formData,
            date: `${selectedDate}/${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`
        };

        setMeetings([...meetings, newMeeting]);
        setFormData({ title: '', type: '', participants: '', time: '' });
        setSelectedDate(null);
        setNotification({ type: 'success', message: 'Meeting scheduled successfully!' });
    };

    const handleDelete = (id: string) => {
        setMeetings(meetings.filter(m => m.id !== id));
        setNotification({ type: 'success', message: 'Meeting deleted successfully!' });
    };

    const getMeetingTypeColor = (type: string) => {
        const colors: { [key: string]: string } = {
            'team': 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
            'client': 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400',
            'review': 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400',
            'planning': 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
        };
        return colors[type] || 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60';
    };

    const getMeetingTypeIcon = (type: string) => {
        const icons: { [key: string]: string } = {
            'team': '👥',
            'client': '🤝',
            'review': '📋',
            'planning': '📅'
        };
        return icons[type] || '📌';
    };

    return (
        <AdminLayout title="Meeting Arrangement" subtitle="Schedule Intelligence">
            <div className={`space-y-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg animate-slide-in-right ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        <p className="font-bold">{notification.message}</p>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-black tracking-tight">Meeting Arrangement</h2>
                </div>

                {/* Meeting Form */}
                <div className="bg-white dark:bg-white/[0.03] rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg p-8">
                    <h3 className="text-2xl font-black mb-8 dark:text-white">Schedule a New Meeting</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Meeting Title and Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-white/70 mb-2">
                                    Meeting Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter meeting title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-white/70 mb-2">
                                    Meeting Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all cursor-pointer"
                                    required
                                >
                                    <option value="" className="dark:bg-navy-900">Select meeting type</option>
                                    <option value="team" className="dark:bg-navy-900">Team Meeting</option>
                                    <option value="client" className="dark:bg-navy-900">Client Meeting</option>
                                    <option value="review" className="dark:bg-navy-900">Review Meeting</option>
                                    <option value="planning" className="dark:bg-navy-900">Planning Meeting</option>
                                </select>
                            </div>
                        </div>

                        {/* Participants */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-white/70 mb-2">
                                Participants <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type participant names or emails..."
                                value={formData.participants}
                                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all"
                                required
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Separate multiple participants with commas</p>
                        </div>

                        {/* Calendar */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-white/70 mb-2">
                                Select Date <span className="text-red-500">*</span>
                            </label>
                            <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-600 dark:text-white"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <h4 className="text-lg font-black dark:text-white">{monthName}</h4>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-600 dark:text-white"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2">
                                    {/* Day Headers */}
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Empty cells for days before month starts */}
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square" />
                                    ))}

                                    {/* Calendar days */}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const isSelected = selectedDate === day;
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => setSelectedDate(day)}
                                                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${isSelected
                                                    ? 'bg-brand-blue-600 text-white shadow-lg'
                                                    : 'bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-700 dark:text-white'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-white/70 mb-2">
                                Select Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                        >
                            Schedule Meeting
                        </button>
                    </form>
                </div>

                {/* Upcoming Meetings */}
                <div className="bg-white dark:bg-white/[0.03] rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black dark:text-white">Upcoming Meetings</h3>
                            <p className="text-[10px] md:text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Operational Node Scheduling</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-gray-50 dark:bg-white/5 border border-navy-100 dark:border-white/5 rounded-2xl p-1">
                                <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-gray-200 rounded-xl transition-all"><ChevronLeft className="w-5 h-5 text-navy-600 dark:text-navy-400" /></button>
                                <div className="px-4 py-2 text-xs font-black text-navy-950 dark:text-white uppercase tracking-widest flex items-center">{monthName}</div>
                                <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-gray-200 rounded-xl transition-all"><ChevronRight className="w-5 h-5 text-navy-600 dark:text-navy-400" /></button>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 md:p-8">
                        {meetings.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📅</div>
                                <p className="text-gray-500 font-semibold text-lg">No upcoming meetings</p>
                                <p className="text-sm text-gray-400 mt-2">Schedule your first meeting using the form above</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {meetings.map((meeting) => (
                                    <div key={meeting.id} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300 relative group">
                                        <button
                                            onClick={() => handleDelete(meeting.id)}
                                            className="absolute top-4 right-4 p-2 bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete meeting"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-brand-blue-100 dark:bg-brand-blue-500/20 rounded-xl flex items-center justify-center text-2xl">
                                                {getMeetingTypeIcon(meeting.type)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-gray-900 dark:text-white text-lg">{meeting.title}</h4>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${getMeetingTypeColor(meeting.type)}`}>
                                                    {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span className="font-semibold">{meeting.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-semibold">{meeting.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Users className="w-4 h-4" />
                                                <span className="font-semibold">{meeting.participants}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default MeetingArrangement;
