
'use strict'

const router = require('express').Router()

const auth = require('../controllers/authController')

// URL: /auth

// login/logout

router.post('/login', auth.login);

// router.all('/logout', auth.logout)

router.get('/logout', auth.logout)

module.exports = router;