import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <HashRouter>
        <AuthProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </AuthProvider>
    </HashRouter>
);