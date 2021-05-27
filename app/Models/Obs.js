"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Obs extends Model {
  obs() {
    return this.belongsTo("App/Models/Budgets");
  }
  static get primaryKey() {
    return false;
  }
}

module.exports = Obs;
