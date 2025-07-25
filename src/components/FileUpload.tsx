// src/components/FileUpload.tsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Dropped files:", acceptedFiles);
    // ✅ You can process CSV/JSON/etc. here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "40px",
        borderRadius: "8px",
        textAlign: "center",
        background: isDragActive ? "#f3f4f6" : "#fff",
        color: "#333",
        cursor: "pointer",
        transition: "background 0.2s ease-in-out",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>📤 Drop the files here...</p>
      ) : (
        <p>📂 Drag & drop student records here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUpload;
