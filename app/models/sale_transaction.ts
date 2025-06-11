import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SaleItem from './sale_item.js'

export default class SaleTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare buyerName: string

  @column()
  declare origin: string

  @column()
  declare type: 'bulog' | 'pasar' | 'general'

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

  @hasMany(() => SaleItem)
  public items!: HasMany<typeof SaleItem>
}
