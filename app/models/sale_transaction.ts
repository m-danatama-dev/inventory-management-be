import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SaleTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare buyerName: string

  @column()
  declare origin: string

  @column()
  declare responsiblePerson: string

  @column()
  declare totalAmount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
