"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
  const pathname = usePathname();
 return (
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/Labs" as={Link} active={pathname === "/Labs"}>Labs</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab1" as={Link} active={pathname === "/Labs/Lab1"}>Lab 1</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab2" as={Link} active={pathname === "/Labs/Lab2"}>Lab 2</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab3" as={Link} active={pathname === "/Labs/Lab3"}>Lab 3</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/" as={Link} active={pathname === "/"}>Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/engamy/kambaz-next-js">My GitHub</NavLink>
     </NavItem>
   </Nav>
);}
