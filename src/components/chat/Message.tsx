import styled from "styled-components";
import { IMessage } from "../../store/message";
import { useUser } from "../../store/user";

export const Message = ({ message }: { message: IMessage }) => {
  const { user } = useUser();
  return (
    <>
      <Container $isSender={message.senderEmail === user.email ? true : false}>
        {message.content}
      </Container>
    </>
  );
};

const Container = styled.div<{ $isSender: boolean }>`
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 100px;
  align-self: ${({ $isSender }) => ($isSender ? "self-end" : "self-start")};
`;
