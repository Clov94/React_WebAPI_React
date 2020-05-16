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

export const AddEmployeeComponent = ({ onShow, onHide }) => {
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
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeID: null,
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        MailID: event.target.MailID.value,
        DateOfJoin: event.target.DateOfJoin.value,
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
        message={<span id="message-id">{snackBar.snackBarMsg}</span>}
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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup controlId="EmployeeName">
                  <FormControl
                    type="text"
                    name="EmployeeName"
                    required
                    placeholder="EmployeeName"
                  />
                </FormGroup>
                <FormGroup controlId="Department">
                  <FormControl
                    type="text"
                    name="Department"
                    required
                    placeholder="Department"
                  />
                </FormGroup>
                <FormGroup controlId="MailID">
                  <FormControl
                    type="text"
                    name="MailID"
                    required
                    placeholder="MailID"
                  />
                </FormGroup>
                <FormGroup controlId="DateOfJoin">
                  <FormControl
                    type="date"
                    name="DateOfJoin"
                    required
                    placeholder="DateOfJoin"
                  />
                </FormGroup>
                <FormGroup>
                  <Button variant="primary" type="submit">
                    Add Employee
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
