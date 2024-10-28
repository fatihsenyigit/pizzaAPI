
'use strict'

const Order = require('../models/orderModel')
const Pizza = require('../models/pizzaModel')

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Order, {}, ['userId', 'pizzaId'])
        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Order),
            data,
        })
    },

    create: async (req, res) => {
        const pizza = await Pizza.findOne({ _id: req?.body?.pizzaId });
        if (!pizza) {
        res.errorStatusCode = 404;
        throw new Error("pizza not found");
        }

        req.body.price = pizza.price;

        const data = await Order.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        const data = await Order.findOne({_id: req.params.id}).populate([
            'userId',
            'pizzaId',
        ])
        res.status(200).send({
            error: false,
            data,
        })
    },

    update: async (req, res) => {
        const data =  await Order.updateOne({_id: req.params.id}, req.body, {runValidators: true});
        res.status(202).send({
            error: false,
            data,
            new: await Order.findOne({_id: req.params.id})
        })
    },

    delete: async (req, res) => {
        const data = await Order.deleteOne({_id: req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        })
    }
}