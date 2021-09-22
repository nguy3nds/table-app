import React from "react";
import { User } from "../App";

const UserInOnePage = (users: User[]) => {
     return (
          {users.length !== 0 && (
               <Row>
                 <Col>
                   <TableData content={content} />
                 </Col>
               </Row>
             )}
     )
}

export default UserInOnePage;