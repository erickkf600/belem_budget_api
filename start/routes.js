'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Routess')

Route.post('/auth/social', 'AuthController.SocialAuth')

Route.group(() => {

    Route.get('/budgets', 'BudgetController.show');
    Route.post('/add', 'BudgetController.store');
    Route.put('/update/:id', 'BudgetController.update');


}).prefix('private').middleware(['auth']);

