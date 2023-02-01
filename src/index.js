import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import colors from "./Colors/Colors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00163C",
    },
    secondary: {
      main: "#F2F2F2",
    },
  },
  typography: {
    h6: {
      color: "#00163C",
    },
    body: {
      color: colors.fontColor,
    },
    h5: {
      color: colors.fontHeadingColor,
    },
    h4: {
      color: "#00163C",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient()
// Amplify.configure(awsconfig);

root.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />      
    </QueryClientProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
