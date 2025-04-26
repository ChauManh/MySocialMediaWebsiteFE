import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/authContext.jsx";
import { LoadingProvider } from "./contexts/loadingContext.jsx";
import { NotificationProvider } from "./contexts/notificationContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </LoadingProvider>
    <Toaster />
  </StrictMode>
);
