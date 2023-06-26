//imports
require('dotenv').config()
const {sequelize} = require('./util/database') // bringing database in
const {User} = require('./models/user') // bringing in model for user
const {Post} = require('./models/post') // bringing in model for posts
const express = require('express')
const cors = require('cors')
const {register, login } = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const {PORT} = process.env
const app = express()

//db relationships
User.hasMany(Post)
Post.belongsTo(User)

//middleware
app.use(express.json())
app.use(cors())

//routes - endpoints
app.post('/register', register)
app.post('/login',login)

//get all posts - not authenticated
app.get('/posts', getAllPosts)

// work with posts - authenticated
app.get('/userposts/:userId', getCurrentUserPosts )
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id',isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost )


// the `force: true` is for development -- it DROPS tables for fresh start
// to use insert as object in sequelize.sync({ force: true })
sequelize.sync().then( () => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})

