
'use strict'

const router = require('express').Router()
const topping = require('../controllers/toppingController')

router.route('/').get(topping.list).post(topping.create)

router.route('/:id').get(topping.read).put(topping.update).patch(topping.update).delete(topping.delete)

module.exports = router