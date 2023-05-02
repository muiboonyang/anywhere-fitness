import React, {useContext} from "react";
import styles from "./BookingsCardTemplate.module.css";
import {NavLink} from "react-router-dom";
import useCustomFetch from "../../../utils/useCustomFetch";
import AuthContext from "../../../context/AuthContext";
import {capitalizeFirstLetter, convertTimeFormat, convertToDateFormat} from "../../../utils/dataFormatter";
import CustomAlert from "../../CustomAlert/CustomAlert";
import UserContext from "../../../context/UserContext";

interface BookingsCardTemplateProps {
    classDetails: {
        class_type: string;
        class_instructor: string;
        id: number;
        class_id: number;
        date: Date;
        time: string;
        spot: number;
        spot_name: string;
    }
    getClasses: () => void;
}

const BookingsCardTemplate = ({
                                  classDetails, getClasses
}: BookingsCardTemplateProps) => {
    const {userProfile, alertMessage, setAlertMessage} = useContext(AuthContext);
    const {getUserTransactions} = useContext(UserContext);
    const customFetch = useCustomFetch();

    ////////////////////////////////////
    // Cancel and refund
    ////////////////////////////////////

    const cancelAndRefund = async (spotToCancel: string) => {
        try {
            ///////////////////////////////
            // POST - Refund credit
            ///////////////////////////////

            const {res: createRefundRecord} = await customFetch(`/transactions/create/`, 'POST', {
                classCredit: 1,
                transaction_type: "refund",
                user: userProfile!.user_id,
                name: userProfile!.name,
            });

            ///////////////////////////////
            // POST - Cancel class
            ///////////////////////////////

            const {res: cancelClass} = await customFetch(`/class/delete/${classDetails.id}`, 'DELETE', {});

            ///////////////////////////////
            // POST - Release booked spot
            ///////////////////////////////

            const {res: releaseSpot} = await customFetch(`/layout/refund/${classDetails.class_id}`, 'POST',
                {
                    button_id: spotToCancel,
                }
            );

            if (createRefundRecord.status && cancelClass.status && releaseSpot.status === 200) {
                getClasses();
                getUserTransactions();
                setAlertMessage("Cancellation successful!");
            }
            // else {
            //     setAlertMessage("Cancellation unsuccessful!");
            // }
        } catch (err) {
            // console.log(err);
        }
    };

    ////////////////////////////////
    // Conditional formatting
    ////////////////////////////////

    let classRide, classResistance;

    if (classDetails.class_type === "ride") {
        classRide = classDetails.class_type;
    } else {
        classResistance = classDetails.class_type;
    }

    /////////////////////////////////
    // Formatted data
    /////////////////////////////////

    let instructor = capitalizeFirstLetter(classDetails.class_instructor);
    let time = convertTimeFormat(classDetails.time);

    let date = convertToDateFormat(classDetails.date);
    let day = new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(
        new Date(date)
    );

    ///////////////////////////
    // Combined function
    ///////////////////////////

    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                {classRide ? (
                    <p className={styles.classRide}>{classRide}</p>
                ) : (
                    <p className={styles.classResistance}>{classResistance}</p>
                )}
                <div className={styles.content}>
                    <NavLink to={`/instructor/${classDetails.class_instructor}`}>
                        <p className={styles.instructor}>{instructor}</p>
                    </NavLink>
                    <p>{time}</p>
                    <p>{date}</p>
                    <p>{day}</p>
                    <p>Spot {classDetails.spot}</p>
                </div>
            </div>

            <div className={styles.cancel}>
                <button
                    value={classDetails.spot_name}
                    className={styles.button}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        cancelAndRefund(event.currentTarget.value)
                    }
                }
                >
                    Cancel
                </button>
            </div>
            <CustomAlert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default BookingsCardTemplate;
