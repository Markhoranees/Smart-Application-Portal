import React from "react";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (isSignedIn) {
    
    return <Navigate to="/  " />; // Or wherever you want logged-in users to go
  }

  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-6 bg-slate-600 shadow-lg rounded-lg"
      >
        <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
      </motion.div>
    </div>
  );
}
