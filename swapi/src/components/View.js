import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import humanizeString from "humanize-string";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const View = ({ resource = {}, ...rest }) => {
  const { displayName, data, urls } = resource;
  console.log({urls})
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
    </Box>
  );
};

export default View;
