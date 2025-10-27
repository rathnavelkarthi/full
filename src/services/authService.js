import { sql } from '../config/database.js'
import bcrypt from 'bcryptjs'

class AuthService {
  // Hash password
  async hashPassword(password) {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  // Verify password
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }

  // Register new user
  async register(userData) {
    try {
      const { email, password, type, name, phone, credentials, experience, specializations } = userData

      // Check if user already exists
      const existingUser = await sql`
        SELECT id FROM users WHERE email = ${email}
      `

      if (existingUser.length > 0) {
        return { success: false, error: 'User already exists with this email' }
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password)

      // Insert new user
      const newUser = await sql`
        INSERT INTO users (email, password_hash, type, name, phone, created_at, updated_at)
        VALUES (${email}, ${hashedPassword}, ${type}, ${name}, ${phone || null}, NOW(), NOW())
        RETURNING id, email, type, name, phone, created_at
      `

      const userId = newUser[0].id

      // If doctor, add doctor-specific data
      if (type === 'doctor' && credentials) {
        await sql`
          INSERT INTO doctors (user_id, credentials, experience, specializations, created_at, updated_at)
          VALUES (${userId}, ${credentials}, ${experience || null}, ${JSON.stringify(specializations || [])}, NOW(), NOW())
        `
      }

      // If patient, add patient-specific data
      if (type === 'patient') {
        await sql`
          INSERT INTO patients (user_id, age, created_at, updated_at)
          VALUES (${userId}, ${userData.age || null}, NOW(), NOW())
        `
      }

      return { 
        success: true, 
        user: {
          id: newUser[0].id,
          email: newUser[0].email,
          type: newUser[0].type,
          name: newUser[0].name,
          phone: newUser[0].phone,
          created_at: newUser[0].created_at
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    }
  }

  // Login user
  async login(email, password) {
    try {
      // Get user with password hash
      const users = await sql`
        SELECT u.id, u.email, u.password_hash, u.type, u.name, u.phone, u.created_at,
               d.credentials, d.experience, d.specializations,
               p.age
        FROM users u
        LEFT JOIN doctors d ON u.id = d.user_id
        LEFT JOIN patients p ON u.id = p.user_id
        WHERE u.email = ${email}
      `

      if (users.length === 0) {
        return { success: false, error: 'Invalid email or password' }
      }

      const user = users[0]

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Prepare user data for frontend
      const userData = {
        id: user.id,
        email: user.email,
        type: user.type,
        name: user.name,
        phone: user.phone,
        created_at: user.created_at
      }

      // Add type-specific data
      if (user.type === 'doctor') {
        userData.credentials = user.credentials
        userData.experience = user.experience
        userData.specializations = user.specializations || []
      } else if (user.type === 'patient') {
        userData.age = user.age
      }

      return { success: true, user: userData }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const users = await sql`
        SELECT u.id, u.email, u.type, u.name, u.phone, u.created_at,
               d.credentials, d.experience, d.specializations,
               p.age
        FROM users u
        LEFT JOIN doctors d ON u.id = d.user_id
        LEFT JOIN patients p ON u.id = p.user_id
        WHERE u.id = ${userId}
      `

      if (users.length === 0) {
        return { success: false, error: 'User not found' }
      }

      const user = users[0]
      const userData = {
        id: user.id,
        email: user.email,
        type: user.type,
        name: user.name,
        phone: user.phone,
        created_at: user.created_at
      }

      // Add type-specific data
      if (user.type === 'doctor') {
        userData.credentials = user.credentials
        userData.experience = user.experience
        userData.specializations = user.specializations || []
      } else if (user.type === 'patient') {
        userData.age = user.age
      }

      return { success: true, user: userData }
    } catch (error) {
      console.error('Get user error:', error)
      return { success: false, error: 'Failed to get user data' }
    }
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const { name, phone, credentials, experience, specializations, age } = updateData

      // Update basic user info
      await sql`
        UPDATE users 
        SET name = ${name}, phone = ${phone}, updated_at = NOW()
        WHERE id = ${userId}
      `

      // Update type-specific data
      if (updateData.type === 'doctor') {
        await sql`
          UPDATE doctors 
          SET credentials = ${credentials}, experience = ${experience}, 
              specializations = ${JSON.stringify(specializations || [])}, updated_at = NOW()
          WHERE user_id = ${userId}
        `
      } else if (updateData.type === 'patient') {
        await sql`
          UPDATE patients 
          SET age = ${age}, updated_at = NOW()
          WHERE user_id = ${userId}
        `
      }

      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, error: 'Failed to update profile' }
    }
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Get current password hash
      const users = await sql`
        SELECT password_hash FROM users WHERE id = ${userId}
      `

      if (users.length === 0) {
        return { success: false, error: 'User not found' }
      }

      // Verify current password
      const isValidPassword = await this.verifyPassword(currentPassword, users[0].password_hash)
      if (!isValidPassword) {
        return { success: false, error: 'Current password is incorrect' }
      }

      // Hash new password
      const hashedNewPassword = await this.hashPassword(newPassword)

      // Update password
      await sql`
        UPDATE users 
        SET password_hash = ${hashedNewPassword}, updated_at = NOW()
        WHERE id = ${userId}
      `

      return { success: true }
    } catch (error) {
      console.error('Change password error:', error)
      return { success: false, error: 'Failed to change password' }
    }
  }

  // Delete user account
  async deleteAccount(userId) {
    try {
      // Delete from related tables first (due to foreign key constraints)
      await sql`DELETE FROM doctors WHERE user_id = ${userId}`
      await sql`DELETE FROM patients WHERE user_id = ${userId}`
      await sql`DELETE FROM users WHERE id = ${userId}`

      return { success: true }
    } catch (error) {
      console.error('Delete account error:', error)
      return { success: false, error: 'Failed to delete account' }
    }
  }
}

export default new AuthService()
