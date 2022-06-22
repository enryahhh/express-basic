const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const routes = require('./routes');
const sequelize = require('./util/db')
const app = express();
const exception = require('./controllers/error')
// app.engine('handlebars',expressHbs());
app.set('view engine','ejs');
app.set('views','views');
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const routeAdmin = require('./routes/admin');
const routeShop = require('./routes/shop');

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user
        next();
    })
    .catch(err=>console.log(err));
})


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

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'})
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product,{through:OrderItem})

sequelize
// .sync({force:true})
.sync()
.then(result =>{
    return User.findByPk(1)
    // server.listen(3000);    
})
.then((user)=>{
    if(!user){
        return User.create({name:"ling",email:"email@gmail.com",password:"tes123"})
    }
    return user
})
.then((user)=>{
    console.log(user)
    // if(!cart)
    return user
    // server.listen(3000)
})
.then((cart)=>{
    console.log(cart)
    server.listen(3000)
})
.catch(err => {
    console.log(err)
})

