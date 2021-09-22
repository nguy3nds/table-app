import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import TableData from "./TableData";
import styles from "table.module.css";

const UserInOnePage = (props: any) => {
  const formatDate = (date: string): string => {
    let d = new Date(date);
    let day =
      d.getDate().toString().length === 2
        ? d.getDate().toString()
        : "0" + d.getDate().toString();
    let month =
      d.getMonth().toString().length === 2
        ? d.getMonth().toString()
        : "0" + d.getMonth().toString();
    return day + "/" + month + "/" + d.getFullYear().toString();
  };

  const content = props.users.map((user: any) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
      <td>{formatDate(user.birthday)}</td>
      <td>{user.salary}</td>
      <td>{"(+84)" + user.phone.replace(/-/g, "")}</td>
    </tr>
  ));

  return (
    <div>
      {props.users.length !== 0 && (
        <Row>
          <Col>
            <TableData content={content} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserInOnePage;
