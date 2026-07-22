import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { logout } from "../../services/auth.service";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {

            await logout();

        } catch (error) {

            console.error("Logout Error:", error);

        } finally {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login");

        }

    };

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar onLogout={handleLogout} />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}