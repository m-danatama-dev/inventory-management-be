import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MillingResult extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
  declare total: number
}
