import React, {useContext, useEffect, useState} from "react";
import styles from "./ClassDetails.module.css";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import useCustomFetch from "../../utils/useCustomFetch";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import {NavLink} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {convertTimeFormat, convertToDateFormat, convertToLongDay} from "../../utils/dataFormatter";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import CustomRow from "./CustomRow/CustomRow";
import {v4 as uuidv4} from "uuid";

interface ClassDetailsProps {
    id: number;
    class_type: string;
    class_instructor: string;
    date: string;
    time: string;
}

export interface SpotAvailabilityProps {
    spotName: string,
    spotNumber: number,
    spotCost: number,
    isSpotBooked: boolean,
    row: number,
}

const ClassDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const customFetch = useCustomFetch();
    const {userProfile, alertMessage, setAlertMessage, isLoading, setIsLoading} = useContext(AuthContext);
    const {balance, getUserTransactions} = useContext(UserContext);

    ///////////////////////////////
    // Get Class Layout
    ///////////////////////////////

    const [classDetails, setClassDetails] = useState({} as ClassDetailsProps);
    const [spotAvailability, setSpotAvailability] = useState<SpotAvailabilityProps[]>([]);

    const rowsToPopulate = [...new Set(spotAvailability && spotAvailability.map(element => element.row))]

    const getClassDetails = async () => {
        setIsLoading(true)
        try {
            const {res, data} = await customFetch(`/layout/view/${params.id}`, 'GET', {});
            setIsLoading(false)

            if (res.status === 200) {
                setClassDetails(data);
                setSpotAvailability([
                    {
                        spotName: "one",
                        spotNumber: 1,
                        spotCost: 30,
                        isSpotBooked: data.spot_one_booked,
                        row: 1,
                    },
                    {
                        spotName: "two",
                        spotNumber: 2,
                        spotCost: 40,
                        isSpotBooked: data.spot_two_booked,
                        row: 1
                    },
                    {
                        spotName: "three",
                        spotNumber: 3,
                        spotCost: 50,
                        isSpotBooked: data.spot_three_booked,
                        row: 1
                    },
                    {
                        spotName: "four",
                        spotNumber: 4,
                        spotCost: 30,
                        isSpotBooked: data.spot_four_booked,
                        row: 1
                    },
                    {
                        spotName: "five",
                        spotNumber: 5,
                        spotCost: 30,
                        isSpotBooked: data.spot_five_booked,
                        row: 1
                    },
                    {
                        spotName: "six",
                        spotNumber: 6,
                        spotCost: 20,
                        isSpotBooked: data.spot_six_booked,
                        row: 2
                    },
                    {
                        spotName: "seven",
                        spotNumber: 7,
                        spotCost: 20,
                        isSpotBooked: data.spot_seven_booked,
                        row: 2
                    },
                    {
                        spotName: "eight",
                        spotNumber: 8,
                        spotCost: 20,
                        isSpotBooked: data.spot_eight_booked,
                        row: 2
                    },
                    {
                        spotName: "nine",
                        spotNumber: 9,
                        spotCost: 20,
                        isSpotBooked: data.spot_nine_booked,
                        row: 2,
                    },
                    {
                        spotName: "ten",
                        spotNumber: 10,
                        spotCost: 20,
                        isSpotBooked: data.spot_ten_booked,
                        row: 2
                    },
                    {
                        spotName: "eleven",
                        spotNumber: 11,
                        spotCost: 10,
                        isSpotBooked: data.spot_eleven_booked,
                        row: 3
                    },
                    {
                        spotName: "twelve",
                        spotNumber: 12,
                        spotCost: 10,
                        isSpotBooked: data.spot_twelve_booked,
                        row: 3
                    },
                    {
                        spotName: "thirteen",
                        spotNumber: 13,
                        spotCost: 10,
                        isSpotBooked: data.spot_thirteen_booked,
                        row: 3
                    },
                    {
                        spotName: "fourteen",
                        spotNumber: 14,
                        spotCost: 10,
                        isSpotBooked: data.spot_fourteen_booked,
                        row: 3
                    },
                    {
                        spotName: "fifteen",
                        spotNumber: 15,
                        spotCost: 10,
                        isSpotBooked: data.spot_fifteen_booked,
                        row: 3
                    },
                    {
                        spotName: "sixteen",
                        spotNumber: 16,
                        spotCost: 1,
                        isSpotBooked: data.spot_sixteen_booked,
                        row: 4
                    },
                    {
                        spotName: "seventeen",
                        spotNumber: 17,
                        spotCost: 1,
                        isSpotBooked: data.spot_seventeen_booked,
                        row: 4
                    },
                    {
                        spotName: "eighteen",
                        spotNumber: 18,
                        spotCost: 1,
                        isSpotBooked: data.spot_eighteen_booked,
                        row: 4
                    },
                    {
                        spotName: "nineteen",
                        spotNumber: 19,
                        spotCost: 1,
                        isSpotBooked: data.spot_nineteen_booked,
                        row: 4
                    },
                    {
                        spotName: "twenty",
                        spotNumber: 20,
                        spotCost: 1,
                        isSpotBooked: data.spot_twenty_booked,
                        row: 4
                    },
                ])
            }
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        getClassDetails();
        // eslint-disable-next-line
    }, []);

    ///////////////////////////////
    // POST - Deduct credit
    ///////////////////////////////

    const deductCredit = async (spotPrice: number) => {
        await customFetch(`/transactions/create/`, 'POST', {
            classDebit: spotPrice,
            transaction_type: "booking",
            user: userProfile!.user_id,
            name: userProfile!.name,
        })
    }

    ///////////////////////////////
    // POST - Update class details, grey out spot
    ///////////////////////////////

    const updateClass = async (spotName: string) => {
        await customFetch(`/layout/update/${params.id}`, 'POST', {
            spotToUpdate: spotName,
        });
    }

    ///////////////////////////////
    // POST - Add class to user's bookings
    ///////////////////////////////

    const addToBookings = async (spotNumber: number, spotName: string) => {
        await customFetch(`/class/book/`, 'POST', {
            class_type: classDetails.class_type,
            class_instructor: classDetails.class_instructor,
            date: classDetails.date,
            time: classDetails.time,
            spot: spotNumber,
            spot_name: spotName,
            name: userProfile!.name,
            user: userProfile!.user_id,
            class_id: classDetails.id,
        });
    }

    ///////////////////////////////
    // POST - Book class flow
    ///////////////////////////////

    const bookClass = async (spotName: string, spotNumber: number, spotPrice: number) => {
        if (spotPrice > balance) {
            navigate("/pricing");
        } else {
            deductCredit(spotPrice)
            .then(() => updateClass(spotName))
            .then(() => addToBookings(spotNumber, spotName))
            .finally(() => {
                getUserTransactions();
                navigate("/bookings");
                setAlertMessage("Booking successful!");
            })
            .catch(() => {
                setAlertMessage("Booking failed!");
            })
        }
    };

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className={styles.classDetailsContainer}>
            <br/>
            <h2>Class Details</h2>

            <div className={styles.backButton}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    <ArrowBackIcon/>
                </button>
            </div>

            <div className={styles.classHeader}>
                <div className={styles.title}>
                    {
                        Object.keys(classDetails).length > 0 && (
                            <>
                                {classDetails.class_type === "ride" ? (
                                    <p className={styles.classRide}>{classDetails.class_type}</p>
                                ) : (
                                    <p className={styles.classResistance}>{classDetails.class_type}</p>
                                )}

                                <p>
                                    {convertToLongDay(classDetails.date)} <br/>
                                    {convertToDateFormat(classDetails.date)} <br/>
                                    {convertTimeFormat(classDetails.time)}
                                </p>
                            </>
                        )
                    }

                    <NavLink to={`/instructor/${classDetails.class_instructor}`}>
                        <p className={styles.instructor}>{classDetails.class_instructor}</p>
                    </NavLink>
                </div>
            </div>

            <div className={styles.layoutContainer}>
                <div className={styles.instructorBox}>
                    <p>Instructor</p>
                </div>
                {
                    rowsToPopulate.map((rowNumber: number) => {
                        const spotsToPopulate = spotAvailability.filter((element) => element.row === rowNumber)

                        return <CustomRow
                            key={uuidv4()}
                            spotsToPopulate={spotsToPopulate}
                            bookClass={bookClass}
                        />
                    })
                }
            </div>

            <CustomAlert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default ClassDetails;
