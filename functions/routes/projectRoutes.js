const express = require('express')
const router = express.Router()
const {createProject} = require('../controllers/projectController')

//set up an authentication middle for protected routes

router.route('/').post(createProject)

module.exports = router