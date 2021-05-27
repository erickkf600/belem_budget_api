"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Valores extends Model {
  valores() {
    return this.belongsTo("App/Models/Budgets");
  }
  static get primaryKey() {
    return false;
  }
}

module.exports = Valores;
