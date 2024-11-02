// src/components/SubmitButton.js
import React from "react";
import "./css/SubmitButton.css";

const SubmitButton = ({
  label,
  backgroundColor,
  color,
  fontSize = "1em",
  padding = "10px 20px",
  onClick,
}) => (
  <button
    className="submit-button"
    style={{ backgroundColor, color, fontSize, padding }}
    onClick={onClick}
  >
    {label}
  </button>
);

export default SubmitButton;
