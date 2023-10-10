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
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableBox,
  StyledTableContainer
} from "@/components/DisplayTable"
import { styled } from '@mui/system';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from "react-router-dom"

export const QUERY = "QUERY";
export const SERVICE_DEPENDENCY = "SERVICE_DEPENDENCY";
export const INTERFACE_DEPENDENCY = "INTERFACE_DEPENDENCY";

export default function ServiceInfoBlock(props) {

  const { data, mode, page, cb = () => {}, init = () => {} } = props
  const navigate = useNavigate();
  const [resourceTableWidth, setResourceTableWidth] = useState("650px");
  const [values, setValues] = useState([]);
  const interfaceTable = useRef();

  const labels = [
    "服务ID",
    "服务名称",
    "代码仓库地址",
    "镜像仓库地址&Tag",
    "服务版本"
  ]

  const isUrl = [
    false,
    false,
    true,
    false,
    false
  ]

  useEffect(() => {
    setResourceTableWidth(interfaceTable.current.clientWidth + "px");
    init();
    if(!data) {
      return;
    }
    const tmpValues = [
      data.id,
      data.name,
      data.repo,
      data.imageUrl,
      transformVersion(data.version)
    ];
    setValues(tmpValues);
    
  }, [data]);

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
        ...shadowStyle,
        minHeight: "500px"
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
        isUrl={isUrl}
        rowSpacing={0}
      />

      <Stack direction='row' spacing={0} sx={{ mt: "8px" }}>
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
            width: "calc(100% - 224px)"
          }}
        >
          {
            data && data.interfaces !== null
              ?
              <StyledTableContainer sx={{ maxHeight: '680px'}}>
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
                        <StyledTableRowCell
                          key={item.id}
                          align="center"
                        >
                          {item.label}
                        </StyledTableRowCell>
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
                          backgroundColor: '#FFF !important',
                        }}
                        selected={false}
                      >
                        <StyledTableBodyCell
                          align='center'
                        >
                          {row.id}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align='center'
                        >
                          {row.path}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align='center'
                        >
                          {row.inputSize}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align='center'
                        >
                          {row.outputSize}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align='center'
                        >
                          <Tooltip title="查看依赖">
                            <IconButton onClick={() => {
                              handleInterfaceDependencyClick(row.id)
                            }} size="small">
                              <PolylineIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableBodyCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

              </StyledTableContainer>
              :
              <></>
          }
        </Box>
      </Stack>

      <Stack direction='row' spacing={0} sx={{ mt: "8px" }}>
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
          width: "calc(100% - 224px)"
        }}>
          <StyledTableContainer sx={{ maxHeight: '680px', overflow: "auto", width: "100%" }}>
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
                  <StyledTableRowCell
                    align="center"
                  >
                    Type
                  </StyledTableRowCell>
                  {resourceAndCapabilityHeadRow.map((item, index) =>
                    <StyledTableRowCell
                      key={item.id}
                      align="center"
                    >
                      {item.label}
                    </StyledTableRowCell>
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
                    backgroundColor: '#FFF !important',
                  }}
                  selected={false}
                >
                  <StyledTableBodyCell
                    align='center'
                  >
                    空闲时占用资源
                  </StyledTableBodyCell>
                  { data &&
                    resourceAndCapabilityHeadRow.map((item, index) =>
                      <StyledTableBodyCell
                        align='center'
                      >
                        {data.idleResource[item.id]}
                      </StyledTableBodyCell>
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
                    backgroundColor: '#FFF !important',
                  }}
                  selected={false}
                >
                  <StyledTableBodyCell
                    align='center'
                    
                  >
                    期望资源
                  </StyledTableBodyCell>
                  { data &&
                    resourceAndCapabilityHeadRow.map((item, index) =>
                      <StyledTableBodyCell
                        key={item.id}
                        align='center'
                      >
                        {data.desiredResource[item.id]}
                      </StyledTableBodyCell>
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
                    backgroundColor: '#FFF !important',
                  }}
                  selected={false}
                >
                  <StyledTableBodyCell
                    align='center'
                  >
                    处理能力
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align='center'
                    colSpan={5}
                  >
                    {data && data.desiredCapability}
                  </StyledTableBodyCell>
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

          </StyledTableContainer>

        </Box>
      </Stack>

    </Box>
  )
}
