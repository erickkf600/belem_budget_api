'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MateriaisSchema extends Schema {
  up () {
    this.create('materiais', (table) => {
      table.increments()
      table.string('budget_id', 30).notNullable().references('budget_id').inTable('budgets')
      table.string('material', 500).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('materiais')
  }
}

module.exports = MateriaisSchema
