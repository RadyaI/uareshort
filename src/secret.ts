import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const JWT_PASS = process.env.JWT_PASSWORD!