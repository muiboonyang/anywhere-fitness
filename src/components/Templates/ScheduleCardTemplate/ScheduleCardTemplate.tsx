import React, { useContext } from "react";
import styles from "./ScheduleCardTemplate.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";
import {capitalizeFirstLetter, convertTimeFormat, convertToDateFormat} from "../../../utils/dataFormatter";

interface ScheduleCardTemplateProps {
  schedule: {
    id: number;
    class_type: string;
    class_instructor: string;
    time: string;
    date: string;
  }
}

const ScheduleCardTemplate = (props: ScheduleCardTemplateProps) => {
  const {isLoggedIn} = useContext(AuthContext);
  const {balance} = useContext(UserContext);
  const navigate = useNavigate();

  ////////////////////////////////
  // Conditional formatting
  ////////////////////////////////

  let classRide, classResistance;

  if (props.schedule.class_type === "ride") {
    classRide = props.schedule.class_type;
  } else {
    classResistance = props.schedule.class_type;
  }

  /////////////////////////////////
  // Formatted data
  /////////////////////////////////

  let instructor = capitalizeFirstLetter(props.schedule.class_instructor);
  let time = convertTimeFormat(props.schedule.time);
  let date = convertToDateFormat(props.schedule.date);
  let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(date)
  );

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {classRide ? (
          <p className={styles.classRide}>{classRide}</p>
        ) : (
          <p className={styles.classResistance}>{classResistance}</p>
        )}
        <div className={styles.content}>
          <NavLink to={`/instructor/${props.schedule.class_instructor}`}>
            <p className={styles.instructor}>{instructor}</p>
          </NavLink>
          <p>{time}</p>
          <p>{date}</p>
          <p>{day}</p>
        </div>
      </div>

      {isLoggedIn ? (
        <>
          {balance > 0
            ? (
              <div className={styles.book}>
                  <button
                      className={styles.button}
                      onClick={()=>navigate(`/class/${props.schedule.id}`)}
                  >
                    Book
                  </button>
              </div>
          ) : (
            <div className={styles.book}>
                <button
                    className={styles.button}
                    onClick={()=>navigate("/pricing")}
                >
                  Book
                </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.book}>
            <button
                className={styles.button}
                onClick={()=>navigate("/login")}
            >
              Book
            </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleCardTemplate;
