import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { IRoom } from "../../types/Room";
import { RoomItem } from "./RoomItem";

export const Room = () => {
  const { data } = useQuery<IRoom[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await client.get("/room/getAll");
      return response.data.data;
    },
  });

  return (
    <>
      <Container>
        {data ? (
          data!.map((value, idx) => <RoomItem data={value} key={idx} />)
        ) : (
          <></>
        )}
      </Container>
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
  display: flex;
  flex-flow: column;
  gap: 30px;
`;
