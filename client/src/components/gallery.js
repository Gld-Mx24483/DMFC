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
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    fetch('http://localhost:9000/get-media')
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

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (videoFile) {
      formData.append('video', videoFile);
    }

    fetch('http://localhost:9000/upload-media', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Media uploaded successfully:', data);
        setMediaTitle('');
        setUploadDate(new Date());
        setImageFile(null);
        setVideoFile(null);
        setShowUploadSection(false);
        fetchMedia(); // Fetch updated media data
        alert('Media successfully uploaded!');
      })
      .catch((error) => {
        console.error('Error uploading media:', error);
        alert('Error uploading media!');
      });
  };

  const handleImageUpload = (file) => {
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };

  const handleVideoUpload = (file) => {
    if (file) {
      setVideoFile(file);
    } else {
      setVideoFile(null);
    }
  };

  const handleDeleteMedia = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this media?");

    if (confirmDelete) {
      const mediaId = mediaList[index].id;

      fetch(`http://localhost:9000/delete-media/${mediaId}`, {
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
          <FileUpload onFileUpload={handleImageUpload} className="fileupload" text="Drag and drop an image or click to select an image" />
          {imageFile && (
            <div className="file-preview">
              <img src={URL.createObjectURL(imageFile)} alt="Preview" />
            </div>
          )}
          <FileUpload onFileUpload={handleVideoUpload} className="fileupload" text="Drag and drop a video or click to select a video" />
          {videoFile && (
            <div className="file-preview">
              <video src={URL.createObjectURL(videoFile)} controls />
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
              <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteMedia(index)}/>
              {media.imagePath && <img src={media.imagePath} alt="Media" />}
              {media.videoPath && <video controls src={media.videoPath}></video>}
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