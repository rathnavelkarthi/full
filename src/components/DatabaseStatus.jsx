// Dr. Senz Medical Platform - Database Status Component
// Shows Neon database connection status

import React, { useState, useEffect } from 'react'
import { Database, CheckCircle, XCircle, Loader, RefreshCw, AlertTriangle } from 'lucide-react'
import { useNeonDatabase } from '../hooks/useNeonDatabase.js'

const DatabaseStatus = () => {
  const { connectionStatus, checkConnection } = useNeonDatabase()
  const [lastChecked, setLastChecked] = useState(null)

  const handleRefresh = async () => {
    setLastChecked(new Date())
    await checkConnection()
  }

  const getStatusIcon = () => {
    if (connectionStatus.loading) {
      return <Loader className="w-5 h-5 animate-spin text-blue-500" />
    }
    
    if (connectionStatus.connected) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    
    return <XCircle className="w-5 h-5 text-red-500" />
  }

  const getStatusColor = () => {
    if (connectionStatus.loading) {
      return 'bg-blue-50 border-blue-200 text-blue-800'
    }
    
    if (connectionStatus.connected) {
      return 'bg-green-50 border-green-200 text-green-800'
    }
    
    return 'bg-red-50 border-red-200 text-red-800'
  }

  const getStatusText = () => {
    if (connectionStatus.loading) {
      return 'Checking connection...'
    }
    
    if (connectionStatus.connected) {
      return 'Database connected'
    }
    
    return 'Database disconnected'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 ${getStatusColor()}`}>
        <Database className="w-5 h-5" />
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium text-sm">
              {getStatusText()}
            </span>
          </div>
          
          {lastChecked && (
            <span className="text-xs opacity-75">
              Last checked: {lastChecked.toLocaleTimeString()}
            </span>
          )}
          
          {connectionStatus.error && (
            <div className="flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-xs">
                {connectionStatus.error}
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleRefresh}
          className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
          title="Refresh connection status"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default DatabaseStatus
