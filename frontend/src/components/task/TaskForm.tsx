import { useEffect, useState } from "react";

import {
    createTask,
    updateTask
} from "../../services/task.service";


interface Task {

    id:number;
    title:string;
    description:string;
    priority:string;
    status:string;
    dueDate:string;

}


interface TaskFormProps {

    task?:Task | null;

    onClose:()=>void;

    onSuccess:()=>void;

}



export default function TaskForm({

    task,

    onClose,

    onSuccess

}:TaskFormProps){



const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [priority,setPriority]=useState("MEDIUM");

const [status,setStatus]=useState("PENDING");

const [dueDate,setDueDate]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);





useEffect(()=>{


    if(task){

        setTitle(task.title);

        setDescription(task.description || "");

        setPriority(task.priority);

        setStatus(task.status);

        setDueDate(
            task.dueDate.split("T")[0]
        );

    }


},[task]);






const handleSubmit = async(
    e:React.FormEvent
)=>{


e.preventDefault();



if(!title){

    setError("Title is required");

    return;

}


if(!dueDate){

    setError("Due date is required");

    return;

}



try{


setLoading(true);



const data={

    title,

    description,

    priority,

    status,

    dueDate

};





if(task){


    await updateTask(
        task.id,
        data
    );


}
else{


    await createTask(data);


}




onSuccess();

onClose();



}catch(error){


console.log(error);

setError(
    "Operation failed"
);


}
finally{

setLoading(false);

}


};




return (

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<form

onSubmit={handleSubmit}

className="
bg-white
rounded-xl
shadow-xl
p-8
w-full
max-w-lg
"


>


<h2 className="text-2xl font-bold mb-6">

{
task
?
"Update Task"
:
"Create Task"
}

</h2>




{
error &&

<p className="text-red-600 mb-4">

{error}

</p>

}




<input

className="w-full border rounded-lg p-3 mb-4"

placeholder="Title"

value={title}

onChange={
(e)=>setTitle(e.target.value)
}

/>





<textarea

className="w-full border rounded-lg p-3 mb-4"

placeholder="Description"

value={description}

onChange={
(e)=>setDescription(e.target.value)
}

/>





<select

className="w-full border rounded-lg p-3 mb-4"

value={priority}

onChange={
(e)=>setPriority(e.target.value)
}

>

<option value="LOW">
LOW
</option>


<option value="MEDIUM">
MEDIUM
</option>


<option value="HIGH">
HIGH
</option>


</select>





<select

className="w-full border rounded-lg p-3 mb-4"

value={status}

onChange={
(e)=>setStatus(e.target.value)
}

>


<option value="PENDING">
PENDING
</option>


<option value="IN_PROGRESS">
IN_PROGRESS
</option>


<option value="COMPLETED">
COMPLETED
</option>


</select>





<input

type="date"

className="w-full border rounded-lg p-3 mb-6"

value={dueDate}

onChange={
(e)=>setDueDate(e.target.value)
}

/>





<div className="flex justify-end gap-3">


<button

type="button"

onClick={onClose}

className="bg-gray-300 px-5 py-2 rounded-lg"

>

Cancel

</button>



<button

disabled={loading}

className="bg-blue-600 text-white px-5 py-2 rounded-lg"

>

{
loading
?
"Saving..."
:
task
?
"Update"
:
"Create"
}

</button>


</div>



</form>


</div>

);


}