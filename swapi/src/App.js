import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { swapi } from "./requests";
import AppContext from "./components/AppContext";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import { adaptToDisplay } from "./adapters/navigation";

const App = () => {
  const [sections, setSections] = useState([]);

  // This is where redux would usually come in but I don't want to go
  // down that rabbit hole just yet.  Trying to keep scope tight here.
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    setSections(adaptToDisplay(await swapi.get()));
  };

  useEffect(() => fetchData(), []);

  const appContext = {
    sections,
    setRows,
  };

  return (
    <AppContext.Provider value={appContext}>
      <div className="App">
        <header className="App-header">
          <h2>Explore Swapi</h2>
          {sections && sections.length && <Navigation {...{ sections }} />}
          <img src={logo} className="App-logo" alt="logo" />
          <Table {...{ rows }} />
        </header>
        <body className="App-body" />
      </div>
    </AppContext.Provider>
  );
};

export default App;
