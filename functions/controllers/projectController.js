const asyncHandler = require('express-async-handler')
const { db, admin } = require('../config/admin')

// @route   POST /project
// @desc    Post a project responce from Kobo Collect Toolkit
// @access  Private ( temporary public for the mean time)

const createProject = asyncHandler(async (req, res) => {
    if (req.body.body.trim() == '') {
      res.status(400)
      throw new Error('you havent created any form add questions to continue')
    }
  
    if (req.body.title.trim() == '') {
      res.status(400)
      throw new Error('the form lacks a title input a title to continue')
    }
    const code = cryptoRandomString({ length: 5 })
  
    const project = {
      body: req.body.title,
      title: req.body.body,
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time:  new Date().toLocaleTimeString(),
      code: code,
      ProjectImages: [],
      username: req.user.username,
      numberOfInterviewers: 0,
      submissions: 0,
    }
    db.collection('projects')
      .add(project)
      .then((doc) => {
        const responseProject = project
        responseProject.id = doc.id
        return res.json(responseProject)
      })
      .catch((err) => {
        res.status(500)
        throw new Error('Something went wrong ')
      })
  })