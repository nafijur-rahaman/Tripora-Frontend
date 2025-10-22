import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import AuthContextProvider from "./Context/AuthContextProvider";
import ThemeProvider from "./Context/ThemeContext";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  </AuthContextProvider>
);
