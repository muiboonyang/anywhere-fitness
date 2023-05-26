import React from 'react';
import styles from "./CustomRow.module.css";
import CustomSpot from "../CustomSpot/CustomSpot";
import {SpotAvailabilityProps} from "../ClassDetails";

interface CustomRowProps {
    spotsToPopulate: SpotAvailabilityProps[]
    bookClass: (spotName: string, spotNumber: number, spotPrice: number) => Promise<void>
}

const CustomRow = (
    {
        spotsToPopulate,
        bookClass,
    }: CustomRowProps
) => {
    return (
        <div className={styles.row}>
            {
                spotsToPopulate.map((spotDetails: any) => {
                    return <CustomSpot
                        key={spotDetails.spotNumber}
                        spotDetails={spotDetails}
                        bookClass={bookClass}
                    />
                })
            }
        </div>
    );
};

export default CustomRow;