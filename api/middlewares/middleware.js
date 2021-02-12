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
            res.status(404).json({message: `no action with id: ${id}`})
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json(`server error:${err}`)
    }
}

module.exports = {
    validateProjectId,
    validateActionId
}