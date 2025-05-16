import { DateTime } from 'luxon'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import VerifyEmailNotification from '#mails/verify_email_notification'
import ResetPasswordNotification from '#mails/reset_password_notification'

export default class AuthService {
  static async login(data: any) {
    try {
      const user = await User.verifyCredentials(data.email, data.password)
      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })

      if (!token.value!.release()) {
        throw new Error('Invalid email or password.')
      }

      return token.value!.release()
    } catch (error) {
      throw new Error('Invalid email or password.')
    }
  }

  static async register(data: any) {
    try {
      if (await User.query().where('email', data.email).first()) {
        throw new Error('The email has already been taken.')
      }

      const user = await User.create({
        email: data.email,
        password: data.password,
        fullName: data.full_name,
        phoneNumber: data.phone_number,
      })
      await mail.send(new VerifyEmailNotification(user))

      return user
    } catch (error) {
      throw new Error('Registration failed: ' + error.message)
    }
  }

  static async verifyEmail(user: any) {
    try {
      if (!user.emailVerifiedAt) {
        user.emailVerifiedAt = DateTime.utc()
        await user.save()
      }

      return user
    } catch (error) {
      throw new Error('Email verification failed: ' + error.message)
    }
  }

  static async forgotPassword(email: string) {
    try {
      const user = await User.findBy('email', email)
      if (!user) {
        throw new Error("We can't find a user with that e-mail address.")
      }

      await mail.send(new ResetPasswordNotification(user))
      return true
    } catch (error) {
      throw new Error('Failed to send password reset email: ' + error.message)
    }
  }

  static async resetPassword(user: any, newPassword: string) {
    try {
      user.password = newPassword
      await user.save()
      return true
    } catch (error) {
      throw new Error('Failed to reset password: ' + error.message)
    }
  }
}
