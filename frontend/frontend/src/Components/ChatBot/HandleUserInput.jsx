import React, { useState } from "react";
import axios from "axios";

export default function HandleUserInput() {
  const [userInput, setUserInput] = useState("");
  const [botAnswer, setBotAnswer] = useState("");

  const handleUserInput = async () => {
    try {
      // Gửi yêu cầu đến API của OpenAI với giá trị của ô input
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: userInput,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_OPENAI_API_KEY", // Thay YOUR_OPENAI_API_KEY bằng API key thực tế của bạn
          },
        }
      );

      // Lấy câu trả lời từ API và cập nhật state
      setBotAnswer(response.data.choices[0].text.trim());
    } catch (error) {
      console.error("Error fetching data from OpenAI API", error);
    }
  };

  const handleSubmit = () => {
    handleUserInput();
    setUserInput(""); // Xóa giá trị ô input sau khi submit
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <p>User: {userInput}</p>
        <p>Bot: {botAnswer}</p>
      </div>
    </div>
  );
}
