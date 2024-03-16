import styled from "styled-components";
import { IUsers } from "../../types/User";

export const UserList = ({ users }: { users?: IUsers[] }) => {
  if (!users) return <>no data</>;
  return (
    <>
      <Container>{users!.map((value) => value.id)}</Container>
    </>
  );
};

const Container = styled.div`
  width: 300px;
  border-right: 1px solid #dcdcdc;
`;
