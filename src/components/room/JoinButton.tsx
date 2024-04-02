import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { useUser } from "../../store/user";
import { useReload } from "../../store/reload";

interface IJoinButton {
  roomId: number;
}

export const JoinButton = ({ roomId }: IJoinButton) => {
  const { user } = useUser();
  const { reload, setReload } = useReload();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await client.put("/room/join", { roomId, email: user.email }).then(() => {
        setReload(!reload);
        alert("참여되었습니다.");
      });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };
  return (
    <>
      <Container onClick={handleClick}>참여</Container>
    </>
  );
};

const Container = styled.div`
  cursor: pointer;
  height: 100%;
  background: #30d158bb;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background: #30d158;
  }
`;
