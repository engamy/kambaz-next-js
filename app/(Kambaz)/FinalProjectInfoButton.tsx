"use client";
import Link from "next/link";

export default function FinalProjectInfoButton() {
  return (
    <Link 
      href="/FinalProjectInfo" 
      target="_blank"
      className="wd-final-project-button"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#0d6efd",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        zIndex: 9999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        transition: "background-color 0.2s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#0b5ed7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#0d6efd";
      }}
    >
      Final Project Info.
    </Link>
  );
}

