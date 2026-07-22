import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";

import { getDashboardStats } from "../services/task.service";

interface Stats {

    totalTasks:number;

    pendingTasks:number;

    inProgressTasks:number;

    completedTasks:number;

    overdueTasks:number;

}

export default function Dashboard() {

    const [stats,setStats] = useState<Stats>({

        totalTasks:0,
        pendingTasks:0,
        inProgressTasks:0,
        completedTasks:0,
        overdueTasks:0

    });

    useEffect(()=>{

        loadStats();

    },[]);

    const loadStats = async()=>{

        try{

            const data = await getDashboardStats();

            setStats(data);

        }catch(error){

            console.log(error);

        }

    };

    return (

        <Layout>

            <h2 className="text-3xl font-bold mb-8">

                Dashboard

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                <StatCard
                    title="Total Tasks"
                    value={stats.totalTasks}
                    color="border-blue-500"
                />

                <StatCard
                    title="Pending"
                    value={stats.pendingTasks}
                    color="border-yellow-500"
                />

                <StatCard
                    title="In Progress"
                    value={stats.inProgressTasks}
                    color="border-indigo-500"
                />

                <StatCard
                    title="Completed"
                    value={stats.completedTasks}
                    color="border-green-500"
                />

                <StatCard
                    title="Overdue"
                    value={stats.overdueTasks}
                    color="border-red-500"
                />

            </div>

        </Layout>

    );

}