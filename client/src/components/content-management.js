// content-management.js
import React, { useState, useEffect } from 'react';
import './content-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/es.js';
import 'froala-editor/js/third_party/font_awesome.min';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FileUpload from './fileupload';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ContentMan = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [overallUploadProgress, setOverallUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [content, setContent] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [contentDetails, setContentDetails] = useState({
    imageSrc: '',
    videoSrc: '',
    fullName: '',
    title: '',
    dateTime: new Date(),
    body: '',
    uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const [showContentForm, setShowContentForm] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      setImageFile(file);
      setContentDetails((prevState) => ({
        ...prevState,
        imageSrc: URL.createObjectURL(file), 
        body: prevState.body,
      }));
    } else {
      setImageFile(null);
      setContentDetails((prevState) => ({
        ...prevState,
        imageSrc: '', 
        body: prevState.body,
      }));
    }
  };

  const handleVideoUpload = (file) => {
    if (file) {
      setVideoFile(file);
      setContentDetails((prevState) => ({
        ...prevState,
        videoSrc: URL.createObjectURL(file),
        body: prevState.body,
      }));
      setUploadProgress(0);
    } else {
      setVideoFile(null);
      setContentDetails((prevState) => ({
        ...prevState,
        videoSrc: '',
        body: prevState.body,
      }));
      setUploadProgress(0);
    }
  };

  const handleSaveContent = () => {
    const formData = new FormData();
    formData.append('id', editIndex !== null ? content[editIndex].id : null);
    formData.append('fullName', contentDetails.fullName);
    formData.append('title', contentDetails.title);
    formData.append('dateTime', contentDetails.dateTime.toISOString().split('T')[0]);
    formData.append('body', contentDetails.body);
    formData.append('uploadTime', contentDetails.uploadTime);
  
    let totalBytes = 0;
  
    if (imageFile) {
      totalBytes += imageFile.size;
      formData.append('image', imageFile);
    }
  
    if (videoFile) {
      totalBytes += videoFile.size;
      formData.append('video', videoFile);
    }
  
    const url = editIndex !== null ? 'https://dmfc-server-sql.vercel.app/update-content' : 'https://dmfc-server-sql.vercel.app/save-content';
    // const url = editIndex !== null ? 'http://localhost:9000/update-content' : 'http://localhost:9000/save-content';
    const method = editIndex !== null ? 'POST' : 'PUT';
  
    fetch(url, {
      method: method,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error saving content');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Content saved successfully:', data);
        setContentDetails({
          imageSrc: '',
          videoSrc: '',
          fullName: '',
          title: '',
          dateTime: new Date(),
          body: '',
          uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setImageFile(null);
        setVideoFile(null);
        setEditIndex(null);
        setShowContentForm(false);
        alert('Content successfully saved!');
        fetchContent();
        setOverallUploadProgress(0);
      })
      .catch((error) => {
        console.error('Error saving content:', error);
        alert('Error saving content!');
        setOverallUploadProgress(0);
      });
  };

  useEffect(() => {
    fetch('https://dmfc-server-sql.vercel.app/get-content')
      .then((response) => response.json())
      .then((data) => {
        console.log('Content fetched:', data);
        setContent(data);
      })
      .catch((error) => console.error('Error fetching content:', error));
  }, []);

  const fetchContent = () => {
    fetch('https://dmfc-server-sql.vercel.app/get-content')
      .then((response) => response.json())
      .then((data) => {
        console.log('Content fetched:', data);
        setContent(data);
      })
      .catch((error) => console.error('Error fetching content:', error));
  };

  const handleEditContent = (index) => {
    setEditIndex(index);
    const contentToEdit = content[index];
    setContentDetails({
      ...contentToEdit,
      imageSrc: contentToEdit.imagePath || '',
      videoSrc: contentToEdit.videoPath || '',
    });
    setShowContentForm(true);
  };

  const handleDeleteContent = (index, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?");

    if (confirmDelete) {
      fetch(`https://dmfc-server-sql.vercel.app/delete-content/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            const updatedContent = [...content];
            updatedContent.splice(index, 1);
            setContent(updatedContent);
            alert('Content deleted successfully!');
          } else {
            alert('Failed to delete content!');
          }
        })
        .catch((error) => {
          console.error('Error deleting content:', error);
          alert('Error deleting content!');
        });
    }
  };

  return (
    <div className="content-management-main-container">
      <button className="create-content-button" onClick={() => setShowContentForm(!showContentForm)}>
        <FontAwesomeIcon icon={showContentForm ? faCalendarTimes : faPlus} />
        {showContentForm ? 'Cancel' : 'Create Content'}
      </button>
      {showContentForm && (
        <>
          <h2>{editIndex !== null ? 'Edit Content' : 'Create Content'}</h2>
          <div className="content-form">
            <div>
              <FileUpload onFileUpload={handleImageUpload} className="fileupload" text="Drag and drop an image or click to select an image" />
              {contentDetails.imageSrc && (
                <img src={contentDetails.imageSrc} alt="Uploaded Image" />
              )}
              <FileUpload onFileUpload={handleVideoUpload} className="fileupload" text="Drag and drop a video or click to select a file" />
              {contentDetails.videoSrc && (
                <video controls src={contentDetails.videoSrc}></video>
              )}
            </div>
            <input type="text" name="fullName" placeholder="Full Name" value={contentDetails.fullName} onChange={handleInputChange} />
            <input type="text" name="title" placeholder="Title" value={contentDetails.title} onChange={handleInputChange} />
            <div className="date-time-picker">
              <Calendar
                onChange={(date) => setContentDetails({ ...contentDetails, dateTime: date })}
                value={contentDetails.dateTime}
              />
              <input type="time" name="uploadTime" value={contentDetails.uploadTime} onChange={handleInputChange} />
            </div>
            <div className="custom-froala-editor">
              <FroalaEditorComponent
                tag='textarea'
                config={{
                  toolbarInline: false,
                  heightMin:230,
                  width:1310,
                  placeholderText: ' ',
                  fontFamily: {
                    "Arial,Helvetica,sans-serif": "Arial",
                    "Georgia,serif": "Georgia",
                    "Impact,Charcoal,sans-serif": "Impact",
                    "Tahoma,Geneva,sans-serif": "Tahoma",
                    "Verdana,Geneva,sans-serif": "Verdana"
                  }
                }}
                model={contentDetails.body}
                onModelChange={(newModel) => setContentDetails({ ...contentDetails, body: newModel })}
              />
            </div>
            <div className="upload-progress">
        <CircularProgressbar
          value={overallUploadProgress}
          text={`${overallUploadProgress}%`}
          styles={buildStyles({
            textColor: 'black',
            pathColor: 'green',
            trailColor: 'lightgray',
          })}
        />
      </div>
            <button className="but" onClick={handleSaveContent}>{editIndex !== null ? 'Update Content' : 'Save Content'}</button>
          </div>
        </>
      )}
      <div className="content-list">
        {content.length === 0 ? (
          <div className="no-events-message no-content">
            <p>No content at the moment</p>
            <FontAwesomeIcon icon={faCalendarTimes} className="no-events-icon" />
          </div>
        ) : (
          content.map((item, index) => (
            // <div className="content-item" key={index.id}>
            //   <FontAwesomeIcon className='Pen' icon={faPen} onClick={() => handleEditContent(index)} />
            //   <FontAwesomeIcon className='Trash' icon={faTrash} onClick={() => handleDeleteContent(index, item.id)} />
            //   {item.imagePath && <img className="media image" src={item.imagePath} alt="Preview" />}
            //   {item.videoPath && <video className="media video" controls src={item.videoPath}></video>}
            //   <h3>{item.title}</h3>
            //   <p>{item.dateTime} - {item.uploadTime}</p>
            //   <p>{item.fullName}</p>
            //   <div className='wysiwyg' dangerouslySetInnerHTML={{ __html: item.body }}></div>
            // </div>
            <div className="content-item" key={index.id}>
  <FontAwesomeIcon className='Pen' icon={faPen} onClick={() => handleEditContent(index)} />
  <FontAwesomeIcon className='Trash' icon={faTrash} onClick={() => handleDeleteContent(index, item.id)} />
  {item.imagePath && <img className="media image" src={item.imagePath} alt="Preview" />}
  {item.videoPartUrls && item.videoPartUrls.length > 0 && (
    <div className="video-player">
      {item.videoPartUrls.map((videoPartUrl, index) => (
        <video key={index} controls src={videoPartUrl}></video>
      ))}
    </div>
  )}
  <h3>{item.title}</h3>
  <p>{item.dateTime} - {item.uploadTime}</p>
  <p>{item.fullName}</p>
  <div className='wysiwyg' dangerouslySetInnerHTML={{ __html: item.body }}></div>
</div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentMan;