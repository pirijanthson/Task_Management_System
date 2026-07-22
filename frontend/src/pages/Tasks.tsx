import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import TaskTable from "../components/task/TaskTable";
import TaskForm from "../components/task/TaskForm";

import {
    getTasks,
    deleteTask
} from "../services/task.service";

interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
}

export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {

        try {

            setLoading(true);

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id: number) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await deleteTask(id);

            loadTasks();

        } catch (error) {

            console.log(error);

        }

    };

    const handleEdit = (task: Task) => {

        setSelectedTask(task);

        setShowForm(true);

    };

    return (

        <Layout>

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                    Tasks

                </h2>

                <button

                    onClick={() => {

                        setSelectedTask(null);

                        setShowForm(true);

                    }}

                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"

                >

                    + Create Task

                </button>

            </div>

            {

                loading ?

                    (

                        <div className="text-center text-xl">

                            Loading Tasks...

                        </div>

                    )

                    :

                    (

                        <TaskTable

                            tasks={tasks}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    )

            }

            {

                showForm && (

                    <TaskForm

                        task={selectedTask}

                        onClose={() => {

                            setShowForm(false);

                            setSelectedTask(null);

                        }}

                        onSuccess={loadTasks}

                    />

                )

            }

        </Layout>

    );

}