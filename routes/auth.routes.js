import { Router } from "express";

const authRouter = Router();

authRouter.post('/register',(req,res)=>{
    res.send({title: "Register", message:"Register a new user"})
})
authRouter.post('/login',(req,res)=>{
    res.send({title: "Login", message: "Login a user"})
})
authRouter.post('/logout',(req,res)=>{
    res.send({title: "Logout", message: "Logout a user"})
}
)

export default authRouter;