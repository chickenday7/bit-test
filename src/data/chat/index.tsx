export enum MESSAGE_TYPE {
  BOT = "bot",
  USER = "user",
}

export type Message = {
  text: string;
  type: MESSAGE_TYPE;
  isActive?: boolean;
};

export const messagesInit: Message[] = [
  {
    text: "Hello! I’m BotHub, AI-based bot designed to answer all your questions.",
    type: MESSAGE_TYPE.BOT,
  },
];
