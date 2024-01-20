import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
export default function MessageBot() {
  const steps = [
    {
      id: "greetings ",
      message: "Hello! What can I help you with?",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please write your username",
      trigger: "Waiting1",
    },
    {
      id: "Waiting1",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: `Hi {previousValue}, how can I help you?`,
      trigger: "issue",
    },

    {
      id: "issue",
      options: [
        { value: 1, label: "Where is login", trigger: "Login" },
        { value: 2, label: "where is register", trigger: "Register" },
      ],
    },
    {
      id: "Login",
      message: `http://localhost:3000/login`,
      trigger: "Response",
    },

    {
      id: "Register",
      message: "You can register http://localhost:3000/register",
      trigger: "Response",
    },
    {
      id: "Response",
      user: true,
      trigger: "Thankyou",
    },
    {
      id: "Thankyou",
      component: (
        <div>
          <p>
            Cảm ơn bạn đã ghé thăm trang web của chúng tôi , hy vọng sẽ có 1
            ngày gặp lại
          </p>
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.tld726VPYy7Z4DrRpddX7wHaFD&pid=Api&P=0&h=180"
            alt=""
          />
        </div>
      ),
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
        <ChatBot headerTitle="Support Chat" {...config} steps={steps} />
      </ThemeProvider>
    </div>
  );
}
