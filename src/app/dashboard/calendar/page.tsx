"use client"

import { useState, useEffect } from "react"

// Types for calendar events
interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: 'maintenance' | 'inspection' | 'meeting' | 'reminder' | 'deadline' | 'other'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assetId?: number
  assetName?: string
  attendees?: string[]
  location?: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress'
  createdBy: string
  createdAt: string
  reminder?: {
    enabled: boolean
    time: string // e.g., "15 minutes before", "1 hour before", "1 day before"
  }
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [showEventModal, setShowEventModal] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([])
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all'
  })
  
  // Team members data (would normally come from API/database)
  const [teamMembers] = useState([
    { id: '1', name: 'John Adebayo', email: 'john.adebayo@lasg.gov.ng', role: 'Asset Manager', department: 'Ministry of Works', avatar: 'JA' },
    { id: '2', name: 'Sarah Okafor', email: 'sarah.okafor@lasg.gov.ng', role: 'Maintenance Supervisor', department: 'Ministry of Health', avatar: 'SO' },
    { id: '3', name: 'Michael Tunde', email: 'michael.tunde@lasg.gov.ng', role: 'Infrastructure Engineer', department: 'Ministry of Works', avatar: 'MT' },
    { id: '4', name: 'Fatima Bello', email: 'fatima.bello@lasg.gov.ng', role: 'Project Coordinator', department: 'Lagos State Government', avatar: 'FB' },
    { id: '5', name: 'David Ogundimu', email: 'david.ogundimu@lasg.gov.ng', role: 'Financial Analyst', department: 'Ministry of Finance', avatar: 'DO' },
    { id: '6', name: 'Aisha Lawal', email: 'aisha.lawal@lasg.gov.ng', role: 'Safety Inspector', department: 'Ministry of Environment', avatar: 'AL' },
    { id: '7', name: 'Emmanuel Ogbonna', email: 'emmanuel.ogbonna@lasg.gov.ng', role: 'Technical Lead', department: 'Ministry of Transportation', avatar: 'EO' },
    { id: '8', name: 'Blessing Adeyemi', email: 'blessing.adeyemi@lasg.gov.ng', role: 'Operations Manager', department: 'Ministry of Health', avatar: 'BA' },
    { id: '9', name: 'Ibrahim Musa', email: 'ibrahim.musa@lasg.gov.ng', role: 'Security Coordinator', department: 'Lagos State Security Trust Fund', avatar: 'IM' },
    { id: '10', name: 'Grace Nneka', email: 'grace.nneka@lasg.gov.ng', role: 'Administrative Officer', department: 'Lagos State Government', avatar: 'GN' }
  ])

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'other' as CalendarEvent['type'],
    priority: 'medium' as CalendarEvent['priority'],
    assetId: '',
    assetName: '',
    attendees: [] as string[], // Changed to store team member IDs
    location: '',
    reminder: {
      enabled: false,
      time: '15 minutes before'
    }
  })

  // Team member selection state
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const [teamSearchQuery, setTeamSearchQuery] = useState('')

  // Sample events data
  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Quarterly Asset Inspection',
        description: 'Comprehensive inspection of all healthcare facilities in Lagos State',
        date: '2025-09-15',
        time: '09:00',
        type: 'inspection',
        priority: 'high',
        assetId: 1,
        assetName: 'Lagos State General Hospital Main Building',
        attendees: ['1', '2', '3'], // Team member IDs
        location: 'Ikeja, Lagos State',
        status: 'scheduled',
        createdBy: 'Admin User',
        createdAt: '2025-09-01',
        reminder: { enabled: true, time: '1 day before' }
      },
      {
        id: '2',
        title: 'HVAC System Maintenance',
        description: 'Routine maintenance of heating, ventilation, and air conditioning systems',
        date: '2025-09-10',
        time: '08:00',
        type: 'maintenance',
        priority: 'medium',
        assetId: 8,
        assetName: 'Lagos State Secretariat Complex',
        attendees: ['7'], // Technical Lead
        location: 'Alausa, Ikeja',
        status: 'scheduled',
        createdBy: 'Maintenance Manager',
        createdAt: '2025-08-28',
        reminder: { enabled: true, time: '2 hours before' }
      },
      {
        id: '3',
        title: 'Budget Review Meeting',
        description: 'Annual budget review for asset management and maintenance',
        date: '2025-09-08',
        time: '14:00',
        type: 'meeting',
        priority: 'high',
        attendees: ['5', '1', '4'], // Finance Director, Asset Manager, Project Coordinator
        location: 'Conference Room A, Secretariat',
        status: 'scheduled',
        createdBy: 'Finance Director',
        createdAt: '2025-08-25',
        reminder: { enabled: true, time: '30 minutes before' }
      },
      {
        id: '4',
        title: 'Emergency Generator Test',
        description: 'Monthly test of backup power systems',
        date: '2025-09-05',
        time: '06:00',
        type: 'maintenance',
        priority: 'critical',
        assetId: 2,
        assetName: 'Lagos State University Teaching Hospital',
        attendees: ['3', '7'], // Infrastructure Engineer, Technical Lead
        location: 'Ikeja, Lagos State',
        status: 'completed',
        createdBy: 'Facilities Manager',
        createdAt: '2025-08-20',
        reminder: { enabled: true, time: '1 hour before' }
      },
      {
        id: '5',
        title: 'Bridge Safety Inspection Due',
        description: 'Mandatory annual safety inspection for Third Mainland Bridge',
        date: '2025-09-20',
        time: '07:00',
        type: 'inspection',
        priority: 'critical',
        assetId: 11,
        assetName: 'Third Mainland Bridge',
        attendees: ['3', '6'], // Infrastructure Engineer, Safety Inspector
        location: 'Third Mainland Bridge',
        status: 'scheduled',
        createdBy: 'Infrastructure Manager',
        createdAt: '2025-08-30',
        reminder: { enabled: true, time: '3 days before' }
      },
      {
        id: '6',
        title: 'Asset Audit Deadline',
        description: 'Final deadline for Q3 asset audit submissions',
        date: '2025-09-30',
        time: '17:00',
        type: 'deadline',
        priority: 'high',
        attendees: ['1', '2', '3', '4', '5'], // Department heads and managers
        location: 'Various',
        status: 'scheduled',
        createdBy: 'Audit Team',
        createdAt: '2025-09-01',
        reminder: { enabled: true, time: '1 week before' }
      }
    ]
    setEvents(sampleEvents)
    setFilteredEvents(sampleEvents)
  }, [])

  // Filter events based on selected filters
  useEffect(() => {
    let filtered = events
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(event => event.type === filters.type)
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(event => event.priority === filters.priority)
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(event => event.status === filters.status)
    }
    
    setFilteredEvents(filtered)
  }, [events, filters])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return filteredEvents.filter(event => event.date === dateString)
  }

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date))
    }
    
    return days
  }

  // Handle month navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  // Helper functions for team members
  const getTeamMemberById = (id: string) => {
    return teamMembers.find(member => member.id === id)
  }

  const getTeamMembersByIds = (ids: string[]) => {
    return ids.map(id => getTeamMemberById(id)).filter(Boolean)
  }

  const getFilteredTeamMembers = () => {
    if (!teamSearchQuery.trim()) return teamMembers
    const query = teamSearchQuery.toLowerCase()
    return teamMembers.filter(member => 
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query)
    )
  }

  const handleAddTeamMember = (memberId: string) => {
    if (!newEvent.attendees.includes(memberId)) {
      setNewEvent(prev => ({
        ...prev,
        attendees: [...prev.attendees, memberId]
      }))
    }
  }

  const handleRemoveTeamMember = (memberId: string) => {
    setNewEvent(prev => ({
      ...prev,
      attendees: prev.attendees.filter(id => id !== memberId)
    }))
  }

  // Handle adding new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      priority: newEvent.priority,
      assetId: newEvent.assetId ? parseInt(newEvent.assetId) : undefined,
      assetName: newEvent.assetName || undefined,
      attendees: newEvent.attendees, // Now contains team member IDs
      location: newEvent.location || undefined,
      status: 'scheduled',
      createdBy: 'Admin User',
      createdAt: new Date().toLocaleDateString('en-GB'),
      reminder: newEvent.reminder
    }

    setEvents(prev => [...prev, event])
    setShowEventModal(false)
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'other',
      priority: 'medium',
      assetId: '',
      assetName: '',
      attendees: [],
      location: '',
      reminder: {
        enabled: false,
        time: '15 minutes before'
      }
    })
    setTeamSearchQuery('')
    setShowTeamSelector(false)
  }

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  // Get priority color
  const getPriorityColor = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Get type color
  const getTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance': return 'bg-blue-100 text-blue-800'
      case 'inspection': return 'bg-purple-100 text-purple-800'
      case 'meeting': return 'bg-indigo-100 text-indigo-800'
      case 'reminder': return 'bg-cyan-100 text-cyan-800'
      case 'deadline': return 'bg-red-100 text-red-800'
      case 'other': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const today = new Date()
  const calendarDays = getCalendarDays()

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage schedules, reminders, and asset-related events</p>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            {/* Calendar Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                    const isToday = date.toDateString() === today.toDateString()
                    const dayEvents = getEventsForDate(date)
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[80px] p-1 border border-gray-100 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          !isCurrentMonth ? 'opacity-40' : ''
                        } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                        }`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventClick(event)
                              }}
                              className={`text-xs px-1 py-0.5 rounded truncate ${getTypeColor(event.type)} hover:opacity-80 transition-opacity`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inspection">Inspection</option>
                    <option value="meeting">Meeting</option>
                    <option value="reminder">Reminder</option>
                    <option value="deadline">Deadline</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredEvents
                  .filter(event => new Date(event.date + 'T' + event.time) >= new Date())
                  .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
                  .slice(0, 10)
                  .map(event => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <div className="flex items-center space-x-2">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(event.date).toLocaleDateString('en-GB')} at {event.time}</span>
                        </div>
                        {event.assetName && (
                          <div className="flex items-center space-x-2">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{event.assetName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Events</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{filteredEvents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredEvents.filter(event => {
                      const eventDate = new Date(event.date)
                      const weekStart = new Date()
                      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
                      const weekEnd = new Date(weekStart)
                      weekEnd.setDate(weekEnd.getDate() + 6)
                      return eventDate >= weekStart && eventDate <= weekEnd
                    }).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Critical Priority</span>
                  <span className="font-semibold text-red-600">
                    {filteredEvents.filter(event => event.priority === 'critical').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Overdue</span>
                  <span className="font-semibold text-red-600">
                    {filteredEvents.filter(event => 
                      new Date(event.date + 'T' + event.time) < new Date() && event.status === 'scheduled'
                    ).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Event</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as CalendarEvent['type'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="other">Other</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inspection">Inspection</option>
                    <option value="meeting">Meeting</option>
                    <option value="reminder">Reminder</option>
                    <option value="deadline">Deadline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={newEvent.priority}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, priority: e.target.value as CalendarEvent['priority'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Event location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Event description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Related Asset ID
                  </label>
                  <input
                    type="number"
                    value={newEvent.assetId}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, assetId: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Asset ID (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    value={newEvent.assetName}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, assetName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Asset name (optional)"
                  />
                </div>
              </div>

              {/* Team Members Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Invite Team Members
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowTeamSelector(!showTeamSelector)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      {showTeamSelector ? 'Hide' : 'Add Members'}
                    </button>
                  </div>

                  {/* Selected Team Members */}
                  {newEvent.attendees.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {getTeamMembersByIds(newEvent.attendees).map((member) => (
                          <div key={member.id} className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {member.avatar}
                            </div>
                            <span className="text-sm text-blue-800 dark:text-blue-200">{member.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTeamMember(member.id)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Member Selector */}
                  {showTeamSelector && (
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Search team members..."
                          value={teamSearchQuery}
                          onChange={(e) => setTeamSearchQuery(e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {getFilteredTeamMembers().map((member) => {
                          const isSelected = newEvent.attendees.includes(member.id)
                          return (
                            <div
                              key={member.id}
                              onClick={() => isSelected ? handleRemoveTeamMember(member.id) : handleAddTeamMember(member.id)}
                              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                              }`}
                            >
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {member.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{member.role} • {member.department}</div>
                              </div>
                              {isSelected && (
                                <div className="text-blue-600 dark:text-blue-400">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reminder Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={newEvent.reminder.enabled}
                    onChange={(e) => setNewEvent(prev => ({
                      ...prev,
                      reminder: { ...prev.reminder, enabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="reminder" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Reminder
                  </label>
                </div>

                {newEvent.reminder.enabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reminder Time
                    </label>
                    <select
                      value={newEvent.reminder.time}
                      onChange={(e) => setNewEvent(prev => ({
                        ...prev,
                        reminder: { ...prev.reminder, time: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="15 minutes before">15 minutes before</option>
                      <option value="30 minutes before">30 minutes before</option>
                      <option value="1 hour before">1 hour before</option>
                      <option value="2 hours before">2 hours before</option>
                      <option value="1 day before">1 day before</option>
                      <option value="3 days before">3 days before</option>
                      <option value="1 week before">1 week before</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedEvent.title}</h3>
              <button
                onClick={() => setShowEventDetails(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedEvent.priority)}`}>
                  {selectedEvent.priority} Priority
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedEvent.status === 'completed' ? 'bg-green-100 text-green-800' :
                  selectedEvent.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  selectedEvent.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedEvent.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Date & Time</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(selectedEvent.date).toLocaleDateString('en-GB', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at {selectedEvent.time}
                  </p>
                </div>

                {selectedEvent.location && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedEvent.location}</p>
                  </div>
                )}

                {selectedEvent.assetName && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Related Asset</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedEvent.assetName} (ID: {selectedEvent.assetId})
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Created By</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedEvent.createdBy} on {selectedEvent.createdAt}
                  </p>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Team Members ({selectedEvent.attendees.length})</h4>
                  <div className="space-y-2">
                    {getTeamMembersByIds(selectedEvent.attendees).map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                              {member.role}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {member.email} • {member.department}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Invited</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.reminder?.enabled && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Reminder</h4>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 1H5a2 2 0 00-2 2v4a2 2 0 002 2h4m0-6v6m0-6h6m-6 0l5 5m-5-5v5" />
                    </svg>
                    <span>Remind {selectedEvent.reminder.time}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowEventDetails(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Close
                </button>
                {selectedEvent.assetId && (
                  <button
                    onClick={() => window.open(`/dashboard/assets/${selectedEvent.assetId}`, '_blank')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    View Asset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
