"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaEllipsisV, FaPlus, FaBan, FaCheckCircle } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

function ModuleControlButtons() {
  return (
    <div className="d-flex align-items-center wd-row-actions">
      <GreenCheckmark />
      <FaEllipsisV className="text-secondary" />
    </div>
  );
}

function LessonControlButtons() {
  return (
    <div className="d-flex align-items-center wd-row-actions">
      <GreenCheckmark />
      <FaEllipsisV className="text-secondary" />
    </div>
  );
}

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
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

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: { course: string }) => module.course === cid)
          .map((module: { _id: string; name: string; lessons?: Array<{ _id: string; name: string }> }) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: { _id: string; name: string }) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
      </div>
  );}
  