// content-management.js
import React, { useState } from 'react';
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

const ContentMan = () => {
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

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setContentDetails(prevState => ({
      ...prevState,
      imageSrc: imageUrl,
      body: prevState.body + `![Image](${imageUrl})`
    }));
  };

  const handleVideoUpload = (event) => {
    const videoFile = event.target.files[0];
    const videoUrl = URL.createObjectURL(videoFile);
    setContentDetails(prevState => ({
      ...prevState,
      videoSrc: videoUrl,
      body: prevState.body + `[![Video](${videoUrl})]`
    }));
  };

  const handleSaveContent = () => {
    const formData = new FormData();
    formData.append('imageSrc', contentDetails.imageSrc);
    formData.append('videoSrc', contentDetails.videoSrc);
    formData.append('fullName', contentDetails.fullName);
    formData.append('title', contentDetails.title);

    const formattedDateTime = contentDetails.dateTime.toISOString().split('T')[0];
    formData.append('dateTime', formattedDateTime);

    formData.append('body', contentDetails.body);
    formData.append('uploadTime', contentDetails.uploadTime);
  
    fetch('http://localhost:9000/save-content', {
      method: 'PUT',
      body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
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
        setEditIndex(null);
        setShowContentForm(false);
        alert('Content successfully saved!');
      })
      .catch((error) => {
        console.error('Error saving content:', error);
        alert('Error saving content!');
      });
  };
  

  // const handleSaveContent = () => {
  //   const formData = new FormData();
  //   formData.append('imageSrc', contentDetails.imageSrc);
  //   formData.append('videoSrc', contentDetails.videoSrc);
  //   formData.append('fullName', contentDetails.fullName);
  //   formData.append('title', contentDetails.title);
  //   formData.append('dateTime', contentDetails.dateTime.toISOString()); // Convert to ISO string
  //   formData.append('body', contentDetails.body);
  //   formData.append('uploadTime', contentDetails.uploadTime);
  
  //   fetch('http://localhost:9000/save-content', {
  //     method: 'PUT',
  //     body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Content saved successfully:', data);
  //       setContentDetails({
  //         imageSrc: '',
  //         videoSrc: '',
  //         fullName: '',
  //         title: '',
  //         dateTime: new Date(),
  //         body: '',
  //         uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //       });
  //       setEditIndex(null);
  //       setShowContentForm(false);
  //       alert("Content successfully saved!");
  //     })
  //     .catch(error => {
  //       console.error('Error saving content:', error);
  //       alert("Error saving content!");
  //     });
  // };  
  
  const handleEditContent = (index) => {
    setEditIndex(index);
    const contentToEdit = content[index];
    setContentDetails(contentToEdit);
    setShowContentForm(true);
  };

  const handleDeleteContent = (index) => {
    const updatedContent = [...content];
    updatedContent.splice(index, 1);
    setContent(updatedContent);
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
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {contentDetails.imageSrc && <img src={contentDetails.imageSrc} alt="Preview" />}
            <input type="file" accept="video/*" onChange={handleVideoUpload} />
            {contentDetails.videoSrc && <video controls src={contentDetails.videoSrc}></video>}
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
            <div className="content-item" key={index}>
              <FontAwesomeIcon className='Pen' icon={faPen} onClick={() => handleEditContent(index)} />
              <FontAwesomeIcon className='Trash' icon={faTrash} onClick={() => handleDeleteContent(index)} />
              {item.imageSrc && <img className='media image' src={item.imageSrc} alt="Preview" />}
              {item.videoSrc && <video className='media video' controls src={item.videoSrc}></video>}
              <h3>{item.title}</h3>
              <p>{item.dateTime.toLocaleDateString()} - {item.uploadTime}</p> 
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
