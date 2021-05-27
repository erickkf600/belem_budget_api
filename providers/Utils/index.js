'use strict'


class Utils {

    generateString(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
    }
    
    generateNumberString(length) {
        var result           = '';
		var characters       = '0123456789FX';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
    }

    async encryptString(str)
    {
        const safeStr = await Hash.make(str);
		return safeStr;
    }
}

module.exports = Utils