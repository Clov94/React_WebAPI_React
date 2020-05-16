import React from "react";
import {
  Modal,
  ModalFooter,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { IconButton, Snackbar } from "@material-ui/core";

export const EditEmployeeComponent = ({ onShow, onHide, depId, depName }) => {
  const [snackBar, setSnackBar] = React.useState({
    snackBarOpen: false,
    snackBarMsg: "",
  });
  const snackBarClose = () => {
    setSnackBar({
      setSnackBarOpen: false,
    });
  };
  const handleSubmit = (event) => {
    fetch("http://localhost:52725/api/employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeID: event.target.EmployeeID.value,
        EmployeeName: event.target.EmployeeName.value,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setSnackBar({ snackBarOpen: true, snackBarMsg: result });
        },
        (error) => {
          setSnackBar({ snackBarOpen: true, snackBarMsg: `${error} / error` });
        }
      );
  };
  return (
    <div className="container">
      <Snackbar
        open={snackBar.snackBarOpen}
        autoHideDuration={3000}
        onClose={snackBarClose}
        message={<span id={`message-${depId}`}>{snackBar.snackBarMsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={snackBarClose}
          >
            x
          </IconButton>,
        ]}
      />
      <Modal
        show={onShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup controlId="EmployeeID">
                  <FormLabel>EmployeeID</FormLabel>
                  <FormControl
                    type="text"
                    name="EmployeeID"
                    required
                    disabled
                    defaultValue={depId}
                  />
                </FormGroup>
                <FormGroup controlId="EmployeeName">
                  <FormLabel>EmployeeName</FormLabel>
                  <FormControl
                    type="text"
                    name="EmployeeName"
                    required
                    defaultValue={depName}
                  />
                </FormGroup>
                <FormGroup>
                  <Button variant="primary" type="submit">
                    Update Employee
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <ModalFooter>
          <Button vairant="danger" onClick={onHide}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
