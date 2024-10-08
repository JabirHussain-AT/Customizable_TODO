import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvaider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";  
import App from "./App";
import "./index.css";
import "../public/loading.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvaider>
      <Toaster />
      <App />
    </ThemeProvaider>
  </StrictMode>
);
