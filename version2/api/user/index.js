/* 이곳에서는 routing 만 수행, control 함수는 따로 뺌 */

const express = require('express')
const router = express.Router()
const ctrl = require('./user.ctrl')

router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.delete('/:id', ctrl.destroy)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)

module.exports = router