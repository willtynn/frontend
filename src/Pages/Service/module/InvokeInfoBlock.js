import LabelAndValue from "@/components/LabelAndValue"
import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
  Stack,
  tableCellClasses,
  TableCell
} from "@mui/material"
import { LargeBoldFont } from "@/components/Fonts"
import { transformVersion, shadowStyle } from "@/utils/commonUtils"
import {
  StyledTableCell
} from "@/components/DisplayTable"
import { styled } from '@mui/system';
import { useState, useEffect } from "react"

export const NewStyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DFE4E8",
    color: "#596A7C",
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  [`&.${tableCellClasses.root}`]: {
    // paddingTop: 0,
    // paddingBottom: 0,
    // paddingLeft: "24px",
    // paddingRight: '24px',
    maxWidth: '260px',
  },
}));

export default function InvokeInfoBlock(props) {

  const { data, init = ()=>{} } = props
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [isUrl, setIsUrl] = useState([]);
  
  useEffect(() => {
    if(!data) {
      return;
    }
    let tmpLabels = [];
    let tmpValues = [];
    let tmpIsUrl = [];
    for(const [key, value] of Object.entries(data)) {
      tmpLabels.push(key);
      tmpValues.push(value);
      tmpIsUrl.push(false);
    }
    setLabels(tmpLabels);
    setValues(tmpValues);
    setIsUrl(tmpIsUrl);
    init();
  }, [data]);

  return (
    <Box
      sx={{
        mt: "40px",
        ...shadowStyle
      }}
    >
      <LargeBoldFont
        sx={{
          mb: "20px"
        }}
      >
        调用详细信息
      </LargeBoldFont>
      <LabelAndValue
        id='serviceQueryInfo'
        labels={labels}
        value={values}
        open={false}
        isUrl={isUrl}
        widthList={['170px', '357px', '192px', '410px']}
      />

    </Box>
  )
}