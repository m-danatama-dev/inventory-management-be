import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .enu('name', ['rice_5kg', 'rice_10kg', 'rice_25kg', 'rice_50kg', 'bran', 'reject', 'menir'])
        .notNullable()
      table.integer('quantity').notNullable()
      table.integer('price').notNullable()
      table.integer('total').notNullable()
      table
        .integer('sale_transaction_id')
        .unsigned()
        .references('id')
        .inTable('sale_transactions')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
