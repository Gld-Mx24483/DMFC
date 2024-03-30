// content-management.js
import React, { useState, useRef } from 'react';
import './content-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js'; 
import 'froala-editor/js/languages/es.js'; 
import 'froala-editor/js/third_party/font_awesome.min'; 

const ContentMan = () => {
  const [content, setContent] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [contentDetails, setContentDetails] = useState({
    imageSrc: '',
    videoSrc: '',
    fullName: '',
    title: '',
    dateTime: '',
    body: ''
  });
  const [showContentForm, setShowContentForm] = useState(false);
  const contentEditableRef = useRef(null);

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
      body: prevState.body + `![Image](${imageUrl})`
    }));
  };

  const handleVideoUpload = (event) => {
    const videoFile = event.target.files[0];
    const videoUrl = URL.createObjectURL(videoFile);
    setContentDetails(prevState => ({
      ...prevState,
      body: prevState.body + `[![Video](${videoUrl})]`
    }));
  };

  const handleSaveContent = () => {
    if (editIndex !== null) {
      const updatedContent = [...content];
      updatedContent.splice(editIndex, 1, contentDetails);
      setContent(updatedContent);
    } else {
      setContent(prevContent => [...prevContent, contentDetails]);
    }
    setContentDetails({
      imageSrc: '',
      videoSrc: '',
      fullName: '',
      title: '',
      dateTime: '',
      body: ''
    });
    setEditIndex(null);
    setShowContentForm(false);
    alert("Content successfully saved!");
  };

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
            <input type="file" accept="video/*" onChange={handleVideoUpload} />
            <input type="text" name="fullName" placeholder="Full Name" value={contentDetails.fullName} onChange={handleInputChange} />
            <input type="text" name="title" placeholder="Title" value={contentDetails.title} onChange={handleInputChange} />
            <input type="datetime-local" name="dateTime" value={contentDetails.dateTime} onChange={handleInputChange} />
            <div className="custom-froala-editor">
              <FroalaEditorComponent
                tag='textarea'
                config={{
                  toolbarInline: false,
                  heightMin:230,
                  placeholderText: 'Write Content',
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
            <button onClick={handleSaveContent}>{editIndex !== null ? 'Update Content' : 'Save Content'}</button>
          </div>
        </>
      )}
      <div className="content-list">
        {content.map((item, index) => (
          <div className="content-item" key={index}>
            <FontAwesomeIcon className='Pen' icon={faPen} onClick={() => handleEditContent(index)} />
            <FontAwesomeIcon className='Trash' icon={faTrash} onClick={() => handleDeleteContent(index)} />
            <h3>{item.imageSrc}</h3>
            <h3>{item.videoSrc}</h3>
            <h3>{item.title}</h3>
            <p>{item.dateTime}</p>
            <p>{item.fullName}</p>
            <div dangerouslySetInnerHTML={{ __html: item.body }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentMan;
