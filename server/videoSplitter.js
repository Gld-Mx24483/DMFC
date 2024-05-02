// videoSplitter.js
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dua8dfweh',
    api_key: '751154813919773',
    api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
});

const splitVideo = async (videoPath, outputDir, chunkSize = '4M') => {
  return new Promise((resolve, reject) => {
    const outputPattern = path.join(outputDir, 'part-%03d.mp4');
    const command = ffmpeg(videoPath)
      .output(outputPattern)
      .outputOptions([
        '-f segment',
        '-segment_time 0',
        `-segment_size ${chunkSize}`,
        '-reset_timestamps 1',
        '-c copy',
      ])
      .on('end', async () => {
        const chunkFiles = fs.readdirSync(outputDir).map(file => path.join(outputDir, file));
        const uploadPromises = chunkFiles.map(async (chunkFile, index) => {
          const stream = fs.createReadStream(chunkFile);
          const uploadResponse = await cloudinary.uploader.upload_large(stream, {
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