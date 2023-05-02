import React, {useContext, useEffect} from "react";
import styles from "./Transactions.module.css";
import Table from "react-bootstrap/Table";
import {capitalizeFirstLetter, convertTimeFormat, convertToDateFormat} from "../../utils/dataFormatter";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../context/AuthContext";

const Transactions = () => {
  const {isLoading} = useContext(AuthContext)
  const {transactions, getUserTransactions} = useContext(UserContext);

  useEffect(() => {
      getUserTransactions();
      // eslint-disable-next-line
  }, []);

  const renderTable = transactions.length > 0
      ? (
          transactions.map((item, idx) => {
            return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  {/* <td>{item.id}</td> */}
                  <td>{item.classCredit}</td>
                  <td>{item.classDebit}</td>
                  <td>{capitalizeFirstLetter(item.transaction_type)}</td>
                  <td>{convertToDateFormat(item.date)}</td>
                  <td>{convertTimeFormat(item.time.substr(0, 5))}</td>
                </tr>
            );
          })
        )
      : (
          <tr>
            <td colSpan={6}>
                <br/>
                No transactions yet :( <br/><br/>
                Purchase a package <a href={"/pricing"}>here</a>!
                <br/><br/>
            </td>
          </tr>
        )

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className={styles.purchaseContainer}>
      <br />
      <h2>Transactions</h2>
      <br />

      <div className={styles.tableContainer}>
        <Table striped bordered hover variant="dark" className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeaders}>
              <th className={styles.tableHeader1}>S/N</th>
              <th className={styles.tableHeader2}>Class Credits</th>
              <th className={styles.tableHeader3}>Used</th>
              <th className={styles.tableHeader4}>Transaction Type</th>
              <th className={styles.tableHeader5}>Date</th>
              <th className={styles.tableHeader6}>Time</th>
            </tr>
          </thead>
          <tbody>{renderTable}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
