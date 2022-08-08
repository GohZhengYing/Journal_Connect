const express = require('express')
const {searchFriend,addFriend,deleteFriend,updateRequest,getRequests} = require('../controller/friend')
const authenticateMiddleware = require('../middleware/auth')

const router = express.Router()

router.route('/').post(authenticateMiddleware,addFriend).delete(authenticateMiddleware,deleteFriend)
.patch(authenticateMiddleware,updateRequest).get(authenticateMiddleware,getRequests)

router.route('/:id').get(authenticateMiddleware,searchFriend)
module.exports = router