"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const signup = async () => {
    try {
      setErrorMessage(null);
      
      // Validate required fields
      if (!user.username || !user.password) {
        setErrorMessage("Username and password are required");
        return;
      }
      
      const signupResponse = await client.signup(user);
      // After signup, fetch the full profile to ensure we have _id
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
      } catch (profileError) {
        // If profile fetch fails, use the signup response
        dispatch(setCurrentUser(signupResponse));
      }
      router.push("/Account/Profile");
    } catch (error: any) {
      // Only log if it's not a handled error
      if (error.response?.status !== 400) {
        console.error("Signup failed:", error);
      }
      
      // Try to extract error message from various possible locations
      const message = 
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.response?.data?.msg ||
        (error.response?.status === 400 ? "Username may already exist or invalid data provided" : null) ||
        error.message || 
        `Signup failed: ${error.response?.status ? `Status ${error.response.status}` : 'Unknown error'}`;
      
      if (message) {
        setErrorMessage(message);
      }
    }
  };
  return (
    <div style={{ width: '300px' }}>
      <h1 className="mb-4">Sign up</h1>
      {errorMessage && (
        <div className="alert alert-danger mb-2" role="alert">
          {errorMessage}
        </div>
      )}
      
      <FormControl 
        value={user.username || ""} 
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        id="wd-username"
        type="text"
        placeholder="username"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl 
        value={user.password || ""} 
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        id="wd-password"
        type="password"
        placeholder="password"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <Button 
        onClick={signup} 
        variant="primary" 
        className="w-100 mb-2"
        id="wd-signup-btn"
      >
        Sign up
      </Button>
      
      <Link id="wd-signin-link" href="/Account/Signin">
        Sign in
      </Link>
    </div>
);}
