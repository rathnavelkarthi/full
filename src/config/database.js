// Dr. Senz Medical Platform - Database Configuration
// Neon PostgreSQL connection setup using @neondatabase/serverless

import { neon, neonConfig } from '@neondatabase/serverless'

// Environment variables - Use the actual Neon connection string
const DATABASE_URL = 'postgresql://neondb_owner:npg_7n4CDjFsvGQx@ep-polished-shape-a18x1blg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

// Debug logging
console.log('🔍 Environment check:', {
  hasEnvVar: !!import.meta.env.VITE_DATABASE_URL,
  envValue: import.meta.env.VITE_DATABASE_URL,
  usingFallback: !import.meta.env.VITE_DATABASE_URL,
  connectionString: DATABASE_URL.substring(0, 50) + '...'
})

// Configure Neon for browser environment
neonConfig.fetchConnectionCache = true
neonConfig.disableWarningInBrowsers = true

// Create Neon client for HTTP queries (best for serverless/edge)
export const sql = neon(DATABASE_URL)

// For WebSocket connections (if needed for complex transactions)
// Note: WebSocket requires Node.js environment, not suitable for browser

// Alternative: Direct PostgreSQL connection
export const getDatabaseConfig = () => {
  return {
    host: import.meta.env.VITE_DB_HOST || 'localhost',
    port: import.meta.env.VITE_DB_PORT || 5432,
    database: import.meta.env.VITE_DB_NAME || 'dr_senz_medical',
    username: import.meta.env.VITE_DB_USER || 'medical_user',
    password: import.meta.env.VITE_DB_PASSWORD || 'secure_password',
    ssl: import.meta.env.VITE_DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    connectionString: import.meta.env.VITE_DATABASE_URL
  }
}

// Database connection status
export const checkDatabaseConnection = async () => {
  try {
    // Test connection with a simple query
    const result = await sql`SELECT 1 as test_connection`
    
    return {
      connected: true,
      message: 'Database connected successfully',
      data: result
    }
  } catch (error) {
    return {
      connected: false,
      message: `Database connection failed: ${error.message}`,
      error: error
    }
  }
}

// Health check endpoint
export const healthCheck = async () => {
  try {
    const result = await sql`SELECT id FROM users LIMIT 1`
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    }
  }
}
