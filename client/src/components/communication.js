// communication.js
import React, { useState, useEffect } from 'react';
import './communication.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Comm = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [adminResponseToUser, setAdminResponseToUser] = useState('');
  const [selectedUserMessageId, setSelectedUserMessageId] = useState(null);

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await fetch('https://dmfc-server-sql.vercel.app/get-contact-messages');
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
        const response = await fetch('https://dmfc-server-sql.vercel.app/get-user-messages-with-admin-responses');
        const data = await response.json();
        const sortedUserMessages = data
          .map((message) => ({
            id: message.id,
            sender: message.name,
            message: message.message,
            email: message.email,
            date: new Date(message.created_at),
            adminResponse: message.admin_message || '',
          }))
          .sort((a, b) => b.date - a.date); // Sort in descending order of date/time
        setUserMessages(sortedUserMessages);
      } catch (error) {
        console.error('Error fetching user messages with admin responses:', error);
      }
    };
  
    fetchUserMessagesWithAdminResponses();
  }, []);

  useEffect(() => {
    const fetchAdminBroadcastMessages = async () => {
      try {
        const response = await fetch('https://dmfc-server-sql.vercel.app/get-admin-broadcast-messages');
        const data = await response.json();
        setUserMessages((prevMessages) => [
          ...prevMessages,
          ...data.map((message) => ({
            id: message.id,
            sender: 'Admin',
            message: message.message,
            date: message.created_at,
          })),
        ]);
      } catch (error) {
        console.error('Error fetching admin broadcast messages:', error);
      }
    };

    fetchAdminBroadcastMessages();
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
      const response = await fetch('https://dmfc-server-sql.vercel.app/save-admin-response', {
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

  const handleMessageSelect = (messageId) => {
    setSelectedUserMessageId((prevId) => (prevId === messageId ? null : messageId));
  };

  return (
    <div className='communication-main-container'>
      <div className='chat-window'>
        <h2>Web Users</h2>
        <div className='chat-box'>
          <GroupChatAppInterface
            messages={userMessages}
            onMessageSelect={handleMessageSelect}
            onMessageSend={handleSendResponseToUser}
            selectedMessageId={selectedUserMessageId}
            adminResponse={adminResponseToUser}
            onAdminResponseChange={setAdminResponseToUser}
            chatType="web"
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
  const handleSendMessage = async () => {
    const message = adminResponse.trim();
    if (message !== '') {
      if (selectedMessageId) {
        // Send the message as a response to the selected message
        onMessageSend();
      } else {
        // Send the message as a broadcast message
        try {
          const response = await fetch('https://dmfc-server-sql.vercel.app/submit-admin-broadcast', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          });
  
          if (response.ok) {
            console.log('Broadcast message submitted successfully');
            onAdminResponseChange('');
            alert('Broadcast Sent Successfully'); // Display success prompt
            window.location.reload(); // Reload the component
          } else {
            console.error('Error submitting broadcast message');
          }
        } catch (error) {
          console.error('Error submitting broadcast message:', error);
        }
      }
    }
  };

  const isAdminMessage = (message) => {
    return message.sender === 'Admin';
  };

  const isUserMessage = (message) => {
    return message.sender !== 'Admin';
  };

  const getMessageReference = (message) => {
    const referencedMessage = messages.find((msg) => msg.id === message.inResponseTo);
    if (referencedMessage) {
      if (isAdminMessage(message)) {
        return `${referencedMessage.sender}: ${referencedMessage.message}`;
      } else {
        return `${referencedMessage.message}`;
      }
    } else if (message.inResponseTo) {
      return 'Broadcast Message'; // Display for broadcast messages
    }
    return '';
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  };

  const handleMessageClassName = (message) => {
    let className = 'message';
    if (selectedMessageId === message.id) {
      className += ' selected';
    }
    if (isAdminMessage(message)) {
      className += ' admin-message';
      if (!message.inResponseTo) {
        className += ' broadcast-message'; 
      }
    }
    if (isUserMessage(message)) {
      className += ' sent-by-user';
    }
    if (isAdminMessage(message) && chatType === 'web') {
      className += ' admin-message-web';
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
            <div className='message-date'>{formatDate(new Date())}</div>
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
    <button className='send-button' onClick={handleSendMessage}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </div>
</>
);
};

export default Comm;


