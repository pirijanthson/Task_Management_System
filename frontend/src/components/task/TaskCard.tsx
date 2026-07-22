interface Task {

    id:number;
    title:string;
    description:string;
    priority:string;
    status:string;
    dueDate:string;

}


interface Props {

    task:Task;

    onEdit:(task:Task)=>void;

    onDelete:(id:number)=>void;

}



export default function TaskCard({

    task,

    onEdit,

    onDelete

}:Props){


return (

<div className="
bg-white
rounded-xl
shadow
p-5
mb-4
border
">


    <h3 className="
    text-xl
    font-bold
    mb-2
    ">

        {task.title}

    </h3>



    <p className="text-gray-600 mb-3">

        {task.description || "No description"}

    </p>




    <div className="space-y-2">


        <p>

            <span className="font-semibold">
                Priority:
            </span>

            {" "}

            {task.priority}

        </p>



        <p>

            <span className="font-semibold">
                Status:
            </span>

            {" "}

            {task.status}

        </p>




        <p>

            <span className="font-semibold">
                Due Date:
            </span>

            {" "}

            {new Date(task.dueDate)
            .toLocaleDateString()}

        </p>


    </div>





    <div className="
    flex
    gap-3
    mt-5
    ">


        <button

        onClick={()=>onEdit(task)}

        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        "

        >

            Edit

        </button>




        <button

        onClick={()=>onDelete(task.id)}

        className="
        bg-red-600
        text-white
        px-4
        py-2
        rounded-lg
        "

        >

            Delete

        </button>



    </div>


</div>

);


}