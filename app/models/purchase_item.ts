import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PurchaseItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: 'gkg' | 'gks'

  @column()
  declare quantity: number

  @column()
  declare numberOfSack: number

  @column()
  declare price: number

  @column()
  declare total: number

  @column()
  declare purchaseTransactionId: number
}
