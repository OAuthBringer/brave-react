import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useAppContext } from "./AppContext";
import { adaptToDisplay } from '../adapters/table'

// FIXME bah, relative paths, I need to do some config somewhere
import { swapi } from "../requests";

const NavItem = ({ name, url, ...rest }) => {
  const { setRows } = useAppContext();
  const onClick = async () => {
    if (!setRows) return
    setRows(adaptToDisplay(await swapi.get(url)))
  };

  return <Button {...{ variant: "outlined", onClick }}>{name}</Button>;
};

const Navigation = ({ sections = [], ...rest }) => {
  return (
    <Stack spacing={2} direction="row">
      {sections.map((section) => {
        return <NavItem {...section} />;
      })}
    </Stack>
  );
};

export default Navigation;
