import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    return (

        <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Task Management System
                </h1>

                <p className="text-gray-500 text-sm">
                    Welcome Back 👋
                </p>

            </div>

            <div className="flex items-center gap-3">

                <FaUserCircle
                    size={42}
                    className="text-blue-600"
                />

                <div>

                    <h3 className="font-semibold">

                        {user.name}

                    </h3>

                    <p className="text-gray-500 text-sm">

                        {user.email}

                    </p>

                </div>

            </div>

        </header>

    );

}