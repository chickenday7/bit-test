import Input from "@components/Input";
import { messagesInit } from "@data/chat";
import { user as userInit } from "@data/user";
import { useState } from "react";
import Chat from "./components/Chat";
import Title from "./components/Title";

function App() {
  const [messages, setMessages] = useState(messagesInit);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _setUser] = useState(userInit);
  const [chatState, setChatState] = useState(CHAT_STATE.DEFAULT);

  return (
    <>
      <Title />
      <Chat user={user} messages={messages} />
      <Input
        setChatState={setChatState}
        chatState={chatState}
        setMessages={setMessages}
      />
    </>
  );
}

export default App;

export enum CHAT_STATE {
  IN_FLIGHT = "inFlight",
  DEFAULT = "default",
}
