import React, {useContext, useEffect, useState} from "react";
import styles from "./Instructors.module.css";
import { v4 as uuidv4 } from "uuid";
import InstructorCardTemplate from "../../components/Templates/InstructorCardTemplate/InstructorCardTemplate";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Instructors = () => {
    const {setIsLoading, isLoading} = useContext(AuthContext)
    const [instructorDetails, getInstructorDetails] = useState([]);

    const getInstructorData = async () => {
        setIsLoading(true)
        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const res = await fetch(`${baseUrl}/instructors/view-all/`);
            const data = await res.json();
            setIsLoading(false)

            if (res.status === 200) {
                getInstructorDetails(data);
            }
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        getInstructorData();
        // eslint-disable-next-line
    }, []);

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className={styles.instructorsContainer}>
      <br />
      <h2>Instructors</h2>

      <div className={styles.container}>
        {instructorDetails.map((cardData) => {
          return (
            <div key={uuidv4()}>
              <InstructorCardTemplate cardData={cardData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instructors;
