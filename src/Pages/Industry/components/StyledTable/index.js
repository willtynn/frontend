import { TableCell, TableHead, styled, TableRow } from "@mui/material";
import { fontFamily } from "../../utils/commonUtils";
export const createTableHeadCell = (options) => {
  const { label='HeadCell', isOrder=false, minWidth='110px', maxWidth='120px', align='left' } = options;
  return { label, isOrder, minWidth, maxWidth, align }
}

export const StyledTableHeadCell = styled(TableCell)({
  fontSize:'1rem',
  fontFamily:fontFamily,
  fontWeight:600,
  textWrap: 'nowrap',
  borderBottom: 'none',
  backgroundColor:'rgb(243,246,251)',
})
export const StyledTableBodyCell = styled(TableCell)({
  textWrap: 'nowrap',
  fontFamily: fontFamily
})

export function StyledTableHead(props) {
  const { headRowCells, selectAll, order, orderBy, setSelectAll, sx = {} } = props;

  return (
    <TableHead>
      <TableRow>
        {headRowCells && headRowCells.map((item, index) => {
          return (
            <StyledTableHeadCell
              key={index}
              align={item.align}
              sx={{
                maxWidth: item.maxWidth,
                minWidth: item.minWidth,
                ...sx,
              }}
            >
              {item.label}
            </StyledTableHeadCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}