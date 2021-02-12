// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')
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

router.post('/', mw.checkProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error adding project'
        })
    })
})

router.get('/:id/actions', mw.validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `could not get actions for project id: ${req.params.id}`
        })
    })
})

router.put('/:id', mw.validateProjectId, mw.checkProject, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'could not update project'
        })
    })
})

router.delete('/:id', mw.validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(resp => {
        res.status(200).json({
            message: `project id: ${req.params.id} is gone`
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'could not delete project'
        })
    })
})

module.exports = router