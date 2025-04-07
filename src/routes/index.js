import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import YHeaderNSidebarLayout from "../layout/YHeaderNSidebarLayout";

const publicRoute = [
  { path: "/", component: SignIn, Layout: null },
  { path: "/signup", component: SignUp, Layout: null },
];

const privateRoute = [
  { path: "/home", component: Home },
  { path: "/profile/:userId", component: Profile, Layout: YHeaderNSidebarLayout },
];

export { publicRoute, privateRoute };
