import React from "react";
import { Table, ButtonToolbar, Button } from "react-bootstrap";
import { EditDepartmentComponent } from "./department-actions/edit-department.component";
import { AddDepartmentComponent } from "./department-actions/add-department.component";

export class DepartmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      addModalShow: false,
      editModalShow: false,
    };
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
    const {
      departments,
      addModalShow,
      editModalShow,
      depId,
      depName,
    } = this.state;
    // let toCloseModal = () => this.setState({ addModalShow: true });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>DepartmentID</th>
              <th>DepartmentName</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(({ DepartmentID, DepartmentName }) => (
              <tr key={DepartmentID}>
                <td>{DepartmentID}</td>
                <td>{DepartmentName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          depId: DepartmentID,
                          depName: DepartmentName,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <EditDepartmentComponent
                      onShow={editModalShow}
                      onHide={() => this.setState({ editModalShow: false })}
                      depId={depId}
                      depName={depName}
                    />
                  </ButtonToolbar>
                </td>
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
