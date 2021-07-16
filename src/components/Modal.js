import React from "react";
import reactDom from "react-dom";

export const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return reactDom.createPortal(
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-60 bg-black z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-10">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 -translate-y-1"
        >
          &#x2716;
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};
