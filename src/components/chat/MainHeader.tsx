import styled from "styled-components";

export const MainHeader = ({ name }: { name: string }) => {
  return (
    <>
      <Container>{name && name}</Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 20px;
`;
