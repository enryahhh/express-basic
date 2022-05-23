const notFoundException = (req,res,next)=>{
	res.status(404).render('404',{path:'/not-found'});
}

module.exports = {
	notFoundException
}