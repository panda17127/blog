var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog', {useUnifiedTopology: true, useNewUrlParser: true});

var Scheme = mongoose.Schema

var userScheme = new Scheme({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        // 不要写 Date.now(), 会注册为唯一值
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    // 用户权限 0——没有限制  1——不可以评论 2——不可以登录
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
})

// User 是表名，创建之后变为 users
module.exports = mongoose.model('User', userScheme)