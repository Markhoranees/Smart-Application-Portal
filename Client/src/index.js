import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';


const clerkPublishableKey = 'pk_test_d2VsY29tZS1sYWJyYWRvci00NS5jbGVyay5hY2NvdW50cy5kZXYk';  // Replace this with your Clerk publishable key

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
  
        <App />

    </ClerkProvider>
  </React.StrictMode>
);

