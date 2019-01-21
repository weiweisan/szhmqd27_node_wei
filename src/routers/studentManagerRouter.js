const express = require('express')
const path = require('path')

//获取所有人信息模块

//创建路由对象
const studentManagerRouter = express.Router();

//导入控制器
const studentManagerController = require(path.join(
    __dirname,
    "../controllers/studentManagerController.js"));

//处理请求
studentManagerRouter.get("/list",studentManagerController.getStudentListPage);
//导出
module.exports = studentManagerRouter;