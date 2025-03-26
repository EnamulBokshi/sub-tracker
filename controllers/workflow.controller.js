import {createRequire} from 'module';
import dayjs from 'dayjs';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express')
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';
import { subscribe } from 'diagnostics_channel';

const REMINDER = [7,3,1]


export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await getSubscription(context, subscriptionId);

    if(!subscription ||  subscription.status !== 'active'){
        return;
    }
    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal Date for subscription ${subscriptionId} has passed`);
        return;
    }
    for(const days of REMINDER){
        const reminderDate = renewalDate.subtract(days, 'day');
        if(reminderDate.isAfter(dayjs())){
            // need to sleep until reminder date
            await sleepUntilReminder(context, `reminder ${days} days before`,reminderDate);
        }

        await triggerReminder(context, `${days} Day Before Renewal`,subscription);

    }
    // 22 march 2025
    // 15 march 2025
    // 21 march 2025
    // 22 march 2025

});

const getSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', ()=>{
        return Subscription.findById(subscriptionId).polulate('user','name email');
    })
}

const sleepUntilReminder =  async (context,label, date) =>{
    console.log(`Sleeping until ${label} reminder at ${data}`)
    await context.sleepUntil(label, data.toDate());

}


const triggerReminder = async (context, label,subscription) =>{
    return await context.run(label,async () => {
        console.log(`Sending ${label} reminder`);
        // Send reminder email, sms, push notification
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription            
        })

    })
}