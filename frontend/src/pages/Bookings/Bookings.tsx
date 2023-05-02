import React, { useContext, useEffect, useState } from "react";
import styles from "./Bookings.module.css";
import BookingsCardTemplate from "../../components/Templates/BookingCardTemplate/BookingsCardTemplate";
import AuthContext from "../../context/AuthContext";
import useCustomFetch from "../../utils/useCustomFetch";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface BookingsProps {
        class_type: string;
        class_instructor: string;
        id: number;
        class_id: number;
        date: Date;
        time: string;
        spot: number;
        spot_name: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingsProps[]>([]);
  const {userProfile, setIsLoading, isLoading} = useContext(AuthContext);
  const customFetch  = useCustomFetch();

  ///////////////////////////////
  // GET - Get all classes
  ///////////////////////////////

  const getClasses = async () => {
      setIsLoading(true);
      try {
          const {res, data} = await customFetch(`/class/view/${userProfile!.user_id}`, 'GET', {});
          setIsLoading(false);

          if (res.status === 200) {
            setBookings(data);
          }
      } catch (err) {
         // console.log(err);
      }
  };

  useEffect(() => {
    getClasses();
    // eslint-disable-next-line
  }, []);

  const renderBookings = bookings.length > 0
      ? (
          bookings.map((classDetails) => {
              return (
                <div key={uuidv4()}>
                  <BookingsCardTemplate
                      classDetails={classDetails}
                      getClasses={getClasses}
                  />
                </div>
              );
          })
        )
      : (
          <div>
              <br/>
                No bookings yet :( <br/><br/>
                Book a class <a href={"/schedule"}>here</a>!
              <br/><br/>
          </div>
        )

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className={styles.classesContainer}>
      <br />
      <h2>Bookings</h2>
      <br />

      <div className={styles.container}>
        {renderBookings}
      </div>
    </div>
  );
};

export default Bookings;
