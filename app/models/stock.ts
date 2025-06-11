import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  declare type: 'bulog' | 'pasar' | 'general'

  @column()
  declare roughRice: number

  @column({ columnName: 'rice_5kg' })
  declare rice5kg: number

  @column({ columnName: 'rice_10kg' })
  declare rice10kg: number

  @column({ columnName: 'rice_25kg' })
  declare rice25kg: number

  @column({ columnName: 'rice_50kg' })
  declare rice50kg: number

  @column()
  declare bran: number

  @column()
  declare reject: number

  @column()
  declare menir: number

  @column()
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
