import { 
  useEffect,
  useRef,
  useState
} from "react"
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
  TableCell,
  IconButton,
  Tooltip
} from "@mui/material"
import { LargeBoldFont } from "@/components/Fonts"
import { transformVersion, shadowStyle } from "@/utils/commonUtils"
import {
  StyledTableCell
} from "@/components/DisplayTable"
import { styled } from '@mui/system';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from "react-router-dom"

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

export const QUERY = "QUERY";
export const SERVICE_DEPENDENCY = "SERVICE_DEPENDENCY";
export const INTERFACE_DEPENDENCY = "INTERFACE_DEPENDENCY";

export default function ServiceInfoBlock(props) {

  const { data, mode, page, cb = () => { } } = props
  const navigate = useNavigate();
  const [resourceTableWidth, setResourceTableWidth] = useState("650px");
  const interfaceTable = useRef();

  useEffect(() => {
    setResourceTableWidth(interfaceTable.current.clientWidth + "px")
  }, [])

  const labels = [
    "服务ID",
    "服务名称",
    "代码仓库地址",
    "镜像仓库地址&Tag",
    "服务版本"
  ]

  const values = [
    data.id,
    data.name,
    data.repo,
    data.imageUrl,
    transformVersion(data.version)
  ]

  const isUrl = [
    false,
    false,
    true,
    false,
    false
  ]

  function createRow(
    id,
    label,
    isOrder = true,
    minWidth = '110px',
    maxWidth = '220px',
    show = true,
    colSpan = 1,
    rowSpan = 1
  ) {
    return { id, label, isOrder, minWidth, maxWidth, show, colSpan, rowSpan };
  }

  const headRow = [
    createRow('id', '接口ID', false, '240px', '280px', true),
    createRow('path', '请求的路径', false, '190px', '190px', true),
    createRow('inputSize', '输入数据大小', false, '200px', '240px', true),
    createRow('outputSize', '输出数据大小', false, '150px', '150px', true),
    createRow('dependency', '接口依赖', false, '150px', '150px', true)
  ];

  const resourceAndCapabilityHeadRow = [
    createRow('cpu', 'cpu资源', false, '150px', '150px', true),
    createRow('ram', 'ram资源', false, '170px', '200px', true),
    createRow('disk', '硬盘资源', false, '170px', '200px', true),
    createRow('gpuCore', 'gpu-core资源', false, '170px', '200px', true),
    createRow('gpuMem', 'gpu内存资源', false, '170px', '200px', true),
  ];

  const handleServiceDependencyClick = (id) => {
    navigate(`/service/dependency?type=service&by=${mode}&id=${id}`)
    cb()
  }

  const handleInterfaceDependencyClick = (id) => {
    navigate(`/service/dependency?type=interface&by=0&id=${id}`)
    cb()
  }

  return (
    <Box
      sx={{
        ...shadowStyle
      }}
    >
      <Stack sx={{
        mb: "20px"
      }}
        direction="row"
        spacing={2}>
        <LargeBoldFont
          sx={{
            lineHeight: "40px !important"
          }}
        >
          服务详细信息
        </LargeBoldFont>
        {
          page !== SERVICE_DEPENDENCY
            ?
            <Tooltip title="查看依赖">
              <IconButton onClick={() => handleServiceDependencyClick(data.id)}>
                <PolylineIcon />
              </IconButton>
            </Tooltip>
            :
            <></>
        }

      </Stack>

      <LabelAndValue
        id='serviceQueryInfo'
        labels={labels}
        value={values}
        open={false}
        isUrl={isUrl}
        widthList={['170px', '357px', '192px', '410px']}
      />

      <Stack direction='row' spacing={2} sx={{ mt: "8px" }}>
        <Box
          sx={{
            width: '224px',
            height: '20px',
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#596A7C',
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          接口集合
        </Box>
        <Box
          ref={interfaceTable}
          sx={{
            minWidth: "650px"
          }}
        >
          {
            data.interfaces !== null
              ?
              <TableContainer sx={{ maxHeight: '680px', overflow: "auto", width: "100%" }}>
                <Table
                  stickyHeader
                  aria-label='simple table'
                  size='small'
                  sx={{
                    tableLayout: 'auto',
                    minWidth: "100%"
                  }}
                >
                  <TableHead>
                    <TableRow>

                      {headRow.map((item, index) =>
                        <NewStyledTableCell
                          key={item.id}
                          align="center"
                        >
                          {item.label}
                        </NewStyledTableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.interfaces.map((row, index) =>
                      <TableRow
                        key={row.id + '' + index}
                        aria-checked={false}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0
                          },
                          fontWeight: 600,
                          maxWidth: '110px',
                          position: 'sticky',
                          left: 0,
                          zIndex: 6,
                          backgroundColor: '#F1F3F5 !important',
                        }}
                        selected={false}
                      >
                        <StyledTableCell
                          align='center'
                        >
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell
                          align='center'
                        >
                          {row.path}
                        </StyledTableCell>
                        <StyledTableCell
                          align='center'
                        >
                          {row.inputSize}
                        </StyledTableCell>
                        <StyledTableCell
                          align='center'
                        >
                          {row.outputSize}
                        </StyledTableCell>
                        <StyledTableCell
                          align='center'
                        >
                          <Tooltip title="查看依赖">
                            <IconButton onClick={() => {
                              handleInterfaceDependencyClick(row.id)
                            }} size="small">
                              <PolylineIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

              </TableContainer>
              :
              <></>
          }
        </Box>
      </Stack>

      <Stack direction='row' spacing={2} sx={{ mt: "8px" }}>
        <Box
          sx={{
            width: '224px',
            height: '20px',
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#596A7C',
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          资源与能力
        </Box>

        <Box sx={{
          width: resourceTableWidth
        }}>
          <TableContainer sx={{ maxHeight: '680px', overflow: "auto", width: "100%" }}>
            <Table
              stickyHeader
              aria-label='simple table'
              size='small'
              sx={{
                tableLayout: 'auto',
                minWidth: "100%"
              }}
            >
              <TableHead>
                <TableRow>
                  <NewStyledTableCell
                    align="center"
                  >
                    Type
                  </NewStyledTableCell>
                  {resourceAndCapabilityHeadRow.map((item, index) =>
                    <NewStyledTableCell
                      key={item.id}
                      align="center"
                    >
                      {item.label}
                    </NewStyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  aria-checked={false}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0
                    },
                    fontWeight: 600,
                    maxWidth: '110px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 6,
                    backgroundColor: '#F1F3F5 !important',
                  }}
                  selected={false}
                >
                  <StyledTableCell
                    align='center'
                  >
                    空闲时占用资源
                  </StyledTableCell>
                  {
                    resourceAndCapabilityHeadRow.map((item, index) =>
                      <StyledTableCell
                        align='center'
                      >
                        {data.idleResource[item.id]}
                      </StyledTableCell>
                    )
                  }
                </TableRow>
                <TableRow
                  aria-checked={false}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0
                    },
                    fontWeight: 600,
                    maxWidth: '110px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 6,
                    backgroundColor: '#F1F3F5 !important',
                  }}
                  selected={false}
                >
                  <StyledTableCell
                    align='center'
                    
                  >
                    期望资源
                  </StyledTableCell>
                  {
                    resourceAndCapabilityHeadRow.map((item, index) =>
                      <StyledTableCell
                        key={item.id}
                        align='center'
                      >
                        {data.desiredResource[item.id]}
                      </StyledTableCell>
                    )
                  }
                </TableRow>
                <TableRow
                  aria-checked={false}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0
                    },
                    fontWeight: 600,
                    maxWidth: '110px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 6,
                    backgroundColor: '#F1F3F5 !important',
                  }}
                  selected={false}
                >
                  <StyledTableCell
                    align='center'
                  >
                    处理能力
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    colSpan={5}
                  >
                    {data.desiredCapability}
                  </StyledTableCell>
                  {/* {
                    resourceAndCapabilityHeadRow.map((item, index) =>
                      <StyledTableCell
                        key={item.id}
                        align='center'
                      >
                        {data.desiredCapability[item.id]}
                      </StyledTableCell>
                    )
                  } */}
                </TableRow>
              </TableBody>
            </Table>

          </TableContainer>

        </Box>
      </Stack>

    </Box>
  )
}
