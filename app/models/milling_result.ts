import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MillingResult extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
  declare total: number
}
