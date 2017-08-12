var bodyparser=require('body-parser');
var mongoose=require('mongoose');

mongoose.connect('mongodb://test:test@ds061354.mlab.com:61354/todo');
var todoSchema=new mongoose.Schema({item:String});
var Todo=mongoose.model('Todo',todoSchema);

//var data=[{item:'to go through node.js tutorial'},{item:'visit Hierttoniemi'},{item:'sunbathing'}];
var urlencodedParser=bodyparser.urlencoded({extended:false});
module.exports=function(app){

  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todoView',{data:data});
    });

  });

  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo=Todo(req.body).save(function(err,data){

      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item',function(req,res){
    var itemToDel=req.params.item.replace(/\-/g," ");
    Todo.find({item:itemToDel}).remove(function(err,data){
      if(err)throw err;
      res.json(data);
    });
  });
};
