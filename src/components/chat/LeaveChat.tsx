import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { client } from "../../utils/client";
import { useUser } from "../../store/user";

export const LeaveChat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const IsIn = await client.get(
        `/room/getIsIn?id=${searchParams.get("id")}&email=${user.email}`
      );
      if (IsIn.data.data.length - 1 == 0) {
        await client.delete(`/room/delete?id=${searchParams.get("id")}`);
        alert("방에 인원이 없어 방이 삭제 되었습니다.");
      } else {
        await client.patch("/room/leave", {
          roomId: parseInt(searchParams.get("id")!),
          email: user.email,
        });
        alert("성공적으로 방을 탈퇴하였습니다.");
      }
    },
  });
  const handleDeleteRoom = () => {
    mutate();
    navigate("/");
  };
  return (
    <>
      <Button
        fullWidth
        size="large"
        color="error"
        variant="contained"
        onClick={handleDeleteRoom}
      >
        방 탈퇴하기
      </Button>
    </>
  );
};
