// communication.js
import React, { useState } from 'react';
import './communication.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
  const [selectedChatType, setSelectedChatType] = useState('web'); // Default to web chat

  const handleSendResponseToUser = () => {
    const message = adminResponseToUser.trim();
    if (message !== '') {
      const newMessage = {
        id: userMessages.length + 1,
        sender: 'Admin',
        message,
        date: new Date().toISOString(),
        inResponseTo: selectedUserMessage ? selectedUserMessage.id : null // Reference to the selected user message if any
      };
      setUserMessages([...userMessages, newMessage]);
      setAdminResponseToUser('');
      setSelectedUserMessage(null);
    }
  };
  
  const handleSendResponseToStaff = () => {
    const message = adminResponseToStaff.trim();
    if (message !== '') {
      const newMessage = {
        id: staffMessages.length + 1,
        sender: 'Admin',
        message,
        date: new Date().toISOString(),
        inResponseTo: selectedStaffMessage ? selectedStaffMessage.id : null // Reference to the selected staff message if any
      };
      setStaffMessages([...staffMessages, newMessage]);
      setAdminResponseToStaff('');
      setSelectedStaffMessage(null);
    }
  };

  const handleTagMessage = (messageId) => {
    if (taggedMessageId === messageId) {
      setTaggedMessageId(null);
    } else {
      setTaggedMessageId(messageId); 
    }
  };

  const handleChatTypeChange = (chatType) => {
    setSelectedChatType(chatType);
  };

  return (
    <div className='communication-main-container'>
      <div className='chat-window'>
        <h2>Web Users</h2>
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
            onChatTypeChange={handleChatTypeChange}
            selectedChatType={selectedChatType}
          />
        </div>
      </div>
      <div className='chat-window'>
        <h2>Staff</h2>
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
            onChatTypeChange={handleChatTypeChange}
            selectedChatType={selectedChatType}
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
  chatType,
}) => {
  const isAdminMessage = (message) => {
    return message.sender === 'Admin';
  };

  const isUserMessage = (message) => {
    return message.sender !== 'Admin';
  };

  const getMessageReference = (message) => {
    const referencedMessage = messages.find(msg => msg.id === message.inResponseTo);
    if (referencedMessage) {
      return `${referencedMessage.sender}: ${referencedMessage.message}`;
    }
    return '';
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
    if (isUserMessage(message)) {
      className += ' sent-by-user';
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
            {message.inResponseTo && (
              <div className='message-reference'>
                {getMessageReference(message)}
              </div>
            )}
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
