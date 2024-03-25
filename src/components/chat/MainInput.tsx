import styled from "styled-components";

export const MainInput = () => {
  return (
    <>
      <Container>
        <Input placeholder="메세지를 입력하세요." />
        <Button>보내기</Button>
      </Container>
    </>
  );
};

const Container = styled.form`
  width: 100%;
  height: 70px;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  border: 1px solid #ddd;
  font-size: 16px;
  padding: 20px 70px 20px 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  right: 30px;
  font-size: 16px;
  color: #1493fb;
`;
