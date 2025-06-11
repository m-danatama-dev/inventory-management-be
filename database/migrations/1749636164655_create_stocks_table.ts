import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.enum('type', ['bulog', 'pasar', 'general']).notNullable().unique()
      table.integer('rough_rice')
      table.integer('rice_5kg')
      table.integer('rice_10kg')
      table.integer('rice_25kg')
      table.integer('rice_50kg')
      table.integer('bran')
      table.integer('reject')
      table.integer('menir')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
