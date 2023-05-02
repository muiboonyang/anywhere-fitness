import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
        }}>
            <div className={styles.spinner}/>
        </div>
    )
};

export default LoadingSpinner;
