//imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {login, logout } = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const {PORT} = process.env
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//routes - endpoints
app.post('/login', login)
app.post('/logout',logout)
app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts )
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id',isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost )



//listening
app.listen(PORT, () => { 
    console.log(`Tunned in to port ${PORT}`) })