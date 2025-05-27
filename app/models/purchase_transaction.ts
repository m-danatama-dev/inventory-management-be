import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PurchaseItem from './purchase_item.js'

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

  @column()
  declare status: 'pending' | 'done'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => PurchaseItem)
  public items!: HasMany<typeof PurchaseItem>
}
