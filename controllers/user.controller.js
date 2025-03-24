import User from "../models/user.model.js";
import aj from "../config/arcjet.js";
import {isSpoofedBot} from "@arcjet/inspect"

export const getUsers = async (req, res, next) => {
    
    try {

        
    

        const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
        
          console.log("Arcjet decision", decision);
        
        
          if (decision.isDenied()) {
        
            if (decision.reason.isRateLimit()) {
        
              res.writeHead(429, { "Content-Type": "application/json" });
        
              res.end(JSON.stringify({ error: "Too Many Requests" }));
        
            } else if (decision.reason.isBot()) {
        
              res.writeHead(403, { "Content-Type": "application/json" });
        
              res.end(JSON.stringify({ error: "No bots allowed" }));
        
            } else {
        
              res.writeHead(403, { "Content-Type": "application/json" });
        
              res.end(JSON.stringify({ error: "Forbidden" }));
        
            }
        
          } else if (decision.results.some(isSpoofedBot)) {
        
            // Arcjet Pro plan verifies the authenticity of common bots using IP data.
        
            // Verification isn't always possible, so we recommend checking the decision
        
            // separately.
        
            // https://docs.arcjet.com/bot-protection/reference#bot-verification
        
            res.writeHead(403, { "Content-Type": "application/json" });
        
            res.end(JSON.stringify({ error: "Forbidden" }));
        
          } else {
        
            res.writeHead(200, { "Content-Type": "application/json" });
        
            const users = await User.find().select('-password');
            res.status(200).json({
                success: true,
                data: users
        })
        
          }

    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}