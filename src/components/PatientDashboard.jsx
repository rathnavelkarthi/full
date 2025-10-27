import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Plus,
  FileText,
  Download,
  Pill,
  Activity,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Video,
  Heart,
  Thermometer,
  Scale,
  Ruler,
  Users,
  Stethoscope,
  Eye,
  Edit3,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  Circle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react'

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12" role="status" aria-label="Loading patient dashboard">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-slate-600 font-medium">Loading your health dashboard...</span>
  </div>
)

// Error Component
const ErrorBoundary = ({ error, resetError }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center" role="alert">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertCircle className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-lg font-bold text-red-900 mb-2">Something went wrong</h3>
    <p className="text-red-700 mb-4">{error?.message || 'An unexpected error occurred while loading your dashboard.'}</p>
    <button
      onClick={resetError}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
      aria-label="Try loading the dashboard again"
    >
      Try Again
    </button>
  </div>
)

function PatientDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // Simulate API loading time

    return () => clearTimeout(timer)
  }, [])

  // Error simulation for testing
  const simulateError = () => {
    setError(new Error('Failed to load dashboard data'))
  }

  const resetError = () => {
    setError(null)
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  // Button handlers
  const handleNotifications = () => {
    setShowNotifications(!showNotifications)
    console.log('Notifications clicked')
    // TODO: Implement notifications dropdown/modal
    console.log('🔔 Notifications panel would open here!')
  }

  const handleSettings = () => {
    setShowSettings(!showSettings)
    console.log('Settings clicked')
    // TODO: Implement settings modal or navigation
    console.log('⚙️ Settings panel would open here!')
  }

  const handleBookAppointment = () => {
    console.log('Book Appointment clicked')
    // TODO: Navigate to appointment booking or open modal
    console.log('📅 Appointment booking modal would open here!')
    // For now, just show a success message in console
    console.log('✅ Appointment booking feature ready for implementation!')
  }

  const handleViewRecords = () => {
    console.log('View Records clicked')
    // TODO: Navigate to medical records page
    console.log('📋 Medical records would open here!')
    console.log('✅ Medical records feature ready for implementation!')
  }

  const handleAddDoctor = () => {
    console.log('Add Doctor clicked')
    // TODO: Open add doctor modal
    console.log('👨‍⚕️ Add doctor modal would open here!')
    console.log('✅ Add doctor feature ready for implementation!')
  }

  const handleUpdateVitals = () => {
    console.log('Update Vitals clicked')
    // TODO: Open vitals update form
    console.log('❤️ Update vitals form would open here!')
    console.log('✅ Update vitals feature ready for implementation!')
  }

  const handleDoctorCardClick = (doctorName) => {
    console.log(`Doctor card clicked: ${doctorName}`)
    // TODO: Open doctor contact modal or profile
    console.log(`📞 Contact ${doctorName} modal would open here!`)
    console.log(`✅ Contact ${doctorName} feature ready for implementation!`)
  }

  const handleActivityClick = (activity) => {
    console.log(`Activity clicked: ${activity}`)
    // TODO: Open activity details modal
    console.log(`📝 ${activity} details would open here!`)
    console.log(`✅ Activity details feature ready for implementation!`)
  }

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`)
    // TODO: Implement quick action functionality
    console.log(`🚀 ${action} would be executed here!`)
    console.log(`✅ ${action} feature ready for implementation!`)
  }

  if (error) {
    return <ErrorBoundary error={error} resetError={resetError} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  // Enhanced mock data for modern dashboard
  const stats = {
    totalAppointments: 24,
    onlineConsultations: 24,
    heartRate: 87,
    bloodPressure: 87,
    heartRateChange: 5,
    bloodPressureChange: -5
  }

  const doctors = [
    {
      id: 1,
      name: 'Theresa Webb',
      specialty: 'Cardiologist',
      bookings: 20,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      status: 'available'
    },
    {
      id: 2,
      name: 'Dianne Russell',
      specialty: 'Cardiologist',
      bookings: 20,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      status: 'available'
    },
    {
      id: 3,
      name: 'Floyd Miles',
      specialty: 'Cardiologist',
      bookings: 20,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'available'
    },
    {
      id: 4,
      name: 'Wade Warren',
      specialty: 'Cardiologist',
      bookings: 20,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'available'
    },
    {
      id: 5,
      name: 'Esther Howard',
      specialty: 'Cardiologist',
      bookings: 20,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      status: 'available'
    }
  ]

  const vitalSigns = [
    {
      id: 1,
      name: 'Height',
      value: '169 cm',
      icon: Ruler,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Weight',
      value: '140 lbs',
      icon: Scale,
      color: 'bg-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      name: 'Pulse',
      value: '97%',
      icon: Heart,
      color: 'bg-red-500',
      bgColor: 'bg-red-100'
    },
    {
      id: 4,
      name: 'BMI',
      value: '16.9 kg/m²',
      icon: Activity,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      name: 'Temperature',
      value: '100°',
      icon: Thermometer,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-100',
      alert: true
    }
  ]

  const departmentData = [
    { name: 'Cardiology', value: 85, color: 'bg-blue-500' },
    { name: 'Neurology', value: 65, color: 'bg-green-500' },
    { name: 'Urology', value: 45, color: 'bg-purple-500' },
    { name: 'Orthopedics', value: 25, color: 'bg-orange-500' }
  ]

  const recentTransactions = [
    {
      id: 1,
      doctor: 'Dianne Russell',
      specialty: 'Cardiologist',
      amount: 100,
      type: 'Consultation fees',
      status: 'Success',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      doctor: 'Dianne Russell',
      specialty: 'Cardiologist',
      amount: 100,
      type: 'Consultation fees',
      status: 'Failed',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      doctor: 'Dianne Russell',
      specialty: 'Cardiologist',
      amount: 100,
      type: 'Consultation fees',
      status: 'Success',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Appointment with Primary Care Physician',
      time: '24 Mar 2025, 10:55 AM',
      type: 'appointment',
      status: 'completed'
    },
    {
      id: 2,
      action: 'Appointment with Primary Care Physician',
      time: '24 Mar 2025, 10:55 AM',
      type: 'appointment',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Appointment with Primary Care Physician',
      time: '24 Mar 2025, 10:55 AM',
      type: 'appointment',
      status: 'completed'
    },
    {
      id: 4,
      action: 'Appointment with Primary Care Physician',
      time: '24 Mar 2025, 10:55 AM',
      type: 'appointment',
      status: 'completed'
    }
  ]


  const renderOverview = () => (
    <div className="space-y-8">
      {/* Modern Dashboard Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Patient Dashboard
              </h1>
              <p className="text-slate-600 text-lg">Welcome back, {user?.name}! Here's your comprehensive health overview.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
              aria-label="Book a new medical appointment"
              role="button"
              tabIndex={0}
              onClick={handleBookAppointment}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log('Book Appointment activated via keyboard');
                  alert('Appointment booking feature would open here! 📅');
                }
              }}
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              Book Appointment
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              className="bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
              aria-label="View medical records and history"
              role="button"
              tabIndex={0}
              onClick={handleViewRecords}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log('View Records activated via keyboard');
                }
              }}
            >
              View Records
            </button>
          </div>
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{5}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">Total Appointments</p>
            <p className="text-3xl font-bold text-slate-900">{stats.totalAppointments}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-lg transition-all duration-300 hover:border-emerald-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-300">
              <Video className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{5}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">Online Consultations</p>
            <p className="text-3xl font-bold text-slate-900">{stats.onlineConsultations}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{stats.heartRateChange}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-sm font-medium text-slate-600">Heart Rate</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900">{stats.heartRate}</p>
            <span className="text-lg text-slate-500 font-medium">bpm</span>
          </div>
          {/* Enhanced Mini Chart */}
          <div className="mt-4 h-8 flex items-end space-x-1 justify-center">
            <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 h-4 rounded-t opacity-80"></div>
            <div className="w-1.5 bg-gradient-to-t from-green-300 to-green-400 h-6 rounded-t opacity-90"></div>
            <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 h-5 rounded-t"></div>
            <div className="w-1.5 bg-gradient-to-t from-green-500 to-green-600 h-7 rounded-t"></div>
            <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 h-5 rounded-t"></div>
            <div className="w-1.5 bg-gradient-to-t from-green-300 to-green-400 h-4 rounded-t opacity-80"></div>
            <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 h-6 rounded-t opacity-90"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-lg transition-all duration-300 hover:border-red-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-right">
              <div className="flex items-center text-red-600 text-sm font-semibold bg-red-50 px-2 py-1 rounded-lg">
                <TrendingDown className="w-3 h-3 mr-1" />
                {stats.bloodPressureChange}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-sm font-medium text-slate-600">Blood Pressure</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900">{stats.bloodPressure}</p>
            <span className="text-lg text-slate-500 font-medium">mmHg</span>
          </div>
          {/* Enhanced Mini Chart */}
          <div className="mt-4 h-8 flex items-end space-x-1 justify-center">
            <div className="w-1.5 bg-gradient-to-t from-red-300 to-red-400 h-5 rounded-t opacity-80"></div>
            <div className="w-1.5 bg-gradient-to-t from-red-400 to-red-500 h-7 rounded-t opacity-90"></div>
            <div className="w-1.5 bg-gradient-to-t from-red-500 to-red-600 h-6 rounded-t"></div>
            <div className="w-1.5 bg-gradient-to-t from-red-400 to-red-500 h-4 rounded-t opacity-80"></div>
            <div className="w-1.5 bg-gradient-to-t from-red-300 to-red-400 h-5 rounded-t opacity-70"></div>
            <div className="w-1.5 bg-gradient-to-t from-red-500 to-red-600 h-8 rounded-t"></div>
            <div className="w-1.5 bg-gradient-to-t from-red-400 to-red-500 h-6 rounded-t opacity-90"></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Doctors and Vital Signs */}
        <div className="xl:col-span-2 space-y-8">
          {/* My Doctors Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">My Healthcare Team</h3>
              </div>
              <button
                onClick={handleAddDoctor}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Add a new healthcare provider"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddDoctor();
                  }
                }}
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Add Doctor
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200/60 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                  onClick={() => handleDoctorCardClick(doctor.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDoctorCardClick(doctor.name);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Contact ${doctor.name}, ${doctor.specialty}`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg group-hover:ring-blue-100 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{doctor.name}</h4>
                      <p className="text-blue-600 font-medium text-sm mb-3">{doctor.specialty}</p>
                      <div className="flex items-center justify-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 font-medium">{doctor.bookings} Appointments</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vital Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Vital Signs</h3>
              </div>
              <button
                onClick={handleUpdateVitals}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Update vital signs measurements"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleUpdateVitals();
                  }
                }}
              >
                <Edit3 className="w-4 h-4" aria-hidden="true" />
                Update Vitals
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {vitalSigns.map((vital) => {
                const Icon = vital.icon
                return (
                  <div key={vital.id} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200/60 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center">
                    <div className={`w-16 h-16 ${vital.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${vital.alert ? 'ring-2 ring-orange-300' : ''}`}>
                      <Icon className={`w-8 h-8 ${vital.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-2">{vital.name}</h4>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{vital.value}</p>
                    {vital.alert && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-2"></div>
                        <span className="text-xs text-orange-600 font-medium">Above Normal</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Consultation by Department */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Consultations by Department</h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-slate-700">This Week</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div className="space-y-6">
              {departmentData.map((dept, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{dept.name}</span>
                    <span className="text-lg font-bold text-slate-900">{dept.value}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${dept.color} relative`}
                        style={{ width: `${dept.value}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity and Transactions */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="group flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/60 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                  onClick={() => handleActivityClick(activity.action)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleActivityClick(activity.action);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${activity.action} on ${activity.time}`}
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-200">
                      <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-emerald-500' : index === 2 ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-base mb-1 group-hover:text-blue-700 transition-colors duration-200">
                      {activity.action}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Payment History</h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-slate-700">This Week</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/60 hover:border-purple-300 hover:shadow-md transition-all duration-200">
                  <div className="relative">
                    <img
                      src={transaction.avatar}
                      alt={transaction.doctor}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm group-hover:ring-purple-100 transition-all duration-200"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      transaction.status === 'Success'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gradient-to-r from-red-400 to-red-500'
                    }`}>
                      {transaction.status === 'Success' ? (
                        <Check className="w-2.5 h-2.5 text-white" />
                      ) : (
                        <X className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-base mb-1 group-hover:text-purple-700 transition-colors duration-200">
                      {transaction.doctor}
                    </h4>
                    <p className="text-sm text-purple-600 font-medium mb-1">{transaction.specialty}</p>
                    <p className="text-xs text-slate-500">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 mb-1">${transaction.amount}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'Success'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                        : 'bg-gradient-to-r from-red-50 to-red-50 text-red-700 border border-red-200'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => handleQuickAction('Schedule Appointment')}
                className="w-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-200 flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Schedule a new appointment"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuickAction('Schedule Appointment');
                  }
                }}
              >
                <Calendar className="w-5 h-5 group-hover:text-blue-600" aria-hidden="true" />
                Schedule Appointment
              </button>
              <button
                onClick={() => handleQuickAction('View Test Results')}
                className="w-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-200 flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="View medical test results"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuickAction('View Test Results');
                  }
                }}
              >
                <FileText className="w-5 h-5 group-hover:text-blue-600" aria-hidden="true" />
                View Test Results
              </button>
              <button
                onClick={() => handleQuickAction('Request Prescription')}
                className="w-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-200 flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Request prescription refill"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuickAction('Request Prescription');
                  }
                }}
              >
                <Pill className="w-5 h-5 group-hover:text-blue-600" aria-hidden="true" />
                Request Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Modern Healthcare Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Dr. Senz Medical
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative group focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                title="View notifications (3 unread)"
                aria-label="Notifications - 3 unread messages"
                role="button"
                tabIndex={0}
                onClick={handleNotifications}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNotifications();
                  }
                }}
              >
                <Bell className="w-5 h-5" aria-hidden="true" />
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full text-xs flex items-center justify-center"
                  aria-label="3 unread notifications"
                >
                  <span className="text-white text-[8px] font-bold">3</span>
                </span>
                <div className="absolute inset-0 rounded-lg bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                title="Account settings and preferences"
                aria-label="Account settings"
                role="button"
                tabIndex={0}
                onClick={handleSettings}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSettings();
                  }
                }}
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500 font-medium">Patient Portal</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50"
                  title="Sign out of your account"
                  aria-label="Sign out"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      logout();
                    }
                  }}
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderOverview()}
      </div>
    </div>
  )
}

export default PatientDashboard

