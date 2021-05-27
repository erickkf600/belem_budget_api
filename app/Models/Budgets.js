"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Budgets extends Model {
  static get table() {
    return "budgets";
  }
  static get primaryKey() {
    return "budget_id";
  }

  meterials() {
    // hasMany(relatedModel, primaryKey, foreignKey)
    return this.hasMany("App/Models/Materiais", "budget_id", "budget_id");
  }
  valores() {
    return this.hasMany("App/Models/Valores", "budget_id", "budget_id");
  }

  obs() {
    return this.hasMany("App/Models/Obs", "budget_id", "budget_id");
  }
  client() {
    return this.hasOne("App/Models/Clients", "budget_id", "budget_id");
  }
}

module.exports = Budgets;
