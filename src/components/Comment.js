import React, { useState } from "react";
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
  const [commentId, setCommentId] = useState(null);
  const [commentReply, setCommentReply] = useState({
    reply: "",
    replyId: null,
    like: 0,
  });
  const [replyOpen, setReplyOpen] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("box", commentBox);

  console.log("addComment", addComment);
  const handleChange = (e) => {
    setAddComment({ text: e.target.value, id: uuidv4(), likes: [] });
  };

  const handleReply = (id) => {
    setCommentId(id);
  };
  const handleDelete = (id) => {
    const updated = commentBox.filter((item) => item.id !== id);
    setCommentBox(updated);
  };

  const handleLike = (id, replyId) => {
    const replyFound = commentBox.find((comment) => id === comment.id);
    const replyIndex = commentBox.findIndex((comment) => id === comment.id);
    const myReply = replyFound.likes.map((item) => {
      if (item.replyId === replyId) {
        return { ...item, like: item.like + 1 };
      } else {
        return item;
      }
    });
    const replyBox = [...commentBox];
    replyBox[replyIndex] = { ...replyFound, likes: myReply };
    setCommentBox(replyBox);
    console.log("replyFound", replyFound);
  };

  const handleDelReply = (id, replyId) => {
    const replyFound = commentBox.find((comment) => id === comment.id);
    const replyIndex = commentBox.findIndex((comment) => id === comment.id);
    const delReply = replyFound.likes.filter(
      (item) => item.replyId !== replyId
    );
    const replyBox = [...commentBox];
    replyBox[replyIndex] = { ...replyFound, likes: delReply };
    console.log("replyBox");
    setCommentBox(replyBox);
  };

  const renderedList = () => {
    return commentBox.map((item) => {
      console.log("itemlikes", item.likes);
      return (
        <div
          key={item.id}
          style={{
            border: "none",
            margin: "10px",
            padding: "10px",
            borderRadius: "15px",
            background: "#E6E6E6",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                color: "blue",
                background: "white",
                borderRadius: "10px",
                width: "70%",
              }}
            >
              <h2 style={{}}>{item.text}</h2>
            </div>
            <div style={{ margin: "5px" }}>
              <button
                onClick={() => {
                  handleReply(item.id);
                  setReplyOpen(true);
                }}
                style={{
                  background: "green",
                  borderRadius: "10px",
                  border: "none",
                  
                }}
              >
                {" "}
                REPLY
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "red",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                DELETE
              </button>
            </div>
          </div>
          <div>
            {item.likes.map((myReply) => {
              console.log(myReply, "myr");
              return (
                <div
                  key={myReply.replyId}
                  style={{
                    border: "none",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "15px",
                    background: "#E6E6E6",
                  }}
                >
                  <div
                    style={{
                      color: "blue",
                      borderRadius: "10px",
                      width: "70%",
                    }}
                  >
                    <h4>{myReply.reply}</h4>
                  </div>
                  <div style={{}}>
                    <button
                      onClick={() => handleLike(item.id, myReply.replyId)}
                      style={{
                        background: "#B2F9FC",
                        borderRadius: "8px",
                        border: "none",
                      }}
                    >
                      {`${myReply.like}LIKES`}
                    </button>
                    <button
                      onClick={() => handleDelReply(item.id, myReply.replyId)}
                      style={{
                        background: "red",
                        borderRadius: "10px",
                        border: "none",
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const handleReplyChange = (e) => {
    setCommentReply({ ...commentReply, reply: e.target.value });
  };

  const handleMyReply = () => {
    const found = commentBox.find((comment) => commentId === comment.id);
    const index = commentBox.findIndex((comment) => commentId === comment.id);
    const newBox = [...commentBox];
    console.log("found", found);
    if (found) {
      newBox[index] = {
        ...found,
        likes: [...found.likes, { ...commentReply, replyId: uuidv4() }],
      };
    }
    setCommentBox(newBox);
    setCommentReply({ reply: "", replyId: null, like: 0 });
    setReplyOpen(false);
  };

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

      <div>{commentBox && renderedList()}</div>
      <div>
        <Modal show={replyOpen}>
          <ModalBody>
            <FormControl
              value={commentReply.reply}
              onChange={handleReplyChange}
              placeholder="Type Your Reply Here"
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleMyReply}>REPLY</Button>
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
