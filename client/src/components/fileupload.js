// fileupload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileUpload, text }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileUpload(acceptedFiles[0]);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div {...getRootProps()} className="fileupload">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{text}</p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

export default FileUpload;