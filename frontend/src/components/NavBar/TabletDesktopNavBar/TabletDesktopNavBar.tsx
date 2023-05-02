import React, {useContext} from 'react';
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Logo/Logo";
import ProfileButton from "./ProfileButton/ProfileButton";
import LoginButton from "../LoginButton/LoginButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

interface MobileNavBarProps {
    handleLogout: (event: React.FormEvent) => Promise<void>;
}

const TabletDesktopNavBar = ({
                                 handleLogout
}: MobileNavBarProps) => {
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo/>
                    {isLoggedIn
                        ? (
                            <>
                                <Box
                                    sx={{
                                        flexGrow: 0, // 0: end of navBar, 1: middle of NavBar
                                        display: "flex"
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            navigate("/workouts");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Workouts
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigate("/pricing");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Pricing
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigate("/schedule");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Schedule
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigate("/instructors");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Instructors
                                    </Button>
                                </Box>

                                <ProfileButton handleLogout={handleLogout}/>
                            </>
                        )
                        : (
                            <>
                                 <Box
                                    sx={{
                                        flexGrow: 0, // 0: end of navBar, 1: middle of NavBar
                                        display: "flex"
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            navigate("/workouts");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Workouts
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigate("/pricing");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Pricing
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigate("/schedule");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Schedule
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigate("/instructors");
                                        }}
                                        sx={{my: 0, color: "white", display: "block"}}
                                    >
                                        Instructors
                                    </Button>
                                </Box>
                                <LoginButton/>
                            </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TabletDesktopNavBar;