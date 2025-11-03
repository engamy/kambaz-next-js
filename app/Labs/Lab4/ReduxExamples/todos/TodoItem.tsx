import { Button } from "react-bootstrap";

import { ListGroupItem } from "react-bootstrap";

export default function TodoItem({ todo, deleteTodo, setTodo }: {
    todo: { id: string; title: string };
    deleteTodo: (id: string) => void;
    setTodo: (todo: { id: string; title: string }) => void;
  }) {
    return (
      <ListGroupItem key={todo.id}>
        <div className="d-flex justify-content-between align-items-center">
          <span className="flex-grow-1">{todo.title}</span>
          <div className="d-flex gap-2">
            <Button onClick={() => setTodo(todo)}
                    id="wd-set-todo-click"
                    variant="primary"> Edit </Button>
            <Button onClick={() => deleteTodo(todo.id)}
                    id="wd-delete-todo-click"
                    variant="danger"> Delete </Button>
          </div>
        </div>
      </ListGroupItem>);}