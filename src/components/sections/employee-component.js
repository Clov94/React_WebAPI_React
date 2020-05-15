import React from "react";
import { Table } from "react-bootstrap";

export class EmployeeComponent extends React.Component {
  render() {
    return (
      <div className="mt-5 d-flex justify-content-left">
        <Table>
          <thead>
            <tr>
              <th>EmployeeID</th>
              <th>EmployeeName</th>
              <th>Options</th>
            </tr>
          </thead>
        </Table>
      </div>
    );
  }
}
