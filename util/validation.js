const user = require('../models/user-model')

module.exports.validName = (name) => {
    return true
}

module.exports.validEmail = (email) => {
    return true
}

module.exports.validPassword = (password) => {
    if(password.length < 6){
        return false
    }
    return true
}

module.exports.validUserEmail = async (email) => {
    return user.find({email:email}).then((data) => {
        if(data.length > 0){
            return false
        }
        else{
            return true
        }
    })
}
