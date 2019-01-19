const express = require("express")
const bcrypt = require("bcrypt-nodejs") //导入加密第三方包
const gravatar = require('gravatar');  //导入第三方包默认头像
var jwt = require('jsonwebtoken')       //验证
var keys = require("../../config/key")
const passport = require("passport")

const router = express.Router();


const User = require("../../models/User")

//引入验证方法
    //验证注册信息
const validateRegisterInput = require("../../validation/register")
    //验证登录信息
const validateLoginInput = require("../../validation/login")



//route GET api/users/test 访问的路径
router.get("/test",(req,res)=>{
    res.json({msg:"login works"})
})


router.post("/register",(req,res)=>{
    const {errors,isValid} = validateRegisterInput(req.body)

    //判断isValid是否通过
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email})
        .then((err) =>{
            if(err){
                return res.status(400).json({email:"邮箱已存在"})
            }else{
                //生成默认头像
                const avatar = gravatar.url('req.body.email', {s: '200', r: 'pg', d: 'mm'});


                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                }) 

                //使用pcrypt进行加密
                bcrypt.genSalt(10,function(err,salt){
                    if(err){
                        return next(err)
                    }
                    bcrypt.hash(newUser.password,salt,null,(err,hash)=>{
                        if(err)throw next(err);

                        newUser.password = hash;

                        newUser.save()
                                .then((user)=>res.json(user))
                                .catch(err=>console.log(err))
                    })
                })
            }
        })

})


router.post("/login",(req,res)=>{
    const {errors,isValid} = validateLoginInput(req.body)

    //判断isValid是否通过
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json({email:"邮箱不存在"})
            }

            // 密码匹配
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err) return err
                if(result){
                    const rule = {id:user.id,name:user.name}
                    // jwt.sign("规则","加密名字","过期事件","箭头函数") 为了给密码增加令牌
                    jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                        if(err) throw err;
                        res.json({
                            success:true,
                            token:"Bearer "+token
                        })
                    })
                    //  res.json({msg: "success"})
                }else{
                    return res.status(400).json({password:"密码错误"})
                }
            })
        })
})


router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router