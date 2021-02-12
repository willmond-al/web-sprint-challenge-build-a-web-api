// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const mw = require('../middlewares/middleware')
const { route } = require('../projects/projects-router')

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `error getting actions`
        })
    })
})

router.get('/:id', mw.validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', /*mw.validateProjectId,*/ mw.checkAction, (req, res) => {
    // const actionInfo = {...req.body, project_id: req.params.id}
    console.log(req.body)
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message:'trouble adding action'
        })
    })
})

router.put('/:id', mw.validateActionId, mw.checkAction, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'could not update action'
        })
    })
})

router.delete('/:id', mw.validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(resp => {
        res.status(200).json({
            message: `action id: ${req.params.id} is gone`
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'could not delete action'
        })
    })
})

module.exports = router
