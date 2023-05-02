import React, {useContext, useEffect, useState} from "react";
import styles from "./Schedule.module.css";
import ScheduleCardTemplate from "../../components/Templates/ScheduleCardTemplate/ScheduleCardTemplate";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../context/AuthContext";

const Schedule = () => {
    const {setIsLoading, isLoading} = useContext(AuthContext)
    const [scheduleDetails, getScheduleDetails] = useState([]);

    const getScheduleData = async () => {
        setIsLoading(true)
        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const res = await fetch(`${baseUrl}/layout/view-all/`);
            const data = await res.json();
            setIsLoading(false)

            if (res.status === 200) {
                getScheduleDetails(data);
            }
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        getScheduleData();
        // eslint-disable-next-line
    }, []);

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className={styles.scheduleContainer}>
      <br />
      <h2>Schedule</h2>
      <br />
      <div className={styles.container}>
        {scheduleDetails.map((schedule) => {
          return (
            <div key={uuidv4()}>
              <ScheduleCardTemplate schedule={schedule} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
