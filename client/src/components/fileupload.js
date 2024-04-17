// fileupload.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileUpload, text, acceptedFileTypes = 'image/*,video/*' }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileType, setFileType] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileUpload(file);
        setFileUploaded(true);
        setFileType(file.type.startsWith('image/') ? 'image' : 'video');
      } else {
        onFileUpload(null);
        setFileUploaded(false);
        setFileType(null);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: acceptedFileTypes });

  return (
    <div {...getRootProps()} className="fileupload">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{text}</p>
      ) : fileUploaded ? (
        <p onClick={() => onDrop([])}>
          Cancel {fileType === 'image' ? 'Image' : 'Video'} Upload
        </p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

export default FileUpload;