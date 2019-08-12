const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 引入user.js
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")


// DB config

const db = require("./config/key").mongoURI;

// Connect to mongodb
mongoose.connect( db)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => console.log(err))

// passport 初始化
app.use(passport.initialize())

require('./config/passport')(passport)

app.get("/",(req, res) => {
    res.send('Hello World!');
})

// use route
app.use("/api/users", users)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000

app.set('NODE_ENV', 'production')

app.listen(port,() => {
    console.log('Server running on Port', port)
})


