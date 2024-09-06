import express from "express"
import userController from "../controller/userController.js"
import { middleware } from "../utilis/middleware.js"

const router = express.Router()

router.post("/signUp", userController.signUp)
router.post("/login", userController.login)
router.get("/userProfile/:id",middleware, userController.userProfile)

export default router