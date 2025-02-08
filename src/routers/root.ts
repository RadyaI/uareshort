import router, {Router} from 'express'
import authRouter from './auth'
import linkRouter from './link'

const rootRouter: Router = router()

rootRouter.use("/auth", authRouter)
rootRouter.use("/link", linkRouter)

rootRouter.use("*", (req, res) => {
    res.status(404).json({router: "Not Found"})
})

export default rootRouter