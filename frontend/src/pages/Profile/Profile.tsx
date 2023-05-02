import React, {useEffect, useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Profile.module.css";
import useCustomFetch from "../../utils/useCustomFetch";
import AuthContext from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "@mui/icons-material/Search";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import {useFormContext, useWatch} from "react-hook-form";
import {FormHelperText} from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Profile = () => {
    const {isLoading, setIsLoading, userProfile, alertMessage, setAlertMessage} = useContext(AuthContext);
    const customFetch = useCustomFetch();

     //================
    // React Hook Form
    //================

    interface FormValues {
        email: string;
        password: string;
        confirmPassword: string;
        name: string;
        surname: string;
        contact: number;
        dateOfBirth: Date;
        gender: string;
        addressLine: string;
        unitLevel: number;
        unitNumber: number;
        postalCode: number
    }

    const {
        handleSubmit,
        setError,
        clearErrors,
        register,
        reset,
        setValue,
        formState: {isSubmitSuccessful, errors},
    } = useFormContext<FormValues>();

    const formHasNoError = Object.keys(errors).length === 0;

    const {
        email,
        password,
        confirmPassword,
        name,
        surname,
        contact,
        // dateOfBirth,
        gender,
        addressLine,
        unitLevel,
        unitNumber,
        postalCode,
    } = useWatch()

    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    const fieldErrorMessages = {
        password: "Password is required",
        confirmPassword: "Password is required",
        passwordsDoNotMatch: "Passwords do not match!",
        passwordTooShort: "At least 8 characters",
        name: "Name is required",
        surname: "Surname is required",
        invalidPhoneNumber: "Invalid format",
    };

    useEffect(() => {
        clearErrors();
        if (isSubmitSuccessful) {
            reset(
                {
                    password: "",
                    confirmPassword: "",
                },
                {
                    keepIsSubmitted: false,
                    keepErrors: false,
                    keepIsValid: false,
                }
            );
        }
    }, [clearErrors, isSubmitSuccessful, reset]);

    const passwordsDoNotMatchError = password !== confirmPassword && password !== ''
    const passwordTooShortError = password && password.length < 8
    const invalidPhoneNumber = contact && !contact.match(/^[689][0-9]{7}$/);

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
    // Fetch userProfile data from API (by specific username)
    // - Contact, DOB, Gender, Address, Unit, Postal Code, Emergency Contact, Emergency Number
    //////////////////////////////////

    // getUserInfo - Get email, name, surname
    const getUserInfo = async () => {
        setIsLoading(true)
        try {
            const {res, data} = await customFetch(`/auth/view/${userProfile!.user_id}`, 'GET', {});
            setIsLoading(false)

            if (res.status === 200) {
                setValue("email", data.email)
                setValue("name", data.name)
                setValue("surname", data.surname)
                setValue("contact", data.contact)
                // setValue("dateOfBirth", data.date_of_birth ? new Date(data.date_of_birth) : new Date())
                setDateOfBirth(data.date_of_birth ? new Date(data.date_of_birth) : new Date())
                setValue("gender", data.gender)
                setValue("postalCode", data.postal_code)
                setValue("unitLevel", data.unit.split("-")[0])
                setValue("unitNumber", data.unit.split("-")[1])
                setValue("addressLine", data.address_line)
            }
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        getUserInfo();
        // eslint-disable-next-line
    }, []);

    //////////////////////////////////
    // UPDATE userProfile
    //////////////////////////////////

    const formatDateForSubmission = (date: Date) => {
        const offset = date.getTimezoneOffset()
        const dateOfBirthWithTimezoneOffset = new Date(date.getTime() - (offset * 60 * 1000))
        const formattedDateOfBirth = dateOfBirthWithTimezoneOffset.toISOString().split('T')[0]
        return formattedDateOfBirth
    }

    const updateUser = async () => {
        if (formHasNoError) {
            setIsLoading(true)
            try {
                const {res} = await customFetch(`/auth/update/${userProfile.user_id}`, 'POST', {
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
                    contact: contact,
                    date_of_birth: formatDateForSubmission(dateOfBirth),
                    gender: gender,
                    address_line: addressLine,
                    unit: `${unitLevel}-${unitNumber}`,
                    postal_code: postalCode,
                });
                setIsLoading(false);

                if (res.status === 200) {
                    await getUserInfo();
                    setAlertMessage("Update successful!");
                } else {
                    setAlertMessage("Update failed!");
                }
            } catch (err) {
                // console.log(err);
            }
        }
    };

    const getAddressFromPostalCode = async (postalCodeQuery: number) => {
        try {
            if (postalCodeQuery) {
                const res = await fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${postalCodeQuery}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
                const data = await res.json();

                if (res.status === 200) {
                    const blockNumber = data.results[0] ? data.results[0].BLK_NO : ""
                    const roadName = data.results[0] ? data.results[0].ROAD_NAME : ""
                    const retrievedAddress = blockNumber + " " + roadName
                    setValue('addressLine', retrievedAddress);
                }
            }
        } catch (err) {
            // console.log(err);
        }
    }

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className={styles.profile}>
            <form onSubmit={handleSubmit(() => updateUser())}>
                <br/>
                <h2>Profile</h2>
                <br/>
                <Form.Group className="mb-3" controlId="formUpdateEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        disabled
                        type="email"
                        placeholder={email}
                        defaultValue={email}
                        {...register("email")}
                    />
                </Form.Group>

                <Row>
                    <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formUpdatePassword"
                    >
                        <Form.Label>*Current/New Password: </Form.Label>
                        <Form.Control
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
                        controlId="formUpdatePassword2"
                    >
                        <Form.Label>*Confirm Password: </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
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
                        <Form.Label>*Given Name: </Form.Label>
                        <Form.Control
                            placeholder={name}
                            defaultValue={name}
                            {...register("name", {
                                required: fieldErrorMessages.name,
                            })}
                        />
                        {errors.name && (
                                <FormHelperText error>{errors.name.message}</FormHelperText>
                         )}
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formGridSurname">
                        <Form.Label>*Surname: </Form.Label>
                        <Form.Control
                            placeholder={surname}
                            defaultValue={surname}
                            {...register("surname", {
                                required: fieldErrorMessages.surname,
                            })}
                        />
                        {errors.surname && (
                                <FormHelperText error>{errors.surname.message}</FormHelperText>
                         )}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formContact">
                        <Form.Label>Contact: </Form.Label>
                        <Form.Control
                            maxLength={8}
                            type="number"
                            inputMode="numeric"
                            placeholder={contact}
                            defaultValue={contact}
                            {...register("contact")}
                        />
                        {invalidPhoneNumber && (
                                <FormHelperText error>{fieldErrorMessages.invalidPhoneNumber}</FormHelperText>
                         )}
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formDateOfBirth">
                        <Form.Label>Date of birth: </Form.Label>
                        <DatePicker
                            className={styles.reactDatepickerWrapper}
                            dateFormat="dd MMM yyyy"
                            selected={dateOfBirth}
                            onChange={(date: Date) => setDateOfBirth(date)}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formGender">
                        <Form.Label>Gender: </Form.Label>
                        <Form.Select
                            value={gender}
                            {...register("gender")}
                        >
                            <option value="">Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formGridPostalCode"
                    >
                        <Form.Label>Postal code: </Form.Label>
                        <InputGroup>
                            <Form.Control
                                maxLength={6}
                                type="number"
                                inputMode="numeric"
                                placeholder={postalCode}
                                defaultValue={postalCode}
                                {...register("postalCode")}
                                onBlur={(event: React.FocusEvent<HTMLInputElement>) => getAddressFromPostalCode(parseInt(event.target.value))}
                            />
                            <InputGroup.Text>
                                <SearchIcon/>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Unit level and number: </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Control
                                id="formUnitLevel"
                                type="number"
                                inputMode="numeric"
                                placeholder={unitLevel}
                                defaultValue={unitLevel}
                                {...register("unitLevel")}
                            />
                            <InputGroup.Text>-</InputGroup.Text>
                            <Form.Control
                                id="formUnitNumber"
                                type="number"
                                inputMode="numeric"
                                placeholder={unitNumber}
                                defaultValue={unitNumber}
                                {...register("unitNumber")}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Address (auto-generated): </Form.Label>
                    <Form.Control
                        readOnly
                        placeholder={addressLine}
                        defaultValue={addressLine}
                        {...register("addressLine")}
                    />
                </Form.Group>

                <button
                    type="submit"
                    className={styles.update}
                    disabled={!formHasNoError}
                >
                    Update
                </button>
            </form>

            <CustomAlert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default Profile;
