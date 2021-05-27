"use strict";
const Budgets = use("App/Models/Budgets");
const Materiais = use("App/Models/Materiais");
const Valores = use("App/Models/Valores");
const Clients = use("App/Models/Clients");
const Obs = use("App/Models/Obs");
const Database = use("Database");
const utils = use("Utils");

class BudgetController {
  async show(ctx) {
    let budgets = await Budgets.query()
      .with("client")
      .with("meterials")
      .with("valores")
      .with("obs")
      .fetch();

    return { res: budgets };
  }

  async store(ctx) {
    const body = ctx.request.post();

    let budgets = await new Budgets();
    await Database.transaction(async (trx) => {
      budgets.budget_id = await utils.generateString(30);
      budgets.discriminacao = body.discriminacao;
      budgets.categoria = body.tipo_projeto;
      budgets.servico = body.servico;
      budgets.prazo_entrega = body.prazo_entrega;
      budgets.validade = body.validade;
      budgets.disponibilizacao = body.disponibilizacao;
      budgets.entrada = body.entrada

      await budgets.save(trx);

      let clients = await new Clients();

      clients.budget_id = budgets.budget_id;
      clients.name = body.client.name;
      clients.telefone = body.client.telefone;
      clients.cidade = body.client.cidade;

      await clients.save(trx);

      for (const key in body.valores) {
        if (Object.hasOwnProperty.call(body.valores, key)) {
          const element = body.valores[key];

          let valores = await new Valores();

          valores.budget_id = budgets.budget_id;
          valores.valor = await element.valor.replace(/[^0-9,]/g, '');
          valores.tipo = await element.tipo;

          await valores.save(trx);
        }
      }

      for (const key in body.materiais) {
        if (Object.hasOwnProperty.call(body.materiais, key)) {
          const element = body.materiais[key];

          let materiais = await new Materiais();

          materiais.budget_id = budgets.budget_id;
          materiais.material = await element.material;

          await materiais.save(trx);
        }
      }
      for (const key in body.observation) {
        if (Object.hasOwnProperty.call(body.observation, key)) {
          const element = body.observation[key];

          let obs = await new Obs();

          obs.budget_id = budgets.budget_id;
          obs.obs = await element.obs;

          await obs.save(trx);
        }
      }
    });

    return { res: budgets };
  }

  async update(ctx) {
    const body = ctx.request.post();
    const id = ctx.params.id;
    let budgets = await Budgets.findBy('budget_id',id);

    if (!budgets){
      throw ({'code': 4, 'msg': 'Não foi possível encontrar um orçamento com o id informado'});
    }

    let data = await Database.transaction(async (trx) => {

      budgets.discriminacao = body.discriminacao;
      budgets.categoria = body.tipo_projeto;
      budgets.servico = body.servico;
      budgets.prazo_entrega = body.prazo_entrega;
      budgets.validade = body.validade;
      budgets.disponibilizacao = body.disponibilizacao;
      budgets.entrada = body.entrada

      await budgets.save(trx);

      await Valores.query()
      .where('budget_id', budgets.budget_id)
      .delete(trx)
      for (const key in body.valores) {
        if (Object.hasOwnProperty.call(body.valores, key)) {
          const element = body.valores[key];

          let valores = await new Valores();

          valores.budget_id = budgets.budget_id;
          valores.valor = await element.valor;
          valores.tipo = await element.tipo;

          await valores.save(trx);
        }
      }

      await Materiais.query()
      .where('budget_id', budgets.budget_id)
      .delete(trx)
      for (const key in body.materiais) {
        if (Object.hasOwnProperty.call(body.materiais, key)) {
          const element = body.materiais[key];

          let materiais = await new Materiais();

          materiais.budget_id = budgets.budget_id;
          materiais.material = await element.material;

          await materiais.save(trx);
        }
      }

      await Obs.query()
      .where('budget_id', budgets.budget_id)
      .delete(trx)
      for (const key in body.observation) {
        if (Object.hasOwnProperty.call(body.observation, key)) {
          const element = body.observation[key];

          let obs = await new Obs();

          obs.budget_id = budgets.budget_id;
          obs.obs = await element.obs;

          await obs.save(trx);
        }
      }
    })



    return true;
  }
}

module.exports = BudgetController;
