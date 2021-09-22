import "./App.css";
import Data from "./users.json";
import Form from "react-bootstrap/Form";
import { Col, Container, Row, Table } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";
import PaginateComponent from "./components/PaginateComponent";
import SelectionBox from "./components/SelectionBox";
import TableData from "./components/TableData";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  salary: number;
  phone: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<User[]>(Data);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const USER_PER_PAGE = 10;

  useEffect(() => {
    const indexLastUser = currentPage * USER_PER_PAGE;
    const indexFirstUser = indexLastUser - USER_PER_PAGE;
    const currentUsers = data.slice(indexFirstUser, indexLastUser);

    setUsers(currentUsers);
  }, [currentPage, data]);

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

  const onSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    let keyObj: keyof User = e.target.value as keyof User;
    let sortedUsers = users.sort((a: User, b: User) => {
      if (a[keyObj] < b[keyObj]) return -1;
      if (a[keyObj] > b[keyObj]) return 1;
      return 0;
    });
    setUsers([...sortedUsers]);
  };

  const onSelectedPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

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

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let searchUsers = Data.filter((user: User) => {
      for (let prop in user) {
        if (
          user[prop as keyof User]
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return user;
        }
      }
      return false;
    });
    setData(searchUsers);
  };

  return (
    <div className="App">
      <Container>
        <Table>
          <Row className="my-2">
            <Col md={3}>
              <SelectionBox handleSelection={onSort} />
            </Col>
            <Col md={3}>
              <Form>
                <Form.Group>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    onChange={onSearch}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          {users.length !== 0 && (
            <Row>
              <Col>
                <TableData content={content} />
              </Col>
            </Row>
          )}

          {data.length !== 0 && (
            <Row className="justify-content-center">
              <PaginateComponent
                pageNumber={Math.ceil(data.length / USER_PER_PAGE)}
                currentPage={currentPage}
                onSelectPage={onSelectedPage}
                handlePrev={onPrev}
                handleNext={onNext}
              />
            </Row>
          )}

          {data.length === 0 && (
            <Row className="justify-content-center">
              <p>Couldn't find anything for these key words</p>
            </Row>
          )}
        </Table>
      </Container>
    </div>
  );
};

export default App;
