import { Box, Input, Typography } from "@mui/material";
import { useState } from "react";

export const Login = () => {
  const [userId, setUserId] = useState("");
  return (
    <>
      <Box
        component="div"
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          boxShadow="0 0 10px -5px rgba(0, 0, 0, 0.4)"
          width="500px"
          height="400px"
          display="flex"
          alignContent="center"
          padding="30px"
          flexDirection="column"
        >
          <Typography fontSize="36px" fontWeight="bold">
            정보 입력
          </Typography>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="ID를 입력해주세요"
          />
        </Box>
      </Box>
    </>
  );
};
