
'use strict'

const Pizza = require('../models/pizzaModel')

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Pizza, {}, "toppingIds")
        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Pizza),
            data,
        })
    },

    create: async (req, res) => {
        let {toppingIds} = req.body;
        req.body.toppingIds = [...new Set(toppingIds)]
        const data = await Pizza.create(req.body)
        res.status(201).send({
            error: false,
            data,
        })
    }, 

    read: async (req, res) => {
        const data = await Pizza.findOne({_id: req.params.id}).populate("toppingIds")
        res.status(200).send({
            error: false,
            data,
        })
    }, 

    update: async (req, res) => {
        const data = await Pizza.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        res.status(202).send({
            error: false,
            new: await Pizza.findOne({_id: req.params.id}),
            data,
        })
    },

    delete: async (req, res) => {
        const data = await Pizza.deleteOne({_id: req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        })
    }
}