import { FaPlus, FaBan, FaCheckCircle } from "react-icons/fa";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";

export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }
) {
 const [show, setShow] = useState(false);
 const [showPublish, setShowPublish] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 return (
   <div id="wd-modules-controls">
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
       <button className="btn btn-danger btn-sm" onClick={handleShow}><FaPlus className="me-1"/>Module</button>
     </div>
     <ModuleEditor 
       show={show} 
       handleClose={handleClose} 
       dialogTitle="Add Module"
       moduleName={moduleName} 
       setModuleName={setModuleName} 
       addModule={addModule} 
     />
   </div>
);}
