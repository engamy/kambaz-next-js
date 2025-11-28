"use client";

import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash, FaTimesCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface Todo {
  id?: string;
  title?: string;
  completed?: boolean;
  editing?: boolean;
  [key: string]: unknown;
}

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodos = async () => {
    const fetchedTodos = await client.fetchTodos();
    setTodos(fetchedTodos);
  };
  const removeTodo = async (todo: Todo) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };
  const deleteTodo = async (todo: Todo) => {
    await client.deleteTodo(todo);
    const newTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodos);
  };
  const createNewTodo = async () => {
    const fetchedTodos = await client.createNewTodo();
    setTodos(fetchedTodos);
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false, });
    setTodos([...todos, newTodo]);
  };
  const editTodo = (todo: Todo) => {
    const updatedTodos = todos.map(
      (t) => t.id === todo.id ? { ...todo, editing: true } : t );
    setTodos(updatedTodos);
  };
  const updateTodo = async (todo: Todo) => {
    await client.updateTodo(todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>Todos 
        <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" /> 
        <FaPlusCircle onClick={postNewTodo}   className="text-primary float-end fs-3 me-3" id="wd-post-todo"   />
      </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash onClick={() => removeTodo(todo)}
                     className="text-danger float-end mt-1" id="wd-remove-todo"/>
            <FaTimesCircle onClick={() => deleteTodo(todo)}
                      className="text-danger float-end mt-1 me-2" id="wd-delete-todo"/>
            <FaPencil onClick={() => editTodo(todo)} className="text-primary float-end me-2 mt-1" />
            <input type="checkbox" className="form-check-input me-2"
                   defaultChecked={todo.completed}
                   onChange={(e) => updateTodo({ ...todo, completed: e.target.checked }) } />
              {!todo.editing ? (
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.title}
                </span>
              ) : (
                <FormControl className="w-50 float-end" defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({ ...todo, title: e.target.value })
                  }
                />
              )}
          </ListGroupItem>
        ))}
      </ListGroup> <hr />
    </div>
);}
