import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DryingProcess extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: 'bulog' | 'pasar'

  @column()
  declare quantity: number

  @column()
  declare numberOfSack: number

  @column()
  declare responsiblePersonID: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
