import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

// Replace with your actual Clerk Publishable Key from the Clerk dashboard
const clerkPublishableKey = 'pk_test_d2l0dHktcGlnLTQ5LmNsZXJrLmFjY291bnRzLmRldiQ';  // Replace this with your Clerk publishable key

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
     
        <App />
  
    </ClerkProvider>
  </React.StrictMode>
);
