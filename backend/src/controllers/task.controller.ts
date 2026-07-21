import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";


// CREATE TASK
export const createTask = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const {
            title,
            description,
            priority,
            status,
            dueDate
        } = req.body;


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


    } catch(error){

        res.status(500).json({
            message:"Create task failed"
        });

    }

};



// GET ALL TASKS
export const getTasks = async (
    req:AuthRequest,
    res:Response
)=>{

try{


const {
search,
status,
priority,
sort
}=req.query;



const tasks = await prisma.task.findMany({

where:{


userId:req.userId,


title: search
? {
contains:String(search),
mode:"insensitive"
}
:undefined,


status: status
? String(status) as any
:undefined,


priority:priority
? String(priority) as any
:undefined


},



orderBy:


sort==="oldest"

?
{
createdAt:"asc"
}


:
sort==="dueDate"

?
{
dueDate:"asc"
}


:
{
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





// GET SINGLE TASK
export const getTaskById = async(
req:AuthRequest,
res:Response
)=>{


try{


const task = await prisma.task.findFirst({

where:{
id:Number(req.params.id),
userId:req.userId
}

});


if(!task){

return res.status(404).json({
message:"Task not found"
});

}


res.json(task);



}catch(error){

res.status(500).json({
message:"Failed"
});

}

};





// UPDATE TASK
export const updateTask = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const {
            title,
            description,
            priority,
            status,
            dueDate
        } = req.body;


        const task = await prisma.task.update({

            where:{
                id:Number(req.params.id)
            },


            data:{
                title,
                description,
                priority,
                status,
                dueDate: dueDate 
                    ? new Date(dueDate)
                    : undefined
            }

        });


        res.json(task);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Update failed"
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
id:Number(req.params.id)
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