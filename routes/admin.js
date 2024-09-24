const {Router} =  require("express");
const { userModel, purchaseModel, courseModel, adminModel } = require("../db");
const bcrypt = require('bcrypt');
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const JWT_ADMIN = "dasdsdasdasdasdadasd"
const {adminMiddleware} = require("../middleware/adminMiddleware")

const adminRouter = Router();

adminRouter.post('/signup',async function(req,res)  {
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
        await adminModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName,
        });
        res.json({
            message:"admin signup success"
        })
    }catch(e){
        res.status(404).json({
            message:"invalid credentials",
            error: e.message
        });
    }
});

adminRouter.post('/login',async function(req,res)  {
    try{
        const {email,password} = req.body;
    const response = await adminModel.findOne({
        email:email,
    });
    const isPassword = bcrypt.compare(password,response.password);
    if(isPassword){
        const token = jwt.sign({
            id:response._id
        },JWT_ADMIN)
        res.json({
            token:token
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

adminRouter.post('/course',adminMiddleware,async function(req,res)  {
    try{
        const {title,description,price} = req.body
        const adminId = req.admin_id;
        const course = await courseModel.create({
            title:title,
            description:description,
            price:price,
            creatorId:adminId
        })
        res.json({
            message:"course added",
            courseId: course._id
        })
    }catch(e){
        res.status(400).json({
            message:"error",
            error: e.message
        });
    }
});

adminRouter.post('/updateCourses',async function(req,res)  {
    const adminId = req.admin_id;

    const { title, description, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
});

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.admin_id;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})


module.exports = {
    adminRouter:adminRouter,
}