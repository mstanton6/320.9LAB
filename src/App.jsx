import { useReducer, useState } from "react";
import DispatchButton from "./components/DispatchButton.jsx";
import "./App.css";

// Can be separated to its own file!
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [step, setStep] = useState(1);

  function handleStepSize(e) {
    setStep(Number(e.target.value));
  }

  return (
    <>
      <fieldset>
        <legend>StepSize</legend>
        <input
          style={{ fontSize: "2em", fieldSizing: "content" }}
          onChange={handleStepSize}
          type="number"
          name="step"
          value={step}
        />
      </fieldset>

      <DispatchButton dispatch={dispatch} payload={step} type={"increment"}>
        <h2>+</h2>
      </DispatchButton>
      <h1>{state.count}</h1>
      <DispatchButton dispatch={dispatch} payload={step} type={"decrement"}>
        <h2>-</h2>
      </DispatchButton>
      <br />
      <DispatchButton dispatch={dispatch} type={"reset"}>
        <h2>Reset</h2>
      </DispatchButton>
    </>
  );
}

export default App;
