import styled from "styled-components";
import { useSocket } from "../../store/socket";
import { useForm } from "react-hook-form";
import { useUser } from "../../store/user";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { IMessage, useMessages } from "../../store/message";

export const MainInput = () => {
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const [searchParams] = useSearchParams();
  const { socket } = useSocket();
  const { user } = useUser();
  const { messages, setMessages } = useMessages();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await client.get("/message/getRecentMessage");
      setMessages([...messages, response.data.data as IMessage]);
    },
  });

  const sendMessage = handleSubmit(async (data) => {
    if (data.message.trim() !== "" && socket) {
      socket.emit(
        "message",
        {
          email: user.email,
          roomId: parseInt(searchParams.get("id")!),
          message: data.message,
        },
        (err: unknown, value: boolean) => {
          if (!value) {
            mutate();
          } else {
            console.log(err);
          }
        }
      );
      reset();
    }
  });

  return (
    <>
      <Container onSubmit={sendMessage}>
        <Input placeholder="메세지를 입력하세요." {...register("message")} />
        <Button>보내기</Button>
      </Container>
    </>
  );
};

const Container = styled.form`
  width: 100%;
  height: 70px;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  border: 1px solid #ddd;
  font-size: 16px;
  padding: 20px 70px 20px 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  right: 30px;
  font-size: 16px;
  color: #1493fb;
`;
