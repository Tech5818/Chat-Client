import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { useSearchParams } from "react-router-dom";
import { IMessage, useMessages } from "../../store/message";
import { Message } from "./Message";
import { useEffect, useRef } from "react";
import { useSocket } from "../../store/socket";

export const MainChat = () => {
  const [searchParams] = useSearchParams();
  const { messages, setMessages } = useMessages();
  const { socket } = useSocket();
  useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await client.get(
        `/message/getAll?id=${searchParams.get("id")}`
      );

      setMessages([...messages, ...(response.data.data as IMessage[])]);

      return response;
    },
    refetchOnWindowFocus: false,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef!.current!.scrollIntoView();
  }, [messages.length]);
  useEffect(() => {
    socket &&
      socket.on("message", (data: IMessage) => {
        console.log(data);

        setMessages([...messages, data]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        {messages.map((value, idx) => (
          <Message message={value} key={idx} />
        ))}
        <div ref={scrollRef} />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-flow: column;
  gap: 8px;
  padding: 10px;
`;
