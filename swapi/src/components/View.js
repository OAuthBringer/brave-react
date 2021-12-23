import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box display="flex">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ marginLeft: "1rem", marginTop: "1rem" }}
        >
          {displayName}
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Object.entries(data).map(([key, value]) => {
          return (
            <Grid item xs={4} sm={4} md={3} key={key}>
              <TextField
                sx={{ width: "80%" }}
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
                  sx={{ marginLeft: "1rem", marginTop: "1rem" }}
                >
                  {humanizeString(key)}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{ maxWidth: "100%" }}
                >
                  <Grid
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
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

                      const urlLabel = url.split("/")
                      const label = `${urlLabel.slice(-3)[0]} ${urlLabel.slice(-2)[0]}`
                      console.log({urlLabel, label})
                      return (
                        <Grid item>
                          <Chip
                            {...{
                              component: "button",
                              onClick,
                              color: "primary",
                            }}
                            sx={{ marginLeft: "1rem", marginBottom: "1rem" }}
                            label={label}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default View;
