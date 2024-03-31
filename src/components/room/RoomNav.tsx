import styled from "styled-components";
import { CreateRoom } from "./CreateRoom";
import { Box } from "@mui/material";

export const RoomNav = () => {
  return (
    <>
      <Container>
        <Box flex={1} />
        <CreateRoom />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;
