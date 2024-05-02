// videoSplitter.js
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

cloudinary.config({
  cloud_name: 'dua8dfweh',
  api_key: '751154813919773',
  api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
});

ffmpeg.setFfmpegPath(ffmpegPath);

const splitVideo = async (videoPath, outputDir, chunkSize = '4M') => {
  return new Promise((resolve, reject) => {
    const outputPattern = path.join(outputDir, 'part-%03d.mp4');
    const command = ffmpeg(videoPath)
      .output(outputPattern)
      .outputOptions([
        '-f segment',
        '-segment_time 5', // Specify segment duration in seconds
      ])
      .on('end', async () => {
        const chunkFiles = fs.readdirSync(outputDir).map(file => path.join(outputDir, file));
        const uploadPromises = chunkFiles.map(async (chunkFile, index) => {
          const uploadResponse = await cloudinary.uploader.upload(chunkFile, {
            resource_type: 'video',
            public_id: `content-videos/${path.basename(videoPath, path.extname(videoPath))}-part${index}`,
          });
          return uploadResponse.secure_url;
        });

        const videoPartUrls = await Promise.all(uploadPromises);
        resolve(videoPartUrls);
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
};

module.exports = { splitVideo };

