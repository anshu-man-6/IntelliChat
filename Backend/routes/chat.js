
import express from "express";
import Thread from "../model/Thread.js"
import { generateResponse } from "../APIcall.js";

const router=express.Router();

//test 
router.post("/test",async(req,res)=>{
    try {
      
      const thread=new Thread({
        threadId:"xys",
        title:"New one",
      });

      const response=await thread.save();
      res.send(response);


    } catch (error) {
      console.log(error);
       res.status(500).json({message:"Failed "})
    }
})




// get all threads

router.get("/thread",async(req,res)=>{

  try {
   
    const allthreads= await Thread.find({}).sort({updatedAt:-1});    // descending order on updatedAT

    res.json(allthreads);




    
  } catch (error) {
    
   console.log(error);
   res.status(500).json({message:"Failed to fetch any thread"});

  }

})



// get specific thread

router.get("/thread/:threadId",async (req,res)=>{
  
    const {threadId}=req.params;
  
  try {

      
    
          const thread=  await  Thread.findOne({threadId});

          if(!thread){
           res.status(404).json({error:"thread is not found"});
          }

          res.json(thread.messages)


        
       } catch (error) {
          console.log(error);
          res.status(500).json({error:"Failed to fetch the thread"});
       }
})


// delete thread

router.delete("/thread/:threadId",async (req,res)=>{
  
    const {threadId}=req.params;
  
  try {

      
    
          const thread=  await  Thread.findOneAndDelete({threadId});

          if(!thread){
           res.status(404).json({error:"thread is not found"});
          }

          
         res.status(200).json({success:"thread is deleted successfully"});

        
       } catch (error) {
          console.log(error);
          res.status(500).json({error:"Failed to delete the thread"});
       }
})

// for chat with ai assistent

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  // Validate input
  if (!threadId || !message) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      // Create new thread
      thread = new Thread({
        threadId,
        title: message,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      // Save user message
      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    // Generate AI reply
    const assistantReply = await generateResponse(message);

    // Save assistant reply
    thread.messages.push({
      role: "assistant", // fixed spelling
      content: assistantReply,
    });

    thread.updatedAt = new Date();

    await thread.save();

    return res.json({
      reply: assistantReply,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});



export default router;