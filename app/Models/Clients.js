"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Clients extends Model {
  clients() {
    return this.belongsTo("App/Models/Budgets");
  }
  static get primaryKey() {
    return false;
  }
}

module.exports = Clients;
