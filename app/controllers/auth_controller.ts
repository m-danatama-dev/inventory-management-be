import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import AuthValidator from '#validators/auth'
import AuthService from '#services/auth_service'
import messagesProvider from '#helpers/validation_messages_provider'
import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const data = await vine
      .compile(AuthValidator.loginSchema)
      .validate(request.all(), { messagesProvider })

    try {
      const token = await AuthService.login(data)
      return response.ok({
        success: true,
        message: 'Login successful.',
        data: token,
      })
    } catch (error) {
      return response.unprocessableEntity({
        success: false,
        message: error.message,
      })
    }
  }

  async register({ request, response }: HttpContext) {
    const data = await vine
      .compile(AuthValidator.registerSchema)
      .validate(request.all(), { messagesProvider })

    try {
      await AuthService.register(data)
      return response.ok({
        success: true,
        message: 'Please check your email inbox (and spam) for an access link.',
      })
    } catch (error) {
      return response.unprocessableEntity({
        success: false,
        message: error.message,
      })
    }
  }

  async user({ auth, response }: HttpContext) {
    try {
      return response.ok({
        success: true,
        message: 'User retrieved successfully.',
        user: auth.user,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to retrieve user.',
        error: error.message,
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await User.accessTokens.delete(auth.user!, auth.user!.currentAccessToken.identifier)
      return response.ok({
        success: true,
        message: 'Logged out successfully.',
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Logout failed.',
        error: error.message,
      })
    }
  }

  async verifyEmail({ params, request, response }: HttpContext) {
    try {
      if (!request.hasValidSignature()) {
        return response.unprocessableEntity({
          success: false,
          message: 'Invalid verification link.',
        })
      }

      const email = decodeURIComponent(params.email)
      const user = await User.query().where('id', params.id).where('email', email).first()

      if (!user) {
        return response.unprocessableEntity({
          success: false,
          message: 'Invalid verification link.',
        })
      }

      await AuthService.verifyEmail(user)

      return response.ok({
        success: true,
        message: 'Email verified successfully.',
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }

  async resendVerificationEmail({ auth, response }: HttpContext) {
    if (auth.user!.emailVerifiedAt) {
      return response.unprocessableEntity({
        success: false,
        message: 'Your email is already verified.',
      })
    }

    try {
      await mail.send(new VerifyEmailNotification(auth.user!))
      return response.ok({
        success: true,
        message: 'Verification email sent successfully.',
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Failed to resend verification email.',
        error: error.message,
      })
    }
  }

  async forgotPassword({ request, response }: HttpContext) {
    const data = await vine
      .compile(AuthValidator.forgotPasswordSchema)
      .validate(request.all(), { messagesProvider })

    try {
      await AuthService.forgotPassword(data.email)
      return response.ok({
        success: true,
        message: 'Please check your email inbox (and spam) for a password reset link.',
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }

  async resetPassword({ params, request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.unprocessableEntity({
        success: false,
        message: 'Invalid reset password link.',
      })
    }

    const data = await vine
      .compile(AuthValidator.resetPasswordSchema)
      .validate(request.all(), { messagesProvider })

    const user = await User.find(params.id)
    if (!user || encodeURIComponent(user.password) !== params.token) {
      return response.unprocessableEntity({
        success: false,
        message: 'Invalid reset password link.',
      })
    }

    try {
      await AuthService.resetPassword(user, data.password)
      return response.ok({
        success: true,
        message: 'Password reset successfully.',
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }
}
