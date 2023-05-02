import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 0}}>
            <Button
                color="inherit"
                onClick={() => {
                    navigate("/login");
                }}
                sx={{
                    color: "white",
                    display: "block"
                }}
            >
                Login
            </Button>
        </Box>
    )
}

export default LoginButton;