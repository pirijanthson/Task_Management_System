import {Response} from "express";
import {AuthRequest} from "../middleware/auth.middleware";
import prisma from "../config/prisma";


// CREATE TASK

export const createTask = async(
req:AuthRequest,
res:Response
)=>{

try{

const {
title,
description,
priority,
status,
dueDate
}=req.body;


const task = await prisma.task.create({

data:{
title,
description,
priority,
status,
dueDate:new Date(dueDate),
userId:req.userId!
}

});


res.status(201).json(task);


}catch(error){

res.status(500).json({
message:"Create task failed"
});

}

};





// GET ALL TASKS

export const getTasks = async(
req:AuthRequest,
res:Response
)=>{

try{


const tasks = await prisma.task.findMany({

where:{
userId:req.userId
},

orderBy:{
createdAt:"desc"
}

});


res.json(tasks);


}catch(error){

res.status(500).json({
message:"Get tasks failed"
});

}

};





// DELETE TASK

export const deleteTask = async(
req:AuthRequest,
res:Response
)=>{


try{


await prisma.task.delete({

where:{
id:Number(req.params.id),
}

});


res.json({
message:"Task deleted"
});


}catch(error){

res.status(500).json({
message:"Delete failed"
});

}


};