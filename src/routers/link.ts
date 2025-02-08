import router, {Router} from 'express'
import { jwtAuth } from '../middlewares/authentication'
import { createLink } from '../controllers/linkController'

const linkRouter: Router = router()

linkRouter.post("/", jwtAuth, createLink)

export default linkRouter