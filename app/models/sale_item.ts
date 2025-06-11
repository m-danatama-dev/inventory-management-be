import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SaleItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: 'rice5Kg' | 'rice10Kg' | 'rice25Kg' | 'rice50Kg' | 'bran' | 'reject' | 'menir'

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare total: number

  @column()
  declare saleTransactionId: number
}
