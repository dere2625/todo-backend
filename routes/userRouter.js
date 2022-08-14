const express = require('express')
const router = express.Router();


router.get('/', (req,res) =>{
    res.send('user home')
})

router.post('/signup', (req,res) => {

})

router.put('/reset-password', (req,res) => {

})

router.post('/login', (req,res) => {
    
})

module.exports = router;