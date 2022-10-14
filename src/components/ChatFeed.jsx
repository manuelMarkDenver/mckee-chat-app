import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import MessageForm from "./MessageForm";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  console.log("🚀 ~ file: ChatFeed.jsx ~ line 7 ~ ChatFeed ~ props", props)
  const chat = chats && chats[activeChat];
  const renderReadReceipts = (message, isMyMessage) => {
    const readPeople = chat.people.map((person, index) => {
      console.log("🚀 ~ file: ChatFeed.jsx ~ line 11 ~ readPeople ~ person", person)
      return person.last_read === message.id && (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            marginTop: "5px",
            float: isMyMessage ? "right" : "left",
            backgroundImage:
              person.person.avatar && `url(${person.person.avatar})`,
          }}
        />
      );
    });
    return readPeople;
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);
    
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      console.log("🚀 ~ file: ChatFeed.jsx ~ line 34 ~ returnkeys.map ~ keys[index - 1]", keys[index - 1])
      console.log("🚀 ~ file: ChatFeed.jsx ~ line 34 ~ returnkeys.map ~ lastMessageKey", lastMessageKey)
      const isMyMessage = userName === message.sender.username;
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={message[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
