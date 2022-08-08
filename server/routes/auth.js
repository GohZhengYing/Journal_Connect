const express = require('express')
const {auth} = require('../controller/auth')

const router = express.Router()

router.route('/').post(auth)

module.exports = router