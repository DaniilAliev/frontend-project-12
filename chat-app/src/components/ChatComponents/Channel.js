import React from 'react';
import cn from 'classnames';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../context';

const Channel = ({ channel, showModal }) => {
  const { t } = useTranslation();

  const currentId = useSelector((state) => state.currentChannelId.id);

  const { setCurrentId } = useChat();

  const handleClick = () => {
    setCurrentId(channel.id);
  };

  const className = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn');

  const variant = channel.id === currentId ? 'secondary' : 'default';

  const filteredChannelName = filter.clean(channel.name);

  const notRemovableButton = (
    <li className="nav-item w-100">
      <Button variant={variant} className={className} onClick={handleClick}>
        {`# ${filteredChannelName}`}
      </Button>
    </li>
  );

  const removableButton = (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={variant}
          onClick={handleClick}
          className={className}
        >
          {`# ${filteredChannelName}`}
        </Button>
        <>
          <Dropdown.Toggle variant={variant} split className="border-0">
            <span className="visually-hidden">{t('chatPage.channelOptions')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => showModal('removing', channel)}>{t('chatPage.removeChannel')}</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => showModal('renaming', channel)}>{t('chatPage.renameChannel')}</Dropdown.Item>
          </Dropdown.Menu>
        </>
      </Dropdown>
    </li>
  );

  return (channel.removable ? removableButton : notRemovableButton);
};

export default Channel;
