const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")

const router = express.Router();

const Profile = require("../../models/profiles")
const Post = require("../../models/post")

const validatePostInput = require("../../validation/post")


// /api/post/ 添加评论
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const {errors,isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user:req.user.id
    })

    newPost.save().then(post =>res.json(post))
})

// /api/post/ 获取评论
router.get("/",(req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts =>res.json(posts))
        .catch(err=> res.status(404).json({nopostsdound:"找不到任何评论信息"}))
})

// 获取单个评论信息 api/post/:id
router.get("/:id",(req, res) => {
    Post.findById(req.params.id)
        .then(posts =>res.json(posts))
        .catch(err=> res.status(404).json({nopostsdound:"找不到任何评论信息"}))
})

// 删除单个评论信息 api/post/:id
router.delete("/:id",passport.authenticate("jwt", { session: false }),(req, res) => {
    Profile.findOne({user: req.user.id})
            .then(profile =>{
                Post.findById(req.params.id)
                    .then(post =>{
                        //判断是否是本人
                        if(post.user.toString() !== req.user.id){
                            return res.status(401).json({notauthorized:"用户非法操作"})
                        }
                        post.remove().then(()=>res.json({success:true}))
                    })
                    .catch(err=>res.status(404).json({nopostsdound:"没有该评论信息"}))
            })
})

// 添加点赞信息 api/post/like/:id
router.post("/like/:id",passport.authenticate("jwt", { session: false }),(req, res) => {
    Profile.findOne({user: req.user.id})
            .then(profile =>{
                Post.findById(req.params.id)
                    .then(post =>{
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                                return res.status(400).json({alreadyliked:"该用户已赞过"})
                            }
                        post.likes.unshift({user: req.user.id})

                        post.save().then(err => res.json(err))
                    })
                    .catch(err=>res.status(404).json({nopostsdound:"点赞错误"}))
            })
})

// 取消点赞信息 api/post/like/:id
router.post("/unlike/:id",passport.authenticate("jwt", { session: false }),(req, res) => {
    Profile.findOne({user: req.user.id})
            .then(profile =>{
                Post.findById(req.params.id)
                    .then(post =>{
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                                return res.status(400).json({notliked:"该用户没有赞过"})
                            }

                            //获取要函调的user id
                            const removeIndex = post.likes.map( item => item.user.toString())
                                                    .indexOf(req.user.id)
                            post.likes.splice(removeIndex,1)

                        post.save().then(err => res.json(err))
                    })
                    .catch(err=>res.status(404).json({nopostsdound:"取消点赞错误"}))
            })
})

// 添加个人评论信息 api/post/comment/:id
router.post("/comment/:id",passport.authenticate("jwt", { session: false }),(req, res) => {
    const {errors,isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    Post.findById(req.params.id)
        .then(post =>{
            const newComment ={
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment)

            post.save().then(post =>res.json(post))
        })
        .catch(err=>res.status(404).json({postnotfound:"添加评论错误"}))
})

// 删除个人评论信息 api/post/comment/:id
router.delete("/comment/:id/:comment_id",passport.authenticate("jwt", { session: false }),(req, res) => {
    
    Post.findById(req.params.id)
        .then(post =>{
           if(post.comments.filter(comment =>comment._id.toString() === req.params.comment_id).length === 0){
               return res.status(404).json({commentnotexists:"该评论不存在"})
           }

            const removeIndex = post.comments.map(item =>item._id.toString()).indexOf(req.params.comment_id)

            post.comments.splice(removeIndex,1)
            post.save().then(post =>res.json(post))
        })
        .catch(err=>res.status(404).json({postnotfound:"添加评论错误"}))
})
module.exports = router