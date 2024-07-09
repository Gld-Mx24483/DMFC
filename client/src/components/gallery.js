// gallery.js
import { faCalendarTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../services/api';
import FileUpload from './fileupload';
import './gallery.css';

const Gallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [mediaTitle, setMediaTitle] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    api.gallery.getAll()
      .then((data) => {
        console.log('Media fetched:', data);
        setMediaList(data);
      })
      .catch((error) => console.error('Error fetching media:', error));
  };

  const handleUploadMedia = () => {
    const formData = new FormData();
    formData.append('title', mediaTitle);
    formData.append('date', uploadDate.toISOString().split('T')[0]);

    if (selectedFile) {
      formData.append('media', selectedFile);
    }

    api.gallery.upload(formData)
      .then((data) => {
        console.log('Media uploaded successfully:', data);
        setMediaTitle('');
        setUploadDate(new Date());
        setSelectedFile(null);
        setShowUploadSection(false);
        fetchMedia();
        alert('Media successfully uploaded!');
      })
      .catch((error) => {
        console.error('Error uploading media:', error);
        alert('Error uploading media!');
      });
  };

  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

  const handleDeleteMedia = (mediaId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this media?");

    if (confirmDelete) {
      api.gallery.delete(mediaId)
        .then(() => {
          fetchMedia();
          alert('Media deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting media:', error);
          alert('Error deleting media!');
        });
    }
  };

  return (
    <div className='gallery-main-container'>
      <button className="upload-button" onClick={() => setShowUploadSection(!showUploadSection)}>
        {showUploadSection ? 'Cancel Upload' : 'Upload Media'}
      </button>
      {showUploadSection && (
        <div className="upload-section">
          <FileUpload onFileUpload={handleFileUpload} className="fileupload" text="Drag and drop a file or click to select a file (Image or Video)" />
          {selectedFile && (
            <div className="file-preview">
              {selectedFile.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
              ) : selectedFile.type.startsWith('video/') ? (
                <video src={URL.createObjectURL(selectedFile)} controls />
              ) : (
                <p>Unsupported file type</p>
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
            Upload
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
          mediaList.map((media) => (
            <div className="media-item" key={media._id}>
              <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteMedia(media._id)}/>
              {media.mediaType === 'image' ? (
                <img className='images' src={media.mediaUrl} alt={media.title} />
              ) : media.mediaType === 'video' ? (
                <video className='videos' controls src={media.mediaUrl}></video>
              ) : null}
              <div className='media-list-txt'>
                <h3>{media.title}</h3>
                <p>{new Date(media.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;