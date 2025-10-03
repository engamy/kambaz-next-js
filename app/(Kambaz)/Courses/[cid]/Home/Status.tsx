import { FaCheckCircle, FaBan, FaDownload, FaExternalLinkAlt, FaHome, FaChartBar, FaBullhorn, FaBell } from "react-icons/fa";

export default function CourseStatus() {
    return (
      <div id="wd-course-status" className="wd-course-status">
        <h2 className="wd-course-status-title">Course Status</h2>
        
        {/* Main action buttons */}
        <div className="wd-main-buttons">
          <button className="btn btn-secondary wd-unpublish-btn">
            <FaBan className="me-2" />
            Unpublish
          </button>
          <button className="btn btn-success wd-publish-btn">
            <FaCheckCircle className="me-2" />
            Publish
          </button>
        </div>

        {/* Action buttons list */}
        <div className="wd-action-buttons">
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaDownload className="me-2" />
            Import Existing Content
          </button>
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaExternalLinkAlt className="me-2" />
            Import from Commons
          </button>
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaHome className="me-2" />
            Choose Home Page
          </button>
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaChartBar className="me-2" />
            View Course Stream
          </button>
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaBullhorn className="me-2" />
            New Announcement
          </button>
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaChartBar className="me-2" />
            New Analytics
          </button>
          <button className="btn btn-outline-secondary wd-action-btn">
            <FaBell className="me-2" />
            View Course Notifications
          </button>
        </div>
      </div>
    );
}
  