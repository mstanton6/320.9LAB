import { useReducer, useState } from "react";
import DispatchButton from "./components/DispatchButton.jsx";
import "./App.css";

// Can be separated to its own file!
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
      
    case "toggle":
       

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
          onChange={(e) => setInputText(e.target.value)}
        />

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.id} - {todo.title}
            </li>
          ))}
        </ul>


        <DispatchButton dispatch={dispatch} payload={inputText} type={"add"}>
          <h2>Add</h2>
        </DispatchButton>

      </div>

    </>
  );
}

export default App;
