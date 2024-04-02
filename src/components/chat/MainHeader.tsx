import styled from "styled-components";

interface IHeader {
  title: string;
  description: string;
}

export const MainHeader = ({ title, description }: IHeader) => {
  return (
    <>
      <Container>
        <Title>{title && title}</Title>
        <Description>{description && description}</Description>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  gap: 15px;
`;

const Title = styled.p`
  font-size: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #888;
`;
