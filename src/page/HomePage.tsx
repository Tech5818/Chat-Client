import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client } from "../utils/client";
import { Room } from "../components/room/Room";
import { useUser } from "../store/user";
import { UserInfoBox } from "../components/user/UserInfoBox";

export const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, setUser } = useUser();
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
  });
  return (
    <>
      <Container>
        <List>
          <UserInfoBox user={user} />
          <Room />
        </List>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-flow: column;
  width: 1100px;
  height: 100vh;
  padding: 50px;
  box-shadow: 0px 0px 20px -8px rgba(0, 0, 0, 0.4);
  gap: 20px;
`;
