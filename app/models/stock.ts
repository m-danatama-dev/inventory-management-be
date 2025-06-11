import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  declare type: 'bulog' | 'pasar' | 'general'

  @column()
  declare roughRice: number

  @column()
  declare rice5Kg: number

  @column()
  declare rice10Kg: number

  @column()
  declare rice25Kg: number

  @column()
  declare rice50Kg: number

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
