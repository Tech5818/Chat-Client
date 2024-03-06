import { Box } from "@mui/material";
import { Register } from "../components/login/Register";

export const RegisterPage = () => {
  return (
    <>
      <Box
        component="div"
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Register />
      </Box>
    </>
  );
};
