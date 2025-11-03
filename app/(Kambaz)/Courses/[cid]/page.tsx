"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
 const { cid } = useParams();
 const { courses } = useSelector((state: RootState) => state.coursesReducer);
 const course = courses.find((course: Course) => course._id === cid);
 return (
   <div id="wd-courses">
     <h2>
       <FaAlignJustify className="me-4 fs-4 mb-1" />
       {course?.name}
     </h2>
     <hr />
     <div className="d-flex">
       <div>
         <CourseNavigation cid={String(cid)} />
       </div>
       <div className="flex-fill">{children}</div>
     </div>
   </div>
 );
}
