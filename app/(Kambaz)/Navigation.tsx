"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
 return (
   <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
              id="wd-kambaz-navigation">
     <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
       <img src="/images/NU-logo.webp" width="75px" alt="Northeastern University" />
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname.startsWith('/Account') ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Account" id="wd-account-link" className={`text-decoration-none ${pathname.startsWith('/Account') ? 'text-danger' : 'text-white'}`}>
         <FaRegCircleUser className={`fs-1 ${pathname.startsWith('/Account') ? 'text-danger' : 'text-white'}`} />
         <br />
         Account
       </Link>
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname === '/Dashboard' ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Dashboard" id="wd-dashboard-link" className={`text-decoration-none ${pathname === '/Dashboard' ? 'text-danger' : 'text-white'}`}>
         <AiOutlineDashboard className={`fs-1 ${pathname === '/Dashboard' ? 'text-danger' : 'text-white'}`} />
         <br />
         Dashboard
       </Link>
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname.startsWith('/Courses') ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Courses/Home" id="wd-courses-link" className={`text-decoration-none ${pathname.startsWith('/Courses') ? 'text-danger' : 'text-danger'}`}>
         <LiaBookSolid className={`fs-1 ${pathname.startsWith('/Courses') ? 'text-danger' : 'text-danger'}`} />
         <br />
         Courses
       </Link>
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname === '/Calendar' ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Calendar" id="wd-calendar-link" className={`text-decoration-none ${pathname === '/Calendar' ? 'text-danger' : 'text-danger'}`}>
         <IoCalendarOutline className={`fs-1 ${pathname === '/Calendar' ? 'text-danger' : 'text-danger'}`} />
         <br />
         Calendar
       </Link>
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname === '/Inbox' ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Inbox" id="wd-inbox-link" className={`text-decoration-none ${pathname === '/Inbox' ? 'text-danger' : 'text-danger'}`}>
         <FaInbox className={`fs-1 ${pathname === '/Inbox' ? 'text-danger' : 'text-danger'}`} />
         <br />
         Inbox
       </Link>
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname === '/Settings' ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Settings" id="wd-settings-link" className={`text-decoration-none ${pathname === '/Settings' ? 'text-danger' : 'text-danger'}`}>
         <LiaCogSolid className={`fs-1 ${pathname === '/Settings' ? 'text-danger' : 'text-danger'}`} />
         <br />
         Settings
       </Link>
     </ListGroupItem>
     <ListGroupItem className={`border-0 text-center ${pathname.startsWith('/Labs') ? 'bg-white' : 'bg-black'}`}>
       <Link href="/Labs" id="wd-labs-link" className={`text-decoration-none ${pathname.startsWith('/Labs') ? 'text-danger' : 'text-white'}`}>
         <LiaBookSolid className={`fs-1 ${pathname.startsWith('/Labs') ? 'text-danger' : 'text-white'}`} />
         <br />
         Labs
       </Link>
     </ListGroupItem>
   </ListGroup>
);}