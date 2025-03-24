
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/50 to-background">
      <div className="w-full max-w-md p-6 glass-panel rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Join CareerTrack</h1>
          <p className="text-muted-foreground">Create an account to unlock all features</p>
        </div>
        <ClerkSignUp signInUrl="/sign-in" afterSignUpUrl="/dashboard" routing="path" path="/sign-up" />
      </div>
    </div>
  );
};

export default SignUp;
