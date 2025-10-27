import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AuthModal from './components/AuthModal'
import PatientDashboard from './components/PatientDashboard'
import DoctorDashboard from './components/DoctorDashboard'
import DatabaseStatus from './components/DatabaseStatus'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Error Boundary Component for Production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo)
    // In production, send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-600 mb-6">We apologize for the inconvenience. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function AppContent() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    )
  }

  return (
    <Routes>
      <Route 
        path="/patient" 
        element={user?.type === 'patient' ? <PatientDashboard /> : <Navigate to="/doctor" />} 
      />
      <Route 
        path="/doctor" 
        element={user?.type === 'doctor' ? <DoctorDashboard /> : <Navigate to="/patient" />} 
      />
      <Route path="*" element={<Navigate to={user?.type === 'doctor' ? '/doctor' : '/patient'} />} />
    </Routes>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <AppContent />
            <DatabaseStatus />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
