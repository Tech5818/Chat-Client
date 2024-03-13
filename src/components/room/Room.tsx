import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";

export const Room = () => {
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await client.get("/room/getAll");
      return response.data.data;
    },
  });

  return (
    <>
      <Container>{JSON.stringify(data)}</Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100% - 149px);
  border-radius: 14px;
  border: 1px solid #dcdcdc;
  overflow-y: scroll;
  padding: 30px;
`;
