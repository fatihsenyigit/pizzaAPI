
const router = require('express').Router();

const user = require('../controllers/userController')

// URL: /users
router.route('/').get(user.list)

module.exports = router