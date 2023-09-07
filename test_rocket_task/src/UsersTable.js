import { useState } from "react";
import Modal from "./Modal";
import styles from "../app/page.module.css";

export default function UsersTable({ data }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const onRowClick = (user) => {
    setUser(user);
    showModal();
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.sticky}>ID</th>
            <th>GIVEN NAME</th>
            <th>FAMILY NAME</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data?.data?.map((user, ind) => (
            <tr key={ind} onClick={() => onRowClick(user)}>
              <td className={styles.sticky} key={user.id}>
                {user.id}
              </td>
              <td key={user.first_name}>{user.first_name}</td>
              <td key={user.last_name}>{user.last_name}</td>
              <td key={user.email}> {user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} handleClose={hideModal} user={user} />
    </div>
  );
}
