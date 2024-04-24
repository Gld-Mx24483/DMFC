CREATE TABLE gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  imagePath VARCHAR(255) DEFAULT NULL,
  videoPath VARCHAR(255) DEFAULT NULL,
  upload_date DATE NOT NULL
);