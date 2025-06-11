import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'milling_processes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['bulog', 'pasar']).notNullable()
      table.integer('quantity').notNullable()
      table.integer('number_of_sack').notNullable()
      table
        .integer('responsible_person_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('result_id')
        .unsigned()
        .references('id')
        .inTable('milling_results')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
