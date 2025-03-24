
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/50 to-background">
      <div className="w-full max-w-md p-6 glass-panel rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome Back to CareerTrack</h1>
          <p className="text-muted-foreground">Sign in to continue your educational journey</p>
        </div>
        <ClerkSignIn signUpUrl="/sign-up" afterSignInUrl="/dashboard" routing="path" path="/sign-in" />
      </div>
    </div>
  );
};

export default SignIn;
