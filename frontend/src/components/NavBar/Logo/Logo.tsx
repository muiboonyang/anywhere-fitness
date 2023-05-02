import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {DirectionsRun} from "@mui/icons-material";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    display: "flex",
                    "&:hover": {
                        color: "white",
                    },
                }}
            >
                <Box
                    component="a"
                    onClick={() => {
                        navigate("/");
                }}
                    sx={{
                        mr: 2,
                        display: "flex",
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                            cursor: "pointer",
                            color: "white",
                    },
                }}>
                    <DirectionsRun /> Anywhere Fitness
                </Box>
            </Typography>
        </Box>
    );
};

export default Logo;