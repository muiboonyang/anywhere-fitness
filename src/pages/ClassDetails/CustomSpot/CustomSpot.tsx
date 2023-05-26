import React from 'react';
import styles from "./CustomSpot.module.css";
import {SpotAvailabilityProps} from "../ClassDetails";

interface CustomSpotProps {
    spotDetails: SpotAvailabilityProps
    bookClass: (spotName: string, spotNumber: string, spotPrice: string) => Promise<void>
}

const CustomSpot = (
    {
        spotDetails,
        bookClass,
    }: CustomSpotProps,
) => {
    return (
        <button
            className={styles.button}
            disabled={spotDetails.isSpotBooked}
            id={spotDetails.spotName}
            value={spotDetails.spotNumber}
            name={spotDetails.spotCost.toString()}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                bookClass(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
            }}>
            {spotDetails.isSpotBooked ? 'X' : spotDetails.spotNumber}
        </button>
    );
};

export default CustomSpot;