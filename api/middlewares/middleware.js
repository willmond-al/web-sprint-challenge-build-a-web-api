const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

const validateProjectId = async (req, res, next) => {
    const { id } = req.params
    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json({message: `no project with id: ${id}`})
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        res.status(500).json(`server error:${err}`)
    }
}
const validateActionId = async (req, res, next) => {
    const { id } = req.params
    try{
        const action = await Actions.get(id)
        if(!action){
            res.status(404).json({message: `no post with id: ${id}`})
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json(`server error:${err}`)
    }
}

function checkProject(req, res, next){
    if(!req.body.name){
        res.status(400).json('name required')
    } else if (!req.body.description) {
        res.status(400).json('description required')
    } else {
        next()
    }
} 

function checkAction(req, res, next){
    if(!req.body.description){
        res.status(400).json('description required')
    } else if(req.body.description.length > 128){
        res.status(400).json('description longer than 128 characters!')
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validateActionId, 
    checkProject,
    checkAction
}