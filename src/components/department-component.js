import React from "react";
import { Table, ButtonToolbar, Button } from "react-bootstrap";
import { AddDepartmentComponent } from "./add-department.component";

export class DepartmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { departments: [], addModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch("http://localhost:52725/api/department")
      .then((response) => response.json())
      .then((data) => this.setState({ departments: data }));
  }

  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    const { departments, addModalShow } = this.state;
    // let toCloseModal = () => this.setState({ addModalShow: true });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>DepartmentID</th>
              <th>DepartmentName</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(({ DepartmentID, DepartmentName }) => (
              <tr key={DepartmentID}>
                <td>{DepartmentID}</td>
                <td>{DepartmentName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Department
          </Button>
          <AddDepartmentComponent
            onShow={addModalShow}
            onHide={() => this.setState({ addModalShow: false })}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
