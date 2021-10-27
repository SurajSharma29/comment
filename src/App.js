import { useState } from "react";
import "./App.css";
import Comment from "./components/Comment";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <Comment setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
