import React from "react";
import styles from "./Workouts.module.css";
import { NavLink } from "react-router-dom";

const Workouts = () => {
  return (
    <div className={styles.workoutsContainer}>
      <br />
      <h2>Workouts</h2>
      <br />

      <div className={styles.classContainer}>
        <NavLink to="/schedule">
          <div className={`${styles.classDetailsContainer} ${styles.resistance}`}>
              <p className={styles.title}>Resistance</p>
              <p className={styles.description}>
                Resistance is our total body workout experience. <br />
                Expect dynamic weight sequences, functional movement <br />
                patterns and high intensity exercises for the ultimate <br />
                body shaping session.
              </p>
          </div>
           <div className={`${styles.classDetailsContainer} ${styles.ride}`}>
              <p className={styles.title}>Ride</p>
              <p className={styles.description}>
                Ride is our take on a traditional indoor cycling class. <br />
                Expect rhythm-based choreography set to specially <br />
                put together playlists for the ultimate cardio workout.
              </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Workouts;
