import React from "react";
import jsPDF from "jspdf";

const ReviewDisplay = ({ review, darkMode }) => {
  if (!review) return null;

  const handleExportPDF = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;

    pdf.setFontSize(18);
    pdf.text("AI Code Review Report", margin, 60);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 70, 550, 70);
    pdf.setFont("courier", "normal");
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(review, 500);
    pdf.text(lines, margin, 100);
    pdf.save("AI_Code_Review.pdf");
  };

  return (
    <div className={`review-display ${darkMode ? "dark" : "light"}`}>
      <div className="review-header">
        <h2>CodeMentor AI Review Result</h2>
        <button onClick={handleExportPDF} className="export-btn">
          📄 Export PDF
        </button>
      </div>

      <pre className="review-text">{review}</pre>
      <p className="timestamp">
        Reviewed at: {new Date().toLocaleString()}
      </p>
    </div>
  );
};

export default ReviewDisplay;




