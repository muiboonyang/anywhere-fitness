import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./PricingCardTemplate.module.css";
import useCustomFetch from "../../../utils/useCustomFetch";
import AuthContext from "../../../context/AuthContext";
import {formatPrice} from "../../../utils/dataFormatter";
import CustomAlert from "../../CustomAlert/CustomAlert";
import UserContext from "../../../context/UserContext";

interface PricingCardTemplateProps {
  pricingData: {
    name: string;
    credits: number;
    price: number;
  }
}

const PricingCardTemplate = (props: PricingCardTemplateProps) => {
    const {isLoggedIn, userProfile, alertMessage, setAlertMessage} = useContext(AuthContext);
    const {getUserTransactions} = useContext(UserContext);
    const customFetch = useCustomFetch();
    const navigate = useNavigate();

    ///////////////////////////////
    // POST - Purchase classes
    ///////////////////////////////

    const buyPackage = async (event: React.FormEvent | any) => {
        event.preventDefault();
        try {
            const {res} = await customFetch(`/transactions/create/`, 'POST', {
                classCredit: props.pricingData.credits,
                transaction_type: "purchase",
                user: userProfile!.user_id,
                name: userProfile!.name,
            });

            if (res.status === 200) {
                switch (event.target.value) {
                    case "1":
                        window.location.replace("https://buy.stripe.com/test_28oeXvbVWadPfT2aEE") // 1 class
                        break;
                    case "10":
                        window.location.replace("https://buy.stripe.com/test_eVa02B0dedq122c001") // 10 classes
                        break;
                    case "25":
                        window.location.replace("https://buy.stripe.com/test_dR616F2lm3Pr9uE9AC") // 25 classes
                        break;
                    case "50":
                        window.location.replace("https://buy.stripe.com/test_7sI6qZgcc4Tv8qAcMP") // 50 classes
                        break;
                    case "100":
                        window.location.replace("https://buy.stripe.com/test_6oEcPn4tueu536g7sw") // 100 classes
                        break;
                }
                getUserTransactions();
                // navigate("/transactions");
                // setAlertMessage("Purchase successful!");
            } else {
                setAlertMessage("Purchase failed!");
            }
        } catch (err) {
            // console.log(err);
        }
    };

    const price = formatPrice(props.pricingData.price)
    const subtitle = props.pricingData.name  === ("single" || 1) ? 'Class' : 'Classes'

    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                <span className={styles.title}>{props.pricingData.name}</span>
                <p className={styles.subtitle}>{subtitle}</p>
                <span className={styles.price}>${price}</span>
                {/*<div*/}
                {/*  className={styles.description}*/}
                {/*  dangerouslySetInnerHTML={{*/}
                {/*    __html: props.pricingData.description,*/}
                {/*  }}*/}
                {/*/>*/}
            </div>

            {isLoggedIn ? (
                <div className={styles.buy}>
                    <button
                        className={styles.button}
                        onClick={buyPackage}
                        value={props.pricingData.credits}
                    >
                        Buy
                    </button>
                </div>
            ) : (
                <div className={styles.buy}>
                    <button
                        className={styles.button}
                        onClick={()=>navigate("/login")}
                    >
                        Buy
                    </button>
                </div>
            )}
            <CustomAlert
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </div>
    );
};

export default PricingCardTemplate;
