const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser") //解析post请求数据
const passport = require("passport") //验证请求

//导入路由
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles")
const posts = require("./routers/api/post")


const app = express();


//引入mongoose连接地址
const db = require("./config/key").mongoURL

//配置post请求数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


mongoose.connect(db)
        .then(()=>console.log("Mongodb连接成功"))
        .catch(()=>console.log(err))



        //使用中间件实现允许跨域
        app.use((req,res,next) =>{
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Headers","Content-Type");
            res.header("Access-Control-Allow-Methods","POST,PUT,GET,DELETE,OPTIONS");
            next()
        })

  //passport 初始化
app.use(passport.initialize())      

require("./config/passport")(passport)


// app.get("/",(req,res)=>{
//     res.send("hello world!")
// })

//使用路由
app.use("/api/users",users)
app.use("/api/profiles",profiles)
app.use("/api/post",posts)

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})