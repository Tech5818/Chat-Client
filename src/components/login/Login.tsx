import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>();

  const { mutate } = useMutation({
    mutationFn: async (data: IFormData) => {
      client
        .post("/user/login", data)
        .then((res) => {
          console.log(res);
          alert("로그인 성공");
        })
        .catch(() => {
          alert("잘못된 비밀번호");
        });
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <Stack
        component="form"
        boxShadow="0 0 10px -5px rgba(0, 0, 0, 0.4)"
        width="500px"
        padding="30px"
        direction="column"
        alignItems="center"
        spacing={2}
        onSubmit={handleFormSubmit}
      >
        <Typography fontSize="36px" fontWeight="bold">
          로그인
        </Typography>
        <TextField
          label="이메일"
          placeholder="이메일을 입력해주세요"
          type="email"
          {...register("email")}
          fullWidth
          helperText={errors.email?.message}
          error={!!errors.email?.message}
        />
        <TextField
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          {...register("password")}
          fullWidth
          helperText={errors.password?.message}
          error={!!errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          disabled={!watch("email") && !watch("password")}
          size="large"
        >
          보내기
        </Button>
        <Box display="flex" justifyContent="end" width="100%">
          <RegisterLink to="/register">회원가입</RegisterLink>
        </Box>
      </Stack>
    </>
  );
};

const RegisterLink = styled(Link)`
  color: #aaa;
  transition: all.15s;
  &:hover {
    color: #333;
    text-decoration: underline;
  }
`;
