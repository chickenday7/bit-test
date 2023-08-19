import { Message } from "@data/chat";
import { UserType } from "@data/user";
import { FC, createRef, useEffect } from "react";
import MessageComponent from "./Message";
import style from "./styles/chat.module.scss";

const Chat: FC<ChatProps> = ({ messages, user }) => {
  const messagesRef = createRef<HTMLDivElement>();

  const scroll = () => {
    messagesRef.current?.scrollTo({
      behavior: "smooth",
      top: messagesRef.current.offsetHeight,
    });
  };
  useEffect(() => {
    scroll();
  }, [messages]);

  return (
    <div ref={messagesRef} className={style.wrapper}>
      {messages.map((message, index) => (
        <MessageComponent user={user} message={message} key={index} />
      ))}
    </div>
  );
};

export default Chat;

type ChatProps = {
  messages: Message[];
  user: UserType;
};
