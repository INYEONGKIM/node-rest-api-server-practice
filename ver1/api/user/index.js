/* 이곳에서는 routing 만 수행, control 함수는 따로 뺌 */

const express = require('express')
const router = express.Router()
const ctrl = require('./user.ctrl')

// /user 는 이미 설정 완료
router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.delete('/:id', ctrl.destroy)
router.post('/', ctrl.create)

module.exports = router