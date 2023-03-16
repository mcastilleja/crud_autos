const express = require('express')
const router =express.Router()
const { loginUser, registerUser, myData } = require('../controllers/usersController')
const { protected } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/mydata', protected, myData)

module.exports = router