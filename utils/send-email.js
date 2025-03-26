import dayjs from "dayjs";
import { emailTemplates } from "./email.template";
import { EMAIL } from "../config/env.js";
import { transporter } from "../config/nodemailer.js";

export const sendReminderEmail = async ({to, type, subscription}) => {
    if (!to || !type){
        throw new Error("Email and type are required");
    }

    const template =  emailTemplates.find(t => t.label === type);
    if (!template){
        throw new Error("Invalid email type");
    }

    const mailInfo = {
        userName : subscription.user.name,
        subscriptionName: subscription.name,   
        planName: subscription.plan.name,
        renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYY"),
        price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
        paymentMethod: subscription.paymentMethod,
    }
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: EMAIL,
        to,
        subject,
        html:message
    }
    transporter.sendMail(mailOptions, (error,info) => {
        if (error){
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }   
    })
}