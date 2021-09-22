import Form from 'react-bootstrap/Form';
import React from 'react';

const SelectionBox:React.FC<any> = ({handleSelection}) => {
    return (
        <Form>
            <Form.Group>
                <Form.Control as="select"
                    onChange={handleSelection}
                >
                    <option >Select field to sort</option>
                    <option value={'id'}>Id</option>
                    <option value={"firstName"}>First Name</option>
                    <option value={"lastName"}>Last Name</option>
                    <option value={"email"}>Email</option>
                    <option value={"gender"}>Gender</option>
                    <option value={"birthday"}>Birthday</option>
                    <option value={"salary"}>Salary</option>
                    <option value={"phone"}>Phone</option>
                </Form.Control>
            </Form.Group>
        </Form>
    );
}

export default SelectionBox;