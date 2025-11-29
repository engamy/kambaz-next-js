'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface User {
  _id?: string;
  role?: string;
  [key: string]: unknown;
}

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const user = currentUser as User | null;
  
  const navItems = [
    { href: "/Account/Signin", label: "Signin" },
    { href: "/Account/Signup", label: "Signup" },
    { href: "/Account/Profile", label: "Profile" }
  ];

  return (
    <div className="me-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div key={item.href} className="mb-3">
            <Link 
              href={item.href}
              className={`text-decoration-none ${isActive ? 'text-dark' : 'text-danger'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: isActive ? '8px' : '0px',
                borderLeft: isActive ? '3px solid black' : 'none',
                marginLeft: isActive ? '-8px' : '0px'
              }}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
      {user && user.role === "ADMIN" && (
        <div className="mb-3">
          <Link 
            href="/Account/Users"
            className={`text-decoration-none ${pathname.endsWith('Users') ? 'text-dark' : 'text-danger'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: pathname.endsWith('Users') ? '8px' : '0px',
              borderLeft: pathname.endsWith('Users') ? '3px solid black' : 'none',
              marginLeft: pathname.endsWith('Users') ? '-8px' : '0px'
            }}
          >
            Users
          </Link>
        </div>
      )}
    </div>
  );
}
