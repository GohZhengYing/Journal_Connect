const express = require('express')
const {getAllPost,getPost,createPost,updatePost,deletePost,getFriendsPost} = require('../controller/post')
const router = express.Router()

router.route('/').get(getAllPost).post(createPost).patch(getFriendsPost)

router.route('/:id').get(getPost).patch(updatePost).delete(deletePost)

module.exports = router