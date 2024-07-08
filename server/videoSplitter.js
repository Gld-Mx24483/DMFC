// // const ffmpeg = require('fluent-ffmpeg');
// // const cloudinary = require('cloudinary').v2;
// // const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// // cloudinary.config({
// //   cloud_name: 'dua8dfweh',
// //   api_key: '751154813919773',
// //   api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
// // });

// // ffmpeg.setFfmpegPath(ffmpegPath);

// // const splitVideo = async (videoPath, chunkSize = '4M') => {
// //   return new Promise((resolve, reject) => {
// //     const command = ffmpeg(videoPath)
// //       .output('buffer')
// //       .outputOptions([
// //         '-f segment',
// //         `-segment_time ${chunkSize}`, // Specify segment duration in seconds
// //       ])
// //       .on('end', async (stdout, stderr) => {
// //         try {
// //           const videoPartUrls = await uploadVideoPartsToCloudinary(stdout);
// //           resolve(videoPartUrls);
// //         } catch (error) {
// //           reject(error);
// //         }
// //       })
// //       .on('error', (err) => {
// //         reject(err);
// //       })
// //       .run();
// //   });
// // };

// // const uploadVideoPartsToCloudinary = async (videoBuffer) => {
// //   const chunkSize = 4 * 1024 * 1024; // 4MB chunk size for Cloudinary
// //   const chunkCount = Math.ceil(videoBuffer.length / chunkSize);
// //   const videoPartUrls = [];

// //   for (let i = 0; i < chunkCount; i++) {
// //     const start = i * chunkSize;
// //     const end = (i + 1) * chunkSize;
// //     const chunk = videoBuffer.slice(start, end);

// //     const uploadResponse = await cloudinary.uploader.upload_stream(
// //       {
// //         resource_type: 'video', 
// //         chunk_size: chunkSize,
// //         eager: [{ format: 'mp4' }],
// //       },
// //       (error, result) => {
// //         if (error) {
// //           throw error;
// //         }
// //         videoPartUrls.push(result.secure_url);
// //       }
// //     ).end(chunk);
// //   }

// //   return videoPartUrls;
// // };

// // module.exports = { splitVideo };


// // videoSplitter.js
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// cloudinary.config({
//   cloud_name: 'dua8dfweh',
//   api_key: '751154813919773',
//   api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
// });

// ffmpeg.setFfmpegPath(ffmpegPath);

// const splitVideo = async (videoPath, outputDir, chunkSize = '4M') => {
//   return new Promise((resolve, reject) => {
//     const outputPattern = path.join(outputDir, 'part-%03d.mp4');
//     const command = ffmpeg(videoPath)
//       .output(outputPattern)
//       .outputOptions([
//         '-f segment',
//         '-segment_time 5', // Specify segment duration in seconds
//       ])
//       .on('end', async () => {
//         const chunkFiles = fs.readdirSync(outputDir).map(file => path.join(outputDir, file));
//         const uploadPromises = chunkFiles.map(async (chunkFile, index) => {
//           const uploadResponse = await cloudinary.uploader.upload(chunkFile, {
//             resource_type: 'video',
//             public_id: `content-videos/${path.basename(videoPath, path.extname(videoPath))}-part${index}`,
//           });
//           return uploadResponse.secure_url;
//         });

//         const videoPartUrls = await Promise.all(uploadPromises);
//         resolve(videoPartUrls);
//       })
//       .on('error', (err) => {
//         reject(err);
//       })
//       .run();
//   });
// };

// module.exports = { splitVideo };


// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// const path = require('path');

// cloudinary.config({
//   cloud_name: 'dua8dfweh',
//   api_key: '751154813919773',
//   api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
// });

// const splitVideo = async (videoPath, outputDir) => {
//   const videoBuffer = fs.readFileSync(videoPath);
//   const uploadResponse = await cloudinary.uploader.upload_large(
//     videoBuffer,
//     {
//       resource_type: 'video',
//       public_id: `content-videos/${path.basename(videoPath, path.extname(videoPath))}`,
//       chunk_size: 6000000, // 6MB chunk size
//     },
//     (error, result) => {
//       if (error) {
//         console.error('Error uploading video:', error);
//       } else {
//         console.log('Video uploaded successfully:', result);
//       }
//     }
//   );

//   return uploadResponse.secure_url;
// };

// module.exports = { splitVideo };

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dua8dfweh',
  api_key: '751154813919773',
  api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
});

const splitVideo = async (videoPath, outputDir) => {
  if (!fs.existsSync(videoPath)) {
    throw new Error('Video file not found');
  }

  const videoBuffer = fs.readFileSync(videoPath);
  const publicId = `content-videos/${path.basename(videoPath, path.extname(videoPath))}`;
  const uploadResponse = await cloudinary.uploader.upload_large(
    videoBuffer,
    {
      resource_type: 'video',
      public_id: publicId,
      chunk_size: 6000000, // 6MB chunk size
    },
    (error, result) => {
      if (error) {
        console.error('Error uploading video:', error);
      } else {
        console.log('Video uploaded successfully:', result);
      }
    }
  );

  return uploadResponse.secure_url;
};

module.exports = { splitVideo };
