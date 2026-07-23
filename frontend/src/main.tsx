import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "./styles/custom.css";

import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(
    document.getElementById("root")!
)
.render(

<React.StrictMode>


    <ThemeProvider>


        <App />


    </ThemeProvider>



    <Toaster

        position="top-right"

        reverseOrder={false}


        toastOptions={{

            duration:3000,

            className:
            "dark:bg-slate-800 dark:text-white"


        }}


    />


</React.StrictMode>

);