import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
const userRouter = Router();

// Add a GET route to get all users
userRouter.get('/',authorize,getUsers)

// Add a GET route to get a user by ID
userRouter.get('/:id',authorize,getUser)

// Add a POST route to create a new user
userRouter.post('/',(req,res)=>{ res.send({title: "User", message:"Create a new user"})})


// Add a PUT route to update a user by ID
userRouter.put('/:id',authorize,(req,res)=>{
    res.send({title: "User", message:"Update a user by ID"})
})


// Add a DELETE route to delete a user by ID
userRouter.delete('/:id',authorize,(req,res)=>{
    res.send({title: "User", message:"Delete a user by ID"})
})

export default userRouter;


