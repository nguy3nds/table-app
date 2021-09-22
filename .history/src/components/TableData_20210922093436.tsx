import React from "react";
import Table from "react-bootstrap/Table";

const TableData = (props: { content: string }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Birthday</th>
          <th>Salary</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>{props.content}</tbody>
    </Table>
  );
};

export default TableData;
