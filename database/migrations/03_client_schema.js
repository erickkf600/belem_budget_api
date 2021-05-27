'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('budget_id', 30).notNullable().references('budget_id').inTable('budgets')
      table.string('name', 100)
      table.string('telefone', 100)
      table.string('cidade', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
