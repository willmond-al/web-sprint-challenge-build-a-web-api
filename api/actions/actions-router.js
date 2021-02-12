// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const mw = require('../middlewares/middleware')

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

module.exports = router
