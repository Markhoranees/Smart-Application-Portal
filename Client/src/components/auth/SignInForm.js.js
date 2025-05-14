import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function SignInForm() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-800 to-teal-800 flex justify-center items-center">
      {/* Dull and blurred background that covers the entire screen */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      {/* The animated SignIn Form */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative p-8 md:w-1/3 w-full bg-white shadow-xl rounded-2xl space-y-6"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Sign in to JobPortal</h1>
        </div>

        {/* SignIn component from Clerk */}
        <SignIn />
      </motion.div>
    </div>
  );
}
