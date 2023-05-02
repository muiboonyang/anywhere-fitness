import React, {useContext} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import MobileNavBar from "./MobileNavBar/MobileNavBar";
import TabletDesktopNavBar from "./TabletDesktopNavBar/TabletDesktopNavBar";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import CustomAlert from "../CustomAlert/CustomAlert";
import useCustomFetch from "../../utils/useCustomFetch";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976d2",
        },
    },
});

const NavBar = () => {
  const {setIsLoading, jwtTokens, alertMessage, setAlertMessage} = useContext(AuthContext);
  const customFetch = useCustomFetch();
  const navigate = useNavigate();
  const isTabletOrDesktop = useMediaQuery('(min-width:740px)');

    //////////////////////////////////
    // LOGOUT userProfile + BLACKLIST token
    //////////////////////////////////

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true)

        if (jwtTokens.refresh) {
             const {res, data} = await customFetch(`/auth/logout/`, 'POST',{
                 refresh: jwtTokens.refresh, // blacklist refresh token
                 // access: jwtTokens.access,
             });
            setIsLoading(false);

            if (process.env.NODE_ENV === "development") {
                if (res.status === 200) {
                    console.log(data); // shows logout + token blacklist message from backend
                } else {
                    console.log("Logout + token blacklist failed!");
                }
            }
        }
        localStorage.removeItem("jwtTokens");
        navigate("/");
        setAlertMessage("Logged out successfully!");
    };

  return (
    <>
        <Container>
            <ThemeProvider theme={darkTheme}>
            {isTabletOrDesktop
                ? <TabletDesktopNavBar handleLogout={handleLogout}/>
                : <MobileNavBar handleLogout={handleLogout}/>
            }
            </ThemeProvider>
        </Container>
        <CustomAlert
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
        />
    </>
  );
};

export default NavBar;
