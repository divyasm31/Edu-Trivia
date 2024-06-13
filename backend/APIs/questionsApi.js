const exp=require('express')
// create mini express
const questionsApp = exp.Router();

//import expressAsyncHandler
const expressAsyncHandler = require('express-async-handler')
require('dotenv').config()
const axios = require('axios');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const verifyToken = require('../middlewares/verifyToken');
const googleGenerativeAI =new GoogleGenerativeAI(process.env.API_KEY);
const model=googleGenerativeAI.getGenerativeModel({model:'gemini-pro'});

async function run(topicSent, nQuestions, level) {
    const prompt = `You are a helpful assistant designed to output JSON. You are to generate random ${level} level MCQ ${nQuestions} questions about ${topicSent} and output format of each object should be {
      "question": "What dsa in computer science?",
      "correctAnswer": "Data Structures & Algorithms",
      "wrongAnswers": [
        "design structure of algorithms",
        "direct selling agent",
        "Daily Subsistence Allowance"
      ]
    } and you have to generate an array of objects consisting of ${nQuestions} ${level} level questions on the topic ${topicSent}  without extra backticks and strings answers cannot have more than 12 words`;
    
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      const parsedResponse = JSON.parse(response);
      return parsedResponse;
    } catch (err) {
      console.error("Error generating or parsing the response:", err);
      return run(topicSent, nQuestions, level); 
    }
  }
  



questionsApp.post('/questions',expressAsyncHandler(async(req,res)=>{
    
    const topicSent = req.body.topic;
    const nQuestions = req.body.noOfQuestions;
    const level = req.body.level;
  
  try {
    const output = await run(topicSent, nQuestions, level);   
    res.send({ message: "Successful", payload: output });
  } catch (err) {
     console.error("Error handling the request:", err);
    res.status(500).send({ message: "Error generating questions", error: err.message });
  }
    
      
}))

module.exports=questionsApp;













  