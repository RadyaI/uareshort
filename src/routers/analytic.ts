import router, { Router } from "express";
import { jwtAuth } from "../middlewares/authentication";
import { getAnalytics } from "../controllers/analyticController";

const analyticRouter: Router = router()

analyticRouter.get("/", jwtAuth, getAnalytics)

export default analyticRouter