'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  
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
    </div>
  );
}
