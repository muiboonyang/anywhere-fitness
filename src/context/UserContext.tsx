import React, { useContext, useState, useEffect } from "react";
import useCustomFetch from "../utils/useCustomFetch";
import AuthContext from "./AuthContext";

interface Transactions {
    classCredit: number
    classDebit: number
    transaction_type: string;
    date: string;
    time: string;
}

interface UserContextProps {
    transactions: Array<Transactions>;
    credits: number;
    debits: number;
    balance: number;
    getUserTransactions: () => void;
}

const UserContext = React.createContext<UserContextProps>({
    transactions: [],
    credits: 0,
    debits: 0,
    balance: 0,
    getUserTransactions: ()=> {}
    }
);

type ChildrenProps = {
  children: JSX.Element
}

export const UserProvider = ({children}: ChildrenProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const {userProfile, isLoggedIn, setIsLoading} = useContext(AuthContext);
  const customFetch = useCustomFetch();

  const getUserTransactions = async () => {
    setIsLoading(true)
    try {
      const {res, data} = await customFetch(`/transactions/view/${userProfile.user_id}`, 'GET', {});
      setIsLoading(false)

      if (res.status === 200) {
          // sort transactions by descending order of id
          // @ts-ignore
          data.sort((a, b) => b.id - a.id);
          setTransactions(data);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    isLoggedIn && getUserTransactions();
    // eslint-disable-next-line
  }, [isLoggedIn]);

  //////////////////////////////////
  // Calculate balance credits
  //////////////////////////////////

  let credits = transactions
    .map((item) => item.classCredit)
    .reduce((prev, next) => prev + next, 0);

  let debits = transactions
    .map((item) => item.classDebit)
    .reduce((prev, next) => prev + next, 0);

  let balance = credits - debits;

  //   console.log(`Current credits: ${credits}`);
  //   console.log(`Current debits: ${debits}`);
  //   console.log(`Current balance: ${balance}`);

  //////////////////////////////////
  // Pass contextData into context provider
  //////////////////////////////////

  const contextData = {
      transactions: transactions,
      credits: credits,
      debits: debits,
      balance: balance,
      getUserTransactions: getUserTransactions,
  };

  //////////////////////////////////
  // dont load child components until 'isLoading' is false (complete)
  // - to render everything out with data passed in
  //////////////////////////////////

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
