const express = require('express');

const router = express.Router();

router.get('/profile',(req,res,next)=>{
	console.log('route profile');
	res.send('<h1>User Data</h1>');
});

router.get('/',(req,res,next)=>{
	console.log('index middleware');
	res.send('<h1>Hello From Express</h1>')
})

module.exports = router;