// communication.js
import React, { useState, useEffect } from 'react';
import './communication.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Comm = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [staffMessages, setStaffMessages] = useState([
    { id: 1, sender: 'Sarah', message: 'Admin, we have a meeting scheduled for tomorrow at 10 AM.', date: '2024-02-21' },
    { id: 2, sender: 'Mike', message: 'Hey Admin, the server seems to be down. Can you look into it?', date: '2024-02-20' },
  ]);
  const [adminResponseToUser, setAdminResponseToUser] = useState('');
  const [adminResponseToStaff, setAdminResponseToStaff] = useState('');
  const [selectedUserMessageId, setSelectedUserMessageId] = useState(null);
  const [selectedStaffMessageId, setSelectedStaffMessageId] = useState(null);

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await fetch('http://localhost:9000/get-contact-messages');
        const data = await response.json();
        setContactMessages(data);
        const sortedUserMessages = data.map(message => ({
          id: message.id,
          sender: message.name,
          message: message.message,
          email: message.email,
          phone: message.phone,
          date: message.created_at
        })).sort((a, b) => a.email.localeCompare(b.email));
        setUserMessages(sortedUserMessages);
      } catch (error) {
        console.error('Error fetching contact messages:', error);
      }
    };

    fetchContactMessages();
  }, []);

  useEffect(() => {
    const fetchUserMessagesWithAdminResponses = async () => {
      try {
        const response = await fetch('http://localhost:9000/get-user-messages-with-admin-responses');
        const data = await response.json();
        const sortedUserMessages = data.map(message => ({
          id: message.id,
          sender: message.name,
          message: message.message,
          email: message.email,
          date: message.created_at,
          adminResponse: message.admin_message || ''
        })).sort((a, b) => a.email.localeCompare(b.email));
        setUserMessages(sortedUserMessages);
      } catch (error) {
        console.error('Error fetching user messages with admin responses:', error);
      }
    };
  
    fetchUserMessagesWithAdminResponses();
  }, []);

  const handleSendResponseToUser = () => {
    const message = adminResponseToUser.trim();
    if (message !== '') {
      const newMessages = userMessages.map(selectedMessage => {
        if (selectedMessage.id === selectedUserMessageId) {
          return {
            ...selectedMessage,
            adminResponse: message
          };
        }
        return selectedMessage;
      });
  
      // Add a new message from the admin as a reply
      const newAdminMessage = {
        id: userMessages.length + 1,
        sender: 'Admin',
        message,
        date: new Date().toISOString(),
        inResponseTo: selectedUserMessageId
      };
      newMessages.push(newAdminMessage);
  
      setUserMessages(newMessages);
      setAdminResponseToUser('');
      setSelectedUserMessageId(null);
  
      // Save the admin's response to the database
      const selectedMessage = userMessages.find(msg => msg.id === selectedUserMessageId);
      saveAdminResponseToDatabase(selectedUserMessageId, selectedMessage.email, message);
    }
  };
  
  const saveAdminResponseToDatabase = async (userMessageId, userEmail, adminResponse) => {
    try {
      const response = await fetch('http://localhost:9000/save-admin-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userMessageId, userEmail, adminResponse })
      });
  
      if (response.ok) {
        console.log('Admin response saved successfully');
      } else {
        console.error('Error saving admin response');
      }
    } catch (error) {
      console.error('Error saving admin response:', error);
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
        inResponseTo: selectedStaffMessageId ? selectedStaffMessageId : null
      };
      setStaffMessages([...staffMessages, newMessage]);
      setAdminResponseToStaff('');
      setSelectedStaffMessageId(null);
    }
  };

  const handleMessageSelect = (messageId, chatType) => {
    if (chatType === 'web') {
      setSelectedUserMessageId(messageId);
    } else {
      setSelectedStaffMessageId(messageId);
    }
  };

  return (
    <div className='communication-main-container'>
      <div className='chat-window'>
        <h2>Web Users</h2>
        <div className='chat-box'>
          <GroupChatAppInterface
            messages={userMessages}
            onMessageSelect={(messageId) => handleMessageSelect(messageId, 'web')}
            onMessageSend={handleSendResponseToUser}
            selectedMessageId={selectedUserMessageId}
            adminResponse={adminResponseToUser}
            onAdminResponseChange={setAdminResponseToUser}
            chatType="web"
          />
        </div>
      </div>
      <div className='chat-window'>
        <h2>Staff</h2>
        <div className='chat-box'>
          <GroupChatAppInterface
            messages={staffMessages}
            onMessageSelect={(messageId) => handleMessageSelect(messageId, 'staff')}
            onMessageSend={handleSendResponseToStaff}
            selectedMessageId={selectedStaffMessageId}
            adminResponse={adminResponseToStaff}
            onAdminResponseChange={setAdminResponseToStaff}
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
  selectedMessageId,
  adminResponse,
  onAdminResponseChange,
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
      if (isAdminMessage(message)) {
        return `${referencedMessage.sender}: ${referencedMessage.message}`;
      } else {
        return `${referencedMessage.message}`;
      }
    }
    return '';
  };

  const handleMessageClassName = (message) => {
    let className = 'message';
    if (selectedMessageId === message.id) {
      className += ' selected';
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
      {messages.map((message, index) => (
        <>
          <div
            key={message.id}
            className={handleMessageClassName(message)}
            onClick={() => onMessageSelect(message.id)}
          >
            {message.inResponseTo && (
              <div className='message-reference'>
                {getMessageReference(message)}
              </div>
            )}
            <div className='message-sender'>{message.sender}</div>
            <div className='message-content'>{message.message}</div>
            <div className='message-content'>{message.email}</div>
            <div className='message-date'>{new Date(message.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
          </div>

          {message.adminResponse && (
            <div
              key={`admin-response-${message.id}`}
              className={handleMessageClassName({ sender: 'Admin', adminResponse: true, inResponseTo: message.id })}
            >
              <div className='message-reference'>
                {`${message.sender}: ${message.message}`}
              </div>
              <div className='message-sender'>Admin</div>
              <div className='message-content'>{message.adminResponse}</div>
              <div className='message-date'>{new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
            </div>
          )}
        </>
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