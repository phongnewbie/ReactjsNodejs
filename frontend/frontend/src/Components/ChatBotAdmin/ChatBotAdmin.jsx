import React from "react";

import styled, { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
export default function ChatBotAdmin() {
  const steps = [
    {
      id: "greetings ",
      message: "Hello! how are you today admin, Phong?",
      trigger: "Response1",
    },

    {
      id: "Response1",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: `It's nice dude so what do you want me to do`,
      trigger: "issue",
    },

    {
      id: "issue",
      options: [
        { value: 1, label: "Listen to music", trigger: "music" },
        { value: 2, label: "Manage Job", trigger: "Job" },
      ],
    },
    {
      id: "music",
      message: `You can listen music at https://www.youtube.com/watch?v=RBumgq5yVrA`,
      trigger: "Response",
    },

    {
      id: "Job",
      message: "http://localhost:3000/AdminPage",
      trigger: "Response",
    },
    {
      id: "Response",
      user: true,
      trigger: "Thankyou",
    },
    {
      id: "Thankyou",
      message:
        "Thank you for using our service! If you have more questions, feel free to ask.",
      end: true,
    },
  ];

  const theme = {
    background: "#C9FF8F",
    headerBgColor: "#197B22",
    headerFontSize: "20px",
    botBubbleColor: "#0F3789",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "#FF5733",
    userFontColor: "white",
  };

  // Set some properties of the bot
  const config = {
    botAvatar:
      "https://tse4.mm.bing.net/th?id=OIP.u0PYqmFm5pvQvVrk2eh3gwHaHl&pid=Api&P=0&h=180",
    floating: true,
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBotAdmin headerTitle="Hi Admin" {...config} steps={steps} />
      </ThemeProvider>
    </div>
  );
}
