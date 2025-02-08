import router, {Router} from 'express'
import authRouter from './auth'
import linkRouter from './link'

const rootRouter: Router = router()

rootRouter.use("/auth", authRouter)
rootRouter.use("/link", linkRouter)

export default rootRouter