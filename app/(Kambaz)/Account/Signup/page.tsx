'use client';

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div style={{ width: '300px' }}>
      <h1 className="mb-4">Sign up</h1>
      
      <FormControl 
        defaultValue="aWonderland2" 
        placeholder="username"
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="bestpasswordEVER. 2!" 
        placeholder="password" 
        type="password"
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="bestpasswordEVER. 2!" 
        placeholder="verify password" 
        type="password"
        className="mb-2"
      />
      
      <Link href="/Account/Profile">
        <Button variant="primary" className="w-100 mb-2">
          Sign up
        </Button>
      </Link>
      
      <Link href="/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}
