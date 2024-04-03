// communication.js
import React, { useState } from 'react';
import './communication.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Comm = () => {
  const [userMessages, setUserMessages] = useState([
    { id: 1, sender: 'John', message: 'Hi Admin, I have a question about the new feature on the website.', date: '2024-02-20' },
    { id: 2, sender: 'Jane', message: 'Hello, can you please provide an update on my support ticket?', date: '2024-02-19' },
    { id: 3, sender: 'Bob', message: 'Good morning, I found a bug on the checkout page.', date: '2024-02-18' },
  ]);
  const [staffMessages, setStaffMessages] = useState([
    { id: 1, sender: 'Sarah', message: 'Admin, we have a meeting scheduled for tomorrow at 10 AM.', date: '2024-02-21' },
    { id: 2, sender: 'Mike', message: 'Hey Admin, the server seems to be down. Can you look into it?', date: '2024-02-20' },
  ]);
  const [adminResponseToUser, setAdminResponseToUser] = useState('');
  const [adminResponseToStaff, setAdminResponseToStaff] = useState('');
  const [selectedUserMessage, setSelectedUserMessage] = useState(null);
  const [selectedStaffMessage, setSelectedStaffMessage] = useState(null);
  const [taggedMessageId, setTaggedMessageId] = useState(null);

  const handleSendResponseToUser = () => {
    if (taggedMessageId !== null) {
      const updatedMessages = userMessages.map(message =>
        message.id === taggedMessageId
          ? { ...message, adminResponse: adminResponseToUser }
          : message
      );
      setUserMessages(updatedMessages);
      setTaggedMessageId(null); 
    } else {
      if (selectedUserMessage !== null) {
        const updatedMessages = userMessages.map(message =>
          message.id === selectedUserMessage.id
            ? { ...message, adminResponse: adminResponseToUser }
            : message
        );
        setUserMessages(updatedMessages);
      } else {
        const newMessage = {
          id: userMessages.length + 1,
          sender: 'Admin',
          message: adminResponseToUser,
          date: new Date().toISOString()
        };
        setUserMessages([...userMessages, newMessage]);
      }
    }
    setAdminResponseToUser('');
    setSelectedUserMessage(null);
  };

  const handleSendResponseToStaff = () => {
    if (taggedMessageId !== null) {
      const updatedMessages = staffMessages.map(message =>
        message.id === taggedMessageId
          ? { ...message, adminResponse: adminResponseToStaff }
          : message
      );
      setStaffMessages(updatedMessages);
      setTaggedMessageId(null); // Remove the tag after sending response
    } else {
      if (selectedStaffMessage !== null) {
        const updatedMessages = staffMessages.map(message =>
          message.id === selectedStaffMessage.id
            ? { ...message, adminResponse: adminResponseToStaff }
            : message
        );
        setStaffMessages(updatedMessages);
      } else {
        const newMessage = {
          id: staffMessages.length + 1,
          sender: 'Admin',
          message: adminResponseToStaff,
          date: new Date().toISOString()
        };
        setStaffMessages([...staffMessages, newMessage]);
      }
    }
    setAdminResponseToStaff('');
    setSelectedStaffMessage(null);
  };

  const handleTagMessage = (messageId) => {
    if (taggedMessageId === messageId) {
      setTaggedMessageId(null);
    } else {
      setTaggedMessageId(messageId); 
    }
  };

  return (
    <div className='communication-main-container'>
      <div className='chat-window'>
        <h2>Web Users Chat</h2>
        <div className='chat-box'>
          <GroupChatAppInterface
            messages={userMessages}
            onMessageSelect={setSelectedUserMessage}
            onMessageSend={handleSendResponseToUser}
            selectedMessage={selectedUserMessage}
            adminResponse={adminResponseToUser}
            onAdminResponseChange={setAdminResponseToUser}
            onMessageTag={handleTagMessage}
            taggedMessageId={taggedMessageId}
            chatType="web"
          />
        </div>
      </div>
      <div className='chat-window'>
        <h2>Staff Chat</h2>
        <div className='chat-box'>
          <GroupChatAppInterface
            messages={staffMessages}
            onMessageSelect={setSelectedStaffMessage}
            onMessageSend={handleSendResponseToStaff}
            selectedMessage={selectedStaffMessage}
            adminResponse={adminResponseToStaff}
            onAdminResponseChange={setAdminResponseToStaff}
            onMessageTag={handleTagMessage}
            taggedMessageId={taggedMessageId}
            chatType="staff"
          />
        </div>
      </div>
    </div>
    );
  };
  
  const GroupChatAppInterface = ({
    messages,
    onMessageSelect,
    onMessageSend,
    selectedMessage,
    adminResponse,
    onAdminResponseChange,
    onMessageTag,
    taggedMessageId,
    chatType
  }) => {
    const isAdminMessage = (message) => {
      return message.sender === 'Admin';
    };
  
    const handleToggleMessageSelection = (message) => {
      if (selectedMessage && selectedMessage.id === message.id) {
        onMessageSelect(null); 
      } else {
        onMessageSelect(message); 
      }
    };
  
  
    const handleMessageClassName = (message) => {
      let className = 'message';
      if (selectedMessage && selectedMessage.id === message.id) {
        className += ' selected';
      }
      if (taggedMessageId === message.id) {
        className += ' tagged';
      }
      if (isAdminMessage(message)) {
        className += ' admin-message';
      }
      if (isAdminMessage(message) && chatType === 'web') {
        className += ' admin-message-web'; 
      }
      if (isAdminMessage(message) && chatType === 'staff') {
        className += ' admin-message-staff'; 
      }
      return className;
    };
  
    return (
      <>
        <div className='chat-messages'>
          {messages.map(message => (
            <div
              key={message.id}
              className={handleMessageClassName(message)}
              onClick={() => handleToggleMessageSelection(message)} 
              onMouseEnter={() => onMessageTag(message.id)}
              onMouseLeave={() => onMessageTag(null)}
            >
              <div className='message-sender'>{message.sender}</div>
              <div className='message-content'>{message.message}</div>
              <div className='message-date'>{message.date}</div>
              {message.adminResponse && <div className='admin-response'>{message.adminResponse}</div>}
            </div>
          ))}
        </div>
        <div className='response-form'>
          <textarea
            className='response-textarea'
            placeholder='Type your response here...'
            value={adminResponse}
            onChange={(e) => onAdminResponseChange(e.target.value)}
          />
          <button className='send-button' onClick={onMessageSend}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </>
    );
  };
  
  
  export default Comm;
  