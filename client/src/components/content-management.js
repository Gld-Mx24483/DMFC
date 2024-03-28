// // content-management.js
// import React, { useState } from 'react';
// import './content-management.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faPlus, faTrash, faCalendarTimes, faBold, faItalic, faUnderline, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

// const ContentMan = () => {
//   const [content, setContent] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [contentDetails, setContentDetails] = useState({
//     imageSrc: '',
//     videoSrc: '',
//     fullName: '',
//     title: '',
//     dateTime: '',
//     body: ''
//   });
//   const [showContentForm, setShowContentForm] = useState(false); 

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setContentDetails(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleImageUpload = (event) => {
//     const imageFile = event.target.files[0];
//     const imageUrl = URL.createObjectURL(imageFile);
//     setContentDetails(prevState => ({
//       ...prevState,
//       body: prevState.body + `![Image](${imageUrl})` // Markdown syntax for images
//     }));
//   };

//   const handleVideoUpload = (event) => {
//     const videoFile = event.target.files[0];
//     const videoUrl = URL.createObjectURL(videoFile);
//     setContentDetails(prevState => ({
//       ...prevState,
//       body: prevState.body + `[![Video](${videoUrl})]` // Markdown syntax for videos
//     }));
//   };

//   const handleFormatText = (tag, fontSize) => {
//     const selectedText = window.getSelection().toString();
//     if (selectedText) {
//       let formattedText = `<${tag}`;
//       if (fontSize) {
//         formattedText += ` style="font-size:${fontSize}px;"`;
//       }
//       formattedText += `>${selectedText}</${tag}>`;
//       setContentDetails(prevState => ({
//         ...prevState,
//         body: prevState.body.replace(selectedText, formattedText)
//       }));
//     }
// };

//   const handleSaveContent = () => {
//     if (editIndex !== null) {
//       const updatedContent = [...content];
//       updatedContent.splice(editIndex, 1, contentDetails);
//       setContent(updatedContent);
//     } else {
//       setContent(prevContent => [...prevContent, contentDetails]);
//     }
//     setContentDetails({
//       imageSrc: '',
//       videoSrc: '',
//       fullName: '',
//       title: '',
//       dateTime: '',
//       body: ''
//     });
//     setEditIndex(null);
//     setShowContentForm(false); // Hide content form after saving
//     alert("Content successfully saved!");
//   };

//   const handleEditContent = (index) => {
//     setEditIndex(index);
//     const contentToEdit = content[index];
//     setContentDetails(contentToEdit);
//     setShowContentForm(true); // Show content form when editing
//   };

//   const handleDeleteContent = (index) => {
//     const updatedContent = [...content];
//     updatedContent.splice(index, 1);
//     setContent(updatedContent);
//   };

//   return (
//     <div className="content-management-main-container">
//       <button className="create-content-button" onClick={() => setShowContentForm(!showContentForm)}>
//         <FontAwesomeIcon icon={showContentForm ? faCalendarTimes : faPlus} />
//         {showContentForm ? 'Cancel' : 'Create Content'}
//       </button>
//       {showContentForm && (
//         <>
//           <h2>{editIndex !== null ? 'Edit Content' : 'Create Content'}</h2>
//           <div className="content-form">
//             <input type="file" accept="image/*" onChange={handleImageUpload} />
//             <input type="file" accept="video/*" onChange={handleVideoUpload} />
//             <input type="text" name="fullName" placeholder="Full Name" value={contentDetails.fullName} onChange={handleInputChange} />
//             <input type="text" name="title" placeholder="Title" value={contentDetails.title} onChange={handleInputChange} />
//             <input type="datetime-local" name="dateTime" value={contentDetails.dateTime} onChange={handleInputChange} />
//             <div className='text-formatting'>
//               <button onClick={() => handleFormatText('b')}><FontAwesomeIcon icon={faBold} /></button>
//               <button onClick={() => handleFormatText('i')}><FontAwesomeIcon icon={faItalic} /></button>
//               <button onClick={() => handleFormatText('u')}><FontAwesomeIcon icon={faUnderline} /></button>
//               <button onClick={() => handleFormatText('span', 14)}>A+</button>
//               <button onClick={() => handleFormatText('span', 10)}>A-</button>
//               <button onClick={() => handleImageUpload()}><FontAwesomeIcon icon={faImage} /></button>
//               <button onClick={() => handleVideoUpload()}><FontAwesomeIcon icon={faVideo} /></button>
//             </div>
//             <textarea name="body" placeholder="Body" value={contentDetails.body} onChange={handleInputChange} />
//             <button onClick={handleSaveContent}>{editIndex !== null ? 'Update Content' : 'Save Content'}</button>
//           </div>
//         </>
//       )}
//       <div className="content-list">
//         {content.map((item, index) => (
//           <div className="content-item" key={index}>
//             <FontAwesomeIcon className='Pen' icon={faPen} onClick={() => handleEditContent(index)} />
//             <FontAwesomeIcon className='Trash' icon={faTrash} onClick={() => handleDeleteContent(index)} />
//             <h3>{item.imageSrc}</h3>
//             <h3>{item.videoSrc}</h3>
//             <h3>{item.title}</h3>
//             <p>{item.dateTime}</p>
//             <p>{item.fullName}</p>
//             <p dangerouslySetInnerHTML={{ __html: item.body }}></p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ContentMan;

import React, { useState, useRef } from 'react';
import './content-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash, faCalendarTimes, faBold, faItalic, faUnderline, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

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
  const [fontSize, setFontSize] = useState(16);

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

const handleFormatText = (tag) => {
    const selectedText = window.getSelection();
    if (selectedText.toString()) {
      const range = selectedText.getRangeAt(0);
      const contentEditable = contentEditableRef.current;
      const alreadyFormatted = range.commonAncestorContainer.parentElement.nodeName === tag.toUpperCase();
  
      let formattedText = document.createElement(tag);
  
      if (tag === 'b' || tag === 'i' || tag === 'u') {
        if (alreadyFormatted) {
          document.execCommand('removeFormat', false, tag);
        } else {
          document.execCommand(tag);
        }
      } else if (tag === 'span') {
        formattedText.style.fontSize = `${fontSize}px`;
      }
  
      range.surroundContents(formattedText);
  
      setContentDetails({ ...contentDetails, body: contentEditable.innerHTML });
    }
  };  

  const handleFontSizeIncrement = () => {
    setFontSize(prevSize => prevSize + 1);
  };

  const handleFontSizeDecrement = () => {
    setFontSize(prevSize => prevSize - 1);
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
            <div className='text-formatting'>
              <button onClick={() => handleFormatText('b')}><FontAwesomeIcon icon={faBold} /></button>
              <button onClick={() => handleFormatText('i')}><FontAwesomeIcon icon={faItalic} /></button>
              <button onClick={() => handleFormatText('u')}><FontAwesomeIcon icon={faUnderline} /></button>
              <button onClick={handleFontSizeIncrement}>A+</button>
              <button onClick={handleFontSizeDecrement}>A-</button>
              <button onClick={handleImageUpload}><FontAwesomeIcon icon={faImage} /></button>
              <button onClick={handleVideoUpload}><FontAwesomeIcon icon={faVideo} /></button>
            </div>
            <div
              className="content-body"
              contentEditable="true"
              ref={contentEditableRef}
              placeholder="Body"
              onBlur={(e) => setContentDetails({ ...contentDetails, body: e.target.innerHTML })}
              style={{ fontSize: `${fontSize}px` }}
            />
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
