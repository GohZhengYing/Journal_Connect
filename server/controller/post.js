const Post = require('../models/post')
const Account = require('../models/account')

async function getPost(req,res){
    try {
        const {posts_id} = req.user
        const posts = await Post.find({
            '_id':{
                $in:posts_id}
            })
            let newPosts_id = []
            if(posts.length!=0)
            {
                for(let i=0;i<posts.length;i++){
                const [year,month,day] = posts[i].date.split('-')
                const curDate = Number(year+month+day)
                if(newPosts_id.length!==0)
                {
                    for(let j=0;j<newPosts_id.length;j++){
                    const [year,month,day] = newPosts_id[j].date.split('-')
                    const insertedDate = Number(year+month+day)
                    if(curDate>=insertedDate)
                    {newPosts_id.splice(j,0,posts[i])
                    break}
                    }
                    if(newPosts_id.length===i)
                    {newPosts_id.push(posts[i])}
                }
                else
                {newPosts_id.push(posts[i])}
            }
            }
        res.status(200).json({posts:newPosts_id})
    } catch (error) {
        
    }
}
async function getFriendsPost(req,res){
    try {
        const {name,posts_id} = await Account.findOne({_id:req.body.id})
        if(posts_id.length===0)
        return res.status(200).json({status:false})
        const posts = await Post.find({
            '_id':{
                $in:posts_id}
            })
            let newPosts_id = []
            if(posts.length!=0)
            {
                for(let i=0;i<posts.length;i++){
                const [year,month,day] = posts[i].date.split('-')
                const curDate = Number(year+month+day)
                if(newPosts_id.length!==0)
                {
                    for(let j=0;j<newPosts_id.length;j++){
                    const [year,month,day] = newPosts_id[j].date.split('-')
                    const insertedDate = Number(year+month+day)
                    if(curDate>=insertedDate)
                    {newPosts_id.splice(j,0,posts[i])
                    break}
                    }
                    if(newPosts_id.length===i)
                    {newPosts_id.push(posts[i])}
                }
                else
                {newPosts_id.push(posts[i])}
            }
            }
        res.status(200).json({status:true,posts:newPosts_id,name})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}

async function getAllPost(req,res){
    try {
        const {friends_id} = req.user
        let friends_post_id = []
        let friends_name = []
        for(let i=0;i<friends_id.length;i++){
            const fetchAccount = await Account.findOne({_id:friends_id[i]})
            if(fetchAccount!==null)
            {friends_post_id.push(...fetchAccount.posts_id)
            for(let j=0;j<fetchAccount.posts_id.length;j++)
            {friends_name.push(fetchAccount.name)}}
        }
        const posts = await Post.find({
            '_id':{
                $in:friends_post_id}
            })
        res.status(200).json({posts,names:friends_name})
    } catch (error) {
        
    }
}

async function createPost(req,res){
    try {
        const {date,description,image} = req.body
        const response = await Post.create({user_id:req.user._id,date,description,image})
        const newPosts_id = await req.user.posts_id.push(String(response._id))
        const update = await Account.findOneAndUpdate({username:req.user.username},{...req.user,posts_id:newPosts_id})
        res.status(200).json({status:true})
    } catch (error) {
        
    }

}

async function updatePost(req,res){
    try {
        const {date,description,image} = req.body
        const response = await Post.findOneAndUpdate({_id:req.params.id},{date,description,image})
        res.status(200).json({status:true})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}

async function deletePost(req,res){
    try {
        const response = await Post.findOneAndDelete({_id:req.params.id})
        req.user.posts_id.map((post_id,index)=>{if(post_id===req.params.id)return req.user.posts_id.splice(index,1)})
        const update = await Account.findOneAndUpdate({username:req.user.username},{...req.user,posts_id:req.user.posts_id})
        res.status(200).json({status:true})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}

module.exports = {
    getAllPost,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getFriendsPost
}