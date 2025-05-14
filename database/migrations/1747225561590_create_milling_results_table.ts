import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'milling_results'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rice5Kg').nullable()
      table.integer('rice10Kg').nullable()
      table.integer('rice25Kg').nullable()
      table.integer('rice50Kg').nullable()
      table.integer('bran').notNullable()
      table.integer('reject').notNullable()
      table.integer('menir').notNullable()
      table.integer('total').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
