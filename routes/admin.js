const express = require('express');

const router = express.Router();

router.get('/add-product',(req,res,next)=>{
	res.send(`<form action="/admin/product" method="POST">
			<input type="text" name="name" id="">
			<button>Send</button>
		</form>`)
})

router.post('/product',(req,res,next)=>{
	console.log(req.body);
	res.redirect('/admin/add-product');
})

module.exports = router;