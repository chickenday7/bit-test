/// <reference lib="webworker" />

import { MESSAGE_TYPE, Message } from "@data/chat";
import { FC, useEffect, useState } from "react";
import { CHAT_STATE } from "../../App";
import style from "./input.module.scss";

const Input: FC<InputProps> = ({ setMessages, chatState, setChatState }) => {
  const [request, setRequest] = useState("");

  const submitRequest = async () => {
    if (!request) {
      return;
    }

    setChatState(CHAT_STATE.IN_FLIGHT);
    setMessages((prev) => [
      ...prev,
      { text: request, type: MESSAGE_TYPE.USER },
      { text: "", type: MESSAGE_TYPE.BOT, isActive: true },
    ]);
  };

  useEffect(() => {
    if (chatState === CHAT_STATE.IN_FLIGHT) {
      const requestMessage = request;
      setRequest("");
      const getBotResponse = async () => {
        const abortController = new AbortController();

        await fetch(import.meta.env.VITE_API_URL, {
          body: JSON.stringify({ message: requestMessage }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        }).then((response) => {
          const reader = response.body!.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump(): unknown {
                return reader.read().then(({ done, value }) => {
                  const chunkSize = 32;
                  if (value) {
                    const response = new Uint8Array(value);
                    for (let i = 0; i < response.length; i += chunkSize) {
                      const chunk = response.slice(i, i + chunkSize);
                      const result = JSON.parse(
                        new TextDecoder().decode(chunk),
                      );
                      console.log(result);

                      if (result.status === "content") {
                        setMessages((prev) =>
                          prev.map((element, index) =>
                            element.isActive && index === prev.length - 1
                              ? {
                                  ...element,
                                  text: element.text + result.value,
                                }
                              : element,
                          ),
                        );
                      } else if (result.status === "done") {
                        setMessages((prev) =>
                          prev.map((element) => {
                            if (element.isActive) {
                              delete element.isActive;
                            }
                            return element;
                          }),
                        );
                      }
                      setChatState(CHAT_STATE.DEFAULT);
                    }
                  }

                  if (done) {
                    controller.close();
                    return;
                  }

                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          });
        });
      };
      getBotResponse();
    }
  }, [chatState]);

  return (
    <div className={style.wrapper}>
      <input
        className={style.input}
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        placeholder="Start typing here..."
      />
      <button
        disabled={chatState === CHAT_STATE.IN_FLIGHT}
        onClick={submitRequest}
        className={`${style.submit} ${
          chatState === CHAT_STATE.IN_FLIGHT && style.submit_disabled
        }`}
      />
    </div>
  );
};

export default Input;

type InputProps = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChatState: React.Dispatch<React.SetStateAction<CHAT_STATE>>;
  chatState: CHAT_STATE;
};
