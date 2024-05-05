import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/SignUp";
import UserProfileCreation from "../components/UserProfileCreation";
import UserList from "../components/UserList"
import User from "../components/User"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/userCreation",
    element: <UserProfileCreation />,
  },
 {
    path: "/user/:phoneNumber",
    element: <User/>
  }
]);

export default router;
