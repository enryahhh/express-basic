const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const routes = require('./routes');
const app = express();
const exception = require('./controllers/error')
// app.engine('handlebars',expressHbs());
app.set('view engine','ejs');
app.set('views','views');

const routeAdmin = require('./routes/admin');
const routeShop = require('./routes/shop');




app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',routeAdmin);
app.use(routeShop);

app.use(exception.notFoundException)
// app.use('/',(req,res,next)=>{
// 	console.log('always running');
// 	next();
// })




const server = http.createServer(app);

server.listen(3000);