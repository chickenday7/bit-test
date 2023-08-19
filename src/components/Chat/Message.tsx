import botImg from "@assets/robot.svg";
import { MESSAGE_TYPE, Message as MessageType } from "@data/chat";
import { UserType } from "@data/user";
import { FC } from "react";
import style from "./styles/message.module.scss";

const Message: FC<MessageProps> = ({ message, user }) => {
  const { type, text } = message;

  const isBot = type === MESSAGE_TYPE.BOT;
  const textType = isBot ? style.bot : style.user;
  const bgType = isBot ? style.bg_bot : style.bg_user;
  const avatarType = isBot ? style.avatar_bot : style.avatar_user;
  const wrapperType = isBot ? style.wrapper_bot : style.wrapper_user;

  return (
    <div className={`${style.wrapper} ${wrapperType}`}>
      <div className={`${style.avatar_wrapper} ${avatarType}`}>
        {isBot ? (
          <img src={botImg} />
        ) : user.avatar ? (
          <img width={40} height={40} src={user.avatar} />
        ) : (
          <p>{user.name[0]}</p>
        )}
      </div>

      <div className={`${style.text_wrapper} ${bgType}`}>
        <p className={`${style.text} ${textType}`}>{text}</p>
      </div>
    </div>
  );
};

export default Message;

type MessageProps = {
  message: MessageType;
  user: UserType;
};
