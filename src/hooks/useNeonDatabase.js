// Dr. Senz Medical Platform - Neon Database Hook
// React hook for database operations

import { useState, useEffect } from 'react'
import { dbUtils, userService, patientService, doctorService, appointmentService, vitalSignsService, notificationService } from '../services/neonService.js'

export const useNeonDatabase = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    loading: true,
    error: null
  })

  // Check database connection on mount
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, loading: true }))
    
    try {
      const result = await dbUtils.testConnection()
      setConnectionStatus({
        connected: result.connected,
        loading: false,
        error: result.connected ? null : result.message
      })
    } catch (error) {
      setConnectionStatus({
        connected: false,
        loading: false,
        error: error.message
      })
    }
  }

  return {
    connectionStatus,
    checkConnection,
    userService,
    patientService,
    doctorService,
    appointmentService,
    vitalSignsService,
    notificationService
  }
}

// Hook for user management
export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await userService.getUsers()
      if (result.success) {
        setUsers(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await userService.createUser(userData)
      if (result.success) {
        setUsers(prev => [result.data, ...prev])
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser
  }
}

// Hook for patients
export const usePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPatients = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await patientService.getPatients()
      if (result.success) {
        setPatients(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createPatient = async (patientData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await patientService.createPatient(patientData)
      if (result.success) {
        setPatients(prev => [result.data, ...prev])
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient
  }
}

// Hook for doctors
export const useDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDoctors = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await doctorService.getDoctors()
      if (result.success) {
        setDoctors(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  return {
    doctors,
    loading,
    error,
    fetchDoctors
  }
}

// Hook for appointments
export const useAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await appointmentService.getAppointments()
      if (result.success) {
        setAppointments(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await appointmentService.createAppointment(appointmentData)
      if (result.success) {
        setAppointments(prev => [result.data, ...prev])
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment
  }
}

// Hook for vital signs
export const useVitalSigns = (patientId) => {
  const [vitalSigns, setVitalSigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchVitalSigns = async () => {
    if (!patientId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await vitalSignsService.getVitalSigns(patientId)
      if (result.success) {
        setVitalSigns(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const recordVitalSigns = async (vitalData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await vitalSignsService.recordVitalSigns(vitalData)
      if (result.success) {
        setVitalSigns(prev => [result.data, ...prev])
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVitalSigns()
  }, [patientId])

  return {
    vitalSigns,
    loading,
    error,
    fetchVitalSigns,
    recordVitalSigns
  }
}

// Hook for notifications
export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNotifications = async () => {
    if (!userId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await notificationService.getNotifications(userId)
      if (result.success) {
        setNotifications(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await notificationService.markAsRead(notificationId)
      if (result.success) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId 
              ? { ...notif, is_read: true }
              : notif
          )
        )
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [userId])

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    markAsRead
  }
}
