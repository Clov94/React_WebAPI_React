import React from "react";
import { Table, ButtonToolbar, Button } from "react-bootstrap";
import { EditDepartmentComponent } from "./department-actions/edit-department.component";
import { AddDepartmentComponent } from "./department-actions/add-department.component";
import { DeleteDepartmentComponent } from "./department-actions/delete-department.component";

export class DepartmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      addModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
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
  // deleteDepartment(depId) {
  //   alert(depId);
  //   fetch("http://localhost:52725/api/department/" + depId, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  render() {
    const {
      departments,
      addModalShow,
      editModalShow,
      deleteModalShow,
      depId,
      depName,
    } = this.state;

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
                  <ButtonToolbar style={{ float: "left" }}>
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

                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() =>
                        // () => deleteDepartment(depId)
                        this.setState({
                          deleteModalShow: true,
                          depId: DepartmentID,
                          depName: DepartmentName,
                        })
                      }
                    >
                      Delete
                    </Button>
                    <DeleteDepartmentComponent
                      onShow={deleteModalShow}
                      onHide={() => this.setState({ deleteModalShow: false })}
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
            onHide={!addModalShow}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
