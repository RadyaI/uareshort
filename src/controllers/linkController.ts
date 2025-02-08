import { Request, Response } from "express";
import Joi from "joi";
import { prisma } from "..";
import { errorRes, successRes } from "../utils/response";
import { randomString } from "../utils/shortcode";

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