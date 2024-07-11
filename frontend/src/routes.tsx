import {
    createBrowserRouter
} from "react-router-dom";
import SignIn from "./modules/auth/SignIn";
import SignUp from "./modules/auth/SignUp";
import Dashboard from "./modules/pages/Dashboard";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>,
    },
    {
        path: "/sign-in",
        element: <SignIn/>,
    },
    {
        path: "/sign-up",
        element: <SignUp/>,
    },
]);