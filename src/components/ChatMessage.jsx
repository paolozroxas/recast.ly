var ChatMessage = (props) => (
  <div className="msg">
    <span className="msg-user">{props.message.username}:</span>
    <span className="msg-text">{props.message.text}</span>
  </div>
);