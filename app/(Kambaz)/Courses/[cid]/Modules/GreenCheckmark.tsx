import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
  return (
    <span className="me-1 position-relative d-inline-flex align-items-center justify-content-center">
      <FaCircle className="text-white fs-6 position-absolute" style={{ zIndex: 0, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
      <FaCheckCircle className="text-success position-relative fs-5" style={{ zIndex: 1 }} />
    </span>);}