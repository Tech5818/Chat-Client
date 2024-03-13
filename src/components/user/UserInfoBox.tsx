import styled from "styled-components";
import { IUser } from "../../store/user";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { Box, Skeleton, Typography } from "@mui/material";

export const UserInfoBox = ({ user }: IUser) => {
  const { data, isPending } = useQuery({
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
        {!isPending ? (
          <Profile>
            <Box display="flex" gap="30px">
              <Text>{data.id}</Text>
              <Text>{data.username}</Text>
            </Box>
            <Text>{data.email}</Text>
          </Profile>
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
`;

const Text = styled.span`
  font-size: 24px;
`;

const SkeletonElement = styled(Skeleton)`
  transform: scale(1) !important;
  border-radius: 14px;
`;
