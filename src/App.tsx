import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./page/Home";
import { Chat } from "./page/Chat";
import { Login } from "./page/Login";
import styled from "styled-components";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
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
