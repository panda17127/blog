var express = require('express')
var User = require('./models/user')
var crypto = require('crypto')

var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res, next) {
    var body = req.body
    var md5 = crypto.createHash("md5")
    body.password = md5.update(body.password).digest("hex")
    User.findOne({
        email: body.email,
        password: body.password
    }, function (err, data) {
        if(err) {
            // return res.status(500).json({
            //     code: 500,
            //     msg: 'Sever Error'
            // })
            return next(err)
        }
        if (data) {
            req.session.isLogin = true
            req.session.user = data
            return res.status(200).json({
                code: 0,
                msg: '登录成功'
            })
        } else　{
            return res.status(200).json({
                code: 1,
                msg: '邮箱或密码错误'
            })
        }
    })
})

router.get('/logout', function (req, res) {
    req.session.isLogin = false
    req.session.user = null

    res.redirect('/login')
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res, next) {
    // 1. 获取数据 req.body
    // 2. 已存在 提示，不存在创建
    // 3. 返回响应
    var body = req.body
    User.findOne({
            $or: [
                {
                    email: body.email
                },
                {
                    nickname: body.nickname
                }
            ]
        }, function (err, data) {
        if (err) {
            // return res.status(500).json({
            //     code: 500,
            //     msg: 'Sever Error'
            // })
            return next(err)
        }
        if (data) {
            if (data.email === body.email) {
                return res.status(200).json({
                    code: 1,
                    msg: '邮箱已存在'
                })
            } else if (data.nickname === body.nickname) {
                return res.status(200).json({
                    code: 2,
                    msg: '昵称已存在'
                })
            }
        }
        var md5 = crypto.createHash("md5")
        body.password = md5.update(body.password).digest("hex")
        new User(body).save(function (err, user){
            if (err) {
                // return res.status(500).json({
                //     code: 500,
                //     msg: 'Sever Error'
                // })
                return next(err)
            }
            req.session.isLogin = true
            req.session.user = user
             // Express 提供一个json 方法，它接收一个对象作为参数，把对象转化为字符串再发送给浏览器
            res.status(200).json({
                code: 0,
                msg: '注册成功'
            })
        })
    })
})

router.get('/topic/new', function (req, res) {
    res.render('topic/new.html')
})

router.post('/topic/new', function (req, res, next) {
    
})

module.exports = router