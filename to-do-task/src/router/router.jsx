import { createBrowserRouter } from "react-router-dom";
import ManageEvents from "../Component/ManageEvents/ManageEvents";
import Tasks from "../Component/Task/Tasks";
import LoginPage from "../Component/LogIn/LogInPage";
import RegisterFrom from "../Component/SignUp/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ManageEvents />,
  },
  {
    path: ":id",
    element: <Tasks></Tasks>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterFrom />,
  },
]);
