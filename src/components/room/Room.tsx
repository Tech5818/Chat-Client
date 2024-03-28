import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { IRoom } from "../../types/Room";
import { RoomItem } from "./RoomItem";
import { CreateRoom } from "./CreateRoom";
import { useEffect } from "react";
import { useModal } from "../../store/modal";

export const Room = () => {
  const { isOpen } = useModal();
  const { mutate, data } = useMutation({
    mutationFn: async () => {
      const response = await client.get("/room/getAll");
      return response.data.data as IRoom[];
    },
  });
  useEffect(() => {
    mutate();
  }, [isOpen, mutate]);
  return (
    <>
      <Container>
        {data ? (
          data!.map((value, idx) => <RoomItem data={value} key={idx} />)
        ) : (
          <></>
        )}
        <CreateRoom />
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
