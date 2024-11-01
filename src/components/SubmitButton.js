// src/components/SubmitButton.js
import React from "react";
import "./css/SubmitButton.css";

const SubmitButton = ({
  onClick,
  label,
  color = "#fff",
  backgroundColor = "#007bff",
}) => (
  <button
    className="submit-button"
    onClick={onClick}
    style={{ color, backgroundColor }}
  >
    {label}
  </button>
);

export default SubmitButton;
