import React from "react";
import cn from "classnames";
import { useChat } from "../../context";
import { useSelector } from "react-redux";

const Channel = ({ channel }) => {
  const currentId = useSelector((state) => state.currentChannelId.id);

  const { setCurrentId } = useChat();

  const handleClick = () => {
    setCurrentId(channel.id);
  };


  const className = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': currentId === channel.id,
  });

  return(
    <li className="nav-item w-100">
      <button type="button" className={className} onClick={handleClick}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  )
};

export default Channel;