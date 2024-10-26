
'use strict'

const Token = require('../models/tokenModel')
const User = require('../models/userModel')
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {
    login: async (req, res) => {
        const {username, email, password} = req.body;
        if(!((username || email) && password)) {
            res.errorStatusCode = 401;
            throw new Error('username / email and password are required')
        }

        const user = await User.findOne({$or: [{username}, {email}]});
        if(user?.password !== passwordEncrypt(password)) {
            res.errorStatusCode = 401;
            throw new Error('incorrect username/email or password')
        }
        if(!user.isActive) {
            res.errorStatusCode = 401;
            throw new Error('this account is not active')
        } 

        let tokenData = await Token.findOne({userId: user.id})
        if(!tokenData) {
            tokenData = await Token.create({
                userId: user.id,
                token: passwordEncrypt(user.id + Date.now()),
            })
        }
        res.send({
            error: false,
            token: tokenData.token,
            user,
        })
    },

    logout: async(req, res) => {
        const auth = req.headers?.authorization;
        const tokenKey = auth? auth.split(" ") : null;
        const result = await Token.deleteOne({ token: tokenKey});

        res.send({
            error: false,
            message: 'token is deleted. logout was ok',
            result,
        })
    }
}