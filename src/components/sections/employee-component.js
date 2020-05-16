import React from "react";
import { Table, ButtonToolbar, Button } from "react-bootstrap";
import { AddEmployeeComponent } from "./employee-actions/add-employee.component";

export class EmployeeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      addModalShow: false,
    };
  }

  render() {
    const { employees, addModalShow } = this.state;
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>EmployeeID</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>MailID</th>
              <th>DateOfJoin</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(
              ({
                EmployeeID,
                EmployeeName,
                Department,
                MailID,
                DateOfJoin,
              }) => (
                <tr key={EmployeeID}>
                  <th>{EmployeeID}</th>
                  <th>{EmployeeName}</th>
                  <th>{Department}</th>
                  <th>{MailID}</th>
                  <th>{DateOfJoin}</th>
                </tr>
              )
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>
          <AddEmployeeComponent onShow={addModalShow} onHide={!addModalShow} />
        </ButtonToolbar>
      </div>
    );
  }
}
