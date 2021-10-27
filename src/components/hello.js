import React, { useState } from "react";
import AddComment from "./AddComment";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "react-bootstrap";
function Comment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Comment;
