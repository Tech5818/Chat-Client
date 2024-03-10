import styled from "styled-components";
import { IUser } from "../../store/user";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { useState } from "react";
import { Skeleton } from "@mui/material";

export const Room = ({ user }: IUser) => {
  const [userData, setUserData] = useState(null);
  useQuery({
    queryKey: ["userDatas"],
    queryFn: async () => {
      client
        .get(`/user/get?email=${user.email}`)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((error) => console.log(error));
      return true;
    },
    enabled: !!user.email,
  });
  return (
    <>
      <Container>
        {userData ? (
          <UserInfoBox>{JSON.stringify(userData)}</UserInfoBox>
        ) : (
          <Skeleton height="81px" />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 1100px;
  height: 100vh;
  padding-top: 10px;
`;

const UserInfoBox = styled.div`
  width: 100%;
  padding: 30px;
`;
