import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({ children }:
  Readonly<{ children: ReactNode }>) {
 return (
   <div>
     <div className="mb-3 flex-row">
        <TOC />
     </div>
     <div>
        {children}
     </div>
   </div>
);}
