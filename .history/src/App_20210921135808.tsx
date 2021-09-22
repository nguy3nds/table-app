import "./App.css";
import Data from "./users.json";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import PaginateComponent from "./PaginateComponent";
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

  const userPerPage = 10;

  useEffect(() => {
    const indexLastUser = currentPage * userPerPage;
    const indexFirstUser = indexLastUser - userPerPage;
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

  const onSelectedItem = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Container>
        <Row className="my-2">
          <Col md={3}>
            <SelectionBox handleSelection={onSelectedItem} />
          </Col>
          <Col md={3}>
            <Form onSubmit={handleSubmit}>
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
              pageNumber={Math.ceil(data.length / userPerPage)}
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
      </Container>
    </div>
  );
};

export default App;
