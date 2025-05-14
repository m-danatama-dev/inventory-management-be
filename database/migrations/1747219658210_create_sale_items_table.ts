import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('quantity').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.decimal('total', 10, 2).notNullable()
      table
        .integer('sale_transaction_id')
        .unsigned()
        .references('id')
        .inTable('sale_transactions')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
