"use client";
import { ReactNode, useState, use } from "react";
import { FaAlignJustify, FaChevronDown } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Link from "next/link";

export default function CoursesLayout(
  { children, params }:
    Readonly<{ children: ReactNode;
    params: Promise<{ cid: string }> }>) {
  const { cid } = use(params);
  const [showKambazNav, setShowKambazNav] = useState(false);
  const [showCourseNav, setShowCourseNav] = useState(false);
  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="text-danger mb-0">
          <button aria-label="Open Kambaz Navigation" className="btn btn-link p-0 me-3 d-md-none" onClick={() => setShowKambazNav(true)}>
            <FaAlignJustify className="fs-4 mb-1" />
          </button>
          Course {cid}
        </h2>
        <button aria-label="Open Course Navigation" className="btn btn-link p-0 d-md-none" onClick={() => setShowCourseNav(true)}>
          <FaChevronDown className="fs-4 mb-1" />
        </button>
      </div>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>

      {showKambazNav && (
        <div className="wd-overlay-full" onClick={() => setShowKambazNav(false)}>
          <div className="wd-drawer-full" onClick={(e) => e.stopPropagation()}>
            <button className="wd-drawer-close" onClick={() => setShowKambazNav(false)}>×</button>
            <div className="wd-mobile-nav">
              <div className="wd-mobile-nav-item">
                <img src="/images/NU-logo.webp" width="75px" alt="Northeastern University" />
              </div>
              <div className="wd-mobile-nav-item">
                <Link href="/Account" className="wd-mobile-nav-link">
                  <FaRegCircleUser className="fs-1" />
                  Account
                </Link>
              </div>
              <div className="wd-mobile-nav-item">
                <Link href="/Dashboard" className="wd-mobile-nav-link">
                  <AiOutlineDashboard className="fs-1" />
                  Dashboard
                </Link>
              </div>
              <div className="wd-mobile-nav-item">
                <Link href="/Courses/Home" className="wd-mobile-nav-link">
                  <LiaBookSolid className="fs-1" />
                  Courses
                </Link>
              </div>
              <div className="wd-mobile-nav-item">
                <Link href="/Calendar" className="wd-mobile-nav-link">
                  <IoCalendarOutline className="fs-1" />
                  Calendar
                </Link>
              </div>
              <div className="wd-mobile-nav-item">
                <Link href="/Inbox" className="wd-mobile-nav-link">
                  <FaInbox className="fs-1" />
                  Inbox
                </Link>
              </div>
              <div className="wd-mobile-nav-item">
                <Link href="/Settings" className="wd-mobile-nav-link">
                  <LiaCogSolid className="fs-1" />
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCourseNav && (
        <div className="wd-overlay-course" onClick={() => setShowCourseNav(false)}>
          <div className="wd-drawer-course" onClick={(e) => e.stopPropagation()}>
            <button className="wd-course-close" onClick={() => setShowCourseNav(false)}>×</button>
            <CourseNavigation />
          </div>
        </div>
      )}
    </div>
  );}
