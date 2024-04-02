import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { useUser } from "../../store/user";
import { useReload } from "../../store/reload";

interface ILeaveButton {
  roomId: number;
}

export const LeaveButton = ({ roomId }: ILeaveButton) => {
  const { user } = useUser();
  const { reload, setReload } = useReload();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const IsIn = await client.get(
        `/room/getIsIn?id=${roomId}&email=${user.email}`
      );

      if (IsIn.data.data.length - 1 == 0) {
        await client.delete(`/room/delete?id=${roomId}`).then(() => {
          setReload(!reload);
        });
        alert("방에 인원이 없어 방이 삭제 되었습니다.");
      } else {
        await client
          .patch("/room/leave", {
            roomId: roomId,
            email: user.email,
          })
          .then(() => {
            setReload(!reload);
          });
        alert("성공적으로 방을 탈퇴하였습니다.");
      }
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };
  return (
    <>
      <Container onClick={handleClick}>탈퇴</Container>
    </>
  );
};

const Container = styled.div`
  cursor: pointer;
  height: 100%;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  background: #ff453abb;
  &:hover {
    background: #ff453a;
  }
`;
