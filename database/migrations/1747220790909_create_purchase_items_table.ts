import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['gkg', 'gks']).notNullable()
      table.integer('quantity').notNullable()
      table.integer('number_of_sack').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.decimal('total', 10, 2).notNullable()
      table
        .integer('purchase_transaction_id')
        .unsigned()
        .references('id')
        .inTable('purchase_transactions')
        .onDelete('CASCADE')
      table.decimal('total_amount', 10, 2).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
