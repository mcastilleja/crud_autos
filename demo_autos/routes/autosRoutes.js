const express = require('express')
const router = express.Router()
const {getAutos, setAutos, updateAutos, deleteAutos} = require('../controllers/autosController')
const { protected } = require('../middleware/authMiddleware')

router.route('/').get(protected, getAutos).post(protected, setAutos)
router.route('/:id').put(protected, updateAutos).delete(protected, deleteAutos)

module.exports = router
