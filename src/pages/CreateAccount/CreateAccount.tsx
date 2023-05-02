import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CreateAccount.module.css";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import AuthContext from "../../context/AuthContext";
import {useFormContext, useWatch} from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {FormHelperText} from "@mui/material";

const CreateAccount = () => {
    const {isLoading, setIsLoading, alertMessage, setAlertMessage} = useContext(AuthContext);
    const navigate = useNavigate();

    //================
    // React Hook Form
    //================

    interface FormValues {
        name: string;
        surname: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const {
        handleSubmit,
        setError,
        clearErrors,
        register,
        reset,
        formState: {isSubmitSuccessful, errors},
    } = useFormContext<FormValues>();

    const formHasNoError = Object.keys(errors).length === 0;

    const {name, surname, email, password, confirmPassword} = useWatch()

    const fieldErrorMessages = {
        email: "Email is required",
        password: "Password is required",
        confirmPassword: "Password is required",
        passwordsDoNotMatch: "Passwords do not match!",
        passwordTooShort: "At least 8 characters",
        name: "Name is required",
        surname: "Surname is required",
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

    const passwordsDoNotMatchError = password !== confirmPassword && password !== ''
    const passwordTooShortError = password && password.length < 8

    useEffect(() => {
        if (passwordsDoNotMatchError) {
            setError('confirmPassword', {type: 'custom', message: fieldErrorMessages.passwordsDoNotMatch})
        }
        if (password === confirmPassword && errors.confirmPassword) {
            clearErrors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword]);

    //////////////////////////////////
    // CREATE userProfile + personal details fields
    //////////////////////////////////

    const createUser = async () => {
        if (formHasNoError) {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `/auth/register/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            name: name,
                            surname: surname,
                        }),
                    }
                );

                await res.json();
                setIsLoading(false);

                if (res.status === 200) {
                    navigate("/login");
                    setAlertMessage("Registration successful!");
                } else {
                    setAlertMessage("Registration failed!");
                }
            } catch (err) {
                // console.log(err);
            }
        }
    };

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className={styles.container}>
            <div className={styles.createAccount}>
                <br/>
                <h3>Create Account</h3>
                <br/>

                <form onSubmit={handleSubmit(()=> createUser())}>
                    <Form.Group className="mb-3" controlId="formRegisterEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: fieldErrorMessages.email,
                            })}
                        />
                    </Form.Group>

                    <Row>
                        <Form.Group
                            as={Col}
                            className="mb-3"
                            controlId="formRegisterPassword1"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter password"
                                {...register("password", {
                                    required: fieldErrorMessages.password,
                                })}
                                isInvalid={passwordsDoNotMatchError}
                            />
                             {errors.password && (
                                <FormHelperText error>{errors.password.message}</FormHelperText>
                         )}
                             {passwordTooShortError && (
                                <FormHelperText error>{fieldErrorMessages.passwordTooShort}</FormHelperText>
                         )}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            className="mb-3"
                            controlId="formRegisterPassword2"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                {...register("confirmPassword", {
                                    required: fieldErrorMessages.confirmPassword,
                                })}
                                isInvalid={passwordsDoNotMatchError}
                            />
                            {errors.confirmPassword && (
                                <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>
                            )}
                        </Form.Group>
                    </Row>

                    <hr/>

                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="formGridName">
                            <Form.Label>Given Name</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Enter name"
                                 {...register("name", {
                                     required: fieldErrorMessages.name,
                                })}
                            />
                              {errors.name && (
                                <FormHelperText error>{errors.name.message}</FormHelperText>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formGridSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Enter surname"
                                 {...register("surname", {
                                    required: fieldErrorMessages.surname,
                                })}
                            />
                            {errors.surname && (
                                <FormHelperText error>{errors.surname.message}</FormHelperText>
                            )}
                        </Form.Group>
                    </Row>

                    <br/>

                    <div className="d-grid gap-2">
                        <button
                            className={styles.create}
                            type="submit"
                            disabled={!formHasNoError}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <hr/>

                <div className="d-grid gap-2">
                    <button
                        className={styles.login}
                        onClick={()=> {
                                navigate("/login")
                            }
                        }
                    >
                        Already have an account? Log in here
                    </button>
                </div>

                <CustomAlert
                    alertMessage={alertMessage}
                    setAlertMessage={setAlertMessage}
                />
                <br />
            </div>
        </div>
    );
};

export default CreateAccount;
