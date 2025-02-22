const express= require('express')
const router = express.Router();

const {signup, login, getMe, forgotPassword, resetPassword} =require('../controllers/auth')
const {protect} = require('../middleware/auth')

router.post('/signup',signup)

router.post('/login',login)

router.get('/me',protect,getMe)

router.post('/forgotPassword',forgotPassword)

router.put('/resetPassword',resetPassword)

module.exports = router;