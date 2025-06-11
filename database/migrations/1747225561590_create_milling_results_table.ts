import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'milling_results'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rice_5kg').nullable()
      table.integer('rice_10kg').nullable()
      table.integer('rice_25kg').nullable()
      table.integer('rice_50kg').nullable()
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
