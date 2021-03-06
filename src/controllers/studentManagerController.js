const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))

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
      const html = template(path.join(__dirname,"../public/views/list.html"),{students:docs,keyword,
      loginedName:req.session.loginedName
      });
      res.send(html);
    })
  };
/**
 * 返回新增页面
 */
const getAddStudentPage = (req,res) => {
  const html = template(path.join(__dirname,"../public/views/add.html"),{loginedName:req.session.loginedName})
  res.send(html)
}

/**
 * 新增学生信息
 */
const addStudent = (req,res) => {
  databasetool.insertSingle('studentInfo',req.body,(err,result)=>{
    if(!result){ //失败
      res.send(`<script>alert("插入失败!")</script>`)
    } else {
      res.send(`<script>location.href='/studentmanager/list'</script>`)
    }
  });
};

/**
 * 获取修改页面
 */
const getEditStudentPage = (req,res) => {
  //必须按照规定的处理 才能拿到数据
  const _id = databasetool.ObjectId(req.params.studentId);
  databasetool.findYige("studentInfo",{ _id },(err , doc) => {
    doc.loginedName = req.session.loginedName
    //根据数据重新渲染页面
    const html = template(
      path.join(__dirname,"../public/views/edit.html"),
      doc
      );
    res.send(html);
  });
};

/**
 * 修改学生信息
 */
 const editStudent = (req,res) => {
   //必须按照它的规定的处理,才能正确的拿到需要的_id数据
   const _id = databasetool.ObjectId(req.params.studentId);

   databasetool.updateYige("studentInfo",{ _id }, req.body, (err,result) => {
    if (!result) {
      //失败
      res.send(`<script>alert("修改失败!")</script>`);
    } else {
      res.send(`<script>location.href='/studentmanager/list'</script>`);
    }
   });
 };

 /**
  * 删除学生信息
  */
 const deleteStudent = (req,res) => {
   //必须按照它的规定的处理,才能正确的拿到需要的_id数据
   const _id = databasetool.ObjectId(req.params.studentId);

   databasetool.deleteYige('studentInfo',{ _id },(err,result) => {
    if (!result) {
      //失败
      res.send(`<script>alert("删除失败!")</script>`);
    } else {
      res.send(`<script>location.href='/studentmanager/list'</script>`);
    }
   })
 }

 //导出控制器
 module.exports = {
  getStudentListPage,
  getAddStudentPage,
  addStudent,
  getEditStudentPage,
  editStudent,
  deleteStudent
};