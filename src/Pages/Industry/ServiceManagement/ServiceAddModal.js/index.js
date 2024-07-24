import { Stack } from "@mui/system";
import { StyledModal } from "../../components/StyledModal";
import StyledTextField from "../../components/StyledInput/StyledTextField";
import { AddButton } from "../../components/StyledButton/AddButton";
import { CancelButton } from "../../components/StyledButton/CancelButton";
import { fontFamily } from "../../../../utils/commonUtils";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setServiceNameToAdd, setServiceVersionToAdd } from "../../../../actions/industryAction";

export default function ServiceAddModal({ modalOpen, setModalOpen }) {
  const modalTypographyStyle = {
    fontFamily: fontFamily,
    fontSize: '1.075rem',
    color: '#183177',
    fontWeight: 600
  }
  const { serviceNameToAdd, serviceVersionToAdd } = useSelector(state => state.Industry)
  const dispatch = useDispatch()
  const handleChangeServiceNameToAdd = (name) => {
    dispatch(setServiceNameToAdd(name))
  }
  const handleChangeServiceVersionToAdd = (version) => {
    dispatch(setServiceVersionToAdd(version))
  }
  const handleCancel = () => {
    setModalOpen(false)
    dispatch(setServiceNameToAdd(''))
    dispatch(setServiceVersionToAdd(''))
  }
  const handleConfirm = ()=> {
    setModalOpen(false)
  }
  return (
    <StyledModal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Stack sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: '#fff',
        p: '32px 12px',
        gap: '32px',
        borderRadius: '12px'
      }}>
        <Stack sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px'
        }}>
          <Typography sx={modalTypographyStyle}>服务名称</Typography>
          <StyledTextField value={serviceNameToAdd}
            onChange={(e) => handleChangeServiceNameToAdd(e.target.value)} />
        </Stack>
        <Stack sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px'
        }}>
          <Typography sx={modalTypographyStyle}>服务版本</Typography>
          <StyledTextField value={serviceVersionToAdd}
            onChange={(e) => handleChangeServiceVersionToAdd(e.target.value)} />
        </Stack>
        <Stack sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '24px'
        }}>
          <AddButton sx={{ width: '85px' }} onClick={handleConfirm}>确定</AddButton>
          <CancelButton sx={{ width: '85px' }} onClick={handleCancel}>取消</CancelButton>
        </Stack>
      </Stack>
    </StyledModal>
  )
}