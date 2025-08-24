import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// import tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// create queryClient from tanstack
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Wrap entire application with query client from tanstack - react query */}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
