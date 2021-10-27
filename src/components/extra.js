import React, { useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
export default function Comment() {
  const [idToReply, setIdToReply] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inputData, setInputData] = useState("");
  const replyFunction = (id) => {
    setIdToReply(id);
    setShow2(true);
  };
  return (
    <div>
      <Button
        style={{ float: "right" }}
        onClick={() => {
          setShow(true);
        }}
      >
        Add Comment
      </Button>
      <br />
      <br />
      <Modal show={show}>
        <ModalBody>
          <FormControl
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            placeholder="Type Your Comment Here"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
             
              setShow(false);
              setInputData("");
            }}
          >
            Comment
          </Button>
          <Button
            onClick={() => {
              setShow(false);
              setInputData("");
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={show2}>
        <ModalBody>
          <FormControl
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleComment}>
            Comment
          </Button>
          <Button onClick={() => setShow2(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
     
    </div>
  );
}