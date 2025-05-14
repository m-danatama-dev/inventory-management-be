import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PurchaseTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare supplierName: string

  @column()
  declare origin: string

  @column()
  declare responsiblePersonID: string

  @column()
  declare totalAmount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
