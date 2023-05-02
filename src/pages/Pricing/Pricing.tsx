import React, {useContext, useEffect, useState} from "react";
import styles from "./Pricing.module.css";
import { v4 as uuidv4 } from "uuid";
import PricingCardTemplate from "../../components/Templates/PricingCardTemplate/PricingCardTemplate";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Pricing = () => {
    const {setIsLoading, isLoading} = useContext(AuthContext)
    const [instructorDetails, getInstructorDetails] = useState([]);

    const getPricingData = async () => {
        setIsLoading(true)
        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const res = await fetch(`${baseUrl}/packages/view-all/`);
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
        getPricingData();
        // eslint-disable-next-line
    }, []);

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className={styles.pricingContainer}>
      <br />
      <h2>Pricing</h2>
      <div className={styles.container}>
        {instructorDetails.map((pricingData) => {
          return (
            <div key={uuidv4()}>
              <PricingCardTemplate pricingData={pricingData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
