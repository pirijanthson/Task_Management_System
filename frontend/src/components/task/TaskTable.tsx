import { FaEdit, FaTrash } from "react-icons/fa";


interface Task {

    id:number;
    title:string;
    description:string;
    priority:string;
    status:string;
    dueDate:string;

}


interface TaskTableProps {

    tasks:Task[];

    onEdit:(task:Task)=>void;

    onDelete:(id:number)=>void;

}



export default function TaskTable({

    tasks,

    onEdit,

    onDelete

}:TaskTableProps){


return (

<div className="bg-white rounded-xl shadow-md overflow-hidden">


<table className="w-full">


<thead className="bg-slate-100">


<tr>


<th className="p-4 text-left">
Title
</th>


<th className="p-4 text-left">
Priority
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4 text-left">
Due Date
</th>


<th className="p-4 text-center">
Actions
</th>


</tr>


</thead>



<tbody>


{
tasks.length === 0 ? (

<tr>

<td
colSpan={5}
className="text-center p-8 text-gray-500"
>

No tasks found

</td>

</tr>


)

:

(

tasks.map((task)=>(


<tr
key={task.id}
className="border-t hover:bg-slate-50"
>


<td className="p-4">


<div className="font-semibold">

{task.title}

</div>


<p className="text-sm text-gray-500">

{task.description}

</p>


</td>



<td className="p-4">


<span
className={`px-3 py-1 rounded-full text-sm font-medium

${
task.priority==="HIGH"
?
"bg-red-100 text-red-700"
:
task.priority==="MEDIUM"
?
"bg-yellow-100 text-yellow-700"
:
"bg-green-100 text-green-700"

}

`}
>

{task.priority}

</span>


</td>




<td className="p-4">


<span
className={`px-3 py-1 rounded-full text-sm font-medium

${
task.status==="COMPLETED"
?
"bg-green-100 text-green-700"
:
task.status==="IN_PROGRESS"
?
"bg-blue-100 text-blue-700"
:
"bg-gray-100 text-gray-700"

}

`}
>

{task.status}

</span>


</td>



<td className="p-4">

{
new Date(task.dueDate)
.toLocaleDateString()
}

</td>



<td className="p-4">


<div className="flex justify-center gap-3">


<button

onClick={()=>onEdit(task)}

className="text-blue-600 hover:text-blue-800"

>

<FaEdit/>

</button>



<button

onClick={()=>onDelete(task.id)}

className="text-red-600 hover:text-red-800"

>

<FaTrash/>

</button>


</div>


</td>


</tr>


))

)


}


</tbody>


</table>


</div>


);

}