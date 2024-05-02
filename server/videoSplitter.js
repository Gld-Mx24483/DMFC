const ffmpeg = require('fluent-ffmpeg');
const cloudinary = require('cloudinary').v2;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

cloudinary.config({
  cloud_name: 'dua8dfweh',
  api_key: '751154813919773',
  api_secret: 'GrBhMTA9cHYq0zuWjtI69XMcxRI',
});

ffmpeg.setFfmpegPath(ffmpegPath);

const splitVideo = async (videoPath, chunkSize = '4M') => {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(videoPath)
      .output('buffer')
      .outputOptions([
        '-f segment',
        `-segment_time ${chunkSize}`, // Specify segment duration in seconds
      ])
      .on('end', async (stdout, stderr) => {
        try {
          const videoPartUrls = await uploadVideoPartsToCloudinary(stdout);
          resolve(videoPartUrls);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
};

const uploadVideoPartsToCloudinary = async (videoBuffer) => {
  const chunkSize = 4 * 1024 * 1024; // 4MB chunk size for Cloudinary
  const chunkCount = Math.ceil(videoBuffer.length / chunkSize);
  const videoPartUrls = [];

  for (let i = 0; i < chunkCount; i++) {
    const start = i * chunkSize;
    const end = (i + 1) * chunkSize;
    const chunk = videoBuffer.slice(start, end);

    const uploadResponse = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        upload_preset: 'your_upload_preset', // Update with your Cloudinary upload preset
        chunk_size: chunkSize,
        eager: [{ format: 'mp4' }],
      },
      (error, result) => {
        if (error) {
          throw error;
        }
        videoPartUrls.push(result.secure_url);
      }
    ).end(chunk);
  }

  return videoPartUrls;
};

module.exports = { splitVideo };
