import vine from '@vinejs/vine'

export default class AuthValidator {
  static loginSchema = vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })

  static registerSchema = vine.object({
    email: vine.string().trim().email(),
    full_name: vine.string(),
    phone_number: vine.string().minLength(10).maxLength(15),
    password: vine.string().minLength(8).confirmed(),
  })

  static forgotPasswordSchema = vine.object({
    email: vine.string().trim().email(),
  })

  static resetPasswordSchema = vine.object({
    password: vine.string().minLength(8).confirmed(),
  })
}
