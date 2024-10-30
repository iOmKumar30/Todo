import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import "./UpdateTodo.css";
import CloseButton from "react-bootstrap/CloseButton";

export function UpdateTodo({ todo, closeUpdateModal, updateTodo }) {
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    todo.description
  );

  const handleUpdate = () => {
    const updatedTodo = {
      ...todo,
      title: updatedTitle,
      description: updatedDescription,
    };
    updateTodo(updatedTodo);
    closeUpdateModal();
  };

  return (
    <Modal open={true} onClose={closeUpdateModal} style={{ padding: 0 }}>
      <div className="update-modal container">
        <div className="modal-content">
          <h2 className="text-center mb-4">Update Todo</h2>
          <CloseButton
            onClick={closeUpdateModal}
            className="close-button"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          />
          <TextField
            label="Title"
            variant="filled"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Description"
            variant="filled"
            fullWidth
            multiline
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="mb-4"
          />
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={closeUpdateModal}
              className="me-2"
            >
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateTodo;
