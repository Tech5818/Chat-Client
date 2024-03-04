import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface IFormData {
  name: string;
  email: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>();

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Box
        component="div"
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
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
            정보 입력
          </Typography>
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
          <TextField
            label="이메일"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
            fullWidth
            helperText={errors.email?.message}
            error={!!errors.email?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={!watch("name")}
            size="large"
          >
            보내기
          </Button>
        </Stack>
      </Box>
    </>
  );
};
