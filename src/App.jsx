import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { publicRoute, privateRoute } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import ChatWrapper from "./components/ChatWrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Fragment } from "react";

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  const isLoggedIn = isAuthenticated();

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.Layout) {
              Layout = route.Layout;
            } else if (route.Layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoute.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.Layout) {
              Layout = route.Layout;
            } else if (route.Layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLoggedIn ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            );
          })}
        </Routes>

        {isLoggedIn && <ChatWrapper />}
      </div>
    </Router>
  );
}

export default App;
