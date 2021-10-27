import React, { useState } from "react";
// import AddComment from "./AddComment";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  FormControl,
} from "react-bootstrap";
function Comment() {
  const [addComment, setAddComment] = useState({ text: "", id: "" });
  const [commentBox, setCommentBox] = useState([]);
  const [open, setOpen] = useState(false);
  console.log("box", commentBox);
  const [isClicked, setIsClicked] = useState(false);

  console.log("addComment", addComment);
  const handleChange = (e) => {
    setAddComment({ text: e.target.value, id: uuidv4(), like: [] });
  };

  const handleClick = () => {
    setCommentBox((prevBox) => [...prevBox, addComment]);
    // setAddComment("");
  };
  const handleReply = (id) => {
    console.log(id, "id");
    const found = commentBox.find((comment) => id === comment.id);
    console.log("found1", found);
    const index = commentBox.findIndex((comment) => id === comment.id);

    let copy = [...commentBox];
    if (found) {
      console.log("found", found);
      copy[index] = {
        ...found,
        like: [
          ...found.like,
          {
            reply: found.reply,
            replyId: found.replyId,
            likes: 0,
          },
        ],
      };
      return copy;
    }
    setCommentBox(copy);
    return copy;
  };

  const renderedList = commentBox.map((item) => {
    return (
      <div key={item.id}>
        <div>{item.text}</div>
        <button
          onClick={() => {
            handleReply(item.id);
            setOpen(true);
          }}
        >
          {" "}
          REPLY
        </button>
        <button>DELETE</button>
      </div>
    );
  });

  return (
    <div>
      <Button
        style={{ float: "right" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Comment
      </Button>
      <br />
      <br />
      <Modal show={open}>
        <ModalBody>
          <FormControl
            value={addComment.text}
            onChange={handleChange}
            placeholder="Type Your Comment Here"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setOpen(false);
              setCommentBox((prevBox) => [...prevBox, addComment]);
              setAddComment({ text: "", id: "" });
            }}
          >
            Comment
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              setAddComment({ text: "", id: "" });
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div>
        <div>
          <div>
            <input
              type="text"
              placeholder="type ur comment here"
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleClick}>Comment</button>
            <button>Cancel </button>
          </div>
        </div>
      </div>
      <div>{commentBox && renderedList}</div>
      <div>
        <Modal show={open}>
          <ModalBody>
            <FormControl
              value={addComment.text}
              onChange={handleChange}
              placeholder="Type Your Comment Here"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setOpen(false);
                setCommentBox((prevBox) => [...prevBox, addComment]);
                setAddComment({ text: "", id: "" });
              }}
            >
              Comment
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                setAddComment({ text: "", id: "" });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Comment;
