var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
// 默认就是 views, 写在这里方面修改
app.set('views', path.join(__dirname, './views/')) 

// 配置 body-parser, 专门用来获取 post 数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({
    secret: 'blog',
    resave: false,
    saveUninitialized: true
}))

// 把路由挂载到 app 中
app.use(router)

// 配置一个 404 中间件
app.use(function(req, res) {
    res.render('404.html')
})

// 配置错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
        code: 500,
        msg: 'Sever Error'
    })
})

app.listen(3000, function () {
    console.log('running...')
})