// import express 
const exp=require('express')
// create mini express
const userApp = exp.Router();

//import expressAsyncHandler
const expressAsyncHandler = require('express-async-handler')



// get userscollection apln level middleware
let userscollection;
let dsacollection;
let oscollection;
let dbmscollection;
let javacollection;
let hcjcollection;
let rncollection;
userApp.use((req,res,next)=>{
    userscollection = req.app.get('userscollection')
    dsacollection = req.app.get('dsacollection')
    oscollection = req.app.get('oscollection')
    dbmscollection = req.app.get('dbmscollection')
    javacollection = req.app.get('javacollection')
    hcjcollection = req.app.get('hcjcollection')
    rncollection = req.app.get('rncollection')
    next()
})

const verifyToken = require('../middlewares/verifyToken')
// import bcryptjs
const bcryptjs = require('bcryptjs')
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// making post request for register
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    let newUser = req.body;
    const checkUser = await userscollection.findOne({username:newUser.username})
    if(checkUser!=null){
        res.send({message:"User with th username already exists"})
    }else{
        const hashedPassword = await bcryptjs.hash(newUser.password,8)
        newUser.password = hashedPassword;
        let sc = 0;
        await userscollection.insertOne({username:newUser.username,password:newUser.password,email:newUser.email,score:sc,correctAnswers:0,wrongAnswers:0});
        await dsacollection.insertOne({username:newUser.username,score:0,correctAnswers:0,wrongAnswers:0})
        await oscollection.insertOne({username:newUser.username,score:0,correctAnswers:0,wrongAnswers:0})
        await dbmscollection.insertOne({username:newUser.username,score:0,correctAnswers:0,wrongAnswers:0})
        await javacollection.insertOne({username:newUser.username,score:0,correctAnswers:0,wrongAnswers:0})
        await hcjcollection.insertOne({username:newUser.username,score:0,correctAnswers:0,wrongAnswers:0})
        await rncollection.insertOne({username:newUser.username,score:0,correctAnswers:0,wrongAnswers:0})
        res.send({message:"User created"})
    }
}))

// making post request for login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    let user = req.body;
    // console.log(user)
    const dbUser = await userscollection.findOne({username:user.username});
    // console.log(dbUser)
    if(dbUser===null){
        res.send({message:"Invalid username"})
    }else{
        const status = await bcryptjs.compare(user.password,dbUser.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            const signedToken = jwt.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:"1d"})
            res.send({message:"Login successful",token:signedToken,user:dbUser})
        }
    }
}))

// edit user details
userApp.put('/edit/:name',expressAsyncHandler(async(req,res)=>{
    const user = req.params.name;
    // console.log(user)
    const userObj = req.body;
    // console.log(userObj);
    const dbObj = await userscollection.findOne({username:user})
    if(dbObj!==null){
    if(userObj.password!==''){
    const hashedPassword = await bcryptjs.hash(userObj.password,8)
    dbObj.password = hashedPassword;
    }
    if(userObj.email!==''){
    dbObj.email = userObj.email;
    }
    // console.log(dbObj)
    await userscollection.updateOne({username:user},{$set:dbObj})
    res.send({message:"User updated"})}
    else{
        res.send({message:"user not found"});
    }
}))




//updating the scores in the respective collection
userApp.put('/score/:name',expressAsyncHandler(async(req,res)=>{
    
    // send the score after updation only
    const reqBody = req.body
    // console.log(reqBody)
    const user=req.params.name;
     let dbUser = await userscollection.findOne({username:user});
     let sc=Number(reqBody.addScore);
    //   console.log(sc)
     let totalQuestions=Number(reqBody.addQuestions);
    //   console.log(totalQuestions)
     let scoreToAdd=(sc/totalQuestions)*10;
    //   console.log(scoreToAdd)
     let newScore=Math.floor((scoreToAdd)+(dbUser.score));
    //   console.log(newScore)
    let newCorrectAns=(Number(reqBody.addCorrectAns))+(dbUser.correctAnswers);
    let newWrongAns=(Number(reqBody.addWrongAns))+(dbUser.wrongAnswers);
    await userscollection.updateOne({username:user},{$set:{score:newScore,correctAnswers:newCorrectAns,wrongAnswers:newWrongAns}});
    if(reqBody.module==='Data Structures & Algorithms'){
        let existingScore=await dsacollection.findOne({username:user});
        let afterAdding=Math.floor((existingScore.score) + scoreToAdd)
        let afterAddCA=(Number(reqBody.addCorrectAns))+(existingScore.correctAnswers);
        let afterAddWA=(Number(reqBody.addWrongAns))+(existingScore.wrongAnswers);
        await dsacollection.updateOne({username:user},{$set:{score:afterAdding,correctAnswers:afterAddCA,wrongAnswers:afterAddWA}});
        res.send({message:"score updated",payload:afterAdding})
    }
    else if(reqBody.module==='Operating Systems'){
        let existingScore=await oscollection.findOne({username:user});
        let afterAdding=Math.floor((existingScore.score) + scoreToAdd)
        let afterAddCA=(Number(reqBody.addCorrectAns))+(existingScore.correctAnswers);
        let afterAddWA=(Number(reqBody.addWrongAns))+(existingScore.wrongAnswers);
        await oscollection.updateOne({username:user},{$set:{score:afterAdding,correctAnswers:afterAddCA,wrongAnswers:afterAddWA}})
        res.send({message:"score updated",payload:afterAdding})
    }
    else if(reqBody.module==='Database Management System'){
        let existingScore=await dbmscollection.findOne({username:user});
        let afterAdding=Math.floor((existingScore.score) + scoreToAdd)
        let afterAddCA=(Number(reqBody.addCorrectAns))+(existingScore.correctAnswers);
        let afterAddWA=(Number(reqBody.addWrongAns))+(existingScore.wrongAnswers);
        await dbmscollection.updateOne({username:user},{$set:{score:afterAdding,correctAnswers:afterAddCA,wrongAnswers:afterAddWA}})
        res.send({message:"score updated",payload:afterAdding})
    }
    else if(reqBody.module==='Java'){
        let existingScore=await javacollection.findOne({username:user});
        let afterAdding=Math.floor((existingScore.score) + scoreToAdd)
        let afterAddCA=(Number(reqBody.addCorrectAns))+(existingScore.correctAnswers);
        let afterAddWA=(Number(reqBody.addWrongAns))+(existingScore.wrongAnswers);
        await javacollection.updateOne({username:user},{$set:{score:afterAdding,correctAnswers:afterAddCA,wrongAnswers:afterAddWA}})
        res.send({message:"score updated",payload:afterAdding})
    }
    else if(reqBody.module==='HTML CSS & Javascript'){
        let existingScore=await hcjcollection.findOne({username:user});
        let afterAdding=Math.floor((existingScore.score) + scoreToAdd)
        let afterAddCA=(Number(reqBody.addCorrectAns))+(existingScore.correctAnswers);
        let afterAddWA=(Number(reqBody.addWrongAns))+(existingScore.wrongAnswers);
        await hcjcollection.updateOne({username:user},{$set:{score:afterAdding,correctAnswers:afterAddCA,wrongAnswers:afterAddWA}})
        res.send({message:"score updated",payload:afterAdding})
    }
    else if(reqBody.module==='Reactjs & Nodejs'){
        let existingScore=await rncollection.findOne({username:user});
        let afterAdding=Math.floor((existingScore.score) + scoreToAdd)
        let afterAddCA=(Number(reqBody.addCorrectAns))+(existingScore.correctAnswers);
        let afterAddWA=(Number(reqBody.addWrongAns))+(existingScore.wrongAnswers);
        await rncollection.updateOne({username:user},{$set:{score:afterAdding,correctAnswers:afterAddCA,wrongAnswers:afterAddWA}})
        res.send({message:"score updated",payload:afterAdding})
    }
}))

userApp.get('/answers/:module',expressAsyncHandler(async(req,res)=>{
    const mdle=req.params.module;
    // console.log(mdle)
    if(mdle==='overall'){
        let result=await userscollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
        // console.log(result)
        if(result!==null){
            res.send({message:"Data Received",payload:result})
        }else{
            res.send({message:"No users found"})
        }}
        
        else if(mdle==='dsa'){
            let result=await dsacollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
            // console.log(result)
            if(result!==null){
                res.send({message:"Data Received",payload:result})
            }else{
                res.send({message:"No users found"})
            }}
            else if(mdle==='os'){
                let result=await oscollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
                // console.log(result)
                if(result!==null){
                    res.send({message:"Data Received",payload:result})
                }else{
                    res.send({message:"No users found"})
                }}
            else if(mdle==='dbms'){
                    let result=await dbmscollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
                    // console.log(result)
                    if(result!==null){
                        res.send({message:"Data Received",payload:result})
                    }else{
                        res.send({message:"No users found"})
            }}
            else if(mdle==='java'){
                let result=await javacollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
                // console.log(result)
                if(result!==null){
                    res.send({message:"Data Received",payload:result})
                }else{
                    res.send({message:"No users found"})
            }}
            else if(mdle==='hcj'){
                let result=await hcjcollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
                // console.log(result)
                if(result!==null){
                    res.send({message:"Data Received",payload:result})
                }else{
                    res.send({message:"No users found"})
            }}
            else if(mdle==='rn'){
                let result=await rncollection.find({},{projection:{username:1,score:1,correctAnswers:1,wrongAnswers:1,_id:0}}).toArray();
                // console.log(result)
                if(result!==null){
                    res.send({message:"Data Received",payload:result})
                }else{
                    res.send({message:"No users found"})
            }}
}))
userApp.get('/:theScoresOf',expressAsyncHandler(async(req,res)=>{
    let mdle=req.params.theScoresOf;
    if(mdle==='overallscores'){
    let result=await userscollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
    // console.log(result)
    if(result!==null){
        res.send({message:"Data Received",payload:result})
    }else{
        res.send({message:"No users found"})
    }}
    else if(mdle==='dsascores'){
        let result=await dsacollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
        // console.log(result)
        if(result!==null){
            res.send({message:"Data Received",payload:result})
        }else{
            res.send({message:"No users found"})
        }}
        else if(mdle==='osscores'){
            let result=await oscollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
            // console.log(result)
            if(result!==null){
                res.send({message:"Data Received",payload:result})
            }else{
                res.send({message:"No users found"})
            }}
        else if(mdle==='dbmsscores'){
                let result=await dbmscollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
                // console.log(result)
                if(result!==null){
                    res.send({message:"Data Received",payload:result})
                }else{
                    res.send({message:"No users found"})
        }}
        else if(mdle==='javascores'){
            let result=await javacollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
            // console.log(result)
            if(result!==null){
                res.send({message:"Data Received",payload:result})
            }else{
                res.send({message:"No users found"})
        }}
        else if(mdle==='hcjscores'){
            let result=await hcjcollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
            // console.log(result)
            if(result!==null){
                res.send({message:"Data Received",payload:result})
            }else{
                res.send({message:"No users found"})
        }}
        else if(mdle==='rnscores'){
            let result=await rncollection.find({},{projection:{username:1,score:1,_id:0}}).toArray();
            // console.log(result)
            if(result!==null){
                res.send({message:"Data Received",payload:result})
            }else{
                res.send({message:"No users found"})
        }}
}))


//export mini express application
module.exports = userApp;