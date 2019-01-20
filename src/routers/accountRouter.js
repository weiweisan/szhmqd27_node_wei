/**
 * 注册和登录的处理
 */

 const express = require('express')
 //导入读取文件的模块
 const path = require('path')

 //创建路由对象
 const accountRouter = express.Router()

 //导入控制器模块
 const accountController = require(path.join(__dirname,"../controllers/accountController.js"))

 //MVC 导入另一个控制器模块进行运行 获取注册页面的请求
 accountRouter.get('/register',accountController.getRegisterPage)
 //注册
 accountRouter.post('/register',accountController.register)
 //获取登录页面
 accountRouter.get('/login',accountController.getLoginPage)
 //获取验证码
 accountRouter.get('/vcode',accountController.getVcodeImage)
 //导出路由对象
 module.exports = accountRouter