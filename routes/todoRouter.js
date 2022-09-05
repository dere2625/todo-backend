const express = require('express')
const router = express.Router();
const response = require('../util/response')
const tokenService = require('../services/token-service')
const todo = require('../models/todo-model');
const swaggerJSDoc = require('swagger-jsdoc');

router.all('/*',(req,res,next) => {
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
    let user = tokenService.getTokenData(req.cookies.token)
    todo.find({user: user}).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send(response.serverError())
    })
})

router.get('one/:id', (req,res)=>{
    let user = tokenService.getTokenData(req.cookies.token)
    let id = req.params.id
    todo.find({user: user,_id:id}).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send(response.serverError())
    })
})

router.get('/summary', (req,res)=>{
    let user = tokenService.getTokenData(req.cookies.token)
    todo.find({user: user}).then(data => {
        let pending = data.filter(x => x.status == 'Pending').length
        let completed = data.filter(x => x.status == 'Completed').length
        let archived = data.filter(x => x.status == "Archived").length
        let dueSoon = data.filter(x => new Date(x.dueDate) - new Date() < 3 && x.status == 'Pending').length

        let jsonResponse = {
            pending : pending,
            completed : completed,
            archived : archived,
            dueSoon : dueSoon
        }
        res.send(jsonResponse)
    }).catch(err => {
        console.log(err)
        res.status(500).send(response.serverError())
    })
    
})

router.post('/create', (req,res) => {
    console.log(req);
    let todoDocument = new todo()
    todoDocument.title = req.body.title
    todoDocument.user = tokenService.getTokenData(req.cookies.token)
    todoDocument.description = req.body.description
    todoDocument.category = req.body.category
    todoDocument.status = req.body.status
    todoDocument.dueDate = req.body.dueDate
    todoDocument.createdDate = new Date()
    todoDocument.priorirty = req.body.priorirty
    todoDocument.save()
    .then((data) => {
        res.status(200).send(response.success('Todo created'))
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(response.serverError())
    })


})

router.put('/update', (req,res) => {

})

router.delete('/archive/:id', (req,res) => {
    let id = req.params.id
    todo.updateOne({_id: id}, {status : 'Archived'})
    .then((data) => {
        res.status(200).send(response.success('Todo Archived'))
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(response.serverError())
    })

})

router.get('/complete/:id', (req,res) => {
    let id = req.params.id
    todo.updateOne({_id: id}, {status : 'Completed'})
    .then((data) => {
        res.status(200).send(response.success('Task Completed'))
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(response.serverError())
    })
})

router.get('/uncomplete/:id', (req,res) => {
    let id = req.params.id
    todo.updateOne({_id: id}, {status : 'Pending'})
    .then((data) => {
        res.status(200).send(response.success('Task Pending'))
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(response.serverError())
    })
})

module.exports = router;