const express = require("express")
const mongoose = require("mongoose")
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


// 引入user.js
const users = require("./routes/api/users")


// DB config

const db = require("./config/key").mongoURI;

// Connect to mongodb
mongoose.connect( db)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => console.log(err))

app.get("/",(req, res) => {
    res.send('Hello World!');
})

// use route
app.use("/api/users", users)

const port = process.env.PORT || 5000

app.set('NODE_ENV', 'production')

app.listen(port,() => {
    console.log('Server running on Port', port)
})


