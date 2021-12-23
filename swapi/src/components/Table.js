import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import humanizeString from "humanize-string";
import { swapi } from "../requests";
import { useAppContext } from "./AppContext";
import { adaptToDisplay } from "../adapters/view";

const parseColumns = (rows = []) => {
  if (!rows || !rows.length) return [];

  // FIXME: This is dangerous, need better type checking.
  const columnNames = Object.keys(rows[0]);
  return columnNames;
};

const DataTableRow = ({ row = {}, columns = [], ...rest }) => {
  const { setLoading, setResource, setRows } = useAppContext();

  if (!columns || !columns.length) return <></>;

  const primaryColumn = columns[0];
  const secondaryColumns = columns.slice(1, columns.length);
  const { url } = row || {};

  const onClick = async () => {
    if (!url || !setResource) return;
    setLoading(true);
    setResource(adaptToDisplay(await swapi.get(url), primaryColumn, url));
    setLoading(false);
    setRows([]);
  };

  return (
    <>
      <TableRow
        key={row[primaryColumn]}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Link {...{ component: "button", onClick }}>
            {row[primaryColumn]}
          </Link>
        </TableCell>
        {secondaryColumns.map((column, i) => (
          <TableCell align="right" key={`${column}-i`}>{row[column]}</TableCell>
        ))}
      </TableRow>
    </>
  );
};

const DataTable = ({ rows = [], ...rest }) => {
  const maxColumns = 5;
  const columns = parseColumns(rows).slice(0, maxColumns);
  const columnNames = columns.map(humanizeString);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnNames.map((val, i) => {
              const props = {};

              if (i > 0) {
                props.align = "right";
              }

              return <TableCell key={`table-header-${i}`} {...props}>{val}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <DataTableRow key={`table-row-${i}`}{...{ row, columns }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
