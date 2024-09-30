import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MUI_Theme from "./Themes/MUI_Theme";
import "./Assests/Styles/styles.css";
import { AuthProvider } from "./Context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MUI_Theme>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MUI_Theme>
    </React.StrictMode>
  </BrowserRouter>
);
