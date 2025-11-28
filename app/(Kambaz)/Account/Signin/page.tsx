"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

interface Credentials {
  username?: string;
  password?: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const signin =  async() => {
    try {
      const user =  await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Account/Profile");
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };
 
  return (
    <div style={{ width: '300px' }}>
      <h1 className="mb-4">Sign in</h1>
      
      <FormControl  defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}

        id="wd-username"
        type="text"
        placeholder="username"
        className="mb-2"
        suppressHydrationWarning
      />
      
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}

        id="wd-password"
        type="password"
        placeholder="password" 
        className="mb-2"
        suppressHydrationWarning
      />
      
      <Button onClick={signin} variant="primary" className="w-100 mb-2" id="wd-signin-btn">
        Sign in
      </Button>
      
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}