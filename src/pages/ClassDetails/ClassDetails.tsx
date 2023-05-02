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

    const [spotOne, setSpotOne] = useState("");
    const [spotTwo, setSpotTwo] = useState("");
    const [spotThree, setSpotThree] = useState("");
    const [spotFour, setSpotFour] = useState("");
    const [spotFive, setSpotFive] = useState("");
    const [spotSix, setSpotSix] = useState("");
    const [spotSeven, setSpotSeven] = useState("");
    const [spotEight, setSpotEight] = useState("");
    const [spotNine, setSpotNine] = useState("");
    const [spotTen, setSpotTen] = useState("");
    const [spotEleven, setSpotEleven] = useState("");
    const [spotTwelve, setSpotTwelve] = useState("");
    const [spotThirteen, setSpotThirteen] = useState("");
    const [spotFourteen, setSpotFourteen] = useState("");
    const [spotFifteen, setSpotFifteen] = useState("");
    const [spotSixteen, setSpotSixteen] = useState("");
    const [spotSeventeen, setSeventeen] = useState("");
    const [spotEighteen, setSpotEighteen] = useState("");
    const [spotNineteen, setSpotNineteen] = useState("");
    const [spotTwenty, setSpotTwenty] = useState("");

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

                setSpotOne(data.spot_one_booked);
                setSpotTwo(data.spot_two_booked);
                setSpotThree(data.spot_three_booked);
                setSpotFour(data.spot_four_booked);
                setSpotFive(data.spot_five_booked);
                setSpotSix(data.spot_six_booked);
                setSpotSeven(data.spot_seven_booked);
                setSpotEight(data.spot_eight_booked);
                setSpotNine(data.spot_nine_booked);
                setSpotTen(data.spot_ten_booked);
                setSpotEleven(data.spot_eleven_booked);
                setSpotTwelve(data.spot_twelve_booked);
                setSpotThirteen(data.spot_thirteen_booked);
                setSpotFourteen(data.spot_fourteen_booked);
                setSpotFifteen(data.spot_fifteen_booked);
                setSpotSixteen(data.spot_sixteen_booked);
                setSeventeen(data.spot_seventeen_booked);
                setSpotEighteen(data.spot_eighteen_booked);
                setSpotNineteen(data.spot_nineteen_booked);
                setSpotTwenty(data.spot_twenty_booked);
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

    const bookClassAndDeduct = async (spotName: string, spotNumber: string, spotPrice: string, ) => {
        if (parseInt(spotPrice) > balance) {
            navigate("/pricing");
        } else {
            try {
                ///////////////////////////////
                // POST - Deduct credit
                ///////////////////////////////

                const {res} = await customFetch(`/transactions/create/`, 'POST', {
                    classDebit: spotPrice,
                    transaction_type: "booking",
                    user: userProfile!.user_id,
                    name: userProfile!.name,
                });

                ///////////////////////////////
                // POST - Update class layout, grey out spot
                ///////////////////////////////

                const {res: updateClassResponse} = await customFetch(`/layout/update/${params.id}`, 'POST', {
                    button_id: spotName,
                });

                ///////////////////////////////
                // POST - Add class to bookings
                ///////////////////////////////

                const {res: bookClassResponse} = await customFetch(`/class/book/`, 'POST', {
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

                if (res.status || updateClassResponse.status || bookClassResponse.status === 200) {
                    getUserTransactions();
                    navigate("/bookings");
                    setAlertMessage("Booking successful!");
                } else {
                    setAlertMessage("Booking failed!");
                }
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
                    {!spotOne ? (
                        <button id="one" value="1" name="30" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            1
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotTwo ? (
                        <button id="two" value="2" name="40" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            2
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotThree ? (
                        <button id="three" value="3" name="50" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            3
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotFour ? (
                        <button id="four" value="4" name="40" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            4
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotFive ? (
                        <button id="five" value="5" name="30" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            5
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                </div>

                <div className={styles.gymRow2}>
                    {!spotSix ? (
                        <button id="six" value="6" name="20" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            6
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotSeven ? (
                        <button id="seven" value="7" name="20" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            7
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotEight ? (
                        <button id="eight" value="8" name="20" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            8
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotNine ? (
                        <button id="nine" value="9" name="20" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            9
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotTen ? (
                        <button id="ten" value="10" name="20" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}>
                            10
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                </div>

                <div className={styles.gymRow3}>
                    {!spotEleven ? (
                        <button
                            id="eleven"
                            value="11"
                            name="10"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            11
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotTwelve ? (
                        <button
                            id="twelve"
                            value="12"
                            name="10"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            12
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotThirteen ? (
                        <button
                            id="thirteen"
                            value="13"
                            name="10"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            13
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotFourteen ? (
                        <button
                            id="fourteen"
                            value="14"
                            name="10"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            14
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotFifteen ? (
                        <button
                            id="fifteen"
                            value="15"
                            name="10"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            15
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                </div>

                <div className={styles.gymRow4}>
                    {!spotSixteen ? (
                        <button
                            id="sixteen"
                            value="16"
                            name="1"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            16
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotSeventeen ? (
                        <button
                            id="seventeen"
                            value="17"
                            name="1"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            17
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotEighteen ? (
                        <button
                            id="eighteen"
                            value="18"
                            name="1"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            18
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotNineteen ? (
                        <button
                            id="nineteen"
                            value="19"
                            name="1"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            19
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
                    {!spotTwenty ? (
                        <button
                            id="twenty"
                            value="20"
                            name="1"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        bookClassAndDeduct(event.currentTarget.id, event.currentTarget.value, event.currentTarget.name)
                    }}
                        >
                            20
                        </button>
                    ) : (
                        <button className={styles.booked} disabled>
                            X
                        </button>
                    )}
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
