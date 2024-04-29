// fileupload.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const FileUpload = ({ onFileUpload, text, acceptedFileTypes = 'image/*,video/*' }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileType, setFileType] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        let compressedFile = file;

        if (file.type.startsWith('image/') && file.size > 4 * 1024 * 1024) {
          try {
            const options = {
              maxSizeMB: 4,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };

            compressedFile = await imageCompression(file, options);
          } catch (error) {
            console.error('Error compressing image:', error);
          }
        }

        onFileUpload(compressedFile);
        setFileUploaded(true);
        setFileType(compressedFile.type.startsWith('image/') ? 'image' : 'video');
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