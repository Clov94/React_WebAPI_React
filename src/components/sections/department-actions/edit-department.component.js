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

export const EditDepartmentComponent = ({ onShow, onHide, depId, depName }) => {
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
    fetch("http://localhost:52725/api/department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentID: event.target.DepartmentID.value,
        DepartmentName: event.target.DepartmentName.value,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setSnackBar({ snackBarOpen: true, snackBarMsg: result });
          setTimeout(90000);
        },
        (error) => {
          setSnackBar({ snackBarOpen: true, snackBarMsg: `${error} / error` });
          setTimeout(90000);
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
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup controlId="DepartmentID">
                  <FormLabel>DepartmentID</FormLabel>
                  <FormControl
                    type="text"
                    name="DepartmentID"
                    required
                    disabled
                    defaultValue={depId}
                  />
                </FormGroup>
                <FormGroup controlId="DepartmentName">
                  <FormLabel>DepartmentName</FormLabel>
                  <FormControl
                    type="text"
                    name="DepartmentName"
                    required
                    defaultValue={depName}
                  />
                </FormGroup>
                <FormGroup>
                  <Button variant="primary" type="submit">
                    Update Department
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
