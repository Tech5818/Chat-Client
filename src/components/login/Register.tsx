import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { client } from "../../utils/client";
import { useNavigate } from "react-router-dom";

interface IFormData {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>();
  const { mutate } = useMutation({
    mutationFn: async (data: IFormData) => {
      client.post("/user/create", { data }).then(() => {
        alert("회원가입이 성공적으로 완료되었습니다.");
        navigate("/login");
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
          회원 정보 입력
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
          placeholder="비밀번호를 입력해주세요"
          type="password"
          {...register("password")}
          fullWidth
          helperText={errors.password?.message}
          error={!!errors.password?.message}
        />
        <TextField
          label="이름"
          placeholder="이름을 입력해 주세요"
          {...register("name", {
            minLength: {
              message: "이름의 최소 길이는 3자 이상입니다",
              value: 3,
            },
          })}
          fullWidth
          helperText={errors.name?.message}
          error={!!errors.name?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          disabled={!watch("name") && !watch("email")}
          size="large"
        >
          보내기
        </Button>
      </Stack>
    </>
  );
};
