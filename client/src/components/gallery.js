import React, { useState } from 'react';
import './gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';

const Gall = () => {
  const [mediaList, setMediaList] = useState([]);
  const [mediaTitle, setMediaTitle] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date());
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);

  const handleUploadMedia = () => {
    const newMedia = {
      title: mediaTitle,
      date: uploadDate.toLocaleDateString(),
      file: uploadedFile 
    };
    setMediaList([...mediaList, newMedia]);
    setMediaTitle('');
    setUploadDate(new Date());
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
    setUploadedFile(file);
  };

  return (
    <div className='gallery-main-container'>
      <button className="upload-button" onClick={() => setShowUploadSection(!showUploadSection)}>
        {showUploadSection ? 'Cancel Upload' : 'Upload Media'}
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
            onChange={setUploadDate}
            value={uploadDate}
            className="date-input"
          />
          <button className="submit-button" onClick={handleUploadMedia}>
            Submit
          </button>
        </div>
      )}
      <div className="media-list">
        {mediaList.length === 0 ? (
          <div className="no-events-message">
            <p>No media at the moment</p>
            <FontAwesomeIcon icon={faCalendarTimes} className="no-events-icon" />
          </div>
        ) : (
          mediaList.map((media, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Gall;
