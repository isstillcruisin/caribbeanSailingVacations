const router = require('express').Router()
const userController = require('../../controllers/userController')

router.route('/signin').post(userController.signin)

router.route('/signup').post(userController.signup)

router.route('/confirmation/:id').get(userController.confirm)

router.route('/current').get(userController.currentUser)

router.route('/resetpasswordemail').post(userController.resetPasswordEmail)

router.route('/resetpassword').post(userController.resetPassword)

router.route('/update').post(userController.update)

module.exports = router
