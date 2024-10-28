
'use strict'

const router = require('express').Router();

// URL: /

router.use('/auth', require('./authRouter'))
router.use('/users', require('./userRouter'))
router.use("/tokens", require("./tokenRouter"));
router.use("/orders", require("./orderRouter"));
router.use("/pizzas", require("./pizzaRouter"));
router.use("/toppings", require("./toppingRouter"));

module.exports = router