import Form from "react-bootstrap/Form";
import React from "react";

// // Type '{ handleSelection: (e: ChangeEvent<HTMLInputElement>) => void; }' is not assignable to type 'IntrinsicAttributes & Event & { children?: ReactNode; }'.
//   Property 'handleSelection' does not exist on type 'IntrinsicAttributes & Event & { children?: ReactNode; }'.

const SelectionBox: Event = ({ handleSelection }) => {
  return (
    <Form>
      <Form.Group>
        <select
          className="form-select"
          name="select"
          onChange={handleSelection}
        >
          <option>Select field to sort</option>
          <option value={"id"}>Id</option>
          <option value={"firstName"}>First Name</option>
          <option value={"lastName"}>Last Name</option>
          <option value={"email"}>Email</option>
          <option value={"gender"}>Gender</option>
          <option value={"birthday"}>Birthday</option>
          <option value={"salary"}>Salary</option>
          <option value={"phone"}>Phone</option>
        </select>
      </Form.Group>
    </Form>
  );
};

export default SelectionBox;
