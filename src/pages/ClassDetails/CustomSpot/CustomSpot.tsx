import React from 'react';
import styles from "./CustomSpot.module.css";
import {SpotAvailabilityProps} from "../ClassDetails";

interface CustomSpotProps {
    spotDetails: SpotAvailabilityProps
    bookClass: (spotName: string, spotNumber: number, spotPrice: number) => Promise<void>
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
                bookClass(event.currentTarget.id, parseInt(event.currentTarget.value), parseInt(event.currentTarget.name))
            }}>
            {spotDetails.isSpotBooked ? 'X' : spotDetails.spotNumber}
        </button>
    );
};

export default CustomSpot;