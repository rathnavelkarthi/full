import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { X, Eye, EyeOff, User, Mail, Lock, Phone, Heart, Stethoscope, Apple, Chrome } from 'lucide-react'

function AuthModal() {
  const { showAuthModal, closeAuthModal, login, demoCredentials } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState('patient')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      const result = login(formData.email, formData.password)
      if (!result.success) {
        setError(result.error)
      }
    } else {
      // For demo purposes, we'll just show a success message
      alert('Account created successfully! Please use the demo credentials to login.')
      setIsLogin(true)
    }
  }

  const fillDemoCredentials = () => {
    const credentials = demoCredentials[userType]
    setFormData({
      email: credentials.email,
      password: credentials.password,
      name: credentials.name || '',
      phone: credentials.phone || ''
    })
  }

  if (!showAuthModal) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Dr. Senz Medical</h1>
            <p className="text-blue-100 text-lg">Welcome Back!</p>
            <p className="text-blue-200/80 text-sm mt-1">We Are Happy To See You Again</p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-white/10 rounded-2xl p-1 mb-8 backdrop-blur-sm">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-blue-100 mb-3">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('patient')}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                  userType === 'patient'
                    ? 'border-blue-400 bg-blue-500/20 text-white shadow-lg'
                    : 'border-white/20 bg-white/5 text-blue-200 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <span className="font-medium">Patient</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('doctor')}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                  userType === 'doctor'
                    ? 'border-blue-400 bg-blue-500/20 text-white shadow-lg'
                    : 'border-white/20 bg-white/5 text-blue-200 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <Stethoscope className="w-6 h-6 mx-auto mb-2" />
                <span className="font-medium">Doctor</span>
              </button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-blue-100 mb-2">
              Demo Credentials
            </h3>
            <div className="text-sm text-blue-200 mb-3 space-y-1">
              <p><strong className="text-blue-100">Email:</strong> {demoCredentials[userType].email}</p>
              <p><strong className="text-blue-100">Password:</strong> {demoCredentials[userType].password}</p>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-sm text-blue-300 hover:text-blue-100 font-medium transition-colors duration-200 underline"
            >
              Fill Demo Credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-400 focus:ring-2"
                />
                <span className="ml-2 text-sm text-blue-100">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-300 hover:text-blue-100 font-medium transition-colors duration-200"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-2xl backdrop-blur-sm">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="px-4 text-sm text-blue-200/60 font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 hover:border-white/20">
              <Apple className="w-5 h-5" />
              Log in with Apple
            </button>
            <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 hover:border-white/30">
              <Chrome className="w-5 h-5" />
              Log in with Google
            </button>
          </div>

          {/* Sign up/Sign in toggle */}
          <div className="mt-8 text-center">
            <p className="text-blue-200/80">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-300 hover:text-blue-100 font-semibold transition-colors duration-200 underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-100 hover:text-white hover:bg-white/20 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default AuthModal
