import React, {useContext, useEffect, useState} from "react";
import styles from "./ClassDetails.module.css";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import useCustomFetch from "../../utils/useCustomFetch";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import {NavLink} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {convertTimeFormat, convertToDateFormat} from "../../utils/dataFormatter";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface ClassLayoutProps {
    id: number;
    class_type: string;
    class_instructor: string;
    date: string;
    time: string;
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

    const [classLayout, setClassLayout] = useState({} as ClassLayoutProps);
    const [classFormattedDate, setClassFormattedDate] = useState("");
    const [classFormattedTime, setClassFormattedTime] = useState("");
    const [classDay, setClassDay] = useState("");

    const [spotOneBooked, setSpotOneBooked] = useState(false);
    const [spotTwoBooked, setSpotTwoBooked] = useState(false);
    const [spotThreeBooked, setSpotThreeBooked] = useState(false);
    const [spotFourBooked, setSpotFourBooked] = useState(false);
    const [spotFiveBooked, setSpotFiveBooked] = useState(false);
    const [spotSixBooked, setSpotSixBooked] = useState(false);
    const [spotSevenBooked, setSpotSevenBooked] = useState(false);
    const [spotEightBooked, setSpotEightBooked] = useState(false);
    const [spotNineBooked, setSpotNineBooked] = useState(false);
    const [spotTenBooked, setSpotTenBooked] = useState(false);
    const [spotElevenBooked, setSpotElevenBooked] = useState(false);
    const [spotTwelveBooked, setSpotTwelveBooked] = useState(false);
    const [spotThirteenBooked, setSpotThirteenBooked] = useState(false);
    const [spotFourteenBooked, setSpotFourteenBooked] = useState(false);
    const [spotFifteenBooked, setSpotFifteenBooked] = useState(false);
    const [spotSixteenBooked, setSpotSixteenBooked] = useState(false);
    const [spotSeventeenBooked, setSpotSeventeenBooked] = useState(false);
    const [spotEighteenBooked, setSpotEighteenBooked] = useState(false);
    const [spotNineteenBooked, setSpotNineteenBooked] = useState(false);
    const [spotTwentyBooked, setSpotTwentyBooked] = useState(false);

    const getClassLayout = async () => {
        setIsLoading(true)
        try {
            const {res, data} = await customFetch(`/layout/view/${params.id}`, 'GET', {});
            setIsLoading(false)

            if (res.status === 200) {
                setClassLayout(data);
                setClassFormattedTime(convertTimeFormat(data.time));
                setClassFormattedDate(convertToDateFormat(data.date));
                setClassDay(
                    new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                    }).format(new Date(data.date))
                );

                setSpotOneBooked(data.spot_one_booked);
                setSpotTwoBooked(data.spot_two_booked);
                setSpotThreeBooked(data.spot_three_booked);
                setSpotFourBooked(data.spot_four_booked);
                setSpotFiveBooked(data.spot_five_booked);
                setSpotSixBooked(data.spot_six_booked);
                setSpotSevenBooked(data.spot_seven_booked);
                setSpotEightBooked(data.spot_eight_booked);
                setSpotNineBooked(data.spot_nine_booked);
                setSpotTenBooked(data.spot_ten_booked);
                setSpotElevenBooked(data.spot_eleven_booked);
                setSpotTwelveBooked(data.spot_twelve_booked);
                setSpotThirteenBooked(data.spot_thirteen_booked);
                setSpotFourteenBooked(data.spot_fourteen_booked);
                setSpotFifteenBooked(data.spot_fifteen_booked);
                setSpotSixteenBooked(data.spot_sixteen_booked);
                setSpotSeventeenBooked(data.spot_seventeen_booked);
                setSpotEighteenBooked(data.spot_eighteen_booked);
                setSpotNineteenBooked(data.spot_nineteen_booked);
                setSpotTwentyBooked(data.spot_twenty_booked);
            }
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        getClassLayout();
        // eslint-disable-next-line
    }, []);

    // console.log(typeof spotOne); // false (boolean)

    ///////////////////////////////
    // POST - Book class
    // To-do: pass to custom route (ClassDetails)
    ///////////////////////////////

    ///////////////////////////////
    // POST - Deduct credit
    ///////////////////////////////

    const deductCredit = async (spotPrice: string) => {
        return await customFetch(`/transactions/create/`, 'POST', {
            classDebit: spotPrice,
            transaction_type: "booking",
            user: userProfile!.user_id,
            name: userProfile!.name,
        })
    }

    ///////////////////////////////
    // POST - Update class layout, grey out spot
    ///////////////////////////////

    const updateClassResponse = async (spotName: string) => {
        return await customFetch(`/layout/update/${params.id}`, 'POST', {
            button_id: spotName,
        });
    }

    ///////////////////////////////
    // POST - Add class to bookings
    ///////////////////////////////

    const bookClassResponse = async (spotNumber: string, spotName: string) => {
        return await customFetch(`/class/book/`, 'POST', {
            class_type: classLayout.class_type,
            class_instructor: classLayout.class_instructor,
            date: classLayout.date,
            time: classLayout.time,
            spot: spotNumber,
            spot_name: spotName,
            name: userProfile!.name,
            user: userProfile!.user_id,
            class_id: classLayout.id,
        });
    }

    const bookClassAndDeduct = async (spotName: string, spotNumber: string, spotPrice: string,) => {
        if (parseInt(spotPrice) > balance) {
            navigate("/pricing");
        } else {
            try {
                deductCredit(spotPrice)
                .then(() => updateClassResponse(spotName))
                .then(() => bookClassResponse(spotNumber, spotName))
                .finally(() => {
                    getUserTransactions();
                    navigate("/bookings");
                    setAlertMessage("Booking successful!");
                })
                .catch(() => {
                    setAlertMessage("Booking failed!");
                })
            } catch (err) {
                // console.log(err);
            }
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
                    {classLayout.class_type === "ride" ? (
                        <p className={styles.classRide}>{classLayout.class_type}</p>
                    ) : (
                        <p className={styles.classResistance}>{classLayout.class_type}</p>
                    )}
                    <p>
                        {classDay} <br/>
                        {classFormattedDate} <br/>
                        {classFormattedTime}
                    </p>
                    <NavLink to={`/instructor/${classLayout.class_instructor}`}>
                        <p className={styles.instructor}>{classLayout.class_instructor}</p>
                    </NavLink>
                </div>
            </div>

            <div className={styles.layoutContainer}>
                <div className={styles.gymRow0}>
                    <p>Instructor</p>
                </div>

                <div className={styles.gymRow1}>
                    <button
                        className={spotOneBooked ? styles.booked : ''}
                        disabled={spotOneBooked}
                        id="one"
                        value="1"
                        name="30"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotOneBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotOneBooked ? 'X' : '1'}
                    </button>

                    <button
                        className={spotTwoBooked ? styles.booked : ''}
                        disabled={spotTwoBooked}
                        id="two"
                        value="2"
                        name="40"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotTwoBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotTwoBooked ? 'X' : '2'}
                    </button>

                    <button
                        className={spotThreeBooked ? styles.booked : ''}
                        disabled={spotThreeBooked}
                        id="three"
                        value="3"
                        name="50"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotThreeBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotThreeBooked ? 'X' : '3'}
                    </button>

                    <button
                        className={spotFourBooked ? styles.booked : ''}
                        disabled={spotFourBooked}
                        id="four"
                        value="4"
                        name="40"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotFourBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotFourBooked ? 'X' : '4'}
                    </button>

                    <button
                        className={spotFiveBooked ? styles.booked : ''}
                        disabled={spotFiveBooked}
                        id="five"
                        value="5"
                        name="30"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotFiveBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotFiveBooked ? 'X' : '5'}
                    </button>
                </div>

                <div className={styles.gymRow2}>
                    <button
                        className={spotSixBooked ? styles.booked : ''}
                        disabled={spotSixBooked}
                        id="six"
                        value="6"
                        name="20"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotSixBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotSixBooked ? 'X' : '6'}
                    </button>

                    <button
                        className={spotSevenBooked ? styles.booked : ''}
                        disabled={spotSevenBooked}
                        id="seven"
                        value="7"
                        name="20"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotSevenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotSevenBooked ? 'X' : '7'}
                    </button>


                    <button
                        className={spotEightBooked ? styles.booked : ''}
                        disabled={spotEightBooked}
                        id="eight"
                        value="8"
                        name="20"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotEightBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotEightBooked ? 'X' : '8'}
                    </button>

                    <button
                        className={spotNineBooked ? styles.booked : ''}
                        disabled={spotNineBooked}
                        id="nine"
                        value="9"
                        name="20"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotNineBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotNineBooked ? 'X' : '9'}
                    </button>

                    <button
                        className={spotTenBooked ? styles.booked : ''}
                        disabled={spotTenBooked}
                        id="ten"
                        value="10"
                        name="20"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotTenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}>
                        {spotTenBooked ? 'X' : '10'}
                    </button>
                </div>

                <div className={styles.gymRow3}>
                    <button
                        className={spotElevenBooked ? styles.booked : ''}
                        disabled={spotElevenBooked}
                        id="eleven"
                        value="11"
                        name="10"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotElevenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotElevenBooked ? 'X' : '11'}
                    </button>

                    <button
                        className={spotTwelveBooked ? styles.booked : ''}
                        disabled={spotTwelveBooked}
                        id="twelve"
                        value="12"
                        name="10"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotTwelveBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotTwelveBooked ? 'X' : '12'}
                    </button>

                    <button
                        className={spotThirteenBooked ? styles.booked : ''}
                        disabled={spotThirteenBooked}
                        id="thirteen"
                        value="13"
                        name="10"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotThirteenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotThirteenBooked ? 'X' : '13'}
                    </button>

                    <button
                        className={spotFourteenBooked ? styles.booked : ''}
                        disabled={spotFourteenBooked}
                        id="fourteen"
                        value="14"
                        name="10"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotFourteenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotFourteenBooked ? 'X' : '14'}
                    </button>

                    <button
                        className={spotFifteenBooked ? styles.booked : ''}
                        disabled={spotFifteenBooked}
                        id="fifteen"
                        value="15"
                        name="10"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotFifteenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotFifteenBooked ? 'X' : '15'}
                    </button>
                </div>

                <div className={styles.gymRow4}>
                    <button
                        className={spotSixteenBooked ? styles.booked : ''}
                        disabled={spotSixteenBooked}
                        id="sixteen"
                        value="16"
                        name="1"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotSixteenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotSixteenBooked ? 'X' : '16'}
                    </button>

                    <button
                        className={spotSeventeenBooked ? styles.booked : ''}
                        disabled={spotSeventeenBooked}
                        id="seventeen"
                        value="17"
                        name="1"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotSeventeenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotSeventeenBooked ? 'X' : '17'}
                    </button>


                    <button
                        className={spotEighteenBooked ? styles.booked : ''}
                        disabled={spotEighteenBooked}
                        id="eighteen"
                        value="18"
                        name="1"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotEighteenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotEighteenBooked ? 'X' : '18'}
                    </button>

                    <button
                        className={spotNineteenBooked ? styles.booked : ''}
                        disabled={spotNineteenBooked}
                        id="nineteen"
                        value="19"
                        name="1"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotNineteenBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotNineteenBooked ? 'X' : '19'}
                    </button>

                    <button
                        className={spotTwentyBooked ? styles.booked : ''}
                        disabled={spotTwentyBooked}
                        id="twenty"
                        value="20"
                        name="1"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            setSpotTwentyBooked(true);
                            bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                        }}
                    >
                        {spotTwentyBooked ? 'X' : '20'}
                    </button>
                </div>
            </div>

            <CustomAlert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default ClassDetails;
