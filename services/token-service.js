const jwt = require('jsonwebtoken')
const configuration = require('../util/config')

module.exports.signToken = (body) => {
    return jwt.sign(body,configuration.configuration.jwtSecret)
}

module.exports.verifyToken = (token) => {
    return jwt.verify(token,configuration.configuration.jwtSecret,(err,data) => {
        if(err){
            return false
        }
        return true
    })
}

module.exports.getTokenData = (token) => {
    return jwt.verify(token,configuration.configuration.jwtSecret,(err,data) => {
        return data
    })
}