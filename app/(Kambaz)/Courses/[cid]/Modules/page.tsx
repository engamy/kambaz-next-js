"use client";
import { useState } from "react";
import { FaEllipsisV, FaPlus, FaBan, FaCheckCircle } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

export default function Modules() {
    const [showPublish, setShowPublish] = useState(false);
    return (
      <div className="wd-modules">
        <div className="wd-buttons d-flex align-items-center gap-2 mb-3 flex-wrap justify-content-end position-relative">
          <button className="btn btn-secondary btn-sm wd-collapse-btn">Collapse All</button>
          <button className="btn btn-secondary btn-sm wd-progress-btn">View Progress</button>
          <div className="position-relative">
            <button className="btn btn-dark btn-sm d-flex align-items-center" onClick={() => setShowPublish((s) => !s)}>
              <FaCheckCircle className="text-success me-2" />
              Publish All
              <span className="ms-2">▾</span>
            </button>
            {showPublish && (
              <div className="wd-dropdown-menu" onMouseLeave={() => setShowPublish(false)}>
                <div className="dropdown-item d-flex align-items-center"><FaCheckCircle className="text-success me-2"/>Publish all modules and items</div>
                <div className="dropdown-item d-flex align-items-center"><FaCheckCircle className="text-success me-2"/>Publish modules only</div>
                <div className="dropdown-item d-flex align-items-center"><FaBan className="text-secondary me-2"/>Unpublish all modules and items</div>
                <div className="dropdown-item d-flex align-items-center"><FaBan className="text-secondary me-2"/>Unpublish modules only</div>
              </div>
            )}
          </div>
          <button className="btn btn-danger btn-sm"><FaPlus className="me-1"/>Module</button>
        </div>

        <div className="wd-module-container ps-2">
        <ul className="list-group border rounded-1">
          <li className="list-group-item p-0">
            <div className="d-flex align-items-center p-2 ps-3 fw-semibold bg-body-tertiary">
              <div className="wd-dots me-2" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="flex-fill">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
              <div className="d-flex align-items-center wd-row-actions">
                <GreenCheckmark />
                <FaEllipsisV className="text-secondary" />
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">LEARNING OBJECTIVES</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Introduction to the course</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Learn what is Web Development</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">READING</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <a href="https://docs.google.com/document/d/1wpgYSP3t8avVhxYmN42cmbbpu3I38c4mDqDytllbJIk/edit?tab=t.0#heading=h.nbfs8x9iykbg" target="_blank">
                    Developing Full Stack MERN Web Applications - Chapter 1 - Building React User Interfaces with HTML
                  </a>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        </div>

        <div className="wd-module-container ps-2">
        <ul className="list-group border rounded-1">
          <li className="list-group-item p-0">
            <div className="d-flex align-items-center p-2 ps-3 fw-semibold bg-body-tertiary">
              <div className="wd-dots me-2" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="flex-fill">Lecture 2 - Prototyping the React Kambaz User Interface with HTML</div>
              <div className="d-flex align-items-center wd-row-actions">
                <GreenCheckmark />
                <FaEllipsisV className="text-secondary" />
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">LEARNING OBJECTIVES</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Learn how to create user interfaces with HTML</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Keep working on assignment 1</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Deploy the assignment to Netlify</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">READING</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">ASSIGNMENT 1 - PROTOTYPING THE KAMBAZ REACT APPLICATION WITH HTML</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Implementing the Kambaz Account Screens</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Implementing the Kambaz Dashboard Screen</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Implementing the Kambaz Courses Screen</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Implementing the Kambaz Modules Screen</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Implementing the Kambaz Assignments Screens</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Kanbas Web App on Netlify</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">EVALUATIONS</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>YOUTUBE - Please subscribe, like and share my videos on YouTube</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        </div>

        <div className="wd-module-container ps-2">
        <ul className="list-group border rounded-1">
          <li className="list-group-item p-0">
            <div className="d-flex align-items-center p-2 ps-3 fw-semibold bg-body-tertiary">
              <div className="wd-dots me-2" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="flex-fill">Lecture 3 - Styling Web Pages with CSS and Bootstrap, Assignment 2</div>
              <div className="d-flex align-items-center wd-row-actions">
                <GreenCheckmark />
                <FaEllipsisV className="text-secondary" />
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">LEARNING OBJECTIVES</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Introduction to CSS</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Selectors by tag ID, classes, and document structure</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Styling color and background color</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Styling dimensions and positions</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>The box model - styling margins, borders, and paddings</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">READING</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">STYLING WEB PAGES WITH CASCADING STYLE SHEETS (CSS)</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Introduction to Cascading Style Sheets</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Styling with Colors</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>The Box Model</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Size & Position</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Float</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Flex</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Rotating content & Gradient background</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">ASSIGNMENT 2 - CSS & BOOTSTRAP LAB EXERCISES</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Assignment 2 - CSS Lab Exercises</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>Assignment 2 - Bootstrap Lab Exercises</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center w-100">
                  <div className="wd-dots me-2" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flex-fill fw-semibold">EVALUATIONS</div>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>REFERENCES</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>MDN Learn CSS</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>MDN CSS guidelines</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>MDN The Box Model</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex">
                <div className="wd-dots me-2" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="flex-fill d-flex justify-content-between align-items-center">
                  <span>YOUTUBE - Please subscribe, like and share my videos on YouTube</span>
                  <div className="d-flex align-items-center wd-row-actions">
                    <GreenCheckmark />
                    <FaEllipsisV className="text-secondary" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        </div>
      </div>
  );}
  