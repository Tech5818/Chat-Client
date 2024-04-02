import styled from "styled-components";
import { IUser } from "../../store/user";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { Box, Skeleton, Typography } from "@mui/material";
import { LogOutButton } from "./LogOutButton";

export const UserInfoBox = ({ user }: IUser) => {
  const { data } = useQuery({
    queryKey: ["userDatas"],
    queryFn: async () => {
      const response = await client.get(`/user/get?email=${user.email}`);
      return response.data.data;
    },
    enabled: !!user.email,
  });
  return (
    <>
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography fontSize="30px" fontWeight="bold">
          프로필
        </Typography>
        {data ? (
          <>
            <Profile>
              <Text>{data.username}</Text>
              <Box flex={1} />
              <Text>{data.email}</Text>
            </Profile>
            <LogOutButton />
          </>
        ) : (
          <SkeletonElement height={94} />
        )}
      </Box>
    </>
  );
};

const Profile = styled.div`
  width: 100%;
  padding: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Text = styled.span`
  font-size: 24px;
`;

const SkeletonElement = styled(Skeleton)`
  transform: scale(1) !important;
  border-radius: 14px;
`;
