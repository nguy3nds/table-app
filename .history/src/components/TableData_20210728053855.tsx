import React from 'react';
import Table from 'react-bootstrap/Table';

const TableData: React.FC<any> = ({content}) => {
    return (
        <Table >
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
            <tbody>
                {content}
            </tbody>
        </Table>
    );
}

export default TableData;