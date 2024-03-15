import styled from "styled-components";
import { IRoom } from "../../types/Room";

export const RoomItem = ({ data }: { data: IRoom }) => {
  const handleClick = () => {};
  return (
    <>
      <Container onClick={handleClick}>
        <Text>{data.name}</Text>
        <Text>{data.users.length}명</Text>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #ececec;
  }
`;
const Text = styled.p`
  font-size: 18px;
`;
