const fs = require('fs');
const path = require('path');

function readFile(filename){
	var content = fs.readFileSync(filename);
	console.log(content.toString());
	return content;
}


const handler = (req,res)=>{
	const url = req.url;
	const method = req.method;
	res.setHeader('Content-Type','text/html');
	if(url === '/'){
		res.write(`<html>
			<title>Tes Node</title>
			<body>
				<h2>Hello From Node JS BOYY</h2>
				<form action="/create-user" method="POST">
					<input type="text" placeholder="username" name="username" id="">
					<button>Send</button>
				</form>
			</body>
		</html>`);
		res.end();
	}else if(url === '/users'){
		res.write(`<html>
			<title>User Data</title>
			<body>
				<ul>
					<li>User 1</li>
					<li>User 2</li>
					<li>User 3</li>
				</ul>
			</body>
		</html>`);
		res.end();
	}else if(url === '/create-user' && method === 'POST'){
		const usernameData = [];
		req.on('data',(chunk)=>{
			console.log(chunk);
			usernameData.push(chunk);
			// bodyData.push(readFile('data.txt'));
		});
		req.on('end',()=>{
			const parsedData = Buffer.concat(usernameData).toString();
			const data = parsedData.split("=")[1];
			// fs.writeFileSync('data.txt',data);
			console.log(data);
		})
			res.statusCode = 302;
			res.setHeader('Location','/');
			res.end(); 
	}
	else if(url === '/learn'){
		res.write(`<html>
			<title>Tes Node</title>
			<body>
				<form action="/kirim" method="POST">
					<input type="text" name="pesan" id="">
					<button>Kirim</button>
				</form>
			</body>
		</html>`);
		res.end();
	}else if(url === '/kirim' && method === 'POST'){
		const bodyData = [];
		req.on('data',(chunk)=>{
			console.log(chunk);
			bodyData.push(chunk);
			bodyData.push(readFile('data.txt'));
		});
		req.on('end',()=>{
			const parsedData = Buffer.concat(bodyData).toString();
			const data = parsedData.split("=")[1];
			fs.writeFileSync('data.txt',data);
		})
			res.statusCode = 302;
			res.setHeader('Location','/');
			res.end(); 
	}
	else{
		res.write(`<html>
			<title>Tes Node</title>
			<body>
				<h2>Hello From Node JS</h2>
			</body>
		</html>`);
		res.end();
	}
	
}

module.exports = {
	handler,
	someText:"asd"
}