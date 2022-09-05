const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const validator = require('../util/validation')
const userModel = require('../models/user-model')
const response = require('../util/response')
const tokenService = require('../services/token-service')





router.get('/', (req,res) =>{

    res.send('user home')
})

router.post('/signup', (req,res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    if(validator.validEmail(email) && validator.validName(name) && validator.validPassword(password)){
        
        validator.validUserEmail(email).then((data) => {
            let validEmail = data
            if(validEmail == true){
                const userDocument = new userModel()
                userDocument.name = name
                userDocument.email = email
                userDocument.password = password
                userDocument.createdDate = new Date()
                userDocument.save()
                .then((doc) => {
                    res.status(200).send(response.success('User created'))
                }).catch((err) => {
                    res.status(500).send(response.serverError())
                })
            }
            else{
                res.status(400).send(response.errorMessage('User email already exists'))
            }
        })
        
    }else{
        res.status(400).send(response.errorMessage('Invalid input'))
    }


})

router.put('/reset-password', (req,res) => {

})

router.post('/login', (req,res) => {
    let email = req.body.email
    let password = req.body.password
    if(validator.validEmail(email) && validator.validPassword(password)){
        userModel.find({email:email})
        .then((data) => {
            if(data[0].password === password){
                let token = tokenService.signToken(email)
                res.cookie('token',token,{ maxAge: 24 * 1000 * 60 * 10, httpOnly: false , sameSite: 'lax', path: '/', domain:'127.0.0.1'})
                res.status(200).send(response.success('Login successful'))
            }else{
                res.status(400).send(response.errorMessage("User name or password incorrect"))
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).send(response.serverError())
        })
    }
})

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    res.status(200).send(response.success('Logout successful'))
})

module.exports = router;