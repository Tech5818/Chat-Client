import styled from "styled-components";
import { useToken } from "../../store/token";
import { useNavigate } from "react-router-dom";

export const LogOutButton = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const handleClick = () => {
    setToken("");
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };
  return (
    <>
      <Container onClick={handleClick}>로그아웃</Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;
  color: #ff3b30;
  transition: all.25s;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  &:hover {
    background: rgba(255, 59, 48, 0.1);
  }
`;
