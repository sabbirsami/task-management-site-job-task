import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/home/Home";
import Register from "../components/auth/Register";
import ErrorPage from "../components/shared/errorPage/ErrorPage";
import Dashboard from "../components/dashboard/Dashboard";
import AddNewTask from "../components/dashboard/addNewTask/AddNewTask";
import ManageTasks from "../components/dashboard/manageTasks/ManageTasks";
import PrivateRoute from "../components/shared/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/management",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/management",
                element: <ManageTasks />,
            },
            {
                path: "/management/manage-tasks",
                element: <ManageTasks />,
            },
            {
                path: "/management/add-task",
                element: <AddNewTask />,
            },
        ],
    },
]);

export default router;
