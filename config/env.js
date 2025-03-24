import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });//.env.development.local

export const { PORT, MODE_ENV, DATABASE_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_KEY } = process.env