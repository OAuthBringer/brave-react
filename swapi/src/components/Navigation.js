import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useAppContext } from "./AppContext";
import { adaptToDisplay } from "../adapters/table";

// FIXME bah, relative paths, I need to do some config somewhere
import { swapi } from "../requests";

const NavItem = ({ name, url, ...rest }) => {
  const { setRows, setResource } = useAppContext();
  const onClick = async () => {
    if (!setRows) return;
    setRows(adaptToDisplay(await swapi.get(url)));
    setResource(null);
  };

  return <Button {...{ variant: "contained", onClick }}>{name}</Button>;
};

const Navigation = ({ sections = [], ...rest }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {sections.map((section, i) => {
          return (
            <Grid item key={`nav-section-${i}`}>
              <NavItem {...section} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Navigation;
