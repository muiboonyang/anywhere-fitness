import React, {useContext, useEffect} from "react";
import Form from "react-bootstrap/Form";
import styles from "./Login.module.css";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import {useFormContext, useWatch} from "react-hook-form";
import {FormHelperText} from "@mui/material";

const Login = () => {
    const {isLoading, setIsLoading, isLoggedIn, setUserProfile, setJwtTokens, alertMessage, setAlertMessage} = useContext(AuthContext);
    const navigate = useNavigate();

    //================
    // React Hook Form
    //================

    interface FormValues {
        email: string;
        password: string;
    }

    const {
        handleSubmit,
        register,
        reset,
        formState: {isSubmitSuccessful, errors},
        clearErrors,
    } = useFormContext<FormValues>();

    const formHasNoError = Object.keys(errors).length === 0;
    const {email, password} = useWatch()

    const fieldErrorMessages = {
        email: "Email is required",
        password: "Password is required",
    };

    useEffect(() => {
        clearErrors();
        if (isSubmitSuccessful) {
            reset(
                {
                    email: "",
                    password: "",
                },
                {
                    keepIsSubmitted: false,
                    keepErrors: false,
                    keepIsValid: false,
                }
            );
        }
        // eslint-disable-next-line
    }, [isSubmitSuccessful, reset]);

    if (isLoading) return <LoadingSpinner/>;
    if (isLoggedIn) return <Navigate replace to="/"/>;

    //////////////////////////////////
    // LOGIN userProfile
    //////////////////////////////////

    const loginUser = async () => {
        if (formHasNoError) {
            setIsLoading(true)
            try {
                const res = await fetch(
                    `/auth/login/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    }
                );
                const data = await res.json();
                setIsLoading(false);

                if (res.status === 200) {
                    localStorage.setItem("jwtTokens", JSON.stringify(data));
                    setJwtTokens(data);
                    setUserProfile(jwt_decode(data.access));
                    navigate("/");
                    setAlertMessage("Login successful!");
                } else {
                    setAlertMessage("Login failed!");
                }
            } catch (error) {
                // console.log(error)
            }
        }
    };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <>
          <br />
          <h3>Log In</h3>
          <br />

          <form onSubmit={handleSubmit(()=> loginUser())}>
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                 {...register("email", {
                     required: fieldErrorMessages.email,
                 })}
              />
                {errors.email && (
                    <FormHelperText error>{errors.email.message}</FormHelperText>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password", {
                    required: fieldErrorMessages.password,
                })}
              />
                {errors.password && (
                    <FormHelperText error>{errors.password.message}</FormHelperText>
                )}
            </Form.Group>

            <br />

            <div className="d-grid gap-2">
              <button
                  className={styles.submit}
                  disabled={!formHasNoError}
              >
                  Submit
              </button>
            </div>
          </form>

          <hr />

            <div className="d-grid gap-2">
                <button
                    className={styles.create}
                    onClick={()=>
                        navigate("/register")
                    }
                >
                    Create Account
                </button>
            </div>

          <br />
        </>
      </div>

      <CustomAlert
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
      />
    </div>
  );
};

export default Login;
