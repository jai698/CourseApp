const {Router} =  require("express");

const courseRouter = Router();

courseRouter.post('/purchase',async function(req,res)  {
    res.json({
        message:"done"
    })
});

courseRouter.post('/preview',async function(req,res)  {
    res.json({
        message:"done"
    })
});


module.exports = {
    courseRouter:courseRouter,
}