import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../utils/useAuth.jsx';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const MessagesBox = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const messagesRef = useRef(null);
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count: channelMessages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesRef}>
        {channelMessages.map((message) => {
          const isCurrentUser = currentUser.username === message.username;
          const messageClass = `text-break mb-2 bg-${isCurrentUser ? 'secondary bg-opacity-10 p-2' : 'white'}`;
          return (
            <div key={message.id} className={messageClass}>
              <b>{message.username}</b>
              {': '}
              {message.body}
            </div>
          );
        })}
      </div>
      <NewMessageForm currentChannelId={currentChannelId} />
    </div>
  );
};

export default MessagesBox;
