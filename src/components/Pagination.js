// src/components/Pagination.js
import React from "react";
import "./css/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pageNumbers.map((number) => (
        <span
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </span>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
