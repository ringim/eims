const asyncHandler = require('express-async-handler')
const { db, admin } = require('../config/admin')

// @route   POST /project
// @desc    Post a project responce from Kobo Collect Toolkit
// @access  Private ( temporary public for the mean time)

const createProject = asyncHandler(async (req, res) => {
   // perform validation to ensure the data is complete and conforms to expected format
   // apply some business logics
   // error handling e.g in case of malformed data
   // authentication and security to ensure only authorized kobo collect toolkit apps can submit data
   // scallability and oerformance

    const project = {
      body: req.body,
      title: 'test',
      createdAt: new Date().toISOString(),
      username: req.user.username,
    }
    db.collection('projects')
      .add(proj)
      .then((doc) => {
        const responseProject = project
        responseProject.id = doc.id
        return res.json(responseProject)
      })
      .catch((err) => {
        res.status(500)
        throw new Error('Something went wrong ')
        // set up remote error handling middle ware for logging purposes

      })
  })

  module.exports = { createProject}