// gallery.js
import React, { useState } from 'react';
import './gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar'; // Import Calendar component
import 'react-calendar/dist/Calendar.css'; // Import Calendar CSS

const Gall = () => {
  const [mediaList, setMediaList] = useState([]);
  const [mediaTitle, setMediaTitle] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date()); // Initialize with current date
  const [uploadedFile, setUploadedFile] = useState(null); // For preview of uploaded file
  const [showUploadSection, setShowUploadSection] = useState(false);

  const handleUploadMedia = () => {
    // Handle media upload
    const newMedia = {
      title: mediaTitle,
      date: uploadDate.toLocaleDateString(), // Convert date to string
      file: uploadedFile // Store uploaded file in media object
    };
    setMediaList([...mediaList, newMedia]);
    setMediaTitle('');
    setUploadDate(new Date()); // Reset to current date
    setUploadedFile(null); 
    setShowUploadSection(false);
    alert('Media successfully uploaded!');
  };

  const handleDeleteMedia = (index) => {
    const updatedMediaList = [...mediaList];
    updatedMediaList.splice(index, 1);
    setMediaList(updatedMediaList);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file); // Set uploaded file for preview
  };

  return (
    <div className='gallery-main-container'>
      <button className="upload-button" onClick={() => setShowUploadSection(true)}>
        Upload Media
      </button>
      {showUploadSection && (
        <div className="upload-section">
          <input
            type="file"
            accept="image/*, video/*"
            className="media-input"
            onChange={handleFileChange}
          />
          {uploadedFile && (
            <div className="file-preview">
              {uploadedFile.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(uploadedFile)} alt="Preview" />
              ) : (
                <video src={URL.createObjectURL(uploadedFile)} controls />
              )}
            </div>
          )}
          <input
            type="text"
            placeholder="Enter Media Title"
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
            className="title-input"
          />
          <Calendar
            onChange={setUploadDate} // Set selected date to uploadDate state
            value={uploadDate}
            className="date-input" // Apply the same styling as before
          />
          <button className="submit-button" onClick={handleUploadMedia}>
            Submit
          </button>
        </div>
        
      )}
      <div className="media-list">
        {mediaList.map((media, index) => (
          <div className="media-item" key={index}>
            <FontAwesomeIcon
              icon={faTrash}
              className="delete-icon"
              onClick={() => handleDeleteMedia(index)}
            />
            {media.file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(media.file)} alt="Media" />
            ) : (
              <video src={URL.createObjectURL(media.file)} controls />
            )}
            <div className='media-list-txt'>
            <h3>{media.title}</h3>
            <p>{media.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gall;
