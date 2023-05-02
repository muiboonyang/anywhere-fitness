import React from "react";
import styles from "./ReviewCardTemplate.module.css";
import {convertToDateFormat} from "../../../utils/dataFormatter";

interface ReviewCardTemplateProps {
  reviews: {
    id: number;
    title: string;
    description: string;
    name: string;
    date: string;
  }
  deleteReview: (reviewId: number) => void;
  isAdmin: boolean;
}

const ReviewCardTemplate = ({
    reviews, deleteReview, isAdmin
}: ReviewCardTemplateProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>{reviews.title}</p>
            </div>
            <div className={styles.content}>
                <p>{reviews.description}</p>
            </div>
            <div className={styles.postDetails}>
                <p>Submitted by: {reviews.name}</p>
                <p>Date: {convertToDateFormat(reviews.date)}</p>
                {isAdmin ? (
                    <div className={styles.delete}>
                        <button className={styles.button} onClick={()=>deleteReview(reviews.id)}>
                            Delete
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ReviewCardTemplate;
