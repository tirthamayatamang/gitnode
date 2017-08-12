var express=require('express');

var todoController=require('./controllers/todoController.js')

var app=express();

//set up view engine
app.set('view engine','ejs');

//access static files
app.use(express.static('./public'));

//firing controllers
todoController(app);

app.listen(3000);
console.log('listening to port 3000');
