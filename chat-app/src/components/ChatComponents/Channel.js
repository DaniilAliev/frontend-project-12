import React from "react";
import cn from "classnames";
import { useChat } from "../../context";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const Channel = ({ channel, showModal }) => {
  const currentId = useSelector((state) => state.currentChannelId.id);

  const { setCurrentId } = useChat();

  const handleClick = () => {
    setCurrentId(channel.id);
  };

  const className = cn('w-100', 'rounded-0', 'text-start', 'btn');

  const variant = channel.id === currentId ? 'secondary' : 'default';

  const notRemovableButton = 
  <li className="nav-item w-100">
    <Button variant={variant} className={className} onClick={handleClick}>
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  </li>

  const removableButton = 
  <li className="nav-item w-100">
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button 
      variant={variant} 
      onClick={handleClick}
      className={className}
      >{`# ${channel.name}`}
      </Button>
      {channel.removable && 
        <>
          <Dropdown.Toggle variant={variant} split className="border-0">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => showModal('renaming', channel)}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </>
      }
    </Dropdown>
  </li>

  return( channel.removable ? removableButton : notRemovableButton ) 
};

export default Channel;