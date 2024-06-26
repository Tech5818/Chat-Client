import styled from "styled-components";
import { IRoom } from "../../types/Room";
import { MainHeader } from "./MainHeader";
import { MainChat } from "./MainChat";
import { MainInput } from "./MainInput";

export const Main = ({ room }: { room: IRoom }) => {
  return (
    <>
      <Container>
        <MainHeader
          title={room && room.name}
          description={room && room.description}
        />
        <MainChat />
        <MainInput />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
`;
