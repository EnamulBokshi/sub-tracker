import { Router } from "express";

const userRouter = Router();

// Add a GET route to get all users
userRouter.get('/',(req,res)=>{
    res.send({title: "User", message:"Get all users"})
})
// Add a GET route to get a user by ID
userRouter.get('/:id',(req,res)=>{
    req.body
    res.send({title: "User", message:"Get a user by ID"})
})
// Add a POST route to create a new user
userRouter.post('/',(req,res)=>{
    res.send({title: "User", message:"Create a new user"})
})
// Add a PUT route to update a user by ID
userRouter.put('/:id',(req,res)=>{
    res.send({title: "User", message:"Update a user by ID"})
})
// Add a DELETE route to delete a user by ID
userRouter.delete('/:id',(req,res)=>{
    res.send({title: "User", message:"Delete a user by ID"})
})

export default userRouter;


