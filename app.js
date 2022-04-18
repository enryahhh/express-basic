const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const routes = require('./routes');
const app = express();

// app.engine('handlebars',expressHbs());
app.set('view engine','ejs');
app.set('views','views');

const routeAdmin = require('./routes/admin');
const routeShop = require('./routes/shop');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',routeAdmin.router);
app.use(routeShop);

app.use((req,res,next)=>{
	res.status(404).render('404');
})
// app.use('/',(req,res,next)=>{
// 	console.log('always running');
// 	next();
// })




const server = http.createServer(app);

server.listen(3000);