import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/common/ConfirmModal";
import Loader from "../components/common/Loader";
import Layout from "../components/layout/Layout";
import TaskTable from "../components/task/TaskTable";
import TaskForm from "../components/task/TaskForm";
import TaskCard from "../components/task/TaskCard";

import {
    getTasks,
    deleteTask
} from "../services/task.service";


interface Task {

    id:number;
    title:string;
    description:string;
    priority:string;
    status:string;
    dueDate:string;

}



export default function Tasks(){


    const [tasks,setTasks] = useState<Task[]>([]);

    const [loading,setLoading] = useState(true);


    const [showForm,setShowForm] = useState(false);

    const [selectedTask,setSelectedTask] = useState<Task | null>(null);



    const [search,setSearch] = useState("");

    const [status,setStatus] = useState("");

    const [priority,setPriority] = useState("");

    const [sort,setSort] = useState("");



    const [deleteTaskId,setDeleteTaskId] = useState<number | null>(null);




    useEffect(()=>{

        loadTasks();

    },[search,status,priority,sort]);





    const loadTasks = async()=>{


        try{


            setLoading(true);


            const data = await getTasks(

                search,
                status,
                priority,
                sort

            );


            setTasks(data);



        }catch(error){


            console.log(error);


        }
        finally{


            setLoading(false);


        }


    };






    const handleDelete = (id:number)=>{


        setDeleteTaskId(id);


    };







    const confirmDelete = async()=>{


        if(deleteTaskId === null)
            return;



        try{


            await deleteTask(deleteTaskId);



            toast.success(
                "Task deleted successfully"
            );



            setDeleteTaskId(null);



            loadTasks();



        }catch(error){


            console.log(error);


            toast.error(
                "Failed to delete task"
            );


        }


    };








    const handleEdit = (task:Task)=>{


        setSelectedTask(task);

        setShowForm(true);


    };







    return (

        <Layout>



            <div className="
            flex 
            flex-col 
            md:flex-row 
            md:justify-between 
            md:items-center 
            gap-4 
            mb-8
            ">



                <h2 className="text-3xl font-bold">

                    Tasks

                </h2>





                <button


                onClick={()=>{


                    setSelectedTask(null);

                    setShowForm(true);


                }}


                className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-blue-700
                "


                >

                    + Create Task


                </button>



            </div>








            <div className="
            grid 
            grid-cols-1 
            md:grid-cols-4 
            gap-4 
            mb-6
            ">


                <input

                type="text"

                placeholder="Search by title..."

                value={search}

                onChange={
                    (e)=>setSearch(e.target.value)
                }

                className="
                border
                rounded-lg
                px-4
                py-3
                "

                />





                <select

                value={status}

                onChange={
                    (e)=>setStatus(e.target.value)
                }

                className="
                border
                rounded-lg
                px-4
                py-3
                "

                >

                    <option value="">
                        All Status
                    </option>

                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="IN_PROGRESS">
                        In Progress
                    </option>

                    <option value="COMPLETED">
                        Completed
                    </option>


                </select>





                <select

                value={priority}

                onChange={
                    (e)=>setPriority(e.target.value)
                }

                className="
                border
                rounded-lg
                px-4
                py-3
                "

                >

                    <option value="">
                        All Priority
                    </option>

                    <option value="LOW">
                        Low
                    </option>

                    <option value="MEDIUM">
                        Medium
                    </option>

                    <option value="HIGH">
                        High
                    </option>


                </select>






                <select

                value={sort}

                onChange={
                    (e)=>setSort(e.target.value)
                }

                className="
                border
                rounded-lg
                px-4
                py-3
                "

                >

                    <option value="">
                        Newest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>

                    <option value="dueDate">
                        Due Date
                    </option>


                </select>



            </div>








        {
            loading ?

            (

                <Loader />

            )

            :

            tasks.length === 0 ?

            (

                <div className="
                text-center
                py-10
                text-gray-500
                text-lg
                ">

                    No tasks found

                </div>

            )

            :

            (

                <>


                    {/* Desktop Table */}

                    <div className="hidden md:block">


                        <TaskTable

                            tasks={tasks}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />


                    </div>




                    {/* Mobile Cards */}

                    <div className="block md:hidden">


                        {

                            tasks.map((task)=>(
                                
                                <TaskCard

                                    key={task.id}

                                    task={task}

                                    onEdit={handleEdit}

                                    onDelete={handleDelete}

                                />

                            ))

                        }


                    </div>


                </>

            )
        }








            {

                showForm && (


                    <TaskForm


                    task={selectedTask}


                    onClose={()=>{


                        setShowForm(false);

                        setSelectedTask(null);


                    }}


                    onSuccess={loadTasks}


                    />


                )


            }







            {

                deleteTaskId !== null && (


                    <ConfirmModal


                    title="Delete Task"


                    message="
                    Are you sure you want to delete this task?
                    This action cannot be undone.
                    "


                    onConfirm={confirmDelete}


                    onCancel={()=>setDeleteTaskId(null)}


                    />


                )


            }






        </Layout>


    );


}