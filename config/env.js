import { config } from "dotenv";

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});//.env.development.local

export const {PORT, MODE_ENV} = process.env