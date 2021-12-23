import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./App.css";
import { swapi } from "./requests";
import Typography from "@mui/material/Typography";
import AppContext from "./AppContext";
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
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              sx={{ width: "95%" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Box display="flex">
                  <Typography variant="h2" color="secondary.main">Swapi</Typography>
                  <Typography variant="h2">
                    Explorer
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                >
                  Be Brave, the galaxy awaits.
                </Typography>
              </Box>
              {sections && !!sections.length && (
                <Navigation {...{ sections }} />
              )}
            </Box>
          </header>
          <div className="App-body">
            {loading && <LinearProgress />}
            {!loading && (
              <LinearProgress
                variant="determinate"
                value={100}
                color="secondary"
              />
            )}
            {!resource && !rows.length && (
              <Box sx={{ marginTop: "3rem" }}>
                <img
                  src={
                    "https://imgr.search.brave.com/DRpfZMvsUmiFv5zIrbJl3iMehSfA-Wsagt_TcAgbbHA/fit/1139/1139/ce/1/aHR0cHM6Ly93d3cu/Y3J5cHRvY29tcGFy/ZS5jb20vbWVkaWEv/MzUxNjU0L2JyYXZl/X2xvZ29fc3RhY2tl/ZC5wbmc"
                  }
                  className="App-logo"
                  alt="logo"
                />
              </Box>
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
