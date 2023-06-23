require('dotenv').config() //bringing in .env data and functionality
const jwt = require('jsonwebtoken') //importing jwt token
const {SECRET} = process.env // destructuring SECRET from .env

module.exports = { //method to export components

    //function which has request, response, and a third variable called "next"
    isAuthenticated: (req, res, next) => { 
        const headerToken = req.get('Authorization') //confirming authorization as 'headertoken'

        //if no headerToken found return error
        if (!headerToken) { 
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        //assuming headertoken was found, we proceed to make variable
        let token

        //create variable which uses jwt to check if there is a match
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //if token is not a match then return message stating not authenticated
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        //random function which unsure what it will do later
        next()
    }
}