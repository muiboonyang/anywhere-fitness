import React, {useContext, useEffect, useState} from "react";
import styles from "./InstructorProfile.module.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../context/AuthContext";

interface instructorDetailsProps {
    name: string;
    class: string;
    profileImage: string;
    description: string;
}

const InstructorProfile = () => {
  const isTabletOrDesktop = useMediaQuery('(min-width:740px)');
  const navigate = useNavigate();
  const params = useParams();

  const {isLoading, setIsLoading} = useContext(AuthContext);
  const [instructorDetails, setInstructorDetails] = useState<instructorDetailsProps[]>([]);

    const getInstructorData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/instructors/view-all/`);
            const data = await res.json();
            setIsLoading(false)

            if (res.status === 200) {
                setInstructorDetails(data);
            }
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        getInstructorData();
        // eslint-disable-next-line
    }, []);

  let instructorName,
    instructorClass,
    instructorImage,
    instructorDescription;

  instructorDetails.forEach((data) => {
    if (params.name === data.name) {
      instructorName = data.name;
      instructorClass = data.class
      instructorImage = data.profileImage;
      instructorDescription = data.description;
    }
  });

  if (isLoading) return <LoadingSpinner/>;

  return (
      <>
          {isTabletOrDesktop
              ?
              (
                <div className={styles.container}>
                  <div className={styles.column}>
                    <img src={instructorImage} alt={`${instructorName}`} />
                  </div>

                  <div className={styles.column}>
                      <div className="backButtonContainer">
                          <button onClick={()=> navigate(-1)} className={styles.backButton}>
                              <ArrowBackIcon/>
                          </button>
                      </div>

                      <p className={styles.name}>{instructorName}</p>
                        <p className={instructorClass === "Ride" ? styles.classRide : styles.classResistance}>
                            {instructorClass}
                        </p>
                      <div className={styles.description}>{instructorDescription}</div>
                  </div>
                </div>
              )
              :
              (
                 <div className={styles.containerMobile}>
                  <div className={styles.column}>
                      <div className="backButtonContainer">
                          <button onClick={()=> navigate(-1)} className={styles.backButton}>
                              <ArrowBackIcon/>
                          </button>
                      </div>

                      <img src={instructorImage} alt={`${instructorName}`} />

                      <p className={styles.name}>{instructorName}</p>
                        <p className={instructorClass === "Ride" ? styles.classRide : styles.classResistance}>
                            {instructorClass}
                        </p>
                      <div className={styles.description}>{instructorDescription}</div>
                  </div>
                </div>
              )
          }
          </>
  );
};

export default InstructorProfile;
