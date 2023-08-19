import React, { useRef } from "react";
import MessageForm from "./MessageForm";
import { useChat } from "../../context";
import { useSelector } from "react-redux";
import { selectors } from "../../slices/channelsSlice";

const MessagesWindow = () => {
  const currentId = useSelector((state) => state.currentChannelId.id);
  const channels = useSelector(selectors.selectAll);

  const currentChannel = channels.filter((channel) => channel.id === currentId).shift();

  console.log(currentChannel);

  const inputEl = useRef(null);

  return(
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel && currentChannel.name}</b></p>
          <span className="text-muted">сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">

        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default MessagesWindow;