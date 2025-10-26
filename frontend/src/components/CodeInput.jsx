import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeInput = ({ code, setCode, onSubmit, darkMode, loading }) => {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="code-input">
      <div className="code-input-header">
        <h2>Your Code</h2>

        {/* Toggle Preview Button */}
        {code && (
          <button
            className="toggle-preview-btn"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        )}
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className={`code-textarea ${darkMode ? "dark" : "light"}`}
        style={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      />

      <button
  className="submit-btn"
  onClick={onSubmit}
  disabled={loading}
>
  {loading ? "Reviewing..." : "Review Code"}
</button>


      {/* Conditional Preview */}
      {code && showPreview && (
        <div className="preview">
          <h3>Preview</h3>
          <div className="preview-box">
            <SyntaxHighlighter
              language="javascript"
              style={darkMode ? oneDark : oneLight}
              wrapLongLines
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeInput;

