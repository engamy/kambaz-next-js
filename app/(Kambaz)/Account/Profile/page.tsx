'use client';

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div style={{ width: '300px' }}>
      <h1 className="mb-4">Profile</h1>
      
      <FormControl 
        defaultValue="alice" 
        placeholder="username"
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="123" 
        placeholder="password" 
        type="password" 
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="Alice" 
        placeholder="First Name"
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="Wonderland" 
        placeholder="Last Name"
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="2000-01-01" 
        type="date"
        className="mb-2"
      />
      
      <FormControl 
        defaultValue="alice@wonderland.com" 
        type="email"
        className="mb-2"
      />
      
      <FormControl 
        as="select" 
        defaultValue="USER"
        className="mb-4"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormControl>
      
      <Link href="/Account/Signin">
        <Button variant="danger" className="w-100">
          Signout
        </Button>
      </Link>
    </div>
  );
}
