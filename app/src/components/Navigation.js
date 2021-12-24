import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useAppContext } from "../AppContext";
import { adaptToDisplay } from "../adapters/table";

// FIXME bah, relative paths, I need to do some config somewhere
import { swapi } from "../requests";

const NavItem = ({ name, url, ...rest }) => {
  const { setRows, setResource, setLoading } = useAppContext();
  const onClick = async () => {
    if (!setRows) return;
    setLoading(true)
    setRows(adaptToDisplay(await swapi.get(url)));
    setResource(null);
    setLoading(false)
  };

  // Note: sx is theme context aware.  Ergo you can reference primary/secondary variants.
  return (
    <Button
      {...{
        variant: "outlined",
        onClick,
        sx: { color: "secondary.main", borderColor: "primary.light", fontWeight: 600},
      }}
    >
      {name}
    </Button>
  );
};

const Navigation = ({ sections = [], ...rest }) => {
  return (
    <Box
      display="flex"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        sx={{ marginLeft: "0" }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {sections.map((section, i) => {
          return (
            <Grid item>
              <NavItem {...section} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Navigation;
