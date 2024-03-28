import styled from "styled-components";
import { IRoomUser, IUsers } from "../../types/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useUser } from "../../store/user";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UserList = ({ users }: { users?: IRoomUser[] }) => {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const { user } = useUser();
  const { data } = useQuery<IUsers[]>({
    queryKey: ["chat-user-data"],
    queryFn: async () => {
      const queryString = users!
        .map((value) => `email=${value.userEmail}`)
        .join("&");

      const response = await client.get(`/user/getUsers?${queryString}`);
      console.log(response.data.data);

      return response.data.data;
    },
    enabled: !!users,
    refetchOnWindowFocus: false,
  });
  const { mutate } = useMutation({
    mutationFn: async () => {
      client.delete(`/room/delete?id=${serchParams.get("id")}`);
    },
  });
  const handleToHome = () => {
    navigate("/");
  };
  const handleDeleteRoom = () => {
    mutate();
  };
  return (
    <>
      <Container>
        {!users && !data ? (
          <>
            <SkeletonElement height={48} />
            <SkeletonElement height={63} />
            <SkeletonElement height={63} />
            <SkeletonElement height={63} />
          </>
        ) : (
          <>
            <Typography fontSize="32px" fontWeight="bold" marginBottom="10px">
              멤버 {data && data!.length}명
            </Typography>
            <Box display="flex" flexDirection="column" gap="10px" flex={1}>
              {data &&
                data!.map((value, idx) =>
                  value.email === user.email ? (
                    <UserBox key={idx}>
                      <UserBoxText $fontSize={20} $isBold>
                        {value.username}
                      </UserBoxText>
                    </UserBox>
                  ) : (
                    <UserBox key={idx}>
                      <UserBoxText $fontSize={20}>{value.username}</UserBoxText>
                    </UserBox>
                  )
                )}
              <Button
                fullWidth
                size="large"
                color="error"
                variant="contained"
                onClick={handleDeleteRoom}
              >
                방 삭제하기
              </Button>
            </Box>
            <Button fullWidth size="large" onClick={handleToHome}>
              홈 바로가기
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 450px;
  border-right: 1px solid #dcdcdc;
  padding: 30px;
  display: flex;
  flex-flow: column;
  gap: 10px;
`;
const UserBox = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 14px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const UserBoxText = styled.span<{ $fontSize?: number; $isBold?: boolean }>`
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: ${({ $isBold }) => ($isBold ? "bold" : "normal")};
`;

const SkeletonElement = styled(Skeleton)`
  transform: scale(1);
  -webkit-transform: scale(1);
`;
