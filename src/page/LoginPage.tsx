import { Box } from "@mui/material";
import { Login } from "../components/login/Login";

export const LoginPage = () => {
  return (
    <>
      <Box
        component="div"
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Login />
      </Box>
    </>
  );
};
