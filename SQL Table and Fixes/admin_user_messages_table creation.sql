CREATE TABLE admin_user_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_message_id INT NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  admin_message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);