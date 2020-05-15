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

export const DeleteDepartmentComponent = ({
  onShow,
  onHide,
  depId,
  depName,
}) => {
  const [snackBar, setSnackBar] = React.useState({
    snackBarOpen: false,
    snackBarMsg: "",
  });

  const snackBarClose = () => {
    setSnackBar({
      setSnackBarOpen: false,
    });
  };

  const onHandleDelete = (e) => {
    fetch("http://localhost:52725/api/department/" + depId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
        open={snackBar.snackbarOpen}
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
          <Modal.Title>Delete Department</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you wanna delete {depName} with ID {depId}, for ever!
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Form onSubmit={(e) => onHandleDelete(e)}>
            <FormGroup>
              <Button variant="danger" onClick={onHide}>
                Close
              </Button>
              <FormGroup>
                <Button variant="primary" type="submit">
                  Delete
                </Button>
              </FormGroup>
            </FormGroup>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
