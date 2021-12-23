import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { swapi } from "./requests";
import AppContext from "./components/AppContext";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import View from "./components/View";
import { adaptToDisplay } from "./adapters/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import Theme from "./Theme";

const App = () => {
  const [sections, setSections] = useState([]);

  // This is where redux would usually come in but I don't want to go
  // down that rabbit hole just yet.  Trying to keep scope tight here.
  const [rows, setRows] = useState([]);
  const [resource, setResource] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setSections(adaptToDisplay(await swapi.get()));
    setLoading(false);
  };

  useEffect(() => fetchData(), []);

  const appContext = {
    sections,
    setRows,
    setResource,
    setLoading,
    loading,
  };

  return (
    <AppContext.Provider value={appContext}>
      <Theme>
        <div className="App">
          <header className="App-header">
            <h2>Explore Swapi</h2>
            {sections && !!sections.length && <Navigation {...{ sections }} />}
          </header>
          <div className="App-body">
            {loading && <LinearProgress />}
            {!resource && !rows.length && (
              <img src={logo} className="App-logo" alt="logo" />
            )}
            {!resource && !!rows.length && (
              <>{rows.length && <Table {...{ rows }} />}</>
            )}
            {resource && <View {...{ resource }} />}
          </div>
        </div>
      </Theme>
    </AppContext.Provider>
  );
};

export default App;
