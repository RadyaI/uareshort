import { Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '..'
import { errorRes, successRes } from '../middlewares/response'
import { compare, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_PASS } from '../secret'

export async function register(req: Request, res: Response): Promise<any> {
    try {
        const { name, email, password, role } = req.body

        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
            password: Joi.string().min(3).max(20).required(),
            role: Joi.string().valid("User", "Admin").required()
        })

        const validate = schema.validate(req.body)
        if (validate.error) return res.status(400).json({
            message: validate.error.message
        })

        const checkUser = await prisma.user.findFirst({
            where: { email }
        })
        if (checkUser) return res.status(400).json(errorRes(400, "RESOURCE_ALREADY_EXIST", `User with email ${email} already exist`))

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10),
                role
            }
        })

        res.status(201).json(successRes(201, "Register successfully", result))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}

export async function login(req: Request, res: Response): Promise<any> {
    try {
        const { email, password } = req.body

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        const validate = schema.validate(req.body)
        if (validate.error) return res.status(400).json({ message: validate.error.message })

        const result = await prisma.user.findFirst({
            where: { email }
        })
        if (!result) return res.status(404).json(errorRes(404, "RESOURCE_NOT_FOUND", `User with email ${email} does not exist!`))

        if (!(await compare(password, result.password))) return res.status(401).json(errorRes(401, "INVALID_CREDENTIAL", `Password incorrect!`))

        const token = jwt.sign({
            id: result.id,
            email: result.email,
            role: result.role
        }, JWT_PASS, { expiresIn: '5h' })

        res.status(200).json(successRes(200, "Login successfully", token))

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }
}