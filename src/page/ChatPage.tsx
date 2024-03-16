import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import styled from "styled-components";
import { client } from "../utils/client";
import { UserList } from "../components/chat/UserList";
import { IUsers } from "../types/User";

const endpoint = "http://localhost:8000";
export const ChatPage = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: ["chat-room"],
    queryFn: async () => {
      const response = await client
        .get(`/room/get?id=${searchParams.get("id")}`)
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
      console.log(response!.data.data.users);

      return response!.data.data.users as IUsers[];
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    const socket = io(endpoint);
    setSocket(socket);
    socket.on("connection", () => {
      console.log("connect");
    });

    socket.emit("join", { email: "sdh230306@sdh.hs.kr" });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket) {
      const handleMessage = (msg: string) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        console.log("data");
      };

      socket.on("message", handleMessage);

      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [socket]);

  const sendMessage = () => {
    setMessages((prevMessages) => [...prevMessages, message]);
    if (message.trim() !== "" && socket) {
      socket.emit("message", {
        email: "sdh230306@sdh.hs.kr",
        roomId: 2,
        message: message,
      });
    }

    setMessage("");
  };

  return (
    <>
      <Container>
        <UserList users={data!} />
        {/* <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>send</button> */}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
