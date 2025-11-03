import { FaTrash, FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons(
{ moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; }) {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger fs-5" onClick={() => deleteModule(moduleId)} style={{ cursor: "pointer" }}/>
      <GreenCheckmark />
      <FaPlus className="fs-6" />
      <IoEllipsisVertical className="fs-5" />
    </div> );}