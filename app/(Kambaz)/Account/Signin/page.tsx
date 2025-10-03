'use client';

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div style={{ width: '300px' }}>
      <h1 className="mb-4">Sign in</h1>
      
      <FormControl 
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      
      <FormControl 
        id="wd-password"
        placeholder="password" 
        type="password"
        className="mb-2"
      />
      
      <Link id="wd-signin-btn" href="/Account/Profile">
        <Button variant="primary" className="w-100 mb-2">
          Sign in
        </Button>
      </Link>
      
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}