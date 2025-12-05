"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CourseNavigationProps {
  cid: string;
}

export default function CourseNavigation({ cid }: CourseNavigationProps) {
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const getLinkHref = (link: string) => {
    return `/Courses/${cid}/${link}`;
  };

  const isActive = (link: string) => {
    const href = getLinkHref(link);
    return pathname === href;
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link 
          key={link}
          href={getLinkHref(link)}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item text-danger border-0 ${
            isActive(link) ? 'active' : ''
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
