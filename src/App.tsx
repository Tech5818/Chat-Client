import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./page/HomePage";
import { ChatPage } from "./page/ChatPage";
import { LoginPage } from "./page/LoginPage";
import styled from "styled-components";
import { RegisterPage } from "./page/RegisterPage";
import { useToken } from "./store/token";
import { useEffect } from "react";

function App() {
  const { token, setToken } = useToken();

  const localToken = localStorage.getItem("token");
  useEffect(() => {
    setToken(localToken!);
  }, [setToken, token, localToken]);
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
`;

export default App;
