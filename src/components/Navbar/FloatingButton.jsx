import React from "react";

export default function FloatingButton({ toggle }) {
  return (
    <div className="floating-btn" onClick={toggle}>
      💬
    </div>
  );
}