import React, {useContext} from 'react';
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Logo/Logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import {ListItemIcon} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";

interface MobileNavBarProps {
    handleLogout: (event: React.FormEvent) => Promise<void>;
}

const MobileNavBar = ({
    handleLogout
                      }: MobileNavBarProps) => {
    const navigate = useNavigate();
    const {balance} = useContext(UserContext);
    const {userProfile, isLoggedIn} = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo/>
                    {isLoggedIn
                        ?
                        <Box sx={{flexGrow: 0}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Menu
                                sx={{
                                    display: {xs: "block", md: "none"},
                                }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                            >

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/workouts");
                                }}>
                                    Workout
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/pricing");
                                }}>
                                    Pricing
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/schedule");
                                }}>
                                    Schedule
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/instructors");
                                }}>
                                    Instructors
                                </MenuItem>

                                <Divider/>

                                <MenuItem onClick={() =>
                                {
                                    handleClose();
                                    navigate("/profile");
                                }
                                }>
                                    {userProfile.name}
                                </MenuItem>

                                 <Divider/>

                                <MenuItem onClick={() =>
                                {
                                    handleClose();
                                    navigate("/transactions");
                                }
                                }>
                                    Credits: {balance}
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/bookings");
                                }}>
                                    Bookings
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/reviews");
                                }}>
                                    Reviews
                                </MenuItem>

                                <Divider/>

                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <Box sx={{flexGrow: 0}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Menu
                                sx={{
                                    display: {xs: "block", md: "none"},
                                }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                            >

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/workouts");
                                }}>
                                    Workout
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/pricing");
                                }}>
                                    Pricing
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/schedule");
                                }}>
                                    Schedule
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/instructors");
                                }}>
                                    Instructors
                                </MenuItem>

                                <Divider/>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    navigate("/login");
                                }}>
                                    Login
                                </MenuItem>
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MobileNavBar;