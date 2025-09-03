import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Route";
import "./index.css";
import AuthContextProvider from "./Context/AuthContextProvider";
import ThemeProvider from "./Context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />,
      </ThemeProvider>
    </StrictMode>
  </AuthContextProvider>
);
