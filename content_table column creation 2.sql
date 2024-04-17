CREATE TABLE content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  imagePath VARCHAR(255) NULL,
  videoPath VARCHAR(255) NULL,
  fullName VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  dateTime DATE NOT NULL,
  body TEXT NOT NULL,
  uploadTime TIME NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);