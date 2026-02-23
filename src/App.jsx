import { useReducer, useState } from "react";
import DispatchButton from "./components/DispatchButton.jsx";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "add":  // Add a new Todo item
      if (!action.payload.trim()) return state;
      const newTodo = {
        "userId": 1,
        "id": Date.now(),
        "title": action.payload,
        "completed": false
      };
      return [newTodo, ...state];

    case "edit": // Edit the title
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.newTitle }
          : todo
      )

    case "toggle": // Toggle the checkbox
      return state.map(todo =>
        todo.id === action.payload.id  
          ? { ...todo, completed: action.payload.completed }
          : todo
      )

      case "delete": // Delete the Todo - filter out the id just selected and return the rest
      return state.filter(todo => todo.id !== action.payload.id) 

    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [inputText, setInputText] = useState("");

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

            <input // input for the checkbox to toggle              
               type = "checkbox"
              checked={todo.completed}
              onChange={(e) => dispatch({ type: "toggle", payload: { id: todo.id, completed: e.target.checked } })}
            />

               {/* Edit button */}
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

              {/* Delete button */}
              <button
                disabled={!todo.completed}
                onClick={() => {
                  const delTitle = prompt("Delete todo:", todo.title);
                  if (delTitle !== null && delTitle.trim() !== "") {
                    dispatch({ type: "delete", payload: { id: todo.id } });
                  }
                }}
              >
                Delete
              </button>

            </li>
          ))}
        </ul>

      </div>

    </>
  );
}

export default App;
