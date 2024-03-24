import styled from "styled-components";
import { IRoomUser, IUsers } from "../../types/User";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const UserList = ({ users }: { users?: IRoomUser[] }) => {
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
  return (
    <>
      <Container>
        <Typography fontSize="32px" fontWeight="bold" marginBottom="10px">
          멤버 {data && data!.length}명
        </Typography>
        <Box display="flex" flexDirection="column" gap="10px" flex={1}>
          {data &&
            data!.map((value, idx) => (
              <UserBox key={idx}>{value.username}</UserBox>
            ))}
        </Box>
        <Box fontSize={24} display="flex" justifyContent="flex-end">
          <Link to="/">홈 바로가기</Link>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 300px;
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
`;
