/* // Content-management.js
import React, { useState, useRef } from 'react';
import './content-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash, faCalendarTimes, faBold, faItalic, faUnderline, faImage, faVideo, faHeading, faParagraph } from '@fortawesome/free-solid-svg-icons';

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
//   const [fontSize, setFontSize] = useState(16);

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
  
      if (tag === 'b' || tag === 'i' || tag === 'u' || tag === 'h1' || tag === 'p') {
        if (alreadyFormatted) {
          document.execCommand('removeFormat', false, tag);
        } else {
          document.execCommand(tag);
        }
      }

      range.surroundContents(formattedText);
  
      setContentDetails({ ...contentDetails, body: contentEditable.innerHTML });
    }
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
              <button onClick={() => handleFormatText('h1')}><FontAwesomeIcon icon={faHeading} /></button>
              <button onClick={() => handleFormatText('p')}><FontAwesomeIcon icon={faParagraph} /></button>
              <button onClick={handleImageUpload}><FontAwesomeIcon icon={faImage} /></button>
              <button onClick={handleVideoUpload}><FontAwesomeIcon icon={faVideo} /></button>
            </div>
            <div
              className="content-body"
              contentEditable="true"
              ref={contentEditableRef}
              placeholder="Body"
              onBlur={(e) => setContentDetails({ ...contentDetails, body: e.target.innerHTML })}
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
 */

/* // Content-management.js
import React, { useState, useRef, useEffect } from 'react';
import './content-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash, faCalendarTimes, faBold, faItalic, faUnderline, faImage, faVideo, faHeading, faParagraph } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';

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
  const editorRef = useRef(null);

  useEffect(() => {
    if (editIndex !== null && editorRef.current) {
      editorRef.current.editor.setContent(contentDetails.body);
    }
  }, [editIndex, contentDetails.body]);

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
            <Editor
              apiKey="rslxpoza53kiqj7xtevm8znouxk98uizxob2icn7i5mnunez"
              Value={contentDetails.body}
              init={{
                height: 300,
                menubar: 'edit format',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | image media | link unlink | forecolor backcolor | fontselect fontsizeselect | bullist numlist | removeformat | help',
                content_style: 'body { font-family: Arial, sans-serif; font-size: 14px }',
                fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Times New Roman=times new roman,times,serif',
                setup: (editor) => {
                  editor.ui.registry.addButton('customHeading', {
                    text: 'Heading',
                    onAction: () => editor.execCommand('mceToggleFormat', false, 'h1')
                  });
                }
              }}
              onEditorChange={(content) => setContentDetails({ ...contentDetails, body: content })}
              ref={editorRef}
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

export default ContentMan; */

// Content-management.js
import React, { useState, useRef, useEffect } from 'react';
import './content-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import QuillTextEditor from './quil-txt-editor';

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
  const editorRef = useRef(null);

  useEffect(() => {
    if (editIndex !== null && editorRef.current) {
      editorRef.current.setEditorState(contentDetails.body);
    }
  }, [editIndex, contentDetails.body]);

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
            <QuillTextEditor value={contentDetails.body} onChange={(content) => setContentDetails({ ...contentDetails, body: content })} />
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


