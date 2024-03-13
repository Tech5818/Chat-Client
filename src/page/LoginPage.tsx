import { Box } from "@mui/material";
import { Login } from "../components/login/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) navigate("/");
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
        <Login />
      </Box>
    </>
  );
};
