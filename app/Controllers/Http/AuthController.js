'use strict'
const User = use('App/Models/User')
const Database = use('Database')
class AuthController {

    async SocialAuth (ctx) {
        const body = ctx.request.post()
        const auth = ctx.auth

        let user = await User.findBy('email', body.user.email)

        if(user){
            
            let genToken = await auth.generate(user)
            return {
                'res': {
                    user: user,
                    auth: genToken
                }
            }

        }else{
            return await Database.transaction(async (trx) => {
                user = new User()

                user.name = body.user.name
                user.email = body.user.email
                user.avatar = body.user.imageUrl

                await user.save(trx)

                let userFounded = await User.query().transacting(trx).where('email',  user.email).first()

                
                let genToken = await auth.generate(userFounded)

                return {

                'res': {
                    user: userFounded,
                    auth: genToken
                }
            }

            });
        }
    }


}

module.exports = AuthController
