import styled from "styled-components";
import { IRoom } from "../../types/Room";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/user";
import { Box } from "@mui/material";
import { LeaveButton } from "./LeaveButton";
import { JoinButton } from "./JoinButton";
import { useEffect, useState } from "react";

export const RoomItem = ({ data }: { data: IRoom }) => {
  const [isIn, setIsIn] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/chat?id=${data.id}`);
  };
  useEffect(() => {
    data.users.map((value) => {
      if (value.userEmail === user.email) {
        setIsIn(true);
      }
    });
  });
  return (
    <>
      <Container onClick={handleClick}>
        <Text>{data.name}</Text>
        <Text>{data.users.length}명</Text>
        <Box flex={1} />
        {isIn ? (
          <LeaveButton roomId={data.id} />
        ) : (
          <JoinButton roomId={data.id} />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 25px 30px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  gap: 50px;
  cursor: pointer;
  transition: 0.2s;
  align-items: center;
  &:hover {
    background: #ececec70;
  }
  &:nth-child(1) {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  &:nth-last-child(1) {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;
const Text = styled.p`
  font-size: 18px;
`;
