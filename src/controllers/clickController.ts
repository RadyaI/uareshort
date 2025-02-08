import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'

export async function handleClick(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const code = req.params.shortcode
        let link

        const customLink = await prisma.link.findFirst({ where: { customCode: code } })
        if (customLink) link = customLink
        const shortCode = await prisma.link.findUnique({ where: { shortCode: code } })
        if (shortCode) link = shortCode

        if (!link) {
            return res.status(404).json({ link: "Not Found" })
        }
        (req as any).redirect = link

        next()
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function createAnalytic(req: Request, res: Response): Promise<any> {
    try {
        const link = (req as any).redirect
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const userAgent = req.useragent?.browser || "Unknown"
        res.redirect(link.originalUrl)


        Promise.all([
            prisma.clickAnalytic.create({
                data: {
                    ipAddress: String(ip),
                    linkId: link.id,
                    userAgent
                }
            }),
            prisma.link.update({
                where: {
                    id: link.id
                },
                data: {
                    clickCount: link.clickCount + 1
                }
            })
        ]).catch((err: any) => console.error(err.message))

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}