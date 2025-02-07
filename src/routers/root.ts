import router, {Router} from 'express'
import authRouter from './auth'

const rootRouter: Router = router()

rootRouter.use("/auth", authRouter)

export default rootRouter