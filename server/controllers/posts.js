const {Post} = require(`../models/post`) //importing post model
const {User} = require(`../models/user`) //importing user model

module.exports = {

    getAllPosts: async (req, res) => {
        // console.log('getAllPosts was triggered')
        // res.status(200).send('hello from get all')
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('Error in getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getCurrentUserPosts: async (req, res) => {
        // console.log('getCurrentUserPosts was triggered')
        try {
            const {userId} = req.params
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]})
            res.status(200).send(posts)
        } catch (error) {
            console.log('Error in getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addPost: async (req, res) => {
        try {
            const {title, content, status, userId} = req.body
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('Error in getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    

    editPost: async (req, res) => {
        // console.log('editPost was triggered')
        try {
            const {id} = req.params
            const {status} = req.body
            await Post.update({privateStatus: status}, {
                where: {id: +id}
            })
            res.sendStatus(200)
        } catch (error) {
            console.log('Error in getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    }, 

    deletePost: async (req, res) => {
        // console.log('deletePost was triggered')
        try {
            const {id} = req.params
            await Post.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('Error in getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    }

};