'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BudgetsSchema extends Schema {
  up () {
    this.create('budgets', (table) => {
      table.string('budget_id', 30).primary()
      table.string('discriminacao', 150)
      table.string('categoria', 150)
      table.string('servico')
      table.integer('prazo_entrega')
      table.integer('validade')
      table.string('disponibilizacao')
      table.string('entrada', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('budgets')
  }
}

module.exports = BudgetsSchema
