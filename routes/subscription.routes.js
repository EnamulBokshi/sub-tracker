import { Router } from "express";

const subscriptionRouter = Router();

// Add a GET route to get all subscriptions
subscriptionRouter.get('/',(req,res)=>res.send({title: "Subscription", message:"Get all subscriptions"}));

// Add a GET route to get a subscription by ID
subscriptionRouter.get('/:id',(req,res)=> res.send({title: "Subscription", message:"Get a subscription by ID", id: req.params.id}));

// Add a POST route to create a new subscription
subscriptionRouter.post('/',(req,res)=>res.send({title: "Subscription",message:"Create a new subscription"}));

// Add a PUT route to update a subscription by ID
subscriptionRouter.put('/:id',(req,res)=>res.send({title: "Subscription", message:"Update a subscription by ID"}));

// Add a DELETE route to delete a subscription by ID
subscriptionRouter.delete('/:id',(req,res)=>res.send({title: "Subscription", message:"Delete a subscription by ID"}));

// Add a GET route to get all subscriptions by user ID
subscriptionRouter.get('/user/:id',(req,res)=>res.send({title: "Subscription", message:"Get all subscriptions by user ID"}));


//Add a PUT route to cancle a subscription by ID
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title: "Subscription", message:"Cancel a subscription by ID"}));

//Add a PUT route to renew a subscription by ID
subscriptionRouter.get('/:id/renew',(req,res)=>res.send({title: "Subscription", message:"Renew a subscription by ID"}));

//Add a GET route to get upcoming renewals
subscriptionRouter.get('/upcoming-renewals',(req,res)=>res.send({title: "Subscription", message:"Get upcoming renewals"}));

export default subscriptionRouter;