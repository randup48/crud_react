import blue from "@mui/material/colors/blue";
import styled from "@mui/material/styles/styled";
import TableCell from "@mui/material/TableCell/TableCell";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import TableRow from "@mui/material/TableRow/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: blue[50],
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

export { StyledTableCell, StyledTableRow };
