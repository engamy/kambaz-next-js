"use client";
import { ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const cid = String(params.cid);
  const course = courses.find((c) => c._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }}
          onClick={toggleNavigation}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className={`${showNavigation ? "d-none d-md-block" : "d-none"}`}>
          <CourseNavigation cid={cid} />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
