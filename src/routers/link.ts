import router, { Router } from 'express'
import { jwtAuth } from '../middlewares/authentication'
import { createLink, deleteLink, getAllLinks, getLinkByShortcode, updateLink } from '../controllers/linkController'

const linkRouter: Router = router()

linkRouter.get("/", jwtAuth, getAllLinks)
linkRouter.get("/:shortcode", jwtAuth, getLinkByShortcode)

linkRouter.post("/", jwtAuth, createLink)
linkRouter.put("/:shortcode", jwtAuth, updateLink)
linkRouter.delete("/:shortcode", jwtAuth, deleteLink)

export default linkRouter