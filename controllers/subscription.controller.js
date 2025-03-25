import { SERVER_URL } from "../config/env.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) =>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        // await workflowClient.trigger({
        //     url:`${SERVER_URL}/api/v1/workflows/subscripton/reminder`,
        //     body:{
        //         subscriptionId: subscription._id

        //     },
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     retries: 0,
        // })
        res.status(201).json({
            success: true,
            data: {
                subscription,
                // workflowRunId
            }
        })
        
    } catch (error) {
        next(error)
    }
}