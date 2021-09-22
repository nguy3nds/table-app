import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { User } from "../App";
import TableData from "./TableData";
const UserInOnePage = (users: User[]) => {
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
