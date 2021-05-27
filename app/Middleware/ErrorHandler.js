'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ErrorException = use('App/Exceptions/ErrorException')

class ErrorHandler {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (ctx, next) {
    try {
      await next()
    } catch (error) {
      if (error.code == 'E_INVALID_JWT_TOKEN' || error.code == 'E_JWT_TOKEN_EXPIRED') {
        let ecode = error.code;
        error.message = null;
        error.code = 7;
        error.msg = ((ecode == 'E_INVALID_JWT_TOKEN') ? 'Credenciais inválidas. Verifique o token enviado.' : 'A sua sessão expirou! Faça o Login novamente...');
      }
      throw new ErrorException({
        message: error.message ? 'Erro Interno da API' : error.msg,
        code: error.code ? error.code : 0,
        errType: 'FengGenericError',
        details: {
            ip: ctx.request.ip(),
            dateTime: await new Date(),
            route: ctx.request.url(),
            stackTrace: error.stack
        }
    })
    }
  }
}

module.exports = ErrorHandler
