//import express application
const exp=require('express')
//create express application
const app=exp()
//import dotenv and call config method
require('dotenv').config()
//import path core module
const path = require('path');
//deploy react build on this server
app.use(exp.static(path.join(__dirname,'../frontend/build')))

//parse the body of request object
 app.use(exp.json());
 
 

//import mini express application
const userApp=require('./APIs/userApi')
const questionsApp=require('./APIs/questionsApi');
//if path is user-api direct the request to userApp
app.use('/user-api',userApp);
app.use('/questions-api',questionsApp)


//create mongoclient
const mongoClient = require('mongodb').MongoClient;
//connect to the database server
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const edudb = client.db('edudb')
    //get collection objects share the collection obj with express app
    const userscollection = edudb.collection('userscollection')
    app.set('userscollection',userscollection)
    const dsacollection = edudb.collection('dsacollection')
    app.set('dsacollection',dsacollection)
    const oscollection = edudb.collection('oscollection')
    app.set('oscollection',oscollection)
    const dbmscollection = edudb.collection('dbmscollection')
    app.set('dbmscollection',dbmscollection)
    const javacollection = edudb.collection('javacollection')
    app.set('javacollection',javacollection)
    const hcjcollection = edudb.collection('hcjcollection')
    app.set('hcjcollection',hcjcollection)
    const rncollection = edudb.collection('rncollection')
    app.set('rncollection',rncollection)
    console.log('DB successfully connected')
})
.catch((err)=>{
    console.log(err)
})
//to allow refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})
//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err});
})
const port = process.env.PORT || 5000;
//assigning the port no to the express application
app.listen(port,()=>console.log(`Web server running on port ${port}....`));
