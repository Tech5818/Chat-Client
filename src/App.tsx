import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./page/HomePage";
import { ChatPage } from "./page/ChatPage";
import { LoginPage } from "./page/LoginPage";
import styled from "styled-components";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
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
