const express = require('express')
const router = express.Router()
const {getAutos, setAutos, updateAutos, deleteAutos} = require('../controllers/autosController')

router.route('/').get(getAutos).post(setAutos)
router.route('/:id').put(updateAutos).delete(deleteAutos)

module.exports = router
