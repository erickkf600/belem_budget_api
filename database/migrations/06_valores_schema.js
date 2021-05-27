'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValoresSchema extends Schema {
  up () {
    this.createIfNotExists('valores', (table) => {
      table.increments()
      table.string('budget_id', 30).notNullable().references('budget_id').inTable('budgets')
      table.string('valor', 200).notNullable()
      table.string('tipo', 250).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('valores')
  }
}

module.exports = ValoresSchema
