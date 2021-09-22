import "./App.css";
import Data from "./users.json";
import Form from "react-bootstrap/Form";
import { Col, Container, Row, Table } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";
import PaginateComponent from "./components/PaginateComponent";
import SelectionBox from "./components/SelectionBox";
import UserInOnePage from "./components/UserInOnePage";

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
            <Col>
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

          <UserInOnePage users={users} />

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
