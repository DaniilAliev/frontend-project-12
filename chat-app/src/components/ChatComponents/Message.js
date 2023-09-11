import React from 'react';
import filter from 'leo-profanity';

const Message = ({ data }) => {
  const filteredMessage = filter.clean(data.text);

  return (
    <div className="text-break mb-2">
      <b>{data.user}</b>
      {`: ${filteredMessage}`}
    </div>
  );
};

export default Message;
