import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        <button
          className="bg-red-50"
          onClick={() => setCount((count) => count + 1)}
        >
          +
        </button>
        <button
          className="bg-sky-50"
          onClick={() => setCount((count) => count - 1)}
        >
          -
        </button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
