// Dr. Senz Medical Platform - Neon Database Service
// Local development service for Neon PostgreSQL

import { sql, checkDatabaseConnection, healthCheck } from '../config/database.js'

// User Management
export const userService = {
  // Get all users
  async getUsers() {
    try {
      const data = await sql`SELECT * FROM users ORDER BY created_at DESC`
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create new user
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update user
  async updateUser(id, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Delete user
  async deleteUser(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Patient Management
export const patientService = {
  // Get all patients
  async getPatients() {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          users:user_id (
            id,
            name,
            email,
            phone,
            user_type
          )
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get patient by ID
  async getPatientById(id) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          users:user_id (
            id,
            name,
            email,
            phone,
            user_type
          )
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create new patient
  async createPatient(patientData) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([patientData])
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Doctor Management
export const doctorService = {
  // Get all doctors
  async getDoctors() {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          users:user_id (
            id,
            name,
            email,
            phone,
            user_type
          )
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get doctor by ID
  async getDoctorById(id) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          users:user_id (
            id,
            name,
            email,
            phone,
            user_type
          )
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Appointment Management
export const appointmentService = {
  // Get all appointments
  async getAppointments() {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patients:patient_id (
            id,
            users:user_id (
              name,
              email
            )
          ),
          doctors:doctor_id (
            id,
            specialty,
            users:user_id (
              name,
              email
            )
          )
        `)
        .order('appointment_date', { ascending: true })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create new appointment
  async createAppointment(appointmentData) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Vital Signs Management
export const vitalSignsService = {
  // Get vital signs for a patient
  async getVitalSigns(patientId) {
    try {
      const { data, error } = await supabase
        .from('vital_signs')
        .select('*')
        .eq('patient_id', patientId)
        .order('recorded_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Record new vital signs
  async recordVitalSigns(vitalData) {
    try {
      const { data, error } = await supabase
        .from('vital_signs')
        .insert([vitalData])
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Notifications Management
export const notificationService = {
  // Get notifications for a user
  async getNotifications(userId) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Database utilities
export const dbUtils = {
  checkConnection: checkDatabaseConnection,
  healthCheck: healthCheck,
  
  // Test database connection
  async testConnection() {
    console.log('🔍 Testing Neon database connection...')
    const result = await checkDatabaseConnection()
    
    if (result.connected) {
      console.log('✅ Database connected successfully!')
      console.log('📊 Connection details:', result.data)
    } else {
      console.log('❌ Database connection failed!')
      console.log('🔧 Error:', result.message)
    }
    
    return result
  }
}
