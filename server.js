const express = require("express")
const mongoose = require("mongoose")
const app = express()

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


