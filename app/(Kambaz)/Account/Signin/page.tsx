"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";


export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
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
      
      <Link id="wd-signin-btn" href="/Account/Profile">
      <Button onClick={signin}variant="primary" className="w-100 mb-2">
          Sign in
        </Button>
      </Link>
      
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}