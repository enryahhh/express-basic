const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

// app.use('/',(req,res,next)=>{
// 	console.log('always running');
// 	next();
// })

app.use('/add-user',(req,res,next)=>{
	res.send(`<form action="/user" method="POST">
			<input type="text" name="name" id="">
			<button>Send</button>
		</form>`)
})

app.post('/user',(req,res,next)=>{
	console.log(req.body);
	res.redirect('/users');
})


app.use('/users',(req,res,next)=>{
	console.log('tes middleware users');
	res.send('<h1>Users Data</h1>');
});

app.use('/',(req,res,next)=>{
	console.log('index middleware');
	res.send('<h1>Hello From Express</h1>')
})

const server = http.createServer(app);

server.listen(3000);