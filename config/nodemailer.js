
import nodemailer from 'nodemailer'
import { EMAIL, GMAIL_PASSWORD } from './env'
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: EMAIL,
        pass: GMAIL_PASSWORD
    }
})