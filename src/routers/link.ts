import router, { Router } from 'express'
import { jwtAuth } from '../middlewares/authentication'
import { createLink, getAllLinks, getLinkByShortcode } from '../controllers/linkController'

const linkRouter: Router = router()

linkRouter.get("/", jwtAuth, getAllLinks)
linkRouter.get("/:shortcode", jwtAuth, getLinkByShortcode)

linkRouter.post("/", jwtAuth, createLink)

export default linkRouter