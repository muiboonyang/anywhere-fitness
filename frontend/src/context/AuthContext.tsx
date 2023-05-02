import {createContext, useState, useEffect} from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

type customJwtPayload = JwtPayload & {
    user_id?: number,
    name?: string,
    surname?: string,
    email?: string,
    admin?: boolean
};

interface jwtTokensProps {
    access: string
    refresh: string
}

interface AuthContextProps {
    isLoading: boolean;
    setIsLoading: (x: boolean) => void;
    alertMessage: string;
    setAlertMessage: (x: string) => void;
    userProfile: customJwtPayload;
    setUserProfile: (x: customJwtPayload) => void;
    jwtTokens: jwtTokensProps;
    setJwtTokens: (x: jwtTokensProps) => void;
    isLoggedIn: boolean;
}

type ChildrenProps = {
  children: JSX.Element
}

const AuthContext = createContext<AuthContextProps>({
    isLoading: false,
    setIsLoading: (x = false) => {},
    alertMessage: '',
    setAlertMessage: ()=>{},
    userProfile: {},
    setUserProfile: (x: {}) => {},
    jwtTokens: {
        access: '',
        refresh: ''
    },
    setJwtTokens: (x: jwtTokensProps) => {},
    isLoggedIn: false,
});

export const AuthProvider = ({children}: ChildrenProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    //////////////////////////////////
    // JWT Tokens
    //////////////////////////////////

    const retrievedJwtFromStorage = localStorage.getItem("jwtTokens") ?? null
    const parsedJwtTokens = retrievedJwtFromStorage && JSON.parse(retrievedJwtFromStorage)
    const decodedJwtAccessToken = retrievedJwtFromStorage ? jwt_decode<customJwtPayload>(retrievedJwtFromStorage) : {}

    const [jwtTokens, setJwtTokens] = useState<jwtTokensProps>(parsedJwtTokens);
    const [userProfile, setUserProfile] = useState<customJwtPayload>(decodedJwtAccessToken);

    //////////////////////////////////
    // useEffect
    // - Set new user when there is a change in jwtTokens
    //////////////////////////////////

    useEffect(() => {
        if (jwtTokens) {
            setUserProfile(jwt_decode<JwtPayload>(jwtTokens.access));
        }
    }, [jwtTokens]);

    //////////////////////////////////
    // Pass contextData into context provider
    //////////////////////////////////

    const contextData = {
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        alertMessage: alertMessage,
        setAlertMessage: setAlertMessage,
        userProfile: userProfile,
        setUserProfile: setUserProfile,
        jwtTokens: jwtTokens,
        setJwtTokens: setJwtTokens,
        isLoggedIn: retrievedJwtFromStorage !== null,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
