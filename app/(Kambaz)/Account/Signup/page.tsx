"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

interface User {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
  [key: string]: unknown;
}

interface AxiosError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      error?: string;
      msg?: string;
    };
  };
  message?: string;
}

export default function Signup() {
  const [user, setUser] = useState<User>({});
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
      } catch {
        // If profile fetch fails, use the signup response
        dispatch(setCurrentUser(signupResponse));
      }
      router.push("/Account/Profile");
    } catch (error) {
      const axiosError = error as AxiosError;
      // Only log if it's not a handled error
      if (axiosError.response?.status !== 400) {
        console.error("Signup failed:", axiosError);
      }
      
      // Try to extract error message from various possible locations
      const message = 
        axiosError.response?.data?.message || 
        axiosError.response?.data?.error ||
        axiosError.response?.data?.msg ||
        (axiosError.response?.status === 400 ? "Username may already exist or invalid data provided" : null) ||
        axiosError.message || 
        `Signup failed: ${axiosError.response?.status ? `Status ${axiosError.response.status}` : 'Unknown error'}`;
      
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
