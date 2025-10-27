import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Demo credentials
  const demoCredentials = {
    doctor: {
      email: 'doctor@drsenz.com',
      password: 'doctor123',
      type: 'doctor',
      name: 'Dr. Sarah Senz',
      credentials: 'MD, Internal Medicine',
      experience: '15+ years',
      specializations: ['Internal Medicine', 'Preventive Care', 'Chronic Disease Management']
    },
    patient: {
      email: 'patient@example.com',
      password: 'patient123',
      type: 'patient',
      name: 'John Smith',
      age: 35,
      phone: '+1 (555) 123-4567'
    }
  }

  const login = (email, password) => {
    // Check demo credentials
    for (const [type, credentials] of Object.entries(demoCredentials)) {
      if (credentials.email === email && credentials.password === password) {
        setUser(credentials)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(credentials))
        setShowAuthModal(false)
        return { success: true, user: credentials }
      }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const openAuthModal = () => {
    setShowAuthModal(true)
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
  }

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const value = {
    user,
    isAuthenticated,
    showAuthModal,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    demoCredentials
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
