import express, { Express } from 'express'
import { PORT } from './secret'
import rootRouter from './routers/root'
import { PrismaClient } from '@prisma/client'

const app: Express = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ status: "working ⭐" })
})

app.use("/api/v1", rootRouter)

export const prisma = new PrismaClient()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ❤️`)
})