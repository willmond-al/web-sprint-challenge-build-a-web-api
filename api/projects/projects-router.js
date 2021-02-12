// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')
const mw = require('../middlewares/middleware')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `error getting projects`
        })
    })
})

router.get('/:id', mw.validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

module.exports = router