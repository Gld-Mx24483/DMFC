// gallery.js
import React, { useState, useEffect } from 'react';
import './gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FileUpload from './fileupload';

const Gall = () => {
  const [mediaList, setMediaList] = useState([]);
  const [mediaTitle, setMediaTitle] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    fetch('https://dmfc-server-sql.vercel.app/get-media')
      .then((response) => response.json())
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

    fetch('https://dmfc-server-sql.vercel.app/upload-media', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Media uploaded successfully:', data);
        setMediaTitle('');
        setUploadDate(new Date());
        setSelectedFile(null);
        setShowUploadSection(false);
        fetchMedia(); // Fetch updated media data
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

  const handleDeleteMedia = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this media?");

    if (confirmDelete) {
      const mediaId = mediaList[index].id;

      fetch(`https://dmfc-server-sql.vercel.app/delete-media/${mediaId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            const updatedMediaList = [...mediaList];
            updatedMediaList.splice(index, 1);
            setMediaList(updatedMediaList);
            alert('Media deleted successfully!');
          } else {
            alert('Failed to delete media!');
          }
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
          mediaList.map((media, index) => (
            <div className="media-item" key={index}>
              <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteMedia(index)}/>
              {media.imagePath && <img className='images'  src={media.imagePath} alt="Media" />}
              {media.videoPath && <video className='videos' controls src={media.videoPath}></video>}
              <div className='media-list-txt'>
                <h3>{media.title}</h3>
                <p>{new Date(media.upload_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gall;