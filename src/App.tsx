import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./page/HomePage";
import { ChatPage } from "./page/ChatPage";
import { LoginPage } from "./page/LoginPage";
import styled from "styled-components";
import { RegisterPage } from "./page/RegisterPage";
import { useQuery } from "@tanstack/react-query";
import { client } from "./utils/client";
import { useUser } from "./store/user";

function App() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useQuery({
    queryKey: ["token-verify"],
    queryFn: () => {
      client
        .post(
          "/jwt/verify",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setUser!(res.data.data);
        })
        .catch(() => {
          navigate("/login");
        });
      return true;
    },
    refetchOnWindowFocus: false,
  });
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
