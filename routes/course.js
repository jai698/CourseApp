const {Router} =  require("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const courseRouter = Router();

courseRouter.post('/purchase',userMiddleware,async function(req,res)  {
    const userId = req.user_id;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
});

courseRouter.post('/preview',async function(req,res)  {
    const courses = await courseModel.find({});

    res.json({
        courses
    })
});


module.exports = {
    courseRouter:courseRouter,
}