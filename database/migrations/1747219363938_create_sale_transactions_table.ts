import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('buyer_name').notNullable()
      table.string('origin').notNullable()
      table.enum('type', ['bulog', 'pasar', 'general']).notNullable()
      table
        .integer('responsible_person_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.decimal('total_amount', 10, 2).notNullable()
      table.enum('status', ['pending', 'done']).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
