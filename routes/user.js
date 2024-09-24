const {Router} =  require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();
const bcrypt = require('bcrypt');
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const JWT_USER = "dasdsadasd"

userRouter.post('/signup',async function(req,res)  {
    //zod
    const reqBody = z.object({
        email:z.string().max(20),
        password:z.string(),
        firstName:z.string().max(20),
        lastName:z.string().max(20),
    });
    const parseData = reqBody.safeParse(req.body);
    if(!parseData.success){
        res.json({
            message:"input validation failed",
            errors: parseData.error.errors,
        })
        return;
    }


    const { email, password, firstName, lastName } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,4);
        await userModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName,
        });
        res.json({
            message:"user signup success"
        })
    }catch(e){
        res.status(404).json({
            message:"invalid credentials",
            error: e.message
        });
    }
});

userRouter.post('/login',async function(req,res)  {
    const {email,password} = req.body;
    try{
        const response = await userModel.findOne({
            email:email
        });
    
        const isPasswordMatched = await bcrypt.compare(password,response.password);
    
        if(isPasswordMatched){
            const token = jwt.sign({
                id:response._id.toString()
            },JWT_USER);
            res.json({
                token:token,
            })
        }
        else{
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }
    }catch(e){
        res.status(500).json({
            message:"error",
            error: e.message
        });
    }
});

userRouter.post('/purchases',async function(req,res)  {
    
});

module.exports = {
    userRouter:userRouter,
}