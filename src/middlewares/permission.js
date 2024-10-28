
'use strict';

module.exports = {
    isLogin: (req, res, next) => {
        if(req.user && req.user.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('no permission: you must login')
        }
    }
}