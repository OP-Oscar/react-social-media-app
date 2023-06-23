module.exports = {

    getAllPosts: (req, res) => {
        console.log('getAllPosts was triggered')
        res.status(200).send('hello from get all')
    },

    getCurrentUserPosts: (req, res) => {
        console.log('getCurrentUserPosts was triggered')
    },

    addPost: (req, res) => {
        console.log('addPost was triggered')
    },

    editPost: (req, res) => {
        console.log('editPost was triggered')
    }, 

    deletePost: (req, res) => {
        console.log('deletePost was triggered')
    }

}