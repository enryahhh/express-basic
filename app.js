const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const routes = require('./routes');
const app = express();

const routeAdmin = require('./routes/admin');
const routeShop = require('./routes/shop');


app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',routeAdmin);
app.use(routeShop);

app.use((req,res,next)=>{
	res.status(404).send('<h1>404 PAGE NOT FOUND</h1>');
})
// app.use('/',(req,res,next)=>{
// 	console.log('always running');
// 	next();
// })




const server = http.createServer(app);

server.listen(3000);