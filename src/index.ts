import express, { Express } from 'express'
import { PORT } from './secret'
import rootRouter from './routers/root'
import { PrismaClient } from '@prisma/client'
import useragent from 'express-useragent'
import { createAnalytic, handleClick } from './controllers/clickController'

const app: Express = express()
app.use(express.json())
app.use(useragent.express())

app.get("/", (req, res) => {
    res.status(200).json({ status: "working ⭐" })
})

app.use("/api/v1", rootRouter)

app.get("/:shortcode", handleClick, createAnalytic)

export const prisma = new PrismaClient()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ❤️`)
})