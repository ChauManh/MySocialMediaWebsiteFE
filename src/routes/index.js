import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProfileBioAndPost from "../pages/ProfileBioAndPost";
import ProfileFriendList from "../pages/ProfileFriendList";
// import YHeaderNSidebarLayout from "../layout/YHeaderNSidebarLayout";
import ProfileLayout from "../layout/ProfileLayout";

const publicRoute = [
  { path: "/", component: SignIn, Layout: null },
  { path: "/signup", component: SignUp, Layout: null },
];

const privateRoute = [
  { path: "/home", component: Home },
  { path: "/profile/:userId", component: ProfileBioAndPost, Layout: ProfileLayout },
  { path: "/profile/:userId/friends", component: ProfileFriendList, Layout: ProfileLayout },
];

export { publicRoute, privateRoute };
