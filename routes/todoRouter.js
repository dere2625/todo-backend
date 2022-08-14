const express = require('express')
const router = express.Router();
const response = require('../util/response')
const tokenService = require('../services/token-service')

router.all('/',(req,res,next) => {
    let token = req.cookies.token;
    if(token == undefined){
        res.status(401).send(response.unauthorized())
    }
    else if(!tokenService.verifyToken(token)){
        res.status(401).send(response.unauthorized())
    }
    else{
        next()
    }
})

router.get('/', (req,res)=>{
    response.status = 200
    response.message = 'success'
    response.body = 'Hello world'

    res.send(response)
})

router.post('/create', (req,res) => {

})

router.put('/update', (req,res) => {

})

router.delete('/delete', (req,res) => {
    
})

module.exports = router;