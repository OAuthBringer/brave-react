import MuiChip from "@mui/material/Chip";

export const Chip = ({ sx = {}, ...rest }) => (
  <MuiChip
    {...{
      component: "button",
      color: "primary",
      sx: { fontWeight: 600, ...sx },
      ...rest,
    }}
  />
);
