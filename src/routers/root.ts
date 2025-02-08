import router, {Router} from 'express'
import authRouter from './auth'
import linkRouter from './link'
import analyticRouter from './analytic'

const rootRouter: Router = router()

rootRouter.use("/auth", authRouter)
rootRouter.use("/link", linkRouter)
rootRouter.use("/analytic", analyticRouter)

rootRouter.use("*", (req, res) => {
    res.status(404).json({router: "Not Found"})
})

export default rootRouter