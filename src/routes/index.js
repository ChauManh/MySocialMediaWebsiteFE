import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const publicRoute = [
  { path: '/', component: SignIn, Layout: null },
  { path: '/signup', component: SignUp, Layout: null },
];

const privateRoute = [{ path: '/home', component: Home }];

export { publicRoute, privateRoute };
