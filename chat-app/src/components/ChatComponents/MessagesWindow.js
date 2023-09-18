import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';
import Message from './Message';
import { getCurrentChannel, selectCurrentChannelId } from '../../slices/channelsSlice';
import { selectors as messagesSelectors } from '../../slices/messagesSlice';

const MessagesWindow = () => {
  const { t } = useTranslation();

  const currentId = useSelector(selectCurrentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);

  const currentChannel = useSelector(getCurrentChannel);

  const currentMessages = messages.filter((message) => message.channelId === currentId);

  const messagesCount = currentMessages.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${currentChannel && currentChannel.name}`}
            </b>
          </p>
          <span className="text-muted">{`${messagesCount} ${t('chatPage.messageCount', { count: messagesCount })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => <Message data={message} key={message.id} />)}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesWindow;
