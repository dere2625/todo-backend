const express = require('express')
const router = express.Router();
const response = require('../util/response')

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