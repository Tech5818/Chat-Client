import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client } from "../utils/client";
import { Room } from "../components/room/Room";
import { useUser } from "../store/user";

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
    enabled: !!token,
  });
  return (
    <>
      <Container>
        <Room user={user} />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
