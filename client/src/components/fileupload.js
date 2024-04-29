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


import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

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
        } else if (file.type.startsWith('video/') && file.size > 100 * 1024 * 1024) {
          // Compress the video using FFmpeg if size exceeds 100MB
          if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
          }

          const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove file extension
          const extension = file.name.split('.').pop();
          const inputPath = `input.${extension}`;
          const outputPath = `output.${extension}`;

          ffmpeg.FS('writeFile', inputPath, await fetchFile(file));

          await ffmpeg.run('-i', inputPath, '-vf', 'scale=-2:480', '-c:a', 'aac', '-b:a', '128k', outputPath);
          const data = ffmpeg.FS('readFile', outputPath);

          compressedFile = new File([data.buffer], `${fileName}-compressed.${extension}`, { type: `video/${extension}` });
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
