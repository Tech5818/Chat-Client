import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { client } from "../utils/client";
import { UserList } from "../components/chat/UserList";
import { Main } from "../components/chat/Main";
import { IRoom } from "../types/Room";
import { useSocket } from "../store/socket";

const endpoint = "http://localhost:8000";
export const ChatPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { socket, setSocket } = useSocket();
  const { data } = useQuery({
    queryKey: ["chat-room"],
    queryFn: async () => {
      const response = await client
        .get(`/room/get?id=${searchParams.get("id")}`)
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
      console.log(response!.data.data);

      return response!.data.data as IRoom;
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    const socketIO = io(endpoint);
    socketIO.emit("join", { roomId: "4" });
    setSocket?.(socketIO);

    return () => {
      socket && socket!.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        <UserList users={data && data!.users} />
        <Main room={data!} />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
