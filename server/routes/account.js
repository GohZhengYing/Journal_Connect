const express = require('express')
const {forgetAccount,getFriends,createAccount,updateAccount,
    deleteAccount} = require('../controller/account')
const authenticateMiddleware = require('../middleware/auth')

const router = express.Router()

router.route('/').get(authenticateMiddleware,getFriends).patch(authenticateMiddleware,updateAccount).delete(authenticateMiddleware,deleteAccount).post(createAccount)

router.route('/:id').get(forgetAccount)

module.exports = router