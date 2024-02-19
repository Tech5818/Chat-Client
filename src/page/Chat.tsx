import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import styled from "styled-components";

const endpoint = "http://localhost:8000";
export const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io(endpoint);
    setSocket(newSocket);
    newSocket.on("connection", () => {
      console.log("connect");
    });

    newSocket.on("disconnect", () => {
      console.log("disconnect");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg: string) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== "" && socket) {
      // socket.emit('message', {id: })
    }
  };

  return (
    <>
      <Container>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>send</button>
      </Container>
    </>
  );
};

const Container = styled.div``;
