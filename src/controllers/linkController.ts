import { Request, Response } from "express";
import Joi, { valid } from "joi";
import { prisma } from "..";
import { errorRes, successRes } from "../utils/response";
import { randomString } from "../utils/shortcode";

export async function getAllLinks(req: Request, res: Response): Promise<any> {
    try {
        const userData = (req as any).auth
        const result = await prisma.link.findMany({ where: { userId: userData.id } })
        if (result.length === 0) return res.status(200).json(successRes(200, "Record empty", result))
        res.status(200).json(successRes(200, "Data fetched successfully", result))
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getLinkByShortcode(req: Request, res: Response): Promise<any> {
    try {
        const shortcode = req.params.shortcode
        const userData = (req as any).auth

        const result = await prisma.link.findUnique({
            where: {
                shortCode: shortcode,
            }
        })

        if (!result) return res.status(404).json(errorRes(404, "RESOURCE_NOT_FOUND", `Link with shortcode ${shortcode} does not exist!`))

        if (result?.userId !== Number(userData.id)) {
            return res.status(403).json(errorRes(403, "FORBIDDEN_CONTENT", "Not your link!"))
        }
        res.status(200).json(successRes(200, "Data fetched successfully", result))

    } catch (error: any) {

    }
}

export async function createLink(req: Request, res: Response): Promise<any> {
    try {
        const { linkName, originalUrl, customCode } = req.body
        const userData = (req as any).auth

        const schema = Joi.object({
            linkName: Joi.string().min(3).max(30).required(),
            originalUrl: Joi.string().required(),
            customCode: Joi.string()
        })

        const validate = schema.validate(req.body)
        if (validate.error) return res.status(400).json({ message: validate.error.message })

        if (customCode) {
            const check = await prisma.link.findFirst({ where: { customCode } })
            if (check) return res.status(400).json(errorRes(404, "RESOURCE_ALREADY_EXIST", `Custom link "${customCode}" already exist`))
        }

        const result = await prisma.link.create({
            data: {
                userId: userData.id,
                linkName,
                originalUrl,
                shortCode: randomString(),
                customCode,
            }
        })

        res.status(201).json(successRes(201, "Data added successfully", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function updateLink(req: Request, res: Response): Promise<any> {
    try {
        const { linkName, originalUrl, customCode } = req.body
        const shortcode = req.params.shortcode
        const userData = (req as any).auth

        const schema = Joi.object({
            linkName: Joi.string().min(3).max(30),
            originalUrl: Joi.string(),
            customCode: Joi.string().max(3).max(20)
        })

        const validate = schema.validate(req.body)

        if (validate.error) return res.status(400).json({ message: validate.error.message })

        try {
            const result = await prisma.link.update({
                where: {
                    shortCode: shortcode,
                    userId: userData.id
                },
                data: {
                    linkName,
                    originalUrl,
                    customCode
                }
            })

            res.status(200).json(successRes(200, "Update successfully", result))
        } catch (error: any) {
            res.status(404).json(errorRes(404, "RESOURCE_NOT_FOUND", `Link with userId ${userData.id} and shortCode ${shortcode} does not exist!`))
        }

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteLink(req: Request, res: Response): Promise<any> {
    try {
        const shortcode = req.params.shortcode
        const userData = (req as any).auth

        try {
            await prisma.link.delete({
                where: {
                    shortCode: shortcode,
                    userId: userData.id
                }
            })

            res.status(200).json(successRes(200, "Deleted successfullt", null))
        } catch (error: any) {
            res.status(404).json(errorRes(404, "RESOURCE_NOT_FOUND", `Link with userId ${userData.id} and shortCode ${shortcode} does not exist!`))
        }

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}