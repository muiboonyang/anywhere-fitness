import React from "react";
import {useNavigate} from "react-router-dom";
import styles from "./InstructorCardTemplate.module.css";

interface InstructorCardTemplateProps {
    cardData: {
        name: string;
        cardImage: string;
    }
}

const InstructorCardTemplate = (props: InstructorCardTemplateProps) => {
  const navigate = useNavigate();

  return (
        <div className={styles.container}>
          <div className={styles.detailsContainer}>
              <img src={props.cardData.cardImage}
                   onClick={()=>
                        navigate(
                            `/instructor/${props.cardData.name}`
                        )}
                   alt={`${props.cardData.name}`} />
              <div>
                  <h2>{props.cardData.name}</h2>
              </div>
          </div>
        </div>
  );
};

export default InstructorCardTemplate;
