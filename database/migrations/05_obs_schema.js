'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObsSchema extends Schema {
  up () {
    this.create('obs', (table) => {
      table.increments()
      table.string('budget_id', 30).notNullable().references('budget_id').inTable('budgets')
      table.text('obs').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('obs')
  }
}

module.exports = ObsSchema
