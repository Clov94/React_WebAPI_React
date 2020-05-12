import React from "react";
import { Table } from "react-bootstrap";

export class DepartmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { departments: [] };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    this.setState({
      departments: [
        { DeparmentID: 1, DepartmentName: "IT" },
        { DeparmentID: 2, DepartmentName: "Support" },
      ],
    });
  }

  render() {
    const { departments } = this.state;
    return (
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>DepartmentID</th>
            <th>DepartmentName</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(({ DeparmentID, DepartmentName }) => (
            <tr key={DeparmentID}>
              <td>{DeparmentID}</td>
              <td>{DepartmentName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
