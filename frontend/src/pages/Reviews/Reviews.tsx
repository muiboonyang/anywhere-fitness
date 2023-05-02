import React, {useState, useEffect, useContext} from "react";
import styles from "./Reviews.module.css";
import ReviewCardTemplate from "../../components/Templates/ReviewCardTemplate/ReviewCardTemplate";
import {v4 as uuidv4} from "uuid";

import Form from "react-bootstrap/Form";
import useCustomFetch from "../../utils/useCustomFetch";
import AuthContext from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import {useFormContext, useWatch} from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {FormHelperText} from "@mui/material";

interface FormValues {
        title: string;
        description: string;
}

export interface ReviewProps {
    id: number;
    title: string;
    description: string;
    name: string;
    date: string;
}

const Reviews = () => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);
    const {isLoading, setIsLoading, userProfile, alertMessage, setAlertMessage} = useContext(AuthContext);
    const customFetch = useCustomFetch();

    //================
    // React Hook Form
    //================

    const {
        handleSubmit,
        register,
        reset,
        formState: {isSubmitSuccessful, errors},
        clearErrors,
    } = useFormContext<FormValues>();

    const formHasNoError = Object.keys(errors).length === 0;
    const {title, description} = useWatch()

    const fieldErrorMessages = {
        title: "Title is required",
        description: "Description is required",
    };

    useEffect(() => {
        clearErrors();
        if (isSubmitSuccessful) {
            reset(
                {
                    title: "",
                    description: "",
                },
                {
                    keepIsSubmitted: false,
                    keepErrors: false,
                    keepIsValid: false,
                }
            );
        }
    }, [clearErrors, isSubmitSuccessful, reset]);

    ///////////////////////////////
    // GET - Get all review
    ///////////////////////////////

    const getReviews = async () => {
        setIsLoading(true);
        try {
            const {res, data} = await customFetch(`/review/view-all/`, 'GET', {});
            setIsLoading(false);

            if (res.status === 200) {
                setReviews(data);
            }
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        getReviews();
        // eslint-disable-next-line
    }, []);

    ///////////////////////////////
    // POST - Create review
    ///////////////////////////////

    const createReview = async () => {
        if (formHasNoError) {
            setIsLoading(true);
            try {
                const {res} = await customFetch(`/review/create/`, 'POST', {
                    title: title,
                    description: description,
                    user: userProfile!.user_id,
                    name: userProfile!.name,
                });
                setIsLoading(false);

                if (res.status === 200) {
                    await getReviews();
                    setAlertMessage("Review created successfully!");
                } else {
                    setAlertMessage("Failed to create review!");
                }
            } catch (err) {
                // console.log(err);
            }
        }
    };

     ///////////////////////////////
    // DELETE - Delete specific review
    ///////////////////////////////

    const deleteReview = async (reviewId: number) => {
        setIsLoading(true);
        try {
            const {res} = await customFetch(`/review/delete/${reviewId}`, 'DELETE', {});
            setIsLoading(false);

            if (res.status === 200) {
                await getReviews();
                setAlertMessage("Deleted review successfully!");
            } else {
                setAlertMessage("Failed to delete review!");
            }
        } catch (err) {
            // console.log(err);
        }
    };

    if (isLoading) return <LoadingSpinner/>;

    return (
        <>
            <div className={styles.reviewsContainer}>
                <br/>
                <h2>Reviews</h2>
                <br/>

                <div className={styles.reviewsForm}>
                    <form onSubmit={handleSubmit(()=> createReview())}>
                        <Form.Group className="mb-3" controlId="reviewTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength={20}
                                placeholder="Enter title"
                                 {...register("title", {
                                    required: fieldErrorMessages.title,
                                 })}
                            />
                             {errors.title && (
                                <FormHelperText error>{errors.title.message}</FormHelperText>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="reviewDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                maxLength={200}
                                placeholder="Enter description"
                                 {...register("description", {
                                    required: fieldErrorMessages.description,
                                 })}
                            />
                             {errors.description && (
                                <FormHelperText error>{errors.description.message}</FormHelperText>
                            )}
                        </Form.Group>

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
                </div>

                <hr/>

                <div className={styles.displayReviews}>
                    <div className={styles.container}>
                        {reviews.map((reviews) => {
                            return (
                                <div key={uuidv4()}>
                                    <ReviewCardTemplate
                                        reviews={reviews}
                                        deleteReview={deleteReview}
                                        isAdmin={userProfile.admin!}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <CustomAlert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </>
    );
};

export default Reviews;
