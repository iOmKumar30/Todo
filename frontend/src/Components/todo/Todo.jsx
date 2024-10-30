import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
import UpdateTodo from "./UpdateTodo";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
export function Todo() {
  const [todos, setTodos] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchTodos();
  }, [location, todos]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/v1/todos/alltodos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.todos;
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error("Fetched data is not an array", data);
        setTodos([]);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const toggleTodo = async (todoId) => {
    if (!todoId) {
      console.error("Todo ID is undefined");
      return;
    }

    const todo = todos.find((todo) => todo._id === todoId);
    if (!todo) {
      console.error("Todo not found");
      return;
    }

    const currentCompletionStatus = !todo.completed;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/todos/toggle/${todoId}`,
        {
          completed: currentCompletionStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === todoId
              ? { ...todo, completed: currentCompletionStatus }
              : todo
          )
        );
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      console.error("Error marking todo as completed", err);
    }
  };

  const addTodo = async () => {
    if (title && description) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/todos/add",
          {
            title: title,
            description: description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const newTodo = {
          _id: res.data.newTodo._id,
          title: title,
          description: description,
          completed: false,
        };

        setTodos([...todos, newTodo]);

        toast.success("Todo added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTitle("");
        setDescription("");
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong, please try again.");
        }
      }
    } else {
      toast.error("Please fill out both fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/todos/delete/${todoId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        setTodos(todos.filter((todo) => todo._id !== id));

        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    updateTodo(currentTodo);
  };

  const closeUpdateModal = () => {
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/todos/update/${updatedTodo._id}`,
        {
          title: updatedTodo.title,
          description: updatedTodo.description,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        setTodos(
          todos.map((todo) =>
            todo.id === updatedTodo.id ? res.data.todo : todo
          )
        );
        setIsEditing(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error("Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="todo">
      <ToastContainer />
      <div className="todo-main container d-flex justify-content-center align-items-center vh-100">
        <Card
          className="todo-card"
          style={{
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "#495057",
            color: "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ fontWeight: "bold", color: "#f8f9fa" }}
            >
              Add a New Todo
            </Typography>
            <div className="todo-inputs">
              <TextField
                label="Title"
                variant="filled"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{
                  style: { color: "#f8f9fa" },
                  shrink: true,
                }}
                inputProps={{
                  style: { color: "#f8f9fa", backgroundColor: "#343a40" },
                }}
              />
              <TextField
                label="Description"
                variant="filled"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{
                  style: { color: "#f8f9fa" },
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "#f8f9fa",
                    backgroundColor: "#343a40",
                    height: "80px",
                  },
                }}
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  opacity: !title ? 0.5 : 1,
                }}
                onClick={addTodo}
                disabled={!title}
              >
                Add Todo
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="todos-list mt-4">
          {todos.map((todo) => (
            <Card
              key={todo.id}
              className="todo-display-card"
              style={{
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                backgroundColor: todo.completed ? "#3fe06d" : "#fff",
              }}
            >
              <CardContent>
                <div className="d-flex justify-content-between align-items-center">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    {todo.title}
                  </Typography>
                  <div>
                    <IconButton
                      onClick={() => toggleTodo(todo._id)}
                      color={todo.completed ? "success" : "default"}
                    >
                      <CheckCircleIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => deleteTodo(todo._id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => editTodo(todo)}
                        style={{
                          backgroundColor: "#007bff",
                          color: "#fff",
                          marginLeft: "10px",
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                <Typography
                  variant="body1"
                  style={{
                    marginTop: "10px",
                    color: "#555",
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {isEditing && (
        <UpdateTodo
          todo={currentTodo}
          closeUpdateModal={closeUpdateModal}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
}

export default Todo;
