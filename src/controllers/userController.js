
'use strict'

const User = require('../models/userModel')

module.exports = {
    list: async(req, res) => {
        const data = await res.getModelList(User)
        
        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(User),
            data,
        })
    }
}