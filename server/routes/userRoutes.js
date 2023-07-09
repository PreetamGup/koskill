const router= require('express').Router()
const {loginController, registerController} = require("../controller/userController")


router.post("/login",loginController);
router.post("/register",registerController);


module.exports= router