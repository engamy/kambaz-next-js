"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();
  
  // Extract the section from the pathname
  const pathSegments = pathname.split("/");
  const courseIndex = pathSegments.indexOf("Courses");
  const section = pathSegments[courseIndex + 2]; // Get the section after /Courses/[cid]/
  
  // Map section names to display names
  const getSectionDisplayName = (section: string) => {
    switch (section) {
      case "Home":
        return "Home";
      case "Modules":
        return "Modules";
      case "Assignments":
        return "Assignments";
      case "Piazza":
        return "Piazza";
      case "Zoom":
        return "Zoom";
      case "Quizzes":
        return "Quizzes";
      case "Grades":
        return "Grades";
      case "People":
        return "People";
      default:
        return section;
    }
  };

  const displaySection = getSectionDisplayName(section);

  return (
    <span>
      {course?.name} &gt; {displaySection}
    </span>
  );
}
