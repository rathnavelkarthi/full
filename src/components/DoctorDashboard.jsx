import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Plus,
  FileText,
  Users,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Video,
  Phone,
  Mail,
  Stethoscope,
  Heart,
  Pill,
  BarChart3,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Send,
  Clock as ClockIcon,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  Calendar as CalendarIcon,
  MessageSquare,
  FileCheck,
  UserPlus,
  Zap,
  Download,
  X
} from 'lucide-react'

function DoctorDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', time: '', type: 'call' })
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    appointmentType: 'consultation',
    date: '',
    time: '',
    duration: '30',
    notes: ''
  })
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: ''
  })
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    refills: '0',
    startDate: ''
  })
  const notificationsRef = useRef(null)
  const settingsRef = useRef(null)

  // Close dropdowns and modals when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Task management functions
  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const taskColors = {
        call: 'bg-purple-100 text-purple-800',
        review: 'bg-blue-100 text-blue-800',
        'follow-up': 'bg-green-100 text-green-800',
        report: 'bg-orange-100 text-orange-800',
        lab: 'bg-red-100 text-red-800'
      }

      const updatedTasks = [...todayTasks, {
        id: todayTasks.length + 1,
        title: newTask.title,
        time: newTask.time || 'No time set',
        type: newTask.type,
        color: taskColors[newTask.type]
      }]

      // Update the todayTasks array (in a real app, this would update state or make an API call)
      setNewTask({ title: '', time: '', type: 'call' })
      setShowAddTaskModal(false)

      // Show success message
      alert(`Task "${newTask.title}" added successfully!`)
    }
  }

  const taskTypes = [
    { value: 'call', label: 'Call', color: 'bg-purple-100 text-purple-800' },
    { value: 'review', label: 'Review', color: 'bg-blue-100 text-blue-800' },
    { value: 'follow-up', label: 'Follow-up', color: 'bg-green-100 text-green-800' },
    { value: 'report', label: 'Report', color: 'bg-orange-100 text-orange-800' },
    { value: 'lab', label: 'Lab Work', color: 'bg-red-100 text-red-800' }
  ]

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', duration: '30 min' },
    { value: 'follow-up', label: 'Follow-up Visit', duration: '15 min' },
    { value: 'check-up', label: 'Routine Check-up', duration: '20 min' },
    { value: 'urgent', label: 'Urgent Care', duration: '45 min' },
    { value: 'video', label: 'Video Consultation', duration: '30 min' }
  ]

  // Appointment management functions
  const handleScheduleAppointment = () => {
    if (newAppointment.patientName.trim() && newAppointment.date && newAppointment.time) {
      const appointmentData = {
        id: todayAppointments.length + 1,
        type: appointmentTypes.find(type => type.value === newAppointment.appointmentType)?.label || 'Consultation',
        status: 'Scheduled',
        patient: newAppointment.patientName,
        time: newAppointment.time,
        avatar: newAppointment.patientName.split(' ').map(n => n[0]).join('').toUpperCase(),
        statusColor: 'bg-purple-100 text-purple-800',
        duration: appointmentTypes.find(type => type.value === newAppointment.appointmentType)?.duration || '30 min',
        notes: newAppointment.notes
      }

      // In a real app, this would make an API call to save the appointment
      setNewAppointment({
        patientName: '',
        appointmentType: 'consultation',
        date: '',
        time: '',
        duration: '30',
        notes: ''
      })
      setShowAppointmentModal(false)

      // Show success message
      alert(`Appointment scheduled for ${newAppointment.patientName} on ${newAppointment.date} at ${newAppointment.time}`)
    }
  }

  // Patient management functions
  const handleAddPatient = () => {
    if (newPatient.firstName.trim() && newPatient.lastName.trim() && newPatient.email.trim()) {
      const patientData = {
        id: Date.now(), // Use timestamp as unique ID
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        age: newPatient.dateOfBirth ? new Date().getFullYear() - new Date(newPatient.dateOfBirth).getFullYear() : 'Not specified',
        lastVisit: 'Never',
        nextAppointment: 'Not scheduled',
        status: 'new',
        conditions: newPatient.medicalHistory ? [newPatient.medicalHistory] : [],
        priority: 'normal',
        email: newPatient.email,
        phone: newPatient.phone,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        address: newPatient.address,
        emergencyContact: newPatient.emergencyContact,
        allergies: newPatient.allergies
      }

      // In a real app, this would make an API call to save the patient
      setNewPatient({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        emergencyContact: '',
        medicalHistory: '',
        allergies: ''
      })
      setShowAddPatientModal(false)

      // Show success message
      alert(`Patient ${newPatient.firstName} ${newPatient.lastName} added successfully!`)
    }
  }

  // Prescription management functions
  const handleAddPrescription = () => {
    if (newPrescription.patientName.trim() && newPrescription.medication.trim() && newPrescription.dosage.trim()) {
      const prescriptionData = {
        id: Date.now(), // Use timestamp as unique ID
        patient: newPrescription.patientName,
        medication: newPrescription.medication,
        dosage: newPrescription.dosage,
        startDate: newPrescription.startDate || new Date().toISOString().split('T')[0],
        status: 'active',
        refills: parseInt(newPrescription.refills) || 0,
        frequency: newPrescription.frequency,
        duration: newPrescription.duration,
        instructions: newPrescription.instructions
      }

      // In a real app, this would make an API call to save the prescription
      setNewPrescription({
        patientName: '',
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        refills: '0',
        startDate: ''
      })
      setShowPrescriptionModal(false)

      // Show success message
      alert(`Prescription for ${newPrescription.medication} added for ${newPrescription.patientName}!`)
    }
  }

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
    'Before meals',
    'After meals',
    'At bedtime'
  ]

  const durationOptions = [
    '7 days',
    '14 days',
    '30 days',
    '60 days',
    '90 days',
    '180 days',
    '1 year',
    'Until further notice'
  ]

  // Mock data for demonstration
  const stats = {
    activePatients: 247,
    criticalAlerts: 3,
    admissionsToday: 2
  }

  const todayAppointments = [
    {
      id: 1,
      type: 'Routine Checkup',
      status: 'Checked In',
      patient: 'Maria Rodriguez',
      time: '09:00 AM',
      avatar: 'MR',
      statusColor: 'bg-gray-800 text-white'
    },
    {
      id: 2,
      type: 'Heart Follow-up',
      status: 'In Progress',
      patient: 'John Smith',
      time: '10:30 AM',
      avatar: 'JS',
      statusColor: 'bg-blue-600 text-white'
    },
    {
      id: 3,
      type: 'Consultation',
      status: 'Scheduled',
      patient: 'Emily Chen',
      time: '02:15 PM',
      avatar: 'EC',
      statusColor: 'bg-purple-100 text-purple-800'
    }
  ]

  const labResults = [
    {
      id: 1,
      patient: 'Maria Rodriguez',
      patientId: 'P-2024-001',
      testType: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      status: 'Critical',
      priority: 'ST',
      statusColor: 'bg-red-100 text-red-800',
      priorityColor: 'bg-red-500 text-white'
    },
    {
      id: 2,
      patient: 'John Smith',
      patientId: 'P-2024-002',
      testType: 'Lipid Panel',
      category: 'Chemistry',
      status: 'Completed',
      priority: 'RO',
      statusColor: 'bg-green-100 text-green-800',
      priorityColor: 'bg-blue-500 text-white'
    },
    {
      id: 3,
      patient: 'David Johnson',
      patientId: 'P-2024-003',
      testType: 'Thyroid Function Tests',
      category: 'Endocrinology',
      status: 'Pending',
      priority: 'RO',
      statusColor: 'bg-yellow-100 text-yellow-800',
      priorityColor: 'bg-blue-500 text-white'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      patientId: 'P-2024-004',
      testType: 'Liver Function Tests',
      category: 'Chemistry',
      status: 'Completed',
      priority: 'AS',
      statusColor: 'bg-green-100 text-green-800',
      priorityColor: 'bg-gray-500 text-white'
    }
  ]

  const todayTasks = [
    {
      id: 1,
      title: 'Call Maria Rodriguez about test results',
      time: '10:30 AM',
      type: 'call',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 2,
      title: 'Review John Smith\'s MRI scan',
      time: '10:30 AM',
      type: 'review',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      title: 'Follow up with Emily Chen prescription',
      time: '2:00 PM',
      type: 'follow-up',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      title: 'Complete weekly reports',
      time: 'End of day',
      type: 'report',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 5,
      title: 'Check lab results for Robert Johnson',
      time: '2:00 PM',
      type: 'lab',
      color: 'bg-red-100 text-red-800'
    }
  ]

  const todaySummary = [
    { label: 'Appointments', value: 8, icon: CalendarIcon },
    { label: 'Pending Results', value: 3, icon: ClockIcon },
    { label: 'New Messages', value: 2, icon: MessageSquare }
  ]

  // Patient view mock data
  const patientStats = [
    {
      title: 'Total appointments',
      value: '24',
      change: '+5%',
      period: 'Last 7 days',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Online consultations',
      value: '24',
      change: '+5%',
      period: 'Last 7 days',
      icon: Video,
      color: 'bg-blue-500'
    },
    {
      title: 'Heart rate',
      value: '87',
      unit: 'bpm',
      change: '+5%',
      period: '',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      title: 'Blood pressure',
      value: '87',
      unit: 'mmHg',
      change: '+5%',
      period: '',
      icon: Activity,
      color: 'bg-red-500'
    }
  ]

  const myDoctors = [
    {
      id: 1,
      name: 'Theresa Webb',
      specialty: 'Cardiologist',
      bookings: '20 Bookings',
      avatar: 'TW',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Dianne Russell',
      specialty: 'Cardiologist',
      bookings: '20 Bookings',
      avatar: 'DR',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Floyd Miles',
      specialty: 'Cardiologist',
      bookings: '20 Bookings',
      avatar: 'FM',
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Wade Warren',
      specialty: 'Cardiologist',
      bookings: '20 Bookings',
      avatar: 'WW',
      color: 'bg-yellow-500'
    },
    {
      id: 5,
      name: 'Esther Howard',
      specialty: 'Cardiologist',
      bookings: '20 Bookings',
      avatar: 'EH',
      color: 'bg-pink-500'
    }
  ]

  const prescriptions = [
    {
      id: 1,
      name: 'Cardiology Prescription',
      date: 'February 28, 2018',
      doctor: 'Dr. Theresa Webb',
      avatar: 'TW',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Cardiology Prescription',
      date: 'February 28, 2018',
      doctor: 'Dr. Theresa Webb',
      avatar: 'TW',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Cardiology Prescription',
      date: 'February 28, 2018',
      doctor: 'Dr. Theresa Webb',
      avatar: 'TW',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Cardiology Prescription',
      date: 'February 28, 2018',
      doctor: 'Dr. Theresa Webb',
      avatar: 'TW',
      color: 'bg-purple-500'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment with Primary Care Physician',
      date: '24 Mar 2025, 10:55 AM',
      status: 'completed',
      color: 'bg-green-500'
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Appointment with Primary Care Physician',
      date: '24 Mar 2025, 10:55 AM',
      status: 'completed',
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Appointment with Primary Care Physician',
      date: '24 Mar 2025, 10:55 AM',
      status: 'pending',
      color: 'bg-blue-500'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Appointment with Primary Care Physician',
      date: '24 Mar 2025, 10:55 AM',
      status: 'completed',
      color: 'bg-green-500'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Appointment with Primary Care Physician',
      date: '24 Mar 2025, 10:55 AM',
      status: 'completed',
      color: 'bg-green-500'
    }
  ]

  const vitalInfo = [
    { label: 'Height', value: '169', unit: 'cm', icon: User, color: 'bg-blue-500' },
    { label: 'Weight', value: '140', unit: 'lbs', icon: Activity, color: 'bg-blue-500' },
    { label: 'Pulse', value: '97%', unit: '', icon: Heart, color: 'bg-red-500' },
    { label: 'BMI', value: '16.9', unit: 'kg/m²', icon: Activity, color: 'bg-blue-500' },
    { label: 'Temperature', value: '100°', unit: '', icon: Activity, color: 'bg-orange-500' }
  ]

  const departmentData = [
    { department: 'Cardiology', value: 85, color: 'bg-blue-500' },
    { department: 'Consultation', value: 45, color: 'bg-green-500' },
    { department: 'Urology', value: 25, color: 'bg-purple-500' }
  ]

  const recentTransactions = [
    {
      id: 1,
      doctor: 'Dianne Russell',
      specialty: 'Cardiologist',
      amount: '$400',
      type: 'Consultation fees',
      status: 'Success',
      avatar: 'DR',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      doctor: 'Dianne Russell',
      specialty: 'Cardiologist',
      amount: '$400',
      type: 'Consultation fees',
      status: 'Failed',
      avatar: 'DR',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      doctor: 'Dianne Russell',
      specialty: 'Cardiologist',
      amount: '$400',
      type: 'Consultation fees',
      status: 'Success',
      avatar: 'DR',
      color: 'bg-blue-500'
    }
  ]

  const renderOverview = () => (
    <div className="flex-1 flex">
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doctor's Dashboard</h1>
              <p className="text-gray-600">Welcome back, Dr. {user?.name?.split(' ')[1] || 'Senz'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-gray-600 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">D</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${appointment.statusColor} flex items-center justify-center`}>
                      <span className="text-sm font-medium">{appointment.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Opening details for ${appointment.patient} appointment`)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{appointment.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Patients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activePatients}</p>
                <p className="text-sm text-green-600">+12 from yesterday</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-600">{stats.criticalAlerts}</p>
                <p className="text-sm text-red-600">+2 from yesterday</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Admissions Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.admissionsToday}</p>
                <p className="text-sm text-gray-600">-2 from yesterday</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Results Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Lab Results</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search results..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-48"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>All Status</option>
                  <option>Critical</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>All Priority</option>
                  <option>ST</option>
                  <option>RO</option>
                  <option>AS</option>
                </select>
                <button
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Filter results"
                  onClick={() => alert('Filter functionality would be implemented here')}
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="More options"
                  onClick={() => alert('More options dropdown would be implemented here')}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{result.patient}</div>
                          <div className="text-sm text-gray-500">{result.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.testType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${result.statusColor}`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${result.priorityColor}`}>
                        {result.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Today's Tasks */}
      <div className="w-80 p-6 bg-white border-l border-gray-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
              Pending
            </span>
          </div>

          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => alert(`Opening task: ${task.title}`)}
              >
                <div className={`w-2 h-2 rounded-full ${task.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-600">{task.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
            onClick={() => setShowAddTaskModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Task
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <p className="text-lg font-bold text-primary-900">12</p>
              <p className="text-xs text-primary-600">Consultations</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-900">98%</p>
              <p className="text-xs text-green-600">Satisfaction</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-900">24</p>
              <p className="text-xs text-blue-600">Messages</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-900">5</p>
              <p className="text-xs text-purple-600">Urgent</p>
            </div>
          </div>
        </div>

        {/* Today's Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Today's Summary</h3>
          <div className="bg-gray-900 text-white rounded-lg p-4">
            <div className="space-y-3">
              {todaySummary.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppointments = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage your scheduled appointments and consultations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todayAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${appointment.statusColor} flex items-center justify-center`}>
                  <span className="text-sm font-medium">{appointment.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{appointment.type}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}>
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule New Appointment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setShowAppointmentModal(true)}
            >
              <Plus className="w-5 h-5 mr-2 text-primary-600" />
              Add Patient Appointment
            </button>
            <button
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                setNewAppointment(prev => ({ ...prev, appointmentType: 'video' }))
                setShowAppointmentModal(true)
              }}
            >
              <Video className="w-5 h-5 mr-2 text-primary-600" />
              Schedule Video Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPatients = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Management</h1>
            <p className="text-gray-600">Manage your patients and their medical records</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowAddPatientModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Patient
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Patients</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-48"
                />
              </div>
              <button
                className="btn-secondary"
                onClick={() => alert('Patient filter options would open here')}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Smith</div>
                      <div className="text-sm text-gray-500">P-2024-001</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-10</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      title="View patient details"
                      onClick={() => alert('Patient details modal would open here')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      title="Edit patient information"
                      onClick={() => alert('Edit patient modal would open here')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">P-2024-002</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">32</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-08</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      title="View patient details"
                      onClick={() => alert('Patient details modal would open here')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      title="Edit patient information"
                      onClick={() => alert('Edit patient modal would open here')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPrescriptions = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Prescriptions</h1>
            <p className="text-gray-600">Manage patient prescriptions and medications</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowPrescriptionModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Lisinopril 10mg</h3>
          <p className="text-sm text-gray-600 mb-2">John Smith</p>
          <p className="text-xs text-gray-500">Once daily • 2 refills left</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Metformin 500mg</h3>
          <p className="text-sm text-gray-600 mb-2">Sarah Johnson</p>
          <p className="text-xs text-gray-500">Twice daily • 3 refills left</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Pending</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Atorvastatin 20mg</h3>
          <p className="text-sm text-gray-600 mb-2">Mike Chen</p>
          <p className="text-xs text-gray-500">Once daily • Awaiting approval</p>
        </div>
      </div>
    </div>
  )

  const renderLabResults = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lab Results</h1>
            <p className="text-gray-600">Review and manage patient lab results</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="btn-secondary"
              onClick={() => alert('Filter options would open here')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button
              className="btn-secondary"
              onClick={() => alert('Export functionality would start here')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Results</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search results..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-48"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>All Status</option>
                <option>Critical</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {labResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{result.patient}</div>
                        <div className="text-sm text-gray-500">{result.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.testType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${result.statusColor}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${result.priorityColor}`}>
                      {result.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-primary-600 hover:text-primary-900"
                        title="View lab result details"
                        onClick={() => alert('Lab result details modal would open here')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Download lab results"
                        onClick={() => alert('Lab results download would start here')}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={user?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <input
                type="text"
                value="Cardiology"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input
                type="text"
                value="MD-2024-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive appointment reminders and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive urgent alerts via text message</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="btn-primary"
            onClick={() => alert('Settings would be saved here')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar Navigation */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MediCare</span>
          </div>
        </div>

        <nav className="px-4 pb-6">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              My Appointments
              <span className="ml-auto bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">5</span>
            </button>

            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'patients'
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Patients
              <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">12</span>
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'prescriptions'
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Pill className="w-5 h-5 mr-3" />
              Prescriptions
            </button>

            <button
              onClick={() => setActiveTab('lab-results')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'lab-results'
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Lab Results
              <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">3</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </div>
        </nav>

        <div className="px-4 pb-6">
          <div className="bg-gray-900 text-white rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Today's Summary</h3>
            <div className="space-y-3">
              {todaySummary.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-gray-600 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        onClick={() => alert('Opening critical lab result details for Maria Rodriguez')}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Critical Lab Result</p>
                            <p className="text-sm text-gray-600">Maria Rodriguez - CBC Results require immediate attention</p>
                            <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        onClick={() => alert('Opening appointment details for John Smith')}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New Appointment</p>
                            <p className="text-sm text-gray-600">John Smith scheduled for tomorrow 10:30 AM</p>
                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => alert('Opening prescription refill request for Sarah Johnson')}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Prescription Refill</p>
                            <p className="text-sm text-gray-600">Sarah Johnson requested refill for Metformin</p>
                            <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button
                        className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
                        onClick={() => {
                          setShowNotifications(false)
                          alert('Opening full notifications page')
                        }}
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-5 h-5" />
                </button>

                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setShowSettings(false)
                          alert('Opening profile settings')
                        }}
                      >
                        Profile Settings
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setShowSettings(false)
                          alert('Opening account preferences')
                        }}
                      >
                        Account Preferences
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setShowSettings(false)
                          alert('Opening notification settings')
                        }}
                      >
                        Notification Settings
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setShowSettings(false)
                          alert('Opening privacy & security settings')
                        }}
                      >
                        Privacy & Security
                      </button>
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setShowSettings(false)
                            logout()
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Dr. {user?.name?.split(' ')[1] || 'Sarah Johnson'}</p>
                  <p className="text-xs text-gray-500">Cardiologist</p>
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">D</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="flex-1 bg-primary-50/30">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'patients' && renderPatients()}
          {activeTab === 'prescriptions' && renderPrescriptions()}
          {activeTab === 'lab-results' && renderLabResults()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>

      {/* Add Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">New Prescription</h2>
              <button
                onClick={() => setShowPrescriptionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    value={newPrescription.patientName}
                    onChange={(e) => setNewPrescription({ ...newPrescription, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter patient name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={newPrescription.startDate}
                    onChange={(e) => setNewPrescription({ ...newPrescription, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medication *
                </label>
                <input
                  type="text"
                  value={newPrescription.medication}
                  onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter medication name..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 10mg, 1 tablet..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={newPrescription.frequency}
                    onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select frequency...</option>
                    {frequencyOptions.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select duration...</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refills
                  </label>
                  <select
                    value={newPrescription.refills}
                    onChange={(e) => setNewPrescription({ ...newPrescription, refills: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="0">0 refills</option>
                    <option value="1">1 refill</option>
                    <option value="2">2 refills</option>
                    <option value="3">3 refills</option>
                    <option value="5">5 refills</option>
                    <option value="10">10 refills</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter special instructions or notes..."
                  rows="3"
                />
              </div>

              <div className="flex space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowPrescriptionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPrescription}
                  disabled={!newPrescription.patientName.trim() || !newPrescription.medication.trim() || !newPrescription.dosage.trim()}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Create Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={newPatient.firstName}
                    onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter first name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={newPatient.lastName}
                    onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter last name..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="patient@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select gender...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter full address..."
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={newPatient.emergencyContact}
                  onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Name and phone number..."
                />
              </div>

              {/* Medical Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical History / Conditions
                  </label>
                  <textarea
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="List any existing medical conditions..."
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <textarea
                    value={newPatient.allergies}
                    onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="List any known allergies..."
                    rows="2"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowAddPatientModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPatient}
                  disabled={!newPatient.firstName.trim() || !newPatient.lastName.trim() || !newPatient.email.trim()}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Appointment</h2>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter patient name..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Type
                </label>
                <select
                  value={newAppointment.appointmentType}
                  onChange={(e) => setNewAppointment({ ...newAppointment, appointmentType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {appointmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Additional notes or special instructions..."
                  rows="3"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleAppointment}
                  disabled={!newAppointment.patientName.trim() || !newAppointment.date || !newAppointment.time}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter task description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 10:30 AM or End of day"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Type
                </label>
                <select
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {taskTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim()}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard



