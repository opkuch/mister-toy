const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:id', getToyById)
router.post('/', requireAdmin, addToy)
router.put('/:id', requireAdmin, updateToy)
router.delete('/:id', requireAdmin, removeToy)

module.exports = router