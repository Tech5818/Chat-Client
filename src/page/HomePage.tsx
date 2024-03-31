import styled from "styled-components";
import { Room } from "../components/room/Room";
import { useUser } from "../store/user";
import { UserInfoBox } from "../components/user/UserInfoBox";
import { RoomNav } from "../components/room/RoomNav";

export const HomePage = () => {
  const { user } = useUser();
  return (
    <>
      <Container>
        <List>
          <UserInfoBox user={user} />
          <RoomNav />
          <Room />
        </List>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-flow: column;
  width: 1100px;
  height: 100vh;
  padding: 50px;
  box-shadow: 0px 0px 20px -8px rgba(0, 0, 0, 0.4);
  gap: 10px;
`;
