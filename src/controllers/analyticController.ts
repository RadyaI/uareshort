import { Request, Response } from 'express'
import { prisma } from '..'

export async function getAnalytics(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth;

        const [listAllLink, getNewestLink, getMostClick] = await Promise.all([
            prisma.link.findMany({
                where: { userId: userData.id }
            }),
            prisma.link.findFirst({
                where: { userId: userData.id },
                orderBy: { createdAt: "desc" }
            }),
            prisma.link.findFirst({
                where: { userId: userData.id },
                orderBy: { clickCount: "desc" }
            })
        ]);

        let totalClick = 0;
        listAllLink.map((data) => {
            totalClick += data.clickCount
        })

        res.json({
            totalLink: listAllLink.length,
            totalClick,
            newestLink: getNewestLink,
            mostClicked: { ...getMostClick },
            allLink: listAllLink
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
