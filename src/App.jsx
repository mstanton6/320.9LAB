import { useReducer, useState } from "react";
import DispatchButton from "./components/DispatchButton.jsx";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (!action.payload.trim()) return state;
      const newTodo = {
        "userId": 1,
        "id": Date.now(),
        "title": action.payload,
        "completed": false
      };
      return [newTodo, ...state];

    case "edit":
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.newTitle }
          : todo
      )

    case "toggle":

    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [inputText, setInputText] = useState("");
  const [editText, seteditText] = useState("");

  return (
    <>
      <div>
        <h2>Create Todo List</h2>
        <input
          value={inputText}
          type="text"
          placeholder="Add Task"
          onChange={(e) => setInputText(e.target.value)}
        />
        <DispatchButton dispatch={dispatch} payload={inputText} type={"add"}>
          Add
        </DispatchButton>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.id} - {todo.title}

              <button
                onClick={() => {
                  const newTitle = prompt("Edit todo:", todo.title);
                  if (newTitle !== null && newTitle.trim() !== "") {
                    dispatch({ type: "edit", payload: { id: todo.id, newTitle } });
                  }
                }}
              >
                Edit
              </button>

            </li>
          ))}
        </ul>

      </div>

    </>
  );
}

export default App;
