import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { swapi } from "./requests";
import AppContext from "./components/AppContext";
import Navigation from "./components/Navigation";
import { adaptToDisplay } from "./adapters/navigation";

function App() {
  const [sections, setSections] = useState([]);

  const fetchData = async () => {
    setSections(adaptToDisplay(await swapi.get()));
  };

  useEffect(() => fetchData(), []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="/explore">
          Explore Swapi
        </a>
        {sections && sections.length && <Navigation {...{ sections }} />}
      </header>
    </div>
  );
}

export default App;
