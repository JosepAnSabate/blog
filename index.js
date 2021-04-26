const express = require('express')
/* const path = require('path') */

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
/* const BlogPost = require('./models/BlogPost.js') */
const fileUpload = require('express-fileupload')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const validateMiddleWare = require("./middleware/validateMiddleware");



app.use(fileUpload()) 

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

/* app.get('/about',(req,res)=>{
   // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
   res.render('about');
}) */

/* app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact');
}) */

app.use('/posts/store',validateMiddleWare) 

app.get('/posts/new',newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)        
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController);
app.post('/users/login',loginUserController) // should be same as form action in login.edge
