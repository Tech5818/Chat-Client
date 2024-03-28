import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { client } from "../../utils/client";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { useUser } from "../../store/user";
import { useModal } from "../../store/modal";

interface IRoomData {
  title: string;
}

export const CreateRoom = () => {
  const { isOpen, setIsOpen } = useModal();
  const { register, handleSubmit, watch, reset } = useForm<IRoomData>();
  const { user } = useUser();
  const { mutate } = useMutation({
    mutationFn: async (data: IRoomData) => {
      client.post("/room/create", { name: data.title, email: user.email });
      setIsOpen(false);
    },
  });
  const ModalHandler = () => {
    console.log(isOpen);

    setIsOpen(!isOpen);
    reset();
  };
  const handleCreateRoom = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <>
      <Container onClick={ModalHandler}>+ 방 만들기</Container>
      {isOpen && (
        <Modal>
          <ModalContainer>
            <ModalHeader>방 정보</ModalHeader>
            <ModalContent onSubmit={handleCreateRoom}>
              <TextField
                fullWidth
                {...register("title")}
                label="방 이름"
                placeholder="방 이름을 입력해주세요"
                autoFocus
              />
              <Box display={"flex"} justifyContent={"flex-end"} gap={"10px"}>
                <Button
                  color="error"
                  variant="contained"
                  size="large"
                  onClick={ModalHandler}
                >
                  닫기
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={watch("title") ? false : true}
                >
                  만들기
                </Button>
              </Box>
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  font-size: 28px;
  user-select: none;
  &:hover {
    font-weight: bold;
    background: #ddd;
  }
`;
const Modal = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  width: 700px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-flow: column;
  padding: 30px;
  gap: 20px;
`;

const ModalHeader = styled.p`
  font-size: 32px;
  font-weight: bold;
`;

const ModalContent = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 20px;
`;
