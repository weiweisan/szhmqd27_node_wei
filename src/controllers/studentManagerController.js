const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname,"../tools/databasetool"))

/**
 * 返回列表页面
 * @param {*} req
 * @param {*} res
 */

  const getStudentListPage = (req,res) => {
    const keyword = req.query.keyword || ''
    
    databasetool.findMany('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
      //这个里面的代码,是当databasetool中findMany执行了callback
      //callback中会把 err,docs传递过来
      //渲染页面的代码
      const html = template(path.join(__dirname,"../public/views/list.html"),{students:docs,keyword});
      res.send(html);
    })
  };

 //导出控制器
 module.exports = {
  getStudentListPage
};