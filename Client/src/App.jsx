import InputURL from "./components/InputURL";
import Navbar from "./components/Navbar";
import "./App.css";
import { URLsDetail } from "./components/URLsDetail";

function App() {

  return (
    <>
      <Navbar />
      <InputURL />
      <URLsDetail />
    </>
  );
}

export default App;
