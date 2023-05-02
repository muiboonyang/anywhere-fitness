import {useContext} from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

////////////////////////////////////////////////////////////
// Custom hook (useFetchPost) to check token expiry during each 'Post' request and initiate token refresh
///////////////////////////////////////////////////////////

const useCustomFetch = () => {
    const navigate = useNavigate();
    const {jwtTokens, setJwtTokens, setUserProfile, setAlertMessage } = useContext(AuthContext);

    const originalRequest = async (url: string, config: {}) => {
        const res = await fetch(url, config);
        const data = await res.json();
        // console.log("PROCESSING:", data);
        return {res, data};
    };

    // Token refresh process
    const refreshToken = async () => {
        const res = await fetch(
            `/auth/refreshtoken/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({refresh: jwtTokens.refresh}),
            }
        );
        const data = await res.json();
        localStorage.setItem("jwtTokens", JSON.stringify(data));
        setJwtTokens(data);
        setUserProfile(jwt_decode(data.access));
        return data;
    };

    ///////////////////////////////////
    // Check token expiry everytime we use useFetch, run originalRequest function
    ///////////////////////////////////

    const callFetch = async (url: string, method: string, body: {}) => {
        const accessTokenId = jwtTokens!.access;
        const refreshTokenId = jwtTokens!.refresh;

        // get access token expiry date
        const decodedAccessToken = jwt_decode<JwtPayload>(accessTokenId)
        const accessTokenExpiry = dayjs.unix(decodedAccessToken.exp!)

        const accessTokenExpiryMinutes = accessTokenExpiry.diff(dayjs(), "m")
        const accessTokenExpirySeconds = accessTokenExpiry.diff(dayjs(), "s") - (accessTokenExpiryMinutes * 60)

        // compare access token expiry date and current date (<1 -> expired)
        const isExpired = accessTokenExpiry.diff(dayjs()) < 1;

        if (process.env.NODE_ENV === "development") {
            console.log(
                // `Access Token remaining validity: ${accessTokenExpiry.diff(dayjs()) / 1000} seconds`
                `Access Token remaining validity: ${accessTokenExpiryMinutes} minutes ${accessTokenExpirySeconds} seconds`
            );
        }

        // Initiate token refresh when access token has expired, to get new access token
        if (isExpired) {
            localStorage.removeItem("jwtTokens");
            navigate("/login");
            setAlertMessage("Please log in again!");
        } else if (isExpired && refreshTokenId) {
            setJwtTokens(await refreshToken());
        }

        // Configurations for each request
        let config

        if (Object.keys(body || {}).length !== 0) {
            config = {
                headers: {
                    'Authorization': `Bearer ${accessTokenId}`,
                    'Content-Type': 'application/json',
                },
                method: `${method}`,
                body: JSON.stringify(body)
            }
        } else {
            config = {
                headers: {
                    'Authorization': `Bearer ${accessTokenId}`,
                    'Content-Type': 'application/json',
                },
                method: `${method}`
            }
        }

        return await originalRequest(url, config);
    };

    return callFetch;
};

export default useCustomFetch;
