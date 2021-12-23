import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import humanizeString from "humanize-string";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useAppContext } from "./AppContext";
import { adaptToDisplay } from "../adapters/view";
import { swapi } from "../requests";

const View = ({ resource = {}, ...rest }) => {
  const { setLoading, setResource, setRows } = useAppContext();
  const { displayName, data, urls } = resource;
  console.log({ urls });
  return (
    <Box>
      <Box display="flex">
        <Typography variant="h4" gutterBottom sx={{ marginLeft: "1rem" }}>
          {displayName}
        </Typography>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {Object.entries(data).map(([key, value]) => {
          return (
            <Grid item xs={3} key={key}>
              <TextField
                disabled={true}
                spacing={1}
                {...{ label: humanizeString(key), value }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex">
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {Object.entries(urls).map(([key, value]) => {
            if (!value || !value.length) return <></>;
            return (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography
                  key={`assoc-${key}`}
                  variant="h4"
                  gutterBottom
                  sx={{ marginLeft: "1rem" }}
                >
                  {humanizeString(key)}
                </Typography>
                {value.map((url) => {
                  const onClick = async () => {
                    if (!url || !setResource) return;
                    setLoading(true);
                    setResource(
                      adaptToDisplay(await swapi.get(url), null, url)
                    );
                    setLoading(false);
                    setRows([]);
                  };

                  return (
                    <Link
                      {...{ component: "button", onClick }}
                      sx={{ marginLeft: "1rem" }}
                    >
                      {url}
                    </Link>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default View;
