import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { IRoom } from "../../types/Room";
import { RoomItem } from "./RoomItem";
import { useEffect } from "react";
import { useModal } from "../../store/modal";
import { useReload } from "../../store/reload";

export const Room = () => {
  const { isOpen } = useModal();
  const { reload } = useReload();
  const { mutate, data } = useMutation({
    mutationFn: async () => {
      const response = await client.get("/room/getAll");

      return response.data.data as IRoom[];
    },
  });
  useEffect(() => {
    mutate();
  }, [isOpen, mutate, reload]);
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
  overflow-y: overlay;
  padding: 30px;
  display: flex;
  flex-flow: column;
  &::-webkit-scrollbar {
    width: 18px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    outline: none;
    border-radius: 10px;
    border: 6px solid transparent;
    box-shadow: inset 6px 6px 0 rgba(191, 90, 242, 0.5);
  }
`;
