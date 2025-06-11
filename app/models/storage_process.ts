import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class StorageProcess extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quantity: number

  @column()
  declare numberOfSack: number

  @column()
  declare responsiblePersonID: string

  @column()
  declare type: 'bulog' | 'pasar'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
