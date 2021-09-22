import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { User } from "../App";
import TableData from "./TableData";
const UserInOnePage = (users: User[]) => {
  const content = users.map((user) => (
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
      {users.length !== 0 && (
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
