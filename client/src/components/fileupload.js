// // fileupload.js
// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import imageCompression from 'browser-image-compression';

// const FileUpload = ({ onFileUpload, text, acceptedFileTypes = 'image/*,video/*' }) => {
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [fileType, setFileType] = useState(null);

//   const onDrop = useCallback(
//     async (acceptedFiles) => {
//       if (acceptedFiles.length > 0) {
//         const file = acceptedFiles[0];
//         let compressedFile = file;

//         if (file.type.startsWith('image/') && file.size > 4 * 1024 * 1024) {
//           try {
//             const options = {
//               maxSizeMB: 4,
//               maxWidthOrHeight: 1920,
//               useWebWorker: true,
//             };

//             compressedFile = await imageCompression(file, options);
//           } catch (error) {
//             console.error('Error compressing image:', error);
//           }
//         }

//         onFileUpload(compressedFile);
//         setFileUploaded(true);
//         setFileType(compressedFile.type.startsWith('image/') ? 'image' : 'video');
//       } else {
//         onFileUpload(null);
//         setFileUploaded(false);
//         setFileType(null);
//       }
//     },
//     [onFileUpload]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: acceptedFileTypes });

//   return (
//     <div {...getRootProps()} className="fileupload">
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>{text}</p>
//       ) : fileUploaded ? (
//         <p onClick={() => onDrop([])}>
//           Cancel {fileType === 'image' ? 'Image' : 'Video'} Upload
//         </p>
//       ) : (
//         <p>{text}</p>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// fileupload.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

const FileUpload = ({ onFileUpload, text, acceptedFileTypes = 'image/*,video/*' }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileType, setFileType] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        let compressedFile = file;

        if (file.type.startsWith('image/') && file.size > 8 * 1024 * 1024) {
          try {
            const options = {
              maxSizeMB: 8,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };

            compressedFile = await imageCompression(file, options);
          } catch (error) {
            console.error('Error compressing image:', error);
          }
        }

  //       // Check if the file is a video and its size is <= 10MB
  //       if (file.type.startsWith('video/') && file.size <= 10 * 1024 * 1024) {
  //         onFileUpload(file);
  //         setFileUploaded(true);
  //         setFileType('video');
  //       } else {
  //         // If not a video or exceeds size limit, upload the compressed file (for images) or original file (for videos)
  //         onFileUpload(compressedFile);
  //         setFileUploaded(true);
  //         setFileType(compressedFile.type.startsWith('image/') ? 'image' : 'video');
  //       }
  //     } else {
  //       onFileUpload(null);
  //       setFileUploaded(false);
  //       setFileType(null);
  //     }
  //   },
  //   [onFileUpload]
  // );

  if (file.type.startsWith('video/')) {
    const chunkSize = 4 * 1024 * 1024; // 4MB chunk size
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', chunkIndex);
      formData.append('totalChunks', totalChunks);
      formData.append('fileName', file.name);

      try {
        await axios.post('https://dmfc-server-sql.vercel.app/upload-video-chunk', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });
      } catch (error) {
        console.error('Error uploading video chunk:', error);
      }
    }

    onFileUpload(file);
    setFileUploaded(true);
    setFileType('video');
  } else {
    onFileUpload(compressedFile);
    setFileUploaded(true);
    setFileType(compressedFile.type.startsWith('image/') ? 'image' : 'video');
  }
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
