import { ARCJET_KEY } from "./env.js";
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "DRY_RUN",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:MONITOR",
                "CATEGORY:PREVIEW",
                "USER_AGENT:PostmanRuntime/7.43.2" // Add Postman's user agent
            ]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        })
    ]
})

export default aj;