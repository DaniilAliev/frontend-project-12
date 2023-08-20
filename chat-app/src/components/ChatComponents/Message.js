import React from "react";

const Message = ({ data }) => {
    return (
        <div className="text-break mb-2">
            <b>{data.user}</b>{`: ${data.text}`}
        </div>
    )
}

export default Message;