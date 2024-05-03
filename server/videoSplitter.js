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


// //videoSpliter.js
// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// cloudinary.config({
//   cloud_name: 'dua8dfweh',
//   api_key: '751154813919773',
//   api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
// });

// ffmpeg.setFfmpegPath(ffmpegPath);

// const splitVideo = async (videoPath, chunkSize = '4M') => {
//   return new Promise((resolve, reject) => {
//     const segmentUrls = [];
//     const baseFileName = path.basename(videoPath, path.extname(videoPath));

//     ffmpeg(videoPath)
//       .outputOptions([
//         `-f segment`,
//         `-segment_time 5`,
//         `-segment_format mp4`, 
//       ])
//       .on('end', async () => {
//         resolve(segmentUrls);
//       })
//       .on('error', (err) => {
//         reject(err);
//       })
//       .output(`${baseFileName}-%03d.mp4`) // Specify the output format for the segmented files
//       .run();
//   });
// };

// module.exports = { splitVideo };


// const ffmpeg = require('fluent-ffmpeg');
// const cloudinary = require('cloudinary').v2;
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// cloudinary.config({
//   cloud_name: 'dua8dfweh',
//   api_key: '751154813919773',
//   api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
// });

// ffmpeg.setFfmpegPath(ffmpegPath);

// const splitVideo = async (videoPath) => {
//   return new Promise((resolve, reject) => {
//     const segmentUrls = [];
//     const videoName = `split-video-${Date.now()}`;

//     const stream = cloudinary.uploader.upload_large(
//       videoPath,
//       {
//         resource_type: 'video',
//         chunk_size: 2000000, // Adjust this value as needed
//       },
//       async (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result.secure_url);
//         }
//       }
//     );

//     ffmpeg(videoPath)
//       .outputOptions([
//         '-f segment',
//         '-segment_time 5',
//         '-reset_timestamps 1',
//         '-c copy',
//       ])
//       .on('error', (err) => {
//         reject(err);
//       })
//       .output(stream)
//       .run();
//   });
// };

// module.exports = { splitVideo };

const cloudinary = require('cloudinary').v2;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpegStatic = require('ffmpeg-static');
const { spawn } = require('child_process');

cloudinary.config({
  cloud_name: 'dua8dfweh',
  api_key: '751154813919773',
  api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
});

const splitVideo = async (videoPath) => {
  return new Promise((resolve, reject) => {
    const segmentUrls = [];
    const videoName = `split-video-${Date.now()}`;

    const stream = cloudinary.uploader.upload_large(
      videoPath,
      {
        resource_type: 'video',
        chunk_size: 3000000, // Adjust this value as needed
        upload_prefix: videoName,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const ffmpegCommand = `${ffmpegStatic} -i ${videoPath} -c copy -f segment -segment_time 10 -reset_timestamps 1 pipe:1`;

    const ffmpeg = spawn(ffmpegCommand, {
      shell: true,
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    ffmpeg.stdout.pipe(stream);

    ffmpeg.on('error', (err) => {
      reject(err);
    });

    stream.on('end', () => {
      console.log('Video chunked and uploaded to Cloudinary successfully');
    });
  });
};

module.exports = { splitVideo };