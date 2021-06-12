/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  setQuickButtons,
  renderCustomComponent,
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './App.css';

var socket;
  socket = io(process.env.REACT_APP_SOCKET_URL, { path: process.env.REACT_APP_SOCKET_PATH });

const FormattedMessage = ({ message }) => {
  return (
    <div className="rcw-response">
      <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: message }} />
      <span className="rcw-timestamp">{new Date().toTimeString().slice(0, 5)}</span>
    </div>
  );
};

function Chat() {
  const botId = '5f476f84998b7900197c2e88';
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    socket.on('joined', (_) => {
      addResponseMessage('Joined Chat, Welcome!');
    });
    socket.emit('join', {
      userid: botId,
      pId: '60be14a1c984fd0012193c15',
    });
    socket.on('disconnect', () => {
      socket.open();
    });
    socket.on('new_message', (data) => {
      if (data.input_type === 'button') {
        setQuickButtons(
          data.message.buttons.map((button) => ({ label: button.text, value: button.value }))
        );
        return renderCustomComponent(FormattedMessage, { message: data.message.message }, true);
      } else if (data.input_type === 'Location') {
        return setShowMap(true);
      } else {
        renderCustomComponent(FormattedMessage, { message: data.message }, true);
      }
    });
  }, []);

  const onFileChange = async (e) => {
    const url = process.env.REACT_APP_CHAT_FILE_SERVER_URL + 'sxp/services/upload';
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const options = {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
      url,
    };
    let response = await axios(options);
    let data = response.data.data || [];
    data.forEach((element) => {
      addUserMessage(`![vertical](${process.env.REACT_APP_CHAT_FILE_SERVER_URL}file/${element})`);
    });
    socket.emit('new_message', {
      attachments: data.map(
        (element) => `${process.env.REACT_APP_CHAT_FILE_SERVER_URL}file/${element}`
      ),
      pId: '60be14a1c984fd0012193c15',
      accessToken: localStorage.getItem('token'),
      userid: botId,
      appId: 'working',
    });
  };

  const handleNewQuickReplyMessage = (newMessage) => {
    setQuickButtons([]);
    addUserMessage(newMessage.label);
    socket.emit('new_message', {
      userid: botId,
      pId: '60be14a1c984fd0012193c15',
      accessToken: localStorage.getItem('token'),
      appId: 'working',
      message: newMessage.value,
    });
  };

  const handleNewUserMessage = (newMessage) => {
    setQuickButtons([]);
    socket.emit('new_message', {
      userid: botId,
      pId: '60be14a1c984fd0012193c15',
      accessToken: localStorage.getItem('token'),
      appId: 'working',
      message: newMessage,
    });
  };

  const onRestart = () => {
    setQuickButtons([]);
    socket.emit('new_message', {
      userid: botId,
      pId: '60be14a1c984fd0012193c15',
      accessToken: localStorage.getItem('token'),
      appId: 'working',
      message: '::restart',
    });
  };

  const onEdit = () => {
    setQuickButtons([]);
    socket.emit('new_message', {
      userid: botId,
      pId: '60be14a1c984fd0012193c15',
      accessToken: localStorage.getItem('token'),
      appId: 'working',
      message: '::edit',
    });
  };

  const onLocationSubmit = (data) => {
    setShowMap(false);
    addUserMessage(data.address);
    socket.emit('new_message', {
      userid: botId,
      pId: '60be14a1c984fd0012193c15',
      accessToken: localStorage.getItem('token'),
      appId: 'working',
      message: JSON.stringify(data),
    });
  };

    return (
      <div className="customeChatStyle">
        <Widget
          title="SXP"
          subtitle="Service eXperience Platform"
          imagePreview
          showCloseButton={true}
          fullScreenMode={false}
          senderPlaceHolder="Test Your Flow Here ..."
          handleNewUserMessage={handleNewUserMessage}
          handleQuickButtonClicked={handleNewQuickReplyMessage}
          onRestart={onRestart}
          onEdit={onEdit}
          onFileUpload={onFileChange}
          onLocationSubmit={onLocationSubmit}
          showMap={showMap}
          onMapClose={() => setShowMap(false)}
          defaultMapProps={{
            lat: 17.4362,
            lng: 78.4609,
            apiKey: process.env.REACT_APP_G_MAP_KEY,
          }}
        />
      </div>
    );
}

export default Chat;
